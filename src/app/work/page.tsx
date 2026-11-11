import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/marks";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WorkBook } from "@/components/work-book";
import { frames } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Work",
  description: "Days on the Damakese book. Conferences, state occasions, concerts, exhibitions and launches in Addis Ababa.",
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main id="content" className="bg-ivory">
        <header className="on-green relative min-h-[78dvh] overflow-hidden bg-green text-ivory">
          <img src={frames.hall} alt="" className="hero-settle absolute inset-0 h-full w-full object-cover object-[center_42%]" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, color-mix(in srgb, var(--green) 92%, black) 0%, color-mix(in srgb, var(--green) 70%, transparent) 48%, color-mix(in srgb, var(--green) 28%, transparent) 100%)",
            }}
          />
          <span aria-hidden className="sheen" />
          <div className="relative z-10 mx-auto flex min-h-[78dvh] max-w-[90rem] flex-col justify-end px-5 pt-36 pb-14 md:px-12 md:pb-20">
            <p className="eyebrow fade-up">The book</p>
            <h1 className="display mt-4 max-w-4xl text-4xl leading-[1.05] sm:text-5xl md:text-7xl">
              <span className="block overflow-hidden">
                <span className="line-rise">Days written before</span>
              </span>
              <span className="block overflow-hidden">
                <span className="line-rise" style={{ animationDelay: "120ms" }}>
                  they are built.
                </span>
              </span>
            </h1>
            <span className="rule rule-draw mt-7" />
            <p className="fade-up mt-6 max-w-xl text-lg leading-relaxed text-ivory/90" style={{ animationDelay: "240ms" }}>
              Public days, with the room they belong to. A day stays internal until it can carry someone’s name.
            </p>
          </div>
        </header>
        <WorkBook />
        <section className="on-green bg-green text-ivory">
          <Reveal className="mx-auto flex max-w-[90rem] flex-col gap-8 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-12 md:py-24">
            <div className="max-w-2xl">
              <p className="eyebrow">A date</p>
              <h2 className="display mt-4 text-4xl md:text-6xl">If the day can carry a name, it can carry a brief.</h2>
              <span className="rule mt-6" />
            </div>
            <Link href="/inquire" className="btn btn-inverse">
              Start a brief
            </Link>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
