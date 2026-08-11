"use client";

import Link from "next/link";
import { useState } from "react";
import { copy, type Locale, otherLocale } from "@/lib/content";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({ locale, currentPath = "" }: { locale: Locale; currentPath?: string }) {
  const [open, setOpen] = useState(false);
  const t = copy[locale];
  const alternate = otherLocale(locale);
  const items = [
    ["projects", t.nav.projects, "01"],
    ["devlog", t.nav.devlog, "02"],
    ["learning", t.nav.learning, "03"],
    ["about", t.nav.about, "04"],
  ];

  return (
    <>
      <header className="kinetic-header">
        <div className="kinetic-header-grid">
          <Link className="kinetic-logo" href={`/${locale}/`} aria-label={`JeffKM ${t.nav.home}`}>
            <span className="kinetic-logo-static">JK</span>
            <span className="kinetic-logo-motion" aria-hidden="true">J/K</span>
          </Link>
          <p className="kinetic-header-note">{locale === "ko" ? <>백엔드 지향 제품 개발자<br/><strong>끝까지 만들고 검증합니다.</strong></> : <>Backend-oriented product developer<br/><strong>Building and validating end to end.</strong></>}</p>
          <p className="kinetic-header-place">Seoul based<br/><strong>Working globally</strong></p>
          <div className="kinetic-header-actions">
            <Link href={`/${alternate}${currentPath ? `/${currentPath}` : ""}/`} aria-label={t.languageLabel}>{t.language}</Link>
            <ThemeToggle label={t.theme}/>
            <button className="kinetic-menu-button" type="button" aria-expanded={open} aria-controls="kinetic-menu" onClick={() => setOpen((value) => !value)}>
              <span>{open ? (locale === "ko" ? "닫기" : "Close") : (locale === "ko" ? "메뉴" : "Menu")}</span>
              <i aria-hidden="true" className={open ? "is-open" : ""}/>
            </button>
          </div>
        </div>
      </header>
      <div className={`kinetic-menu ${open ? "is-open" : ""}`} id="kinetic-menu" aria-hidden={!open}>
        <nav aria-label={locale === "ko" ? "전체 메뉴" : "Full navigation"}>
          {items.map(([path, label, number]) => (
            <Link key={path} href={`/${locale}/${path}/`} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
              <small>{number}</small><span>{label}</span><b aria-hidden="true">↗</b>
            </Link>
          ))}
        </nav>
        <div className="kinetic-menu-footer"><p>{locale === "ko" ? "새로운 제품과 협업 이야기를 기다립니다." : "Open to product work and collaboration."}</p><a href="mailto:jeffkm@inha.edu" tabIndex={open ? 0 : -1}>jeffkm@inha.edu ↗</a></div>
      </div>
    </>
  );
}
