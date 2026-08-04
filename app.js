let topics = [
  { id: "todos", name: "Todos", description: "Feed general", icon: "assets/icons/todos.svg" },
  { id: "sin-tema", name: "Sin tema específico", description: "Opiniones libres", icon: "assets/icons/sin-tema.svg" },
  { id: "actualidad", name: "Actualidad", description: "Noticias, agenda pública y conversación del día", icon: "assets/icons/generic.svg" },
  { id: "historia", name: "Quiero contar una historia", description: "Relatos personales", icon: "assets/icons/historia.svg" },
  { id: "economia", name: "Economía", description: "Precios, trabajo y empresas", icon: "assets/icons/economia.svg" },
  { id: "agro", name: "Agro", description: "Campo, producción rural y sector agropecuario", icon: "assets/icons/agro.svg" },
  { id: "politica", name: "Política", description: "Gobierno, partidos y debate público", icon: "assets/icons/politica.svg" },
  { id: "conspiraciones", name: "Conspiraciones", description: "Teorías, misterios y versiones alternativas", icon: "assets/icons/generic.svg" },
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

const topicRules = [
  { id: "formula-1", words: ["formula 1", "f1", "ferrari", "red bull", "mercedes", "mclaren", "verstappen", "hamilton", "leclerc", "colapinto", "piloto", "carrera", "gran premio", "pit stop"] },
  { id: "videojuegos", words: ["videojuego", "videojuegos", "juego", "gaming", "gamer", "playstation", "xbox", "nintendo", "steam", "pc gamer", "fortnite", "minecraft", "gta", "fifa", "valorant"] },
  { id: "autos", words: ["auto", "autos", "coche", "camioneta", "motor", "mecanico", "mecánica", "nafta", "diesel", "concesionaria", "toyota", "ford", "fiat", "chevrolet", "volkswagen"] },
  { id: "agro", words: ["agro", "campo", "rural", "agricultura", "ganaderia", "grano", "granos", "soja", "maiz", "trigo", "cosecha", "siembra", "tambo", "estancia", "chacra", "productor agropecuario", "sector agropecuario"] },
  { id: "economia", words: ["economia", "precio", "precios", "inflacion", "dolar", "sueldo", "trabajo", "empresa", "impuesto", "alquiler", "tarifa", "mercado"] },
  { id: "politica", words: ["politica", "gobierno", "presidente", "diputado", "senado", "partido", "eleccion", "voto", "ministro", "congreso", "estado", "derecha", "izquierda", "milei", "miley", "libertario", "libertarios", "libertontos", "peronismo", "peronista", "peronistas"] },
  { id: "conspiraciones", words: ["conspiracion", "conspiraciones", "conspiranoico", "conspiranoica", "teoria conspirativa", "teorias conspirativas", "misterio", "misterios", "version alternativa", "versiones alternativas", "ovni", "ovnis", "ufo", "illuminati", "nuevo orden mundial", "agenda oculta", "encubrimiento", "secreto", "secretos"] },
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
const initialOpinionLoadLimit = 35;
const opinionPageLoadSize = 30;
const maxOpinionLength = 5000;
const maxTopicLength = 80;
const quoteMaxLength = 280;
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
  conspiraciones: '<path d="M12 3 3 21h18L12 3z"></path><path d="M7.5 12c1.2-1.8 2.7-2.7 4.5-2.7s3.3.9 4.5 2.7c-1.2 1.8-2.7 2.7-4.5 2.7S8.7 13.8 7.5 12z"></path><circle cx="12" cy="12" r="1.7"></circle><path d="M8.7 16h6.6"></path>',
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
  conspiraciones: "topic-accent-violet",
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
const pwaInstallButton = document.querySelector("#pwaInstallButton");
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
let activeReplyMenu = null;
let replyActionPopover = null;
let hasLoadedOpinions = false;
let hasHandledInitialOpinion = false;
let isRestoringHistory = false;
let pendingScrollRestore = null;
let activeReplyControl = null;
let replyViewportTimers = [];
let replyScrollAnimationFrame = 0;
let replyComposerFrame = 0;
let activeReplyComposerKey = "";
let lastReplyFocusAt = 0;
const replyDrafts = new Map();
let activeReplyComposerState = createReplyComposerState();
const supplementalOpinionIds = new Set();
let canLoadMoreOpinions = false;
let isLoadingMoreOpinions = false;
let isLoadingInitialRouteOpinion = false;
let isLoadingSearchOpinion = false;
let dataStore = createLocalDataStore();
let deferredPwaInstallPrompt = null;
let hasTrackedStandaloneOpen = false;
const pwaInstallPromptWaiters = new Set();

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

  closeReplyActionMenu(true);
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
  if (!event.target.closest?.(".reply-menu-button") && !event.target.closest?.(".reply-menu-popover")) {
    closeReplyActionMenu(false);
  }
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
  closeReplyActionMenu(false);
  restoreViewFromHistory(event.state);
});

window.addEventListener("scroll", () => {
  if (activeReplyMenu) closeReplyActionMenu(false);
}, { passive: true });
window.addEventListener("resize", positionReplyActionPopover);

document.addEventListener("focusin", (event) => {
  const control = event.target.closest?.(".reply-form input, .reply-form textarea");
  if (!control) return;
  activeReplyControl = control;
  lastReplyFocusAt = Date.now();
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
  const replyForm = event.target.closest?.(".reply-form");
  if (!replyForm) return;
  saveReplyDraft(replyForm);
  if (event.target !== activeReplyControl) return;
  resizeReplyControl(event.target);
  scheduleActiveReplyControlVisibility();
});

document.addEventListener("wheel", (event) => {
  dismissActiveReplyControlFromUserScroll(event.target);
}, { passive: true });

document.addEventListener("touchstart", (event) => {
  dismissActiveReplyControlFromUserScroll(event.target, { immediate: true, mobileOnly: true });
}, { passive: true, capture: true });

document.addEventListener("touchmove", (event) => {
  dismissActiveReplyControlFromUserScroll(event.target);
}, { passive: true });

document.addEventListener("keydown", (event) => {
  if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) return;
  dismissActiveReplyControlFromUserScroll(event.target);
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
    quote,
    likes,
    dislikes: 0,
    reports,
    createdAt,
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

function sortOpinionsByCreatedAt(nextOpinions) {
  return nextOpinions.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

function mergeOpinionLists(primaryOpinions, secondaryOpinions = []) {
  const byId = new Map();
  [...primaryOpinions, ...secondaryOpinions].forEach((opinion) => {
    const normalizedOpinion = normalizeOpinion(opinion);
    if (!normalizedOpinion.id || byId.has(normalizedOpinion.id)) return;
    byId.set(normalizedOpinion.id, normalizedOpinion);
  });
  return sortOpinionsByCreatedAt(Array.from(byId.values()));
}

function rememberSupplementalOpinions(nextOpinions) {
  nextOpinions.forEach((opinion) => {
    if (opinion?.id) supplementalOpinionIds.add(opinion.id);
  });
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

function isResolvingSelectedOpinionRoute() {
  const routeOpinionId = selectedOpinionId || getOpinionIdFromLocation();
  if (!routeOpinionId) return false;
  return !hasLoadedOpinions || isLoadingInitialRouteOpinion || !hasHandledInitialOpinion;
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

async function submitSearch(value, sourceInput) {
  searchQuery = value.trim();
  syncSearchInputs(searchQuery);
  sourceInput?.blur();
  navigateToView("search");
  renderSearchResults();

  const routeLookupCandidate = getSearchRouteLookupCandidate(searchQuery);
  if (!routeLookupCandidate || getOpinionByRouteId(routeLookupCandidate) || !dataStore.getOpinionByRouteId) return;

  isLoadingSearchOpinion = true;
  renderSearchResults();
  try {
    await dataStore.getOpinionByRouteId(routeLookupCandidate);
  } catch (error) {
    console.warn("No se pudo cargar la opinion buscada.", error);
  } finally {
    isLoadingSearchOpinion = false;
    renderSearchResults();
  }
}

function getSearchRouteLookupCandidate(value) {
  const rawValue = String(value || "").trim();
  const normalizedValue = normalizeText(rawValue).replace(/^opinion\s*#?\s*/, "").trim();
  const publicNumber = normalizedValue.match(/^#?(\d+)$/)?.[1] || "";
  if (publicNumber) return publicNumber;
  return /^opinion-\d+-\d+$/i.test(rawValue) ? rawValue : "";
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
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.ok || result.skipped) {
      throw new Error(result.error || result.reason || "send_failed");
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
    if (opinion && !opinion.hidden) {
      title = `Opinión #${getOpinionNumber(opinion)} | Quiero Opinar`;
      description = truncateText(opinion.text, 140);
    } else if (isResolvingSelectedOpinionRoute()) {
      title = "Cargando opinión | Quiero Opinar";
      description = "Estamos cargando la opinión solicitada.";
    } else {
      title = "Opinión no encontrada | Quiero Opinar";
      description = "No encontramos esta opinión.";
    }
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

function shouldUseImmediateReplyFocus() {
  return isMobileViewport()
    || Boolean(window.matchMedia?.("(pointer: coarse)")?.matches)
    || (navigator.maxTouchPoints || 0) > 0;
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

async function createReplyViaApi(opinionId, text, quote = null) {
  const data = await callModerationApi({
    action: "createReply",
    opinionId,
    text,
    quote
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

function clearReplyViewportTimers() {
  replyViewportTimers.forEach((timer) => window.clearTimeout(timer));
  replyViewportTimers = [];
}

function dismissActiveReplyControlFromUserScroll(target, options = {}) {
  if (!activeReplyControl) return;
  if (options.mobileOnly && !shouldUseImmediateReplyFocus()) return;
  if (target?.closest?.(".reply-menu-popover, .reply-menu-button, .action-menu-button")) return;
  if (!options.immediate && Date.now() - lastReplyFocusAt < 180) return;

  const activeForm = activeReplyControl.closest(".reply-form");
  const eventForm = target?.closest?.(".reply-form");
  if (activeForm && eventForm === activeForm) return;

  saveReplyDraft(activeForm);
  activeReplyControl.blur();
  clearReplyKeyboardAssist();
}

function getReplyDraftKey(targetType, targetId, mode = "reply") {
  return `${targetType}:${targetId}:${mode}`;
}

function saveReplyDraft(replyForm) {
  const replyInput = replyForm?.querySelector("textarea, input");
  const key = replyForm?.dataset.replyDraftKey;
  if (!replyInput || !key) return;
  replyDrafts.set(key, {
    value: replyInput.value,
    quote: replyForm._pendingQuote || null
  });
}

function restoreReplyDraft(replyForm, targetType, targetId, mode = "reply") {
  const replyInput = replyForm?.querySelector("textarea, input");
  if (!replyInput) return null;
  const key = getReplyDraftKey(targetType, targetId, mode);
  replyForm.dataset.replyDraftKey = key;
  const draft = replyDrafts.get(key);
  if (!draft) return null;
  replyInput.value = draft.value || "";
  setReplyQuote(replyForm, draft.quote || null);
  resizeReplyControl(replyInput);
  return draft;
}

function createReplyComposerState(overrides = {}) {
  const quote = normalizeQuoteRecord(overrides.quote);
  const parentId = String(overrides.parentId || "").trim();
  const parentType = overrides.parentType === "reply" ? "reply" : (parentId ? "opinion" : null);
  return {
    isOpen: Boolean(overrides.isOpen && parentId),
    parentId: parentId || null,
    parentType,
    quote
  };
}

function getReplyComposerDraftKey(state) {
  const quote = normalizeQuoteRecord(state?.quote);
  if (quote) return getReplyDraftKey(quote.quotedSourceType, quote.quotedSourceId, "quote");
  return getReplyDraftKey(state?.parentType || "opinion", state?.parentId || "", "reply");
}

function setActiveReplyComposerState(nextState) {
  activeReplyComposerState = createReplyComposerState(nextState);
  activeReplyComposerKey = activeReplyComposerState.isOpen ? getReplyComposerDraftKey(activeReplyComposerState) : "";
  return activeReplyComposerState;
}

function applyReplyComposerState(replyForm, state) {
  if (!replyForm || !state?.isOpen) return;
  replyForm._composerState = state;
  replyForm._pendingQuote = state.quote;
  replyForm.dataset.replyParentId = state.parentId || "";
  replyForm.dataset.replyParentType = state.parentType || "";
  replyForm.dataset.replyDraftKey = getReplyComposerDraftKey(state);
  setReplyQuote(replyForm, state.quote);
}

function animateReplyScrollBy(delta) {
  if (Math.abs(delta) < 2) return;
  if (replyScrollAnimationFrame) {
    window.cancelAnimationFrame(replyScrollAnimationFrame);
    replyScrollAnimationFrame = 0;
  }

  const startY = window.scrollY;
  const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const targetY = Math.max(0, Math.min(maxY, startY + delta));
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;

  const duration = 240;
  const startedAt = performance.now();
  const easeOut = (progress) => 1 - Math.pow(1 - progress, 3);

  const step = (now) => {
    const progress = Math.min(1, (now - startedAt) / duration);
    window.scrollTo({ top: startY + distance * easeOut(progress), behavior: "auto" });
    if (progress < 1) {
      replyScrollAnimationFrame = window.requestAnimationFrame(step);
      return;
    }
    replyScrollAnimationFrame = 0;
  };

  replyScrollAnimationFrame = window.requestAnimationFrame(step);
}

function scheduleActiveReplyControlVisibility(delay = 70) {
  if (!activeReplyControl || !isMobileViewport()) return;
  clearReplyViewportTimers();
  replyViewportTimers.push(window.setTimeout(ensureActiveReplyControlVisible, delay));
}

function scheduleReplyControlVisibilityChecks(delays = [70]) {
  if (!activeReplyControl || !isMobileViewport()) return;
  clearReplyViewportTimers();
  delays.forEach((delay) => {
    replyViewportTimers.push(window.setTimeout(ensureActiveReplyControlVisible, delay));
  });
}

function ensureActiveReplyControlVisible() {
  if (!activeReplyControl || !isMobileViewport()) return;
  const form = activeReplyControl.closest(".reply-form");
  if (!form) return;

  const viewport = getVisualViewportBounds();
  const controlRect = activeReplyControl.getBoundingClientRect();
  const anchor = form.querySelector(".reply-quote-preview:not(.hidden)") || activeReplyControl;
  const anchorRect = anchor.getBoundingClientRect();
  const submitButton = form.querySelector('button[type="submit"]');
  const endRect = submitButton?.getBoundingClientRect() || controlRect;
  const replyOffset = getEffectiveReplyKeyboardOffset(
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--keyboard-offset")) || 0
  );
  const visibleBottom = Math.min(viewport.bottom, window.innerHeight - replyOffset);
  const hasQuotePreview = anchor !== activeReplyControl;
  const topLimit = viewport.top + (hasQuotePreview ? 58 : 88);
  const bottomLimit = Math.max(topLimit + 170, visibleBottom - 22);
  const contentBottom = Math.max(controlRect.bottom, endRect.bottom);
  let delta = 0;

  if (contentBottom > bottomLimit) {
    delta = contentBottom - bottomLimit;
  }

  if (anchorRect.top - delta < topLimit) {
    delta = anchorRect.top - topLimit;
  } else if (!delta && anchorRect.top > bottomLimit) {
    delta = anchorRect.top - topLimit;
  }

  const maxUpDelta = Math.max(100, Math.min(180, viewport.height * 0.24));
  if (delta < 0) delta = Math.max(delta, -maxUpDelta);
  animateReplyScrollBy(delta);
}

function clearReplyKeyboardAssist() {
  clearReplyViewportTimers();
  if (replyScrollAnimationFrame) {
    window.cancelAnimationFrame(replyScrollAnimationFrame);
    replyScrollAnimationFrame = 0;
  }
  if (replyComposerFrame) {
    window.cancelAnimationFrame(replyComposerFrame);
    replyComposerFrame = 0;
  }
  activeReplyControl = null;
  activeReplyComposerKey = "";
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

  visibleTopics.forEach(({ topic, opinionCount, replyCount, lastActivity, previewOpinion, activityBadge }) => {
    const column = document.createElement("a");
    column.className = `board-column ${getTopicAccentClass(topic)}${previewOpinion ? "" : " is-empty-topic"}`;
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
    appendLoadMoreOpinionsButton(feedList);
    renderDiscovery();
    return;
  }

  filteredOpinions.forEach((opinion) => {
    feedList.append(createOpinionCard(opinion, false));
  });
  appendLoadMoreOpinionsButton(feedList);
  renderDiscovery();
}

function appendLoadMoreOpinionsButton(container) {
  if (!canLoadMoreOpinions || !dataStore.loadMoreOpinions) return;
  const row = document.createElement("div");
  row.className = "load-more-row";
  const button = document.createElement("button");
  button.className = "ghost-button load-more-button";
  button.type = "button";
  button.disabled = isLoadingMoreOpinions;
  button.textContent = isLoadingMoreOpinions ? "Cargando..." : "Cargar más";
  button.addEventListener("click", loadMoreOpinions);
  row.append(button);
  container.append(row);
}

async function loadMoreOpinions() {
  if (isLoadingMoreOpinions || !canLoadMoreOpinions || !dataStore.loadMoreOpinions) return;
  isLoadingMoreOpinions = true;
  render();
  try {
    const loadedCount = await dataStore.loadMoreOpinions();
    if (!loadedCount) showToast("No hay más opiniones para cargar");
  } catch (error) {
    showToast("No pudimos cargar más opiniones. Intentá nuevamente.");
  } finally {
    isLoadingMoreOpinions = false;
    render();
  }
}

function renderFeedSkeletons() {
  for (let index = 0; index < 2; index += 1) {
    feedList.append(createOpinionSkeletonCard("Cargando opiniones"));
  }
}

function createOpinionSkeletonCard(label = "Cargando opinión") {
  const card = document.createElement("article");
  card.className = "opinion-card opinion-skeleton";
  card.setAttribute("aria-label", label);
  card.append(
    createSkeletonElement("skeleton-line meta"),
    createSkeletonElement("skeleton-line title"),
    createSkeletonElement("skeleton-line body"),
    createSkeletonElement("skeleton-line body short"),
    createSkeletonElement("skeleton-actions")
  );
  return card;
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
    empty.textContent = isLoadingSearchOpinion
      ? "Buscando opinion..."
      : "No se encontraron opiniones relacionadas con esa búsqueda.";
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
    appendLoadMoreOpinionsButton(topicDetailList);
    return;
  }

  topicOpinions.forEach((opinion) => {
    topicDetailList.append(createOpinionCard(opinion, false));
  });
  appendLoadMoreOpinionsButton(topicDetailList);
}

function renderDetail() {
  detailShell.innerHTML = "";
  const opinion = getOpinionByRouteId(selectedOpinionId);

  if (!opinion || opinion.hidden) {
    if (isResolvingSelectedOpinionRoute()) {
      detailShell.append(createOpinionSkeletonCard("Cargando opinión"));
      return;
    }

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

function renderQuoteMarkup(quote) {
  const normalizedQuote = normalizeQuoteRecord(quote);
  if (!normalizedQuote) return "";
  return `
    <button class="reply-quote" type="button" data-quote-source-id="${escapeHtml(normalizedQuote.quotedSourceId)}" data-quote-source-type="${escapeHtml(normalizedQuote.quotedSourceType)}">
      <span>Respondiendo a &quot;${escapeHtml(normalizedQuote.quotedText)}&quot;</span>
    </button>
  `;
}

function ensureReplyQuotePreview(replyForm) {
  let preview = replyForm.querySelector(".reply-quote-preview");
  if (preview) return preview;

  preview = document.createElement("div");
  preview.className = "reply-quote-preview hidden";
  preview.setAttribute("aria-live", "polite");
  preview.innerHTML = `
    <span class="reply-quote-preview-copy">
      <span class="reply-quote-preview-kicker">Respondiendo a:</span>
      <span class="reply-quote-preview-text"></span>
    </span>
    <button class="reply-quote-remove" type="button" aria-label="Eliminar cita">&times;</button>
  `;
  const control = replyForm.querySelector("textarea, input");
  replyForm.insertBefore(preview, control);
  return preview;
}

function setReplyQuote(replyForm, quote) {
  const normalizedQuote = normalizeQuoteRecord(quote);
  const preview = ensureReplyQuotePreview(replyForm);
  const label = preview.querySelector(".reply-quote-preview-text");
  replyForm._pendingQuote = normalizedQuote;
  if (replyForm._composerState) {
    replyForm._composerState = createReplyComposerState({
      ...replyForm._composerState,
      quote: normalizedQuote
    });
  }
  preview.classList.toggle("hidden", !normalizedQuote);
  if (label) {
    label.textContent = normalizedQuote ? `"${normalizedQuote.quotedText}"` : "";
  }
  if (normalizedQuote && replyForm.contains(activeReplyControl)) {
    scheduleReplyControlVisibilityChecks([0, 90, 220, 420, 700]);
  }
}

function focusReplyInput(replyInput, visibilityDelay = 70) {
  if (!replyInput) return;
  const isMobile = shouldUseImmediateReplyFocus();

  if (isMobile) {
    try {
      replyInput.focus();
    } catch {
      // Some embedded browsers reject programmatic focus outside a trusted touch event.
    }
  } else {
    try {
      replyInput.focus({ preventScroll: true });
    } catch {
      replyInput.focus();
    }
  }

  if (document.activeElement !== replyInput) {
    try {
      replyInput.focus();
    } catch {
      // Some embedded browsers reject programmatic focus outside a trusted touch event.
    }
  }

  activeReplyControl = replyInput;
  lastReplyFocusAt = Date.now();
  document.body.classList.add("reply-field-focused");
  resizeReplyControl(replyInput);
  updateViewportMetrics();
  scheduleActiveReplyControlVisibility(visibilityDelay);
}

function scrollReplyComposerIntoView(replyForm, replyInput) {
  if (!replyForm || !replyInput) return;
  if (replyComposerFrame) {
    window.cancelAnimationFrame(replyComposerFrame);
    replyComposerFrame = 0;
  }

  const isMobile = shouldUseImmediateReplyFocus();
  if (isMobile) {
    focusReplyInput(replyInput, 0);
    scheduleReplyControlVisibilityChecks([0, 90, 220, 420, 700]);
    return;
  }

  replyComposerFrame = window.requestAnimationFrame(() => {
    replyComposerFrame = 0;
    const viewport = getVisualViewportBounds();
    const targetElement = replyForm.querySelector(".reply-quote-preview:not(.hidden)") || replyForm;
    const targetRect = targetElement.getBoundingClientRect();
    const formRect = replyForm.getBoundingClientRect();
    const floatingTrigger = document.querySelector(".floating-opinion-trigger.is-visible");
    const floatingRect = floatingTrigger?.getBoundingClientRect();
    const desktopBottomClearance = floatingRect?.height
      ? Math.min(150, Math.max(28, window.innerHeight - floatingRect.top + 14))
      : 28;
    const visibleTop = viewport.top + 76;
    const visibleBottom = Math.min(viewport.bottom, window.innerHeight) - desktopBottomClearance;
    const isVisible = targetRect.top >= visibleTop && formRect.bottom <= visibleBottom;

    if (!isVisible) {
      const desktopDelta = targetRect.top < visibleTop
        ? targetRect.top - visibleTop
        : formRect.bottom - visibleBottom;
      const targetScrollY = Math.max(0, window.scrollY + desktopDelta);
      const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      window.scrollTo({ top: targetScrollY, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }

    window.requestAnimationFrame(() => {
      focusReplyInput(replyInput, 70);
    });
  });
}

function openReplyComposer({ card, targetId, targetType = "opinion", mode = "reply", quote = null }) {
  if (!card) return;
  const replyForm = card.querySelector(".reply-form");
  const replyInput = replyForm?.querySelector("textarea, input");
  if (!replyForm || !replyInput) return;

  closeReplyActionMenu(false);
  const parentId = String(card.dataset.opinionId || targetId || "").trim();
  const state = setActiveReplyComposerState({
    isOpen: true,
    parentId,
    parentType: targetType,
    quote: mode === "quote" ? quote : null
  });
  const draftKey = getReplyComposerDraftKey(state);
  const draft = replyDrafts.get(draftKey);
  replyInput.value = draft?.value || "";
  applyReplyComposerState(replyForm, {
    ...state,
    quote: state.quote || draft?.quote || null
  });

  saveReplyDraft(replyForm);
  scrollReplyComposerIntoView(replyForm, replyInput);
}

function quoteIntoReplyForm(card, quote) {
  const normalizedQuote = normalizeQuoteRecord(quote);
  if (!normalizedQuote) return;
  openReplyComposer({
    card,
    targetId: card?.dataset.opinionId || normalizedQuote.quotedSourceId,
    targetType: "opinion",
    mode: "quote",
    quote: normalizedQuote
  });
}

function getReplyActionPopover() {
  if (replyActionPopover) return replyActionPopover;
  replyActionPopover = document.createElement("div");
  replyActionPopover.className = "reply-menu-popover";
  replyActionPopover.setAttribute("role", "menu");
  document.body.append(replyActionPopover);
  return replyActionPopover;
}

function getReplyMenuIcon(type) {
  if (type === "share") {
    return '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.1 0l2.8-2.8a5 5 0 0 0-7.1-7.1L11 4.9"></path><path d="M14 11a5 5 0 0 0-7.1 0l-2.8 2.8a5 5 0 0 0 7.1 7.1L13 19.1"></path></svg>';
  }
  if (type === "report") {
    return '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 21V4"></path><path d="M5 4h12l-1.5 4L17 12H5"></path></svg>';
  }
  return '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17a5 5 0 0 0 5-5V7H7v5h3a2 2 0 0 1-2 2H7z"></path><path d="M15 17a5 5 0 0 0 5-5V7h-5v5h3a2 2 0 0 1-2 2h-1z"></path></svg>';
}

function openReplyActionMenu(button, items) {
  const popover = getReplyActionPopover();
  if (activeReplyMenu?.button === button) {
    closeReplyActionMenu(true);
    return;
  }

  closeReplyActionMenu(false);
  activeReplyMenu = { button, items };
  button.setAttribute("aria-expanded", "true");
  popover.innerHTML = items.map((item, index) => `
    <button class="reply-menu-item${item.danger ? " is-danger" : ""}" type="button" role="menuitem" data-index="${index}">
      ${getReplyMenuIcon(item.icon)}
      <span>${escapeHtml(item.label)}</span>
    </button>
  `).join("");
  popover.querySelectorAll(".reply-menu-item").forEach((itemButton) => {
    let hasSelected = false;
    const getItem = () => activeReplyMenu?.items[Number(itemButton.dataset.index)];
    const selectItem = (event) => {
      if (hasSelected) {
        if (event.cancelable) event.preventDefault();
        event.stopPropagation();
        return;
      }
      hasSelected = true;
      event.stopPropagation();
      const item = getItem();
      closeReplyActionMenu(false);
      item?.action();
    };

    itemButton.addEventListener("pointerdown", (event) => event.stopPropagation());
    itemButton.addEventListener("touchstart", (event) => event.stopPropagation(), { passive: true });
    itemButton.addEventListener("pointerup", selectItem);
    itemButton.addEventListener("touchend", selectItem, { passive: false });
    itemButton.addEventListener("click", selectItem);
  });
  positionReplyActionPopover();
  popover.classList.add("is-open");
  document.body.classList.add("reply-menu-open");
}

function closeReplyActionMenu(restoreFocus = false) {
  const menu = activeReplyMenu;
  if (menu?.button) {
    menu.button.setAttribute("aria-expanded", "false");
    if (restoreFocus) menu.button.focus();
  }
  activeReplyMenu = null;
  if (replyActionPopover) {
    replyActionPopover.classList.remove("is-open");
    replyActionPopover.innerHTML = "";
  }
  document.body.classList.remove("reply-menu-open");
}

function positionReplyActionPopover() {
  if (!activeReplyMenu || !replyActionPopover) return;
  const rect = activeReplyMenu.button.getBoundingClientRect();
  const width = 196;
  const left = Math.min(window.innerWidth - width - 12, Math.max(12, rect.left + rect.width / 2 - width / 2));
  replyActionPopover.style.width = `${width}px`;
  replyActionPopover.style.left = `${left}px`;
  replyActionPopover.style.top = `${rect.bottom + window.scrollY + 8}px`;
}

function bindActionMenuButton(button, getItems) {
  let lastTouchActivation = 0;
  const activate = (event) => {
    if (event.cancelable) event.preventDefault();
    event.stopPropagation();
    openReplyActionMenu(button, getItems());
  };

  button.addEventListener("pointerdown", (event) => {
    event.stopPropagation();
  });

  button.addEventListener("touchend", (event) => {
    lastTouchActivation = Date.now();
    activate(event);
  }, { passive: false });

  button.addEventListener("click", (event) => {
    if (Date.now() - lastTouchActivation < 650) {
      if (event.cancelable) event.preventDefault();
      event.stopPropagation();
      return;
    }
    activate(event);
  });
}

function syncActionMenuButtonSize(button, referenceButtons) {
  const applySize = () => {
    const referenceRects = referenceButtons
      .filter(Boolean)
      .map((item) => ({ item, rect: item.getBoundingClientRect() }))
      .filter(({ rect }) => rect.width > 0 && rect.height > 0);

    if (!button || !referenceRects.length) return;
    const width = Math.round(Math.max(...referenceRects.map(({ rect }) => rect.width)));
    const height = Math.round(Math.max(...referenceRects.map(({ rect }) => rect.height)));
    const radius = getComputedStyle(referenceRects[0].item).borderRadius;
    button.style.setProperty("width", `${width}px`, "important");
    button.style.setProperty("min-width", `${width}px`, "important");
    button.style.setProperty("max-width", `${width}px`, "important");
    button.style.setProperty("height", `${height}px`, "important");
    button.style.setProperty("min-height", `${height}px`, "important");
    button.style.setProperty("padding", "0", "important");
    button.style.setProperty("border-radius", radius, "important");
  };

  window.requestAnimationFrame(() => {
    applySize();
    window.setTimeout(applySize, 80);
  });
}

function createReplyElement(opinion, normalizedReply) {
  const item = document.createElement("div");
  item.className = "reply-item";
  item.dataset.replyId = normalizedReply.id;
  item.innerHTML = `
    ${renderQuoteMarkup(normalizedReply.quote)}
    <p class="reply-content">${escapeHtml(normalizedReply.text)}</p>
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
      <button class="reply-menu-button action-menu-button" type="button" aria-label="Mas opciones de respuesta" aria-haspopup="menu" aria-expanded="false">
        <span aria-hidden="true">...</span>
      </button>
      <span class="date-stamp reply-date">${formatRelativeActivity(normalizedReply.createdAt)}</span>
    </div>
  `;

  const replyLikeButton = item.querySelector(".like-button");
  const replyDislikeButton = item.querySelector(".dislike-button");

  replyLikeButton.addEventListener("click", async (event) => {
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

  replyDislikeButton.addEventListener("click", async (event) => {
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

  item.querySelector(".reply-quote")?.addEventListener("click", (event) => {
    event.stopPropagation();
    event.currentTarget.classList.toggle("is-expanded");
  });

  const quoteReply = () => {
    const quote = createQuotePayload("reply", normalizedReply.id, normalizedReply.text);
    quoteIntoReplyForm(item.closest(".opinion-card"), quote);
  };

  const reportReply = async () => {
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
  };

  const replyMenuButton = item.querySelector(".reply-menu-button");
  syncActionMenuButtonSize(replyMenuButton, [replyLikeButton, replyDislikeButton]);
  bindActionMenuButton(replyMenuButton, () => [
      {
        label: "Responder citando",
        icon: "quote",
        action: quoteReply,
        focusTarget: () => item.closest(".opinion-card")?.querySelector(".reply-form textarea, .reply-form input")
      },
      { label: "Reportar", icon: "report", danger: true, action: reportReply }
    ]);

  return item;
}

function renderReplyThread(thread, opinion) {
  thread.innerHTML = "";
  opinion.replies.forEach((reply, index) => {
    const normalizedReply = normalizeReply(reply);
    opinion.replies[index] = normalizedReply;
    thread.append(createReplyElement(opinion, normalizedReply));
  });
}

function createOpinionCard(opinion, isDetail) {
  const card = opinionTemplate.content.firstElementChild.cloneNode(true);
  card.dataset.opinionId = opinion.id;
  card.querySelector(".author").textContent = `#${getOpinionNumber(opinion)}`;
  card.querySelector(".topic").textContent = getTopicName(opinion.topic);
  card.querySelector(".date-stamp").textContent = formatDate(opinion.createdAt);
  const opinionTextElement = card.querySelector(".opinion-text");
  opinionTextElement.textContent = opinion.text;
  opinionTextElement.classList.add("quotable-text");
  opinionTextElement.dataset.quoteSourceType = "opinion";
  opinionTextElement.dataset.quoteSourceId = opinion.id;
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

  shareButton?.remove();
  reportButton?.remove();

  const opinionMenuButton = document.createElement("button");
  opinionMenuButton.className = "reply-menu-button action-menu-button opinion-menu-button";
  opinionMenuButton.type = "button";
  opinionMenuButton.setAttribute("aria-label", "Mas opciones de opinion");
  opinionMenuButton.setAttribute("aria-haspopup", "menu");
  opinionMenuButton.setAttribute("aria-expanded", "false");
  opinionMenuButton.innerHTML = '<span aria-hidden="true">...</span>';
  card.querySelector(".opinion-stats")?.append(opinionMenuButton);
  syncActionMenuButtonSize(opinionMenuButton, [likeButton, dislikeButton]);

  const quoteOpinion = () => {
    quoteIntoReplyForm(card, createQuotePayload("opinion", opinion.id, opinion.text));
  };

  const shareOpinionFromMenu = async () => {
    const link = getOpinionUrl(opinion);
    try {
      await copyTextToClipboard(link);
      showToast("Link de la opinion copiado");
    } catch {
      showToast("No se pudo copiar el link");
    }
    opinion.shares += 1;
    await dataStore.updateOpinion(opinion);
  };

  const reportOpinionFromMenu = async () => {
    const reason = await askReportReason();
    if (!reason) return;
    try {
      const result = await registerContentActionViaApi("report", "opinion", opinion.id, opinion.id, reason);
      Object.assign(opinion, result.opinion);
      showToast("Reporte enviado");
      render();
    } catch (error) {
      showToast(getApiErrorMessage(error, "No se pudo enviar el reporte."));
    }
  };

  bindActionMenuButton(opinionMenuButton, () => [
      { label: "Compartir", icon: "share", action: shareOpinionFromMenu },
      {
        label: "Responder citando",
        icon: "quote",
        action: quoteOpinion,
        focusTarget: () => card.querySelector(".reply-form textarea, .reply-form input")
      },
      { label: "Reportar", icon: "report", danger: true, action: reportOpinionFromMenu }
    ]);

  const thread = card.querySelector(".thread");
  renderReplyThread(thread, opinion);

  const replyForm = card.querySelector(".reply-form");
  const replyInput = replyForm.querySelector("textarea, input");
  const replySubmitButton = replyForm.querySelector('button[type="submit"]');
  const replyQuotePreview = ensureReplyQuotePreview(replyForm);
  replyQuotePreview.querySelector(".reply-quote-remove")?.addEventListener("click", (event) => {
    event.stopPropagation();
    setReplyQuote(replyForm, null);
    setActiveReplyComposerState({
      isOpen: true,
      parentId: opinion.id,
      parentType: "opinion",
      quote: null
    });
    applyReplyComposerState(replyForm, activeReplyComposerState);
    saveReplyDraft(replyForm);
    replyInput.focus();
  });
  setReplyQuote(replyForm, null);
  restoreReplyDraft(replyForm, "opinion", opinion.id, "reply");
  const replyError = document.createElement("p");
  replyError.className = "reply-form-error hidden";
  replyError.setAttribute("role", "alert");
  replyForm.after(replyError);
  resizeReplyControl(replyInput);
  replyForm.addEventListener("click", (event) => event.stopPropagation());
  replyForm.addEventListener("pointerdown", (event) => event.stopPropagation());
  replyInput.addEventListener("focus", () => {
    const quote = normalizeQuoteRecord(replyForm._pendingQuote);
    const state = setActiveReplyComposerState({
      isOpen: true,
      parentId: opinion.id,
      parentType: "opinion",
      quote
    });
    applyReplyComposerState(replyForm, state);
  });
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
      const composerState = createReplyComposerState(replyForm._composerState || {
        isOpen: true,
        parentId: opinion.id,
        parentType: "opinion",
        quote: replyForm._pendingQuote || null
      });
      const quote = normalizeQuoteRecord(composerState.quote);
      const updatedOpinion = await createReplyViaApi(opinion.id, reply, quote);
      Object.assign(opinion, updatedOpinion);
      replyDrafts.delete(replyForm.dataset.replyDraftKey);
      replyInput.value = "";
      setReplyQuote(replyForm, null);
      setActiveReplyComposerState();
      replyForm._composerState = createReplyComposerState();
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
    const quote = normalizeQuoteRecord(reply.quote || {
      quotedContentId: reply.quotedContentId,
      quotedContentType: reply.quotedContentType,
      quotedTextSnapshot: reply.quotedTextSnapshot
    });
    return {
      id: reply.id || createId(),
      author: reply.author || "Opinion",
      text: reply.text || "",
      quote,
      quotedContentId: quote?.quotedContentId || null,
      quotedContentType: quote?.quotedContentType || null,
      quotedTextSnapshot: quote?.quotedTextSnapshot || null,
      likes: Number(reply.likes || 0),
      dislikes: Number(reply.dislikes || 0),
      reports: Number(reply.reports || 0),
      reportReasons: Array.isArray(reply.reportReasons) ? reply.reportReasons : [],
      moderationStatus: reply.moderationStatus || "approved",
      createdAt: normalizeDateValue(reply.createdAt),
      liked: Boolean(reply.liked),
      disliked: Boolean(reply.disliked)
    };
  }
  return createReply(reply);
}

function normalizeQuoteText(value) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, quoteMaxLength);
}

function normalizeQuoteRecord(quote) {
  if (!quote || typeof quote !== "object") return null;
  const quotedText = normalizeQuoteText(quote.quotedText || quote.quotedTextSnapshot);
  const quotedSourceId = String(quote.quotedSourceId || quote.quotedContentId || "").trim();
  const quotedSourceType = (quote.quotedSourceType || quote.quotedContentType) === "reply" ? "reply" : "opinion";
  if (!quotedText || !quotedSourceId) return null;
  return {
    quotedText,
    quotedSourceId,
    quotedSourceType,
    quotedContentId: quotedSourceId,
    quotedContentType: quotedSourceType,
    quotedTextSnapshot: quotedText
  };
}

function createQuotePayload(sourceType, sourceId, text) {
  const quotedText = normalizeQuoteText(text);
  const quotedSourceId = String(sourceId || "").trim();
  if (!quotedText || !quotedSourceId) return null;
  return {
    quotedText,
    quotedSourceId,
    quotedSourceType: sourceType === "reply" ? "reply" : "opinion",
    quotedContentId: quotedSourceId,
    quotedContentType: sourceType === "reply" ? "reply" : "opinion",
    quotedTextSnapshot: quotedText
  };
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
    },
    async loadMoreOpinions() {
      return 0;
    },
    async getOpinionByRouteId(routeId) {
      return getOpinionByRouteId(routeId);
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
    getDoc,
    getDocs,
    limit: limitQuery,
    onSnapshot,
    orderBy,
    query,
    startAfter,
    where,
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

  function normalizeOpinionSnapshot(snapshot) {
    return normalizeOpinion({ id: snapshot.id, ...snapshot.data() });
  }

  async function fetchOpinionByRouteId(routeId) {
    const normalizedRouteId = String(routeId || "").trim();
    if (!normalizedRouteId) return null;

    const directSnapshot = await getDoc(doc(db, "opinions", normalizedRouteId));
    if (directSnapshot.exists()) return normalizeOpinionSnapshot(directSnapshot);

    if (/^\d+$/.test(normalizedRouteId)) {
      const publicNumberSnapshot = await getDocs(query(
        collection(db, "opinions"),
        where("publicNumber", "==", Number(normalizedRouteId)),
        limitQuery(1)
      ));
      const match = publicNumberSnapshot.docs[0];
      if (match) return normalizeOpinionSnapshot(match);
    }

    return null;
  }

  let lastVisibleOpinionSnapshot = null;

  return {
    name: "firebase",
    async subscribe(onChange) {
      await loadTopicsFromFirestore();
      return onSnapshot(query(
        collection(db, "opinions"),
        orderBy("createdAt", "desc"),
        limitQuery(initialOpinionLoadLimit)
      ), (snapshot) => {
        const supplementalOpinions = opinions.filter((opinion) => supplementalOpinionIds.has(opinion.id));
        const remoteOpinions = snapshot.docs.map(normalizeOpinionSnapshot);
        if (!supplementalOpinions.length || !lastVisibleOpinionSnapshot) {
          lastVisibleOpinionSnapshot = snapshot.docs[snapshot.docs.length - 1] || null;
          canLoadMoreOpinions = Boolean(lastVisibleOpinionSnapshot && snapshot.docs.length === initialOpinionLoadLimit);
        }
        opinions = mergeOpinionLists(remoteOpinions, supplementalOpinions);
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
    },
    async loadMoreOpinions() {
      if (!lastVisibleOpinionSnapshot) {
        canLoadMoreOpinions = false;
        return 0;
      }

      const snapshot = await getDocs(query(
        collection(db, "opinions"),
        orderBy("createdAt", "desc"),
        startAfter(lastVisibleOpinionSnapshot),
        limitQuery(opinionPageLoadSize)
      ));
      const nextOpinions = snapshot.docs.map(normalizeOpinionSnapshot);
      rememberSupplementalOpinions(nextOpinions);
      opinions = mergeOpinionLists(opinions, nextOpinions);
      lastVisibleOpinionSnapshot = snapshot.docs[snapshot.docs.length - 1] || lastVisibleOpinionSnapshot;
      canLoadMoreOpinions = snapshot.docs.length === opinionPageLoadSize;
      cacheRemoteContent(opinions);
      return nextOpinions.length;
    },
    async getOpinionByRouteId(routeId) {
      const opinion = await fetchOpinionByRouteId(routeId);
      if (opinion) {
        rememberSupplementalOpinions([opinion]);
        opinions = mergeOpinionLists([opinion], opinions);
        cacheRemoteContent(opinions);
      }
      return opinion;
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
    replies: opinion.replies.map((reply) => {
      const quote = normalizeQuoteRecord(reply.quote);
      return {
        id: reply.id,
        author: reply.author,
        text: reply.text,
        quote,
        quotedContentId: quote?.quotedContentId || null,
        quotedContentType: quote?.quotedContentType || null,
        quotedTextSnapshot: quote?.quotedTextSnapshot || null,
        likes: reply.likes,
        dislikes: Number(reply.dislikes || 0),
        reports: Number(reply.reports || 0),
        reportReasons: Array.isArray(reply.reportReasons) ? reply.reportReasons : [],
        moderationStatus: reply.moderationStatus || "approved",
        createdAt: reply.createdAt
      };
    }),
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
  void openInitialOpinionFromUrl();
}

async function openInitialOpinionFromUrl() {
  if (hasHandledInitialOpinion || isLoadingInitialRouteOpinion || !hasLoadedOpinions) return;
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

  if (dataStore.getOpinionByRouteId) {
    isLoadingInitialRouteOpinion = true;
    try {
      const remoteOpinion = await dataStore.getOpinionByRouteId(routeOpinionId);
      if (remoteOpinion && !remoteOpinion.hidden) {
        hasHandledInitialOpinion = true;
        selectedOpinionId = remoteOpinion.id;
        render();
        openOpinion(remoteOpinion.id, { replaceHistory: true, directEntry: true });
        return;
      }
    } catch (error) {
      console.warn("No se pudo cargar la opinion solicitada.", error);
    } finally {
      isLoadingInitialRouteOpinion = false;
    }
  }

  hasHandledInitialOpinion = true;
  syncUrlForView(currentView);
  render();
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

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return Promise.resolve(null);
  return navigator.serviceWorker.register("/service-worker.js")
    .then((registration) => navigator.serviceWorker.ready.then(() => registration))
    .catch((error) => {
      console.warn("No se pudo registrar la PWA.", error);
      return null;
    });
}

function waitForPwaInstallPrompt(timeoutMs = 2200) {
  if (deferredPwaInstallPrompt) return Promise.resolve(deferredPwaInstallPrompt);
  return new Promise((resolve) => {
    const finish = (promptEvent = null) => {
      window.clearTimeout(timeoutId);
      pwaInstallPromptWaiters.delete(finish);
      resolve(promptEvent);
    };
    const timeoutId = window.setTimeout(() => finish(null), timeoutMs);
    pwaInstallPromptWaiters.add(finish);
  });
}

function trackAnalyticsEvent(name, params = {}) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

function isPwaStandalone() {
  return Boolean(
    window.matchMedia?.("(display-mode: standalone)").matches ||
    window.matchMedia?.("(display-mode: window-controls-overlay)").matches ||
    window.navigator.standalone
  );
}

function isIosBrowser() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent || "");
}

function isSamsungInternetBrowser() {
  return /samsungbrowser/i.test(window.navigator.userAgent || "");
}

function isKnownLimitedInstallBrowser() {
  const userAgent = window.navigator.userAgent || "";
  return isSamsungInternetBrowser() ||
    /FBAN|FBAV|Instagram|Line|Twitter|WhatsApp|wv\)/i.test(userAgent);
}

async function isPwaLikelyInstalled() {
  if (isPwaStandalone()) return true;
  if (typeof window.navigator.getInstalledRelatedApps !== "function") return false;
  try {
    const relatedApps = await window.navigator.getInstalledRelatedApps();
    return relatedApps.some((app) => app.platform === "webapp");
  } catch (error) {
    return false;
  }
}

function trackStandalonePwaOpen() {
  if (!isPwaStandalone() || hasTrackedStandaloneOpen) return;
  hasTrackedStandaloneOpen = true;
  trackAnalyticsEvent("pwa_opened_standalone", {
    app_surface: "standalone",
    operating_system: window.navigator.platform || "unknown"
  });
}

function setupPwaInstallTracking() {
  const syncPwaInstallButton = () => {
    pwaInstallButton?.classList.toggle("hidden", !mobileViewportQuery.matches);
  };

  trackStandalonePwaOpen();
  window.matchMedia?.("(display-mode: standalone)").addEventListener?.("change", trackStandalonePwaOpen);

  window.addEventListener("appinstalled", () => {
    deferredPwaInstallPrompt = null;
    syncPwaInstallButton();
    trackAnalyticsEvent("pwa_installed", {
      install_source: "browser"
    });
    setTimeout(() => {
      if (!isPwaStandalone()) {
        window.location.assign("/");
      }
    }, 400);
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    if (!mobileViewportQuery.matches) return;
    event.preventDefault();
    deferredPwaInstallPrompt = event;
    pwaInstallPromptWaiters.forEach((resolvePrompt) => resolvePrompt(event));
    syncPwaInstallButton();
    trackAnalyticsEvent("pwa_install_prompt_shown", {
      prompt_source: "footer_button"
    });
  });

  const startInstallPrompt = async (source) => {
    trackAnalyticsEvent("pwa_install_prompt_clicked", {
      prompt_source: source
    });
    if (isKnownLimitedInstallBrowser()) {
      trackAnalyticsEvent("pwa_install_prompt_limited_browser", {
        prompt_source: source,
        user_agent_hint: isSamsungInternetBrowser() ? "samsung_internet" : "embedded_browser"
      });
      showToast("Para instalar sin alertas, abrila desde Google Chrome normal y toca Descargar App.");
      return;
    }
    if (!deferredPwaInstallPrompt) {
      showToast("Preparando instalacion...");
      await waitForPwaInstallPrompt();
    }
    if (!deferredPwaInstallPrompt) {
      const alreadyInstalled = await isPwaLikelyInstalled();
      trackAnalyticsEvent("pwa_install_prompt_unavailable", {
        prompt_source: source,
        already_installed: alreadyInstalled ? "yes" : "no"
      });
      if (alreadyInstalled) {
        showToast("Ya esta instalada. Abrila desde el icono QuieroOpinar.");
      } else {
        showToast(isIosBrowser() ? "En iPhone: Compartir y Agregar a pantalla de inicio." : "Chrome no habilito el instalador todavia. Proba abrirla en Chrome completo y tocar Descargar App de nuevo.");
      }
      return;
    }
    deferredPwaInstallPrompt.prompt();
    const choice = await deferredPwaInstallPrompt.userChoice;
    trackAnalyticsEvent("pwa_install_prompt_closed", {
      prompt_source: source,
      outcome: choice?.outcome || "unknown"
    });
    if (choice?.outcome === "dismissed") {
      trackAnalyticsEvent("pwa_install_prompt_dismissed", {
        prompt_source: source
      });
    }
    deferredPwaInstallPrompt = null;
    syncPwaInstallButton();
  };

  pwaInstallButton?.addEventListener("click", () => startInstallPrompt("footer_button"));
  syncPwaInstallButton();
  mobileViewportQuery.addEventListener("change", () => {
    syncPwaInstallButton();
  });
}

registerServiceWorker();
setupPwaInstallTracking();
initializeAppData();
