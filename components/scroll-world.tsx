"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/content";
import { heroProof, scenes } from "@/lib/scroll-world";
import { MotionControl } from "./motion-control";
import { SceneBackdrop, SceneFigure } from "./scene-layer";

/** 활성 씬을 기준으로 이 거리보다 멀어진 씬은 그리지 않는다. */
const VISIBLE_RANGE = 1.15;

/**
 * 씬 구간의 앞뒤에서 카메라가 멈춰 있는 비율.
 *
 * 이게 없으면 두 씬이 절반씩 겹친 상태가 스크롤 내내 이어져 헤드라인이 서로를 덮는다.
 * 구간의 양 끝에서는 한 씬만 또렷하게 보이고, 가운데에서만 다음 씬으로 넘어간다.
 */
const DWELL = 0.32;

/** 전환 구간을 부드럽게 만든다(smoothstep). */
function ease(t: number) {
  return t * t * (3 - 2 * t);
}

/**
 * 스크롤이 씬 시퀀스의 재생 위치를 정하는 히어로 대체 섹션.
 *
 * 페이지가 내려가는 것이 아니라 카메라가 하나의 세계를 통과한다.
 * 지나간 씬은 확대되며 흐려지고, 다음 씬은 멀리서 다가온다.
 *
 * 모션을 끄거나 prefers-reduced-motion 이면 씬을 세로로 나열한 일반 문서로 되돌린다.
 * 이때도 모든 문구는 동일하게 읽을 수 있다.
 */
export function ScrollWorld({ locale }: { locale: Locale }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const proof = heroProof(locale);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;

    function resolveStatic() {
      return query.matches || root.dataset.motion === "paused";
    }

    /** 정적 모드는 렌더 상태가 아니라 DOM 속성으로 표시한다. 스타일 전환에만 쓰이므로 리렌더가 필요 없다. */
    function markStatic(value: boolean) {
      trackRef.current?.setAttribute("data-static", value ? "true" : "false");
    }

    let disabled = resolveStatic();
    markStatic(disabled);

    let frame = 0;

    function paint() {
      frame = 0;
      const track = trackRef.current;
      if (!track) return;

      const distance = track.offsetHeight - window.innerHeight;
      const progress = distance > 0 ? Math.min(Math.max(-track.getBoundingClientRect().top / distance, 0), 1) : 0;
      const raw = progress * (scenes.length - 1);
      const step = Math.min(Math.floor(raw), scenes.length - 2);
      const within = raw - step;
      const transition = Math.min(Math.max((within - DWELL) / (1 - 2 * DWELL), 0), 1);
      const position = step + ease(transition);

      scenes.forEach((_, index) => {
        const element = sceneRefs.current[index];
        if (!element) return;
        const offset = index - position;
        const depth = Math.abs(offset);

        if (depth >= VISIBLE_RANGE) {
          element.style.opacity = "0";
          element.style.visibility = "hidden";
          return;
        }

        // 지나간 씬(offset < 0)은 카메라가 통과하며 커지고, 다가올 씬은 아직 멀어서 작다.
        element.style.visibility = "visible";
        // 선형 페이드는 전환 한가운데에서 두 헤드라인을 반반씩 겹쳐 놓는다.
        // 가파르게 떨어뜨려 한 번에 한 씬만 읽히게 한다.
        element.style.opacity = String(Math.max(1 - depth * 1.9, 0));
        element.style.transform = `scale(${1 - offset * 0.34})`;
        element.style.filter = `blur(${(depth * 7).toFixed(2)}px)`;
        // 거의 투명해진 씬은 화면에 남아 있어도 링크와 버튼을 가로채면 안 된다.
        element.style.pointerEvents = depth < 0.5 ? "auto" : "none";

        const video = videoRefs.current[index];
        if (video?.duration) {
          const local = Math.min(Math.max(position - (index - 0.5), 0), 1);
          video.currentTime = local * video.duration;
        }
      });

      track.style.setProperty("--sw-progress", progress.toFixed(4));
    }

    function schedule() {
      if (disabled || frame) return;
      frame = requestAnimationFrame(paint);
    }

    function clearInlineStyles() {
      sceneRefs.current.forEach((element) => {
        if (!element) return;
        element.style.opacity = "";
        element.style.visibility = "";
        element.style.transform = "";
        element.style.filter = "";
        element.style.pointerEvents = "";
      });
    }

    function sync() {
      disabled = resolveStatic();
      markStatic(disabled);
      if (disabled) {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        clearInlineStyles();
        return;
      }
      schedule();
    }

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-motion"] });
    query.addEventListener("change", sync);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      observer.disconnect();
      query.removeEventListener("change", sync);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="scroll-world" ref={trackRef} data-static="false" style={{ ["--sw-count" as string]: scenes.length }}>
      <div className="sw-stage">
        {scenes.map((scene, index) => {
          const first = index === 0;
          const Heading = first ? "h1" : "h2";
          return (
            <section
              className={`sw-scene sw-scene-${scene.layer}`}
              key={scene.id}
              ref={(element) => { sceneRefs.current[index] = element; }}
              aria-label={`${scene.index} ${scene.eyebrow[locale]}`}
              style={first ? undefined : { opacity: 0, visibility: "hidden", pointerEvents: "none" }}
            >
              {scene.video ? (
                <video
                  className="sw-scene-video"
                  ref={(element) => { videoRefs.current[index] = element; }}
                  src={scene.video}
                  muted
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                />
              ) : (
                <SceneBackdrop layer={scene.layer} />
              )}
              <div className="sw-scene-copy">
                <p className="sw-scene-eyebrow"><b>{scene.index}</b>{scene.eyebrow[locale]}</p>
                <Heading>{scene.headline[locale]}</Heading>
                <p className="sw-scene-caption">{scene.caption[locale]}</p>
                {first ? (
                  <>
                    <div className="sw-actions">
                      <Link className="sw-cta" href={`/${locale}/projects/`}>
                        {locale === "ko" ? "제품 사례 보기" : "See the product cases"}<span aria-hidden="true">↗</span>
                      </Link>
                      <a className="sw-cta sw-cta-quiet" href="mailto:jeffkm@inha.edu">
                        {locale === "ko" ? "협업 문의" : "Start a conversation"}
                      </a>
                    </div>
                    <dl className="sw-proof">
                      {proof.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
                    </dl>
                  </>
                ) : null}
              </div>
              {scene.video ? null : <SceneFigure layer={scene.layer} />}
            </section>
          );
        })}

        <div className="sw-progress" aria-hidden="true">
          <span className="sw-progress-bar"><i /></span>
          <span className="sw-progress-count">01 — {scenes.at(-1)?.index}</span>
        </div>
        <p className="sw-hint" aria-hidden="true">
          <span>↓</span>{locale === "ko" ? "스크롤해서 흐름 따라가기" : "Scroll to follow the flow"}
        </p>
        <MotionControl locale={locale}/>
      </div>
    </div>
  );
}
