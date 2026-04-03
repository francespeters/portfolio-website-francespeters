import Image from "next/image";


export default function ProjectPageHero({ type, title, subtitle, date, coverImg }: { type?: string; title: string; subtitle?: string; date: string; coverImg?: string }) {
  return (
    <div className="flex flex-col md:flex-row items-center bg-[var(--black-primary)] py-8">

        <div className="flex flex-col items-center  px-6 py-8 md:items-start md:text-left md:flex-1 ">
            <p className="type-hero">{type}</p>
            <h1 className="title-hero">{title}</h1>
            <p className="subtitle-hero">{subtitle}</p>
        </div>

            {coverImg ? (
                <div className="w-full md:flex-1 md:min-w-[400px] py-8 order-2">
                {coverImg.startsWith("/") ? (
                    <Image
                    src={coverImg}
                    alt={`${title} — project image`}
                    width={1000}
                    height={800}
                    draggable={false}
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