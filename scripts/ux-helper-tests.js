const assert = require("assert");

const MIN_DISPLAYED_ACTIVITY = 13;
const QUOTE_MIN_LENGTH = 8;
const QUOTE_MAX_LENGTH = 280;

function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function normalizeQuoteText(value) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, QUOTE_MAX_LENGTH);
}

function sourceContainsQuote(sourceText, quoteText, minLength = QUOTE_MIN_LENGTH) {
  const source = normalizeText(sourceText).replace(/\s+/g, " ");
  const quote = normalizeText(quoteText).replace(/\s+/g, " ");
  return quote.length >= minLength && source.includes(quote);
}

function createQuotePayload(sourceType, sourceId, sourceText, selectedText = "") {
  const fallbackText = normalizeQuoteText(sourceText);
  const selectedQuote = normalizeQuoteText(selectedText);
  const quoteText = selectedQuote || fallbackText.slice(0, QUOTE_MAX_LENGTH).trim();
  const minLength = selectedQuote ? QUOTE_MIN_LENGTH : 1;
  if (!sourceContainsQuote(sourceText, quoteText, minLength)) return null;
  return {
    quotedText: quoteText,
    quotedSourceId: sourceId,
    quotedSourceType: sourceType === "reply" ? "reply" : "opinion"
  };
}

function getDisplayedActiveUsers(realActivity, previousValue = MIN_DISPLAYED_ACTIVITY) {
  const safeActivity = Number.isFinite(realActivity) ? Math.max(0, realActivity) : 0;
  const baseValue = Math.max(MIN_DISPLAYED_ACTIVITY, safeActivity + 12);
  const maxStep = safeActivity > previousValue ? 6 : 3;
  if (!Number.isFinite(previousValue)) return baseValue;
  if (Math.abs(baseValue - previousValue) <= maxStep) return baseValue;
  return previousValue + Math.sign(baseValue - previousValue) * maxStep;
}

function getActivityIndicatorText(value, isMobile = false) {
  return `${value}${isMobile ? "" : " personas"} opinando ahora`;
}

function getHotTopicScore(topicStats, now, windowHours = 6) {
  const recentWindowStart = now - windowHours * 60 * 60 * 1000;
  const recentOpinionCount = topicStats.opinions.filter((opinion) => opinion.createdAt >= recentWindowStart).length;
  const recentReplyCount = topicStats.opinions.reduce((total, opinion) => {
    return total + opinion.replies.filter((reply) => reply.createdAt >= recentWindowStart).length;
  }, 0);
  const totalActivity = Math.max(1, topicStats.opinionCount + topicStats.replyCount);
  const velocity = (recentOpinionCount * 2.4 + recentReplyCount * 1.4) / Math.sqrt(totalActivity);
  const freshness = topicStats.lastActivityTime >= recentWindowStart ? 2 : 0;
  return Number((velocity + freshness).toFixed(2));
}

function run() {
  assert.strictEqual(getDisplayedActiveUsers(0, 13), 13, "activity never drops below 13");
  assert.strictEqual(getDisplayedActiveUsers(1, 13), 13, "low activity remains stable at 13");
  assert.strictEqual(getDisplayedActiveUsers(13, 13), 16, "activity above floor rises smoothly");
  assert.strictEqual(getDisplayedActiveUsers(80, 13), 19, "large jumps are smoothed");
  assert.strictEqual(getDisplayedActiveUsers(Number.NaN, 16), 13, "missing activity returns toward floor");
  assert.strictEqual(getActivityIndicatorText(13), "13 personas opinando ahora", "desktop activity wording is exact");
  assert.strictEqual(getActivityIndicatorText(13, true), "13 opinando ahora", "mobile activity wording is compact");
  assert(!getActivityIndicatorText(13).includes("participando"), "activity wording never says participando");

  const now = Date.now();
  const hot = getHotTopicScore({
    opinions: [
      { createdAt: now - 2000, replies: [{ createdAt: now - 1000 }, { createdAt: now - 3000 }] },
      { createdAt: now - 5000, replies: [] }
    ],
    opinionCount: 2,
    replyCount: 2,
    lastActivityTime: now - 1000
  }, now);
  const historic = getHotTopicScore({
    opinions: Array.from({ length: 100 }, () => ({ createdAt: now - 48 * 60 * 60 * 1000, replies: [] })),
    opinionCount: 100,
    replyCount: 0,
    lastActivityTime: now - 48 * 60 * 60 * 1000
  }, now);
  assert(hot > 4, "recent growth crosses hot threshold");
  assert(historic < 4, "historic-only volume is not hot");

  assert(sourceContainsQuote("La universidad debería ser paga.", "universidad debería"), "quote supports accents");
  assert(!sourceContainsQuote("Texto original", "fragmento inventado"), "manipulated quote is rejected");
  assert(!sourceContainsQuote("Texto original", "corto"), "short quote is rejected");
  assert.deepStrictEqual(createQuotePayload("reply", "r1", "hjola"), {
    quotedText: "hjola",
    quotedSourceId: "r1",
    quotedSourceType: "reply"
  }, "quote button supports short replies");
  assert.strictEqual(createQuotePayload("reply", "r1", "hjola", "hjo"), null, "short manual selections are still rejected");
  assert.strictEqual(normalizeQuoteText(`  ${"a".repeat(400)}  `).length, QUOTE_MAX_LENGTH, "quote is truncated");

  console.log("ux helper tests ok");
}

run();
