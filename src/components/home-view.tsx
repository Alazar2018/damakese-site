"use client";

import Link from "next/link";
import { useState } from "react";
import { CountUp } from "@/components/count-up";
import { HomeHero } from "@/components/home-hero";
import { LineCycle } from "@/components/line-cycle";
import { Reveal } from "@/components/marks";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { rooms, SpaceMarquee } from "@/components/space-marquee";
import {
  aboutCopy,
  disciplines,
  faqs,
  laneForKind,
  manifesto,
  values,
  workLanes,
  workPieces,
  type WorkLane,
} from "@/lib/content";
import { frames } from "@/lib/photos";
import { useDesk } from "@/lib/store";

export function HomeView() {
  const { events } = useDesk();
  const [service, setService] = useState(0);
  const [lane, setLane] = useState<WorkLane>("All");
  const active = disciplines[service];
  const shelf = [
    ...events
      .filter((event) => event.visibility === "public")
      .map((event) => ({
        id: event.id,
        lane: laneForKind(event.kind),
        badge: event.kind,
        title: event.client?.trim() || event.name,
        line: event.note,
        image: event.images[0]?.src || event.image || frames.conference,
        alt: event.images[0]?.alt || event.imageAlt || event.name,
      })),
    ...workPieces.map((piece) => ({ ...piece, alt: "" })),
  ];
  const shown = (lane === "All" ? shelf : shelf.filter((piece) => piece.lane === lane)).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main id="content" className="min-h-screen overflow-hidden bg-sand">
        <HomeHero />

        <SpaceMarquee slides={rooms} topClass="text-sand" groundClass="bg-sand" bottomClass="text-green" />

        <section className="on-green relative bg-green text-ivory">
          <div className="weave pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-24">
            <p className="eyebrow">We are</p>
            <div className="mt-6 max-w-5xl">
              <LineCycle lines={manifesto} />
            </div>
          </div>
        </section>

        <section className="logo-field bg-sand">
          <div className="mx-auto grid max-w-[90rem] items-center gap-10 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow">About us</p>
              <h2 className="display mt-4 text-4xl text-green md:text-5xl">The experience starts before the doors open.</h2>
              <span className="rule mt-6" />
              <p className="mt-6 text-lg leading-relaxed">{aboutCopy.years}</p>
              <Link href="/about" className="btn btn-solid mt-8">
                About the company
              </Link>
            </Reveal>
            <Reveal className="bento-tile on-green relative overflow-hidden bg-[#0e2618] px-8 py-12 text-ivory weave lg:col-span-5" delay={80}>
              <p className="display relative text-8xl leading-none text-lime drop-shadow-[0_0_36px_rgba(156,202,59,0.55)] md:text-9xl">
                <CountUp to={9} />
              </p>
              <p className="relative mt-4 text-xl leading-snug">years of industry experience across our team.</p>
              <p className="relative mt-4 text-ivory/80">{aboutCopy.close}</p>
            </Reveal>
          </div>
        </section>

        <section className="on-green bg-green text-ivory">
          <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-24">
            <Reveal>
              <p className="eyebrow">What we do</p>
              <h2 className="display mt-4 max-w-3xl text-4xl text-ivory md:text-5xl">Each brief starts with a question.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/85">
                A brand finding its voice. A campaign that gives people a reason to take part. A stage ready for the first cue. What do we want people to take away?
              </p>
            </Reveal>
            <div className="mt-12 grid items-stretch gap-10 lg:grid-cols-12">
              <div role="tablist" aria-label="What we do" className="lg:col-span-5">
                {disciplines.map((item, index) => {
                  const selected = service === index;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setService(index)}
                      onKeyDown={(event) => {
                        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
                        event.preventDefault();
                        const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
                        const next = forward ? (index + 1) % disciplines.length : (index - 1 + disciplines.length) % disciplines.length;
                        setService(next);
                        const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
                        tabs?.[next]?.focus();
                      }}
                      className={`group flex w-full cursor-pointer items-baseline gap-4 border-t border-ivory/25 py-5 text-left ${selected ? "text-ivory" : "text-ivory/65"}`}
                    >
                      <span className="ui w-8 shrink-0 text-xs tracking-[0.16em] text-lime">{item.index}</span>
                      <span className={`display text-2xl transition-transform duration-200 md:text-3xl ${selected ? "translate-x-2 text-lime" : "group-hover:translate-x-2"}`}>
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>
              <article className="group relative min-h-80 overflow-hidden rounded-[1.35rem] bg-[#0c2416] lg:col-span-7">
                <img key={active.title} src={active.image} alt={active.imageAlt} className="fade-up absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c2416] via-[#0c2416]/25 to-transparent" />
                <div className="relative flex h-full min-h-80 flex-col justify-end p-6 md:p-10">
                  <p className="ui text-xs font-medium tracking-[0.16em] text-lime uppercase">{active.index}</p>
                  <h3 className="display mt-3 max-w-xl text-3xl text-ivory md:text-4xl">{active.line}</h3>
                  <p className="mt-4 max-w-[var(--measure)] text-lg leading-relaxed text-ivory/85">{active.body}</p>
                  <Link href="/practice" className="ui mt-6 font-semibold text-lime underline decoration-lime decoration-2 underline-offset-4">
                    See the practice
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="logo-field bg-sand">
          <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-24">
            <Reveal>
              <p className="eyebrow">Our values</p>
              <h2 className="display mt-4 max-w-3xl text-4xl text-green md:text-5xl">How the work is kept.</h2>
            </Reveal>
            <ul className="mt-12 grid auto-rows-fr gap-4 md:grid-cols-6">
              {values.map((value, index) => {
                const face = [
                  "md:col-span-3 md:row-span-2 min-h-80 bg-green text-ivory weave",
                  "md:col-span-3 bg-[#f3f8e6] text-green weave-sand",
                  "md:col-span-3 bg-ivory text-green",
                  "md:col-span-3 bg-lime text-green dot-field-ink",
                  "md:col-span-3 bg-[#0c2416] text-ivory",
                ][index];
                return (
                  <li key={value.index} className={`bento-tile relative overflow-hidden p-7 ${face}`}>
                    <p className={`display text-5xl leading-none ${index === 3 ? "text-green" : "text-lime"}`}>{value.index}</p>
                    <h3 className={`display mt-4 text-2xl ${index === 0 || index === 4 ? "text-ivory" : "text-green"}`}>{value.title}</h3>
                    <p className={`mt-3 max-w-[36ch] leading-relaxed ${index === 0 || index === 4 ? "text-ivory/85" : ""}`}>{value.body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="bg-sand">
          <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-24">
            <Reveal>
              <p className="eyebrow">Selected projects</p>
              <h2 className="display mt-4 max-w-3xl text-4xl text-green md:text-5xl">The same four shelves.</h2>
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter the work">
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
                      selected ? "bg-lime text-green" : "border border-green/20 bg-sand text-green"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <p className="mt-6 max-w-2xl text-lg">
              Marketing, branding, events, and concerts. A client’s name replaces the title when that day is public.
            </p>
            <div className="mt-10 grid items-start gap-8 md:grid-cols-3">
              {shown.map((piece) => (
                <Link key={piece.id} href="/work" className="group block">
                  <div className="overflow-hidden rounded-[1.35rem] bg-green">
                    <img src={piece.image} alt={piece.alt} className="photo-zoom aspect-[4/5] w-full object-cover" />
                  </div>
                  <p className="ui mt-4 text-xs font-medium tracking-[0.14em] text-forest uppercase">{piece.badge}</p>
                  <h3 className="mt-2 text-2xl text-green italic">{piece.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/80">{piece.line}</p>
                </Link>
              ))}
            </div>
            <Link href="/work" className="btn btn-solid mt-8">
              The full shelf
            </Link>
          </div>
        </section>

        <section className="bg-sand">
          <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">Before you write</p>
              <h2 className="display mt-4 text-4xl text-green md:text-5xl">Questions clients ask first.</h2>
              <span className="rule mt-6" />
            </Reveal>
            <div className="lg:col-span-8">
              {faqs.map((item, index) => (
                <details key={item.question} className="group border-t border-green/20 open:border-lime">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 py-4 text-green [&::-webkit-details-marker]:hidden">
                    <span className="ui w-8 shrink-0 text-xs tracking-[0.16em] text-forest">{`0${index + 1}`}</span>
                    <span className="display flex-1 text-xl transition-transform duration-200 group-open:translate-x-2 group-hover:translate-x-2 md:text-2xl">{item.question}</span>
                    <span aria-hidden className="ui inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green text-lg text-lime transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-[var(--measure)] pb-6 pl-12 text-lg leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

      </main>
      <SiteFooter line={false} />
    </>
  );
}
