import { MetadataRoute } from "next"
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://student-os.vercel.app",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://student-os.vercel.app/dashboard",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://student-os.vercel.app/login",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ]
}