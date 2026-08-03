const projectId = "quiero-opinar-app";
const baseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;
const start = new Date("2026-07-01T00:00:00-03:00");
const end = new Date("2026-08-01T00:00:00-03:00");

function decodeValue(value) {
  if (!value || typeof value !== "object") return null;
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return Number(value.doubleValue);
  if ("booleanValue" in value) return Boolean(value.booleanValue);
  if ("timestampValue" in value) return value.timestampValue;
  if ("nullValue" in value) return null;
  if ("arrayValue" in value) return (value.arrayValue.values || []).map(decodeValue);
  if ("mapValue" in value) return decodeFields(value.mapValue.fields || {});
  return null;
}

function decodeFields(fields) {
  return Object.fromEntries(Object.entries(fields || {}).map(([key, value]) => [key, decodeValue(value)]));
}

async function fetchCollection(name) {
  const items = [];
  let pageToken = "";
  do {
    const url = new URL(`${baseUrl}/${name}`);
    url.searchParams.set("pageSize", "300");
    if (pageToken) url.searchParams.set("pageToken", pageToken);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${name} fetch failed: ${response.status} ${await response.text()}`);
    }
    const data = await response.json();
    items.push(...(data.documents || []).map((doc) => ({
      id: doc.name.split("/").pop(),
      ...decodeFields(doc.fields || {})
    })));
    pageToken = data.nextPageToken || "";
  } while (pageToken);
  return items;
}

function toDate(value) {
  const date = new Date(value || 0);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isInMonth(value) {
  const date = toDate(value);
  return Boolean(date && date >= start && date < end);
}

function dateKey(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

function hourKey(date) {
  return new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    hour: "2-digit",
    hour12: false
  }).format(date);
}

function topEntry(map) {
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1])[0] || [null, 0];
}

function truncate(value, max = 110) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max).trim()}...` : text;
}

function normalizeReply(reply) {
  return {
    ...reply,
    createdAtDate: toDate(reply?.createdAt),
    text: String(reply?.text || ""),
    likes: Number(reply?.likes || 0),
    dislikes: Number(reply?.dislikes || 0),
    reports: Number(reply?.reports || 0),
    moderationStatus: reply?.moderationStatus || "approved"
  };
}

async function main() {
  const [opinions, rawTopics] = await Promise.all([
    fetchCollection("opinions"),
    fetchCollection("topics")
  ]);
  const topics = new Map(rawTopics.map((topic) => [topic.id, topic]));
  const monthOpinions = opinions.filter((opinion) => isInMonth(opinion.createdAt));
  const monthReplies = monthOpinions.flatMap((opinion) => {
    return (Array.isArray(opinion.replies) ? opinion.replies : [])
      .map(normalizeReply)
      .filter((reply) => reply.createdAtDate && reply.createdAtDate >= start && reply.createdAtDate < end)
      .map((reply) => ({ ...reply, opinionId: opinion.id, opinionText: opinion.text, topic: opinion.topic }));
  });

  const opinionsByDay = new Map();
  const opinionsByHour = new Map();
  const topicStats = new Map();
  let opinionReports = 0;
  let replyReports = 0;
  let hiddenOpinions = 0;
  let hiddenReplies = 0;
  let blockedByAi = 0;
  let totalViews = 0;
  let totalLikes = 0;
  let totalShares = 0;
  let totalOpinionCharacters = 0;

  monthOpinions.forEach((opinion) => {
    const createdAt = toDate(opinion.createdAt);
    if (createdAt) {
      const day = dateKey(createdAt);
      const hour = hourKey(createdAt);
      opinionsByDay.set(day, (opinionsByDay.get(day) || 0) + 1);
      opinionsByHour.set(hour, (opinionsByHour.get(hour) || 0) + 1);
    }

    const topicId = opinion.topic || "actualidad";
    const current = topicStats.get(topicId) || { opinions: 0, replies: 0, views: 0, likes: 0, shares: 0 };
    current.opinions += 1;
    current.replies += Array.isArray(opinion.replies) ? opinion.replies.length : 0;
    current.views += Number(opinion.views || 0);
    current.likes += Number(opinion.likes || 0);
    current.shares += Number(opinion.shares || 0);
    topicStats.set(topicId, current);

    opinionReports += Number(opinion.reports || 0);
    hiddenOpinions += opinion.hidden || opinion.moderationStatus === "hidden" || opinion.moderationStatus === "deleted" ? 1 : 0;
    blockedByAi += opinion.moderationReason ? 1 : 0;
    totalViews += Number(opinion.views || 0);
    totalLikes += Number(opinion.likes || 0);
    totalShares += Number(opinion.shares || 0);
    totalOpinionCharacters += String(opinion.text || "").length;
  });

  monthReplies.forEach((reply) => {
    replyReports += Number(reply.reports || 0);
    hiddenReplies += reply.moderationStatus === "hidden" || reply.moderationStatus === "deleted" ? 1 : 0;
    blockedByAi += reply.moderationStatus === "pending" ? 1 : 0;
  });

  const opinionsWithReplies = monthOpinions.filter((opinion) => {
    return (Array.isArray(opinion.replies) ? opinion.replies : []).some((reply) => isInMonth(reply.createdAt));
  });
  const [bestDay, bestDayCount] = topEntry(opinionsByDay);
  const [peakHour, peakHourCount] = topEntry(opinionsByHour);
  const topRepliesOpinion = monthOpinions
    .map((opinion) => ({
      id: opinion.id,
      publicNumber: Number(opinion.publicNumber || 0),
      text: opinion.text,
      replies: Array.isArray(opinion.replies) ? opinion.replies.length : 0
    }))
    .sort((a, b) => b.replies - a.replies)[0] || null;
  const topViewedOpinion = monthOpinions
    .map((opinion) => ({
      id: opinion.id,
      publicNumber: Number(opinion.publicNumber || 0),
      text: opinion.text,
      views: Number(opinion.views || 0)
    }))
    .sort((a, b) => b.views - a.views)[0] || null;
  const topLikedOpinion = monthOpinions
    .map((opinion) => ({
      id: opinion.id,
      publicNumber: Number(opinion.publicNumber || 0),
      text: opinion.text,
      likes: Number(opinion.likes || 0)
    }))
    .sort((a, b) => b.likes - a.likes)[0] || null;
  const longestReply = monthReplies.slice().sort((a, b) => b.text.length - a.text.length)[0] || null;
  const replyCharacters = monthReplies.reduce((total, reply) => total + reply.text.length, 0);
  const topTopics = Array.from(topicStats.entries())
    .map(([id, stats]) => ({
      id,
      name: topics.get(id)?.name || id,
      ...stats,
      interaction: stats.replies + stats.likes + stats.shares
    }))
    .sort((a, b) => b.opinions - a.opinions);
  const topResponseTopic = topTopics.slice().sort((a, b) => b.replies - a.replies)[0] || null;
  const topInteractionTopic = topTopics.slice().sort((a, b) => b.interaction - a.interaction)[0] || null;

  console.log(JSON.stringify({
    period: "2026-07",
    totalOpinions: monthOpinions.length,
    averageOpinionsPerDay: Number((monthOpinions.length / 31).toFixed(2)),
    bestDay,
    bestDayCount,
    peakHour,
    peakHourCount,
    totalReplies: monthReplies.length,
    conversationRate: monthOpinions.length ? Number((monthReplies.length / monthOpinions.length).toFixed(2)) : 0,
    repliesPerOpinion: monthOpinions.length ? Number((monthReplies.length / monthOpinions.length).toFixed(2)) : 0,
    opinionsWithoutReplies: monthOpinions.length - opinionsWithReplies.length,
    opinionsWithReplies: opinionsWithReplies.length,
    percentOpinionsAnswered: monthOpinions.length ? Number(((opinionsWithReplies.length / monthOpinions.length) * 100).toFixed(1)) : 0,
    longestReplyLength: longestReply?.text.length || 0,
    longestReplyText: truncate(longestReply?.text),
    averageReplyLength: monthReplies.length ? Number((replyCharacters / monthReplies.length).toFixed(1)) : 0,
    totalCharacters: totalOpinionCharacters + replyCharacters,
    topicCount: topTopics.length,
    topTopics: topTopics.slice(0, 10),
    topResponseTopic,
    topInteractionTopic,
    opinionWithMostReplies: topRepliesOpinion ? { ...topRepliesOpinion, text: truncate(topRepliesOpinion.text) } : null,
    opinionWithMostViews: topViewedOpinion ? { ...topViewedOpinion, text: truncate(topViewedOpinion.text) } : null,
    opinionWithMostLikes: topLikedOpinion ? { ...topLikedOpinion, text: truncate(topLikedOpinion.text) } : null,
    totalViews,
    totalLikes,
    totalShares,
    totalReports: opinionReports + replyReports,
    opinionReports,
    replyReports,
    hiddenOpinions,
    hiddenReplies,
    blockedByAi
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
