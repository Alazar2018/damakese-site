import type { Metadata } from "next";
import { AboutHero } from "@/components/about-hero";
import { AboutValues } from "@/components/about-values";
import { CallReasons } from "@/components/call-reasons";
import { Reveal } from "@/components/marks";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { audiences } from "@/lib/content";
import { frames } from "@/lib/photos";

export const metadata: Metadata = {
  title: "About",
  description:
    "Damakese Events is the Addis Ababa house that produces conferences, concerts, state occasions, exhibitions and launches across Ethiopia.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="content" className="bg-ivory">
        <AboutHero />

        <section className="bg-sand">
          <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-24">
            <Reveal>
              <p className="eyebrow">The name</p>
              <h2 className="display mt-4 max-w-3xl text-4xl text-green md:text-5xl">Everything it has comes out when it is pressed.</h2>
            </Reveal>
            <article className="mt-16 grid bg-ivory md:mt-24 md:grid-cols-2">
              <img
                src={frames.hall}
                alt="An event floor, lit and empty, before the doors open."
                className="aspect-[4/3] h-full w-full object-cover object-[center_40%]"
              />
              <div className="flex flex-col justify-center gap-5 px-8 py-12 md:px-14 md:py-16">
                <p className="text-lg">
                  It begins the same way in every house. Something is wrong, it is late, and the clinic is closed. Someone goes to the garden and comes back with a handful of damakese. The leaves are crushed, the steam is breathed in, and the room waits.
                </p>
                <p className="text-lg">It works, and it works quickly.</p>
                <span className="rule" />
                <p className="text-xl leading-relaxed text-green">
                  Damakese Marketing & Events plans and produces the occasions a client cannot afford to get wrong.
                </p>
                <p className="max-w-[var(--measure)] text-lg">
                  Nine years on Ethiopia’s largest stages. We design the moment a guest remembers, and we deliver the day that makes it possible.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="bg-ivory">
          <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-24">
            <Reveal>
              <p className="eyebrow">Who hires the house</p>
              <h2 className="display mt-4 max-w-3xl text-4xl text-green md:text-5xl">A day a client cannot afford to get wrong.</h2>
              <p className="mt-6 max-w-[var(--measure)] text-lg leading-relaxed">
                Companies come for a conference or a launch. Ministries and embassies come for a protocol day. Promoters come for a concert. Brands come for an activation that was written for them, not lifted from last season. Concept, production, and the crew on the day sit in one house.
              </p>
            </Reveal>
            <ul className="mt-12 grid gap-8 md:grid-cols-2">
              {audiences.map((audience) => (
                <li key={audience.title} className="border-t border-stone pt-6">
                  <h3 className="display text-2xl text-green">{audience.title}</h3>
                  <p className="mt-3 max-w-[var(--measure)] text-lg leading-relaxed">{audience.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <AboutValues />

        <CallReasons />
      </main>
      <SiteFooter />
    </>
  );
}
