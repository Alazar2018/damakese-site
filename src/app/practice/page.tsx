import type { Metadata } from "next";
import { InteriorHero } from "@/components/interior-hero";
import { PracticeView } from "@/components/practice-view";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { frames } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Event services in Ethiopia",
  description:
    "Damakese plans campaigns, visual identities, events and live shows in Ethiopia, from the brief through delivery.",
  alternates: { canonical: "/practice" },
};

export default function PracticePage() {
  return (
    <>
      <SiteHeader />
      <main id="content" className="bg-ivory">
        <InteriorHero
          crumb="Services"
          title="services"
          line="Give every brief its own thinking."
          image={frames.stage}
          imageAlt="Stage lights over a live room."
        />
        <PracticeView />
      </main>
      <SiteFooter />
    </>
  );
}
