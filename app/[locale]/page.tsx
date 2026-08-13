import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ProjectVisual } from "@/components/project-visual";
import { ScrollWorld } from "@/components/scroll-world";
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
    <ScrollWorld locale={locale}/>

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

    <section className="kinetic-contact">
      <p>{locale === "ko" ? "새로운 제품과 협업 이야기를 기다립니다" : "Open for product work and collaborations"}</p>
      <a href="mailto:jeffkm@inha.edu"><span>{locale === "ko" ? "함께 만들기" : "CONTACT JEFF"}</span><b>↗</b></a>
    </section>
  </PageShell>;
}
