
const clock = document.getElementById("clock");
const windowArea = document.getElementById("window-area");

function updateClock() {
  clock.textContent = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

updateClock();
setInterval(updateClock, 1000);

const apps = {
  files: {
    title: "File Manager",
    content: "Welcome to your Solarium files."
  },
  terminal: {
    title: "Terminal",
    content: "Solarium OS Terminal<br><br>Welcome back.<br><br>$ "
  },
  settings: {
    title: "Settings",
    content: "Desktop settings<br><br>Version 0.1.0"
  },
  about: {
    title: "About Solarium",
    content: "Solarium OS<br>Version 0.1.0<br>Built for the web."
  }
};

document.querySelectorAll(".app").forEach(button => {
  button.addEventListener("click", () => {
    const app = apps[button.dataset.app];

    const win = document.createElement("div");
    win.className = "window";

    const heading = document.createElement("h2");
    heading.textContent = app.title;

    const content = document.createElement("p");
    content.textContent = app.content.replace(/<br>/g, " ");

    const close = document.createElement("button");
    close.textContent = "Close";
    close.addEventListener("click", () => win.remove());

    win.append(heading, content, close);
    windowArea.appendChild(win);
  });
});
