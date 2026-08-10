import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ProjectCard } from "@/components/project-card";
import { copy, isLocale, projects } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "JeffKM — Product & Backend Developer", copy[locale].intro);
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  if (!isLocale(value)) return null;
  const locale = value;
  const t = copy[locale];
  return <PageShell locale={locale}>
    <section className="hero shell">
      <div className="hero-kicker"><span className="availability-dot"/>{locale === "ko" ? "Java · Spring 백엔드 포지션을 준비하고 있습니다" : "Preparing for Java · Spring backend roles"}</div>
      <p className="identity">이경민 <span>·</span> Lee Kyungmin</p>
      <h1>{locale === "ko" ? <>제품을 만들고,<br/><em>증거로 말합니다.</em></> : <>I build products,<br/><em>then prove they work.</em></>}</h1>
      <p className="hero-copy">{t.intro}</p>
      <div className="hero-actions"><Link className="button primary" href={`/${locale}/projects/`}>{t.nav.projects} <span>↗</span></Link><a className="button ghost" href="mailto:jeffkm@inha.edu">{t.email}</a></div>
      <div className="orbit-mark" aria-hidden="true"><span>JK</span><i/><i/><i/></div>
    </section>
    <section className="statement"><div className="shell statement-grid"><p>{locale === "ko" ? "제가 중요하게 보는 것" : "What I optimize for"}</p><blockquote>{locale === "ko" ? <>기능의 개수보다 <strong>완료된 사용자 흐름</strong>, 기술 이름보다 <strong>설명 가능한 결정</strong>.</> : <>Completed user journeys over feature counts. <strong>Explainable decisions</strong> over a list of technologies.</>}</blockquote></div></section>
    <section className="section shell"><div className="section-heading"><div><p className="eyebrow">01 / {t.featured}</p><h2>{locale === "ko" ? "제품으로 증명한 일" : "Work proven through products"}</h2></div><Link className="text-link" href={`/${locale}/projects/`}>{t.allProjects} →</Link></div><div className="featured-grid">{projects.slice(0,2).map((project)=><ProjectCard key={project.slug} project={project} locale={locale} featured/>)}</div></section>
    <section className="approach section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">02 / Approach</p><h2>{locale === "ko" ? "만드는 방식" : "How I work"}</h2></div></div><div className="approach-grid">{(locale === "ko" ? [["01","문제를 좁힙니다","기능보다 사용자가 해결하려는 판단과 행동을 먼저 정의합니다."],["02","경계를 설계합니다","데이터의 소유권, 상태 변경과 실패가 전파되는 지점을 명시합니다."],["03","실제로 검증합니다","테스트 통과에 그치지 않고 핵심 흐름을 직접 사용해 확인합니다."]] : [["01","Narrow the problem","Define the decision and behavior a user needs before listing features."],["02","Design boundaries","Make ownership, state transitions, and failure propagation explicit."],["03","Verify in context","Go beyond passing tests and exercise the complete user journey."]]).map(([n,h,p])=><article key={n}><span>{n}</span><h3>{h}</h3><p>{p}</p></article>)}</div></div></section>
    <section className="contact-band"><div className="shell"><p className="eyebrow">03 / Contact</p><h2>{t.contact}</h2><a className="button inverse" href="mailto:jeffkm@inha.edu">jeffkm@inha.edu ↗</a></div></section>
  </PageShell>;
}
