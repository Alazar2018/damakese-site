"use client";

import { Play, X } from "@phosphor-icons/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { workLanes, workPieces, type WorkLane, type WorkPiece } from "@/lib/content";
import { frameFor } from "@/lib/photos";
import { useDesk, type StudioEvent } from "@/lib/store";

const aspects = ["aspect-[16/10]", "aspect-[4/5]", "aspect-square", "aspect-[3/4]"];

function fromEvent(event: StudioEvent): WorkPiece {
  const image = event.images?.[0]?.src || event.image || frameFor(event.id, event.kind);
  return {
    id: event.id,
    lane: "Events",
    badge: event.kind,
    title: event.client?.trim() || event.name,
    line: event.note,
    image,
  };
}

export function WorkArchive() {
  const { events } = useDesk();
  const [lane, setLane] = useState<WorkLane>("All");
  const [open, setOpen] = useState<WorkPiece | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const pieces = useMemo(() => {
    const named = events.filter((event) => event.visibility === "public").map(fromEvent);
    return [...named, ...workPieces];
  }, [events]);

  const shown = lane === "All" ? pieces : pieces.filter((piece) => piece.lane === lane);

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (!open) {
      if (node.open) node.close();
      return;
    }
    if (!node.open) node.showModal();
  }, [open]);

  return (
    <section className="bg-ivory text-ink">
      <div className="mx-auto max-w-[90rem] px-5 pt-12 pb-8 md:px-12 md:pt-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="display text-4xl text-green uppercase md:text-6xl">Some of our work</h2>
            <span className="rule mt-5" />
            <p className="mt-4 text-lg">Nine years of rooms.</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2" role="tablist" aria-label="Filter the work">
            {workLanes.map((item) => {
              const selected = lane === item;
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setLane(item)}
                  className={`ui min-h-11 cursor-pointer rounded-full px-5 text-sm font-medium ${
                    selected ? "bg-green text-ivory" : "border border-stone bg-white text-green"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
        <p className="mt-6 max-w-2xl">
          Film, campaigns, and the days themselves. A client’s name goes on a card when that day is on the public book.
        </p>
      </div>

      <div className="mx-auto max-w-[90rem] columns-1 gap-4 px-5 pb-20 md:columns-2 md:px-12 xl:columns-3 md:pb-28">
        {shown.length === 0 ? (
          <p className="border-t border-stone py-10 text-green">Nothing on this shelf yet.</p>
        ) : (
          shown.map((piece, index) => (
            <button
              key={piece.id}
              type="button"
              onClick={() => setOpen(piece)}
              className="group mb-4 block w-full cursor-pointer break-inside-avoid text-left"
            >
              <span className="relative block overflow-hidden bg-green">
                <img src={piece.image} alt="" className={`${aspects[index % aspects.length]} w-full object-cover transition duration-500 group-hover:scale-[1.03]`} />
                <span className="ui absolute top-4 left-4 rounded-full bg-lime px-3 py-1 text-xs font-semibold tracking-[0.14em] text-green uppercase">
                  {piece.badge}
                </span>
                {piece.video ? (
                  <span className="absolute top-1/2 left-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-green text-lime">
                    <Play size={22} weight="fill" />
                    <span className="sr-only">Play {piece.title}</span>
                  </span>
                ) : null}
              </span>
              <span className="block px-1 pt-4 pb-2">
                <span className="display block text-2xl text-green">{piece.title}</span>
              </span>
            </button>
          ))
        )}
      </div>

      <dialog
        ref={dialog}
        className="m-auto w-[min(56rem,calc(100%-2rem))] bg-ivory p-0 text-green backdrop:bg-green/70"
        onClose={() => setOpen(null)}
      >
        {open ? (
          <div>
            <div className="relative bg-green">
              {open.video ? (
                <video key={open.video} className="aspect-video w-full bg-black" controls autoPlay playsInline poster={open.image}>
                  <source src={open.video} type="video/mp4" />
                </video>
              ) : (
                <img src={open.image} alt="" className="aspect-video w-full object-cover" />
              )}
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="absolute top-3 right-3 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-ivory text-green"
              >
                <X size={18} />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="p-6 md:p-8">
              <p className="eyebrow">{open.badge}</p>
              <h2 className="display mt-3 text-3xl">{open.title}</h2>
              <span className="rule mt-5" />
              <p className="mt-5 max-w-[var(--measure)] text-lg">{open.line}</p>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
