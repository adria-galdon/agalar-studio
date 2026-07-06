"use client";

// Captación de correo para avisar del lanzamiento de Nexus.
// Envía a /api/subscribe. El backend valida y, si hay un proveedor
// configurado por variable de entorno, reenvía; si no, lo registra.
// UX: estados de carga/éxito/error, honeypot anti-bots y validación básica.

import { useState } from "react";
import styles from "./NotifyForm.module.css";

type State = "idle" | "loading" | "ok" | "error";

export function NotifyForm({
  compact = false,
  source = "site",
}: {
  compact?: boolean;
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      setMessage("Ese correo no tiene buena pinta. ¿Lo revisas?");
      return;
    }

    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "error");
      setState("ok");
      setMessage("Hecho. Serás de los primeros en saberlo.");
      setEmail("");
    } catch {
      setState("error");
      setMessage("Algo ha fallado. Prueba otra vez en un momento.");
    }
  }

  if (state === "ok") {
    return (
      <p className={`${styles.done} ${compact ? styles.doneCompact : ""}`} role="status">
        <span className={styles.check} aria-hidden="true">✓</span>
        {message}
      </p>
    );
  }

  return (
    <form
      className={`${styles.form} ${compact ? styles.compact : ""}`}
      onSubmit={onSubmit}
      noValidate
    >
      <div className={styles.row}>
        <input
          type="email"
          name="email"
          className={styles.input}
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          aria-label="Tu correo electrónico"
          aria-invalid={state === "error"}
          required
        />
        {/* Honeypot: invisible para humanos, tentador para bots. */}
        <input
          type="text"
          name="company"
          className={styles.honeypot}
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          aria-hidden="true"
        />
        <button type="submit" className="btn btn--solid" disabled={state === "loading"}>
          {state === "loading" ? "Enviando…" : "Notifícame"}
        </button>
      </div>
      {state === "error" && (
        <p className={styles.error} role="alert">
          {message}
        </p>
      )}
      {state !== "error" && !compact && (
        <p className={styles.note}>Sin spam. Solo un aviso cuando Nexus salga.</p>
      )}
    </form>
  );
}
