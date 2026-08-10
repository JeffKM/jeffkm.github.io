import type { Metadata } from "next";
import type { Locale } from "./content";

const base = "https://jeffkm.github.io";

export function pageMetadata(locale: Locale, title: string, description: string, path = ""): Metadata {
  const canonical = `${base}/${locale}${path}/`;
  const pairPath = path ? `${path}/` : "/";
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { ko: `${base}/ko${pairPath}`, en: `${base}/en${pairPath}`, "x-default": `${base}/ko${pairPath}` },
    },
    openGraph: { title, description, url: canonical, siteName: "JeffKM", locale: locale === "ko" ? "ko_KR" : "en_US", type: "website" },
  };
}
