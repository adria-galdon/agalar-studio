import Link from "next/link";
import { AgalarMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "1.4rem",
        padding: "2rem",
      }}
    >
      <AgalarMark size={56} />
      <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}>
        Esta página no existe
      </h1>
      <p style={{ color: "var(--ink-soft)", maxWidth: "40ch" }}>
        El enlace que seguiste no lleva a ningún sitio, o el contenido se movió.
      </p>
      <Link href="/" className="btn btn--solid">
        Volver al inicio
      </Link>
    </div>
  );
}
