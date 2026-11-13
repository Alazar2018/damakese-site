"use client";

import Link from "next/link";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { aboutCopy, roles } from "@/lib/content";

export function CareerBoard() {
  const [query, setQuery] = useState("");
  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return roles;
    return roles.filter((role) => `${role.title} ${role.desk} ${role.line}`.toLowerCase().includes(needle));
  }, [query]);

  return (
    <section className="bg-ivory">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-5 pt-16 pb-20 md:px-12 md:pt-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="display text-4xl text-green md:text-5xl">Our job offers</h2>
            <form className="flex" role="search" onSubmit={(event) => event.preventDefault()}>
              <label className="sr-only" htmlFor="role-search">
                Search roles
              </label>
              <input
                id="role-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search..."
                className="min-h-12 w-48 border border-stone bg-white px-4 text-green outline-none"
              />
              <span className="inline-flex w-12 items-center justify-center border border-l-0 border-stone bg-white text-green">
                <MagnifyingGlass size={18} />
              </span>
            </form>
          </div>

          <ul className="mt-8 space-y-4">
            {shown.length === 0 ? <li className="border-t border-stone py-8">No role matches that search.</li> : null}
            {shown.map((role, index) => {
              const lead = index === 0 && !query;
              return (
                <li key={role.slug}>
                  <Link
                    href={`/career/${role.slug}`}
                    className={`group relative block overflow-hidden px-6 py-8 md:px-8 md:py-10 ${
                      lead ? "bg-lime text-green" : "on-green bg-green text-ivory"
                    }`}
                  >
                    <span className={`ui text-xs tracking-[0.16em] uppercase ${lead ? "text-forest" : "text-lime"}`}>{role.desk}</span>
                    <span className="display mt-3 block max-w-xl text-3xl md:text-4xl">{role.title}</span>
                    <span className="mt-8 flex items-center justify-between gap-4">
                      <span className="text-sm">{role.type}</span>
                      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${lead ? "bg-green text-lime" : "bg-ivory text-green"}`}>
                        <ArrowRight size={18} />
                        <span className="sr-only">Open {role.title}</span>
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="lg:col-span-5 lg:pt-16">
          <p className="text-lg leading-relaxed text-green/80">{aboutCopy.who}</p>
          <p className="mt-6 text-lg leading-relaxed text-green/80">{aboutCopy.years}</p>
          <p className="mt-6 text-lg leading-relaxed text-green/80">{aboutCopy.close}</p>
        </aside>
      </div>
    </section>
  );
}
