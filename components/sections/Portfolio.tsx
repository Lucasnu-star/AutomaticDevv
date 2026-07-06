import { getTranslations } from "next-intl/server";
import { getProjects } from "@/lib/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortfolioGrid } from "./PortfolioGrid";

export async function Portfolio() {
  const t = await getTranslations("portfolio");

  let projects: Awaited<ReturnType<typeof getProjects>> = [];
  try {
    projects = await getProjects();
  } catch (err) {
    console.error("No se pudieron cargar los proyectos", err);
  }

  const serialized = projects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category,
    images: p.images,
    link: p.link,
  }));

  return (
    <section id="portfolio" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <PortfolioGrid
          projects={serialized}
          labels={{
            all: t("filters.all"),
            automation: t("filters.automation"),
            web: t("filters.web"),
            empty: t("empty"),
            viewProject: t("viewProject"),
          }}
        />
      </div>
    </section>
  );
}
