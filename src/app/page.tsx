import type { Metadata } from "next";
import { HomeView } from "@/components/home-view";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Damakese Marketing & Events | Events in Ethiopia" },
  description:
    "Damakese Marketing & Events produces conferences, concerts, state occasions, exhibitions and launches in Ethiopia, from Addis Ababa.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomeView />
    </>
  );
}
