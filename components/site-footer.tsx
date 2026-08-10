import type { Locale } from "@/lib/content";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div><strong>JeffKM</strong><p>{locale === "ko" ? "제품을 끝까지 만들고 검증합니다." : "Building and validating products end to end."}</p></div>
        <div className="footer-links">
          <a href="mailto:jeffkm@inha.edu">jeffkm@inha.edu</a>
          <a href="https://github.com/JeffKM" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
        <p className="copyright">© {new Date().getFullYear()} JeffKM. Content rights reserved.</p>
      </div>
    </footer>
  );
}
