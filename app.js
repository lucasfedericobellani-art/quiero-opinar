let topics = [
  { id: "todos", name: "Todos", description: "Feed general", icon: "assets/icons/todos.svg" },
  { id: "sin-tema", name: "Sin tema específico", description: "Opiniones libres", icon: "assets/icons/sin-tema.svg" },
  { id: "actualidad", name: "Actualidad", description: "Noticias, agenda pública y conversación del día", icon: "assets/icons/generic.svg" },
  { id: "historia", name: "Quiero contar una historia", description: "Relatos personales", icon: "assets/icons/historia.svg" },
  { id: "economia", name: "Economía", description: "Precios, trabajo y empresas", icon: "assets/icons/economia.svg" },
  { id: "agro", name: "Agro", description: "Campo, producción rural y sector agropecuario", icon: "assets/icons/agro.svg" },
  { id: "politica", name: "Política", description: "Gobierno, partidos y debate público", icon: "assets/icons/politica.svg" },
  { id: "sociedad", name: "Sociedad", description: "Comunidad, vínculos y vida cotidiana", icon: "assets/icons/generic.svg" },
  { id: "clima", name: "Clima", description: "Tiempo, pronóstico y fenómenos meteorológicos", icon: "assets/icons/generic.svg" },
  { id: "seguridad", name: "Seguridad", description: "Ciudad, justicia y prevención", icon: "assets/icons/seguridad.svg" },
  { id: "cine", name: "Cine", description: "Películas, series y cultura visual", icon: "assets/icons/cine.svg" },
  { id: "musica", name: "Música", description: "Artistas, canciones, recitales y cultura musical", icon: "assets/icons/generic.svg" },
  { id: "tecnologia", name: "Tecnología", description: "Internet, IA y productos digitales", icon: "assets/icons/tecnologia.svg" },
  { id: "educacion", name: "Educación", description: "Escuela, crianza, docentes y aprendizaje", icon: "assets/icons/generic.svg" },
  { id: "deportes", name: "Deportes", description: "Clubes, torneos y pasiones", icon: "assets/icons/deportes.svg" },
  { id: "transporte", name: "Transporte", description: "Colectivos, trenes, tránsito y movilidad", icon: "assets/icons/generic.svg" },
  { id: "autos", name: "Autos", description: "Modelos, rutas, mecánica y mercado", icon: "assets/icons/autos.svg" },
  { id: "mascotas", name: "Mascotas", description: "Animales, cuidados y convivencia", icon: "assets/icons/generic.svg" },
  { id: "influencers", name: "Influencers", description: "Creadores, redes y cultura digital", icon: "assets/icons/generic.svg" },
  { id: "formula-1", name: "Fórmula 1", description: "Pilotos, carreras, equipos y estrategia", icon: "assets/icons/formula-1.svg" },
  { id: "videojuegos", name: "Videojuegos", description: "Juegos, consolas, PC y cultura gamer", icon: "assets/icons/videojuegos.svg" }
];

const topicRules = [
  { id: "formula-1", words: ["formula 1", "f1", "ferrari", "red bull", "mercedes", "mclaren", "verstappen", "hamilton", "leclerc", "colapinto", "piloto", "carrera", "gran premio", "pit stop"] },
  { id: "videojuegos", words: ["videojuego", "videojuegos", "juego", "gaming", "gamer", "playstation", "xbox", "nintendo", "steam", "pc gamer", "fortnite", "minecraft", "gta", "fifa", "valorant"] },
  { id: "autos", words: ["auto", "autos", "coche", "camioneta", "motor", "mecanico", "mecánica", "nafta", "diesel", "concesionaria", "toyota", "ford", "fiat", "chevrolet", "volkswagen"] },
  { id: "agro", words: ["agro", "campo", "rural", "agricultura", "ganaderia", "grano", "granos", "soja", "maiz", "trigo", "cosecha", "siembra", "tambo", "estancia", "chacra", "productor agropecuario", "sector agropecuario"] },
  { id: "economia", words: ["economia", "precio", "precios", "inflacion", "dolar", "sueldo", "trabajo", "empresa", "impuesto", "alquiler", "tarifa", "mercado"] },
  { id: "politica", words: ["politica", "gobierno", "presidente", "diputado", "senado", "partido", "eleccion", "voto", "ministro", "congreso", "estado", "derecha", "izquierda", "milei", "miley", "libertario", "libertarios", "libertontos", "peronismo", "peronista", "peronistas"] },
  { id: "sociedad", words: ["sociedad", "comunidad", "gente", "vecinos", "barrio", "familia", "relaciones", "convivencia", "costumbres", "social"] },
  { id: "clima", words: ["clima", "tiempo", "pronostico", "pronóstico", "lluvia", "llueve", "llover", "tormenta", "granizo", "nieve", "nevar", "nevando", "frio", "frío", "calor", "humedad", "viento", "temporal", "alerta meteorologica", "alerta meteorológica"] },
  { id: "seguridad", words: ["seguridad", "robo", "delito", "policia", "justicia", "barrio", "calle", "violencia", "denuncia", "prevención"] },
  { id: "cine", words: ["cine", "pelicula", "peliculas", "serie", "series", "actor", "actriz", "director", "netflix", "streaming", "documental"] },
  { id: "musica", words: ["musica", "música", "cancion", "canción", "canciones", "artista", "banda", "recital", "concierto", "disco", "album", "álbum", "spotify"] },
  { id: "educacion", words: ["educacion", "educación", "escuela", "colegio", "escolar", "clase", "clases", "docente", "docentes", "maestro", "maestra", "profesor", "profesora", "alumno", "alumnos", "estudiante", "estudiantes", "hijo", "hijos", "crianza", "aprendizaje"] },
  { id: "tecnologia", words: ["tecnologia", "internet", "ia", "inteligencia artificial", "app", "software", "celular", "celulares", "celu", "celus", "telefono", "telefonos", "smartphone", "smartphones", "movil", "moviles", "samsung", "galaxy", "iphone", "apple", "android", "xiaomi", "motorola", "moto g", "huawei", "notebook", "notebooks", "computadora", "computadoras", "pc", "tablet", "redes", "wifi", "programacion", "datos"] },
  { id: "deportes", words: ["deporte", "deportes", "futbol", "basquet", "tenis", "club", "torneo", "partido", "seleccion", "gol", "cancha"] },
  { id: "transporte", words: ["transporte", "colectivo", "bondi", "tren", "subte", "metro", "trafico", "tráfico", "transito", "tránsito", "ruta", "movilidad", "viaje", "pasaje"] },
  { id: "mascotas", words: ["mascota", "mascotas", "perro", "perros", "gato", "gatos", "animal", "animales", "veterinaria", "adopcion", "adopción"] },
  { id: "influencers", words: ["influencer", "influencers", "creador", "creadores", "tiktoker", "youtuber", "instagramer", "streamer", "redes sociales", "viral"] },
  { id: "historia", words: ["historia", "me paso", "me ocurrio", "cuento", "relato", "experiencia", "anecdota", "vivencia"] }
];

const seedOpinions = [];
const cachedOpinionsKey = "quiero-opinar:cached-opinions";
const cachedTopicsKey = "quiero-opinar:cached-topics";
const routePaths = {
  home: "/",
  topics: "/temas",
  about: "/que-es",
  terms: "/terminos",
  search: "/buscar"
};

const trendingWindowHours = 6;
const trendingRefreshHours = 12;
const trendingTopicLimit = 5;
const maxOpinionLength = 5000;
const maxTopicLength = 80;
const blockedLinkPattern = /(?:https?:\/\/|www\.|[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}|(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/|\b))/i;
const reportReasonOptions = [
  { id: "odio", label: "Odio o discriminacion" },
  { id: "amenaza", label: "Amenaza o violencia" },
  { id: "datos_personales", label: "Datos personales" },
  { id: "spam", label: "Spam o link peligroso" },
  { id: "sexual", label: "Contenido sexual" },
  { id: "ilegal", label: "Contenido ilegal" },
  { id: "acoso", label: "Acoso u hostigamiento" },
  { id: "otro", label: "Otro motivo" }
];
const unsafeContentTerms = [
  "te voy a matar",
  "matarte",
  "direccion de",
  "dni",
  "telefono",
  "tarjeta de credito",
  "pornografia infantil"
];
const topicIconPaths = {
  todos: '<circle cx="12" cy="12" r="9"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path>',
  "sin-tema": '<circle cx="12" cy="12" r="9"></circle><path d="M9.5 9a2.6 2.6 0 0 1 5 1.1c0 2.1-2.5 2.2-2.5 4"></path><path d="M12 17h.01"></path>',
  actualidad: '<path d="M4 19V5a2 2 0 0 1 2-2h11a3 3 0 0 1 3 3v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"></path><path d="M8 7h7"></path><path d="M8 11h8"></path><path d="M8 15h5"></path>',
  historia: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path><path d="M8 7h8"></path><path d="M8 11h6"></path>',
  economia: '<path d="M3 3v18h18"></path><path d="m7 15 4-4 3 3 5-7"></path><path d="M18 7h1v1"></path>',
  agro: '<path d="M12 22V8"></path><path d="M5 12c4 0 7 3 7 7-4 0-7-3-7-7z"></path><path d="M19 5c-4 0-7 3-7 7 4 0 7-3 7-7z"></path>',
  politica: '<path d="M3 21h18"></path><path d="M5 21V10"></path><path d="M19 21V10"></path><path d="M12 3 4 8h16z"></path><path d="M9 21v-6h6v6"></path>',
  clima: '<path d="M17.5 18H8a5 5 0 1 1 1.2-9.85A6 6 0 0 1 20 12.5 3.5 3.5 0 0 1 17.5 18z"></path><path d="M8 22v-1"></path><path d="M12 22v-1"></path><path d="M16 22v-1"></path>',
  seguridad: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-5"></path>',
  cine: '<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M7 5v14"></path><path d="M17 5v14"></path><path d="M3 9h4"></path><path d="M17 9h4"></path><path d="M3 15h4"></path><path d="M17 15h4"></path>',
  tecnologia: '<rect x="4" y="5" width="16" height="11" rx="2"></rect><path d="M8 21h8"></path><path d="M12 16v5"></path>',
  educacion: '<path d="m22 10-10-5-10 5 10 5 10-5z"></path><path d="M6 12v5c3 2 9 2 12 0v-5"></path><path d="M22 10v6"></path>',
  deportes: '<circle cx="12" cy="12" r="9"></circle><path d="M12 3a14 14 0 0 0 0 18"></path><path d="M3.6 9h16.8"></path><path d="M3.6 15h16.8"></path>',
  autos: '<path d="M5 17h14"></path><path d="M6 17l1.5-5h9L18 17"></path><path d="M8 17v2"></path><path d="M16 17v2"></path><path d="M7.5 12 9 8h6l1.5 4"></path>',
  "formula-1": '<path d="M4 16h12a4 4 0 0 0 0-8H9"></path><path d="M4 8h5"></path><path d="M4 12h9"></path><circle cx="7" cy="18" r="2"></circle><circle cx="17" cy="18" r="2"></circle>',
  videojuegos: '<path d="M6 11h4"></path><path d="M8 9v4"></path><path d="M15 12h.01"></path><path d="M18 10h.01"></path><path d="M7 7h10a5 5 0 0 1 4.7 6.7l-1.1 3.2a2.3 2.3 0 0 1-3.8.9L14 15h-4l-2.8 2.8a2.3 2.3 0 0 1-3.8-.9l-1.1-3.2A5 5 0 0 1 7 7z"></path>',
  mascotas: '<path d="M11.5 14.5c-1.3-2-4.5-.9-4.5 1.6 0 1.6 1.4 2.9 3.1 2.9h3.8c1.7 0 3.1-1.3 3.1-2.9 0-2.5-3.2-3.6-4.5-1.6-.3.5-.7.5-1 0z"></path><circle cx="7.5" cy="9" r="1.9"></circle><circle cx="12" cy="7" r="2"></circle><circle cx="16.5" cy="9" r="1.9"></circle><circle cx="18.5" cy="13" r="1.6"></circle><circle cx="5.5" cy="13" r="1.6"></circle>',
  animales: '<path d="M11.5 14.5c-1.3-2-4.5-.9-4.5 1.6 0 1.6 1.4 2.9 3.1 2.9h3.8c1.7 0 3.1-1.3 3.1-2.9 0-2.5-3.2-3.6-4.5-1.6-.3.5-.7.5-1 0z"></path><circle cx="7.5" cy="9" r="1.9"></circle><circle cx="12" cy="7" r="2"></circle><circle cx="16.5" cy="9" r="1.9"></circle><circle cx="18.5" cy="13" r="1.6"></circle><circle cx="5.5" cy="13" r="1.6"></circle>',
  influencers: '<path d="M16 11a4 4 0 1 0-8 0"></path><path d="M5 21a7 7 0 0 1 14 0"></path><path d="M18 4.5 20 3l2 1.5"></path><path d="M20 3v6"></path>',
  sociedad: '<path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path><circle cx="9.5" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
  transporte: '<path d="M6 17h12"></path><path d="M6 17v3"></path><path d="M18 17v3"></path><rect x="5" y="4" width="14" height="13" rx="2"></rect><path d="M8 8h8"></path><path d="M8 12h8"></path><circle cx="8.5" cy="15" r=".5"></circle><circle cx="15.5" cy="15" r=".5"></circle>',
  musica: '<path d="M9 18V5l10-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="16" cy="16" r="3"></circle>',
  generic: '<circle cx="12" cy="12" r="8"></circle><path d="M12 8v4l3 2"></path>',
  message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"></path>',
  replies: '<path d="M17 6.1A7 7 0 0 0 5 11v1l-2 3h4.2A7 7 0 0 0 19 10"></path><path d="M15 3h6v6"></path><path d="m21 3-7 7"></path>',
  clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>',
  arrow: '<path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path>',
  search: '<circle cx="11" cy="11" r="7"></circle><path d="m16.5 16.5 4.5 4.5"></path>'
};
const topicAccentClasses = {
  politica: "topic-accent-red",
  deportes: "topic-accent-green",
  clima: "topic-accent-blue",
  economia: "topic-accent-gold",
  actualidad: "topic-accent-orange",
  musica: "topic-accent-violet",
  autos: "topic-accent-steel",
  tecnologia: "topic-accent-blue",
  seguridad: "topic-accent-red",
  agro: "topic-accent-green",
  mascotas: "topic-accent-green",
  animales: "topic-accent-green",
  influencers: "topic-accent-violet",
  sociedad: "topic-accent-blue",
  transporte: "topic-accent-steel"
};
const hiddenPublicTopicNames = new Set([
  "sin tema especifico",
  "la derecha nunca mas",
  "ok"
]);
const onboardingSeenKey = "quieroOpinarOnboardingSeen";

let opinions = [];
const resetStorageKey = "quiero-opinar:reset-2026-07-03";

const welcomeOverlay = document.querySelector("#welcomeOverlay");
const firstVisitWelcomeModal = document.querySelector("#firstVisitWelcomeModal");
const welcomeStartButton = document.querySelector("#welcomeStartButton");
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
const legalModal = document.querySelector(".legal-modal");
const legalOpenButton = document.querySelector("#legalOpenButton");
const legalTitle = document.querySelector("#legalTitle");
const legalCloseButton = document.querySelector("#legalCloseButton");
const legalTriggers = document.querySelectorAll(".legal-trigger");
const aboutFooterButton = document.querySelector("#aboutFooterButton");
const homeView = document.querySelector("#homeView");
const aboutView = document.querySelector("#aboutView");
const topicsView = document.querySelector("#topicsView");
const topicDetailView = document.querySelector("#topicDetailView");
const detailView = document.querySelector("#detailView");
const searchView = document.querySelector("#searchView");
const notFoundView = document.querySelector("#notFoundView");
const aboutNavButton = document.querySelector("#aboutNavButton");
const topicsNavButton = document.querySelector("#topicsNavButton");
const mainNavButtons = document.querySelectorAll(".top-nav .nav-button");
const mobileMenuToggle = document.querySelector("#mobileMenuToggle");
const topNav = document.querySelector("#topNav");
const aboutTopicsButton = document.querySelector("#aboutTopicsButton");
const notFoundTopicsButton = document.querySelector("#notFoundTopicsButton");
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
const homeButtons = document.querySelectorAll(".nav-home");
const notificationStack = document.querySelector("#notificationStack");
const reportNotice = document.querySelector("#reportNotice");
const reportNoticeClose = document.querySelector("#reportNoticeClose");
const reportReasonOverlay = document.querySelector("#reportReasonOverlay");
const reportReasonList = document.querySelector("#reportReasonList");
const reportReasonCancel = document.querySelector("#reportReasonCancel");
const reportReasonSubmit = document.querySelector("#reportReasonSubmit");
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
let selectedReportReason = "";
let pendingReportResolver = null;
let hasLoadedOpinions = false;
let hasHandledInitialOpinion = false;
let isRestoringHistory = false;
let pendingScrollRestore = null;
let activeReplyControl = null;
let replyViewportTimer = 0;
let dataStore = createLocalDataStore();

hydrateInitialContentFromCache();

setupFirstVisitWelcomeModal();
updateHeaderNavigation(currentView);

legalOpenButton?.addEventListener("click", () => {
  closeMobileMenu(false);
  openLegalModal({ pushHistory: true });
});

legalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    openLegalModal({ pushHistory: true });
  });
});

legalCloseButton.addEventListener("click", closeLegalModal);

legalOverlay.addEventListener("click", (event) => {
  if (event.target === legalOverlay) closeLegalModal();
});

document.addEventListener("keydown", (event) => {
  if (!welcomeOverlay.classList.contains("hidden")) {
    handleWelcomeModalKeydown(event);
    return;
  }

  if (event.key !== "Escape") return;

  if (!legalOverlay.classList.contains("hidden")) {
    closeLegalModal();
    return;
  }

  if (reportReasonOverlay && !reportReasonOverlay.classList.contains("hidden")) {
    closeReportReasonModal("");
    return;
  }

  if (isFloatingOpinionOpen) closeFloatingOpinionPanel();
  if (isMobileMenuOpen) closeMobileMenu();
});

topicsNavButton.addEventListener("click", () => {
  navigateToView("topics");
  closeMobileMenu(false);
});

aboutNavButton?.addEventListener("click", () => {
  navigateToView("about");
  closeMobileMenu(false);
});

aboutFooterButton?.addEventListener("click", () => navigateToView("about"));

aboutTopicsButton.addEventListener("click", () => navigateToView("topics"));
notFoundTopicsButton?.addEventListener("click", () => navigateToView("topics"));

homeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    goHome();
    closeMobileMenu(false);
  });
});

reportNoticeClose?.addEventListener("click", hideReportNotice);
reportReasonCancel?.addEventListener("click", () => closeReportReasonModal(""));
reportReasonSubmit?.addEventListener("click", () => closeReportReasonModal(selectedReportReason || "otro"));
reportReasonOverlay?.addEventListener("click", (event) => {
  if (event.target === reportReasonOverlay) closeReportReasonModal("");
});
reportReasonList?.addEventListener("click", (event) => {
  const option = event.target.closest(".report-reason-option");
  if (!option) return;
  selectedReportReason = option.dataset.reason || "otro";
  reportReasonList.querySelectorAll(".report-reason-option").forEach((item) => {
    item.classList.toggle("is-selected", item === option);
  });
  reportReasonSubmit.disabled = false;
  reportReasonSubmit.focus();
});

topicSearchInput.addEventListener("input", renderBoard);
searchInputs.forEach((input) => {
  input.addEventListener("input", () => syncSearchInputs(input.value));
  input.form?.addEventListener("submit", (event) => {
    event.preventDefault();
    submitSearch(input.value, input);
  });
});

mobileMenuToggle?.addEventListener("click", () => {
  setMobileMenuOpen(!isMobileMenuOpen);
});

document.addEventListener("click", (event) => {
  if (!isMobileMenuOpen) return;
  if (topNav.contains(event.target) || mobileMenuToggle?.contains(event.target)) return;
  closeMobileMenu(false);
});

if (mobileViewportQuery.addEventListener) {
  mobileViewportQuery.addEventListener("change", () => {
    updateFloatingOpinionVisibility();
    ensureActiveReplyControlVisible();
  });
} else {
  mobileViewportQuery.addListener(() => {
    updateFloatingOpinionVisibility();
    ensureActiveReplyControlVisible();
  });
}

window.addEventListener("popstate", (event) => {
  clearReplyKeyboardAssist();
  restoreViewFromHistory(event.state);
});

document.addEventListener("focusin", (event) => {
  const control = event.target.closest?.(".reply-form input, .reply-form textarea");
  if (!control) return;
  activeReplyControl = control;
  document.body.classList.add("reply-field-focused");
  resizeReplyControl(control);
  updateViewportMetrics();
  scheduleActiveReplyControlVisibility();
});

document.addEventListener("focusout", (event) => {
  if (event.target !== activeReplyControl) return;
  window.setTimeout(() => {
    if (document.activeElement?.closest?.(".reply-form")) return;
    activeReplyControl = null;
    clearReplyKeyboardAssist();
  }, 80);
});

document.addEventListener("input", (event) => {
  if (event.target !== activeReplyControl) return;
  resizeReplyControl(event.target);
  scheduleActiveReplyControlVisibility();
});

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

function setupFirstVisitWelcomeModal() {
  if (!welcomeOverlay || !firstVisitWelcomeModal || !welcomeStartButton) return;

  let hasSeenOnboarding = false;
  try {
    hasSeenOnboarding = window.localStorage.getItem(onboardingSeenKey) === "true";
  } catch (error) {
    hasSeenOnboarding = false;
  }

  if (hasSeenOnboarding) return;

  openFirstVisitWelcomeModal();
  welcomeStartButton.addEventListener("click", closeFirstVisitWelcomeModal);
  welcomeOverlay.addEventListener("click", (event) => {
    if (event.target === welcomeOverlay) closeFirstVisitWelcomeModal();
  });
}

function openFirstVisitWelcomeModal() {
  welcomeOverlay.classList.remove("hidden");
  document.body.classList.add("welcome-modal-open");
  window.requestAnimationFrame(() => welcomeStartButton.focus({ preventScroll: true }));
}

function closeFirstVisitWelcomeModal() {
  try {
    window.localStorage.setItem(onboardingSeenKey, "true");
  } catch (error) {
    // localStorage can be unavailable in strict privacy contexts.
  }

  welcomeOverlay.classList.add("hidden");
  document.body.classList.remove("welcome-modal-open");
  if (isMobileViewport()) {
    floatingOpinionTrigger.focus({ preventScroll: true });
  } else {
    opinionText.focus({ preventScroll: true });
  }
}

function handleWelcomeModalKeydown(event) {
  if (event.key === "Escape") {
    closeFirstVisitWelcomeModal();
    return;
  }

  if (event.key !== "Tab") return;

  const focusableElements = firstVisitWelcomeModal.querySelectorAll("button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])");
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  if (!firstFocusable || !lastFocusable) return;

  if (event.shiftKey && document.activeElement === firstFocusable) {
    event.preventDefault();
    lastFocusable.focus();
    return;
  }

  if (!event.shiftKey && document.activeElement === lastFocusable) {
    event.preventDefault();
    firstFocusable.focus();
  }
}

function closeLegalModal(options = {}) {
  if (!options.fromHistory && window.history.state?.modal === "legal") {
    window.history.back();
    return;
  }

  legalOverlay.classList.add("hidden");
  if (options.restoreFocus !== false) (legalOpenButton || document.querySelector(".legal-trigger"))?.focus();
}

function openLegalModal(options = {}) {
  if (options.pushHistory && !isRestoringHistory) {
    const currentState = {
      ...(window.history.state || getCurrentNavigationState()),
      ...getCurrentNavigationState(),
      scrollY: window.scrollY,
      modal: null
    };
    window.history.replaceState(currentState, "", window.location.href);
    window.history.pushState({ ...currentState, view: "terms", modal: "legal" }, "", routePaths.terms);
  }

  updateTermsMetadata();
  legalOverlay.classList.remove("hidden");
  legalModal.scrollTop = 0;
  legalTitle.focus({ preventScroll: true });
  window.requestAnimationFrame(() => {
    legalModal.scrollTop = 0;
  });
}

function updateTermsMetadata() {
  document.title = "Términos y condiciones | Quiero Opinar";
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    document.head.append(metaDescription);
  }
  metaDescription.setAttribute("content", "Términos, privacidad y reglas de comunidad de Quiero Opinar.");
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.append(canonical);
  }
  canonical.href = `${window.location.origin}${routePaths.terms}`;
}

function setMobileMenuOpen(isOpen) {
  if (!mobileMenuToggle) return;
  isMobileMenuOpen = isOpen;
  topNav.classList.toggle("is-open", isOpen);
  mobileMenuToggle.classList.toggle("is-open", isOpen);
  mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  mobileMenuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
}

function closeMobileMenu(restoreFocus = true) {
  if (!mobileMenuToggle) return;
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
  return topics.filter((topic) => topic.id !== "todos" && !isHiddenPublicTopic(topic));
}

function getVisibleOpinions() {
  return opinions.filter((opinion) => !opinion.hidden);
}

function getOpinionById(opinionId) {
  return opinions.find((item) => item.id === opinionId);
}

function getOpinionByRouteId(routeId) {
  const normalizedRouteId = String(routeId || "").trim();
  if (!normalizedRouteId) return null;

  const exactMatch = getOpinionById(normalizedRouteId);
  if (exactMatch) return exactMatch;

  if (/^\d+$/.test(normalizedRouteId)) {
    return opinions.find((opinion) => getOpinionNumber(opinion) === normalizedRouteId) || null;
  }

  return null;
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
  if (Number(opinion.publicNumber || 0) > 0) return String(Number(opinion.publicNumber));
  const label = getOpinionAuthorLabel(opinion);
  const match = label.match(/\d+/);
  return match ? match[0] : "";
}

function resolveSelectedTopic(topicPrompt, text) {
  const prompt = topicPrompt.trim();
  const detectedFromPrompt = detectTopic(prompt);
  if (detectedFromPrompt.score > 0) return detectedFromPrompt.id;

  if (prompt && !isHiddenPublicTopicName(prompt)) return findOrCreateTopic(prompt);

  const detectedFromText = detectTopic(text);
  if (detectedFromText.score > 0) return detectedFromText.id;

  return "actualidad";
}

function detectTopic(text) {
  const normalized = normalizeText(text);
  let winner = { id: "actualidad", score: 0 };

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
  if (isHiddenPublicTopicName(name)) return "actualidad";
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

function createTopicSlug(value) {
  return normalizeText(value)
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getTopicSlug(topic) {
  if (!topic) return "";
  return createTopicSlug(topic.id || topic.name);
}

function getTopicBySlug(slug) {
  const normalizedSlug = createTopicSlug(slug || "");
  return getVisibleTopics().find((topic) => {
    return getTopicSlug(topic) === normalizedSlug || createTopicSlug(topic.name) === normalizedSlug;
  });
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
  navigateToView("home");
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
  navigateToView("search");
}

function containsBlockedLink(value) {
  return blockedLinkPattern.test(value);
}

function containsUnsafeContent(value) {
  const normalizedValue = normalizeText(value);
  return unsafeContentTerms.some((term) => normalizedValue.includes(normalizeText(term)));
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
  if (containsUnsafeContent(`${text} ${topic}`)) {
    showFormError(form, "No se puede publicar contenido con datos sensibles, amenazas o material prohibido.");
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

function showView(viewName, options = {}) {
  const { scrollToTop = true } = options;
  clearReplyKeyboardAssist();
  currentView = viewName;
  homeView.classList.toggle("hidden", viewName !== "home");
  aboutView.classList.toggle("hidden", viewName !== "about");
  topicsView.classList.toggle("hidden", viewName !== "topics");
  topicDetailView.classList.toggle("hidden", viewName !== "topicDetail");
  detailView.classList.toggle("hidden", viewName !== "detail");
  searchView.classList.toggle("hidden", viewName !== "search");
  notFoundView?.classList.toggle("hidden", viewName !== "notFound");
  if (viewName === "home") isMainComposerVisible = true;
  updateHeaderNavigation(viewName);
  updateRouteMetadata(viewName);
  closeMobileMenu(false);
  closeFloatingOpinionPanel(false);
  syncUrlForView(viewName);
  updateFloatingOpinionVisibility();
  if (scrollToTop) window.scrollTo({ top: 0, behavior: "smooth" });
  if (pendingScrollRestore !== null) restorePendingScrollPosition();
}

function updateRouteMetadata(viewName) {
  let title = "Quiero Opinar | Opiniones anónimas";
  let description = "Opiniones anónimas, temas de conversación y debates abiertos.";

  if (viewName === "topics") {
    title = "Temas de conversación | Quiero Opinar";
    description = "Explorá las conversaciones por tema.";
  } else if (viewName === "topicDetail") {
    const topic = getTopic(selectedTopicId);
    title = `${topic?.name || "Tema"} | Quiero Opinar`;
    description = topic?.description || "Opiniones de este tema en Quiero Opinar.";
  } else if (viewName === "detail") {
    const opinion = getOpinionByRouteId(selectedOpinionId);
    title = opinion ? `Opinión #${getOpinionNumber(opinion)} | Quiero Opinar` : "Opinión no encontrada | Quiero Opinar";
    description = opinion ? truncateText(opinion.text, 140) : "No encontramos esta opinión.";
  } else if (viewName === "search") {
    title = searchQuery.trim() ? `Resultados para "${searchQuery.trim()}" | Quiero Opinar` : "Buscar | Quiero Opinar";
    description = "Resultados de búsqueda en Quiero Opinar.";
  } else if (viewName === "about") {
    title = "¿Qué es Quiero Opinar?";
    description = "Conocé cómo funciona Quiero Opinar.";
  } else if (viewName === "notFound") {
    title = "Contenido no encontrado | Quiero Opinar";
    description = "No encontramos esa ruta en Quiero Opinar.";
  }

  document.title = title;
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    document.head.append(metaDescription);
  }
  metaDescription.setAttribute("content", description);
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.append(canonical);
  }
  canonical.href = `${window.location.origin}${window.location.pathname}${window.location.search}`;
}

function updateHeaderNavigation(viewName) {
  mainNavButtons.forEach((button) => {
    const isActive = (button.id === "homeNavButton" && viewName === "home") ||
      (button.id === "topicsNavButton" && (viewName === "topics" || viewName === "topicDetail"));
    button.classList.toggle("active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function navigateToView(viewName, options = {}) {
  if (!isRestoringHistory) {
    const currentState = {
      ...(window.history.state || getCurrentNavigationState()),
      ...getCurrentNavigationState(),
      scrollY: window.scrollY,
      modal: null
    };
    window.history.replaceState(currentState, "", window.location.href);

    const nextState = {
      ...getCurrentNavigationState(),
      view: viewName,
      opinionId: null,
      directEntry: false,
      modal: null,
      scrollY: 0
    };
    const nextPath = getPathForNavigation(viewName);
    const currentStateKey = `${currentState.view || "home"}:${currentState.searchQuery || ""}:${currentState.selectedTopicId || ""}`;
    const nextStateKey = `${nextState.view || "home"}:${nextState.searchQuery || ""}:${nextState.selectedTopicId || ""}`;

    if (options.replaceHistory || currentStateKey === nextStateKey) {
      window.history.replaceState(nextState, "", nextPath);
    } else {
      window.history.pushState(nextState, "", nextPath);
    }
  }

  showView(viewName, options);
}

function getPathForNavigation(viewName) {
  if (viewName === "home") return routePaths.home;
  if (viewName === "topics") return routePaths.topics;
  if (viewName === "topicDetail") {
    const topic = getTopic(selectedTopicId);
    return topic ? `${routePaths.topics}/${encodeURIComponent(getTopicSlug(topic))}` : routePaths.topics;
  }
  if (viewName === "about") return routePaths.about;
  if (viewName === "search") {
    const query = searchQuery.trim();
    return query ? `${routePaths.search}?q=${encodeURIComponent(query)}` : routePaths.search;
  }
  return routePaths.home;
}

function syncUrlForView(viewName) {
  if (viewName !== "home") return;
  const url = new URL(window.location.href);
  if (!url.searchParams.has("opinion")) return;
  url.searchParams.delete("opinion");
  const nextState = {
    ...(window.history.state || getCurrentNavigationState()),
    view: "home",
    opinionId: null,
    directEntry: false
  };
  window.history.replaceState(nextState, "", `${url.pathname}${url.search}${url.hash}`);
}

function getPathWithoutOpinion() {
  return getPathForNavigation(currentView);
}

function isCurrentOpinionUrl(opinionId) {
  return getOpinionIdFromLocation() === opinionId;
}

function getOpinionIdFromLocation() {
  const legacyOpinionId = new URLSearchParams(window.location.search).get("opinion");
  if (legacyOpinionId) return legacyOpinionId;
  const match = window.location.pathname.match(/^\/opinion\/([^/?#]+)/i);
  return match ? decodeURIComponent(match[1]) : "";
}

function getCurrentNavigationState() {
  return {
    view: currentView,
    activeTopic,
    selectedTopicId,
    searchQuery,
    scrollY: window.scrollY,
    lastViewBeforeDetail
  };
}

function initializeNavigationState() {
  const routeState = getRouteStateFromLocation();
  const state = {
    ...getCurrentNavigationState(),
    ...routeState,
    directEntry: routeState.view === "detail",
    scrollY: window.scrollY
  };
  applyRouteState(routeState);
  window.history.replaceState(state, "", window.location.href);
}

function getRouteStateFromLocation() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const params = new URLSearchParams(window.location.search);
  const legacyOpinionId = params.get("opinion");
  if (legacyOpinionId) return { view: "detail", opinionId: legacyOpinionId };

  if (path === routePaths.home) return { view: "home", opinionId: null };
  if (path === routePaths.topics) return { view: "topics", opinionId: null };
  if (path.startsWith(`${routePaths.topics}/`)) {
    const slug = decodeURIComponent(path.slice(`${routePaths.topics}/`.length));
    return { view: "topicDetail", topicSlug: slug, opinionId: null };
  }
  if (path.startsWith("/opinion/")) {
    return { view: "detail", opinionId: decodeURIComponent(path.slice("/opinion/".length)) };
  }
  if (path === routePaths.search) {
    return { view: "search", searchQuery: params.get("q") || "", opinionId: null };
  }
  if (path === routePaths.about) return { view: "about", opinionId: null };
  if (path === routePaths.terms) return { view: "terms", modal: "legal", opinionId: null };
  return { view: "notFound", opinionId: null };
}

function applyRouteState(routeState) {
  searchQuery = routeState.searchQuery || "";
  syncSearchInputs(searchQuery);
  selectedOpinionId = routeState.opinionId || null;
  if (routeState.topicSlug) {
    const topic = getTopicBySlug(routeState.topicSlug);
    selectedTopicId = topic?.id || routeState.topicSlug;
    activeTopic = topic?.id || "todos";
  } else if (routeState.view !== "topicDetail") {
    selectedTopicId = null;
  }
  currentView = routeState.view === "terms" ? "home" : routeState.view || "home";
}

function restoreViewFromHistory(state) {
  if (!state) state = getRouteStateFromLocation();

  isRestoringHistory = true;
  closeLegalModal({ fromHistory: true, restoreFocus: false });
  applyRouteState(state);
  activeTopic = state.activeTopic || "todos";
  selectedTopicId = state.selectedTopicId || null;
  searchQuery = state.searchQuery || "";
  if (state.topicSlug) {
    const topic = getTopicBySlug(state.topicSlug);
    selectedTopicId = topic?.id || state.topicSlug;
    activeTopic = topic?.id || "todos";
  }
  if (state.opinionId) selectedOpinionId = state.opinionId;
  lastViewBeforeDetail = state.lastViewBeforeDetail || state.returnState?.view || "home";
  syncSearchInputs(searchQuery);

  if (state.view === "detail" && state.opinionId) {
    selectedOpinionId = state.opinionId;
    render();
    showView("detail", { scrollToTop: false });
  } else {
    selectedOpinionId = null;
    pendingScrollRestore = Number.isFinite(state.scrollY) ? state.scrollY : 0;
    render();
    showView(state.view === "terms" ? "home" : state.view || "home", { scrollToTop: false });
  }

  if (state.modal === "legal" || state.view === "terms") {
    openLegalModal();
  }

  isRestoringHistory = false;
}

function restorePendingScrollPosition() {
  const scrollY = pendingScrollRestore;
  pendingScrollRestore = null;
  window.requestAnimationFrame(() => {
    window.scrollTo({ top: scrollY, behavior: "auto" });
    window.requestAnimationFrame(() => window.scrollTo({ top: scrollY, behavior: "auto" }));
  });
}

function refreshCurrentDetailHistoryState() {
  if (currentView !== "detail" || !selectedOpinionId) return;
  const opinion = getOpinionByRouteId(selectedOpinionId);
  if (!opinion) return;
  const state = window.history.state || {};
  const detailState = {
    ...state,
    view: "detail",
    opinionId: opinion.id,
    returnState: state.returnState || {
      view: lastViewBeforeDetail || "home",
      activeTopic,
      selectedTopicId,
      searchQuery,
      scrollY: 0,
      lastViewBeforeDetail
    },
    directEntry: Boolean(state.directEntry)
  };
  selectedOpinionId = opinion.id;
  window.history.replaceState(detailState, "", getOpinionPath(opinion));
}

function scrollPageToTopAfterLayout() {
  window.requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 220);
  });
}

function showOpinionDetailAfterReply(opinionId, wasDetailView) {
  activeReplyControl?.blur?.();
  activeReplyControl = null;
  clearReplyKeyboardAssist();
  selectedOpinionId = opinionId;

  if (wasDetailView) {
    render();
    showView("detail", { scrollToTop: false });
    refreshCurrentDetailHistoryState();
  } else {
    openOpinion(opinionId, { skipViewUpdate: true });
  }

  scrollPageToTopAfterLayout();
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
  const replyOffset = getEffectiveReplyKeyboardOffset(keyboardOffset);

  document.documentElement.style.setProperty("--visual-viewport-height", `${viewportHeight}px`);
  document.documentElement.style.setProperty("--keyboard-offset", `${keyboardOffset}px`);
  if (activeReplyControl) {
    document.documentElement.style.setProperty("--reply-keyboard-offset", `${replyOffset}px`);
    scheduleActiveReplyControlVisibility();
  }
}

function getEffectiveReplyKeyboardOffset(rawOffset = 0) {
  if (!activeReplyControl || !isMobileViewport()) return 0;
  const fallbackOffset = Math.round(window.innerHeight * 0.44);
  return Math.max(rawOffset, fallbackOffset);
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
  navigateToView("topicDetail");
}

function openOpinion(opinionId, options = {}) {
  const opinion = getOpinionById(opinionId);
  if (!opinion || opinion.hidden) return;

  lastViewBeforeDetail = currentView === "detail" ? lastViewBeforeDetail : currentView;
  const sourceState = getCurrentNavigationState();
  selectedOpinionId = opinionId;

  if (!isRestoringHistory) {
    const detailState = {
      ...sourceState,
      view: "detail",
      opinionId,
      returnState: sourceState,
      directEntry: Boolean(options.directEntry)
    };
    const detailPath = getOpinionPath(opinion);
    if (options.replaceHistory) {
      window.history.replaceState(detailState, "", detailPath);
    } else if (!isCurrentOpinionUrl(opinionId)) {
      window.history.replaceState(sourceState, "", getPathWithoutOpinion());
      window.history.pushState(detailState, "", detailPath);
    } else {
      window.history.replaceState(detailState, "", detailPath);
    }
  }

  if (!options.skipViewUpdate) {
    opinion.views += 1;
    dataStore.updateOpinion(opinion);
  }
  render();
  showView("detail", { scrollToTop: !options.preserveScroll });
}

function getOpinionPath(opinion) {
  const publicId = getOpinionNumber(opinion) || opinion.id;
  return `/opinion/${encodeURIComponent(publicId)}`;
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

async function registerContentActionViaApi(action, contentType, contentId, opinionId, reason = "") {
  const data = await callModerationApi({
    action,
    contentType,
    contentId,
    opinionId,
    reason
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

function askReportReason() {
  if (!reportReasonOverlay || !reportReasonList || !reportReasonSubmit) return Promise.resolve("otro");
  selectedReportReason = "";
  reportReasonSubmit.disabled = true;
  reportReasonList.innerHTML = reportReasonOptions.map((option) => `
    <button class="report-reason-option" type="button" data-reason="${escapeHtml(option.id)}">
      ${escapeHtml(option.label)}
    </button>
  `).join("");

  reportReasonOverlay.classList.remove("hidden");
  reportReasonList.querySelector(".report-reason-option")?.focus();

  return new Promise((resolve) => {
    pendingReportResolver = resolve;
  });
}

function closeReportReasonModal(reason) {
  if (!reportReasonOverlay || reportReasonOverlay.classList.contains("hidden")) return;
  reportReasonOverlay.classList.add("hidden");
  const resolver = pendingReportResolver;
  pendingReportResolver = null;
  selectedReportReason = "";
  if (resolver) resolver(reason);
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

  if (!hasLoadedOpinions && !getVisibleOpinions().length) {
    renderTopicSkeletons();
    return;
  }

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

function createSkeletonElement(className) {
  const item = document.createElement("span");
  item.className = className;
  item.setAttribute("aria-hidden", "true");
  return item;
}

function renderTopicSkeletons() {
  getVisibleTopics().slice(0, 3).forEach((topic) => {
    const button = document.createElement("button");
    button.className = "topic-button topic-button-skeleton";
    button.type = "button";
    button.disabled = true;
    const content = document.createElement("span");
    content.className = "topic-button-content";
    const strong = document.createElement("strong");
    const name = document.createElement("span");
    name.className = "topic-button-name";
    name.textContent = topic.name;
    strong.append(name);
    content.append(strong);
    button.append(content, createSkeletonElement("topic-count skeleton-line short"));
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

function getVisualViewportBounds() {
  const viewport = window.visualViewport;
  const height = viewport?.height || window.innerHeight;
  const offsetTop = viewport?.offsetTop || 0;
  return {
    top: offsetTop,
    bottom: offsetTop + height,
    height
  };
}

function resizeReplyControl(control) {
  if (!control || control.tagName !== "TEXTAREA") return;
  const maxHeight = isMobileViewport() ? 150 : 118;
  control.style.height = "auto";
  const nextHeight = Math.min(Math.max(control.scrollHeight, 40), maxHeight);
  control.style.height = `${nextHeight}px`;
  control.style.overflowY = control.scrollHeight > maxHeight ? "auto" : "hidden";
}

function scheduleActiveReplyControlVisibility() {
  if (!activeReplyControl || !isMobileViewport()) return;
  window.clearTimeout(replyViewportTimer);
  window.requestAnimationFrame(ensureActiveReplyControlVisible);
  window.setTimeout(ensureActiveReplyControlVisible, 90);
  replyViewportTimer = window.setTimeout(ensureActiveReplyControlVisible, 260);
  window.setTimeout(ensureActiveReplyControlVisible, 520);
}

function ensureActiveReplyControlVisible() {
  if (!activeReplyControl || !isMobileViewport()) return;
  const form = activeReplyControl.closest(".reply-form");
  if (!form) return;

  const viewport = getVisualViewportBounds();
  const rect = form.getBoundingClientRect();
  const card = form.closest(".opinion-card");
  const contextRect = card?.getBoundingClientRect() || rect;
  const replyOffset = getEffectiveReplyKeyboardOffset(
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--keyboard-offset")) || 0
  );
  const visibleBottom = Math.min(viewport.bottom, window.innerHeight - replyOffset);
  const topLimit = viewport.top + 82;
  const bottomLimit = Math.max(topLimit + 160, visibleBottom - 28);
  let delta = 0;

  if (rect.bottom > bottomLimit) {
    delta = rect.bottom - bottomLimit;
  } else if (rect.top < topLimit) {
    delta = rect.top - topLimit;
  }

  const contextTopAfterScroll = contextRect.top - delta;
  if (contextTopAfterScroll > topLimit + 24 && rect.bottom <= bottomLimit) {
    delta = contextRect.top - (topLimit + 24);
  }

  if (Math.abs(delta) < 2) return;
  window.scrollBy({ top: delta, behavior: "smooth" });
}

function clearReplyKeyboardAssist() {
  window.clearTimeout(replyViewportTimer);
  activeReplyControl = null;
  document.body.classList.remove("reply-field-focused");
  document.documentElement.style.setProperty("--reply-keyboard-offset", "0px");
}

function renderBoard() {
  boardGrid.innerHTML = "";
  const query = normalizeText(topicSearchInput.value.trim());

  const topicCards = getVisibleTopics()
    .map((topic) => {
      const topicOpinions = getTopicOpinions(topic.id);
      const replyCount = topicOpinions.reduce((total, opinion) => total + opinion.replies.length, 0);
      const lastActivity = getLastTopicActivity(topicOpinions);
      return {
        topic,
        opinionCount: topicOpinions.length,
        replyCount,
        lastActivity,
        lastActivityTime: lastActivity ? new Date(lastActivity).getTime() : 0
      };
    })
    .sort((a, b) => {
      if (b.lastActivityTime !== a.lastActivityTime) return b.lastActivityTime - a.lastActivityTime;
      if (b.opinionCount !== a.opinionCount) return b.opinionCount - a.opinionCount;
      return a.topic.name.localeCompare(b.topic.name, "es");
    });

  const visibleTopics = topicCards.filter(({ topic }) => {
    if (!query) return true;
    return normalizeText(`${topic.name} ${topic.description}`).includes(query);
  });

  if (!visibleTopics.length) {
    const empty = document.createElement("p");
    empty.className = "topic-empty board-empty";
    empty.textContent = "No encontramos temas con esa búsqueda.";
    boardGrid.append(empty);
    return;
  }

  visibleTopics.forEach(({ topic, opinionCount, replyCount, lastActivity }) => {
    const column = document.createElement("article");
    column.className = `board-column ${getTopicAccentClass(topic)}`;
    column.tabIndex = 0;
    column.setAttribute("role", "button");
    column.setAttribute("aria-label", `Abrir tema ${topic.name}`);
    const activityLabel = lastActivity ? `Actividad ${formatRelativeActivity(lastActivity)}` : "Sin actividad todavía";
    column.innerHTML = `
      <div class="board-column-header">
        <div class="board-title-group">
          ${getTopicIconMarkup(topic)}
          <h2>${escapeHtml(topic.name)}</h2>
        </div>
        <span class="board-arrow" aria-hidden="true">${getIconMarkup("arrow")}</span>
      </div>
      <p class="board-description">${escapeHtml(topic.description || "Tema creado por la comunidad")}</p>
      <div class="board-meta">
        <span class="board-stat">${getIconMarkup("message")}<strong>${opinionCount}</strong> ${opinionCount === 1 ? "opinión" : "opiniones"}</span>
        <span class="board-stat">${getIconMarkup("replies")}<strong>${replyCount}</strong> ${replyCount === 1 ? "respuesta" : "respuestas"}</span>
      </div>
      <span class="board-activity">${getIconMarkup("clock")}${activityLabel}</span>
    `;
    column.addEventListener("click", () => openTopic(topic.id));
    column.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openTopic(topic.id);
      }
    });

    boardGrid.append(column);
  });
}
function renderFeed() {
  feedList.innerHTML = "";
  activeTopicPill.textContent = getTopicName(activeTopic);

  const filteredOpinions = getTopicOpinions(activeTopic);

  if (!hasLoadedOpinions && !filteredOpinions.length) {
    renderFeedSkeletons();
    renderDiscovery();
    return;
  }

  if (!filteredOpinions.length) {
    const empty = document.createElement("p");
    empty.className = "opinion-card";
    empty.textContent = "Todavía no hay opiniones en este tema. Podés abrir el primer hilo.";
    feedList.append(empty);
    renderDiscovery();
    return;
  }

  filteredOpinions.forEach((opinion) => {
    feedList.append(createOpinionCard(opinion, false));
  });
  renderDiscovery();
}

function renderFeedSkeletons() {
  for (let index = 0; index < 2; index += 1) {
    const card = document.createElement("article");
    card.className = "opinion-card opinion-skeleton";
    card.setAttribute("aria-label", "Cargando opiniones");
    card.append(
      createSkeletonElement("skeleton-line meta"),
      createSkeletonElement("skeleton-line title"),
      createSkeletonElement("skeleton-line body"),
      createSkeletonElement("skeleton-line body short"),
      createSkeletonElement("skeleton-actions")
    );
    feedList.append(card);
  }
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
  const opinion = getOpinionByRouteId(selectedOpinionId);

  if (!opinion || opinion.hidden) {
    const empty = document.createElement("p");
    empty.className = "opinion-card";
    empty.textContent = "No se encontró esta opinión.";
    detailShell.append(empty);
    return;
  }

  selectedOpinionId = opinion.id;
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
    const reason = await askReportReason();
    if (!reason) return;
    try {
      const result = await registerContentActionViaApi("report", "opinion", opinion.id, opinion.id, reason);
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
      <p class="reply"><strong>Respuesta:</strong> ${escapeHtml(normalizedReply.text)}</p>
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
      const reason = await askReportReason();
      if (!reason) return;
      try {
        const result = await registerContentActionViaApi("report", "reply", normalizedReply.id, opinion.id, reason);
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
  const replyInput = replyForm.querySelector("textarea, input");
  resizeReplyControl(replyInput);
  replyForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const wasDetailView = currentView === "detail";
    const reply = replyInput.value.trim();
    if (!reply) return;
    if (containsBlockedLink(reply)) {
      rejectLinkedContent();
      return;
    }
    if (containsUnsafeContent(reply)) {
      showToast("No se puede publicar contenido con datos sensibles, amenazas o material prohibido.");
      return;
    }

    try {
      const updatedOpinion = await createReplyViaApi(opinion.id, reply);
      Object.assign(opinion, updatedOpinion);
      replyInput.value = "";
      resizeReplyControl(replyInput);
      showOpinionDetailAfterReply(opinion.id, wasDetailView);
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
    { label: "Tendencias ahora", action: () => navigateToView("topics") },
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
  navigateToView("search");
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
  const iconKey = getTopicIconKey(topic);
  return `<span class="topic-icon${sizeClass}" aria-hidden="true">${getIconMarkup(iconKey)}</span>`;
}

function getTopicIconKey(topic) {
  const rawId = normalizeText(topic.id || "").trim();
  const idKey = getTopicNameKey(topic.id);
  const nameKey = getTopicNameKey(topic.name);
  if (topicIconPaths[rawId]) return rawId;
  if (topicIconPaths[idKey]) return idKey;
  if (topicIconPaths[nameKey]) return nameKey;
  if (nameKey.includes("mascota")) return "mascotas";
  if (nameKey.includes("animal")) return "animales";
  if (nameKey.includes("influencer")) return "influencers";
  if (nameKey.includes("sociedad")) return "sociedad";
  if (nameKey.includes("transporte") || nameKey.includes("colectivo") || nameKey.includes("tren")) return "transporte";
  if (nameKey.includes("musica")) return "musica";
  return "generic";
}

function getIconMarkup(iconKey) {
  const paths = topicIconPaths[iconKey] || topicIconPaths.generic;
  return `<svg aria-hidden="true" viewBox="0 0 24 24">${paths}</svg>`;
}

function getTopicAccentClass(topic) {
  return topicAccentClasses[getTopicIconKey(topic)] || topicAccentClasses[topic.id] || "topic-accent-orange";
}

function normalizeReply(reply) {
  if (typeof reply !== "string") {
    return {
      id: reply.id || createId(),
      author: reply.author || "Opinion",
      text: reply.text || "",
      likes: Number(reply.likes || 0),
      reports: Number(reply.reports || 0),
      reportReasons: Array.isArray(reply.reportReasons) ? reply.reportReasons : [],
      moderationStatus: reply.moderationStatus || "approved",
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

function loadCachedArray(key) {
  try {
    const cached = window.localStorage.getItem(key);
    if (!cached) return [];
    const parsed = JSON.parse(cached);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function hydrateInitialContentFromCache() {
  const cachedTopics = loadCachedArray(cachedTopicsKey);
  const cachedOpinions = loadCachedArray(cachedOpinionsKey);
  if (cachedTopics.length) topics = mergeTopics(cachedTopics);
  if (cachedOpinions.length) opinions = cachedOpinions.map(normalizeOpinion);
}

function cacheRemoteContent(nextOpinions) {
  try {
    window.localStorage.setItem(cachedOpinionsKey, JSON.stringify(nextOpinions.slice(0, 60)));
    window.localStorage.setItem(cachedTopicsKey, JSON.stringify(topics));
  } catch {
    // Cache is only a paint-speed helper. Ignore quota/private-mode failures.
  }
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
        cacheRemoteContent(opinions);
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

function isHiddenPublicTopic(topic) {
  return isHiddenPublicTopicName(topic.id) || isHiddenPublicTopicName(topic.name);
}

function isHiddenPublicTopicName(value) {
  return hiddenPublicTopicNames.has(getTopicNameKey(value));
}

function getTopicNameKey(value) {
  return normalizeText(String(value || ""))
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeOpinion(opinion) {
  const detectedTopic = detectTopic(opinion.text || "");
  const normalizedTopic = opinion.topic || "actualidad";

  return {
    id: opinion.id || createId(),
    publicNumber: Number(opinion.publicNumber || 0),
    author: opinion.author || "Opinion",
    topic: normalizedTopic === "sin-tema" ? (detectedTopic.score > 0 ? detectedTopic.id : "actualidad") : normalizedTopic,
    text: opinion.text || "",
    views: Number(opinion.views || 0),
    likes: Number(opinion.likes || 0),
    createdAt: normalizeDateValue(opinion.createdAt),
    replies: Array.isArray(opinion.replies) ? opinion.replies.map(normalizeReply) : [],
    liked: Boolean(opinion.liked),
    hidden: Boolean(opinion.hidden),
    moderationStatus: opinion.moderationStatus || (opinion.hidden ? "hidden" : "approved"),
    moderationReason: opinion.moderationReason || "",
    reportReasons: Array.isArray(opinion.reportReasons) ? opinion.reportReasons : [],
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
    publicNumber: Number(opinion.publicNumber || 0),
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
      reportReasons: Array.isArray(reply.reportReasons) ? reply.reportReasons : [],
      moderationStatus: reply.moderationStatus || "approved",
      createdAt: reply.createdAt
    })),
    hidden: Boolean(opinion.hidden),
    moderationStatus: opinion.moderationStatus || (opinion.hidden ? "hidden" : "approved"),
    moderationReason: opinion.moderationReason || "",
    reportReasons: Array.isArray(opinion.reportReasons) ? opinion.reportReasons : [],
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

function formatRelativeActivity(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const diffMinutes = Math.max(0, Math.round((Date.now() - date.getTime()) / 60000));
  if (diffMinutes < 1) return "recién";
  if (diffMinutes < 60) return `hace ${diffMinutes} min`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `hace ${diffHours} h`;

  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 7) return `hace ${diffDays} d`;

  return formatDate(value);
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
  const routeOpinionId = selectedOpinionId || getOpinionIdFromLocation();
  if (!routeOpinionId) {
    hasHandledInitialOpinion = true;
    return;
  }
  const opinion = getOpinionByRouteId(routeOpinionId);
  if (opinion && !opinion.hidden) {
    hasHandledInitialOpinion = true;
    openOpinion(opinion.id, { replaceHistory: true, directEntry: true });
    return;
  }

  hasHandledInitialOpinion = true;
  syncUrlForView(currentView);
}

async function initializeAppData() {
  resetPersistedContentIfNeeded();
  initializeNavigationState();
  setupViewportMetrics();
  showView(currentView === "terms" ? "home" : currentView, { scrollToTop: false });
  if (window.history.state?.modal === "legal") openLegalModal();
  render();
  setupComposerVisibilityObserver();
  updateFloatingOpinionVisibility();

  try {
    dataStore = await createFirebaseDataStore();
    await dataStore.subscribe(() => render());
  } catch (error) {
    console.warn("No se pudo conectar Firebase. Usando almacenamiento local.", error);
    dataStore = createLocalDataStore();
    await dataStore.subscribe(() => render());
  }

  updateFloatingOpinionVisibility();
  render();
  window.setInterval(renderTopics, trendingRefreshHours * 60 * 60 * 1000);
}

initializeAppData();
