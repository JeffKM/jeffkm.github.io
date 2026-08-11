import { expect, test } from "@playwright/test";

for (const locale of ["ko", "en"] as const) {
  test(`${locale} core navigation @smoke`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
    await page.goto(`/${locale}/`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.getByRole("link", { name: locale === "ko" ? "프로젝트" : "Projects" }).first().click();
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

test("reduced motion presents a static hero", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/en/");
  await expect(page.getByRole("button", { name: "Pause motion" })).toBeHidden();
  const animationName = await page.locator(".kinetic-word").first().evaluate((element) => getComputedStyle(element).animationName);
  expect(animationName).toBe("none");
  await context.close();
});
