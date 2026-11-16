"use client";

import { useMemo, useState } from "react";
import { CountUp } from "@/components/count-up";
import { partnerSectors, partners, type PartnerSector } from "@/lib/content";
import { useDesk } from "@/lib/store";

function PartnerWord({ name }: { name: string }) {
  return (
    <span className="ui max-w-[16rem] text-center text-[13px] font-semibold tracking-[0.18em] text-forest/55 uppercase transition-colors duration-300 group-hover:text-green">
      {name}
    </span>
  );
}

export function PartnerMarks({ quiet = false }: { quiet?: boolean }) {
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
  const marks = [
    ...named.map((event) => ({ key: event.id, name: event.client, title: event.kind })),
    ...shown.map((item) => ({ key: item.name, name: item.name, title: item.line })),
  ];
  const visible = quiet ? marks.slice(0, 8) : marks;

  return (
    <>
      {quiet ? null : (
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
      )}
      <ul className={`grid grid-cols-2 gap-px bg-stone ${quiet ? "md:grid-cols-4" : "mt-10 md:grid-cols-3 lg:grid-cols-4"}`}>
        {visible.map((item) => (
          <li key={item.key} className="mark-tile group flex min-h-24 items-center justify-center bg-white px-4 py-5" title={item.title}>
            <PartnerWord name={item.name} />
          </li>
        ))}
      </ul>
      {quiet ? null : (
      <p className="mt-8 max-w-2xl text-sm">
        One set, one ink. A real mark replaces the name when that day is public and can carry it.
      </p>
      )}
    </>
  );
}

export function ClientsWall() {
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
          <PartnerMarks />
        </div>
      </section>
    </>
  );
}
