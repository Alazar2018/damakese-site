"use client";

import { Play, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { frames } from "@/lib/photos";

const clips = [
  {
    title: "The crowd",
    note: "Live show",
    poster: frames.concert,
    src: "https://videos.pexels.com/video-files/2022395/2022395-sd_640_360_30fps.mp4",
  },
  {
    title: "The stage",
    note: "Lights and sound",
    poster: frames.stage,
    src: "https://videos.pexels.com/video-files/854216/854216-sd_640_360_25fps.mp4",
  },
  {
    title: "The room",
    note: "Before doors",
    poster: frames.hall,
    src: "https://videos.pexels.com/video-files/853889/853889-sd_640_360_25fps.mp4",
  },
  {
    title: "The brief",
    note: "A working room",
    poster: frames.conference,
    src: "https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4",
  },
] as const;

export function FilmRail() {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const clip = open === null ? null : clips[open];

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (open === null) {
      if (node.open) node.close();
      return;
    }
    if (!node.open) node.showModal();
  }, [open]);

  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-20">
        <p className="eyebrow">Pictures and film</p>
        <h2 className="display mt-4 max-w-3xl text-4xl text-green md:text-5xl">Press play. The room moves.</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed">
          Reference film and photographs of the kind of day we produce. A Damakese project stays off this rail until it can carry a name.
        </p>
      </div>
      <div className="flex gap-4 overflow-x-auto px-5 pb-16 md:px-12 md:pb-24" style={{ scrollSnapType: "x mandatory" }}>
        {clips.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setOpen(index)}
            className="group relative h-80 w-64 shrink-0 cursor-pointer overflow-hidden bg-green text-left sm:h-[26rem] sm:w-80"
            style={{ scrollSnapAlign: "start" }}
          >
            <img src={item.poster} alt="" className="photo-zoom h-full w-full object-cover" />
            <span className="absolute inset-0 bg-green/25 transition-colors group-hover:bg-green/10" />
            <span className="absolute top-1/2 left-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-lime text-green">
              <Play size={26} weight="fill" />
              <span className="sr-only">Play {item.title}</span>
            </span>
            <span className="absolute inset-x-0 bottom-0 p-5 text-ivory">
              <span className="ui block text-xs tracking-[0.14em] uppercase">{item.note}</span>
              <span className="display mt-1 block text-2xl">{item.title}</span>
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialog}
        className="m-auto w-[min(960px,calc(100vw-2rem))] bg-transparent p-0 backdrop:bg-green/80"
        onClose={() => setOpen(null)}
        onClick={(event) => {
          if (event.target === dialog.current) setOpen(null);
        }}
      >
        {clip ? (
          <div className="bg-green text-ivory">
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <p className="display text-xl">{clip.title}</p>
              <button type="button" className="inline-flex h-11 w-11 cursor-pointer items-center justify-center" onClick={() => setOpen(null)} aria-label="Close film">
                <X size={20} />
              </button>
            </div>
            <video key={clip.src} className="aspect-video w-full bg-black" controls autoPlay playsInline poster={clip.poster} src={clip.src} />
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
