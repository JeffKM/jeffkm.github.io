import type { Project } from "@/lib/content";

export function ProjectVisual({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div className={`project-visual visual-${project.visual} ${large ? "is-large" : ""}`} aria-hidden="true">
      <div className="visual-grid" />
      {project.visual === "pitch" ? <><span className="pitch-line" /><span className="data-pill">84%</span><span className="data-pill second">xG 1.42</span><span className="data-dot one"/><span className="data-dot two"/><span className="data-dot three"/></> : null}
      {project.visual === "naraka" ? <><span className="pixel moon"/><span className="pixel house"/><span className="pixel soul one"/><span className="pixel soul two"/><span className="pixel soul three"/></> : null}
      {project.visual === "market" ? <><span className="ticker">NARAKA 1,284.7</span><svg viewBox="0 0 400 160"><path d="M0 125 L42 118 L68 132 L104 92 L140 104 L177 54 L211 78 L250 40 L292 62 L330 25 L400 42" fill="none" stroke="currentColor" strokeWidth="5"/></svg></> : null}
      {project.visual === "pet" ? <><span className="pet-shell"><i/><i/><i/></span><span className="heart">♥</span></> : null}
      {project.visual === "platform" ? <><span className="window"><i/><i/><i/><b/></span></> : null}
    </div>
  );
}
