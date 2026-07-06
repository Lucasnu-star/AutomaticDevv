import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { createProject } from "@/lib/actions/projects";

export default function NewProjectPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <Link
        href="/admin/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Volver al panel
      </Link>
      <h1 className="font-heading mt-4 text-2xl font-bold">Nuevo proyecto</h1>
      <p className="mt-1 text-sm text-muted">
        Se va a mostrar automáticamente en el portfolio del sitio.
      </p>
      <div className="mt-8 rounded-2xl border border-border bg-surface/60 p-6">
        <ProjectForm action={createProject} />
      </div>
    </main>
  );
}
