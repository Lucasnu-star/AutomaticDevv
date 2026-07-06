"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { Loader2, Save, X } from "lucide-react";
import type { Project } from "@prisma/client";

type FormState = { error?: string };
type ActionFn = (state: FormState, formData: FormData) => Promise<FormState>;

export function ProjectForm({
  project,
  action,
}: {
  project?: Project;
  action: ActionFn;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const [keptImages, setKeptImages] = useState<string[]>(
    project?.images ?? []
  );

  const inputClasses =
    "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-violet";

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-muted">
          Título
        </label>
        <input
          name="title"
          required
          minLength={2}
          defaultValue={project?.title}
          className={inputClasses}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-muted">
          Descripción
        </label>
        <textarea
          name="description"
          required
          minLength={10}
          rows={4}
          defaultValue={project?.description}
          className={`${inputClasses} resize-none`}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted">
            Categoría
          </label>
          <select
            name="category"
            defaultValue={project?.category ?? "AUTOMATION"}
            className={inputClasses}
          >
            <option value="AUTOMATION">Automatización</option>
            <option value="WEB">Web</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted">
            Link (opcional)
          </label>
          <input
            name="link"
            type="url"
            placeholder="https://..."
            defaultValue={project?.link ?? ""}
            className={inputClasses}
          />
        </div>
      </div>

      {project && keptImages.length > 0 && (
        <div>
          <label className="mb-2 block text-sm font-medium text-muted">
            Imágenes actuales
          </label>
          <div className="flex flex-wrap gap-3">
            {keptImages.map((url) => (
              <div
                key={url}
                className="relative h-24 w-24 overflow-hidden rounded-lg border border-border"
              >
                <Image
                  src={url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="96px"
                />
                <input type="hidden" name="keepImages" value={url} />
                <button
                  type="button"
                  onClick={() =>
                    setKeptImages((prev) => prev.filter((i) => i !== url))
                  }
                  className="absolute top-1 right-1 rounded-full bg-black/70 p-1 text-white transition-colors hover:bg-red-500/80"
                  aria-label="Quitar imagen"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-muted">
          {project ? "Agregar imágenes" : "Imágenes"}
        </label>
        <input
          type="file"
          name="newImages"
          accept="image/*"
          multiple
          required={!project}
          className="w-full text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-violet/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-light"
        />
      </div>

      {state?.error && (
        <p className="text-sm font-medium text-red-400">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="shadow-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-violet px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        {pending ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
