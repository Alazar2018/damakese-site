"use client";

import Link from "next/link";
import { formatDay, statusLabel } from "@/lib/format";
import { useDesk } from "@/lib/store";

export default function DeskHome() {
  const { events, inquiries, run } = useDesk();
  const openBriefs = inquiries.filter((item) => item.status === "new" || item.status === "review").length;
  const confirmed = events.filter((item) => item.status === "confirmed").length;
  const onSite = events.filter((item) => item.status === "on-site").length;
  const crew = events
    .filter((item) => item.status === "confirmed" || item.status === "on-site" || item.status === "planning")
    .reduce((sum, item) => sum + item.crew, 0);
  const upcoming = events
    .filter((item) => item.status !== "delivered")
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));
  const maxCrew = Math.max(...events.map((item) => item.crew), 1);
  const tones = ["var(--green)", "var(--green-80)", "var(--green-60)", "var(--green-40)"];

  return (
    <div>
      <p className="eyebrow">Overview</p>
      <h1 className="display mt-3 text-4xl text-green md:text-5xl">What is on the day.</h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <section className="on-green bg-green p-8 text-ivory lg:col-span-4">
          <p className="eyebrow">The figure</p>
          <p className="display mt-6 text-7xl text-lime">{String(confirmed).padStart(2, "0")}</p>
          <p className="mt-3 text-lg">Days confirmed, and therefore dates we keep.</p>
        </section>
        <section className="grid gap-6 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-3">
          {[
            ["Open briefs", String(openBriefs).padStart(2, "0"), "Waiting on an answer."],
            ["On site", String(onSite).padStart(2, "0"), "Crew in the room today."],
            ["Crew booked", String(crew).padStart(2, "0"), "Across days still open."],
          ].map(([label, figure, note]) => (
            <div key={label}>
              <p className="eyebrow">{label}</p>
              <p className="display mt-4 text-5xl text-green">{figure}</p>
              <p className="mt-3 text-sm">{note}</p>
            </div>
          ))}
        </section>
      </div>

      <section className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="display text-2xl text-green">Crew by day</h2>
          <p className="text-sm text-forest">Tones of deep green. Lime stays on the one figure above.</p>
        </div>
        <ul className="mt-6 space-y-3">
          {events.map((event, index) => (
            <li key={event.id} className="grid items-center gap-3 md:grid-cols-[14rem_1fr_3rem]">
              <p className="text-sm">{event.name}</p>
              <div className="h-3 bg-sand" aria-hidden>
                <div className="h-3" style={{ width: `${(event.crew / maxCrew) * 100}%`, background: tones[index % tones.length] }} />
              </div>
              <p className="ui text-sm tabular-nums">{event.crew}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <div className="flex items-end justify-between">
          <h2 className="display text-2xl text-green">The book, still open</h2>
          <Link href="/admin/events" className="ui text-sm underline decoration-green decoration-2 underline-offset-4">
            All days
          </Link>
        </div>
        <div className="table-wrap mt-5">
          <table className="data">
            <thead>
              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Kind</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((event) => (
                <tr key={event.id}>
                  <td>{formatDay(event.date)}</td>
                  <td className="italic">{event.name}</td>
                  <td>{event.kind}</td>
                  <td>{statusLabel[event.status]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="display text-2xl text-green">Latest briefs</h2>
          <ul className="mt-4">
            {inquiries.slice(0, 4).map((item) => (
              <li key={item.id} className="border-t border-stone py-4">
                <p className="font-semibold text-green">{item.organisation}</p>
                <p className="text-sm">{item.brief}</p>
                <p className="ui mt-1 text-xs text-forest">{statusLabel[item.status]}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="display text-2xl text-green">Run sheet, still open</h2>
          <ul className="mt-4">
            {run
              .filter((item) => item.state !== "done")
              .slice(0, 5)
              .map((item) => (
                <li key={item.id} className="grid grid-cols-[4rem_1fr] gap-3 border-t border-stone py-4">
                  <p className="ui text-sm">{item.time}</p>
                  <p>
                    {item.task}
                    <span className="mt-1 block text-sm text-forest">{item.owner} · {statusLabel[item.state]}</span>
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
