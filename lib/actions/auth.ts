"use server";

import { redirect } from "next/navigation";
import { verifyCredentials } from "@/lib/auth";
import { createSession, destroySession } from "@/lib/session";

export async function login(_prevState: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const valid = await verifyCredentials(email, password);
  if (!valid) {
    return { error: "Email o contraseña incorrectos" };
  }

  await createSession(email);
  redirect("/admin/dashboard");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
