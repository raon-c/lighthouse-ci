const fs = require("fs");

const results = JSON.parse(fs.readFileSync("./lhci_reports/manifest.json"));

let comments = "";

results.forEach((result) => {
  console.log(result);
  const summary = result.summary;
  const url = result.url;
  const formatResult = (res) => Math.round(res * 100);
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
  comments += comment + "\n";
});

console.log(comments);
