import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { games } from "@/data/games";

export const metadata: Metadata = {
  metadataBase: new URL("https://agalarstudio.com"),
  title: {
    default: "Agalar Studio",
    template: "%s, Agalar Studio",
  },
  description:
    "Agalar Studio construye el futuro de los juegos independientes, un título a la vez. Empezamos con Nexus. Seguiremos con más.",
  openGraph: {
    title: "Agalar Studio",
    description:
      "Agalar Studio construye el futuro de los juegos independientes, un título a la vez. Empezamos con Nexus. Seguiremos con más.",
    type: "website",
    locale: "es_ES",
    siteName: "Agalar Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agalar Studio",
    description:
      "Agalar Studio construye el futuro de los juegos independientes, un título a la vez.",
  },
  icons: {
    icon: "/logos/mark-dark-on-light.png",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e1428" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

// Datos estructurados (Schema.org) para buscadores y redes.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://agalarstudio.com/#studio",
      name: "Agalar Studio",
      url: "https://agalarstudio.com",
      logo: "https://agalarstudio.com/logos/mark-dark-on-light.png",
      email: "hola@agalarstudio.com",
      description:
        "Estudio independiente de videojuegos. Empezamos con Nexus, un puzzle narrativo de ciencia ficción.",
    },
    ...games.map((g) => ({
      "@type": "VideoGame",
      name: g.title,
      url: `https://agalarstudio.com/games/${g.slug}`,
      description: g.tagline,
      genre: g.genres,
      gamePlatform: g.platforms,
      applicationCategory: "Game",
      author: { "@id": "https://agalarstudio.com/#studio" },
      publisher: { "@id": "https://agalarstudio.com/#studio" },
    })),
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </ThemeProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
