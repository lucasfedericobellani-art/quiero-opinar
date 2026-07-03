const ADMIN_STORAGE_KEY = 'quiero-opinar:admin-session';
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'quiero-opinar2026';

const loginView = document.querySelector('#loginView');
const adminView = document.querySelector('#adminView');
const loginForm = document.querySelector('#adminLoginForm');
const loginError = document.querySelector('#loginError');
const adminSummary = document.querySelector('#adminSummary');
const adminOpinionList = document.querySelector('#adminOpinionList');
const logoutButton = document.querySelector('#logoutButton');
const refreshButton = document.querySelector('#refreshButton');

let opinions = [];
let currentSession = null;

function getStoredSession() {
  try {
    return JSON.parse(window.localStorage.getItem(ADMIN_STORAGE_KEY));
  } catch {
    return null;
  }
}

function saveSession(session) {
  window.localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(session));
}

function clearSession() {
  window.localStorage.removeItem(ADMIN_STORAGE_KEY);
}

function deriveAdminState() {
  const session = getStoredSession();
  if (session?.username === ADMIN_USERNAME && session?.password === ADMIN_PASSWORD) {
    currentSession = session;
    return true;
  }
  currentSession = null;
  return false;
}

function showLogin() {
  loginView.classList.remove('hidden');
  adminView.classList.add('hidden');
}

function showAdmin() {
  loginView.classList.add('hidden');
  adminView.classList.remove('hidden');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function normalizeOpinion(opinion) {
  return {
    id: opinion.id || '',
    author: opinion.author || 'Anonimo',
    topic: opinion.topic || 'sin-tema',
    text: opinion.text || '',
    views: Number(opinion.views || 0),
    likes: Number(opinion.likes || 0),
    createdAt: opinion.createdAt || new Date().toISOString(),
    replies: Array.isArray(opinion.replies) ? opinion.replies : [],
    hidden: Boolean(opinion.hidden)
  };
}

function loadOpinionsFromStorage() {
  try {
    const stored = window.localStorage.getItem('quiero-opinar:opinions');
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.map(normalizeOpinion) : [];
  } catch {
    return [];
  }
}

function renderAdminList() {
  if (!opinions.length) {
    adminOpinionList.innerHTML = '<p class="admin-empty">No hay opiniones para moderar.</p>';
    return;
  }

  adminOpinionList.innerHTML = opinions.map((opinion) => `
    <article class="admin-opinion-card">
      <div class="admin-opinion-head">
        <div>
          <p class="section-label">${escapeHtml(opinion.topic)}</p>
          <h3>${escapeHtml(opinion.author)}</h3>
        </div>
        <div class="admin-actions">
          <button class="ghost-button" type="button" data-action="toggle-hidden" data-id="${opinion.id}">${opinion.hidden ? 'Mostrar' : 'Ocultar'}</button>
        </div>
      </div>
      <p class="admin-opinion-text">${escapeHtml(opinion.text)}</p>
      <div class="admin-meta">
        <span>${opinion.views} vistas</span>
        <span>${opinion.likes} likes</span>
        <span>${opinion.replies.length} respuestas</span>
        <span>${opinion.hidden ? 'Oculta' : 'Visible'}</span>
      </div>
    </article>
  `).join('');
}

async function refreshOpinions() {
  opinions = loadOpinionsFromStorage();
  opinions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  adminSummary.textContent = `${opinions.length} opiniones cargadas`;
  renderAdminList();
}

function persistOpinions(nextOpinions) {
  opinions = nextOpinions;
  window.localStorage.setItem('quiero-opinar:opinions', JSON.stringify(nextOpinions));
}

async function toggleOpinionVisibility(opinionId) {
  const nextOpinions = opinions.map((opinion) => {
    if (opinion.id !== opinionId) return opinion;
    return { ...opinion, hidden: !opinion.hidden };
  });
  persistOpinions(nextOpinions);
  await refreshOpinions();
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.querySelector('#adminUsername').value.trim();
  const password = document.querySelector('#adminPassword').value;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const session = { username, password };
    saveSession(session);
    currentSession = session;
    loginError.textContent = '';
    showAdmin();
    refreshOpinions();
    return;
  }

  loginError.textContent = 'Credenciales invalidas.';
});

logoutButton.addEventListener('click', () => {
  clearSession();
  currentSession = null;
  showLogin();
});

refreshButton.addEventListener('click', () => {
  refreshOpinions();
});

adminOpinionList.addEventListener('click', async (event) => {
  const button = event.target.closest('button[data-action="toggle-hidden"]');
  if (!button) return;
  const opinionId = button.getAttribute('data-id');
  if (!opinionId) return;
  await toggleOpinionVisibility(opinionId);
});

function initAdmin() {
  if (deriveAdminState()) {
    showAdmin();
    refreshOpinions();
  } else {
    showLogin();
  }
}

initAdmin();
