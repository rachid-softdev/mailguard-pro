"use client";

import { useEffect, useRef } from "react";

interface PagePreviewProps {
  html: string;
  title: string;
  height?: number;
}

export function PagePreview({ html, title, height = 600 }: PagePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(html);
    doc.close();
  }, [html]);

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] overflow-hidden bg-white">
      <div className="flex items-center gap-2 px-3 py-2 bg-[var(--bg-subtle)] border-b border-[var(--border)]">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--status-invalid)]/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--status-risky)]/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--status-valid)]/60" />
        </div>
        <span className="text-xs font-mono text-[var(--text-muted)] ml-2">{title}</span>
      </div>
      <iframe
        ref={iframeRef}
        title={title}
        className="w-full border-0"
        style={{ height }}
        sandbox="allow-same-origin"
      />
    </div>
  );
}
