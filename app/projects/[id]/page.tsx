import Image from "next/image";
import { notFound } from "next/navigation";
import Projects from "../../database/projects.json";
import ItemTag from "@/app/components/ui/ItemTag";
import UserPersona from "@/app/components/ui/UserPersona";
import { getPersonasForProject, personaProps } from "@/app/lib/personas";
import ProjectPageHero from "@/app/components/layout/ProjectPageHero";
import QuoteCard from "@/app/components/ui/QuoteCard";
import BackToTop from "@/app/components/ui/BackToTopButton";

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
    <div className="mx-auto bg-white ">
        <ProjectPageHero
            type={project.type}
            title={project.title}
            subtitle={project.subtitle}
            date={project.date}
            coverImg={cover}
        />

        <div className="mx-auto max-w-[1400px] px-10 py-6 md:px-20 md:py-10 lg:px-50 lg:py-16">
            {"problem" in project && project.problem ? (
                <div>
                    <h3 className="text-lg font-semibold">Problem</h3>
                    <p className="mt-2 text-neutral-7000">
                    {project.problem}
                    </p>
                </div>
              ) : null}
                <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
                    <div className="flex flex-col gap-6 md:w-[30vw] md:shrink-0">
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

            
                 

            {/* {personaRecords.length > 0 ? (
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
            ) : null} */}

            <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-start md:gap-10">  
                {"research" in project && project.research ? (
                    <div>
                        <h3 className="text-lg font-semibold">Research & Testing</h3>
                        {Array.isArray(project.research) ? (
                        project.research.map((paragraph, index) => (
                            <p key={index} className="mt-2 text-neutral-700 dark:text-neutral-300">
                            {paragraph}
                            </p>
                        ))
                        ) : (
                        <p className="mt-2 text-neutral-700 dark:text-neutral-300">{project.research}</p>
                        )}
                    </div>
                ) : null}

                {"quotes" in project && project.quotes ? (
                    <div className="flex flex-col gap-6">
                        {Array.isArray(project.quotes) ? (
                        project.quotes.map((quote, index) => (
                            <QuoteCard key={index} quote={quote} />
                        ))
                        ) : (
                        <QuoteCard quote={project.quotes} />
                        )}
                    </div>
                ) : null}



            </div>
            {project.diagram && (
                <div className="mt-8 flex flex-wrap gap-6 justify-center">
                    {project.diagram && (
                          <div className="w-full max-w-4xl">
                            <img
                                src={project.diagram}
                                draggable={false}
                                alt={`${project.title} — project diagram`}
                                className="h-auto w-full "
                            />
                        </div>
                    )}
                </div>
            )}

            {"solution" in project && project.solution ? (
                <div>
                    <h3 className="text-lg font-semibold">Solution</h3>
                    <p className="mt-2 text-neutral-7000">
                    {project.solution}
                    </p>
                </div>
              ) : null}
            
            {project.gifs && project.gifs.length > 0 ? (
                <div className="mt-8 flex flex-wrap gap-6 justify-center">
                    {project.gifs.map((gif, index) => (
                    <div key={index} className="flex-1 min-w-[280px] max-w-[20vw] overflow-hidden rounded-lg">
                    <img
                        src={gif}
                        draggable={false}
                        alt={`${project.title} — project gif`}
                        className="h-auto w-full scale-[1.02]"
                    />
                    </div>
                    ))}
                </div>
            ) : null}

            

            <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:gap-10">
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
                <div className="flex flex-col gap-6 md:w-[30vw] md:shrink-0">
                    {"challenges" in project && project.challenges ? (
                        <div>
                            <h3 className="text-lg font-semibold">Challenges</h3>
                            <p className="mt-2 text-neutral-7000">
                            {project.challenges}
                                </p>
                            </div>
                    ) : null}

                    {"impact" in project && project.impact ? (
                        <div>
                            <h3 className="text-lg font-semibold">Impact</h3>
                            <p className="mt-2 text-neutral-7000">
                            {project.impact}
                            </p>
                        </div>
                    ) : null}
                </div>
                <BackToTop />

                    
            </div>




        </div>
    

        


    </div>
  );
}
