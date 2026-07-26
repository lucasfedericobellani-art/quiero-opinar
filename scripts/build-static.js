const fs = require("fs");
const path = require("path");

const outputDir = path.join(process.cwd(), "public");
const files = [
  "index.html",
  "admin.html",
  "panel.html",
  "app.js",
  "admin.js",
  "analytics.js",
  "styles.css",
  "site-config.js",
  "firebase-config.js",
  "robots.txt",
  "sitemap.xml"
];
const directories = ["assets"];

function copyFile(file) {
  const target = path.join(outputDir, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(path.join(process.cwd(), file), target);
}

function copyDirectory(directory) {
  const source = path.join(process.cwd(), directory);
  const target = path.join(outputDir, directory);
  fs.cpSync(source, target, { recursive: true });
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

files.forEach(copyFile);
directories.forEach(copyDirectory);

console.log("static build verification ok");
