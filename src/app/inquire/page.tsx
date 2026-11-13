import type { Metadata } from "next";
import { InquireStage } from "@/components/inquire-stage";
import { InteriorHero } from "@/components/interior-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { frames } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Book an event",
  description:
    "Book Damakese Marketing & Events in Ethiopia. Send the date, the kind of event, and what the day has to achieve.",
  alternates: { canonical: "/inquire" },
};

export default function InquirePage() {
  return (
    <>
      <SiteHeader />
      <main id="content" className="bg-ivory">
        <InteriorHero
          crumb="Let's talk"
          title="let's talk"
          line="Tell us what the work has to achieve."
          image={frames.launch}
          imageAlt="A room prepared for a launch."
        />
        <InquireStage />
      </main>
      <SiteFooter />
    </>
  );
}
