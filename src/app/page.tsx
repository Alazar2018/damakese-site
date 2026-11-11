import type { Metadata } from "next";
import { HomeView } from "@/components/home-view";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Damakese · Event production in Addis Ababa" },
  description:
    "Damakese plans and produces conferences, state occasions, concerts, exhibitions and product launches in Addis Ababa. One crew, from the idea to the last truck.",
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
