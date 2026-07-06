"use client";

import { useActionState, useEffect, useRef } from "react";
import { Send, Loader2 } from "lucide-react";
import { sendContactMessage, type ContactState } from "@/lib/actions/contact";

const initialState: ContactState = { status: "idle", message: "" };

export function ContactForm({
  labels,
}: {
  labels: {
    name: string;
    email: string;
    message: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
  };
}) {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  const inputClasses =
    "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-violet";

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-muted"
        >
          {labels.name}
        </label>
        <input
          id="name"
          name="name"
          required
          minLength={2}
          className={inputClasses}
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-muted"
        >
          {labels.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClasses}
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-muted"
        >
          {labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          className={`${inputClasses} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-electric to-violet px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg disabled:opacity-60 sm:w-auto"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> {labels.sending}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> {labels.submit}
          </>
        )}
      </button>

      {state.status === "success" && (
        <p className="text-sm font-medium text-emerald-400">
          {labels.success}
        </p>
      )}
      {state.status === "error" && (
        <p className="text-sm font-medium text-red-400">
          {state.message || labels.error}
        </p>
      )}
    </form>
  );
}
