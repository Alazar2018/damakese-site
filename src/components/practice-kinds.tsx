"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { practices } from "@/lib/content";

export function PracticeKinds() {
  const [open, setOpen] = useState(0);
  const id = useId();

  return (
    <div className="mt-12">
      <div className="border-t border-stone">
        {practices.map((item, index) => {
          const expanded = open === index;
          return (
            <div key={item.kind} className="border-b border-stone">
              <button
                type="button"
                id={`${id}-button-${index}`}
                aria-expanded={expanded}
                aria-controls={`${id}-panel-${index}`}
                onClick={() => setOpen(expanded ? -1 : index)}
                className="group flex w-full cursor-pointer items-center gap-4 py-6 text-left"
              >
                <span className="ui w-10 shrink-0 text-sm font-medium text-forest">{item.index}</span>
                <span
                  className={`display text-2xl text-green transition-transform duration-200 md:text-3xl ${
                    expanded ? "translate-x-2" : "group-hover:translate-x-2"
                  }`}
                >
                  {item.title}
                </span>
                <span className="ml-auto hidden max-w-xs text-right text-base text-ink/70 sm:block">{item.line}</span>
                <ArrowRight
                  size={16}
                  aria-hidden
                  className={`shrink-0 text-forest transition-transform duration-200 ${expanded ? "rotate-90" : "group-hover:translate-x-1"}`}
                />
              </button>
              <div
                id={`${id}-panel-${index}`}
                role="region"
                aria-labelledby={`${id}-button-${index}`}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="grid items-center gap-6 pb-8 pl-0 sm:pl-14 md:grid-cols-[1.4fr_1fr]">
                    <div>
                      <p className="max-w-[var(--measure)] text-lg leading-relaxed">{item.detail}</p>
                      <ul className="mt-4 space-y-1 text-ink/80">
                        {item.includes.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    <img src={item.image} alt={item.imageAlt} className="aspect-[4/3] w-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-ink/75">One crew. The date stays the date.</p>
        <Link href="/practice" className="ui text-sm font-medium text-green underline decoration-stone underline-offset-4 hover:decoration-green">
          See the practice
        </Link>
      </div>
    </div>
  );
}
