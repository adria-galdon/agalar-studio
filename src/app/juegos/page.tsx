import type { Metadata } from "next";
import { GamesGrid } from "@/components/GamesGrid";

export const metadata: Metadata = {
  title: "Juegos",
  description: "El catálogo de juegos de Agalar Studio.",
  alternates: {
    canonical: "/juegos",
  },
};

export default function JuegosPage() {
  return <GamesGrid />;
}
