const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const admin = fs.readFileSync(path.join(root, "admin.html"), "utf8");
const serviceWorker = fs.readFileSync(path.join(root, "service-worker.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");

function assertIncludes(source, needle, label) {
  if (!source.includes(needle)) {
    throw new Error(`Missing ${label}: ${needle}`);
  }
}

assertIncludes(app, "const initialOpinionLoadLimit = 35;", "initial Firestore load limit");
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
assertIncludes(app, "function isResolvingSelectedOpinionRoute()", "detail route loading guard");
assertIncludes(app, "createOpinionSkeletonCard(\"Cargando opinión\")", "detail route skeleton loading state");
assertIncludes(app, "Cargando opinión | Quiero Opinar", "detail route loading metadata");
assertIncludes(styles, "grid-template-columns: minmax(0, 1fr) auto;", "mobile opinion meta grid");
assertIncludes(styles, "grid-column: 1 / -1;", "mobile topic full row");
assertIncludes(index, "app.js?v=20260804-conspiraciones-topic", "app cache bust");
assertIncludes(serviceWorker, "const CACHE_NAME = \"quiero-opinar-pwa-v19\";", "service worker cache bust");
assertIncludes(serviceWorker, "/styles.css?v=20260803-opinion-meta-mobile", "service worker style cache bust");
assertIncludes(serviceWorker, "/app.js?v=20260804-conspiraciones-topic", "service worker app cache bust");
assertIncludes(index, "styles.css?v=20260803-opinion-meta-mobile", "style cache bust");
assertIncludes(admin, "admin.js?v=20260730-admin-action-menu", "admin cache bust");

console.log("load-performance regression checks passed");
