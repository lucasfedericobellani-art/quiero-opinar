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

const SITE_URL = window.QO_SITE_CONFIG?.siteUrl || "https://www.quieroopinar.com";
const previewSandboxEnabled = Boolean(window.QO_SITE_CONFIG?.previewSandbox);
const minDisplayedActivity = 13;
const activityRefreshMs = 60000;
const activityWindowMinutes = 30;
const hotTopicLimit = 4;
const hotTopicWindowHours = 6;
const hotTopicMinScore = 4;
const quoteMinLength = 8;
const quoteMaxLength = 280;

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
  contact: "/contacto",
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
  television: '<rect x="4" y="6" width="16" height="11" rx="2"></rect><path d="m9 3 3 3 3-3"></path><path d="M8 21h8"></path><path d="M12 17v4"></path>',
  vida: '<path d="M20.8 8.6c0 5.4-8.8 10.4-8.8 10.4S3.2 14 3.2 8.6A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.4z"></path><path d="M8 12h2.2l1.1-2.4 1.7 5 1.2-2.6H16"></path>',
  comida: '<path d="M6 3v7"></path><path d="M10 3v7"></path><path d="M6 7h4"></path><path d="M8 10v11"></path><path d="M17 3c-1.7 1.5-2.5 3.6-2.5 6.2 0 2.5.9 4 2.5 4.6V21"></path>',
  mma: '<path d="M8 4.5h6.2c2.1 0 3.8 1.7 3.8 3.8v3.2c0 1.4-.7 2.7-1.9 3.4L13 16.8V20H8.8v-3.5l-2.7-1.8A4.5 4.5 0 0 1 4 10.9V8.5a4 4 0 0 1 4-4z"></path><path d="M8 4.5V10"></path><path d="M11 4.5V10"></path><path d="M14 4.7V10"></path><path d="M7 13h6"></path>',
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
  transporte: "topic-accent-steel",
  television: "topic-accent-blue",
  vida: "topic-accent-red",
  comida: "topic-accent-gold",
  mma: "topic-accent-red"
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
const activityIndicator = document.querySelector("#activityIndicator");
const activityIndicatorText = document.querySelector("#activityIndicatorText");
const searchInputs = document.querySelectorAll(".search-input");
const legalOverlay = document.querySelector("#legalOverlay");
const legalModal = document.querySelector(".legal-modal");
const legalOpenButton = document.querySelector("#legalOpenButton");
const legalTitle = document.querySelector("#legalTitle");
const legalCloseButton = document.querySelector("#legalCloseButton");
const legalTriggers = document.querySelectorAll(".legal-trigger");
const aboutFooterButton = document.querySelector("#aboutFooterButton");
const contactFooterButton = document.querySelector("#contactFooterButton");
const homeView = document.querySelector("#homeView");
const aboutView = document.querySelector("#aboutView");
const topicsView = document.querySelector("#topicsView");
const topicDetailView = document.querySelector("#topicDetailView");
const detailView = document.querySelector("#detailView");
const searchView = document.querySelector("#searchView");
const contactView = document.querySelector("#contactView");
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
const contactForm = document.querySelector("#contactForm");
const contactName = document.querySelector("#contactName");
const contactEmail = document.querySelector("#contactEmail");
const contactMessage = document.querySelector("#contactMessage");
const contactStatus = document.querySelector("#contactStatus");
const contactThanks = document.querySelector("#contactThanks");
const contactShell = document.querySelector(".contact-shell");
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
let displayedActivityCache = {
  value: minDisplayedActivity,
  updatedAt: 0
};
let quoteSelectionButton = null;

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

  closeReplyActionMenus();

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

document.addEventListener("selectionchange", () => {
  if (!quoteSelectionButton || quoteSelectionButton.classList.contains("hidden")) return;
  const selection = window.getSelection?.();
  if (!selection || selection.isCollapsed || !selection.toString().trim()) hideQuoteSelectionButton();
});

document.addEventListener("mouseup", showQuoteActionForSelection);
document.addEventListener("touchend", () => window.setTimeout(showQuoteActionForSelection, 120), { passive: true });

function showQuoteActionForSelection() {
  const selection = window.getSelection?.();
  const selectedText = normalizeQuoteText(selection?.toString() || "");
  if (!selection || selectedText.length < quoteMinLength) {
    hideQuoteSelectionButton();
    return;
  }

  const range = selection.rangeCount ? selection.getRangeAt(0) : null;
  const container = range?.commonAncestorContainer?.nodeType === Node.TEXT_NODE
    ? range.commonAncestorContainer.parentElement
    : range?.commonAncestorContainer;
  const quoteSource = container?.closest?.(".quotable-text");
  const card = quoteSource?.closest?.(".opinion-card");
  if (!quoteSource || !card || !quoteSource.contains(selection.anchorNode) || !quoteSource.contains(selection.focusNode)) {
    hideQuoteSelectionButton();
    return;
  }

  const sourceText = quoteSource.textContent;
  const quote = createQuotePayload(quoteSource.dataset.quoteSourceType, quoteSource.dataset.quoteSourceId, sourceText, selectedText);
  if (!quote) {
    hideQuoteSelectionButton();
    return;
  }

  const button = ensureQuoteSelectionButton();
  const rect = range.getBoundingClientRect();
  button.onclick = (event) => {
    event.preventDefault();
    quoteIntoReplyForm(card, quote);
    window.getSelection()?.removeAllRanges();
    hideQuoteSelectionButton();
  };
  button.style.left = `${Math.min(window.innerWidth - 86, Math.max(12, rect.left + rect.width / 2 - 32))}px`;
  button.style.top = `${Math.max(12, rect.top + window.scrollY - 44)}px`;
  button.classList.remove("hidden");
}

topicsNavButton.addEventListener("click", () => {
  navigateToView("topics");
  closeMobileMenu(false);
});

aboutNavButton?.addEventListener("click", () => {
  navigateToView("about");
  closeMobileMenu(false);
});

aboutFooterButton?.addEventListener("click", () => navigateToView("about"));
contactFooterButton?.addEventListener("click", (event) => {
  event.preventDefault();
  navigateToView("contact");
});

aboutTopicsButton?.addEventListener("click", () => navigateToView("topics"));
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
  if (!event.target.closest?.(".reply-action-menu")) closeReplyActionMenus();
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

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  await submitContactForm();
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
  canonical.href = `${SITE_URL}${routePaths.terms}`;
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

function createReply(text, likes = 0, createdAt = new Date().toISOString(), reports = 0, quote = null) {
  return {
    id: createId(),
    author: "Opinion",
    text,
    likes,
    dislikes: 0,
    reports,
    createdAt,
    quote,
    liked: false,
    disliked: false
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

function getRecentActivitySignals(sourceOpinions = getVisibleOpinions(), now = Date.now(), windowMinutes = activityWindowMinutes) {
  const windowStart = now - windowMinutes * 60 * 1000;
  return sourceOpinions.reduce((total, opinion) => {
    const opinionTime = new Date(opinion.createdAt).getTime();
    const opinionSignal = Number.isFinite(opinionTime) && opinionTime >= windowStart ? 1 : 0;
    const replySignals = opinion.replies.reduce((replyTotal, reply) => {
      const replyTime = new Date(normalizeReply(reply).createdAt).getTime();
      return replyTotal + (Number.isFinite(replyTime) && replyTime >= windowStart ? 1 : 0);
    }, 0);
    return total + opinionSignal + replySignals;
  }, 0);
}

function getDisplayedActiveUsers(realActivity, previousValue = minDisplayedActivity) {
  const safeActivity = Number.isFinite(realActivity) ? Math.max(0, realActivity) : 0;
  const baseValue = Math.max(minDisplayedActivity, safeActivity + 12);
  const maxStep = safeActivity > previousValue ? 6 : 3;
  if (!Number.isFinite(previousValue)) return baseValue;
  if (Math.abs(baseValue - previousValue) <= maxStep) return baseValue;
  return previousValue + Math.sign(baseValue - previousValue) * maxStep;
}

function updateActivityIndicator(now = Date.now()) {
  if (!activityIndicator || !activityIndicatorText) return;
  if (displayedActivityCache.updatedAt && now - displayedActivityCache.updatedAt < activityRefreshMs) return;
  const realActivity = getRecentActivitySignals(getVisibleOpinions(), now);
  displayedActivityCache.value = getDisplayedActiveUsers(realActivity, displayedActivityCache.value);
  displayedActivityCache.updatedAt = now;
  const noun = isMobileViewport() ? "" : " personas";
  activityIndicatorText.textContent = `${displayedActivityCache.value}${noun} opinando ahora`;
}

function getHotTopicScore(topicStats, now = Date.now()) {
  const recentWindowStart = now - hotTopicWindowHours * 60 * 60 * 1000;
  const recentOpinionCount = topicStats.topicOpinions.filter((opinion) => {
    const createdAt = new Date(opinion.createdAt).getTime();
    return Number.isFinite(createdAt) && createdAt >= recentWindowStart;
  }).length;
  const recentReplyCount = topicStats.topicOpinions.reduce((total, opinion) => {
    return total + opinion.replies.filter((reply) => {
      const createdAt = new Date(normalizeReply(reply).createdAt).getTime();
      return Number.isFinite(createdAt) && createdAt >= recentWindowStart;
    }).length;
  }, 0);
  const totalActivity = Math.max(1, topicStats.opinionCount + topicStats.replyCount);
  const velocity = (recentOpinionCount * 2.4 + recentReplyCount * 1.4) / Math.sqrt(totalActivity);
  const freshness = topicStats.lastActivityTime && topicStats.lastActivityTime >= recentWindowStart ? 2 : 0;
  return Number((velocity + freshness).toFixed(2));
}

function getHotTopicMap(topicStatsList, now = Date.now()) {
  const hotTopics = topicStatsList
    .map((stats) => ({ ...stats, hotScore: getHotTopicScore(stats, now) }))
    .filter((stats) => stats.hotScore >= hotTopicMinScore)
    .sort((a, b) => b.hotScore - a.hotScore || b.lastActivityTime - a.lastActivityTime)
    .slice(0, hotTopicLimit);
  return new Map(hotTopics.map((stats, index) => [stats.topic.id, { rank: index + 1, score: stats.hotScore }]));
}

function normalizeQuoteText(value) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, quoteMaxLength);
}

function sourceContainsQuote(sourceText, quoteText, minLength = quoteMinLength) {
  const source = normalizeText(sourceText).replace(/\s+/g, " ");
  const quote = normalizeText(quoteText).replace(/\s+/g, " ");
  return quote.length >= minLength && source.includes(quote);
}

function createQuotePayload(sourceType, sourceId, sourceText, selectedText = "") {
  const fallbackText = normalizeQuoteText(sourceText);
  const selectedQuote = normalizeQuoteText(selectedText);
  const quoteText = selectedQuote || fallbackText.slice(0, quoteMaxLength).trim();
  const minLength = selectedQuote ? quoteMinLength : 1;
  if (!sourceContainsQuote(sourceText, quoteText, minLength)) return null;
  return {
    quotedText: quoteText,
    quotedSourceId: sourceId,
    quotedSourceType: sourceType === "reply" ? "reply" : "opinion"
  };
}

function shouldShowReplyQuote(opinion, reply, replyIndex) {
  return Boolean(normalizeQuoteRecord(reply.quote));
}

function renderQuoteContextText(quoteText) {
  return `\u21b3 Respondiendo a \u201c${quoteText}\u201d`;
}

function renderQuoteMarkup(quote) {
  const normalizedQuote = normalizeQuoteRecord(quote);
  if (!normalizedQuote) return "";
  const contextText = renderQuoteContextText(normalizedQuote.quotedText);
  return `
    <button class="reply-quote" type="button" aria-expanded="false" data-quote-source-type="${escapeHtml(normalizedQuote.quotedSourceType)}" data-quote-source-id="${escapeHtml(normalizedQuote.quotedSourceId)}" title="${escapeHtml(normalizedQuote.quotedText)}">
      <span>${escapeHtml(contextText)}</span>
    </button>
  `;
}

function getSelectedQuoteText(container) {
  const selection = window.getSelection?.();
  if (!selection || selection.isCollapsed || !selection.toString().trim()) return "";
  if (!container.contains(selection.anchorNode) || !container.contains(selection.focusNode)) return "";
  return selection.toString();
}

function setReplyQuote(replyForm, quote) {
  const normalizedQuote = normalizeQuoteRecord(quote);
  replyForm._pendingQuote = normalizedQuote;
  const preview = replyForm.querySelector(".reply-quote-preview");
  const previewText = preview?.querySelector(".reply-quote-preview-text");
  if (!preview || !previewText) return;
  if (!normalizedQuote) {
    preview.classList.add("hidden");
    previewText.textContent = "";
    return;
  }
  previewText.textContent = renderQuoteContextText(normalizedQuote.quotedText);
  previewText.title = normalizedQuote.quotedText;
  preview.classList.remove("hidden");
}

function quoteIntoReplyForm(card, quote) {
  const replyForm = card.querySelector(".reply-form");
  const replyInput = replyForm?.querySelector("textarea, input");
  if (!replyForm || !replyInput || !quote) return;
  setReplyQuote(replyForm, quote);
  replyInput.focus();
  resizeReplyControl(replyInput);
  showToast("Cita agregada a la respuesta");
}

function closeReplyActionMenus(exceptMenu = null) {
  document.querySelectorAll(".reply-action-menu[open]").forEach((menu) => {
    if (menu === exceptMenu) return;
    menu.removeAttribute("open");
    menu.querySelector(".reply-menu-button")?.setAttribute("aria-expanded", "false");
  });
}

function highlightThreadTarget(target) {
  if (!target) return;
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
  target.classList.add("thread-target-highlight");
  window.setTimeout(() => {
    target.classList.remove("thread-target-highlight");
  }, 1500);
}

function getReplyTargetSelector(replyId) {
  if (window.CSS?.escape) return `.reply-item[data-reply-id="${CSS.escape(replyId)}"]`;
  return `.reply-item[data-reply-id="${String(replyId).replaceAll('"', '\\"')}"]`;
}

function handleReplyQuoteClick(event) {
  const quoteButton = event.currentTarget;
  const card = quoteButton.closest(".opinion-card");
  const sourceType = quoteButton.dataset.quoteSourceType;
  const sourceId = quoteButton.dataset.quoteSourceId;
  const target = sourceType === "reply"
    ? card?.querySelector(getReplyTargetSelector(sourceId))
    : card?.querySelector(".open-opinion");
  if (target) {
    quoteButton.setAttribute("aria-expanded", "false");
    quoteButton.classList.remove("is-expanded");
    highlightThreadTarget(target);
    return;
  }
  const expanded = quoteButton.classList.toggle("is-expanded");
  quoteButton.setAttribute("aria-expanded", String(expanded));
}

function ensureQuoteSelectionButton() {
  if (quoteSelectionButton) return quoteSelectionButton;
  quoteSelectionButton = document.createElement("button");
  quoteSelectionButton.type = "button";
  quoteSelectionButton.className = "quote-selection-button hidden";
  quoteSelectionButton.textContent = "Citar";
  quoteSelectionButton.setAttribute("aria-label", "Citar texto seleccionado");
  document.body.append(quoteSelectionButton);
  return quoteSelectionButton;
}

function hideQuoteSelectionButton() {
  quoteSelectionButton?.classList.add("hidden");
  quoteSelectionButton?.removeAttribute("data-card-id");
}

function getOpinionActivityTime(opinion) {
  const timestamps = [
    new Date(opinion.createdAt).getTime(),
    ...opinion.replies.map((reply) => new Date(normalizeReply(reply).createdAt).getTime())
  ].filter((timestamp) => Number.isFinite(timestamp));
  return timestamps.length ? Math.max(...timestamps) : 0;
}

function getTopicPreviewOpinion(topicOpinions) {
  const candidates = topicOpinions
    .filter((opinion) => opinion && !opinion.hidden && String(opinion.text || "").trim())
    .map((opinion) => ({
      opinion,
      activityTime: getOpinionActivityTime(opinion),
      replyCount: Array.isArray(opinion.replies) ? opinion.replies.length : 0
    }));

  const withReplies = candidates
    .filter((item) => item.replyCount > 0)
    .sort((a, b) => b.activityTime - a.activityTime)[0];
  return (withReplies || candidates.sort((a, b) => b.activityTime - a.activityTime)[0])?.opinion || null;
}

function getTopicActivityBadge(topicStats, now = Date.now()) {
  if (!topicStats.lastActivityTime) return "";
  const minutesSinceActivity = (now - topicStats.lastActivityTime) / 60000;
  if (minutesSinceActivity <= 60) return "Activo ahora";
  if (topicStats.recentReplyCount >= 3) return "Debate activo";
  if (topicStats.recentOpinionCount >= 2) return "Conversacion creciendo";
  return "";
}

function getTopicRankingScore(topicStats) {
  // Score estable: combina actividad reciente, respuestas recientes y volumen sin dejar que una sola accion domine.
  const hoursSinceActivity = topicStats.lastActivityTime ? Math.max(0, (Date.now() - topicStats.lastActivityTime) / 3600000) : 999;
  const recentActivityWeight = Math.max(0, 48 - hoursSinceActivity) * 2;
  const recentRepliesWeight = topicStats.recentReplyCount * 18;
  const recentOpinionsWeight = topicStats.recentOpinionCount * 12;
  const conversationWeight = Math.min(topicStats.replyCount * 2 + topicStats.opinionCount, 80);
  const editorialBoost = topicStats.topic.id === "actualidad" || topicStats.topic.id === "sociedad" ? 6 : 0;
  return recentActivityWeight + recentRepliesWeight + recentOpinionsWeight + conversationWeight + editorialBoost;
}

function getTopicStats(topic, topicOpinions, now = Date.now()) {
  const recentWindowStart = now - 24 * 60 * 60 * 1000;
  const replyCount = topicOpinions.reduce((total, opinion) => total + opinion.replies.length, 0);
  const lastActivityTime = topicOpinions.reduce((latest, opinion) => Math.max(latest, getOpinionActivityTime(opinion)), 0);
  const recentOpinionCount = topicOpinions.filter((opinion) => new Date(opinion.createdAt).getTime() >= recentWindowStart).length;
  const recentReplyCount = topicOpinions.reduce((total, opinion) => {
    return total + opinion.replies.filter((reply) => new Date(normalizeReply(reply).createdAt).getTime() >= recentWindowStart).length;
  }, 0);
  const previewOpinion = getTopicPreviewOpinion(topicOpinions);
  const stats = {
    topic,
    topicOpinions,
    opinionCount: topicOpinions.length,
    replyCount,
    recentOpinionCount,
    recentReplyCount,
    lastActivity: lastActivityTime ? new Date(lastActivityTime).toISOString() : "",
    lastActivityTime,
    previewOpinion
  };
  stats.activityBadge = getTopicActivityBadge(stats, now);
  stats.score = getTopicRankingScore(stats);
  return stats;
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

async function submitContactForm() {
  const message = contactMessage?.value.trim() || "";
  if (!message) {
    contactMessage?.focus();
    return;
  }

  const name = contactName?.value.trim() || "Sin nombre";
  const email = contactEmail?.value.trim() || "Sin email informado";
  const submitButton = contactForm?.querySelector('button[type="submit"]');
  const originalText = submitButton?.textContent || "Enviar consulta";

  if (contactStatus) {
    contactStatus.textContent = "";
    contactStatus.classList.add("hidden");
    contactStatus.classList.remove("is-success");
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";
  }

  try {
    if (!previewSandboxEnabled) {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok || result.skipped) {
        throw new Error(result.error || result.reason || "send_failed");
      }
    }

    contactForm?.reset();
    contactForm?.classList.add("hidden");
    contactThanks?.classList.remove("hidden");
    contactShell?.classList.add("is-sent");
  } catch (error) {
    if (contactStatus) {
      contactStatus.textContent = "No se pudo enviar la consulta. Probá nuevamente en unos minutos.";
      contactStatus.classList.remove("hidden");
      contactStatus.classList.remove("is-success");
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }
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
  contactView?.classList.toggle("hidden", viewName !== "contact");
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
  } else if (viewName === "contact") {
    title = "Contacto | Quiero Opinar";
    description = "Envia consultas, sugerencias o pedidos de revision a Quiero Opinar.";
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
  canonical.href = getCanonicalUrl(window.location.pathname, window.location.search);
  upsertMetaAttribute("property", "og:title", title);
  upsertMetaAttribute("property", "og:description", description);
  upsertMetaAttribute("property", "og:url", canonical.href);
  upsertMetaAttribute("property", "og:type", "website");
  upsertMetaAttribute("name", "twitter:card", "summary");
  upsertMetaAttribute("name", "twitter:title", title);
  upsertMetaAttribute("name", "twitter:description", description);
}

function getCanonicalUrl(pathname = window.location.pathname, search = "") {
  return `${SITE_URL}${pathname || "/"}${search || ""}`;
}

function upsertMetaAttribute(attributeName, attributeValue, content) {
  let tag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attributeName, attributeValue);
    document.head.append(tag);
  }
  tag.setAttribute("content", content);
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
  if (viewName === "contact") return routePaths.contact;
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
  if (path === routePaths.contact) return { view: "contact", opinionId: null };
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
  return `${SITE_URL}${getOpinionPath(opinion)}`;
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
  if (previewSandboxEnabled) {
    const error = new Error("El preview usa datos locales de prueba.");
    error.code = "preview_sandbox";
    throw error;
  }
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
  if (previewSandboxEnabled) {
    const opinion = normalizeOpinion({
      id: createId(),
      publicNumber: opinions.length + 1,
      author: createAnonymousId(),
      topic: selectedTopic,
      text,
      views: 1,
      likes: 0,
      dislikes: 0,
      createdAt: new Date().toISOString(),
      replies: [],
      hidden: false,
      moderationStatus: "approved",
      reportReasons: [],
      reports: 0,
      shares: 0,
      ip: ""
    });
    if (topicRecord && selectedTopic !== "todos") topics = mergeTopics([topicRecord]);
    return opinion;
  }
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

async function createReplyViaApi(opinionId, text, quote = null) {
  if (previewSandboxEnabled) {
    const opinion = opinions.find((item) => item.id === opinionId);
    if (!opinion) throw new Error("No se encontro la opinion.");
    opinion.replies.push(createReply(text, 0, new Date().toISOString(), 0, normalizeQuoteRecord(quote)));
    opinion.views += 1;
    await dataStore.updateOpinion(opinion);
    return normalizeOpinion(opinion);
  }
  const data = await callModerationApi({
    action: "createReply",
    opinionId,
    text,
    quote
  });

  return normalizeOpinion(data.opinion);
}

async function registerContentActionViaApi(action, contentType, contentId, opinionId, reason = "") {
  if (previewSandboxEnabled) {
    const opinion = opinions.find((item) => item.id === opinionId);
    if (!opinion) throw new Error("No se encontro el contenido.");
    const target = contentType === "reply" ? opinion.replies.find((reply) => reply.id === contentId) : opinion;
    if (!target) throw new Error("No se encontro el contenido.");
    if (action === "like") target.likes = Math.max(0, Number(target.likes || 0) + 1);
    if (action === "dislike") target.dislikes = Math.max(0, Number(target.dislikes || 0) + 1);
    if (action === "report") {
      target.reports = Math.max(0, Number(target.reports || 0) + 1);
      target.reportReasons = [...(target.reportReasons || []), { reason, createdAt: new Date().toISOString() }];
    }
    await dataStore.updateOpinion(opinion);
    return { opinion: normalizeOpinion(opinion), active: true };
  }
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
  if (action === "dislike" && contentType === "opinion") {
    opinion.disliked = Boolean(data.active);
  }
  if (action === "like" && contentType === "reply") {
    const reply = opinion.replies.find((item) => item.id === contentId);
    if (reply) reply.liked = Boolean(data.active);
  }
  if (action === "dislike" && contentType === "reply") {
    const reply = opinion.replies.find((item) => item.id === contentId);
    if (reply) reply.disliked = Boolean(data.active);
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
  updateActivityIndicator();

  if (!hasLoadedOpinions && !getVisibleOpinions().length) {
    renderTopicSkeletons();
    return;
  }

  const now = Date.now();
  const topicStats = getVisibleTopics().map((topic) => getTopicStats(topic, getTopicOpinions(topic.id), now));
  const hotTopicMap = getHotTopicMap(topicStats, now);
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
    const hotTopic = hotTopicMap.get(topic.id);
    if (hotTopic) {
      const hot = document.createElement("span");
      hot.className = "topic-hot-chip";
      hot.textContent = "En tendencia";
      content.append(hot);
    }
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
  const now = Date.now();
  const opinionsByTopic = new Map();
  getVisibleOpinions().forEach((opinion) => {
    if (!opinionsByTopic.has(opinion.topic)) opinionsByTopic.set(opinion.topic, []);
    opinionsByTopic.get(opinion.topic).push(opinion);
  });

  const topicCards = getVisibleTopics()
    .map((topic) => getTopicStats(topic, opinionsByTopic.get(topic.id) || [], now))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.lastActivityTime !== a.lastActivityTime) return b.lastActivityTime - a.lastActivityTime;
      if (b.opinionCount !== a.opinionCount) return b.opinionCount - a.opinionCount;
      return a.topic.name.localeCompare(b.topic.name, "es");
    });

  const visibleTopics = topicCards.filter(({ topic, previewOpinion }) => {
    if (!query) return true;
    return normalizeText(`${topic.name} ${topic.description} ${previewOpinion?.text || ""}`).includes(query);
  });

  if (!visibleTopics.length) {
    const empty = document.createElement("p");
    empty.className = "topic-empty board-empty";
    empty.textContent = "No encontramos temas con esa busqueda.";
    boardGrid.append(empty);
    return;
  }

  const hotTopicMap = getHotTopicMap(topicCards, now);

  visibleTopics.forEach(({ topic, opinionCount, replyCount, recentOpinionCount, recentReplyCount, lastActivity, previewOpinion, activityBadge }) => {
    const hotTopic = hotTopicMap.get(topic.id);
    const column = document.createElement("a");
    column.className = `board-column ${getTopicAccentClass(topic)}${previewOpinion ? "" : " is-empty-topic"}${hotTopic ? " is-hot-topic" : ""}`;
    column.href = `${routePaths.topics}/${encodeURIComponent(getTopicSlug(topic))}`;
    const opinionLabel = `${opinionCount} ${opinionCount === 1 ? "opinion" : "opiniones"}`;
    const replyLabel = `${replyCount} ${replyCount === 1 ? "respuesta" : "respuestas"}`;
    const activityLabel = lastActivity ? `Actividad ${formatRelativeActivity(lastActivity)}` : "Sin actividad todavia";
    column.setAttribute("aria-label", `Abrir tema ${topic.name}. ${opinionLabel}, ${replyLabel}. ${activityLabel}.`);
    const previewLabel = previewOpinion ? "Ultima opinion" : "Todavia no hay opiniones";
    const previewText = previewOpinion?.text || topic.description || "Tema creado por la comunidad";
    column.innerHTML = `
      <div class="board-column-header">
        <div class="board-title-group">
          ${getTopicIconMarkup(topic)}
          <div class="board-title-copy">
            <div class="board-title-line">
              <h2>${escapeHtml(topic.name)}</h2>
              ${activityBadge ? `<span class="board-activity-badge">${escapeHtml(activityBadge)}</span>` : ""}
              ${hotTopic ? `<span class="board-hot-badge">En tendencia</span>` : ""}
            </div>
          </div>
        </div>
        <span class="board-arrow" aria-hidden="true">${getIconMarkup("arrow")}</span>
      </div>
      <div class="board-preview">
        <span class="board-preview-label">${escapeHtml(previewLabel)}</span>
        <p>${escapeHtml(previewText)}</p>
        ${previewOpinion ? "" : `<span class="board-empty-cta">Abri el debate ${getIconMarkup("arrow")}</span>`}
      </div>
      <div class="board-meta">
        <span class="board-stat">${getIconMarkup("message")}<strong>${opinionCount}</strong> ${opinionCount === 1 ? "opinion" : "opiniones"}</span>
        <span class="board-stat">${getIconMarkup("replies")}<strong>${replyCount}</strong> ${replyCount === 1 ? "respuesta" : "respuestas"}</span>
        ${hotTopic ? `<span class="board-stat hot-topic-stat"><strong>+${recentOpinionCount + recentReplyCount}</strong> ultimas ${hotTopicWindowHours} h</span>` : ""}
      </div>
      <span class="board-activity">${getIconMarkup("clock")}${activityLabel}</span>
    `;
    column.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      openTopic(topic.id);
    });

    boardGrid.append(column);
  });
}
function renderFeed() {
  feedList.innerHTML = "";
  activeTopicPill.textContent = getTopicName(activeTopic);
  updateActivityIndicator();

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

function createReplyElement(opinion, normalizedReply, replyIndex) {
  const item = document.createElement("div");
  item.className = "reply-item";
  item.dataset.replyId = normalizedReply.id;
  const fullReplyDate = formatFullDate(normalizedReply.createdAt);
  const quoteMarkup = shouldShowReplyQuote(opinion, normalizedReply, replyIndex) ? renderQuoteMarkup(normalizedReply.quote) : "";
  item.innerHTML = `
    ${quoteMarkup}
    <p class="reply-content quotable-text" data-quote-source-type="reply" data-quote-source-id="${escapeHtml(normalizedReply.id)}">${escapeHtml(normalizedReply.text)}</p>
    <div class="reply-actions">
      <button class="like-button${normalizedReply.liked ? " liked" : ""}" type="button" aria-label="Me gusta respuesta">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M20.8 8.6c0 5.4-8.8 10.4-8.8 10.4S3.2 14 3.2 8.6A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.4z"></path>
        </svg>
        <span>${normalizedReply.likes}</span>
      </button>
      <button class="dislike-button${normalizedReply.disliked ? " disliked" : ""}" type="button" aria-label="No me gusta respuesta">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M10 15v4.5a2.5 2.5 0 0 0 4.5 1.5L19 14V4H7.6a2 2 0 0 0-1.9 1.4L3.2 13A2 2 0 0 0 5.1 15H10z"></path>
          <path d="M19 4h2v10h-2"></path>
        </svg>
        <span>${normalizedReply.dislikes}</span>
      </button>
      <details class="reply-action-menu">
        <summary class="reply-menu-button" aria-label="Más acciones de respuesta" aria-expanded="false" title="Más acciones">
          <span aria-hidden="true">...</span>
        </summary>
        <div class="reply-menu-popover" role="menu">
          <button class="reply-menu-item quote-button" type="button" role="menuitem">Responder citando</button>
          <button class="reply-menu-item report-button" type="button" role="menuitem">Reportar</button>
        </div>
      </details>
      <span class="date-stamp reply-date" title="${escapeHtml(fullReplyDate)}" aria-label="${escapeHtml(fullReplyDate)}">${formatRelativeDate(normalizedReply.createdAt)}</span>
    </div>
  `;

  item.querySelector(".reply-quote")?.addEventListener("click", (event) => {
    event.stopPropagation();
    handleReplyQuoteClick(event);
  });

  const actionMenu = item.querySelector(".reply-action-menu");
  actionMenu?.addEventListener("toggle", () => {
    actionMenu.querySelector(".reply-menu-button")?.setAttribute("aria-expanded", String(actionMenu.open));
    if (actionMenu.open) closeReplyActionMenus(actionMenu);
  });
  actionMenu?.addEventListener("click", (event) => event.stopPropagation());

  item.querySelector(".quote-button").addEventListener("click", (event) => {
    event.stopPropagation();
    closeReplyActionMenus();
    const quote = createQuotePayload("reply", normalizedReply.id, normalizedReply.text, getSelectedQuoteText(item));
    quoteIntoReplyForm(item.closest(".opinion-card"), quote);
  });

  item.querySelector(".like-button").addEventListener("click", async (event) => {
    event.stopPropagation();
    try {
      const result = await registerContentActionViaApi("like", "reply", normalizedReply.id, opinion.id);
      Object.assign(opinion, result.opinion);
      render();
      showToast(result.active ? "Me gusta guardado" : "Me gusta quitado");
    } catch (error) {
      showToast(getApiErrorMessage(error, "No se pudo guardar el me gusta."));
    }
  });

  item.querySelector(".dislike-button").addEventListener("click", async (event) => {
    event.stopPropagation();
    try {
      const result = await registerContentActionViaApi("dislike", "reply", normalizedReply.id, opinion.id);
      Object.assign(opinion, result.opinion);
      render();
      showToast(result.active ? "No me gusta guardado" : "No me gusta quitado");
    } catch (error) {
      showToast(getApiErrorMessage(error, "No se pudo guardar el no me gusta."));
    }
  });

  item.querySelector(".report-button").addEventListener("click", async (event) => {
    event.stopPropagation();
    closeReplyActionMenus();
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

  return item;
}

function renderReplyThread(thread, opinion) {
  thread.innerHTML = "";
  opinion.replies.forEach((reply, index) => {
    const normalizedReply = normalizeReply(reply);
    opinion.replies[index] = normalizedReply;
    thread.append(createReplyElement(opinion, normalizedReply, index));
  });
}

function createOpinionCard(opinion, isDetail) {
  const card = opinionTemplate.content.firstElementChild.cloneNode(true);
  card.dataset.opinionId = opinion.id;
  card.querySelector(".author").textContent = `#${getOpinionNumber(opinion)}`;
  card.querySelector(".topic").textContent = getTopicName(opinion.topic);
  card.querySelector(".date-stamp").textContent = formatDate(opinion.createdAt);
  card.querySelector(".opinion-text").textContent = opinion.text;
  card.querySelector(".opinion-text").dataset.quoteSourceId = opinion.id;
  card.querySelector(".views").textContent = `👁 ${opinion.views}`;
  card.querySelector(".replies").textContent = `💬 ${opinion.replies.length}`;
  card.querySelector(".likes").textContent = opinion.likes;
  card.querySelector(".dislikes").textContent = opinion.dislikes;
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

  const dislikeButton = card.querySelector(".dislike-button");
  dislikeButton.classList.toggle("disliked", opinion.disliked);
  dislikeButton.addEventListener("click", async () => {
    try {
      const result = await registerContentActionViaApi("dislike", "opinion", opinion.id, opinion.id);
      Object.assign(opinion, result.opinion);
      render();
      showToast(result.active ? "No me gusta guardado" : "No me gusta quitado");
    } catch (error) {
      showToast(getApiErrorMessage(error, "No se pudo guardar el no me gusta."));
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

  const quoteButton = card.querySelector(".quote-button");
  quoteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const quote = createQuotePayload("opinion", opinion.id, opinion.text, getSelectedQuoteText(card.querySelector(".opinion-text")));
    quoteIntoReplyForm(card, quote);
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
  renderReplyThread(thread, opinion);

  const replyForm = card.querySelector(".reply-form");
  const replyInput = replyForm.querySelector("textarea, input");
  const replySubmitButton = replyForm.querySelector('button[type="submit"]');
  const replyQuoteRemove = replyForm.querySelector(".reply-quote-remove");
  const replyError = document.createElement("p");
  replyError.className = "reply-form-error hidden";
  replyError.setAttribute("role", "alert");
  replyForm.after(replyError);
  resizeReplyControl(replyInput);
  setReplyQuote(replyForm, null);
  replyQuoteRemove?.addEventListener("click", (event) => {
    event.stopPropagation();
    setReplyQuote(replyForm, null);
    replyInput.focus();
  });
  replyForm.addEventListener("click", (event) => event.stopPropagation());
  replyForm.addEventListener("pointerdown", (event) => event.stopPropagation());
  replySubmitButton?.addEventListener("click", (event) => event.stopPropagation());
  replyForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const reply = replyInput.value.trim();
    replyError.classList.add("hidden");
    replyError.textContent = "";
    if (!reply) return;
    if (containsBlockedLink(reply)) {
      replyError.textContent = "No se pueden publicar links en opiniones ni respuestas.";
      replyError.classList.remove("hidden");
      rejectLinkedContent();
      return;
    }
    if (containsUnsafeContent(reply)) {
      replyError.textContent = "No se puede publicar contenido con datos sensibles, amenazas o material prohibido.";
      replyError.classList.remove("hidden");
      return;
    }

    const originalButtonText = replySubmitButton?.textContent || "Responder";
    if (replySubmitButton) {
      replySubmitButton.disabled = true;
      replySubmitButton.textContent = "Publicando...";
    }

    try {
      const updatedOpinion = await createReplyViaApi(opinion.id, reply, replyForm._pendingQuote || null);
      Object.assign(opinion, updatedOpinion);
      replyInput.value = "";
      setReplyQuote(replyForm, null);
      resizeReplyControl(replyInput);
      replyInput.blur();
      clearReplyKeyboardAssist();
      card.querySelector(".replies").textContent = `💬 ${opinion.replies.length}`;
      renderReplyThread(thread, opinion);
      showToast("Respuesta publicada");
    } catch (error) {
      replyError.textContent = getApiErrorMessage(error, "No pudimos publicar tu respuesta. Intentá nuevamente.");
      replyError.classList.remove("hidden");
    } finally {
      if (replySubmitButton) {
        replySubmitButton.disabled = false;
        replySubmitButton.textContent = originalButtonText;
      }
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
  if (nameKey.includes("television") || nameKey.includes("tele")) return "television";
  if (nameKey.includes("vida")) return "vida";
  if (nameKey.includes("comida") || nameKey.includes("cocina") || nameKey.includes("gastronomia")) return "comida";
  if (nameKey.includes("mma") || nameKey.includes("ufc") || nameKey.includes("artes marciales")) return "mma";
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
      dislikes: Number(reply.dislikes || 0),
      reports: Number(reply.reports || 0),
      reportReasons: Array.isArray(reply.reportReasons) ? reply.reportReasons : [],
      moderationStatus: reply.moderationStatus || "approved",
      createdAt: normalizeDateValue(reply.createdAt),
      quote: normalizeQuoteRecord(reply.quote),
      liked: Boolean(reply.liked),
      disliked: Boolean(reply.disliked)
    };
  }
  return createReply(reply);
}

function normalizeQuoteRecord(quote) {
  if (!quote || typeof quote !== "object") return null;
  const quotedText = normalizeQuoteText(quote.quotedText);
  const quotedSourceId = String(quote.quotedSourceId || "").trim();
  const quotedSourceType = quote.quotedSourceType === "reply" ? "reply" : "opinion";
  if (!quotedText || !quotedSourceId) return null;
  return { quotedText, quotedSourceId, quotedSourceType };
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
  if (previewSandboxEnabled) {
    return createLocalDataStore();
  }
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
    dislikes: Number(opinion.dislikes || 0),
    createdAt: normalizeDateValue(opinion.createdAt),
    replies: Array.isArray(opinion.replies) ? opinion.replies.map(normalizeReply) : [],
    liked: Boolean(opinion.liked),
    disliked: Boolean(opinion.disliked),
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
    dislikes: opinion.dislikes,
    createdAt: opinion.createdAt,
    replies: opinion.replies.map((reply) => ({
      id: reply.id,
      author: reply.author,
      text: reply.text,
      likes: reply.likes,
      dislikes: Number(reply.dislikes || 0),
      reports: Number(reply.reports || 0),
      reportReasons: Array.isArray(reply.reportReasons) ? reply.reportReasons : [],
      moderationStatus: reply.moderationStatus || "approved",
      createdAt: reply.createdAt,
      quote: normalizeQuoteRecord(reply.quote)
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

  const datePart = date.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "numeric"
  });
  const timePart = date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return `${datePart} ${timePart}`;
}

function formatFullDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("es-AR", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatRelativeDate(value, now = Date.now()) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const diffMinutes = Math.max(0, Math.floor((now - date.getTime()) / 60000));
  if (diffMinutes < 1) return "Ahora";
  if (diffMinutes < 60) return `Hace ${diffMinutes} min`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `Hace ${diffHours} h`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Ayer";
  if (diffDays < 7) return `Hace ${diffDays} d\u00edas`;
  return formatDate(value);
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
  window.setInterval(() => {
    displayedActivityCache.updatedAt = 0;
    updateActivityIndicator();
  }, activityRefreshMs);
  window.setInterval(renderTopics, trendingRefreshHours * 60 * 60 * 1000);
}

initializeAppData();
