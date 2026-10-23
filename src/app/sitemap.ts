import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

const siteUrl = "https://coderpie.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/skills",
    "/experience",
    "/projects",
    "/certifications",
    "/blog",
    "/contact",
  ];

  const lastmod = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path}`,
      lastmod,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastmod,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
