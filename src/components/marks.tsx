"use client";

import { useEffect, useState, type ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  return (
    <div
      ref={setNode}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function StripeField({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`stripe-in ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, color-mix(in srgb, white 16%, var(--green)) 0 14px, transparent 14px 56px)",
      }}
    />
  );
}

export function Mark({ className = "h-2 w-2 bg-green" }: { className?: string }) {
  return <span aria-hidden className={`inline-block shrink-0 ${className}`} />;
}
