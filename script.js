const languages = [
  {
    "code": "fr",
    "label": "Français",
    "welcome": "Bienvenue\nen Chartreuse",
    "panel": "panels/panel-fr.png",
    "flag": "assets/flag-fr.png"
  },
  {
    "code": "en",
    "label": "English",
    "welcome": "Welcome\nto Chartreuse",
    "panel": "panels/panel-en.png",
    "flag": "assets/flag-en.png"
  },
  {
    "code": "es",
    "label": "Español",
    "welcome": "Bienvenido\na Chartreuse",
    "panel": "panels/panel-es.png",
    "flag": "assets/flag-es.png"
  },
  {
    "code": "ja",
    "label": "日本語",
    "welcome": "シャルトルーズへ\nようこそ",
    "panel": "panels/panel-ja.png",
    "flag": "assets/flag-ja.png"
  },
  {
    "code": "ko",
    "label": "한국어",
    "welcome": "샤르트뢰즈에\n오신 것을 환영합니다",
    "panel": "panels/panel-ko.png",
    "flag": "assets/flag-ko.png"
  },
  {
    "code": "ar",
    "label": "العربية",
    "welcome": "مرحبًا بكم\nفي شارتروز",
    "panel": "panels/panel-ar.png",
    "flag": "assets/flag-ar.png"
  },
  {
    "code": "de",
    "label": "Deutsch",
    "welcome": "Willkommen\nin der Chartreuse",
    "panel": "panels/panel-de.png",
    "flag": "assets/flag-de.png"
  },
  {
    "code": "it",
    "label": "Italiano",
    "welcome": "Benvenuti\nin Chartreuse",
    "panel": "panels/panel-it.png",
    "flag": "assets/flag-it.png"
  },
  {
    "code": "pt",
    "label": "Português",
    "welcome": "Bem-vindo\nà Chartreuse",
    "panel": "panels/panel-pt.png",
    "flag": "assets/flag-pt.png"
  }
];

const welcomeText = document.querySelector("#welcomeText");
const intro = document.querySelector(".intro");
const panelImage = document.querySelector("#panelImage");
const zoomImage = document.querySelector("#zoomImage");
const buttons = document.querySelectorAll(".flag-button");
const openZoom = document.querySelector("#openZoom");
const openZoomIcon = document.querySelector("#openZoomIcon");
const zoomModal = document.querySelector("#zoomModal");
const closeZoom = document.querySelector("#closeZoom");
const topMeta = document.querySelector("#topMeta");
const scrollCue = document.querySelector("#scrollCue");
const panelZone = document.querySelector(".panel-zone");

let welcomeIndex = 0;

function setWelcome(index) {
  const language = languages[index % languages.length];

  welcomeText.style.opacity = "0";
  welcomeText.style.transform = "translateY(4px)";

  window.setTimeout(() => {
    welcomeText.innerHTML = language.welcome.replace(/\n/g, "<br>");
    welcomeText.style.opacity = "1";
    welcomeText.style.transform = "translateY(0)";
  }, 170);
}

function setPanelLanguage(code) {
  const language = languages.find((item) => item.code === code);
  if (!language) return;

  panelImage.src = language.panel;
  panelImage.alt = `Panneau de randonnée Dent de Crolles — ${language.label}`;
  zoomImage.src = language.panel;
  zoomImage.alt = `Panneau de randonnée Dent de Crolles agrandi — ${language.label}`;

  buttons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === code);
  });
}

function showZoom() {
  zoomImage.src = panelImage.src;
  zoomImage.alt = panelImage.alt + " agrandi";
  zoomModal.classList.add("open");
  zoomModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function hideZoom() {
  zoomModal.classList.remove("open");
  zoomModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateScrollEffects() {
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);

  topMeta.classList.toggle("is-hidden", window.scrollY > 28);
  intro.classList.toggle("is-hidden", window.scrollY > 28);
  scrollCue.classList.toggle("is-hidden", window.scrollY > 18);

  document.documentElement.style.setProperty("--scroll-black", (progress * 0.68).toFixed(3));
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    setPanelLanguage(button.dataset.lang);
  });
});

openZoom.addEventListener("click", showZoom);
openZoomIcon.addEventListener("click", showZoom);
closeZoom.addEventListener("click", hideZoom);

scrollCue.addEventListener("click", () => {
  panelZone.scrollIntoView({ behavior: "smooth", block: "center" });
});

zoomModal.addEventListener("click", (event) => {
  if (event.target === zoomModal) {
    hideZoom();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideZoom();
  }
});

window.addEventListener("scroll", updateScrollEffects, { passive: true });
window.addEventListener("resize", updateScrollEffects);

window.setInterval(() => {
  welcomeIndex = (welcomeIndex + 1) % languages.length;
  setWelcome(welcomeIndex);
}, 2000);

setPanelLanguage("fr");
updateScrollEffects();
