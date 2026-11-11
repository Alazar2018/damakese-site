import Link from "next/link";
import { Logo } from "@/components/logo";

export function SiteFooter({ line = true }: { line?: boolean }) {
  return (
    <footer className="bg-ivory text-green">
      <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-12 md:py-20">
        {line ? (
          <p className="display max-w-3xl text-4xl leading-[1.05] md:text-5xl">
            Designing the moment.
            <span className="mt-2 block">Delivering the day.</span>
          </p>
        ) : null}
        <div className={`grid gap-10 md:grid-cols-12 ${line ? "mt-14" : ""}`}>
          <div className="md:col-span-4">
            <Logo className="h-auto w-40" />
            <p className="mt-6 max-w-xs text-[1.05rem] leading-relaxed">
              Damakese Marketing & Events is an Addis Ababa event, marketing and entertainment company.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow">The book</p>
            <ul className="mt-4 space-y-2">
              <li><Link className="ui text-sm" href="/work">Work</Link></li>
              <li><Link className="ui text-sm" href="/practice">Practice</Link></li>
              <li><Link className="ui text-sm" href="/about">About</Link></li>
              <li><Link className="ui text-sm" href="/inquire">Inquire</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow">Where</p>
            <p className="mt-4 text-[1.05rem]">Addis Ababa, Ethiopia</p>
            <p className="mt-2 text-[1.05rem]">Nine years on the country’s largest stages.</p>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow">Desk</p>
            <Link className="ui mt-4 inline-block text-sm underline decoration-green decoration-2 underline-offset-4" href="/admin/login">
              Studio desk
            </Link>
          </div>
        </div>
        <p className="ui mt-14 text-xs tracking-[0.14em] uppercase text-forest">
          Volume One · 2026 · Damakese
        </p>
      </div>
    </footer>
  );
}
