import Link from "next/link";
import { notFound } from "next/navigation";
import { DevBadge } from "@/components/dev/DevBadge";

const QUICK_LINKS = [
  {
    label: "Email Previews",
    href: "/dev/pages/email-preview",
    description: "Welcome & bulk-completed templates",
  },
  {
    label: "Validation Playground",
    href: "/dev/pages/validation",
    description: "Test email syntax validation",
  },
  { label: "404 Preview", href: "/dev/404-preview", description: "Preview the not-found page" },
  { label: "Brand", href: "/dev/brand", description: "Design tokens & components" },
];

const STATE_PREVIEWS = [
  { label: "Default", className: "bg-[var(--bg-surface)] border-[var(--border)]" },
  { label: "Success", className: "bg-[var(--status-valid-bg)] border-[var(--status-valid)]" },
  { label: "Warning", className: "bg-[var(--status-risky-bg)] border-[var(--status-risky)]" },
  { label: "Error", className: "bg-[var(--status-invalid-bg)] border-[var(--status-invalid)]" },
];

export default function DevHubPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Developer Hub</h1>
        <DevBadge />
      </div>
      <p className="text-[var(--text-secondary)] mb-10">
        Internal tools and previews for MailGuard Pro. Development only.
      </p>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="card hover:shadow-[var(--shadow-md)] hover:border-[var(--accent)] transition-all group"
            >
              <div className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                {link.label}
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-1">{link.description}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">State Previews</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATE_PREVIEWS.map((state) => (
            <div
              key={state.label}
              className={`rounded-[var(--radius-lg)] border p-4 text-center ${state.className}`}
            >
              <span className="text-xs font-mono text-[var(--text-secondary)]">{state.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Technical Details</h2>
        <div className="card">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <dt className="text-[var(--text-muted)] font-mono text-xs uppercase tracking-wide">
                Framework
              </dt>
              <dd className="text-[var(--text-primary)] font-semibold mt-0.5">
                Next.js App Router
              </dd>
            </div>
            <div>
              <dt className="text-[var(--text-muted)] font-mono text-xs uppercase tracking-wide">
                Styling
              </dt>
              <dd className="text-[var(--text-primary)] font-semibold mt-0.5">Tailwind CSS v4</dd>
            </div>
            <div>
              <dt className="text-[var(--text-muted)] font-mono text-xs uppercase tracking-wide">
                Accent
              </dt>
              <dd className="flex items-center gap-2 mt-0.5">
                <span className="w-3 h-3 rounded-full bg-[var(--accent)]" />
                <span className="text-[var(--text-primary)] font-mono font-semibold">#00A36C</span>
              </dd>
            </div>
            <div>
              <dt className="text-[var(--text-muted)] font-mono text-xs uppercase tracking-wide">
                Fonts
              </dt>
              <dd className="text-[var(--text-primary)] font-semibold mt-0.5">Syne / DM Mono</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
