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
    `⚡️ Lighthouse report! ${url} score in this PR:`,
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
    "| Category | Score |",
    "| --- | --- |",
    `| ${score(
      audits["first-contentful-paint"].score * 100
    )} First Contentful Pain | ${
      audits["first-contentful-paint"].displayValue
    } |`,
    `| ${score(audits.interactive.score * 100)} Time to Interactive | ${
      audits.interactive.displayValue
    } |`,
    `| ${score(audits["speed-index"].score * 100)} SpeedIndex | ${
      audits["speed-index"].displayValue
    } |`,
    `| ${score(
      audits["total-blocking-time"].score * 100
    )} Total Blocking Time | ${audits["total-blocking-time"].displayValue} |`,
    `| ${score(
      audits["largest-contentful-paint"].score * 100
    )} Largest Contentful Pain | ${
      audits["largest-contentful-paint"].displayValue
    } |`,
    `| ${score(
      audits["cumulative-layout-shift"].score * 100
    )} Cumulative Layout Shift | ${
      audits["cumulative-layout-shift"].displayValue
    } |`,
  ].join("\n");
  const detail = [`⚡️ Detail`, " "].join("\n");
  comments += comment + detail + "\n";
});

console.log(comments);
