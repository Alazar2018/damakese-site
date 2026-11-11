"use client";

import { useMemo, useState } from "react";
import { DayFrames } from "@/components/day-frames";
import { KINDS } from "@/lib/content";
import { formatDay, statusLabel } from "@/lib/format";
import { useDesk, type StudioEvent } from "@/lib/store";

function pictures(event: StudioEvent) {
  if (event.images?.length) return event.images;
  if (event.image) return [{ id: event.id, src: event.image, alt: event.imageAlt }];
  return [];
}

function Spread({
  event,
  index,
  total,
  onStep,
}: {
  event: StudioEvent;
  index: number;
  total: number;
  onStep: (index: number) => void;
}) {
  return (
    <article className="mt-12 grid bg-ivory md:grid-cols-12">
      <div className="md:col-span-7">
        <DayFrames images={pictures(event)} name={event.name} />
      </div>
      <div className="flex flex-col justify-end p-7 md:col-span-5 md:p-12">
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn btn-ghost cursor-pointer" disabled={index === 0} onClick={() => onStep(index - 1)}>
            Previous day
          </button>
          <button type="button" className="btn btn-ghost cursor-pointer" disabled={index >= total - 1} onClick={() => onStep(index + 1)}>
            Next day
          </button>
        </div>
        <p className="eyebrow mt-8">{event.kind}</p>
        <h2 className="mt-4 text-4xl text-green italic md:text-5xl">{event.name}</h2>
        <span className="rule mt-6" />
        <p className="mt-6 text-lg">{event.note}</p>
        <p className="ui mt-8 text-sm text-forest">
          {formatDay(event.date)} · Doors {event.doors}
        </p>
        <p className="mt-2">{event.venue}</p>
        <p className="ui mt-2 text-sm">{statusLabel[event.status]}</p>
      </div>
    </article>
  );
}

export function WorkBook() {
  const { events } = useDesk();
  const [kind, setKind] = useState<string>("All");
  const [spot, setSpot] = useState(0);
  const book = useMemo(() => {
    return events
      .filter((event) => event.visibility === "public")
      .filter((event) => kind === "All" || event.kind === kind)
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [events, kind]);

  return (
    <section className="bg-sand">
    <div className="mx-auto max-w-[90rem] px-5 pt-16 pb-24 md:px-12 md:pt-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <p className="display text-6xl leading-none text-green">{String(book.length).padStart(2, "0")}</p>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter the book">
        {["All", ...KINDS].map((item) => {
          const selected = kind === item;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => {
                setKind(item);
                setSpot(0);
              }}
              className={`ui min-h-11 cursor-pointer px-4 text-sm font-medium ${
                selected ? "bg-green text-ivory" : "bg-sand text-green"
              }`}
            >
              {item}
            </button>
          );
        })}
        </div>
      </div>
      {book.length === 0 ? (
        <p className="mt-10 border-t border-stone py-10">Nothing on the public book in this kind.</p>
      ) : (
        <>
          <Spread event={book[Math.min(spot, book.length - 1)]} index={Math.min(spot, book.length - 1)} total={book.length} onStep={setSpot} />
          {book.length > 1 ? (
            <ul className="mt-8 grid gap-8 sm:grid-cols-2">
              {book.map((event, index) => (
                <li key={event.id}>
                  <article className={`group bg-ivory ${index === Math.min(spot, book.length - 1) ? "ring-2 ring-green" : ""}`}>
                    {pictures(event)[0] ? (
                      <img src={pictures(event)[0].src} alt="" className="aspect-[16/10] w-full object-cover" />
                    ) : null}
                    <div className="p-6 md:p-8">
                      <p className="eyebrow">{event.kind}</p>
                      <h2 className="mt-3 text-3xl text-green italic">
                        <button
                          type="button"
                          aria-pressed={index === Math.min(spot, book.length - 1)}
                          onClick={() => setSpot(index)}
                          className="cursor-pointer text-left"
                        >
                          {event.name}
                        </button>
                      </h2>
                      <span className="rule mt-5" />
                      <p className="mt-5">{event.note}</p>
                      <p className="ui mt-6 text-sm text-forest">
                        {formatDay(event.date)} · Doors {event.doors}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : null}
        </>
      )}
    </div>
    </section>
  );
}
