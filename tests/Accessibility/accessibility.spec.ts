import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Check accessibility on homepage", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com");

  // Create an instance of AxeBuilder
  const axe = new AxeBuilder({ page });

  // Run accessibility check
  const results = await axe.analyze();

  // Log the results
  console.log(results);

  // Filter for critical violations
  const criticalViolations = results.violations.filter(violation => violation.impact === 'critical');

  // Log critical violations
  console.log("Critical Accessibility Violations:");
  criticalViolations.forEach(violation => {
    console.log(`\nViolation: ${violation.id}`);
    console.log(`Description: ${violation.description}`);
    console.log(`Help: ${violation.help}`);
    console.log(`Help URL: ${violation.helpUrl}`);
    violation.nodes.forEach(node => {
      console.log(`\n  Node: ${node.html}`);
      console.log(`  Failure Summary: ${node.failureSummary}`);
      node.any.forEach(check => {
        console.log(`    Check: ${check.message}`);
      });
    });
  });

  // Assert that there are no critical accessibility violations
  expect(criticalViolations).toEqual([]);
});