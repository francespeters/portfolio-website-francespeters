import Image from "next/image";

export type PersonaDemographic = {
  label: string;
  value: string;
};

export type UserPersonaProps = {
  name: string;
  /** e.g. "Graduate student", "Primary persona" */
  /** One line context for the case study */
  summary?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  /** Shown if no image */
  initials?: string;
  quote?: string;
  demographics?: PersonaDemographic[];
  goals: string[];
  frustrations: string[];
  behaviors?: string[];
  className?: string;
};

function InitialsAvatar({ name, initials }: { name: string; initials?: string }) {
  const text =
    initials?.trim() ||
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("");

  return (
    <div
      className="flex aspect-square w-full max-w-[200px] items-center justify-center rounded-2xl bg-neutral-200 text-3xl font-semibold text-neutral-700 sm:max-w-none sm:w-40 md:w-48 xl:max-w-none xl:w-44"
      aria-hidden
    >
      {text}
    </div>
  );
}

function DemographicsBlock({
  demographics,
  variant,
}: {
  demographics: PersonaDemographic[];
  /** stacked sidebar (default) vs horizontal strip for xl */
  variant: "stacked" | "horizontal";
}) {
  if (variant === "horizontal") {
    return (
      <dl className="flex w-full flex-wrap items-start gap-x-10 gap-y-4 border-t border-neutral-200 pt-6 dark:border-neutral-800 xl:border-t-0 xl:border-l xl:pt-0 xl:pl-10">
        {demographics.map((row) => (
          <div key={row.label} className="min-w-[7rem] shrink-0">
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
              {row.label}
            </dt>
            <dd className="mt-1 font-medium text-neutral-900 dark:text-neutral-100">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <dl className="grid w-full gap-2 rounded-xl bg-neutral-50 p-4 text-left text-sm dark:bg-neutral-900/80">
      {demographics.map((row) => (
        <div
          key={row.label}
          className="flex flex-col gap-0.5 border-b border-neutral-200/80 pb-2 last:border-0 last:pb-0 dark:border-neutral-800"
        >
          <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
            {row.label}
          </dt>
          <dd className="font-medium text-neutral-900 dark:text-neutral-100">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function UserPersona({
  name,
  summary,
  avatarSrc,
  avatarAlt,
  initials,
  quote,
  demographics,
  goals,
  frustrations,
  behaviors,
  className = "",
}: UserPersonaProps) {
  const alt = avatarAlt ?? `${name} — persona`;
  const hasDemo = demographics && demographics.length > 0;

  return (
    <article
      className={`rounded-2xl border border-neutral-200 bg-white text-neutral-900 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 ${className}`}
      aria-label={`User persona: ${name}`}
    >
      <div className="flex flex-col gap-8 p-6 sm:p-8">
        {/* Mobile / tablet: avatar + identity stacked; demographics below identity */}
        {/* xl+: one horizontal band — avatar | identity | demographics (in line) */}
        {/* < xl: avatar + identity row, then stacked demographics. xl+: avatar | identity | demographics in one horizontal band (MacBook Air–friendly). */}
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:gap-10">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6 xl:contents">
            <div className="flex justify-center sm:block xl:w-44 xl:shrink-0">
              {avatarSrc ? (
                <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-2xl bg-neutral-100 sm:w-40 sm:max-w-none md:w-48 xl:h-44 xl:w-44">
                  {avatarSrc.startsWith("/") ? (
                    <Image
                      src={avatarSrc}
                      alt={alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 200px, (max-width: 1280px) 192px, 176px"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatarSrc} alt={alt} className="h-full w-full object-cover" />
                  )}
                </div>
              ) : (
                <InitialsAvatar name={name} initials={initials} />
              )}
            </div>

            <div className="min-w-0 flex-1 text-center sm:text-left xl:min-w-0 xl:flex-1">
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{name}</h2>
              {summary ? (
                <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {summary}
                </p>
              ) : null}
            </div>
          </div>

          {hasDemo ? (
            <>
              <div className="w-full xl:hidden">
                <DemographicsBlock demographics={demographics} variant="stacked" />
              </div>
              <div className="hidden min-w-0 flex-1 xl:block xl:min-w-[12rem]">
                <DemographicsBlock demographics={demographics} variant="horizontal" />
              </div>
            </>
          ) : null}
        </div>

        {/* Full width below the top band — same horizontal rhythm as xl row */}
        <div className="min-w-0 space-y-8 border-t border-neutral-200 pt-8 dark:border-neutral-800 xl:pt-10">
          {quote ? (
            <blockquote className="border-l-4 border-neutral-900 py-1 pl-4 text-base italic leading-relaxed text-neutral-800 dark:border-neutral-100 dark:text-neutral-200 sm:pl-5 sm:text-lg">
              “{quote}”
            </blockquote>
          ) : null}

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:gap-12">
            <section aria-label={`${name} — goals`}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Goals
              </h3>
              <p>{goals}</p>
            </section>

            <section aria-label={`${name} — pain points`}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Pain points
              </h3>
              <p>{frustrations}</p>
            </section>
          </div>

          
        </div>
      </div>
    </article>
  );
}
