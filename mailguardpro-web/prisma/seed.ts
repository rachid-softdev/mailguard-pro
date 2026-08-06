import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import pg from "pg";
import { FEATURES, PLANS, PLAN_FEATURE_MAP } from "../services/feature-flags/planMatrix";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@mailguardpro.com" },
    update: {
      role: "ADMIN",
      userRoles: {
        deleteMany: {},
        create: [{ role: "ADMIN" }, { role: "USER" }],
      },
    },
    create: {
      email: "admin@mailguardpro.com",
      name: "Admin",
      role: "ADMIN",
      credits: 999999,
      userRoles: {
        create: [{ role: "ADMIN" }, { role: "USER" }],
      },
    },
  });

  console.log("Admin user created:", admin.email);

  // ================================================================
  // Feature Flags + Entitlements Seed
  // NOTE: Plans, features and their mappings come from the shared
  // plan matrix (services/feature-flags/planMatrix.ts) so the seed
  // and the runtime feature gates can never drift apart.
  // ================================================================

  console.log("Seeding features...");
  for (const f of FEATURES) {
    await prisma.feature.upsert({
      where: { key: f.key },
      update: { description: f.description, type: f.type, defaultConfig: f.defaultConfig },
      create: {
        key: f.key,
        description: f.description,
        type: f.type,
        defaultConfig: f.defaultConfig,
      },
    });
  }
  console.log(`  ✓ ${FEATURES.length} features seeded`);

  const plans = PLANS.map((p) => ({
    ...p,
    stripePriceId:
      p.key === "STARTER"
        ? (process.env.STRIPE_STARTER_PRICE_ID ?? null)
        : p.key === "PRO"
          ? (process.env.STRIPE_PRO_PRICE_ID ?? null)
          : p.key === "BUSINESS"
            ? (process.env.STRIPE_BUSINESS_PRICE_ID ?? null)
            : null,
  }));

  console.log("Seeding plans...");
  for (const p of plans) {
    await prisma.pricingPlan.upsert({
      where: { key: p.key },
      update: { name: p.name, priceMonthly: p.priceMonthly, stripePriceId: p.stripePriceId },
      create: {
        key: p.key,
        name: p.name,
        priceMonthly: p.priceMonthly,
        stripePriceId: p.stripePriceId,
      },
    });
  }
  console.log(`  ✓ ${plans.length} plans seeded`);

  console.log("Seeding plan-feature mappings...");
  let mappingCount = 0;
  for (const [planKey, featureMappings] of Object.entries(PLAN_FEATURE_MAP)) {
    const plan = await prisma.pricingPlan.findUnique({ where: { key: planKey } });
    if (!plan) {
      console.warn(`  ⚠ Plan ${planKey} not found, skipping`);
      continue;
    }

    for (const fm of featureMappings) {
      const feature = await prisma.feature.findUnique({ where: { key: fm.key } });
      if (!feature) {
        console.warn(`  ⚠ Feature ${fm.key} not found, skipping`);
        continue;
      }

      await prisma.planFeature.upsert({
        where: { planId_featureId: { planId: plan.id, featureId: feature.id } },
        update: {
          enabled: fm.enabled,
          limitValue: fm.limit ?? null,
          downgradeStrategy: "IMMEDIATE",
        },
        create: {
          planId: plan.id,
          featureId: feature.id,
          enabled: fm.enabled,
          limitValue: fm.limit ?? null,
          downgradeStrategy: "IMMEDIATE",
        },
      });
      mappingCount++;
    }
  }
  console.log(`  ✓ ${mappingCount} plan-feature mappings seeded`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
