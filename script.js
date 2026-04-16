const addProjectBtn = document.getElementById("addProjectBtn");
const projectDialog = document.getElementById("projectDialog");
const cancelDialogBtn = document.getElementById("cancelDialogBtn");
const projectForm = document.getElementById("projectForm");
const projectList = document.querySelector(".project-list");

if (addProjectBtn && projectDialog) {
  addProjectBtn.addEventListener("click", () => {
    projectDialog.showModal();
  });
}

if (cancelDialogBtn && projectDialog) {
  cancelDialogBtn.addEventListener("click", () => {
    projectDialog.close();
  });
}

if (projectForm && projectDialog && projectList) {
  projectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(projectForm);
    const title = String(formData.get("title") || "").trim();
    const before = String(formData.get("before") || "").trim();
    const after = String(formData.get("after") || "").trim();
    const impact = String(formData.get("impact") || "").trim();

    if (!title || !before || !after || !impact) {
      return;
    }

    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
      <div class="project-head">
        <h3>${escapeHtml(title)}</h3>
        <span class="tag">Novo</span>
      </div>
      <div class="before-after">
        <div>
          <h4>Antes</h4>
          <p>${escapeHtml(before)}</p>
        </div>
        <div>
          <h4>Depois</h4>
          <p>${escapeHtml(after)}</p>
        </div>
      </div>
      <p class="impact">Impacto: ${escapeHtml(impact)}</p>
    `;

    projectList.prepend(card);
    projectDialog.close();
    projectForm.reset();
  });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatDateShortBR(date) {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });
}

function formatDateLongBR(date) {
  const raw = date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

function hydrateSystemDates() {
  const today = new Date();

  const headerDate = document.querySelector("[data-date-role=\"today-long\"]");
  if (headerDate) {
    headerDate.textContent = formatDateLongBR(today);
  }

  const deadlineNodes = document.querySelectorAll("[data-offset-days]");
  deadlineNodes.forEach((node) => {
    const offset = Number(node.getAttribute("data-offset-days") || "0");
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    node.textContent = formatDateShortBR(d);
  });
}

document.addEventListener("DOMContentLoaded", hydrateSystemDates);
