import Link from "next/link";
import type { Locale, Project } from "@/lib/content";
import { copy } from "@/lib/content";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({ project, locale, featured = false }: { project: Project; locale: Locale; featured?: boolean }) {
  const t = copy[locale];
  return (
    <article className={`project-card accent-${project.accent} ${featured ? "featured-card" : ""}`}>
      <ProjectVisual project={project} />
      <div className="project-card-body">
        <div className="card-meta"><span className="status-dot" />{project.status}<span>·</span><span>{project.tags[0]}</span></div>
        <p className="eyebrow">{project.eyebrow[locale]}</p>
        <h3>{project.title}</h3>
        <p>{project.summary[locale]}</p>
        <Link className="text-link" href={`/${locale}/projects/${project.slug}/`}>{t.viewCase} <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  );
}
