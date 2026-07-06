import { prisma } from "@/lib/prisma";

export function getProjects() {
  return prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export function getProject(id: string) {
  return prisma.project.findUnique({ where: { id } });
}
