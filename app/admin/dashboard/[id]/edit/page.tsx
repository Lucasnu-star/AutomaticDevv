import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProject } from "@/lib/projects";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { updateProject } from "@/lib/actions/projects";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let project;
  try {
    project = await getProject(id);
  } catch (err) {
    console.error("No se pudo cargar el proyecto", err);
    return (
      <main className="mx-auto max-w-2xl px-6 py-12">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al panel
        </Link>
        <p className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          No pudimos conectarnos a la base de datos. Intentá de nuevo en unos
          segundos.
        </p>
      </main>
    );
  }

  if (!project) notFound();

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <Link
        href="/admin/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Volver al panel
      </Link>
      <h1 className="font-heading mt-4 text-2xl font-bold">
        Editar proyecto
      </h1>
      <div className="mt-8 rounded-2xl border border-border bg-surface/60 p-6">
        <ProjectForm
          project={project}
          action={updateProject.bind(null, project.id)}
        />
      </div>
    </main>
  );
}
