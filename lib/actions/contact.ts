"use server";

import { z } from "zod";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  message: z.string().trim().min(10).max(2000),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendContactMessage(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Datos inválidos",
    };
  }

  const { name, email, message } = parsed.data;

  try {
    await prisma.message.create({ data: { name, email, message } });
  } catch (err) {
    console.error("No se pudo guardar el mensaje de contacto", err);
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "AutomaticDev <contacto@automaticdev.cloud>",
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: `Nuevo mensaje de ${name} - AutomaticDev`,
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend devolvió un error al enviar el email", error);
      return {
        status: "error",
        message:
          "Guardamos tu mensaje pero no pudimos enviarte la confirmación. Igual te vamos a contactar, o escribinos por WhatsApp.",
      };
    }
  } catch (err) {
    console.error("No se pudo enviar el email de contacto", err);
    return {
      status: "error",
      message:
        "Guardamos tu mensaje pero no pudimos enviarte la confirmación. Igual te vamos a contactar, o escribinos por WhatsApp.",
    };
  }

  return { status: "success", message: "" };
}
