import type { MetadataRoute } from "next";
import { games } from "@/data/games";

const BASE = "https://agalarstudio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/games/nexus/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const gameRoutes: MetadataRoute.Sitemap = games.map((g) => ({
    url: `${BASE}/games/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...gameRoutes];
}
