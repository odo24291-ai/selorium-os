
const clock = document.getElementById("clock");
const overview = document.getElementById("overview");
const search = document.getElementById("app-search");
const grid = document.getElementById("app-grid");
const windowArea = document.getElementById("window-area");

const apps = [
  { id: "files", name: "Files", icon: "📁", content: "Home directory" },
  { id: "terminal", name: "Terminal", icon: "⌨", content: "Welcome to Solarium Terminal." },
  { id: "settings", name: "Settings", icon: "⚙", content: "System Settings" },
  { id: "about", name: "About", icon: "ⓘ", content: "Solarium OS 0.2.0" },
  { id: "browser", name: "Browser", icon: "🌐", content: "Web Browser" },
  { id: "monitor", name: "System Monitor", icon: "▥", content: "System Monitor" }
];

function updateClock() {
  clock.textContent = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

setInterval(updateClock, 1000);
updateClock();

function openOverview() {
  overview.classList.remove("hidden");
  search.value = "";
  renderApps("");
  search.focus();
}

function closeOverview() {
  overview.classList.add("hidden");
}

function renderApps(query) {
  grid.innerHTML = "";

  apps
    .filter(app => app.name.toLowerCase().includes(query.toLowerCase()))
    .forEach(app => {
      const button = document.createElement("button");
      button.className = "app-card";

      const icon = document.createElement("span");
      icon.className = "app-icon";
      icon.textContent = app.icon;

      const name = document.createElement("span");
      name.textContent = app.name;

      button.append(icon, name);
      button.addEventListener("click", () => {
        openApp(app);
        closeOverview();
      });

      grid.appendChild(button);
    });
}

function openApp(app) {
  const win = document.createElement("div");
  win.className = "window";

  const title = document.createElement("h2");
  title.textContent = app.name;

  const content = document.createElement("p");
  content.textContent = app.content;

  const close = document.createElement("button");
  close.textContent = "Close";
  close.onclick = () => win.remove();

  win.append(title, content, close);
  windowArea.appendChild(win);
}

document.getElementById("activities")
  .addEventListener("click", openOverview);

document.getElementById("close-overview")
  .addEventListener("click", closeOverview);

search.addEventListener("input", () => {
  renderApps(search.value);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeOverview();
  }

  if (event.key === "Meta" || event.key === "OS") {
    openOverview();
  }
});

document.querySelectorAll(".app").forEach(button => {
  button.addEventListener("click", () => {
    const app = apps.find(a => a.id === button.dataset.app);
    if (app) openApp(app);
  });
});

renderApps("");
