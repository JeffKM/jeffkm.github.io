import Link from "next/link";

export const metadata = { title: "404 — JeffKM", robots: { index: false, follow: false } };
export default function NotFound(){return <main className="not-found"><div className="gateway-mark">404</div><h1>길을 잃었습니다.<br/><span>We couldn’t find that page.</span></h1><p>원하는 언어의 홈에서 다시 시작해 주세요.</p><div><Link className="button primary" href="/ko/">한국어 홈</Link><Link className="button ghost" href="/en/">English home</Link></div></main>}
