import type { MetadataRoute } from "next";
import { locales, projects } from "@/lib/content";
export const dynamic = "force-static";
export default function sitemap():MetadataRoute.Sitemap{const base="https://jeffkm.github.io";const pages=["","/projects","/devlog","/learning","/about"];return[...locales.flatMap(locale=>pages.map(path=>({url:`${base}/${locale}${path}/`,lastModified:new Date("2026-08-10"),changeFrequency:"monthly" as const,priority:path===""?1:.7}))),...locales.flatMap(locale=>projects.map(project=>({url:`${base}/${locale}/projects/${project.slug}/`,lastModified:new Date(project.verifiedAt),changeFrequency:"monthly" as const,priority:.8})))]}
