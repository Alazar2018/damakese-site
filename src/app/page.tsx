import type { Metadata } from "next";
import { HomeView } from "@/components/home-view";

export const metadata: Metadata = {
  title: "Damakese Marketing & Events",
  description:
    "An event is a promise made in public. Damakese produces conferences, state occasions, concerts, exhibitions and trade fairs in Addis Ababa.",
};

export default function HomePage() {
  return <HomeView />;
}
