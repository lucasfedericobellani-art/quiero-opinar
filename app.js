let topics = [
  { id: "todos", name: "Todos", description: "Feed general", icon: "assets/icons/todos.svg" },
  { id: "sin-tema", name: "Sin tema especifico", description: "Opiniones libres", icon: "assets/icons/sin-tema.svg" },
  { id: "historia", name: "Quiero contar una historia", description: "Relatos personales", icon: "assets/icons/historia.svg" },
  { id: "economia", name: "Economia", description: "Precios, trabajo y empresas", icon: "assets/icons/economia.svg" },
  { id: "agro", name: "Agro", description: "Campo, produccion rural y sector agropecuario", icon: "assets/icons/agro.svg" },
  { id: "politica", name: "Politica", description: "Gobierno, partidos y debate publico", icon: "assets/icons/politica.svg" },
  { id: "seguridad", name: "Seguridad", description: "Ciudad, justicia y prevencion", icon: "assets/icons/seguridad.svg" },
  { id: "cine", name: "Cine", description: "Peliculas, series y cultura visual", icon: "assets/icons/cine.svg" },
  { id: "tecnologia", name: "Tecnologia", description: "Internet, IA y productos digitales", icon: "assets/icons/tecnologia.svg" },
  { id: "deportes", name: "Deportes", description: "Clubes, torneos y pasiones", icon: "assets/icons/deportes.svg" },
  { id: "autos", name: "Autos", description: "Modelos, rutas, mecanica y mercado", icon: "assets/icons/autos.svg" },
  { id: "formula-1", name: "Formula 1", description: "Pilotos, carreras, equipos y estrategia", icon: "assets/icons/formula-1.svg" },
  { id: "videojuegos", name: "Videojuegos", description: "Juegos, consolas, PC y cultura gamer", icon: "assets/icons/videojuegos.svg" }
];

const topicRules = [
  { id: "formula-1", words: ["formula 1", "f1", "ferrari", "red bull", "mercedes", "mclaren", "verstappen", "hamilton", "leclerc", "colapinto", "piloto", "carrera", "gran premio", "pit stop"] },
  { id: "videojuegos", words: ["videojuego", "videojuegos", "juego", "gaming", "gamer", "playstation", "xbox", "nintendo", "steam", "pc gamer", "fortnite", "minecraft", "gta", "fifa", "valorant"] },
  { id: "autos", words: ["auto", "autos", "coche", "camioneta", "motor", "mecanico", "mecanica", "nafta", "diesel", "concesionaria", "toyota", "ford", "fiat", "chevrolet", "volkswagen"] },
  { id: "agro", words: ["agro", "campo", "rural", "agricultura", "ganaderia", "grano", "granos", "soja", "maiz", "trigo", "cosecha", "siembra", "tambo", "estancia", "chacra", "productor agropecuario", "sector agropecuario"] },
  { id: "economia", words: ["economia", "precio", "precios", "inflacion", "dolar", "sueldo", "trabajo", "empresa", "impuesto", "alquiler", "tarifa", "mercado"] },
  { id: "politica", words: ["politica", "gobierno", "presidente", "diputado", "senado", "partido", "eleccion", "voto", "ministro", "congreso", "estado"] },
  { id: "seguridad", words: ["seguridad", "robo", "delito", "policia", "justicia", "barrio", "calle", "violencia", "denuncia", "prevencion"] },
  { id: "cine", words: ["cine", "pelicula", "peliculas", "serie", "series", "actor", "actriz", "director", "netflix", "streaming", "documental"] },
  { id: "tecnologia", words: ["tecnologia", "internet", "ia", "inteligencia artificial", "app", "software", "celular", "iphone", "android", "programacion", "datos"] },
  { id: "deportes", words: ["deporte", "deportes", "futbol", "basquet", "tenis", "club", "torneo", "partido", "seleccion", "gol", "cancha"] },
  { id: "historia", words: ["historia", "me paso", "me ocurrio", "cuento", "relato", "experiencia", "anecdota", "vivencia"] }
];

const opinions = [
  {
    id: createId(),
    author: "Anonimo #1842",
    topic: "economia",
    text: "La conversacion economica necesita menos slogans y mas explicaciones simples sobre como cada medida afecta a una familia comun.",
    views: 284,
    likes: 18,
    createdAt: createPastDate(54),
    replies: [
      createReply("Totalmente. Si no se entiende en la mesa de casa, no se entendio.", 7, createPastDate(42)),
      createReply("Tambien haria falta comparar propuestas con datos verificables.", 4, createPastDate(31))
    ],
    liked: false
  },
  {
    id: createId(),
    author: "Anonimo #2091",
    topic: "seguridad",
    text: "Me gustaria ver foros barriales donde se puedan reportar problemas concretos sin convertir todo en pelea partidaria.",
    views: 176,
    likes: 11,
    createdAt: createPastDate(39),
    replies: [createReply("La clave seria moderar fuerte los ataques personales.", 3, createPastDate(26))],
    liked: false
  },
  {
    id: createId(),
    author: "Anonimo #3310",
    topic: "cine",
    text: "El cine argentino deberia tener una seccion propia para recomendaciones: hay joyas que casi nadie encuentra en plataformas.",
    views: 98,
    likes: 24,
    createdAt: createPastDate(22),
    replies: [],
    liked: false
  },
  {
    id: createId(),
    author: "Anonimo #4478",
    topic: "formula-1",
    text: "La Formula 1 se volvio mucho mas interesante cuando empezas a mirar estrategia, neumaticos y decisiones de boxes.",
    views: 143,
    likes: 16,
    createdAt: createPastDate(16),
    replies: [createReply("Las carreras se entienden distinto cuando miras los tiempos por vuelta.", 5, createPastDate(9))],
    liked: false
  }
];

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
const topicList = document.querySelector("#topicList");
const feedList = document.querySelector("#feedList");
const opinionTemplate = document.querySelector("#opinionTemplate");
const activeTopicPill = document.querySelector("#activeTopicPill");
const legalOverlay = document.querySelector("#legalOverlay");
const legalOpenButton = document.querySelector("#legalOpenButton");
const legalCloseButton = document.querySelector("#legalCloseButton");
const legalTriggers = document.querySelectorAll(".legal-trigger");
const homeView = document.querySelector("#homeView");
const aboutView = document.querySelector("#aboutView");
const topicsView = document.querySelector("#topicsView");
const topicDetailView = document.querySelector("#topicDetailView");
const detailView = document.querySelector("#detailView");
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
const backFromDetailButton = document.querySelector("#backFromDetailButton");
const backFromTopicButton = document.querySelector("#backFromTopicButton");
const homeButtons = document.querySelectorAll(".nav-home");
const mobileViewportQuery = window.matchMedia("(max-width: 980px)");

let activeTopic = "todos";
let currentView = "home";
let lastViewBeforeDetail = "home";
let selectedOpinionId = null;
let selectedTopicId = null;
let isMainComposerVisible = true;
let isFloatingOpinionOpen = false;
let isMobileMenuOpen = false;

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

backFromDetailButton.addEventListener("click", () => showView(lastViewBeforeDetail));
backFromTopicButton.addEventListener("click", () => showView("topics"));
topicSearchInput.addEventListener("input", renderBoard);

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

opinionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  publishOpinion(opinionText.value, topicIdea.value, opinionForm);
});

floatingOpinionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  publishOpinion(floatingOpinionText.value, floatingTopicIdea.value, floatingOpinionForm);
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
  mobileMenuToggle.setAttribute("aria-label", isOpen ? "Cerrar menu" : "Abrir menu");
}

function closeMobileMenu(restoreFocus = true) {
  if (!isMobileMenuOpen) return;

  setMobileMenuOpen(false);
  if (restoreFocus) mobileMenuToggle.focus();
}

function createAnonymousId() {
  return `Anonimo #${Math.floor(1000 + Math.random() * 9000)}`;
}

function createId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `opinion-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function createPastDate(minutesAgo) {
  return new Date(Date.now() - minutesAgo * 60 * 1000).toISOString();
}

function createReply(text, likes = 0, createdAt = new Date().toISOString()) {
  return {
    id: createId(),
    author: "Anonimo",
    text,
    likes,
    createdAt,
    liked: false
  };
}

function getReplyLikes(reply) {
  return typeof reply === "string" ? 0 : reply.likes;
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

function getTopicOpinions(topicId) {
  if (topicId === "todos") return opinions;
  return opinions.filter((opinion) => opinion.topic === topicId);
}

function getTopicScore(topicId) {
  return getTopicOpinions(topicId).reduce((score, opinion) => {
    const replyLikes = opinion.replies.reduce((total, reply) => total + getReplyLikes(reply), 0);
    return score + opinion.views + opinion.likes * 3 + opinion.replies.length * 8 + replyLikes * 2;
  }, 0);
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

function publishOpinion(rawText, rawTopic, form) {
  const text = rawText.trim();
  if (!text) return;

  const opinion = {
    id: createId(),
    author: createAnonymousId(),
    topic: resolveSelectedTopic(rawTopic, text),
    text,
    views: 1,
    likes: 0,
    createdAt: new Date().toISOString(),
    replies: [],
    liked: false
  };

  opinions.unshift(opinion);
  form.reset();
  if (form === floatingOpinionForm) closeFloatingOpinionPanel(false);
  activeTopic = "todos";
  selectedOpinionId = opinion.id;
  render();
  openOpinion(opinion.id);
}

function showView(viewName) {
  currentView = viewName;
  homeView.classList.toggle("hidden", viewName !== "home");
  aboutView.classList.toggle("hidden", viewName !== "about");
  topicsView.classList.toggle("hidden", viewName !== "topics");
  topicDetailView.classList.toggle("hidden", viewName !== "topicDetail");
  detailView.classList.toggle("hidden", viewName !== "detail");
  if (viewName === "home") isMainComposerVisible = true;
  closeMobileMenu(false);
  closeFloatingOpinionPanel(false);
  updateFloatingOpinionVisibility();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openFloatingOpinionPanel() {
  isFloatingOpinionOpen = true;
  updateFloatingOpinionVisibility();
  window.setTimeout(() => {
    try {
      floatingOpinionText.focus({ preventScroll: true });
    } catch {
      floatingOpinionText.focus();
    }
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
  floatingOpinionTrigger.classList.toggle("is-visible", shouldShowTrigger);
  floatingOpinionTrigger.classList.toggle("is-open", isFloatingOpinionOpen);
  floatingOpinionTrigger.setAttribute("aria-expanded", String(isFloatingOpinionOpen));
  floatingOpinion.classList.toggle("is-open", isFloatingOpinionOpen);
  floatingOpinion.setAttribute("aria-hidden", String(!isFloatingOpinionOpen));
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
  const opinion = opinions.find((item) => item.id === opinionId);
  if (!opinion) return;

  lastViewBeforeDetail = currentView === "detail" ? lastViewBeforeDetail : currentView;
  selectedOpinionId = opinionId;
  opinion.views += 1;
  render();
  showView("detail");
}

function renderTopics() {
  topicList.innerHTML = "";

  const trendingTopics = getVisibleTopics()
    .map((topic) => ({
      ...topic,
      count: getTopicOpinions(topic.id).length,
      score: getTopicScore(topic.id)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  trendingTopics.forEach((topic) => {
    const button = document.createElement("button");
    button.className = `topic-button${activeTopic === topic.id ? " active" : ""}`;
    button.type = "button";
    button.setAttribute("aria-label", `Abrir tema ${topic.name}`);
    button.innerHTML = `
      <span class="topic-button-content">
        <strong>${getTopicIconMarkup(topic)}<span class="topic-button-name">${topic.name}</span></strong>
        <span class="topic-count">${topic.count} opiniones activas</span>
      </span>
      <span class="topic-score">${topic.score}</span>
    `;
    button.addEventListener("click", () => openTopic(topic.id));
    topicList.append(button);
  });
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
    empty.textContent = "No encontramos temas con esa busqueda.";
    boardGrid.append(empty);
    return;
  }

  visibleTopics.forEach((topic) => {
    const topicOpinions = getTopicOpinions(topic.id)
      .slice()
      .sort((a, b) => {
        const aScore = a.views + a.likes * 3 + a.replies.length * 8;
        const bScore = b.views + b.likes * 3 + b.replies.length * 8;
        return bScore - aScore;
      });

    const column = document.createElement("article");
    column.className = "board-column";
    column.tabIndex = 0;
    column.setAttribute("role", "button");
    column.setAttribute("aria-label", `Abrir tema ${topic.name}`);
    column.innerHTML = `
      <div class="board-column-header">
        <div>
          <h2>${getTopicIconMarkup(topic)}${topic.name}</h2>
          <p>${topic.description}</p>
        </div>
        <span class="board-count">${topicOpinions.length} hilos</span>
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
      empty.textContent = "Todavia no hay hilos.";
      list.append(empty);
    }

    topicOpinions.slice(0, 4).forEach((opinion) => {
      const card = document.createElement("button");
      card.className = "board-card";
      card.type = "button";
      card.innerHTML = `
        <strong>${opinion.author}</strong>
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

  if (!filteredOpinions.length) {
    const empty = document.createElement("p");
    empty.className = "opinion-card";
    empty.textContent = "Todavia no hay opiniones en este tema. Podes abrir el primer hilo.";
    feedList.append(empty);
    return;
  }

  filteredOpinions.forEach((opinion) => {
    feedList.append(createOpinionCard(opinion, false));
  });
}

function renderTopicDetail() {
  topicDetailList.innerHTML = "";
  const topic = getTopic(selectedTopicId);

  if (!topic) {
    topicDetailIcon.innerHTML = getTopicIconMarkup({ name: "Tema", icon: "assets/icons/generic.svg" }, true);
    topicDetailTitle.textContent = "Tema";
    topicDetailDescription.textContent = "No se encontro este tema.";
    return;
  }

  topicDetailIcon.innerHTML = getTopicIconMarkup(topic, true);
  topicDetailTitle.textContent = topic.name;
  topicDetailDescription.textContent = topic.description;

  const topicOpinions = getTopicOpinions(topic.id);
  if (!topicOpinions.length) {
    const empty = document.createElement("p");
    empty.className = "opinion-card";
    empty.textContent = "Todavia no hay opiniones en este tema.";
    topicDetailList.append(empty);
    return;
  }

  topicOpinions.forEach((opinion) => {
    topicDetailList.append(createOpinionCard(opinion, false));
  });
}

function renderDetail() {
  detailShell.innerHTML = "";
  const opinion = opinions.find((item) => item.id === selectedOpinionId);

  if (!opinion) {
    const empty = document.createElement("p");
    empty.className = "opinion-card";
    empty.textContent = "No se encontro esta opinion.";
    detailShell.append(empty);
    return;
  }

  detailShell.append(createOpinionCard(opinion, true));
}

function createOpinionCard(opinion, isDetail) {
  const card = opinionTemplate.content.firstElementChild.cloneNode(true);
  card.querySelector(".author").textContent = opinion.author;
  card.querySelector(".topic").textContent = getTopicName(opinion.topic);
  card.querySelector(".date-stamp").textContent = formatDate(opinion.createdAt);
  card.querySelector(".opinion-text").textContent = opinion.text;
  card.querySelector(".views").textContent = `${opinion.views} vistas`;
  card.querySelector(".replies").textContent = `${opinion.replies.length} respuestas`;
  card.querySelector(".likes").textContent = opinion.likes;

  const openButton = card.querySelector(".open-opinion");
  if (isDetail) {
    openButton.disabled = true;
  } else {
    openButton.addEventListener("click", () => openOpinion(opinion.id));
  }

  const likeButton = card.querySelector(".like-button");
  likeButton.classList.toggle("liked", opinion.liked);
  likeButton.addEventListener("click", () => {
    if (opinion.liked) return;
    opinion.liked = true;
    opinion.likes += 1;
    render();
  });

  const thread = card.querySelector(".thread");
  opinion.replies.forEach((reply, index) => {
    const normalizedReply = normalizeReply(reply);
    opinion.replies[index] = normalizedReply;

    const item = document.createElement("div");
    item.className = "reply-card";
    item.innerHTML = `
      <p class="reply"><strong>${normalizedReply.author}:</strong> ${escapeHtml(normalizedReply.text)}</p>
      <span class="date-stamp reply-date">${formatDate(normalizedReply.createdAt)}</span>
      <button class="like-button${normalizedReply.liked ? " liked" : ""}" type="button" aria-label="Me gusta respuesta">
        <span aria-hidden="true">+</span>
        <span>${normalizedReply.likes}</span>
      </button>
    `;

    item.querySelector(".like-button").addEventListener("click", () => {
      if (normalizedReply.liked) return;
      normalizedReply.liked = true;
      normalizedReply.likes += 1;
      render();
    });

    thread.append(item);
  });

  const replyForm = card.querySelector(".reply-form");
  const replyInput = replyForm.querySelector("input");
  replyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const reply = replyInput.value.trim();
    if (!reply) return;

    opinion.replies.push(createReply(reply));
    opinion.views += 1;
    selectedOpinionId = opinion.id;
    render();
    showView("detail");
  });

  return card;
}

function getTopicIconMarkup(topic, large = false) {
  const sizeClass = large ? " large" : "";
  return `<img class="topic-icon${sizeClass}" src="${topic.icon}" alt="" aria-hidden="true">`;
}

function normalizeReply(reply) {
  if (typeof reply !== "string") return reply;
  return createReply(reply);
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
}

setupComposerVisibilityObserver();
updateFloatingOpinionVisibility();
render();
