import Link from "next/link";
import { copy, type Locale, otherLocale } from "@/lib/content";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({ locale, currentPath = "" }: { locale: Locale; currentPath?: string }) {
  const t = copy[locale];
  const alternate = otherLocale(locale);
  const items = [
    ["projects", t.nav.projects],
    ["devlog", t.nav.devlog],
    ["learning", t.nav.learning],
    ["about", t.nav.about],
  ];

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href={`/${locale}/`} aria-label={`JeffKM ${t.nav.home}`}>
          <span>J</span><span>K</span><strong>JeffKM</strong>
        </Link>
        <nav className="main-nav" aria-label={locale === "ko" ? "주요 메뉴" : "Main navigation"}>
          {items.map(([path, label]) => (
            <Link key={path} href={`/${locale}/${path}/`} aria-current={currentPath.split("/")[0] === path ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
        <div className="header-tools">
          <Link className="language-link" href={`/${alternate}${currentPath ? `/${currentPath}` : ""}/`} aria-label={t.languageLabel}>{t.language}</Link>
          <ThemeToggle label={t.theme} />
        </div>
      </div>
    </header>
  );
}
