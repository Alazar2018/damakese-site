"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { Reveal } from "@/components/marks";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { rooms, SpaceMarquee } from "@/components/space-marquee";
import { PracticeKinds } from "@/components/practice-kinds";
import { audiences, faqs, offers, values } from "@/lib/content";
import { formatDay } from "@/lib/format";
import { frames } from "@/lib/photos";
import { useDesk } from "@/lib/store";

const steps = [
  "The brief: what the day has to achieve.",
  "The idea, written before a supplier is called.",
  "The plan, and the second plan.",
  "Build, then test, then leave it alone.",
  "Doors. The crew stays until the last truck.",
];

export function HomeView() {
  const { events } = useDesk();
  const book = events
    .filter((event) => event.visibility === "public")
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main id="content" className="min-h-screen overflow-hidden bg-ivory">
        <PageHero
          eyebrow="Damakese · Addis Ababa"
          title={"The room this day\nhas not been built."}
          lede="An event is a promise made in public. It either works, or everyone in the room knows it did not."
        />

        <SpaceMarquee slides={rooms} topClass="text-green" />

        <section className="mx-auto max-w-2xl px-5 pt-2 pb-8 text-center sm:px-6">
          <h2 className="display text-3xl text-green sm:text-4xl">Event production in Addis Ababa.</h2>
          <p className="mt-4 text-base leading-relaxed text-ink sm:text-lg md:text-xl">
            Damakese plans and produces conferences, state occasions, concerts, exhibitions and launches from a blank page. No recycled floor. No borrowed run sheet.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:mt-8 sm:flex-row sm:gap-8">
            <Link href="/inquire" className="ui font-semibold text-green underline decoration-stone underline-offset-4 transition-colors hover:decoration-green">
              Start a brief
            </Link>
            <Link href="/work" className="ui font-semibold text-green underline decoration-stone underline-offset-4 transition-colors hover:decoration-green">
              See the book
            </Link>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-24">
            <Reveal>
              <p className="eyebrow">Hire the house</p>
              <h2 className="display mt-4 max-w-3xl text-4xl text-green md:text-5xl">The work, named the way a client asks for it.</h2>
            </Reveal>
            <ul className="mt-12 grid gap-px bg-stone sm:grid-cols-2 lg:grid-cols-3">
              {offers.map((offer) => (
                <li key={offer.title} className="bg-white p-6 md:p-8">
                  <h3 className="display text-2xl text-green">{offer.title}</h3>
                  <p className="mt-3 leading-relaxed">{offer.body}</p>
                </li>
              ))}
            </ul>
            <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {audiences.map((audience) => (
                <li key={audience.title}>
                  <h3 className="text-lg text-green">{audience.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/80">{audience.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-ivory">
          <div className="mx-auto grid max-w-[90rem] items-center gap-10 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-2">
            <Reveal>
              <img src={frames.about} alt="People gathered in a room before an evening event." className="aspect-[4/3] w-full object-cover" />
            </Reveal>
            <Reveal delay={80}>
              <p className="eyebrow">The name</p>
              <h2 className="display mt-4 text-4xl leading-[1.1] text-green md:text-5xl">Everything it has comes out when it is pressed.</h2>
              <span className="rule mt-6" />
              <p className="mt-6 text-lg leading-relaxed">
                It begins the same way in every house. Something is wrong, it is late, and the clinic is closed. Someone goes to the garden and comes back with a handful of damakese. The leaves are crushed, the steam is breathed in, and the room waits.
              </p>
              <p className="mt-4 text-lg leading-relaxed">It works, and it works quickly. Nine years on Ethiopia’s largest stages, that is still the standard.</p>
              <Link href="/about" className="btn btn-solid mt-8">
                About the house
                <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </section>

        <section className="bg-sand">
          <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-24">
            <Reveal>
              <p className="eyebrow">The practice</p>
              <h2 className="display mt-4 max-w-3xl text-4xl text-green md:text-5xl">Five kinds of day. One standard.</h2>
            </Reveal>
            <PracticeKinds />
          </div>
        </section>

        <section className="bg-ivory">
          <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-24">
            <Reveal>
              <p className="eyebrow">On the book</p>
              <h2 className="display mt-4 max-w-3xl text-4xl text-green md:text-5xl">Days that can carry a name.</h2>
            </Reveal>
            {book.length === 0 ? (
              <p className="mt-10 max-w-[var(--measure)] text-lg">Nothing on the public book yet. A day stays internal until it can carry someone’s name.</p>
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
              <p className="eyebrow">End to end</p>
              <h2 className="display mt-4 text-4xl text-green md:text-5xl">The day, in the order it is made.</h2>
              <span className="rule mt-6" />
              <ol className="mt-8 space-y-4">
                {steps.map((step, index) => (
                  <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-stone pt-4">
                    <span className="ui text-sm text-forest">0{index + 1}</span>
                    <span className="text-lg">{step}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7" delay={80}>
              <p className="eyebrow">How the day is kept</p>
              <ul className="mt-6 space-y-8">
                {values.map((value) => (
                  <li key={value.index}>
                    <p className="ui text-xs font-medium tracking-[0.16em] text-forest uppercase">{value.index}</p>
                    <h3 className="display mt-2 text-2xl text-green">{value.title}</h3>
                    <p className="mt-2 max-w-[var(--measure)] leading-relaxed">{value.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
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
                  <summary className="cursor-pointer list-none text-xl text-green [&::-webkit-details-marker]:hidden">
                    {item.question}
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
              <p className="eyebrow">A date</p>
              <h2 className="display mt-4 text-4xl md:text-6xl">Tell us what the day has to achieve.</h2>
              <span className="rule mt-6" />
            </div>
            <Link href="/inquire" className="btn btn-inverse">
              Start a brief
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter line={false} />
    </>
  );
}
