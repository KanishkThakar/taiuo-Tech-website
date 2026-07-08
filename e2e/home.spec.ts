import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/* reduced-motion renders all reveals instantly — deterministic assertions */
test.use({ contextOptions: { reducedMotion: "reduce" } });

test("homepage renders every section with no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });

  await page.goto("/");
  await expect(page).toHaveTitle(/Taiuo Tech/);

  // every section heading, matched by role so hidden nav links can't collide
  for (const heading of [
    "Improve your looks",
    "Life-changing",
    "Studies show your looks influence",
    "A new way to",
    "Your complete",
    "dermatologists",
    "Taking into",
    "You will",
    "How it works",
    "What could cost you",
    "Frequently asked questions",
    "Will analyzing my face",
    "Consider this",
  ]) {
    const el = page.getByRole("heading", { name: new RegExp(heading, "i") }).first();
    // below-fold sections use content-visibility:auto — bring into view first
    await el.scrollIntoViewIfNeeded();
    await expect(el, heading).toBeVisible();
  }
  await expect(page.getByText("As Seen In")).toBeVisible();

  expect(errors).toEqual([]);
});

test("stats tabs switch and re-render the evidence cards", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Dating" }).click();
  await expect(page.getByText("More matches", { exact: true })).toBeVisible();
  await expect(page.getByText("Tyson et al., 2016")).toBeVisible();
  await page.getByRole("tab", { name: "Happiness" }).click();
  await expect(page.getByText("Life satisfaction", { exact: true })).toBeVisible();
});

test("FAQ accordion is single-open and switches categories", async ({ page }) => {
  await page.goto("/");
  const faq = page.locator("#faq");
  await faq.scrollIntoViewIfNeeded();

  // first item open by default; opening another closes it
  await expect(faq.getByText("Taiuo is the world's best platform")).toBeVisible();
  await faq.getByRole("button", { name: "Who is this for?" }).click();
  await expect(faq.getByText("Taiuo is for anyone")).toBeVisible();
  await expect(faq.getByText("Taiuo is the world's best platform")).toBeHidden();

  // category switch
  await faq.getByRole("tab", { name: "Privacy" }).click();
  await expect(faq.getByRole("button", { name: "Is my data private?" })).toBeVisible();
});

test("primary CTAs route into the product flow", async ({ page }) => {
  await page.goto("/");
  const cta = page.getByRole("link", { name: "Start my plan" }).first();
  await expect(cta).toBeVisible();
  await cta.scrollIntoViewIfNeeded();
  // The CTA is a client <Link>; a click landing mid-hydration can be dropped
  // (handler attached, router not yet ready). Re-click while still on the home
  // page until the route actually changes. Onboarding is auth-gated, so an
  // unauthenticated visitor lands on onboarding and is bounced to login — both
  // count as entering the product flow.
  await expect(async () => {
    if (new URL(page.url()).pathname === "/") await cta.click();
    await page.waitForURL(/\/(onboarding|login)/, { timeout: 2500 });
  }).toPass({ timeout: 20_000, intervals: [400, 900, 1800] });
});

test("mobile menu opens, closes on Escape, locks scroll", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
});

test("axe: no serious or critical a11y violations", async ({ page }) => {
  await page.goto("/");
  // let the hero entrance settle — axe samples blended colors mid-fade otherwise
  await page.waitForTimeout(2500);
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter((v) =>
    ["serious", "critical"].includes(v.impact ?? ""),
  );
  expect(blocking.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`)).toEqual([]);
});
