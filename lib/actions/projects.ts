"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { put, del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { ProjectCategory } from "@prisma/client";

const projectSchema = z.object({
  title: z.string().trim().min(2, "El título es muy corto").max(120),
  description: z.string().trim().min(10, "La descripción es muy corta").max(1000),
  category: z.nativeEnum(ProjectCategory),
  link: z
    .string()
    .trim()
    .url("El link no es válido")
    .optional()
    .or(z.literal("")),
  images: z.array(z.string().url()).min(1, "Subí al menos una imagen"),
});

async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
}

async function uploadImages(files: FormDataEntryValue[]) {
  const uploaded: string[] = [];
  for (const file of files) {
    if (file instanceof File && file.size > 0) {
      const blob = await put(`projects/${crypto.randomUUID()}-${file.name}`, file, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      uploaded.push(blob.url);
    }
  }
  return uploaded;
}

export async function createProject(_prevState: unknown, formData: FormData) {
  await requireAdmin();

  const newImages = await uploadImages(formData.getAll("newImages"));

  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    link: formData.get("link") || "",
    images: newImages,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  await prisma.project.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      category: parsed.data.category,
      link: parsed.data.link || null,
      images: parsed.data.images,
    },
  });

  redirect("/admin/dashboard");
}

export async function updateProject(
  id: string,
  _prevState: unknown,
  formData: FormData
) {
  await requireAdmin();

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) redirect("/admin/dashboard");

  const keepImages = formData.getAll("keepImages").map(String);
  const newImages = await uploadImages(formData.getAll("newImages"));
  const images = [...keepImages, ...newImages];

  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    link: formData.get("link") || "",
    images,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  const removed = existing!.images.filter((url) => !keepImages.includes(url));
  await Promise.allSettled(
    removed.map((url) => del(url, { token: process.env.BLOB_READ_WRITE_TOKEN }))
  );

  await prisma.project.update({
    where: { id },
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      category: parsed.data.category,
      link: parsed.data.link || null,
      images: parsed.data.images,
    },
  });

  redirect("/admin/dashboard");
}

export async function deleteProject(id: string) {
  await requireAdmin();

  const project = await prisma.project.findUnique({ where: { id } });
  if (project) {
    await Promise.allSettled(
      project.images.map((url) =>
        del(url, { token: process.env.BLOB_READ_WRITE_TOKEN })
      )
    );
    await prisma.project.delete({ where: { id } });
  }

  redirect("/admin/dashboard");
}
