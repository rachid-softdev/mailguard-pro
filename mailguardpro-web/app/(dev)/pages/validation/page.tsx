"use client";

import { notFound } from "next/navigation";
import { useState } from "react";
import { DevBadge } from "@/components/dev/DevBadge";

interface ValidationResult {
  email: string;
  valid: boolean;
  errors: string[];
}

function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];

  if (!email) {
    return { email, valid: false, errors: ["Email is required"] };
  }

  if (!email.includes("@")) {
    errors.push("Missing @ symbol");
  }

  const [local, domain] = email.split("@");
  if (!local) {
    errors.push("Missing local part");
  }
  if (!domain) {
    errors.push("Missing domain");
  } else {
    if (!domain.includes(".")) {
      errors.push("Domain must contain a dot");
    }
    if (domain.startsWith(".") || domain.endsWith(".")) {
      errors.push("Domain cannot start or end with a dot");
    }
    if (/\s/.test(email)) {
      errors.push("Email must not contain whitespace");
    }
    if (/[^a-zA-Z0-9@._%+\-]/.test(email)) {
      errors.push("Contains invalid characters");
    }
  }

  return { email, valid: errors.length === 0, errors };
}

const PRESET_EMAILS = [
  "user@example.com",
  "test@gmail.com",
  "invalid-email",
  "missing@domain",
  "@no-local.com",
  "has space@test.com",
  "user@.invalid.com",
  "user@domain",
  "first.last@company.co.uk",
  "",
];

export default function ValidationPlaygroundPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  const [input, setInput] = useState("");
  const [results, setResults] = useState<ValidationResult[]>([]);

  const handleValidate = () => {
    if (!input.trim()) return;
    const result = validateEmail(input.trim());
    setResults((prev) => [result, ...prev]);
    setInput("");
  };

  const handlePreset = (email: string) => {
    setInput(email);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Validation Playground</h1>
        <DevBadge />
      </div>
      <p className="text-[var(--text-secondary)] mb-10">Test email syntax validation logic.</p>

      <div className="card mb-8">
        <div className="flex gap-2">
          <input
            type="email"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleValidate()}
            placeholder="Enter an email address..."
            className="input flex-1"
          />
          <button onClick={handleValidate} className="btn btn-accent btn-md whitespace-nowrap">
            Validate
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-xs text-[var(--text-muted)] font-mono self-center">Presets:</span>
          {PRESET_EMAILS.filter(Boolean).map((email) => (
            <button
              key={email}
              onClick={() => handlePreset(email)}
              className="btn btn-ghost btn-sm font-mono text-xs"
            >
              {email}
            </button>
          ))}
        </div>
      </div>

      {results.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-[var(--text-primary)] mb-3">Results</h2>
          {results.map((result, i) => (
            <div
              key={`${result.email}-${i}`}
              className={`card border-l-4 ${
                result.valid
                  ? "border-l-[var(--status-valid)] bg-[var(--status-valid-bg)]"
                  : "border-l-[var(--status-invalid)] bg-[var(--status-invalid-bg)]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-mono font-bold uppercase ${
                    result.valid ? "text-[var(--status-valid)]" : "text-[var(--status-invalid)]"
                  }`}
                >
                  {result.valid ? "VALID" : "INVALID"}
                </span>
                <span className="font-mono text-sm text-[var(--text-primary)]">{result.email}</span>
              </div>
              {result.errors.length > 0 && (
                <ul className="mt-2 ml-16 text-xs text-[var(--text-secondary)]">
                  {result.errors.map((err) => (
                    <li key={err}>• {err}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
