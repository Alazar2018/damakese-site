import type { Metadata } from "next";
import { InquireStage } from "@/components/inquire-stage";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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
        <InquireStage />
      </main>
      <SiteFooter />
    </>
  );
}
