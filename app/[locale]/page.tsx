import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ProjectVisual } from "@/components/project-visual";
import { KineticType } from "@/components/kinetic-type";
import { MotionControl } from "@/components/motion-control";
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
  const featured = projects.slice(0, 3);

  return <PageShell locale={locale}>
    <section className="kinetic-hero">
      <h1 className="sr-only">{locale === "ko" ? "제품을 만들고 검증하는 백엔드 지향 개발자 이경민" : "Kyungmin Lee, backend-oriented product developer who builds and validates products"}</h1>
      <div className="kinetic-hero-meta">
        <span>Portfolio / 2026</span>
        <p>{locale === "ko" ? "아이디어를 작동하는 흐름으로" : "Ideas into working flows"}</p>
      </div>
      <div className="kinetic-hero-type">
        <KineticType word="BUILD" direction="left"/>
        <div className="kinetic-hero-stage" aria-hidden="true">
          <div className="flow-machine">
            <span className="flow-node node-input">?</span>
            <span className="flow-track"><i/><i/><i/></span>
            <span className="flow-node node-output">✓</span>
          </div>
        </div>
        <KineticType word="VERIFY" direction="right" outline/>
      </div>
      <div className="kinetic-scroll-hint"><span>↓</span>{locale === "ko" ? "스크롤해서 흐름 보기" : "Scroll through the flow"}</div>
      <MotionControl locale={locale}/>
      <div className="edge-orb edge-orb-left" aria-hidden="true"><span>API</span></div>
      <div className="edge-orb edge-orb-right" aria-hidden="true"><span>DB</span></div>
    </section>

    <section className="kinetic-manifesto">
      <div className="kinetic-section-label">{locale === "ko" ? "제가 하는 일" : "What I do"}</div>
      <p>{locale === "ko" ? <>화면 뒤의 <strong>구조</strong>를 설계하고,<br/>데이터가 실패해도 <em>흐름은 무너지지 않게.</em></> : <>I design the <strong>structure</strong> behind the screen,<br/>so the flow holds even when <em>data fails.</em></>}</p>
      <div className="manifesto-stickers" aria-hidden="true"><span>DATA</span><span>FLOW</span><span>TEST</span></div>
    </section>

    <section className="kinetic-work">
      <div className="kinetic-work-heading">
        <p>{locale === "ko" ? "대표 작업" : "Selected work"}</p>
        <h2>{locale === "ko" ? <>만든 것을<br/><span>작동하게.</span></> : <>Making ideas<br/><span>work.</span></>}</h2>
        <div className="kinetic-squiggle" aria-hidden="true">↝</div>
      </div>
      <div className="kinetic-work-list">
        {featured.map((project, index) => <Link className={`kinetic-work-card accent-${project.accent}`} href={`/${locale}/projects/${project.slug}/`} key={project.slug}>
          <div className="kinetic-work-number">0{index + 1}</div>
          <ProjectVisual project={project}/>
          <div className="kinetic-work-copy">
            <div><span>{project.status}</span><span>{project.tags[0]}</span></div>
            <h3>{project.title}</h3>
            <p>{project.eyebrow[locale]}</p>
          </div>
          <b aria-hidden="true">↗</b>
        </Link>)}
      </div>
      <Link className="kinetic-pill-link" aria-label={locale === "ko" ? "프로젝트" : "Projects"} href={`/${locale}/projects/`}><small>{locale === "ko" ? "제품 사례 전체 보기" : "Explore every product case"}</small><strong>{locale === "ko" ? "프로젝트 보기" : "VIEW PROJECTS"}</strong><span>↗</span></Link>
    </section>

    <section className="kinetic-capabilities">
      <p>{locale === "ko" ? "제가 연결하는 것" : "What I connect"}</p>
      <div className="capability-lines">
        <div><span>{locale === "ko" ? "제품 판단" : "PRODUCT"}</span><i>+</i><strong>{locale === "ko" ? "사용자 흐름" : "USER FLOW"}</strong></div>
        <div><strong>{locale === "ko" ? "백엔드 구조" : "BACKEND"}</strong><i>+</i><span>{locale === "ko" ? "데이터" : "DATA"}</span></div>
        <div><span>{locale === "ko" ? "AI 실행" : "AI EXECUTION"}</span><i>+</i><strong>{locale === "ko" ? "직접 검증" : "HUMAN REVIEW"}</strong></div>
      </div>
      <div className="capability-crawler" aria-hidden="true"><span>REQUEST</span><i>→</i><span>DOMAIN</span><i>→</i><span>DATABASE</span><i>→</i><span>PROOF</span></div>
    </section>

    <section className="kinetic-contact">
      <p>{locale === "ko" ? "새로운 제품과 협업 이야기를 기다립니다" : "Open for product work and collaborations"}</p>
      <a href="mailto:jeffkm@inha.edu"><span>{locale === "ko" ? "함께 만들기" : "CONTACT JEFF"}</span><b>↗</b></a>
    </section>
  </PageShell>;
}
