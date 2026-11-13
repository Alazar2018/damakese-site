import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CareerApply } from "@/components/career-apply";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { roles } from "@/lib/content";

type Params = { slug: string };

export const instant = false;

export function generateStaticParams() {
  return roles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const role = roles.find((item) => item.slug === slug);
  if (!role) return { title: "Career" };
  return {
    title: role.title,
    description: role.line,
    alternates: { canonical: `/career/${role.slug}` },
  };
}

export default async function CareerRolePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const role = roles.find((item) => item.slug === slug);
  if (!role) notFound();

  return (
    <>
      <SiteHeader />
      <main id="content" className="bg-ivory">
        <article className="mx-auto grid max-w-[90rem] gap-12 px-5 pt-32 pb-20 md:px-12 md:pt-40 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Link href="/career" className="ui text-sm font-medium text-forest underline decoration-lime decoration-2 underline-offset-4">
              All roles
            </Link>
            <p className="eyebrow mt-8">{role.desk}</p>
            <h1 className="display mt-3 text-4xl text-green md:text-6xl">{role.title}</h1>
            <p className="mt-3 text-sm">{role.type}</p>
            <span className="rule mt-6" />
            <p className="mt-6 max-w-[var(--measure)] text-xl">{role.summary}</p>
            <h2 className="display mt-10 text-2xl text-green">What the seat asks</h2>
            <ul className="mt-4 max-w-[var(--measure)] space-y-3">
              {role.asks.map((ask) => (
                <li key={ask} className="border-t border-stone pt-3">
                  {ask}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <p className="eyebrow">Write to us</p>
            <h2 className="display mt-3 text-3xl text-green">Send a note for this seat.</h2>
            <div className="mt-8">
              <CareerApply role={role.title} />
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
