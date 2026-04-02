import Image from "next/image";
import { notFound } from "next/navigation";
import Projects from "../../database/projects.json";

type Project = (typeof Projects)[number];

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = (Projects as Project[]).find((p) => p.id === id);

  if (!project) {
    notFound();
  }

    const img1 = "img1" in project ? project.img1 : undefined;
    const cover = "cover" in project ? project.cover : undefined;


  return (
    <div className="mx-auto max-w-7xl py-10 ">
      

        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                {project.title}
            </h1>

            {cover ? (
                <div className="min-w-0 flex-1">
                    {cover.startsWith("/") ? (
                    <Image
                        src={cover}
                        alt={`${project.title} — project image`}
                        width={1000}
                        height={800}
                        draggable={false}
                        className="h-auto w-[50vw] rounded-lg"
                    />
                    ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={img1}
                        draggable={false}
                        alt={`${project.title} — project image`}
                        className="h-auto w-full rounded-lg"
                    />
                    )}
                </div>
                ) : null}
        </div>
      

      {"problem" in project && project.problem ? (
        <div className="mt-6 max-w-3xl">
          <h3 className="text-lg font-semibold">Problem</h3>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">
            {project.problem}
          </p>
        </div>
      ) : null}

      {/* Use a name that is NOT Bootstrap’s `.row` — Bootstrap sets `.row > * { width: 100% }`, which stacks children vertically */}
      <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
        <div className="flex flex-col gap-6 md:w-[50vw] md:shrink-0">
          {"hypothesis" in project && project.hypothesis ? (
            <div>
              <h3 className="text-lg font-semibold">Hypothesis</h3>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                {project.hypothesis}
              </p>
            </div>
          ) : null}
          {"role" in project && project.role ? (
            <div>
              <h3 className="text-lg font-semibold">My Role</h3>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                {project.role}
              </p>
            </div>
          ) : null}
        </div>

        {img1 ? (
        <div className="min-w-0 flex-1">
            {img1.startsWith("/") ? (
              <Image
                src={img1}
                alt={`${project.title} — project image`}
                width={1200}
                height={800}
                draggable={false}
                className="h-auto w-full rounded-lg"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img1}
                draggable={false}
                alt={`${project.title} — project image`}
                className="h-auto w-full rounded-lg"
              />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
