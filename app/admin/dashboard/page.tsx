import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, LogOut, ExternalLink } from "lucide-react";
import { getProjects } from "@/lib/projects";
import { logout } from "@/lib/actions/auth";
import { DeleteProjectButton } from "@/components/admin/DeleteProjectButton";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let projects: Awaited<ReturnType<typeof getProjects>> = [];
  let loadError = false;
  try {
    projects = await getProjects();
  } catch (err) {
    console.error("No se pudieron cargar los proyectos", err);
    loadError = true;
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Panel admin</h1>
          <p className="mt-1 text-sm text-muted">
            Gestioná los proyectos de tu portfolio.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard/new"
            className="shadow-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-violet px-5 py-2.5 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" /> Nuevo proyecto
          </Link>
          <form action={logout}>
            <button className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted transition-colors hover:text-foreground">
              <LogOut className="h-4 w-4" /> Salir
            </button>
          </form>
        </div>
      </div>

      {loadError && (
        <p className="mt-10 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          No pudimos conectarnos a la base de datos. Verificá que{" "}
          <code>DATABASE_URL</code> esté bien configurada e intentá de nuevo.
        </p>
      )}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="overflow-hidden rounded-2xl border border-border bg-surface/60"
          >
            <div className="relative h-40 w-full bg-background">
              {project.images[0] && (
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              )}
              <span
                className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold text-white ${
                  project.category === "AUTOMATION"
                    ? "bg-electric/90"
                    : "bg-violet/90"
                }`}
              >
                {project.category === "AUTOMATION" ? "Automatización" : "Web"}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-heading font-bold">{project.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted">
                {project.description}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Link
                  href={`/admin/dashboard/${project.id}/edit`}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold transition-colors hover:border-violet/50"
                >
                  <Pencil className="h-3.5 w-3.5" /> Editar
                </Link>
                <div className="flex-1">
                  <DeleteProjectButton id={project.id} />
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-border p-2 transition-colors hover:border-electric/50"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loadError && projects.length === 0 && (
        <p className="mt-16 text-center text-muted">
          Todavía no cargaste ningún proyecto.
        </p>
      )}
    </main>
  );
}
