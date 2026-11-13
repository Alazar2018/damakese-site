"use client";

import { useMemo, useState } from "react";
import { CountUp } from "@/components/count-up";
import { partnerSectors, partners, type PartnerSector } from "@/lib/content";
import { useDesk } from "@/lib/store";

export function ClientsWall() {
  const { events } = useDesk();
  const [sector, setSector] = useState<PartnerSector>("All");
  const named = useMemo(() => {
    const seen = new Set<string>();
    return events
      .filter((event) => event.visibility === "public" && event.client.trim())
      .filter((event) => {
        const key = event.client.trim().toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }, [events]);

  const shown = sector === "All" ? partners : partners.filter((item) => item.sector === sector);

function PartnerLogo({ name }: { name: string }) {
  const words = name.split(" ").filter(Boolean);
  const letters = words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  const seed = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const shape = seed % 3;

  return (
    <span className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 64 64" aria-hidden className="h-14 w-14">
        {shape === 0 ? <circle cx="32" cy="30" r="24" fill="none" stroke="#12341d" strokeWidth="2" /> : null}
        {shape === 1 ? <rect x="8" y="6" width="48" height="48" fill="none" stroke="#12341d" strokeWidth="2" /> : null}
        {shape === 2 ? <rect x="8" y="6" width="48" height="48" rx="14" fill="#12341d" /> : null}
        <text
          x="32"
          y="36"
          textAnchor="middle"
          fontFamily="Montserrat, sans-serif"
          fontSize="16"
          fontWeight="700"
          fill={shape === 2 ? "#9cca3b" : "#12341d"}
        >
          {letters}
        </text>
        <rect x="20" y="54" width="24" height="3" fill="#9cca3b" />
      </svg>
      <span className="ui max-w-[12rem] text-center text-[11px] font-semibold tracking-[0.12em] text-green uppercase">{name}</span>
    </span>
  );
}

  return (
    <>
      <section className="bg-ivory">
        <div className="mx-auto max-w-[90rem] px-5 pt-16 pb-10 md:px-12 md:pt-20">
          <p className="eyebrow">Clients</p>
          <h2 className="display mt-4 max-w-4xl text-5xl text-green md:text-7xl">The company we keep.</h2>
          <div className="mt-12 grid gap-8 border-t border-stone pt-8 sm:grid-cols-3">
            <p>
              <span className="display block text-5xl text-green">
                <CountUp to={9} />
              </span>
              <span className="mt-2 block">years of industry experience across the team.</span>
            </p>
            <p>
              <span className="display block text-5xl text-green">
                <CountUp to={4} />
              </span>
              <span className="mt-2 block">ways the work shows up, from a campaign to a live show.</span>
            </p>
            <p>
              <span className="display block text-5xl text-green">Addis</span>
              <span className="mt-2 block">Ababa is home. The programme can travel when the brief does.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[90rem] px-5 py-12 md:px-12 md:py-16">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter who we work with">
            {partnerSectors.map((item) => {
              const selected = sector === item;
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setSector(item)}
                  className={`ui min-h-11 cursor-pointer rounded-full px-5 text-sm font-medium ${
                    selected ? "bg-green text-ivory" : "border border-stone text-green"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-px bg-stone md:grid-cols-3 lg:grid-cols-4">
            {named.map((event) => (
              <li key={event.id} className="mark-tile flex min-h-40 items-center justify-center bg-white px-4 py-6" title={event.kind}>
                <PartnerLogo name={event.client} />
              </li>
            ))}
            {shown.map((item) => (
              <li key={item.name} className="mark-tile flex min-h-40 items-center justify-center bg-white px-4 py-6" title={item.line}>
                <PartnerLogo name={item.name} />
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-sm">
            These are the partners the work is built for. A name goes on this wall when the day is public and can carry it.
          </p>
        </div>
      </section>
    </>
  );
}
