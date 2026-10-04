import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("homepage to final grade result to related GPA tool", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Final Grade Calculator/ }).click();
  await page.getByLabel("Current grade").fill("80");
  await page.getByLabel("Final exam weight").fill("20");
  await page.getByLabel("Desired course grade").fill("84");
  await page.getByRole("button", { name: "Calculate final grade" }).click();
  await expect(page.getByTestId("final-grade-result").getByText("100%").first()).toBeVisible();
  await page.getByRole("link", { name: /GPA Calculator/ }).click();
  await expect(page).toHaveURL(/\/grades\/gpa-calculator$/);
});

test("target GPA shows impossible state and maximum", async ({ page }) => {
  await page.goto("/grades/target-gpa-calculator");
  await page.getByLabel("Current cumulative GPA").fill("3");
  await page.getByLabel("Completed credits").fill("60");
  await page.getByLabel("Target cumulative GPA").fill("3.5");
  await page.getByLabel("Upcoming credits").fill("15");
  await page.getByRole("button", { name: "Check target GPA" }).click();
  const result = page.getByTestId("target-gpa-result");
  await expect(result.getByText(/not reachable/)).toBeVisible();
  await expect(result.getByText("3.2")).toBeVisible();
});

test("semester GPA supports multiple courses", async ({ page }) => {
  await page.goto("/grades/gpa-calculator");
  const credits = page.getByLabel("Credits");
  const grades = page.getByLabel("Grade");
  await credits.nth(0).fill("3");
  await grades.nth(0).selectOption("A");
  await credits.nth(1).fill("3");
  await grades.nth(1).selectOption("B");
  await page.getByRole("button", { name: "Calculate semester GPA" }).click();
  await expect(page.getByTestId("semester-gpa-result").getByText("3.5")).toBeVisible();
});

test("graduation date persists after reload", async ({ page }) => {
  await page.goto("/planning/graduation-countdown");
  await page.getByLabel("Graduation date").fill("2099-05-15");
  await page.getByRole("button", { name: "Start countdown" }).click();
  await page.reload();
  await expect(page.getByLabel("Graduation date")).toHaveValue("2099-05-15");
});

test("word counter updates live and remains private", async ({ page }) => {
  await page.goto("/writing/word-counter");
  await page.getByLabel("Your text").fill("One two three. Another sentence.");
  const result = page.getByTestId("word-count-result");
  await expect(result.getByText("5")).toBeVisible();
  await expect(result.getByText("2", { exact: true })).toBeVisible();
  await expect.poll(() => page.evaluate(() => localStorage.length)).toBe(0);
});

test("key pages have no serious accessibility violations or console errors", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  for (const path of ["/", "/grades/final-grade-calculator", "/writing/word-counter"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    const seriousViolations = results.violations.filter((violation) =>
      violation.impact === "serious" || violation.impact === "critical",
    );
    expect(seriousViolations, `${path} accessibility violations`).toEqual([]);
  }

  expect(consoleErrors).toEqual([]);
});

test("homepage and calculator fit a 320px mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });

  for (const path of ["/", "/grades/final-grade-calculator"]) {
    await page.goto(path);
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    await expect(page.getByRole("main")).toBeVisible();
  }
});
