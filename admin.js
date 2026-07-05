const loginView = document.querySelector("#loginView");
const adminView = document.querySelector("#adminView");
const loginForm = document.querySelector("#adminLoginForm");
const loginError = document.querySelector("#loginError");
const adminSummary = document.querySelector("#adminSummary");
const adminOpinionList = document.querySelector("#adminOpinionList");
const adminSearchForm = document.querySelector("#adminSearchForm");
const adminSearchInput = document.querySelector("#adminSearchInput");
const moderationTabButton = document.querySelector("#moderationTabButton");
const analyticsTabButton = document.querySelector("#analyticsTabButton");
const moderationPanel = document.querySelector("#moderationPanel");
const analyticsPanel = document.querySelector("#analyticsPanel");
const analyticsDateRange = document.querySelector("#analyticsDateRange");
const analyticsDateFrom = document.querySelector("#analyticsDateFrom");
const analyticsDateTo = document.querySelector("#analyticsDateTo");
const analyticsTopicFilter = document.querySelector("#analyticsTopicFilter");
const analyticsTypeFilter = document.querySelector("#analyticsTypeFilter");
const analyticsKpis = document.querySelector("#analyticsKpis");
const analyticsCharts = document.querySelector("#analyticsCharts");
const analyticsTables = document.querySelector("#analyticsTables");
const analyticsAlerts = document.querySelector("#analyticsAlerts");
const logoutButton = document.querySelector("#logoutButton");
const refreshButton = document.querySelector("#refreshButton");

const adminEmails = (window.QO_ADMIN_EMAILS || []).map((email) => email.toLowerCase());

let auth = null;
let db = null;
let opinions = [];
let adminSearchQuery = "";
let activeAdminPanel = "moderation";
let unsubscribeOpinions = null;

function showLogin(message = "") {
  loginView.classList.remove("hidden");
  adminView.classList.add("hidden");
  loginError.textContent = message;
}

function showAdmin() {
  loginView.classList.add("hidden");
  adminView.classList.remove("hidden");
  loginError.textContent = "";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeDateValue(value) {
  if (value?.toDate) return value.toDate().toISOString();
  if (typeof value === "string") return value;
  return new Date().toISOString();
}

function normalizeOpinion(opinion) {
  return {
    id: opinion.id || "",
    author: opinion.author || "Opinion",
    topic: opinion.topic || "sin-tema",
    text: opinion.text || "",
    views: Number(opinion.views || 0),
    likes: Number(opinion.likes || 0),
    createdAt: normalizeDateValue(opinion.createdAt),
    replies: Array.isArray(opinion.replies) ? opinion.replies : [],
    hidden: Boolean(opinion.hidden),
    ip: opinion.ip || "",
    deleted: Boolean(opinion.deleted),
    reports: Number(opinion.reports || 0),
    shares: Number(opinion.shares || 0)
  };
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getOpinionNumberMap() {
  const ordered = opinions.slice().sort((a, b) => {
    const dateDiff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (dateDiff !== 0) return dateDiff;
    return a.id.localeCompare(b.id);
  });

  return new Map(ordered.map((opinion, index) => [opinion.id, index + 1]));
}

function getFilteredOpinions() {
  const query = adminSearchQuery.trim();
  if (!query) {
    return activeAdminPanel === "moderation"
      ? opinions.slice().sort((a, b) => b.reports - a.reports)
      : opinions;
  }

  const numberMap = getOpinionNumberMap();
  const normalizedQuery = normalizeText(query).replace(/^opinion\s*#?\s*/, "").trim();
  const exactNumber = normalizedQuery.match(/^#?(\d+)$/)?.[1] || "";
  const terms = normalizedQuery.split(/[^a-z0-9.:-]+/).filter(Boolean);

  return opinions.filter((opinion) => {
    const opinionNumber = String(numberMap.get(opinion.id) || "");
    if (exactNumber && opinionNumber === exactNumber) return true;

    const repliesText = opinion.replies.map((reply) => {
      return typeof reply === "string" ? reply : reply?.text || "";
    }).join(" ");
    const haystack = normalizeText([
      `opinion #${opinionNumber}`,
      opinion.author,
      opinion.topic,
      opinion.text,
      opinion.ip,
      repliesText
    ].join(" "));

    if (!terms.length) return haystack.includes(normalizedQuery);
    return terms.every((term) => haystack.includes(term));
  });
}

function renderAdminList() {
  const visibleOpinions = getFilteredOpinions();
  const numberMap = getOpinionNumberMap();

  if (!visibleOpinions.length) {
    adminOpinionList.innerHTML = opinions.length
      ? '<p class="admin-empty">No se encontraron opiniones con esa búsqueda.</p>'
      : '<p class="admin-empty">No hay opiniones para moderar.</p>';
    return;
  }

  adminOpinionList.innerHTML = visibleOpinions.map((opinion) => `
    <article class="admin-opinion-card${opinion.reports > 0 ? " has-reports" : ""}">
      <div class="admin-opinion-head">
        <div>
          <p class="section-label">${escapeHtml(opinion.topic)} · ${formatDate(opinion.createdAt)}</p>
          <h3>Opinión #${numberMap.get(opinion.id) || 0}</h3>
        </div>
        <div class="admin-actions">
          <button class="ghost-button" type="button" data-action="toggle-hidden" data-id="${escapeHtml(opinion.id)}">${opinion.hidden ? "Mostrar" : "Ocultar"}</button>
          <button class="ghost-button danger-button" type="button" data-action="delete" data-id="${escapeHtml(opinion.id)}">Eliminar</button>
        </div>
      </div>
      <p class="admin-opinion-text">${escapeHtml(opinion.text)}</p>
      <div class="admin-meta">
        <span>${opinion.views} vistas</span>
        <span>${opinion.likes} likes</span>
        <span>${opinion.replies.length} respuestas</span>
        <span>${opinion.reports} reportes</span>
        <span>${opinion.shares} compartidas</span>
        <span>${opinion.hidden ? "Oculta" : "Visible"}</span>
        <span>IP: ${escapeHtml(opinion.ip || "No registrada")}</span>
      </div>
    </article>
  `).join("");
}

function renderSummary() {
  const hiddenCount = opinions.filter((opinion) => opinion.hidden).length;
  const reportedCount = opinions.filter((opinion) => opinion.reports > 0).length;
  const filteredCount = getFilteredOpinions().length;
  adminSummary.textContent = adminSearchQuery.trim()
    ? `${filteredCount} de ${opinions.length} opiniones encontradas - ${reportedCount} reportadas - ${hiddenCount} ocultas`
    : `${opinions.length} opiniones cargadas - ${reportedCount} reportadas - ${hiddenCount} ocultas`;
}

function setAdminPanel(panelName) {
  activeAdminPanel = panelName;
  moderationPanel.classList.toggle("hidden", panelName !== "moderation");
  analyticsPanel.classList.toggle("hidden", panelName !== "analytics");
  moderationTabButton.classList.toggle("active", panelName === "moderation");
  analyticsTabButton.classList.toggle("active", panelName === "analytics");
  if (panelName === "analytics") renderAnalytics();
}

function startOfDay(date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function endOfDay(date) {
  const next = new Date(date);
  next.setHours(23, 59, 59, 999);
  return next;
}

function formatDateInput(date) {
  return date.toISOString().slice(0, 10);
}

function getDateRange() {
  const now = new Date();
  let from = startOfDay(now);
  let to = endOfDay(now);

  if (analyticsDateRange.value === "yesterday") {
    from = startOfDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1));
    to = endOfDay(from);
  }

  if (analyticsDateRange.value === "7d") from = startOfDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6));
  if (analyticsDateRange.value === "30d") from = startOfDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29));
  if (analyticsDateRange.value === "90d") from = startOfDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 89));

  if (analyticsDateRange.value === "month") {
    from = startOfDay(new Date(now.getFullYear(), now.getMonth(), 1));
  }

  if (analyticsDateRange.value === "previousMonth") {
    from = startOfDay(new Date(now.getFullYear(), now.getMonth() - 1, 1));
    to = endOfDay(new Date(now.getFullYear(), now.getMonth(), 0));
  }

  if (analyticsDateRange.value === "year") {
    from = startOfDay(new Date(now.getFullYear(), 0, 1));
  }

  if (analyticsDateRange.value === "custom") {
    from = analyticsDateFrom.value ? startOfDay(new Date(`${analyticsDateFrom.value}T00:00:00`)) : new Date(0);
    to = analyticsDateTo.value ? endOfDay(new Date(`${analyticsDateTo.value}T00:00:00`)) : endOfDay(now);
  }

  return { from, to };
}

function getOpinionEvents() {
  return opinions.map((opinion) => ({
    type: "opinion",
    id: opinion.id,
    opinion,
    text: opinion.text,
    topic: opinion.topic,
    createdAt: new Date(opinion.createdAt),
    likes: opinion.likes,
    views: opinion.views,
    ip: opinion.ip
  }));
}

function getReplyEvents() {
  return opinions.flatMap((opinion) => {
    return opinion.replies.map((reply, index) => {
      const normalizedReply = typeof reply === "string" ? { text: reply, createdAt: opinion.createdAt, likes: 0 } : reply;
      return {
        type: "reply",
        id: normalizedReply.id || `${opinion.id}:${index}`,
        opinion,
        text: normalizedReply.text || "",
        topic: opinion.topic,
        createdAt: new Date(normalizedReply.createdAt || opinion.createdAt),
        likes: Number(normalizedReply.likes || 0),
        views: 0,
        ip: opinion.ip
      };
    });
  });
}

function getAnalyticsEvents() {
  const { from, to } = getDateRange();
  const type = analyticsTypeFilter.value;
  const topic = analyticsTopicFilter.value;
  const source = [
    ...(type !== "replies" ? getOpinionEvents() : []),
    ...(type !== "opinions" ? getReplyEvents() : [])
  ];

  return source.filter((event) => {
    if (Number.isNaN(event.createdAt.getTime())) return false;
    if (event.createdAt < from || event.createdAt > to) return false;
    if (topic !== "all" && event.topic !== topic) return false;
    return true;
  });
}

function getFilteredAnalyticsOpinions() {
  const { from, to } = getDateRange();
  const topic = analyticsTopicFilter.value;
  return opinions.filter((opinion) => {
    const createdAt = new Date(opinion.createdAt);
    if (createdAt < from || createdAt > to) return false;
    if (topic !== "all" && opinion.topic !== topic) return false;
    return true;
  });
}

function uniqueCount(values) {
  return new Set(values.filter(Boolean)).size;
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function formatNumber(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return "Sin datos";
  return new Intl.NumberFormat("es-AR", { maximumFractionDigits: 1 }).format(value);
}

function getDaysInRange() {
  const { from, to } = getDateRange();
  return Math.max(1, Math.ceil((to - from + 1) / 86400000));
}

function getFirstReplyHours(opinion) {
  if (!opinion.replies.length) return null;
  const createdAt = new Date(opinion.createdAt).getTime();
  const replyTimes = opinion.replies
    .map((reply) => new Date(typeof reply === "string" ? opinion.createdAt : reply.createdAt || opinion.createdAt).getTime())
    .filter((value) => !Number.isNaN(value))
    .sort((a, b) => a - b);
  if (!replyTimes.length) return null;
  return Math.max(0, (replyTimes[0] - createdAt) / 3600000);
}

function getAnalyticsStats() {
  const events = getAnalyticsEvents();
  const filteredOpinions = getFilteredAnalyticsOpinions();
  const opinionEvents = events.filter((event) => event.type === "opinion");
  const replyEvents = events.filter((event) => event.type === "reply");
  const days = getDaysInRange();
  const totalLikes = events.reduce((total, event) => total + event.likes, 0);
  const totalViews = filteredOpinions.reduce((total, opinion) => total + opinion.views, 0);
  const firstReplyHours = filteredOpinions.map(getFirstReplyHours).filter((value) => value !== null);
  const totalInteractions = totalLikes + replyEvents.length;

  return {
    events,
    filteredOpinions,
    opinionEvents,
    replyEvents,
    totalLikes,
    totalViews,
    totalInteractions,
    days,
    uniqueUsers: uniqueCount(filteredOpinions.map((opinion) => opinion.ip || opinion.id)),
    hiddenCount: filteredOpinions.filter((opinion) => opinion.hidden).length,
    deletedCount: filteredOpinions.filter((opinion) => opinion.deleted).length,
    reportCount: filteredOpinions.reduce((total, opinion) => total + opinion.reports, 0),
    shareCount: filteredOpinions.reduce((total, opinion) => total + opinion.shares, 0),
    firstReplyAverage: average(firstReplyHours)
  };
}

function getPreviousPeriodStats(currentStats) {
  const { from, to } = getDateRange();
  const duration = to - from + 1;
  const previousFrom = new Date(from.getTime() - duration);
  const previousTo = new Date(from.getTime() - 1);
  const topic = analyticsTopicFilter.value;
  const previousOpinions = opinions.filter((opinion) => {
    const createdAt = new Date(opinion.createdAt);
    if (createdAt < previousFrom || createdAt > previousTo) return false;
    if (topic !== "all" && opinion.topic !== topic) return false;
    return true;
  });
  const previousCount = previousOpinions.length;
  const currentCount = currentStats.opinionEvents.length;
  const variation = previousCount ? ((currentCount - previousCount) / previousCount) * 100 : (currentCount ? 100 : 0);
  return { previousCount, variation };
}

function kpiCard(label, value, detail = "") {
  return `
    <article class="analytics-kpi">
      <span>${label}</span>
      <strong>${value}</strong>
      ${detail ? `<small>${detail}</small>` : ""}
    </article>
  `;
}

function groupBy(events, keyGetter) {
  const map = new Map();
  events.forEach((event) => {
    const key = keyGetter(event);
    map.set(key, (map.get(key) || 0) + 1);
  });
  return Array.from(map.entries()).map(([label, value]) => ({ label, value }));
}

function renderBarChart(title, rows) {
  const max = Math.max(1, ...rows.map((row) => row.value));
  const body = rows.length ? rows.map((row) => `
    <div class="analytics-bar-row">
      <span>${escapeHtml(row.label)}</span>
      <div><i style="width:${Math.max(4, (row.value / max) * 100)}%"></i></div>
      <strong>${formatNumber(row.value)}</strong>
    </div>
  `).join("") : '<p class="admin-empty">Sin datos para este filtro.</p>';

  return `<article class="analytics-card"><h3>${title}</h3>${body}</article>`;
}

function renderDonut(title, rows) {
  const total = rows.reduce((sum, row) => sum + row.value, 0);
  const first = rows[0]?.value || 0;
  const percentage = total ? Math.round((first / total) * 100) : 0;
  const list = rows.map((row) => `<span>${escapeHtml(row.label)}: ${formatNumber(row.value)}</span>`).join("");
  return `
    <article class="analytics-card analytics-donut-card">
      <h3>${title}</h3>
      <div class="analytics-donut" style="--value:${percentage}"><strong>${percentage}%</strong></div>
      <div class="analytics-legend">${list || '<span>Sin datos</span>'}</div>
    </article>
  `;
}

function renderTable(title, rows, columns) {
  const head = columns.map((column) => `<th>${column.label}</th>`).join("");
  const body = rows.length ? rows.map((row) => `
    <tr>${columns.map((column) => `<td>${escapeHtml(column.value(row))}</td>`).join("")}</tr>
  `).join("") : `<tr><td colspan="${columns.length}">Sin datos para este filtro.</td></tr>`;
  return `
    <article class="analytics-card analytics-table-card">
      <h3>${title}</h3>
      <div class="analytics-table-wrap">
        <table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>
      </div>
    </article>
  `;
}

function updateTopicFilter() {
  const currentValue = analyticsTopicFilter.value || "all";
  const topics = Array.from(new Set(opinions.map((opinion) => opinion.topic || "sin-tema"))).sort();
  analyticsTopicFilter.innerHTML = '<option value="all">Todos</option>' + topics.map((topic) => {
    return `<option value="${escapeHtml(topic)}">${escapeHtml(topic)}</option>`;
  }).join("");
  analyticsTopicFilter.value = topics.includes(currentValue) ? currentValue : "all";
}

function renderAnalytics() {
  updateTopicFilter();
  const stats = getAnalyticsStats();
  const previous = getPreviousPeriodStats(stats);
  const opinionsPerDay = stats.opinionEvents.length / stats.days;
  const opinionsPerHour = stats.opinionEvents.length / Math.max(1, stats.days * 24);
  const interactionRate = stats.totalViews ? (stats.totalInteractions / stats.totalViews) * 100 : 0;
  const topicsCreated = uniqueCount(stats.filteredOpinions.map((opinion) => opinion.topic));

  analyticsKpis.innerHTML = [
    kpiCard("Total de opiniones", formatNumber(stats.opinionEvents.length)),
    kpiCard("Respuestas totales", formatNumber(stats.replyEvents.length)),
    kpiCard("Usuarios únicos", formatNumber(stats.uniqueUsers), "por IP disponible"),
    kpiCard("Visitas totales", formatNumber(stats.totalViews)),
    kpiCard("Visitantes únicos", formatNumber(stats.uniqueUsers), "estimado por IP"),
    kpiCard("Opiniones por día", formatNumber(opinionsPerDay)),
    kpiCard("Promedio por hora", formatNumber(opinionsPerHour)),
    kpiCard("Likes totales", formatNumber(stats.totalLikes)),
    kpiCard("Likes promedio", formatNumber(average(stats.opinionEvents.map((event) => event.likes)))),
    kpiCard("Tasa de interacción", `${formatNumber(interactionRate)}%`),
    kpiCard("Respuestas por opinión", formatNumber(stats.replyEvents.length / Math.max(1, stats.opinionEvents.length))),
    kpiCard("Primera respuesta", stats.firstReplyAverage ? `${formatNumber(stats.firstReplyAverage)} h` : "Sin datos"),
    kpiCard("Permanencia promedio", "Sin tracking"),
    kpiCard("Bounce Rate", "Sin tracking"),
    kpiCard("Opiniones eliminadas", formatNumber(stats.deletedCount)),
    kpiCard("Opiniones reportadas", formatNumber(stats.reportCount)),
    kpiCard("Temas creados", formatNumber(topicsCreated)),
    kpiCard("Búsquedas realizadas", "Sin tracking"),
    kpiCard("Opiniones compartidas", formatNumber(stats.shareCount)),
    kpiCard("Variación vs período anterior", `${formatNumber(previous.variation)}%`, `${previous.previousCount} opiniones previas`),
    kpiCard("Proyección mensual", formatNumber(opinionsPerDay * 30))
  ].join("");

  const byDay = groupBy(stats.events, (event) => event.createdAt.toLocaleDateString("es-AR")).slice(-14);
  const byHour = groupBy(stats.events, (event) => `${event.createdAt.getHours().toString().padStart(2, "0")}:00`);
  const topTopics = groupBy(stats.events, (event) => event.topic).sort((a, b) => b.value - a.value).slice(0, 20);
  const deviceRows = [{ label: "Mobile", value: 0 }, { label: "Desktop", value: 0 }, { label: "Tablet", value: 0 }];
  analyticsCharts.innerHTML = [
    renderBarChart("Visitas / actividad por día", byDay),
    renderBarChart("Actividad por hora", byHour),
    renderBarChart("Top 20 temas", topTopics),
    renderDonut("Dispositivos", deviceRows)
  ].join("");

  const numberMap = getOpinionNumberMap();
  const tableColumns = [
    { label: "#", value: (opinion) => `Opinión #${numberMap.get(opinion.id) || 0}` },
    { label: "Tema", value: (opinion) => opinion.topic },
    { label: "Texto", value: (opinion) => opinion.text.slice(0, 90) },
    { label: "Vistas", value: (opinion) => String(opinion.views) },
    { label: "Likes", value: (opinion) => String(opinion.likes) },
    { label: "Respuestas", value: (opinion) => String(opinion.replies.length) }
  ];
  const mostViewed = stats.filteredOpinions.slice().sort((a, b) => b.views - a.views).slice(0, 10);
  const mostLiked = stats.filteredOpinions.slice().sort((a, b) => b.likes - a.likes).slice(0, 10);
  const mostReplied = stats.filteredOpinions.slice().sort((a, b) => b.replies.length - a.replies.length).slice(0, 10);
  const reported = stats.filteredOpinions.filter((opinion) => opinion.reports > 0).sort((a, b) => b.reports - a.reports).slice(0, 10);
  analyticsTables.innerHTML = [
    renderTable("Opiniones más vistas", mostViewed, tableColumns),
    renderTable("Opiniones más likeadas", mostLiked, tableColumns),
    renderTable("Opiniones más respondidas", mostReplied, tableColumns),
    renderTable("Opiniones reportadas", reported, [...tableColumns, { label: "Reportes", value: (opinion) => String(opinion.reports) }])
  ].join("");

  const alerts = [];
  mostViewed.filter((opinion) => opinion.views >= 100).slice(0, 3).forEach((opinion) => alerts.push(`Opinión #${numberMap.get(opinion.id)} puede estar volviéndose viral.`));
  topTopics.filter((topic) => topic.value >= 10).slice(0, 3).forEach((topic) => alerts.push(`El tema ${topic.label} está creciendo rápido.`));
  if (stats.reportCount >= 5) alerts.push("Hay muchos reportes acumulados en el período.");
  if (!stats.events.length) alerts.push("Se detecta caída de actividad para el filtro seleccionado.");
  analyticsAlerts.innerHTML = renderBarChart("Alertas", alerts.map((label) => ({ label, value: 1 })));
}

function getExportRows() {
  const numberMap = getOpinionNumberMap();
  return getFilteredAnalyticsOpinions().map((opinion) => {
    const createdAt = new Date(opinion.createdAt);
    return {
      Fecha: createdAt.toLocaleDateString("es-AR"),
      Hora: createdAt.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
      "ID de opinión": opinion.id,
      "Número": `Opinión #${numberMap.get(opinion.id) || 0}`,
      Tema: opinion.topic,
      Hashtag: "",
      Texto: opinion.text,
      Likes: opinion.likes,
      Respuestas: opinion.replies.length,
      Visitas: opinion.views,
      Reportes: opinion.reports,
      Estado: opinion.hidden ? "Oculta" : "Visible",
      Ciudad: "",
      País: "",
      Dispositivo: "",
      Navegador: "",
      "Sistema operativo": "",
      IP: opinion.ip || ""
    };
  });
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function toCsv(rows) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const escapeCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  return [
    headers.map(escapeCell).join(","),
    ...rows.map((row) => headers.map((header) => escapeCell(row[header])).join(","))
  ].join("\n");
}

function exportAnalytics(format) {
  const rows = getExportRows();
  const csv = toCsv(rows);
  if (format === "csv") {
    downloadFile("quiero-opinar-analytics.csv", csv, "text/csv;charset=utf-8");
    return;
  }

  if (format === "excel") {
    downloadFile("quiero-opinar-analytics.xls", csv, "application/vnd.ms-excel;charset=utf-8");
    return;
  }

  const printableRows = rows.slice(0, 250);
  const html = `
    <html>
      <head><title>Quiero Opinar Analytics</title></head>
      <body>
        <h1>Quiero Opinar Analytics</h1>
        <pre>${escapeHtml(JSON.stringify(printableRows, null, 2))}</pre>
      </body>
    </html>
  `;
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

function userIsAllowedAdmin(user) {
  return Boolean(user?.email && adminEmails.includes(user.email.toLowerCase()));
}

async function startOpinionSubscription(firestoreModule) {
  if (unsubscribeOpinions) unsubscribeOpinions();

  const { collection, onSnapshot, orderBy, query } = firestoreModule;
  unsubscribeOpinions = onSnapshot(
    query(collection(db, "opinions"), orderBy("createdAt", "desc")),
    (snapshot) => {
      opinions = snapshot.docs.map((item) => normalizeOpinion({ id: item.id, ...item.data() }));
      renderSummary();
      renderAdminList();
      if (activeAdminPanel === "analytics") renderAnalytics();
    },
    (error) => {
      adminSummary.textContent = "No se pudieron cargar las opiniones.";
      console.error("Error cargando opiniones.", error);
    }
  );
}

async function initializeAdmin() {
  const config = window.QO_FIREBASE_CONFIG;
  if (!config?.apiKey || !config?.projectId) {
    showLogin("Falta configurar Firebase.");
    return;
  }

  const [{ initializeApp }, authModule, firestoreModule] = await Promise.all([
    import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"),
    import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js")
  ]);

  const app = initializeApp(config);
  auth = authModule.getAuth(app);
  db = firestoreModule.getFirestore(app);

  authModule.onAuthStateChanged(auth, async (user) => {
    if (!user) {
      if (unsubscribeOpinions) unsubscribeOpinions();
      showLogin();
      return;
    }

    if (!userIsAllowedAdmin(user)) {
      await authModule.signOut(auth);
      showLogin("Ese email no está habilitado como administrador.");
      return;
    }

    showAdmin();
    await startOpinionSubscription(firestoreModule);
  });

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.querySelector("#adminEmail").value.trim().toLowerCase();
    const password = document.querySelector("#adminPassword").value;

    if (!adminEmails.includes(email)) {
      showLogin("Ese email no está habilitado como administrador.");
      return;
    }

    try {
      await authModule.signInWithEmailAndPassword(auth, email, password);
      loginForm.reset();
    } catch (error) {
      console.error("Error de login admin.", error);
      showLogin("Credenciales inválidas o proveedor de email/password no habilitado.");
    }
  });

  logoutButton.addEventListener("click", async () => {
    await authModule.signOut(auth);
  });

  refreshButton.addEventListener("click", () => {
    renderSummary();
    renderAdminList();
    if (activeAdminPanel === "analytics") renderAnalytics();
  });

  moderationTabButton.addEventListener("click", () => setAdminPanel("moderation"));
  analyticsTabButton.addEventListener("click", () => setAdminPanel("analytics"));

  [analyticsDateRange, analyticsDateFrom, analyticsDateTo, analyticsTopicFilter, analyticsTypeFilter].forEach((input) => {
    input.addEventListener("change", renderAnalytics);
    input.addEventListener("input", renderAnalytics);
  });

  analyticsDateRange.addEventListener("change", () => {
    const { from, to } = getDateRange();
    analyticsDateFrom.value = formatDateInput(from);
    analyticsDateTo.value = formatDateInput(to);
  });

  document.querySelectorAll("[data-export]").forEach((button) => {
    button.addEventListener("click", () => exportAnalytics(button.dataset.export));
  });

  adminSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  adminSearchInput.addEventListener("input", () => {
    adminSearchQuery = adminSearchInput.value;
    renderSummary();
    renderAdminList();
  });

  adminOpinionList.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const opinionId = button.getAttribute("data-id");
    const action = button.getAttribute("data-action");
    const opinion = opinions.find((item) => item.id === opinionId);
    if (!opinion) return;

    const { deleteDoc, doc, updateDoc } = firestoreModule;
    button.disabled = true;

    try {
      if (action === "toggle-hidden") {
        await updateDoc(doc(db, "opinions", opinionId), { hidden: !opinion.hidden });
      }

      if (action === "delete" && window.confirm("Eliminar esta opinión de forma permanente?")) {
        await deleteDoc(doc(db, "opinions", opinionId));
      }
    } catch (error) {
      console.error("No se pudo moderar la opinión.", error);
      window.alert("No se pudo aplicar la acción. Revisar permisos de administrador.");
    } finally {
      button.disabled = false;
    }
  });
}

initializeAdmin().catch((error) => {
  console.error("No se pudo iniciar el panel admin.", error);
  showLogin("No se pudo iniciar el panel de administrador.");
});
