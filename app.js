let topics = [
  { id: "todos", name: "Todos", description: "Feed general", icon: "assets/icons/todos.svg" },
  { id: "sin-tema", name: "Sin tema específico", description: "Opiniones libres", icon: "assets/icons/sin-tema.svg" },
  { id: "historia", name: "Quiero contar una historia", description: "Relatos personales", icon: "assets/icons/historia.svg" },
  { id: "economia", name: "Economía", description: "Precios, trabajo y empresas", icon: "assets/icons/economia.svg" },
  { id: "agro", name: "Agro", description: "Campo, producción rural y sector agropecuario", icon: "assets/icons/agro.svg" },
  { id: "politica", name: "Política", description: "Gobierno, partidos y debate público", icon: "assets/icons/politica.svg" },
  { id: "seguridad", name: "Seguridad", description: "Ciudad, justicia y prevención", icon: "assets/icons/seguridad.svg" },
  { id: "cine", name: "Cine", description: "Películas, series y cultura visual", icon: "assets/icons/cine.svg" },
  { id: "tecnologia", name: "Tecnología", description: "Internet, IA y productos digitales", icon: "assets/icons/tecnologia.svg" },
  { id: "deportes", name: "Deportes", description: "Clubes, torneos y pasiones", icon: "assets/icons/deportes.svg" },
  { id: "autos", name: "Autos", description: "Modelos, rutas, mecánica y mercado", icon: "assets/icons/autos.svg" },
  { id: "formula-1", name: "Fórmula 1", description: "Pilotos, carreras, equipos y estrategia", icon: "assets/icons/formula-1.svg" },
  { id: "videojuegos", name: "Videojuegos", description: "Juegos, consolas, PC y cultura gamer", icon: "assets/icons/videojuegos.svg" }
];

const topicRules = [
  { id: "formula-1", words: ["formula 1", "f1", "ferrari", "red bull", "mercedes", "mclaren", "verstappen", "hamilton", "leclerc", "colapinto", "piloto", "carrera", "gran premio", "pit stop"] },
  { id: "videojuegos", words: ["videojuego", "videojuegos", "juego", "gaming", "gamer", "playstation", "xbox", "nintendo", "steam", "pc gamer", "fortnite", "minecraft", "gta", "fifa", "valorant"] },
  { id: "autos", words: ["auto", "autos", "coche", "camioneta", "motor", "mecanico", "mecánica", "nafta", "diesel", "concesionaria", "toyota", "ford", "fiat", "chevrolet", "volkswagen"] },
  { id: "agro", words: ["agro", "campo", "rural", "agricultura", "ganaderia", "grano", "granos", "soja", "maiz", "trigo", "cosecha", "siembra", "tambo", "estancia", "chacra", "productor agropecuario", "sector agropecuario"] },
  { id: "economia", words: ["economia", "precio", "precios", "inflacion", "dolar", "sueldo", "trabajo", "empresa", "impuesto", "alquiler", "tarifa", "mercado"] },
  { id: "politica", words: ["politica", "gobierno", "presidente", "diputado", "senado", "partido", "eleccion", "voto", "ministro", "congreso", "estado"] },
  { id: "seguridad", words: ["seguridad", "robo", "delito", "policia", "justicia", "barrio", "calle", "violencia", "denuncia", "prevención"] },
  { id: "cine", words: ["cine", "pelicula", "peliculas", "serie", "series", "actor", "actriz", "director", "netflix", "streaming", "documental"] },
  { id: "tecnologia", words: ["tecnologia", "internet", "ia", "inteligencia artificial", "app", "software", "celular", "celulares", "celu", "celus", "telefono", "telefonos", "smartphone", "smartphones", "movil", "moviles", "samsung", "galaxy", "iphone", "apple", "android", "xiaomi", "motorola", "moto g", "huawei", "notebook", "notebooks", "computadora", "computadoras", "pc", "tablet", "redes", "wifi", "programacion", "datos"] },
  { id: "deportes", words: ["deporte", "deportes", "futbol", "basquet", "tenis", "club", "torneo", "partido", "seleccion", "gol", "cancha"] },
  { id: "historia", words: ["historia", "me paso", "me ocurrio", "cuento", "relato", "experiencia", "anecdota", "vivencia"] }
];

const seedOpinions = [];

const trendingWindowHours = 6;
const trendingRefreshHours = 12;
const trendingTopicLimit = 5;
const maxOpinionLength = 5000;
const maxTopicLength = 80;
const blockedLinkPattern = /(?:https?:\/\/|www\.|[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}|(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/|\b))/i;

let opinions = [];
const resetStorageKey = "quiero-opinar:reset-2026-07-03";

const welcomeOverlay = document.querySelector("#welcomeOverlay");
const welcomeStepOne = document.querySelector("#welcomeStepOne");
const welcomeStepTwo = document.querySelector("#welcomeStepTwo");
const nextWelcomeButton = document.querySelector("#nextWelcomeButton");
const enterButton = document.querySelector("#enterButton");
const opinionForm = document.querySelector("#opinionForm");
const opinionText = document.querySelector("#opinionText");
const topicIdea = document.querySelector("#topicIdea");
const composerPanel = document.querySelector(".composer-panel");
const floatingOpinion = document.querySelector("#floatingOpinion");
const floatingOpinionTrigger = document.querySelector("#floatingOpinionTrigger");
const floatingOpinionClose = document.querySelector("#floatingOpinionClose");
const floatingOpinionForm = document.querySelector("#floatingOpinionForm");
const floatingOpinionText = document.querySelector("#floatingOpinionText");
const floatingTopicIdea = document.querySelector("#floatingTopicIdea");
const opinionFormError = document.querySelector("#opinionFormError");
const floatingOpinionError = document.querySelector("#floatingOpinionError");
const topicList = document.querySelector("#topicList");
const feedList = document.querySelector("#feedList");
const opinionTemplate = document.querySelector("#opinionTemplate");
const activeTopicPill = document.querySelector("#activeTopicPill");
const searchInputs = document.querySelectorAll(".search-input");
const legalOverlay = document.querySelector("#legalOverlay");
const legalOpenButton = document.querySelector("#legalOpenButton");
const legalCloseButton = document.querySelector("#legalCloseButton");
const legalTriggers = document.querySelectorAll(".legal-trigger");
const homeView = document.querySelector("#homeView");
const aboutView = document.querySelector("#aboutView");
const topicsView = document.querySelector("#topicsView");
const topicDetailView = document.querySelector("#topicDetailView");
const detailView = document.querySelector("#detailView");
const searchView = document.querySelector("#searchView");
const aboutNavButton = document.querySelector("#aboutNavButton");
const topicsNavButton = document.querySelector("#topicsNavButton");
const mobileMenuToggle = document.querySelector("#mobileMenuToggle");
const topNav = document.querySelector("#topNav");
const aboutTopicsButton = document.querySelector("#aboutTopicsButton");
const boardGrid = document.querySelector("#boardGrid");
const topicSearchInput = document.querySelector("#topicSearchInput");
const topicDetailIcon = document.querySelector("#topicDetailIcon");
const topicDetailTitle = document.querySelector("#topicDetailTitle");
const topicDetailDescription = document.querySelector("#topicDetailDescription");
const topicDetailList = document.querySelector("#topicDetailList");
const detailShell = document.querySelector("#detailShell");
const searchTitle = document.querySelector("#searchTitle");
const searchDescription = document.querySelector("#searchDescription");
const searchResultsList = document.querySelector("#searchResultsList");
const discoveryGrid = document.querySelector("#discoveryGrid");
const backFromDetailButton = document.querySelector("#backFromDetailButton");
const backFromTopicButton = document.querySelector("#backFromTopicButton");
const homeButtons = document.querySelectorAll(".nav-home");
const notificationStack = document.querySelector("#notificationStack");
const reportNotice = document.querySelector("#reportNotice");
const reportNoticeClose = document.querySelector("#reportNoticeClose");
const mobileViewportQuery = window.matchMedia("(max-width: 980px)");

let activeTopic = "todos";
let currentView = "home";
let lastViewBeforeDetail = "home";
let selectedOpinionId = null;
let selectedTopicId = null;
let searchQuery = "";
let isMainComposerVisible = true;
let isFloatingOpinionOpen = false;
let isMobileMenuOpen = false;
let isPublishingOpinion = false;
let hasLoadedOpinions = false;
let hasHandledInitialOpinion = false;
let dataStore = createLocalDataStore();

nextWelcomeButton.addEventListener("click", () => {
  welcomeStepOne.classList.add("hidden");
  welcomeStepTwo.classList.remove("hidden");
  enterButton.focus();
});

enterButton.addEventListener("click", () => {
  welcomeOverlay.classList.add("hidden");
  if (isMobileViewport()) {
    floatingOpinionTrigger.focus();
  } else {
    opinionText.focus();
  }
});

legalOpenButton.addEventListener("click", () => {
  closeMobileMenu(false);
  legalOverlay.classList.remove("hidden");
  legalCloseButton.focus();
});

legalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    legalOverlay.classList.remove("hidden");
    legalCloseButton.focus();
  });
});

legalCloseButton.addEventListener("click", closeLegalModal);

legalOverlay.addEventListener("click", (event) => {
  if (event.target === legalOverlay) closeLegalModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (!legalOverlay.classList.contains("hidden")) {
    closeLegalModal();
    return;
  }

  if (isFloatingOpinionOpen) closeFloatingOpinionPanel();
  if (isMobileMenuOpen) closeMobileMenu();
});

topicsNavButton.addEventListener("click", () => {
  showView("topics");
  closeMobileMenu(false);
});

aboutNavButton.addEventListener("click", () => {
  showView("about");
  closeMobileMenu(false);
});

aboutTopicsButton.addEventListener("click", () => showView("topics"));

homeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    goHome();
    closeMobileMenu(false);
  });
});

reportNoticeClose?.addEventListener("click", hideReportNotice);

backFromDetailButton.addEventListener("click", () => showView(lastViewBeforeDetail));
backFromTopicButton.addEventListener("click", () => showView("topics"));
topicSearchInput.addEventListener("input", renderBoard);
searchInputs.forEach((input) => {
  input.addEventListener("input", () => syncSearchInputs(input.value));
  input.form?.addEventListener("submit", (event) => {
    event.preventDefault();
    submitSearch(input.value, input);
  });
});

mobileMenuToggle.addEventListener("click", () => {
  setMobileMenuOpen(!isMobileMenuOpen);
});

document.addEventListener("click", (event) => {
  if (!isMobileMenuOpen) return;
  if (topNav.contains(event.target) || mobileMenuToggle.contains(event.target)) return;
  closeMobileMenu(false);
});

if (mobileViewportQuery.addEventListener) {
  mobileViewportQuery.addEventListener("change", updateFloatingOpinionVisibility);
} else {
  mobileViewportQuery.addListener(updateFloatingOpinionVisibility);
}

floatingOpinionTrigger.addEventListener("click", () => {
  if (isFloatingOpinionOpen) {
    closeFloatingOpinionPanel();
    return;
  }

  openFloatingOpinionPanel();
});

floatingOpinionClose.addEventListener("click", () => closeFloatingOpinionPanel());

document.addEventListener("click", (event) => {
  if (!isFloatingOpinionOpen) return;
  if (floatingOpinion.contains(event.target) || floatingOpinionTrigger.contains(event.target)) return;
  closeFloatingOpinionPanel(false);
});

opinionForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await publishOpinion(opinionText.value, topicIdea.value, opinionForm);
});

floatingOpinionForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!canPublishOpinion(floatingOpinionText.value, floatingTopicIdea.value, floatingOpinionForm)) return;
  closeFloatingOpinionPanel(false);
  await publishOpinion(floatingOpinionText.value, floatingTopicIdea.value, floatingOpinionForm);
});

floatingOpinionForm.querySelector('button[type="submit"]')?.addEventListener("pointerdown", (event) => {
  if (!isMobileViewport()) return;
  event.preventDefault();
  if (isPublishingOpinion) return;
  if (!canPublishOpinion(floatingOpinionText.value, floatingTopicIdea.value, floatingOpinionForm)) return;
  closeFloatingOpinionPanel(false);
  floatingOpinionForm.requestSubmit();
});

function closeLegalModal() {
  legalOverlay.classList.add("hidden");
  legalOpenButton.focus();
}

function setMobileMenuOpen(isOpen) {
  isMobileMenuOpen = isOpen;
  topNav.classList.toggle("is-open", isOpen);
  mobileMenuToggle.classList.toggle("is-open", isOpen);
  mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  mobileMenuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
}

function closeMobileMenu(restoreFocus = true) {
  if (!isMobileMenuOpen) return;

  setMobileMenuOpen(false);
  if (restoreFocus) mobileMenuToggle.focus();
}

function createAnonymousId() {
  return "Opinion";
}

function createId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `opinion-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function createPastDate(minutesAgo) {
  return new Date(Date.now() - minutesAgo * 60 * 1000).toISOString();
}

function createReply(text, likes = 0, createdAt = new Date().toISOString(), reports = 0) {
  return {
    id: createId(),
    author: "Opinion",
    text,
    likes,
    reports,
    createdAt,
    liked: false
  };
}

function getReplyLikes(reply) {
  return typeof reply === "string" ? 0 : reply.likes;
}

function getReplyViews(reply) {
  return typeof reply === "string" ? 0 : Number(reply.views || 0);
}

function getTopic(topicId) {
  return topics.find((topic) => topic.id === topicId);
}

function getTopicName(topicId) {
  return getTopic(topicId)?.name ?? "General";
}

function getVisibleTopics() {
  return topics.filter((topic) => topic.id !== "todos");
}

function getVisibleOpinions() {
  return opinions.filter((opinion) => !opinion.hidden);
}

function getOpinionById(opinionId) {
  return opinions.find((item) => item.id === opinionId);
}

function getTopicOpinions(topicId) {
  const visibleOpinions = getVisibleOpinions();
  if (topicId === "todos") return visibleOpinions;
  return visibleOpinions.filter((opinion) => opinion.topic === topicId);
}

function getTopicScore(topicId) {
  return getTopicOpinions(topicId).reduce((score, opinion) => {
    const replyLikes = opinion.replies.reduce((total, reply) => total + getReplyLikes(reply), 0);
    return score + opinion.views + opinion.likes * 3 + opinion.replies.length * 8 + replyLikes * 2;
  }, 0);
}

function getTopicViewTotal(topicId) {
  return getTopicOpinions(topicId).reduce((total, opinion) => {
    const replyViews = opinion.replies.reduce((replyTotal, reply) => replyTotal + getReplyViews(reply), 0);
    return total + Number(opinion.views || 0) + replyViews;
  }, 0);
}

function getRecentTopicActivity() {
  const now = Date.now();
  const windowStart = now - trendingWindowHours * 60 * 60 * 1000;
  const counts = new Map();

  getVisibleOpinions().forEach((opinion) => {
    const createdAt = new Date(opinion.createdAt).getTime();
    let recentActivityCount = Number.isNaN(createdAt) || createdAt < windowStart ? 0 : 1;

    opinion.replies.forEach((reply) => {
      const replyCreatedAt = new Date(reply.createdAt).getTime();
      if (!Number.isNaN(replyCreatedAt) && replyCreatedAt >= windowStart) {
        recentActivityCount += 1;
      }
    });

    if (recentActivityCount > 0) {
      counts.set(opinion.topic, (counts.get(opinion.topic) || 0) + recentActivityCount);
    }
  });

  return getVisibleTopics()
    .map((topic) => ({
      ...topic,
      recentCount: counts.get(topic.id) || 0,
      totalViews: getTopicViewTotal(topic.id)
    }))
    .filter((topic) => topic.recentCount > 0)
    .sort((a, b) => {
      if (b.recentCount !== a.recentCount) return b.recentCount - a.recentCount;
      if (b.totalViews !== a.totalViews) return b.totalViews - a.totalViews;
      return a.name.localeCompare(b.name);
    })
    .slice(0, trendingTopicLimit);
}

function getContributionNumberMap() {
  const entries = [];

  getVisibleOpinions().forEach((opinion) => {
    entries.push({
      key: `opinion:${opinion.id}`,
      createdAt: opinion.createdAt,
      fallback: opinion.id
    });

    opinion.replies.forEach((reply, index) => {
      entries.push({
        key: `reply:${opinion.id}:${reply.id || index}`,
        createdAt: reply.createdAt,
        fallback: `${opinion.id}:${reply.id || index}`
      });
    });
  });

  entries.sort((a, b) => {
    const dateDiff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (dateDiff !== 0) return dateDiff;
    return a.fallback.localeCompare(b.fallback);
  });

  return new Map(entries.map((entry, index) => [entry.key, index + 1]));
}

function getContributionLabel(key) {
  const number = getContributionNumberMap().get(key);
  return `Opinión #${number || 0}`;
}

function getOpinionAuthorLabel(opinion) {
  return getContributionLabel(`opinion:${opinion.id}`);
}

function getOpinionNumber(opinion) {
  const label = getOpinionAuthorLabel(opinion);
  const match = label.match(/\d+/);
  return match ? match[0] : "";
}

function getReplyAuthorLabel(opinion, reply, index) {
  return getContributionLabel(`reply:${opinion.id}:${reply.id || index}`);
}

function resolveSelectedTopic(topicPrompt, text) {
  const prompt = topicPrompt.trim();
  const detectedFromPrompt = detectTopic(prompt);
  if (detectedFromPrompt.score > 0) return detectedFromPrompt.id;

  const detectedFromText = detectTopic(text);
  if (detectedFromText.score > 0) return detectedFromText.id;

  if (prompt) return findOrCreateTopic(prompt);
  return "sin-tema";
}

function detectTopic(text) {
  const normalized = normalizeText(text);
  let winner = { id: "sin-tema", score: 0 };

  topicRules.forEach((rule) => {
    const score = rule.words.reduce((total, word) => {
      return matchesTopicWord(normalized, word) ? total + 1 : total;
    }, 0);

    if (score > winner.score) winner = { id: rule.id, score };
  });

  return winner;
}

function matchesTopicWord(normalizedText, word) {
  const normalizedWord = normalizeText(word);
  if (!normalizedWord) return false;

  if (normalizedWord.includes(" ")) {
    return normalizedText.includes(normalizedWord);
  }

  return normalizedText.split(/[^a-z0-9]+/).includes(normalizedWord);
}

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function findOrCreateTopic(topicPrompt) {
  const name = formatTopicName(topicPrompt);
  const existingTopic = getVisibleTopics().find((topic) => {
    return normalizeText(topic.name) === normalizeText(name);
  });

  if (existingTopic) return existingTopic.id;

  const id = createTopicId(name);
  topics.push({
    id,
    name,
    description: "Tema creado por la comunidad",
    icon: "assets/icons/generic.svg"
  });

  return id;
}

function createTopicId(name) {
  const base = normalizeText(name)
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-") || "tema";

  let id = base;
  let suffix = 2;
  while (topics.some((topic) => topic.id === id)) {
    id = `${base}-${suffix}`;
    suffix += 1;
  }

  return id;
}

function formatTopicName(value) {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 42)
    .split(" ")
    .map((word) => {
      const lower = word.toLowerCase();
      if (["f1", "ia", "pc", "tv"].includes(lower)) return lower.toUpperCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function goHome() {
  activeTopic = "todos";
  showView("home");
  render();
}

function syncSearchInputs(value) {
  searchInputs.forEach((input) => {
    if (input.value !== value) input.value = value;
  });
}

function submitSearch(value, sourceInput) {
  searchQuery = value.trim();
  syncSearchInputs(searchQuery);
  sourceInput?.blur();
  renderSearchResults();
  showView("search");
}

function containsBlockedLink(value) {
  return blockedLinkPattern.test(value);
}

function getFormErrorElement(form) {
  if (form === floatingOpinionForm) return floatingOpinionError;
  if (form === opinionForm) return opinionFormError;
  return null;
}

function showFormError(form, message) {
  const error = getFormErrorElement(form);
  if (!error) return;
  error.textContent = message;
  error.classList.remove("hidden");
}

function clearFormError(form) {
  const error = getFormErrorElement(form);
  if (!error) return;
  error.textContent = "";
  error.classList.add("hidden");
}

function canPublishOpinion(rawText, rawTopic, form) {
  const text = rawText.trim();
  const topic = rawTopic.trim();
  clearFormError(form);
  if (!text) return false;
  if (text.length > maxOpinionLength) {
    showFormError(form, "La opinion es demasiado larga.");
    return false;
  }
  if (topic.length > maxTopicLength) {
    showFormError(form, "El tema es demasiado largo.");
    return false;
  }
  if (containsBlockedLink(text) || containsBlockedLink(topic)) {
    showFormError(form, "No se pueden publicar links en opiniones ni respuestas.");
    return false;
  }
  return true;
}

async function publishOpinion(rawText, rawTopic, form) {
  if (isPublishingOpinion) return;

  const text = rawText.trim();
  const topic = rawTopic.trim();
  if (!canPublishOpinion(text, topic, form)) return;

  isPublishingOpinion = true;
  setPublishingState(form, true);
  if (form === floatingOpinionForm) closeFloatingOpinionPanel(false);

  try {
    const opinion = await createOpinionViaApi(text, topic);
    opinions.unshift(opinion);
    await dataStore.saveTopics(topics);
    form.reset();
    activeTopic = "todos";
    render();
    showView("home");
    showToast("Opinión publicada");
  } catch (error) {
    const message = getApiErrorMessage(error, "No se pudo publicar la opinion.");
    showFormError(form, message);
    showToast(message);
  } finally {
    isPublishingOpinion = false;
    setPublishingState(form, false);
  }
}

function setPublishingState(form, isPublishing) {
  const submitButton = form?.querySelector('button[type="submit"]');
  if (!submitButton) return;
  if (isPublishing) {
    submitButton.dataset.originalText = submitButton.textContent;
    submitButton.textContent = "Publicando...";
  } else if (submitButton.dataset.originalText) {
    submitButton.textContent = submitButton.dataset.originalText;
  }
  submitButton.disabled = isPublishing;
  form?.classList.toggle("is-publishing", isPublishing);
}

function showView(viewName) {
  currentView = viewName;
  homeView.classList.toggle("hidden", viewName !== "home");
  aboutView.classList.toggle("hidden", viewName !== "about");
  topicsView.classList.toggle("hidden", viewName !== "topics");
  topicDetailView.classList.toggle("hidden", viewName !== "topicDetail");
  detailView.classList.toggle("hidden", viewName !== "detail");
  searchView.classList.toggle("hidden", viewName !== "search");
  if (viewName === "home") isMainComposerVisible = true;
  closeMobileMenu(false);
  closeFloatingOpinionPanel(false);
  updateFloatingOpinionVisibility();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openFloatingOpinionPanel() {
  isFloatingOpinionOpen = true;
  updateViewportMetrics();
  updateFloatingOpinionVisibility();
  window.setTimeout(() => {
    try {
      floatingOpinionText.focus({ preventScroll: true });
    } catch {
      floatingOpinionText.focus();
    }
    updateViewportMetrics();
    floatingOpinion.scrollTop = 0;
  }, 160);
}

function closeFloatingOpinionPanel(restoreFocus = true) {
  if (!isFloatingOpinionOpen) {
    updateFloatingOpinionVisibility();
    return;
  }

  isFloatingOpinionOpen = false;
  updateFloatingOpinionVisibility();
  if (restoreFocus) floatingOpinionTrigger.focus();
}

function updateFloatingOpinionVisibility() {
  const shouldShowTrigger = isMobileViewport() || currentView !== "home" || !isMainComposerVisible || isFloatingOpinionOpen;
  document.body.classList.toggle("mobile-composer-open", isFloatingOpinionOpen && isMobileViewport());
  floatingOpinionTrigger.classList.toggle("is-visible", shouldShowTrigger);
  floatingOpinionTrigger.classList.toggle("is-open", isFloatingOpinionOpen);
  floatingOpinionTrigger.setAttribute("aria-expanded", String(isFloatingOpinionOpen));
  floatingOpinion.classList.toggle("is-open", isFloatingOpinionOpen);
  floatingOpinion.setAttribute("aria-hidden", String(!isFloatingOpinionOpen));
}

function updateViewportMetrics() {
  const viewport = window.visualViewport;
  const viewportHeight = viewport?.height || window.innerHeight;
  const keyboardOffset = viewport
    ? Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)
    : 0;

  document.documentElement.style.setProperty("--visual-viewport-height", `${viewportHeight}px`);
  document.documentElement.style.setProperty("--keyboard-offset", `${keyboardOffset}px`);
}

function isMobileViewport() {
  return mobileViewportQuery.matches;
}

function updateMainComposerVisibility() {
  if (!composerPanel) return;

  const rect = composerPanel.getBoundingClientRect();
  isMainComposerVisible = rect.bottom > 84 && rect.top < window.innerHeight - 84;
  updateFloatingOpinionVisibility();
}

function setupComposerVisibilityObserver() {
  if (!composerPanel) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      isMainComposerVisible = entry.isIntersecting && entry.intersectionRatio > 0.16;
      updateFloatingOpinionVisibility();
    }, { threshold: [0, 0.16, 0.5] });

    observer.observe(composerPanel);
    return;
  }

  window.addEventListener("scroll", updateMainComposerVisibility, { passive: true });
  window.addEventListener("resize", updateMainComposerVisibility);
  updateMainComposerVisibility();
}

function openTopic(topicId) {
  selectedTopicId = topicId;
  activeTopic = topicId;
  render();
  showView("topicDetail");
}

function openOpinion(opinionId) {
  const opinion = getOpinionById(opinionId);
  if (!opinion || opinion.hidden) return;

  lastViewBeforeDetail = currentView === "detail" ? lastViewBeforeDetail : currentView;
  selectedOpinionId = opinionId;
  window.history.replaceState(null, "", getOpinionPath(opinion));
  opinion.views += 1;
  dataStore.updateOpinion(opinion);
  render();
  showView("detail");
}

function getOpinionPath(opinion) {
  return `${window.location.pathname}?opinion=${encodeURIComponent(opinion.id)}`;
}

function getOpinionUrl(opinion) {
  return `${window.location.origin}${getOpinionPath(opinion)}`;
}

async function copyTextToClipboard(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.className = "clipboard-helper";
  document.body.append(input);
  input.select();
  document.execCommand("copy");
  input.remove();
}

function showToast(message) {
  if (!notificationStack) return;
  const toast = document.createElement("div");
  toast.className = "app-toast";
  toast.textContent = message;
  notificationStack.append(toast);

  window.setTimeout(() => {
    toast.classList.add("is-leaving");
    toast.addEventListener("animationend", () => toast.remove(), { once: true });
  }, 2400);
}

function getApiErrorMessage(error, fallback = "No se pudo completar la accion.") {
  if (!error) return fallback;
  if (error.remainingSeconds) {
    return `${error.message || "Espera unos segundos antes de volver a publicar."} Faltan ${error.remainingSeconds} s.`;
  }
  return error.message || fallback;
}

async function callModerationApi(payload) {
  const response = await fetch("/api/moderation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.ok === false) {
    const error = new Error(data.message || "No se pudo completar la accion.");
    error.status = response.status;
    error.code = data.code;
    error.remainingSeconds = data.remainingSeconds;
    throw error;
  }

  return data;
}

async function createOpinionViaApi(text, topic) {
  const selectedTopic = resolveSelectedTopic(topic, text);
  const topicRecord = getTopic(selectedTopic);
  const data = await callModerationApi({
    action: "createOpinion",
    text,
    topic: selectedTopic,
    topicText: topic,
    topicRecord: topicRecord && selectedTopic !== "todos" ? {
      id: topicRecord.id,
      name: topicRecord.name,
      description: topicRecord.description,
      icon: topicRecord.icon
    } : null
  });

  return normalizeOpinion(data.opinion);
}

async function createReplyViaApi(opinionId, text) {
  const data = await callModerationApi({
    action: "createReply",
    opinionId,
    text
  });

  return normalizeOpinion(data.opinion);
}

async function registerContentActionViaApi(action, contentType, contentId, opinionId) {
  const data = await callModerationApi({
    action,
    contentType,
    contentId,
    opinionId
  });

  const opinion = normalizeOpinion(data.opinion);
  if (action === "like" && contentType === "opinion") {
    opinion.liked = Boolean(data.active);
  }
  if (action === "like" && contentType === "reply") {
    const reply = opinion.replies.find((item) => item.id === contentId);
    if (reply) reply.liked = Boolean(data.active);
  }
  return { opinion, active: data.active };
}

function showReportNotice() {
  if (!reportNotice) return;
  reportNotice.classList.remove("hidden", "is-leaving");
  reportNotice.classList.add("is-visible");
}

function hideReportNotice() {
  if (!reportNotice || reportNotice.classList.contains("hidden")) return;
  reportNotice.classList.add("is-leaving");
  reportNotice.classList.remove("is-visible");
  window.setTimeout(() => {
    reportNotice.classList.add("hidden");
    reportNotice.classList.remove("is-leaving");
  }, 180);
}

function renderTopics() {
  topicList.innerHTML = "";

  const trendingTopics = getRecentTopicActivity();

  if (!trendingTopics.length) {
    const empty = document.createElement("p");
    empty.className = "topic-empty";
    empty.textContent = "No hay opiniones trending en las últimas 6 horas. Cuando se active una conversación, va a aparecer acá.";
    topicList.append(empty);
    return;
  }

  trendingTopics.forEach((topic) => {
    const button = document.createElement("button");
    button.className = `topic-button${activeTopic === topic.id ? " active" : ""}`;
    button.type = "button";
    button.setAttribute("aria-label", `Abrir tema ${topic.name}`);
    const content = document.createElement("span");
    content.className = "topic-button-content";
    const strong = document.createElement("strong");
    const name = document.createElement("span");
    name.className = "topic-button-name";
    name.textContent = topic.name;
    strong.append(name);
    content.append(strong);
    const count = document.createElement("span");
    count.className = "topic-count";
    count.setAttribute("aria-label", `${topic.totalViews} vistas totales`);
    count.textContent = `${topic.totalViews} vistas`;
    button.append(content, count);
    button.addEventListener("click", () => openTopic(topic.id));
    topicList.append(button);
  });
}

function setupViewportMetrics() {
  updateViewportMetrics();
  window.addEventListener("resize", updateViewportMetrics);

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", updateViewportMetrics);
    window.visualViewport.addEventListener("scroll", updateViewportMetrics);
  }
}

function renderBoard() {
  boardGrid.innerHTML = "";
  const query = normalizeText(topicSearchInput.value.trim());

  const visibleTopics = getVisibleTopics().filter((topic) => {
    if (!query) return true;
    return normalizeText(`${topic.name} ${topic.description}`).includes(query);
  });

  if (!visibleTopics.length) {
    const empty = document.createElement("p");
    empty.className = "opinion-card";
    empty.textContent = "No encontramos temas con esa búsqueda.";
    boardGrid.append(empty);
    return;
  }

  visibleTopics.forEach((topic) => {
    const topicOpinions = getTopicOpinions(topic.id)
      .slice()
      .sort((a, b) => {
        if (b.views !== a.views) return b.views - a.views;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    const replyCount = topicOpinions.reduce((total, opinion) => total + opinion.replies.length, 0);
    const lastActivity = getLastTopicActivity(topicOpinions);
    const hasRecentActivity = lastActivity && Date.now() - new Date(lastActivity).getTime() < 6 * 60 * 60 * 1000;

    const column = document.createElement("article");
    column.className = "board-column";
    column.tabIndex = 0;
    column.setAttribute("role", "button");
    column.setAttribute("aria-label", `Abrir tema ${topic.name}`);
    column.innerHTML = `
      <div class="board-column-header">
        <div>
          <h2>${getTopicIconMarkup(topic)}${escapeHtml(topic.name)}</h2>
          <p>${escapeHtml(topic.description)}</p>
        </div>
        <span class="board-count">${topicOpinions.length} hilos</span>
      </div>
      <div class="board-context">
        <span>${replyCount} respuestas</span>
        <span>${lastActivity ? `Última actividad ${formatDate(lastActivity)}` : "Listo para abrir debate"}</span>
        ${hasRecentActivity ? "<strong>Actividad reciente</strong>" : ""}
      </div>
      <div class="board-card-list"></div>
    `;
    column.addEventListener("click", () => openTopic(topic.id));
    column.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openTopic(topic.id);
      }
    });

    const list = column.querySelector(".board-card-list");
    if (!topicOpinions.length) {
      const empty = document.createElement("p");
      empty.textContent = "Podés abrir el primer hilo de este tema.";
      list.append(empty);
    }

    topicOpinions.slice(0, 3).forEach((opinion) => {
      const card = document.createElement("button");
      card.className = "board-card";
      card.type = "button";
      card.innerHTML = `
        <strong>${getTopicName(opinion.topic)}</strong>
        ${escapeHtml(truncateText(opinion.text, 130))}
        <span>${formatDate(opinion.createdAt)} - ${opinion.views} vistas - ${opinion.replies.length} respuestas - ${opinion.likes} me gusta</span>
      `;
      card.addEventListener("click", (event) => {
        event.stopPropagation();
        openOpinion(opinion.id);
      });
      list.append(card);
    });

    boardGrid.append(column);
  });
}

function renderFeed() {
  feedList.innerHTML = "";
  activeTopicPill.textContent = getTopicName(activeTopic);

  const filteredOpinions = getTopicOpinions(activeTopic);

  if (!hasLoadedOpinions) {
    const loading = document.createElement("p");
    loading.className = "opinion-card feed-loading";
    loading.textContent = "Cargando opiniones...";
    feedList.append(loading);
    return;
  }

  if (!filteredOpinions.length) {
    const empty = document.createElement("p");
    empty.className = "opinion-card";
    empty.textContent = "Todavía no hay opiniones en este tema. Podés abrir el primer hilo.";
    feedList.append(empty);
    return;
  }

  filteredOpinions.forEach((opinion) => {
    feedList.append(createOpinionCard(opinion, false));
  });
  renderDiscovery();
}

function getSearchResults(sourceOpinions, queryValue = searchQuery) {
  const query = queryValue.trim();
  if (!query) return sourceOpinions;

  const normalizedQuery = normalizeText(query).replace(/^opinion\s*#?\s*/, "").trim();
  const exactNumber = normalizedQuery.match(/^#?(\d+)$/)?.[1] || "";
  const terms = normalizedQuery.split(/[^a-z0-9]+/).filter(Boolean);

  return sourceOpinions.filter((opinion) => {
    const opinionNumber = getOpinionNumber(opinion);
    if (exactNumber && opinionNumber === exactNumber) return true;

    const haystack = normalizeText(`${getOpinionAuthorLabel(opinion)} ${getTopicName(opinion.topic)} ${opinion.text}`);
    if (!terms.length) return haystack.includes(normalizedQuery);
    return terms.every((term) => haystack.includes(term));
  });
}

function renderSearchResults() {
  searchResultsList.innerHTML = "";

  const query = searchQuery.trim();
  searchTitle.textContent = query ? `Resultados para "${query}"` : "Resultados";
  searchDescription.textContent = query
    ? "Opiniones relacionadas con tu búsqueda."
    : "Escribí un número de opinión o una palabra para buscar.";

  if (!query) {
    const empty = document.createElement("p");
    empty.className = "opinion-card";
    empty.textContent = "Escribí un número de opinión o una palabra para buscar.";
    searchResultsList.append(empty);
    return;
  }

  const results = getSearchResults(getVisibleOpinions(), query);

  if (!results.length) {
    const empty = document.createElement("p");
    empty.className = "opinion-card";
    empty.textContent = "No se encontraron opiniones relacionadas con esa búsqueda.";
    searchResultsList.append(empty);
    return;
  }

  results.forEach((opinion) => {
    searchResultsList.append(createOpinionCard(opinion, false));
  });
}

function renderTopicDetail() {
  topicDetailList.innerHTML = "";
  const topic = getTopic(selectedTopicId);

  if (!topic) {
    topicDetailIcon.innerHTML = getTopicIconMarkup({ name: "Tema", icon: "assets/icons/generic.svg" }, true);
    topicDetailTitle.textContent = "Tema";
    topicDetailDescription.textContent = "No se encontró este tema.";
    return;
  }

  topicDetailIcon.innerHTML = getTopicIconMarkup(topic, true);
  topicDetailTitle.textContent = topic.name;
  topicDetailDescription.textContent = topic.description;

  const topicOpinions = getTopicOpinions(topic.id);
  if (!topicOpinions.length) {
    const empty = document.createElement("p");
    empty.className = "opinion-card";
    empty.textContent = "Todavía no hay opiniones en este tema.";
    topicDetailList.append(empty);
    return;
  }

  topicOpinions.forEach((opinion) => {
    topicDetailList.append(createOpinionCard(opinion, false));
  });
}

function renderDetail() {
  detailShell.innerHTML = "";
  const opinion = getOpinionById(selectedOpinionId);

  if (!opinion || opinion.hidden) {
    const empty = document.createElement("p");
    empty.className = "opinion-card";
    empty.textContent = "No se encontró esta opinión.";
    detailShell.append(empty);
    return;
  }

  detailShell.append(createOpinionCard(opinion, true));
  const related = document.createElement("section");
  related.className = "detail-discovery discovery-panel";
  related.innerHTML = `
    <p class="section-label">También te puede interesar</p>
    <div class="discovery-grid"></div>
  `;
  detailShell.append(related);
  renderDiscovery(related.querySelector(".discovery-grid"));
}

function createOpinionCard(opinion, isDetail) {
  const card = opinionTemplate.content.firstElementChild.cloneNode(true);
  card.querySelector(".author").textContent = `Opinión #${getOpinionNumber(opinion)}`;
  card.querySelector(".topic").textContent = getTopicName(opinion.topic);
  card.querySelector(".date-stamp").textContent = formatDate(opinion.createdAt);
  card.querySelector(".opinion-text").textContent = opinion.text;
  card.querySelector(".views").textContent = `👁 ${opinion.views}`;
  card.querySelector(".replies").textContent = `💬 ${opinion.replies.length}`;
  card.querySelector(".likes").textContent = opinion.likes;
  const lifeLabel = getLifeLabel(opinion);
  const lifeLabelElement = card.querySelector(".life-label");
  if (lifeLabel) {
    lifeLabelElement.textContent = lifeLabel;
    lifeLabelElement.classList.remove("hidden");
  }

  const openButton = card.querySelector(".open-opinion");
  if (isDetail) {
    openButton.disabled = true;
  } else {
    openButton.addEventListener("click", () => openOpinion(opinion.id));
  }

  const likeButton = card.querySelector(".like-button");
  likeButton.classList.toggle("liked", opinion.liked);
  likeButton.addEventListener("click", async () => {
    try {
      const result = await registerContentActionViaApi("like", "opinion", opinion.id, opinion.id);
      Object.assign(opinion, result.opinion);
      render();
      showToast(result.active ? "Me gusta guardado" : "Me gusta quitado");
    } catch (error) {
      showToast(getApiErrorMessage(error, "No se pudo guardar el me gusta."));
    }
  });

  const shareButton = card.querySelector(".share-button");
  shareButton.addEventListener("click", async () => {
    const link = getOpinionUrl(opinion);
    try {
      await copyTextToClipboard(link);
      shareButton.classList.add("is-confirmed");
      showToast("Link de la opinión copiado");
    } catch {
      showToast("No se pudo copiar el link");
    }
    opinion.shares += 1;
    await dataStore.updateOpinion(opinion);
    window.setTimeout(() => {
      shareButton.classList.remove("is-confirmed");
    }, 1800);
  });

  const reportButton = card.querySelector(".report-button");
  reportButton.addEventListener("click", async () => {
    try {
      const result = await registerContentActionViaApi("report", "opinion", opinion.id, opinion.id);
      Object.assign(opinion, result.opinion);
      reportButton.classList.add("is-confirmed");
      showToast("Reporte enviado");
      render();
    } catch (error) {
      if (error.code === "already_reported") reportButton.classList.add("is-confirmed");
      showToast(getApiErrorMessage(error, "No se pudo enviar el reporte."));
    }
  });

  const thread = card.querySelector(".thread");
  opinion.replies.forEach((reply, index) => {
    const normalizedReply = normalizeReply(reply);
    opinion.replies[index] = normalizedReply;

    const item = document.createElement("div");
    item.className = "reply-card";
    item.innerHTML = `
      <p class="reply"><strong>${getReplyAuthorLabel(opinion, normalizedReply, index)}:</strong> ${escapeHtml(normalizedReply.text)}</p>
      <span class="date-stamp reply-date">${formatDate(normalizedReply.createdAt)}</span>
      <div class="reply-actions">
        <button class="like-button${normalizedReply.liked ? " liked" : ""}" type="button" aria-label="Me gusta respuesta">
          <span aria-hidden="true">♡</span>
          <span>${normalizedReply.likes}</span>
        </button>
        <button class="report-button opinion-action-button" type="button" aria-label="Reportar respuesta" title="Reportar respuesta">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M5 21V4"></path>
            <path d="M5 4h12l-1.5 4L17 12H5"></path>
          </svg>
        </button>
      </div>
    `;

    item.querySelector(".like-button").addEventListener("click", async () => {
      try {
        const result = await registerContentActionViaApi("like", "reply", normalizedReply.id, opinion.id);
        Object.assign(opinion, result.opinion);
        render();
        showToast(result.active ? "Me gusta guardado" : "Me gusta quitado");
      } catch (error) {
        showToast(getApiErrorMessage(error, "No se pudo guardar el me gusta."));
      }
    });

    item.querySelector(".report-button").addEventListener("click", async () => {
      try {
        const result = await registerContentActionViaApi("report", "reply", normalizedReply.id, opinion.id);
        Object.assign(opinion, result.opinion);
        render();
        showToast("Reporte enviado");
      } catch (error) {
        showToast(getApiErrorMessage(error, "No se pudo enviar el reporte."));
      }
    });

    thread.append(item);
  });

  const replyForm = card.querySelector(".reply-form");
  const replyInput = replyForm.querySelector("input");
  replyForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const reply = replyInput.value.trim();
    if (!reply) return;
    if (containsBlockedLink(reply)) {
      rejectLinkedContent();
      return;
    }

    try {
      const updatedOpinion = await createReplyViaApi(opinion.id, reply);
      Object.assign(opinion, updatedOpinion);
      selectedOpinionId = opinion.id;
      render();
      showView("detail");
      showToast("Respuesta publicada");
    } catch (error) {
      showToast(getApiErrorMessage(error, "No se pudo publicar la respuesta."));
    }
  });

  return card;
}

function getLastTopicActivity(topicOpinions) {
  const dates = topicOpinions.flatMap((opinion) => [
    opinion.createdAt,
    ...opinion.replies.map((reply) => normalizeReply(reply).createdAt)
  ]);
  return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] || "";
}

function getLifeLabel(opinion) {
  const ageMinutes = (Date.now() - new Date(opinion.createdAt).getTime()) / 60000;
  if (ageMinutes <= 10) return "Recién publicada";
  if (opinion.replies.length >= 8) return "Muy debatida";
  if (opinion.replies.length >= 3) return "Está dando que hablar";
  if (opinion.likes >= 5) return "Más apoyada";
  if (opinion.replies.some((reply) => (Date.now() - new Date(normalizeReply(reply).createdAt).getTime()) / 60000 <= 30)) return "Nueva respuesta";
  return "";
}

function renderDiscovery(target = discoveryGrid) {
  if (!target) return;
  target.innerHTML = "";
  const visibleOpinions = getVisibleOpinions();
  const items = [
    { label: "Tendencias ahora", action: () => showView("topics") },
    { label: "Más debatidas", action: () => showDiscoveryResults("Más debatidas", visibleOpinions.slice().sort((a, b) => b.replies.length - a.replies.length)) },
    { label: "Más apoyadas", action: () => showDiscoveryResults("Más apoyadas", visibleOpinions.slice().sort((a, b) => b.likes - a.likes)) },
    { label: "Recién publicadas", action: () => showDiscoveryResults("Recién publicadas", visibleOpinions) },
    { label: "Opiniones sin respuestas", action: () => showDiscoveryResults("Opiniones sin respuestas", visibleOpinions.filter((opinion) => !opinion.replies.length)) },
    { label: "Opinión al azar", action: () => openRandomOpinion(visibleOpinions) }
  ];

  items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "discovery-chip";
    button.textContent = item.label;
    button.addEventListener("click", item.action);
    target.append(button);
  });
}

function showDiscoveryResults(title, results) {
  searchQuery = title;
  syncSearchInputs("");
  searchResultsList.innerHTML = "";
  searchTitle.textContent = title;
  searchDescription.textContent = "Selección rápida con actividad actual.";
  const limitedResults = results.slice(0, 12);
  if (!limitedResults.length) {
    const empty = document.createElement("p");
    empty.className = "opinion-card";
    empty.textContent = "Todavía no hay opiniones en esta selección.";
    searchResultsList.append(empty);
  } else {
    limitedResults.forEach((opinion) => searchResultsList.append(createOpinionCard(opinion, false)));
  }
  showView("search");
}

function openRandomOpinion(sourceOpinions) {
  if (!sourceOpinions.length) {
    showToast("Todavía no hay opiniones para mostrar");
    return;
  }
  const opinion = sourceOpinions[Math.floor(Math.random() * sourceOpinions.length)];
  openOpinion(opinion.id);
}

function getTopicIconMarkup(topic, large = false) {
  const sizeClass = large ? " large" : "";
  return `<img class="topic-icon${sizeClass}" src="${topic.icon}" alt="" aria-hidden="true">`;
}

function normalizeReply(reply) {
  if (typeof reply !== "string") {
    return {
      id: reply.id || createId(),
      author: reply.author || "Opinion",
      text: reply.text || "",
      likes: Number(reply.likes || 0),
      reports: Number(reply.reports || 0),
      createdAt: normalizeDateValue(reply.createdAt),
      liked: Boolean(reply.liked)
    };
  }
  return createReply(reply);
}

function resetPersistedContentIfNeeded() {
  if (window.localStorage.getItem(resetStorageKey)) return;

  window.localStorage.removeItem("quiero-opinar:opinions");
  window.localStorage.removeItem("quiero-opinar:topics");
  window.localStorage.setItem(resetStorageKey, "1");
}

function createLocalDataStore() {
  const opinionsKey = "quiero-opinar:opinions";
  const topicsKey = "quiero-opinar:topics";

  function loadStoredOpinions() {
    try {
      const stored = window.localStorage.getItem(opinionsKey);
      if (!stored) return seedOpinions;
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed.map(normalizeOpinion) : seedOpinions;
    } catch {
      return seedOpinions;
    }
  }

  function loadStoredTopics() {
    try {
      const stored = window.localStorage.getItem(topicsKey);
      if (!stored) return topics;
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : topics;
    } catch {
      return topics;
    }
  }

  function saveOpinions(nextOpinions) {
    window.localStorage.setItem(opinionsKey, JSON.stringify(nextOpinions));
  }

  return {
    name: "local",
    async subscribe(onChange) {
      topics = loadStoredTopics();
      opinions = loadStoredOpinions();
      hasLoadedOpinions = true;
      onChange(opinions);
      saveOpinions(opinions);
      return () => {};
    },
    async saveTopics(nextTopics) {
      window.localStorage.setItem(topicsKey, JSON.stringify(nextTopics));
    },
    async addOpinion(opinion) {
      saveOpinions(opinions);
    },
    async updateOpinion(opinion) {
      saveOpinions(opinions);
    }
  };
}

async function createFirebaseDataStore() {
  const config = window.QO_FIREBASE_CONFIG;
  const appCheckConfig = window.QO_FIREBASE_APPCHECK_CONFIG || {};
  if (!window.QO_USE_FIREBASE || !isValidFirebaseConfig(config)) {
    return createLocalDataStore();
  }

  const [{ initializeApp }, firebaseAuth, appCheckModule, firestore] = await Promise.all([
    import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"),
    import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-check.js"),
    import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js")
  ]);

  const {
    getFirestore,
    collection,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    setDoc
  } = firestore;

  const { getAuth, signInAnonymously } = firebaseAuth;
  const { initializeAppCheck, ReCaptchaV3Provider } = appCheckModule;

  const app = initializeApp(config);
  const db = getFirestore(app);
  const auth = getAuth(app);

  if (appCheckConfig.enabled && appCheckConfig.siteKey) {
    if (appCheckConfig.debugToken) {
      window.FIREBASE_APPCHECK_DEBUG_TOKEN = appCheckConfig.debugToken;
    }

    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(appCheckConfig.siteKey),
      isTokenAutoRefreshEnabled: true
    });
  }

  try {
    await signInAnonymously(auth);
  } catch (error) {
    console.warn("No se pudo autenticar anonimamente en Firebase.", error);
  }

  async function loadTopicsFromFirestore() {
    const snapshot = await getDocs(collection(db, "topics"));
    const remoteTopics = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
    if (remoteTopics.length) topics = mergeTopics(remoteTopics);
  }

  return {
    name: "firebase",
    async subscribe(onChange) {
      await loadTopicsFromFirestore();
      return onSnapshot(query(collection(db, "opinions"), orderBy("createdAt", "desc")), (snapshot) => {
        opinions = snapshot.docs.map((item) => normalizeOpinion({ id: item.id, ...item.data() }));
        hasLoadedOpinions = true;
        onChange(opinions);
      });
    },
    async saveTopics(nextTopics) {
      return Promise.resolve(nextTopics);
    },
    async addOpinion(opinion) {
      await setDoc(doc(db, "opinions", opinion.id), sanitizeOpinionForRemote(opinion));
    },
    async updateOpinion(opinion) {
      return Promise.resolve(opinion);
    }
  };
}

function isValidFirebaseConfig(config) {
  return Boolean(
    config?.apiKey &&
    config?.projectId &&
    !String(config.apiKey).startsWith("PEGAR_") &&
    !String(config.projectId).startsWith("PEGAR_")
  );
}

function mergeTopics(remoteTopics) {
  const byId = new Map(topics.map((topic) => [topic.id, topic]));
  remoteTopics.forEach((topic) => {
    byId.set(topic.id, {
      icon: "assets/icons/generic.svg",
      description: "Tema creado por la comunidad",
      ...byId.get(topic.id),
      ...topic
    });
  });
  return Array.from(byId.values());
}

function normalizeOpinion(opinion) {
  const detectedTopic = detectTopic(opinion.text || "");
  const normalizedTopic = opinion.topic || "sin-tema";

  return {
    id: opinion.id || createId(),
    author: opinion.author || "Opinion",
    topic: normalizedTopic === "sin-tema" && detectedTopic.score > 0 ? detectedTopic.id : normalizedTopic,
    text: opinion.text || "",
    views: Number(opinion.views || 0),
    likes: Number(opinion.likes || 0),
    createdAt: normalizeDateValue(opinion.createdAt),
    replies: Array.isArray(opinion.replies) ? opinion.replies.map(normalizeReply) : [],
    liked: Boolean(opinion.liked),
    hidden: Boolean(opinion.hidden),
    reports: Number(opinion.reports || 0),
    shares: Number(opinion.shares || 0),
    ip: opinion.ip || ""
  };
}

function normalizeDateValue(value) {
  if (value?.toDate) return value.toDate().toISOString();
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();
  return new Date().toISOString();
}

function sanitizeOpinionForRemote(opinion) {
  return {
    id: opinion.id,
    author: opinion.author,
    topic: opinion.topic,
    text: opinion.text,
    views: opinion.views,
    likes: opinion.likes,
    createdAt: opinion.createdAt,
    replies: opinion.replies.map((reply) => ({
      id: reply.id,
      author: reply.author,
      text: reply.text,
      likes: reply.likes,
      reports: Number(reply.reports || 0),
      createdAt: reply.createdAt
    })),
    hidden: Boolean(opinion.hidden),
    reports: Number(opinion.reports || 0),
    shares: Number(opinion.shares || 0),
    ip: opinion.ip || ""
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

function truncateText(value, maxLength) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trim()}...`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function render() {
  renderTopics();
  renderFeed();
  renderBoard();
  renderTopicDetail();
  renderDetail();
  renderSearchResults();
  openInitialOpinionFromUrl();
}

function openInitialOpinionFromUrl() {
  if (hasHandledInitialOpinion || !hasLoadedOpinions) return;
  const opinionId = new URLSearchParams(window.location.search).get("opinion");
  if (!opinionId) {
    hasHandledInitialOpinion = true;
    return;
  }
  const opinion = getOpinionById(opinionId);
  if (opinion && !opinion.hidden) {
    hasHandledInitialOpinion = true;
    openOpinion(opinionId);
  }
}

async function initializeAppData() {
  resetPersistedContentIfNeeded();
  setupViewportMetrics();

  try {
    dataStore = await createFirebaseDataStore();
    await dataStore.subscribe(() => render());
  } catch (error) {
    console.warn("No se pudo conectar Firebase. Usando almacenamiento local.", error);
    dataStore = createLocalDataStore();
    await dataStore.subscribe(() => render());
  }

  setupComposerVisibilityObserver();
  updateFloatingOpinionVisibility();
  render();
  window.setInterval(renderTopics, trendingRefreshHours * 60 * 60 * 1000);
}

initializeAppData();
