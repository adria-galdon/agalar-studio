import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Agalar Studio",
    short_name: "Agalar",
    description:
      "Estudio independiente de videojuegos para Android e iOS. Diseñamos y publicamos nuestros propios juegos.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f5f0",
    theme_color: "#f6f5f0",
    lang: "es",
    categories: ["games", "entertainment"],
    icons: [
      {
        src: "/logos/mark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/logos/mark-light-on-dark.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
