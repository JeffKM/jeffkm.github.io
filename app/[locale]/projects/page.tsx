import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ProjectCard } from "@/components/project-card";
import { isLocale, projects } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const{locale}=await params;if(!isLocale(locale))return{};return pageMetadata(locale,locale==="ko"?"프로젝트":"Projects",locale==="ko"?"문제와 결정, 검증으로 정리한 제품 사례":"Product cases organized around problems, decisions, and validation","/projects")}

export default async function ProjectsPage({params}:{params:Promise<{locale:string}>}){const{locale}=await params;if(!isLocale(locale))return null;return <PageShell locale={locale} currentPath="projects"><section className="page-hero shell"><p className="eyebrow">Projects / 01—05</p><h1>{locale==="ko"?<>기능 목록 대신,<br/><em>결정의 맥락.</em></>:<>Beyond feature lists:<br/><em>the context of decisions.</em></>}</h1><p>{locale==="ko"?"각 프로젝트에서 해결한 문제, 맡은 역할, 구조적 결정과 확인된 현재 상태를 기록합니다.":"Each project documents the problem, my role, structural decisions, and verified current state."}</p></section><section className="shell project-list">{projects.map((project)=><ProjectCard key={project.slug} project={project} locale={locale}/>)}</section></PageShell>}
