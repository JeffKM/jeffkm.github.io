import { z } from "zod";

export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];

export const copy = {
  ko: {
    nav: { home: "홈", projects: "프로젝트", devlog: "개발 기록", learning: "학습", about: "소개" },
    role: "제품을 만들고 검증하는 백엔드 지향 개발자",
    intro: "실제 사용 흐름을 끝까지 만들고, 구조와 데이터 흐름, 실패 가능성을 직접 검증합니다.",
    featured: "대표 작업",
    allProjects: "모든 프로젝트 보기",
    viewCase: "사례 자세히 보기",
    visit: "서비스 방문",
    source: "소스 보기",
    status: "현재 상태",
    verified: "마지막 확인",
    contact: "함께 만들 문제를 이야기해 주세요.",
    email: "이메일 보내기",
    skip: "본문으로 건너뛰기",
    theme: "테마 전환",
    language: "English",
    languageLabel: "영어로 보기",
  },
  en: {
    nav: { home: "Home", projects: "Projects", devlog: "Devlog", learning: "Learning", about: "About" },
    role: "Backend-oriented product developer who builds and validates real products",
    intro: "I build complete user flows and verify their architecture, data movement, and failure modes myself.",
    featured: "Selected work",
    allProjects: "View all projects",
    viewCase: "Read the case study",
    visit: "Visit product",
    source: "View source",
    status: "Current status",
    verified: "Last verified",
    contact: "Have a problem worth building for? Let’s talk.",
    email: "Send an email",
    skip: "Skip to content",
    theme: "Switch theme",
    language: "한국어",
    languageLabel: "View in Korean",
  },
} as const;

const projectSchema = z.object({
  slug: z.string(),
  title: z.string().min(1),
  eyebrow: z.record(z.enum(locales), z.string().min(1)),
  summary: z.record(z.enum(locales), z.string().min(1)),
  problem: z.record(z.enum(locales), z.string().min(1)),
  role: z.record(z.enum(locales), z.string().min(1)),
  decision: z.record(z.enum(locales), z.string().min(1)),
  validation: z.record(z.enum(locales), z.string().min(1)),
  status: z.enum(["In development", "Public beta", "Released", "Maintained", "Paused", "Archived"]),
  verifiedAt: z.string(),
  tags: z.array(z.string()),
  source: z.url(),
  live: z.url().optional(),
  accent: z.enum(["lime", "violet", "orange", "blue"]),
  visual: z.enum(["pitch", "naraka", "market", "pet", "platform"]),
});

export type Project = z.infer<typeof projectSchema>;

export const projects: Project[] = z.array(projectSchema).parse([
  {
    slug: "pitch-ac",
    title: "Pitch-AC",
    eyebrow: { ko: "축구 데이터를 맥락으로 바꾸는 제품", en: "Turning football data into context" },
    summary: {
      ko: "유럽 5대 리그의 경기·순위·선수 데이터를 한곳에서 해석하는 축구 데이터 플랫폼입니다.",
      en: "A football data platform for understanding fixtures, tables, and player performance across Europe’s big five leagues.",
    },
    problem: {
      ko: "축구 통계는 많지만 숫자가 어떤 의미인지 바로 판단하기 어렵습니다. 비교 기준과 한국어 해설을 데이터 옆에 놓아 해석 비용을 줄이고자 했습니다.",
      en: "Football statistics are abundant, but isolated numbers are hard to judge. The product places comparisons and Korean explanations beside the data to reduce interpretation cost.",
    },
    role: {
      ko: "제품 기획부터 Next.js UI, Supabase 데이터 모델, 동기화 서비스와 배포까지 전체 흐름을 설계·구현했습니다.",
      en: "I designed and built the product end to end: product scope, Next.js UI, Supabase data model, synchronization services, and deployment.",
    },
    decision: {
      ko: "모든 수치에 순위·백분위·비교 맥락 중 하나를 결합했습니다. 외부 API 호출은 데이터베이스에 동기화해 제한과 장애가 사용자 흐름에 직접 전파되지 않게 했습니다.",
      en: "Every metric carries ranking, percentile, or comparison context. External API results are synchronized into the database so rate limits and outages do not directly break the user flow.",
    },
    validation: {
      ko: "공개 배포에서 매치데이, 순위표, ScoutLab의 핵심 흐름을 확인했습니다. 5대 리그 데이터 인프라와 인증, 자동 동기화가 구현되어 있으며 기능 확장을 계속하고 있습니다.",
      en: "The deployed product exposes the core Matchday, Ranking, and ScoutLab flows. Big-five data infrastructure, authentication, and scheduled synchronization are implemented while feature work continues.",
    },
    status: "Public beta",
    verifiedAt: "2026-08-10",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    source: "https://github.com/JeffKM/pitch-ac",
    live: "https://pitch-ac.vercel.app/",
    accent: "lime",
    visual: "pitch",
  },
  {
    slug: "dear-my-naraka",
    title: "Dear My Naraka",
    eyebrow: { ko: "복잡한 상태를 하나의 코지 라이프로", en: "A cohesive cozy life from complex state" },
    summary: {
      ko: "농사, 카페 운영, 관계와 서사가 이어지는 Godot 기반 코지 라이프 RPG입니다.",
      en: "A Godot cozy-life RPG where farming, café work, relationships, and narrative form one persistent world.",
    },
    problem: {
      ko: "서로 다른 생활 콘텐츠가 따로 노는 대신 하나의 하루와 성장 구조 안에서 서로 의미를 가져야 했습니다.",
      en: "Rather than becoming disconnected minigames, every life system needed a role in the same daily rhythm and progression model.",
    },
    role: {
      ko: "제품 기획, 도메인·상태 모델, 시스템 통합, AI 산출물 검수와 실제 플레이 테스트를 담당합니다.",
      en: "I own product direction, domain and state models, system integration, review of AI-assisted output, and hands-on playtesting.",
    },
    decision: {
      ko: "작은 수직 슬라이스로 핵심 루프를 먼저 검증하고, 세이브·시간·관계·경제 상태의 경계를 문서와 테스트로 고정했습니다.",
      en: "I validate the core loop through vertical slices, then make save, time, relationship, and economy boundaries explicit through documentation and tests.",
    },
    validation: {
      ko: "현재 개발 중이며 출시 전까지 완성이나 판매 성과를 주장하지 않습니다. 실제 게임 화면 통합과 플레이스루를 기준으로 에셋과 기능을 승인합니다.",
      en: "The game is in development; no release or sales outcome is claimed. Assets and features are approved in integrated game scenes and full playthroughs, not in isolation.",
    },
    status: "In development",
    verifiedAt: "2026-08-10",
    tags: ["Godot 4", "GDScript", "Game systems", "State design"],
    source: "https://github.com/JeffKM/naraka-valley",
    accent: "violet",
    visual: "naraka",
  },
  {
    slug: "naraka-stock",
    title: "NARAKA Stock Exchange",
    eyebrow: { ko: "공정성을 서버 트랜잭션으로", en: "Fairness enforced by server transactions" },
    summary: { ko: "오프라인 행사 참여자를 위한 모의 주식 거래 웹 서비스입니다.", en: "A simulated stock market built for an offline community event." },
    problem: { ko: "상품이 걸린 모의 시장에서 잔고·체결·가격을 클라이언트에 맡기지 않고 일관되게 처리해야 했습니다.", en: "A prize-backed simulation required balances, fills, and prices to remain consistent and server-authoritative." },
    role: { ko: "시장 규칙, 가격 엔진, 데이터 모델과 전체 웹 제품을 설계했습니다.", en: "I designed the market rules, price engine, data model, and full web product." },
    decision: { ko: "모든 금액 계산을 PostgreSQL 단일 트랜잭션으로 처리하고 사전 생성 가격 경로로 장중 운영 복잡도를 줄였습니다.", en: "All monetary changes run in a single PostgreSQL transaction, while pre-generated price paths reduce runtime operational complexity." },
    validation: { ko: "가격 엔진은 같은 순수 함수를 사용하는 몬테카를로 시뮬레이션으로 밸런스를 점검했습니다. 프로젝트는 비공개 운영 범위입니다.", en: "The price engine was balance-checked through Monte Carlo simulations sharing the production pure functions. The operational project remains private." },
    status: "In development",
    verifiedAt: "2026-08-10",
    tags: ["Next.js", "PostgreSQL", "Transactions", "Simulation"],
    source: "https://github.com/JeffKM/naraka-stock",
    accent: "orange",
    visual: "market",
  },
  {
    slug: "narakuchi",
    title: "Narakuchi",
    eyebrow: { ko: "가벼운 일상 교감과 수집", en: "Lightweight daily bonding and collecting" },
    summary: { ko: "모바일 웹에서 즐기는 Godot 기반 데일리 교감·체키 수집 팬게임입니다.", en: "A Godot mobile-web fan game built around daily bonding and collectible cheki cards." },
    problem: { ko: "매일 돌아올 이유는 만들되, 접속하지 않았다고 이미 쌓은 진행을 잃게 만들고 싶지 않았습니다.", en: "The design needed a reason to return daily without punishing players by erasing accumulated progress." },
    role: { ko: "게임 구조, 상태 모델, 인터랙션과 모바일 화면을 설계했습니다.", en: "I designed the game structure, state model, interactions, and mobile presentation." },
    decision: { ko: "방치 영향은 오늘의 기분처럼 즉시 회복되는 표면 상태에만 두고 수집·관계 진행은 영구 보존하도록 경계를 만들었습니다.", en: "Neglect only affects immediately recoverable surface state such as today’s mood; collection and relationship progress are permanent." },
    validation: { ko: "Godot 4 프로젝트와 웹 모바일 규격, 핵심 시스템 문서가 존재하며 현재 개발 상태로 표시합니다.", en: "A Godot 4 project, mobile-web specification, and core-system documentation exist; the project remains in development." },
    status: "In development",
    verifiedAt: "2026-08-10",
    tags: ["Godot 4", "GDScript", "PWA", "Game design"],
    source: "https://github.com/JeffKM/Narakuchi",
    accent: "blue",
    visual: "pet",
  },
  {
    slug: "portfolio-platform",
    title: "Portfolio Platform",
    eyebrow: { ko: "검증 가능한 이중 언어 발행 시스템", en: "A verifiable bilingual publishing system" },
    summary: { ko: "정적 배포, 한·영 콘텐츠, 접근성 모션을 결합한 이 포트폴리오 자체입니다.", en: "This portfolio itself: static delivery, paired Korean and English content, and accessible motion." },
    problem: { ko: "오래된 블로그를 현재의 제품·학습 증거를 정확하게 발행하는 채용용 플랫폼으로 바꿔야 했습니다.", en: "An old blog needed to become a hiring-focused platform that publishes current product and learning evidence accurately." },
    role: { ko: "정보 구조와 콘텐츠 근거를 결정하고 AI 구현을 검토·통합했습니다.", en: "I set the information architecture and evidence boundaries, then reviewed and integrated AI-assisted implementation." },
    decision: { ko: "서버 기능 없이 완전 정적 배포를 유지하면서 모든 공개 콘텐츠에 대응 번역과 일관된 메타데이터를 요구합니다.", en: "The site remains fully static while requiring paired translations and consistent metadata for every public item." },
    validation: { ko: "정적 빌드, 타입·콘텐츠 검사와 한·영 Playwright 흐름을 배포 전 실행합니다.", en: "Static build, type and content validation, and bilingual Playwright journeys run before deployment." },
    status: "In development",
    verifiedAt: "2026-08-10",
    tags: ["Next.js", "MDX", "i18n", "Playwright"],
    source: "https://github.com/JeffKM/jeffkm.github.io",
    accent: "blue",
    visual: "platform",
  },
]);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "ko" ? "en" : "ko";
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
