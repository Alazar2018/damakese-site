"use client";

import { useState } from "react";
import Link from "next/link";

const reasons = [
  ["01", "Rooted here", "We know this city: its venues and their loading doors, its suppliers and who actually delivers, its permits, its protocol and its traffic."],
  ["02", "Sharper under pressure", "Our standard rises when the schedule breaks. The hour a supplier fails is the hour a client finds out what they bought."],
  ["03", "Relief, quickly", "Clients arrive with a date and a risk. We take the risk off them and give back a day that worked."],
] as const;

export function CallReasons() {
  const [open, setOpen] = useState(0);

  return (
    <section className="on-green bg-green text-ivory">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-20 md:grid-cols-12 md:px-12 md:py-24">
        <div className="md:col-span-5">
          <p className="eyebrow">Why the call comes</p>
          <h2 className="display mt-4 text-4xl md:text-5xl">We are hired for the hour nothing can go wrong.</h2>
          <span className="rule mt-6" />
          <Link href="/inquire" className="btn btn-inverse mt-8">
            Start a brief
          </Link>
        </div>
        <div className="md:col-span-6 md:col-start-7" role="list">
          {reasons.map(([index, title, body], item) => {
            const selected = open === item;
            return (
              <button
                key={index}
                type="button"
                role="listitem"
                aria-pressed={selected}
                onClick={() => setOpen(item)}
                className={`block w-full cursor-pointer border-t border-ivory/25 py-5 text-left ${selected ? "" : "opacity-70"}`}
              >
                <span className="ui block text-sm text-ivory/70">{index}</span>
                <span className="display mt-2 block text-2xl">{title}</span>
                <span className={`mt-3 block text-ivory/85 ${selected ? "" : "hidden"}`}>{body}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
