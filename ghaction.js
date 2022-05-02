const fs = require("fs");

const results = JSON.parse(fs.readFileSync("./lhci_reports/manifest.json"));

let comments = "";

results.forEach((result) => {
  const { summary, url, jsonPath } = result;
  const details = JSON.parse(fs.readFileSync(jsonPath));
  const formatResult = (res) => Math.round(res * 100);

  const { audits } = details;

  Object.keys(summary).forEach(
    (key) => (summary[key] = formatResult(summary[key]))
  );
  const score = (res) => (res >= 90 ? "🟢" : res >= 50 ? "🟠" : "🔴");
  const comment = [
    `⚡️ [Lighthouse report](${url}) for the changes in this PR:`,
    "| Category | Score |",
    "| --- | --- |",
    `| ${score(summary.performance)} Performance | ${summary.performance} |`,
    `| ${score(summary.accessibility)} Accessibility | ${
      summary.accessibility
    } |`,
    `| ${score(summary["best-practices"])} Best practices | ${
      summary["best-practices"]
    } |`,
    `| ${score(summary.seo)} SEO | ${summary.seo} |`,
    `| ${score(summary.pwa)} PWA | ${summary.pwa} |`,
    " ",
  ].join("\n");
  const detail = [
    `⚡️ Detail`,
    "| Category | Score |",
    "| --- | --- |",
    `| First Contentful Pain | ${audits["first-contentful-paint"].displayValue} |`,
    `| Time to Interactive | ${audits.interactive.displayValue} |`,
    `| SpeedIndex | ${audits["speed-index"].displayValue} |`,
    `| Total Blocking Time | ${audits["total-blocking-time"].displayValue} |`,
    `| Largest Contentful Pain | ${audits["largest-contentful-paint"].displayValue} |`,
    `| Cumulative Layout Shift | ${audits["cumulative-layout-shift"].displayValue} |`,
    " ",
  ].join("\n");
  comments += comment + "\n" + detail + "\n";
});

console.log(comments);
