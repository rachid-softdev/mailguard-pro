"use client";

import { Code } from "lucide-react";

interface DevBadgeProps {
  className?: string;
}

export function DevBadge({ className = "" }: DevBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--accent)]/20 ${className}`}
    >
      <Code className="w-3 h-3" />
      DEV
    </span>
  );
}
