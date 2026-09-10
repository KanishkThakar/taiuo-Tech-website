import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
test.use({ contextOptions: { reducedMotion: "reduce" } });

test("homepage explains the skin platform before supporting recommendations", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Taiuo.*Understand your skin/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Understand your skin.Make smarter beauty decisions.",
  );
  for (const id of ["how", "experience", "discovery", "philosophy", "intelligence", "faq"])
    await expect(page.locator(`#${id}`)).toBeAttached();
  await expect(page.locator(".platform-portrait img")).toHaveAttribute(
    "alt",
    /illustrate guided skin capture/,
  );
  await page.locator(".platform-portrait img").scrollIntoViewIfNeeded();
  await expect(page.locator(".platform-portrait img")).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator(".platform-portrait img")
        .evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0),
    )
    .toBe(true);
  await expect(page.locator(".tech-steps li")).toHaveCount(4);
  await expect(page.locator(".tech-hero a[href*=products]")).toHaveCount(0);
  await expect(
    page.getByText("Interface illustration. This portrait has not been analysed."),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("experience supports tabs, keyboard navigation and morning/evening routines", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Your daily ritual" }).click();
  await expect(page.getByRole("tabpanel").getByText("Protect", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Evening", exact: true }).click();
  await expect(page.getByText("Your evening care step")).toBeVisible();
  await expect(page.getByRole("tabpanel").getByText("Protect", { exact: true })).toHaveCount(0);
  await page.getByRole("tab", { name: "Your daily ritual" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Your progress" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByText("Your skin journal.")).toBeVisible();
  await page.keyboard.press("Home");
  await expect(page.getByRole("tab", { name: "Your skin read" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("FAQ opens one answer at a time", async ({ page }) => {
  await page.goto("/");
  await page.locator("#faq summary").nth(0).click();
  await expect(page.locator("#faq details[open]")).toHaveCount(1);
  await page.locator("#faq summary").nth(1).click();
  await expect(page.locator("#faq details[open]")).toHaveCount(1);
  await expect(page.locator("#faq details[open]")).toContainText("recommendations are optional");
});

test("conversion and policy links lead to the actual Taiuo app", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "Start your skin analysis", exact: true }),
  ).toHaveCount(2);
  for (const link of await page
    .getByRole("link", { name: "Start your skin analysis", exact: true })
    .all())
    await expect(link).toHaveAttribute("href", "https://taiuo.com/scan");
  await expect(page.getByRole("link", { name: "Privacy", exact: true })).toHaveAttribute(
    "href",
    "https://taiuo.com/privacy",
  );
  await expect(page.getByRole("link", { name: "Terms", exact: true })).toHaveAttribute(
    "href",
    "https://taiuo.com/terms",
  );
});

test("mobile menu closes with Escape and an anchor selection", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Mobile" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation", { name: "Mobile" })
    .getByRole("link", { name: "How it works" })
    .click();
  await expect(page.getByRole("navigation", { name: "Mobile" })).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
  ).toBe(true);
});

test("axe: no serious or critical accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(
    results.violations
      .filter((v) => ["serious", "critical"].includes(v.impact ?? ""))
      .map((v) => `${v.id}: ${v.nodes.map((node) => node.target.join(" ")).join(", ")}`),
  ).toEqual([]);
});

test("design studio exposes all 12 full-page directions and device controls", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/directions");
  const choices = page.getByRole("navigation", { name: "Design directions" }).getByRole("button");
  await expect(choices).toHaveCount(12);
  await choices.nth(11).click();
  await expect(page.locator("iframe")).toHaveAttribute("src", "/directions/12");
  await expect(page.frameLocator("iframe").getByRole("heading", { level: 1 })).toHaveText(
    "Skin.Understood.",
  );
  await page.getByRole("button", { name: "Mobile preview" }).click();
  await expect(page.locator(".review-stage")).toHaveClass(/review-mobile/);
  await page.getByRole("button", { name: "Next direction" }).click();
  await expect(page.locator("iframe")).toHaveAttribute("src", "/directions/01");
});

test("product, scent and model evidence copy preserve their claim boundaries", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Explore skincare options" })).toHaveAttribute(
    "href",
    "https://taiuo.com/products",
  );
  await expect(page.getByRole("link", { name: "Explore fragrance preferences" })).toHaveAttribute(
    "href",
    "https://taiuo.com/fragrance",
  );
  await page.locator(".evidence-details summary").click();
  await expect(page.locator(".evidence-details")).toContainText("25 synthetic faces");
  await expect(page.locator(".evidence-details")).toContainText("not skin-condition detection");
  await expect(page.locator(".tech-support-grid")).toContainText(
    "stated taste, occasion and budget",
  );
});
