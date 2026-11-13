import type { Metadata } from "next";
import { FilmRail } from "@/components/film-rail";
import { InteriorHero } from "@/components/interior-hero";
import { AboutValues } from "@/components/about-values";
import { CallReasons } from "@/components/call-reasons";
import { Reveal } from "@/components/marks";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { aboutCopy, mission, vision } from "@/lib/content";
import { frames } from "@/lib/photos";

export const metadata: Metadata = {
  title: "About",
  description:
    "Damakese Marketing & Events is a full-service marketing, events and entertainment company in Addis Ababa, built on more than nine years of team experience.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="content" className="bg-ivory">
        <InteriorHero
          crumb="About"
          title="about"
          line="Rooted in experience. Driven by creativity."
          image={frames.about}
          imageAlt="A hall set for an event, before the guests arrive."
        />

        <section className="bg-sand">
          <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-24">
            <Reveal>
              <p className="eyebrow">Our story</p>
              <h2 className="display mt-4 max-w-3xl text-4xl text-green md:text-5xl">A new company. Nine years in the work.</h2>
            </Reveal>
            <article className="mt-16 grid bg-ivory md:mt-24 md:grid-cols-2">
              <img
                src={frames.hall}
                alt="An event floor, lit and empty, before the doors open."
                className="aspect-[4/3] h-full w-full object-cover object-[center_40%]"
              />
              <div className="flex flex-col justify-center gap-5 px-8 py-12 md:px-14 md:py-16">
                <p className="text-lg">{aboutCopy.opening}</p>
                <p className="text-lg">{aboutCopy.who}</p>
                <span className="rule" />
                <p className="text-xl leading-relaxed text-green">{aboutCopy.years}</p>
              </div>
            </article>
          </div>
        </section>

        <section className="on-green bg-green text-ivory">
          <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-16 md:grid-cols-2 md:px-12 md:py-24">
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

        <AboutValues />

        <FilmRail />

        <CallReasons />
      </main>
      <SiteFooter />
    </>
  );
}
