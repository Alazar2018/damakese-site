"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

export function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const titleId = useId();
  const panel = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const node = panel.current?.querySelector<HTMLElement>("input, select, textarea, button");
    node?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeRef.current();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button type="button" aria-label="Close" className="absolute inset-0 cursor-pointer bg-ink/55" onClick={onClose} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[92dvh] w-full overflow-y-auto bg-ivory p-5 sm:max-w-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="display text-3xl text-green">
            {title}
          </h2>
          <button type="button" className="ui min-h-11 shrink-0 cursor-pointer px-2 text-sm" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
