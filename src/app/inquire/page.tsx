import type { Metadata } from "next";
import { InquireStage } from "@/components/inquire-stage";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Inquire",
  description: "Tell Damakese what the day has to achieve. A date we confirm is a date we keep.",
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
