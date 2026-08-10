import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jeffkm.github.io"),
  title: { default: "JeffKM — Product & Backend Developer", template: "%s — JeffKM" },
  description: "Backend-oriented product developer who builds and validates real products",
  authors: [{ name: "JeffKM (Kyungmin Lee)", url: "https://github.com/JeffKM" }],
  robots: { index: true, follow: true },
};

const themeScript = `(function(){try{var t=localStorage.getItem('jeffkm-theme-v1');if(t==='dark')document.documentElement.dataset.theme='dark'}catch(e){}})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="ko" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }}/></head><body>{children}</body></html>;
}
