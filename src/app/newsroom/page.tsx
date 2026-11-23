import type { Metadata } from "next";
import { InteriorHero } from "@/components/interior-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { stories } from "@/lib/content";
import { frames } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "Notes from Damakese Marketing & Events: the company, the four kinds of work, and the day before the doors open.",
  alternates: { canonical: "/newsroom" },
};

export default function NewsroomPage() {
  const [lead, ...rest] = stories;

  return (
    <>
      <SiteHeader />
      <main id="content" className="bg-ivory">
        <InteriorHero
          crumb="Newsroom"
          title="newsroom"
          line="Notes from the studio. The work, as we are doing it."
          image={frames.conference}
          imageAlt="A conference room set for a briefing."
        />

        <article className="group bg-sand">
          <div className="mx-auto grid max-w-[90rem] items-center gap-8 px-5 py-16 md:px-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[1.35rem]">
            <img src={lead.image} alt={lead.imageAlt} className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
          </div>
          <div>
            <p className="display text-6xl leading-none text-lime">01</p>
            <p className="ui mt-4 text-sm text-forest">{lead.date}</p>
            <h2 className="display mt-3 text-4xl text-green md:text-5xl">{lead.title}</h2>
            <span className="rule mt-5" />
            <p className="mt-5 text-xl">{lead.lede}</p>
            <p className="mt-4 max-w-[var(--measure)] text-lg leading-relaxed">{lead.body}</p>
          </div>
          </div>
        </article>

        <section className="bg-ivory">
          <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-20">
            <ul className="grid gap-12">
              {rest.map((story, index) => (
                <li key={story.slug} className="group grid items-start gap-6 border-t border-stone pt-10 transition-colors duration-500 hover:border-lime md:grid-cols-12">
                  <p className="display text-5xl leading-none text-lime md:col-span-1">{`0${index + 2}`}</p>
                  <div className="overflow-hidden rounded-[1.35rem] md:col-span-4">
                    <img src={story.image} alt={story.imageAlt} className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <div className="md:col-span-7">
                    <p className="ui text-sm text-forest">{story.date}</p>
                    <h2 className="display mt-3 text-3xl text-green transition-transform duration-200 group-hover:translate-x-2 md:text-4xl">{story.title}</h2>
                    <p className="mt-4 text-lg">{story.lede}</p>
                    <p className="mt-4 max-w-[var(--measure)] leading-relaxed">{story.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
