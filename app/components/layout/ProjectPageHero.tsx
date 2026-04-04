import Image from "next/image";


export default function ProjectPageHero({ type, title, subtitle, date, coverImg }: { type?: string; title: string; subtitle?: string; date: string; coverImg?: string }) {
  return (
    <div className="flex flex-col lg:flex-row items-center bg-[var(--black-primary)] py-8 lg:px-20">

  <div className="flex flex-col px-8 py-8 lg:flex-1 lg:min-w-[280px] fadeInUp-animation ">
    <p className="type-hero">{type}</p>
            <h1 className="title-hero">{title}</h1>
            <p className="subtitle-hero">{subtitle}</p>
        </div>

            {coverImg ? (
                <div className="w-full lg:flex-1 lg:min-w-[400px] py-8 fadeInUp-animation">

                {coverImg.startsWith("/") ? (
                    <Image
                    src={coverImg}
                    alt={`${title} — project image`}
                    width={1000}
                    height={800}
                    draggable={false}
                    loading="eager"
                    priority
                    className="h-auto w-full min-w-[300px] rounded-lg"
                    />
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                    src={coverImg}
                    draggable={false}
                    alt={`${title} — project image`}
                    className="h-auto w-full min-w-[300px] rounded-lg"
                    />
                )}
                </div>
            ) : null}

    </div>
  );
}