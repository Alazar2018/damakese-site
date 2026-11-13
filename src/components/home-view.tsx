"use client";

import Link from "next/link";
import { useState } from "react";
import { CountUp } from "@/components/count-up";
import { FilmRail } from "@/components/film-rail";
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
  howWeWork,
  manifesto,
  mission,
  values,
  vision,
} from "@/lib/content";
import { formatDay } from "@/lib/format";
import { frames } from "@/lib/photos";
import { useDesk } from "@/lib/store";

export function HomeView() {
  const { events } = useDesk();
  const [service, setService] = useState(0);
  const active = disciplines[service];
  const book = events
    .filter((event) => event.visibility === "public")
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main id="content" className="min-h-screen overflow-hidden bg-ivory">
        <HomeHero />

        <SpaceMarquee slides={rooms} topClass="text-ivory" />

        <section className="on-green relative bg-green text-ivory">
          <div className="ribs-quiet pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-24">
            <p className="eyebrow">We are</p>
            <div className="mt-6 max-w-5xl">
              <LineCycle lines={manifesto} />
            </div>
            <p className="mt-10 max-w-3xl text-lg leading-relaxed text-ivory/85">{aboutCopy.opening}</p>
          </div>
        </section>

        <section className="bg-ivory">
          <div className="mx-auto grid max-w-[90rem] items-center gap-10 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow">About us</p>
              <h2 className="display mt-4 text-4xl text-green md:text-5xl">The experience starts before the doors open.</h2>
              <span className="rule mt-6" />
              <p className="mt-6 text-lg leading-relaxed">{aboutCopy.who}</p>
              <p className="mt-4 text-lg leading-relaxed">{aboutCopy.years}</p>
              <Link href="/about" className="btn btn-solid mt-8">
                About the company
              </Link>
            </Reveal>
            <Reveal className="on-green relative overflow-hidden bg-[#0e2618] px-8 py-12 text-ivory lg:col-span-5" delay={80}>
              <div className="ribs-quiet pointer-events-none absolute inset-0" aria-hidden />
              <p className="display relative text-8xl leading-none text-lime drop-shadow-[0_0_36px_rgba(156,202,59,0.55)] md:text-9xl">
                <CountUp to={9} />
              </p>
              <p className="relative mt-4 text-xl leading-snug">years of industry experience across our team.</p>
              <p className="relative mt-4 text-ivory/80">{aboutCopy.close}</p>
            </Reveal>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-24">
            <Reveal>
              <p className="eyebrow">What we do</p>
              <h2 className="display mt-4 max-w-3xl text-4xl text-green md:text-5xl">Each brief starts with a question.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed">
                A brand finding its voice. A campaign that gives people a reason to take part. A stage ready for the first cue. What do we want people to take away?
              </p>
            </Reveal>
            <div className="mt-10 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="What we do">
              {disciplines.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={service === index}
                  tabIndex={service === index ? 0 : -1}
                  onClick={() => setService(index)}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                    event.preventDefault();
                    const next =
                      event.key === "ArrowRight"
                        ? (index + 1) % disciplines.length
                        : (index - 1 + disciplines.length) % disciplines.length;
                    setService(next);
                    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
                    tabs?.[next]?.focus();
                  }}
                  className={`ui shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm ${
                    service === index ? "bg-green text-ivory" : "bg-ivory text-green"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <article className="group mt-8 grid overflow-hidden bg-ivory md:grid-cols-2">
              <img key={active.title} src={active.image} alt={active.imageAlt} className="fade-up aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
              <div className="flex flex-col justify-center px-6 py-10 md:px-12">
                <p className="ui text-xs font-medium tracking-[0.16em] text-forest uppercase">{active.index}</p>
                <h3 className="display mt-3 text-3xl text-green md:text-4xl">{active.line}</h3>
                <span className="rule mt-5" />
                <p className="mt-5 max-w-[var(--measure)] text-lg leading-relaxed">{active.body}</p>
                <Link href="/practice" className="ui mt-6 font-semibold text-green underline decoration-lime decoration-2 underline-offset-4">
                  See the practice
                </Link>
              </div>
            </article>
          </div>
        </section>

        <FilmRail />

        <section className="on-green relative bg-green text-ivory">
          <div className="ribs-quiet pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto grid max-w-[90rem] gap-12 px-5 py-16 md:grid-cols-2 md:px-12 md:py-24">
            <div>
              <p className="eyebrow">Our mission</p>
              <h2 className="display mt-4 text-4xl">Communicate clearly. Bring people together.</h2>
              <span className="rule mt-6" />
              <p className="mt-6 text-lg leading-relaxed text-ivory/85">{mission}</p>
            </div>
            <div>
              <p className="eyebrow">Our vision</p>
              <h2 className="display mt-4 text-4xl text-lime">Original thinking. Dependable work.</h2>
              <span className="rule mt-6" />
              <p className="mt-6 text-lg leading-relaxed text-ivory/85">{vision}</p>
            </div>
          </div>
        </section>

        <section className="bg-ivory">
          <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-24">
            <Reveal>
              <p className="eyebrow">Our values</p>
              <h2 className="display mt-4 max-w-3xl text-4xl text-green md:text-5xl">How the work is kept.</h2>
            </Reveal>
            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value) => (
                <li key={value.index} className="invite border-t border-stone pt-5 hover:border-lime">
                  <p className="display text-5xl leading-none text-lime">{value.index}</p>
                  <h3 className="display mt-3 text-2xl text-green">{value.title}</h3>
                  <p className="mt-3 leading-relaxed">{value.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-sand">
          <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-24">
            <Reveal>
              <p className="eyebrow">Selected projects</p>
              <h2 className="display mt-4 max-w-3xl text-4xl text-green md:text-5xl">Days that can carry a name.</h2>
            </Reveal>
            {book.length === 0 ? (
              <>
                <p className="mt-10 max-w-[var(--measure)] text-lg">
                  Nothing on the public book yet. A day stays internal until it can carry someone’s name.
                </p>
                <Link href="/inquire" className="btn btn-solid mt-8">
                  Start with a brief
                </Link>
              </>
            ) : (
              <div className="mt-12 grid gap-8 md:grid-cols-3">
                {book.map((event) => {
                  const photo = event.images[0]?.src || event.image || frames.conference;
                  const alt = event.images[0]?.alt || event.imageAlt || event.name;
                  return (
                    <Link key={event.id} href="/work" className="group block">
                      <div className="overflow-hidden bg-green">
                        <img src={photo} alt={alt} className="photo-zoom aspect-[4/5] w-full object-cover" />
                      </div>
                      <p className="ui mt-4 text-xs font-medium tracking-[0.14em] text-forest uppercase">
                        {event.kind} · {formatDay(event.date)}
                      </p>
                      <h3 className="mt-2 text-2xl text-green italic">{event.name}</h3>
                      <p className="mt-2 leading-relaxed text-ink/80">{event.note}</p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">How we work</p>
              <h2 className="display mt-4 text-4xl text-green md:text-5xl">From the brief to the handover.</h2>
              <span className="rule mt-6" />
            </Reveal>
            <ol className="lg:col-span-6 lg:col-start-7">
              {howWeWork.map((step, index) => (
                <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-stone py-4 transition-colors duration-300 hover:border-lime">
                  <span className="ui text-sm text-forest">0{index + 1}</span>
                  <span className="text-lg">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-sand">
          <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-24">
            <Reveal>
              <p className="eyebrow">Before you write</p>
              <h2 className="display mt-4 max-w-3xl text-4xl text-green md:text-5xl">Questions clients ask first.</h2>
            </Reveal>
            <div className="mt-12 divide-y divide-stone border-y border-stone">
              {faqs.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-6 text-xl text-green [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <span aria-hidden className="ui text-2xl leading-none text-lime transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[var(--measure)] text-lg leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="on-green bg-green text-ivory">
          <div className="mx-auto flex max-w-[90rem] flex-col gap-8 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-12 md:py-24">
            <div className="max-w-2xl">
              <p className="eyebrow">Contact</p>
              <h2 className="display mt-4 text-4xl md:text-6xl">
                Start the <span className="text-lime">conversation.</span>
              </h2>
              <span className="rule mt-6" />
              <p className="mt-6 text-lg text-ivory/85">Addis Ababa. Tell us what the work has to achieve.</p>
            </div>
            <Link href="/inquire" className="btn bg-lime text-green hover:bg-ivory">
              Let&apos;s talk
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter line={false} />
    </>
  );
}
