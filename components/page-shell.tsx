import type { ReactNode } from "react";
import type { Locale } from "@/lib/content";
import { copy } from "@/lib/content";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function PageShell({ locale, currentPath, children }: { locale: Locale; currentPath?: string; children: ReactNode }) {
  return <><a className="skip-link" href="#main">{copy[locale].skip}</a><SiteHeader locale={locale} currentPath={currentPath}/><main id="main" tabIndex={-1}>{children}</main><SiteFooter locale={locale}/></>;
}
