const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const api = fs.readFileSync(path.join(root, "api", "moderation.js"), "utf8");

function assertIncludes(source, needle, label) {
  if (!source.includes(needle)) {
    throw new Error(`Missing ${label}: ${needle}`);
  }
}

assertIncludes(app, "let activeReplyComposerState = createReplyComposerState();", "central composer state");
assertIncludes(app, "function createReplyComposerState", "composer state factory");
assertIncludes(app, "function applyReplyComposerState", "composer state renderer");
assertIncludes(app, "const quote = normalizeQuoteRecord(composerState.quote);", "submit reads centralized quote");
assertIncludes(app, "createQuotePayload(\"reply\", normalizedReply.id, normalizedReply.text)", "reply quote payload");
assertIncludes(app, "createQuotePayload(\"opinion\", opinion.id, opinion.text)", "opinion quote payload");
assertIncludes(app, "quotedContentId: quotedSourceId", "frontend stable quote id alias");
assertIncludes(app, "quotedTextSnapshot: quotedText", "frontend quote text snapshot");

assertIncludes(api, "quotedContentId: quotedSourceId", "backend stable quote id alias");
assertIncludes(api, "quotedContentType: quotedSourceType", "backend stable quote type alias");
assertIncludes(api, "quotedTextSnapshot: quotedText", "backend quote snapshot");
assertIncludes(api, "quotedContentId: quote?.quotedContentId || null", "backend legacy-safe sanitized id");
assertIncludes(api, "quotedContentType: quote?.quotedContentType || null", "backend legacy-safe sanitized type");
assertIncludes(api, "quotedTextSnapshot: quote?.quotedTextSnapshot || null", "backend legacy-safe sanitized snapshot");

console.log("quote-flow regression checks passed");
