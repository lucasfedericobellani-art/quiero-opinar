const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");

function assertIncludes(source, needle, label) {
  if (!source.includes(needle)) {
    throw new Error(`Missing ${label}: ${needle}`);
  }
}

assertIncludes(app, "const initialOpinionLoadLimit = 50;", "initial Firestore load limit");
assertIncludes(app, "const opinionPageLoadSize = 30;", "paged Firestore load size");
assertIncludes(app, "limitQuery(initialOpinionLoadLimit)", "limited realtime subscription");
assertIncludes(app, "startAfter(lastVisibleOpinionSnapshot)", "Firestore pagination cursor");
assertIncludes(app, "appendLoadMoreOpinionsButton(feedList)", "feed load more affordance");
assertIncludes(app, "appendLoadMoreOpinionsButton(topicDetailList)", "topic load more affordance");
assertIncludes(app, "async getOpinionByRouteId(routeId)", "route opinion fallback");
assertIncludes(app, "where(\"publicNumber\", \"==\", Number(normalizedRouteId))", "public number fallback lookup");
assertIncludes(app, "void openInitialOpinionFromUrl();", "async route opinion bootstrap");
assertIncludes(app, "async function submitSearch(value, sourceInput)", "async search submit");
assertIncludes(app, "getSearchRouteLookupCandidate(searchQuery)", "search exact-number lookup");
assertIncludes(app, "Buscando opinion...", "search loading state");
assertIncludes(index, "app.js?v=20260727-load-performance", "app cache bust");
assertIncludes(index, "styles.css?v=20260727-load-performance", "style cache bust");

console.log("load-performance regression checks passed");
