import type { SceneLayer as Layer } from "@/lib/scroll-world";

/**
 * 씬 배경. 모든 씬이 같은 빛 무리를 공유해서, 카메라가 장면을 갈아타는 것이 아니라
 * 하나의 세계를 계속 통과하는 것처럼 보이게 한다.
 * (docs/research/interactive-web/01-scroll-world-skill.md 의 씬 연결 원칙)
 */
export function SceneBackdrop({ layer }: { layer: Layer }) {
  return (
    <div className="sw-backdrop" aria-hidden="true">
      <span className="sw-core" />
      {/* 첫 씬은 CTA 와 증거 지표까지 담아 세로로 길다. 도형을 더 얹으면 글자와 부딪힌다. */}
      {layer === "signal" ? <><span className="sw-orbit" /><span className="sw-orbit sw-orbit-wide" /></> : null}
    </div>
  );
}

/**
 * 씬 도형. 배경이 아니라 본문 바로 아래에 놓이는 그림이다.
 * 화면 하단에 고정하면 창이 클수록 글과 그림 사이가 비어 버리므로 문서 흐름 안에 둔다.
 */
export function SceneFigure({ layer }: { layer: Layer }) {
  if (layer === "signal") return null;
  return (
    <div className={`sw-figure sw-figure-${layer}`} aria-hidden="true">
      {layer === "structure" ? <span className="sw-blocks"><i /><i /><i /><i /><i /><i /></span> : null}
      {layer === "flow" ? <span className="sw-pipe"><b>REQUEST</b><i /><b>DOMAIN</b><i /><b>DATABASE</b><i /><b>PROOF</b></span> : null}
      {layer === "failure" ? <span className="sw-break"><u data-state="down">API 503</u><u data-state="up">CACHE OK</u><i /></span> : null}
      {layer === "proof" ? <span className="sw-checks"><u>types</u><u>content</u><u>e2e ko</u><u>e2e en</u><b>✓</b></span> : null}
      {layer === "work" ? <span className="sw-cards"><i /><i /><i /></span> : null}
    </div>
  );
}
