import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Salida estática opcional: descomenta si quieres desplegar en un hosting
  // estático simple (GitHub Pages, Netlify drop, etc.) sin servidor Node.
  // output: "export",
  images: {
    // Con output:"export" hay que desactivar la optimización on-the-fly.
    // Déjalo así si activas la línea de arriba.
    // unoptimized: true,
  },
};

export default nextConfig;
