import type { Locale } from "./content";
import { projects } from "./content";

/**
 * 스크롤 월드 씬 정의.
 *
 * 인터랙션 모델은 docs/research/interactive-web/01-scroll-world-skill.md 를 따른다.
 * 스크롤은 페이지를 이동시키는 것이 아니라 하나로 이어진 씬 시퀀스의 재생 위치를 정한다.
 *
 * `video`에 경로를 넣으면 해당 씬은 코드로 그린 레이어 대신 영상 스크럽으로 재생된다.
 * 영상이 없는 동안에는 `layer` 값에 따라 CSS/SVG 씬이 그려진다.
 */
export type SceneLayer = "signal" | "structure" | "flow" | "failure" | "proof" | "work";

export type Scene = {
  id: SceneLayer;
  /** 씬 순번 표기(01 …). 진행 표시와 스크린 리더 레이블에 함께 쓴다. */
  index: string;
  eyebrow: Record<Locale, string>;
  headline: Record<Locale, string>;
  caption: Record<Locale, string>;
  layer: SceneLayer;
  /** public/ 아래 영상 경로. 생성 전까지는 undefined. */
  video?: string;
};

export const scenes: Scene[] = [
  {
    id: "signal",
    index: "01",
    eyebrow: { ko: "출발점", en: "Origin" },
    headline: { ko: "아이디어를 작동하는 흐름으로", en: "Ideas into working flows" },
    caption: {
      ko: "제품을 만들고 검증하는 백엔드 지향 개발자 이경민입니다. 화면 뒤의 구조부터 실제 사용 흐름까지 직접 만듭니다.",
      en: "I am Kyungmin Lee, a backend-oriented product developer. I build from the structure behind the screen out to the flow people actually use.",
    },
    layer: "signal",
  },
  {
    id: "structure",
    index: "02",
    eyebrow: { ko: "구조", en: "Structure" },
    headline: { ko: "화면 뒤에는 구조가 있다", en: "Behind the screen there is structure" },
    caption: {
      ko: "기능을 붙이기 전에 도메인 경계와 상태를 먼저 그립니다. 무엇이 어디에 속하는지 정하면 나머지 결정이 따라옵니다.",
      en: "Before adding features I draw domain boundaries and state. Once ownership is settled, the remaining decisions follow.",
    },
    layer: "structure",
  },
  {
    id: "flow",
    index: "03",
    eyebrow: { ko: "흐름", en: "Flow" },
    headline: { ko: "데이터는 요청에서 증거까지 흐른다", en: "Data flows from request to proof" },
    caption: {
      ko: "요청은 도메인을 지나 데이터베이스에 닿고, 다시 사용자가 확인할 수 있는 결과로 돌아옵니다.",
      en: "A request passes through the domain, reaches the database, and returns as something a person can verify.",
    },
    layer: "flow",
  },
  {
    id: "failure",
    index: "04",
    eyebrow: { ko: "실패", en: "Failure" },
    headline: { ko: "실패는 일어난다", en: "Failure happens" },
    caption: {
      ko: "외부 API가 멈춰도 사용자 흐름이 끊기지 않도록 동기화 계층을 둡니다. 데이터가 실패해도 흐름은 무너지지 않게.",
      en: "A synchronization layer keeps the user flow alive when an external API stalls. The flow holds even when data fails.",
    },
    layer: "failure",
  },
  {
    id: "proof",
    index: "05",
    eyebrow: { ko: "검증", en: "Verification" },
    headline: { ko: "그래서 직접 검증한다", en: "So I verify it myself" },
    caption: {
      ko: "타입 검사, 콘텐츠 검증, 한국어와 영어 양쪽의 종단 테스트를 통과한 뒤에야 배포합니다.",
      en: "Type checks, content validation, and end-to-end journeys in both Korean and English run before anything ships.",
    },
    layer: "proof",
  },
  {
    id: "work",
    index: "06",
    eyebrow: { ko: "결과", en: "Outcome" },
    headline: { ko: "그래서 이렇게 만들었다", en: "So here is what I built" },
    caption: {
      ko: "같은 방식으로 만든 제품들입니다. 각 사례에는 무엇을 결정했고 무엇으로 확인했는지 적어 두었습니다.",
      en: "These products were built the same way. Each case records what was decided and how it was checked.",
    },
    layer: "work",
  },
];

/**
 * 히어로에 놓을 증거 지표.
 *
 * docs/research/interactive-web/05-seven-design-principles.md 의 원칙 1·5를 따른다.
 * 소셜 프루프는 의심이 생기는 지점, 즉 첫 화면과 행동 유도 바로 옆에 있어야 한다.
 * 수치는 lib/content.ts 의 실제 프로젝트 기록에서 계산하므로 손으로 관리하지 않는다.
 */
export function heroProof(locale: Locale) {
  const shipped = projects.filter((project) => project.live).length;
  const active = projects.filter((project) => project.status === "In development").length;
  const verifiedAt = projects.map((project) => project.verifiedAt).sort().at(-1) ?? "";

  return [
    { value: String(projects.length), label: locale === "ko" ? "공개 사례" : "Public cases" },
    { value: String(shipped), label: locale === "ko" ? "배포 중" : "Live now" },
    { value: String(active), label: locale === "ko" ? "개발 중" : "In development" },
    { value: verifiedAt, label: locale === "ko" ? "마지막 검증" : "Last verified" },
  ];
}
