"use client";

import { useEffect, useState } from "react";

export function LineCycle({ lines }: { lines: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % lines.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [lines.length, reduce]);

  return (
    <div>
      <p className="sr-only" aria-live="polite">
        {lines[index]}
      </p>
      <ul className="space-y-2">
        {lines.map((line, item) => {
          const active = reduce || item === index;
          return (
            <li key={line}>
              <button
                type="button"
                aria-current={item === index ? "true" : undefined}
                onClick={() => setIndex(item)}
                className={`display cursor-pointer text-left text-3xl leading-[1.05] transition-colors duration-300 sm:text-5xl md:text-6xl ${
                  active ? "text-lime" : "text-ivory/35"
                }`}
              >
                {line}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
