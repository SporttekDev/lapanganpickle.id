import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import type { Project, ProjectCategory } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/* Portofolio proyek. Data di src/data/portfolio.ts, foto di src/data/images.ts. */
export function PortfolioGrid({
  title,
  lead,
  projects,
  categories,
  tone = "chalk",
}: {
  title: string;
  lead: string;
  projects: Project[];
  categories: Record<ProjectCategory, string>;
  /** Warna latar section, supaya berselang-seling dengan section di atas dan bawahnya. */
  tone?: "chalk" | "white";
}) {
  return (
    <section id="portfolio" className={cn("scroll-mt-20 py-20 md:py-28", tone === "chalk" ? "bg-chalk" : "bg-white")}>
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-4xl font-extrabold md:text-6xl">{title}</h2>
          <p className="mt-4 text-lg text-court/80">{lead}</p>
        </div>
        <ul className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-court-deep">
                <Photo
                  src={project.image}
                  alt={project.name}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <h3 className="mt-4 text-2xl font-bold md:text-3xl">{project.name}</h3>
              <p className="mt-1 text-court/75">
                {categories[project.category]}
                {project.location ? `, ${project.location}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
