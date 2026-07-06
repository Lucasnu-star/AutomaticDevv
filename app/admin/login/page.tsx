import Image from "next/image";
import { LoginForm } from "@/components/admin/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-6 py-12">
      <div className="bg-circuit pointer-events-none fixed inset-0" />
      <div className="shadow-glow relative w-full max-w-md rounded-2xl border border-border bg-surface/60 p-8 backdrop-blur-sm">
        <div className="mb-8 text-center">
          <Image
            src="/icon-mark.png"
            alt="AutomaticDev"
            width={56}
            height={56}
            className="mx-auto rounded-xl"
          />
          <h1 className="font-heading mt-4 text-2xl font-bold">
            Panel admin
          </h1>
          <p className="mt-1 text-sm text-muted">
            Ingresá para gestionar tu portfolio
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
