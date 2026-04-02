import Image from "next/image";
import { notFound } from "next/navigation";
import Projects from "../../database/projects.json";
import ItemTag from "@/app/components/ui/ItemTag";
import UserPersona from "@/app/components/ui/UserPersona";
import { getPersonasForProject, personaProps } from "@/app/lib/personas";

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
  const personaRecords = getPersonasForProject(project.id);

  return (
    <div className="mx-auto bg-white py-10">
      <div className="flex flex-col items-center bg-gray-100">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          {project.title}
        </h1>
        <div className="w-[50vw] text-black">
          <ItemTag text={project.title} date={project.date} color="text-black" />
        </div>

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
                src={cover}
                draggable={false}
                alt={`${project.title} — project image`}
                className="h-auto w-full rounded-lg"
              />
            )}
          </div>
        ) : null}
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-8">
        

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-start md:gap-10">

          <div className="flex flex-col gap-6 md:w-[50vw] md:shrink-0">
            {"problem" in project && project.problem ? (
          <div className="mt-6 max-w-3xl">
            <h3 className="text-lg font-semibold">Problem</h3>
            <p className="mt-2 text-neutral-700 dark:text-neutral-300">
              {project.problem}
            </p>
          </div>
        ) : null}
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

        {personaRecords.length > 0 ? (
          <section
            className="mt-14 space-y-10  pt-10"
            aria-label="User personas"
          >
            {personaRecords.map((record) => (
              <UserPersona
                key={record.id}
                {...personaProps(record)}
                className="mx-auto max-w-5xl"
              />
            ))}
          </section>
        ) : null}
      </div>
    </div>
  );
}
