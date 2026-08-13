import { expect, test } from "@playwright/test";

for (const locale of ["ko", "en"] as const) {
  test(`${locale} core navigation @smoke`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
    await page.goto(`/${locale}/`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.getByRole("link", { name: locale === "ko" ? "제품 사례 보기" : "See the product cases" }).click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/projects/`));
    await page.getByRole("link", { name: locale === "ko" ? "사례 자세히 보기" : "Read the case study" }).first().click();
    await expect(page.getByRole("heading", { name: "Pitch-AC", level: 1 })).toBeVisible();
    await expect(page.getByText("Public beta", { exact: true })).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });
}

test("language pair and theme persist @smoke", async ({ page }) => {
  await page.goto("/ko/projects/pitch-ac/");
  await page.getByRole("link", { name: "영어로 보기" }).click();
  await expect(page).toHaveURL(/\/en\/projects\/pitch-ac\/$/);
  await page.getByRole("button", { name: "Switch theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("keyboard skip link and mobile content work", async ({ page, browserName }) => {
  await page.goto("/en/");
  if (browserName === "chromium") {
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
    await page.getByRole("link", { name: "Skip to content" }).press("Enter");
    await expect(page.locator("#main")).toBeFocused();
  }
  await expect(page.getByText("Pitch-AC", { exact: true }).first()).toBeVisible();
});

test("kinetic menu and motion controls remain user-controlled", async ({ page }) => {
  await page.goto("/ko/");
  await page.getByRole("button", { name: "모션 정지" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
  const menuButton = page.getByRole("button", { name: "메뉴" });
  await menuButton.click();
  await expect(page.getByRole("button", { name: "닫기" })).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation", { name: "전체 메뉴" })).toBeVisible();
});

test("the first scene carries a decision on its own @smoke", async ({ page }) => {
  await page.goto("/ko/");
  // 히어로는 스크롤 없이 판단할 수 있어야 한다 — 헤드라인, 맥락, 증거, 행동.
  await expect(page.getByRole("heading", { level: 1, name: "아이디어를 작동하는 흐름으로" })).toBeVisible();
  await expect(page.getByText("제품을 만들고 검증하는 백엔드 지향 개발자")).toBeVisible();
  await expect(page.getByRole("link", { name: "제품 사례 보기" })).toBeVisible();
  await expect(page.getByText("마지막 검증")).toBeVisible();
});

test("scrolling drives the world scenes", async ({ page }) => {
  await page.goto("/ko/");
  const later = page.getByRole("heading", { name: "그래서 이렇게 만들었다" });
  await expect(later).toBeHidden();
  await page.evaluate(() => {
    const track = document.querySelector(".scroll-world") as HTMLElement;
    window.scrollTo(0, track.offsetTop + track.offsetHeight - window.innerHeight);
  });
  await expect(later).toBeVisible();
});

test("reduced motion lists every scene as a static document", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/en/");
  await expect(page.getByRole("button", { name: "Pause motion" })).toBeHidden();
  // 스크롤 구동이 꺼지면 씬은 겹치지 않고 순서대로 읽히는 문서가 된다.
  for (const headline of ["Ideas into working flows", "Failure happens", "So here is what I built"]) {
    await expect(page.getByRole("heading", { name: headline })).toBeVisible();
  }
  await context.close();
});
