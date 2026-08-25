import { notFound } from "next/navigation";
import { DevBadge } from "@/components/dev/DevBadge";
import { ScoreCircle } from "@/components/validator/ScoreCircle";

const PALETTE = [
  { name: "Accent", value: "#00A36C", cssVar: "--accent" },
  { name: "Accent Light", value: "#e6f7f1", cssVar: "--accent-light" },
  { name: "Accent Dark", value: "#007a50", cssVar: "--accent-dark" },
  { name: "Score Critical", value: "#dc2626", cssVar: "--score-critical" },
  { name: "Score Poor", value: "#ea580c", cssVar: "--score-poor" },
  { name: "Score Medium", value: "#d97706", cssVar: "--score-medium" },
  { name: "Score Good", value: "#65a30d", cssVar: "--score-good" },
  { name: "Score Excellent", value: "#00a36c", cssVar: "--score-excellent" },
];

const SCORES = [12, 35, 55, 72, 95];

export default function BrandPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Brand</h1>
        <DevBadge />
      </div>
      <p className="text-[var(--text-secondary)] mb-10">
        Design tokens, palette, typography, and component showcase.
      </p>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Palette</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PALETTE.map((color) => (
            <div key={color.name} className="card overflow-hidden p-0">
              <div className="h-16 w-full" style={{ backgroundColor: color.value }} />
              <div className="p-3">
                <div className="text-xs font-bold text-[var(--text-primary)]">{color.name}</div>
                <div className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                  {color.value}
                </div>
                <div className="text-[10px] font-mono text-[var(--text-muted)]/60 mt-0.5">
                  {color.cssVar}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Typography</h2>
        <div className="card space-y-6">
          <div>
            <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wide mb-1">
              Display — Syne
            </div>
            <p
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl font-bold text-[var(--text-primary)]"
            >
              MailGuard Pro
            </p>
          </div>
          <div>
            <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wide mb-1">
              Code / Scores — DM Mono
            </div>
            <p
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-2xl font-medium text-[var(--text-primary)]"
            >
              98 / 100 — excellent
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">ScoreCircle</h2>
        <div className="card">
          <div className="flex flex-wrap items-end gap-8">
            {SCORES.map((score) => (
              <div key={score} className="flex flex-col items-center gap-2">
                <ScoreCircle score={score} size="lg" />
                <span className="text-xs font-mono text-[var(--text-muted)]">{score}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">CSS Variables</h2>
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg-subtle)]">
                  <th className="text-left px-4 py-2 font-mono text-xs text-[var(--text-muted)]">
                    Variable
                  </th>
                  <th className="text-left px-4 py-2 font-mono text-xs text-[var(--text-muted)]">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["--accent", "#00A36C"],
                  ["--bg-base", "#f5f5f4"],
                  ["--bg-surface", "#ffffff"],
                  ["--text-primary", "#111110"],
                  ["--text-secondary", "#6b6860"],
                  ["--border", "#e4e2da"],
                  ["--font-display", "Syne, sans-serif"],
                  ["--font-mono", "DM Mono, monospace"],
                ].map(([variable, value]) => (
                  <tr key={variable} className="border-b border-[var(--border)] last:border-0">
                    <td className="px-4 py-2 font-mono text-xs text-[var(--text-primary)]">
                      {variable}
                    </td>
                    <td className="px-4 py-2 font-mono text-xs text-[var(--text-muted)]">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
