"use client";

import { useActionState } from "react";
import { LogIn, Loader2 } from "lucide-react";
import { login } from "@/lib/actions/auth";

const initialState: { error?: string } = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  const inputClasses =
    "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-violet";

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-muted"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className={inputClasses}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-sm font-medium text-muted"
        >
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClasses}
        />
      </div>

      {state?.error && (
        <p className="text-sm font-medium text-red-400">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-electric to-violet px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg disabled:opacity-60"
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <LogIn className="h-4 w-4" />
        )}
        {pending ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
