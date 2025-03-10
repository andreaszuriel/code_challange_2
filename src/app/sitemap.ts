import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://solterragreentech.vercel.app";

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date().toISOString(),
    },
  ];
}
