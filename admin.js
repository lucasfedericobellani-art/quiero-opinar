const loginView = document.querySelector("#loginView");
const adminView = document.querySelector("#adminView");
const loginForm = document.querySelector("#adminLoginForm");
const loginError = document.querySelector("#loginError");
const adminSummary = document.querySelector("#adminSummary");
const adminOpinionList = document.querySelector("#adminOpinionList");
const logoutButton = document.querySelector("#logoutButton");
const refreshButton = document.querySelector("#refreshButton");

const adminEmails = (window.QO_ADMIN_EMAILS || []).map((email) => email.toLowerCase());

let auth = null;
let db = null;
let opinions = [];
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
    hidden: Boolean(opinion.hidden)
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

function renderAdminList() {
  if (!opinions.length) {
    adminOpinionList.innerHTML = '<p class="admin-empty">No hay opiniones para moderar.</p>';
    return;
  }

  adminOpinionList.innerHTML = opinions.map((opinion) => `
    <article class="admin-opinion-card">
      <div class="admin-opinion-head">
        <div>
          <p class="section-label">${escapeHtml(opinion.topic)} · ${formatDate(opinion.createdAt)}</p>
          <h3>${escapeHtml(opinion.author)}</h3>
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
        <span>${opinion.hidden ? "Oculta" : "Visible"}</span>
      </div>
    </article>
  `).join("");
}

function renderSummary() {
  const hiddenCount = opinions.filter((opinion) => opinion.hidden).length;
  adminSummary.textContent = `${opinions.length} opiniones cargadas · ${hiddenCount} ocultas`;
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
      showLogin("Ese email no esta habilitado como administrador.");
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
      showLogin("Ese email no esta habilitado como administrador.");
      return;
    }

    try {
      await authModule.signInWithEmailAndPassword(auth, email, password);
      loginForm.reset();
    } catch (error) {
      console.error("Error de login admin.", error);
      showLogin("Credenciales invalidas o proveedor de email/password no habilitado.");
    }
  });

  logoutButton.addEventListener("click", async () => {
    await authModule.signOut(auth);
  });

  refreshButton.addEventListener("click", () => {
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

      if (action === "delete" && window.confirm("Eliminar esta opinion de forma permanente?")) {
        await deleteDoc(doc(db, "opinions", opinionId));
      }
    } catch (error) {
      console.error("No se pudo moderar la opinion.", error);
      window.alert("No se pudo aplicar la accion. Revisar permisos de administrador.");
    } finally {
      button.disabled = false;
    }
  });
}

initializeAdmin().catch((error) => {
  console.error("No se pudo iniciar el panel admin.", error);
  showLogin("No se pudo iniciar el panel de administrador.");
});
