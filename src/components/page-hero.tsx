export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  const lines = title.split("\n");

  return (
    <header className="on-green bg-green text-ivory">
      <div className="mx-auto max-w-[90rem] px-5 pt-28 pb-8 text-center md:px-12 lg:pt-32 lg:pb-10">
        <p className="eyebrow fade-up">{eyebrow}</p>
        <h1 className="display mx-auto mt-4 max-w-4xl text-[clamp(2.15rem,4.4vw,3.75rem)] leading-[1.08]">
          {lines.map((line, index) => (
            <span key={line} className="block overflow-hidden">
              <span className="line-rise" style={{ animationDelay: `${index * 120}ms` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>
        <span className="rule rule-draw rule-center mt-5" />
        {lede ? (
          <p className="fade-up mx-auto mt-5 max-w-[36rem] text-lg leading-relaxed text-ivory/90" style={{ animationDelay: "240ms" }}>
            {lede}
          </p>
        ) : null}
      </div>
    </header>
  );
}
