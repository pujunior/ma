/**
 * Site romântico — JavaScript
 * Edite as seções marcadas com "CONFIGURAÇÃO" para personalizar.
 */

/* ==========================================================================
   CONFIGURAÇÃO — EDITE AQUI
   ========================================================================== */

/** Data em que o relacionamento começou (formato ISO local). */
const dataInicio = new Date("2025-11-13T00:00:00");

/**
 * Foto grande no final do site (arquivo dentro de assets/images/).
 * Ex.: "nossa-foto.jpg"
 */
const FINAL_COUPLE_IMAGE = "placebo-casal.svg.jpeg";

/**
 * Caminho da música (relativo à raiz do site).
 */
const MUSIC_PATH = "assets/music/nossa-musica.mp3";

/**
 * Galeria: deixe null para carregar assets/images/manifest.json.
 * Ou defina manualmente: ["foto1.jpg", "foto2.png"]
 */
const GALLERY_IMAGES = null;

/**
 * Linha do tempo — títulos e textos genéricos (substitua pelos seus).
 */
const TIMELINE = [
  {
    title: "Quando tudo começou",
    text: "Um encontro que parecia simples, mas que mudou tudo. Desde então, cada dia ganhou um novo significado.",
  },
  {
    title: "Nosso primeiro encontro",
    text: "Conversas, risadas e aquela sensação de que algo especial estava nascendo entre nós.",
  },
  {
    title: "Os momentos que vivemos juntos",
    text: "Viagens, cafés, silêncios confortáveis e pequenas aventuras que guardo como tesouros.",
  },
  {
    title: "Todos os dias que fizeram nossa história crescer",
    text: "Cada capítulo novo reforça o quanto somos importantes um para o outro — e o quanto ainda quero escrever ao seu lado.",
  },
];

/* ==========================================================================
   Estado e referências DOM
   ========================================================================== */

const intro = document.getElementById("intro");
const btnEntrar = document.getElementById("btn-entrar");
const appShell = document.getElementById("app-shell");
const audio = document.getElementById("audio-musica");
const musicPlayer = document.getElementById("music-player");
const btnMusicToggle = document.getElementById("btn-music-toggle");
const iconPlay = document.getElementById("icon-play");
const iconPause = document.getElementById("icon-pause");
const musicLabel = document.getElementById("music-label");
const musicDot = document.getElementById("music-dot");
const volumeControl = document.getElementById("volume-control");
const timelineEl = document.getElementById("timeline");
const galeriaGrid = document.getElementById("galeria-grid");
const galeriaVazia = document.getElementById("galeria-vazia");
const fotoCasalFinal = document.getElementById("foto-casal-final");
const btnTopo = document.getElementById("btn-topo");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const letterEl = document.getElementById("carta-conteudo");

let galleryFiles = [];
let lightboxIndex = 0;
let hasEntered = false;
let counterInterval = null;

/* ==========================================================================
   Intro e entrada
   ========================================================================== */

function enterSite() {
  if (hasEntered) return;
  hasEntered = true;

  intro.classList.add("intro--leaving");

  setTimeout(() => {
    intro.setAttribute("hidden", "");
    appShell.hidden = false;
    appShell.classList.remove("app-shell--hidden");
    appShell.classList.add("app-shell--visible");
    document.body.classList.add("is-entered");

    musicPlayer.hidden = false;
    btnTopo.hidden = false;

    startMusic();
    initRevealAnimations();
    initLetterReveal();
    updateCounter();
    if (counterInterval) clearInterval(counterInterval);
    counterInterval = setInterval(updateCounter, 1000);
  }, 850);
}

btnEntrar.addEventListener("click", enterSite);

btnEntrar.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    enterSite();
  }
});

/* ==========================================================================
   Música
   ========================================================================== */

function setupAudio() {
  const source = audio.querySelector("source");
  if (source) source.src = MUSIC_PATH;
  audio.load();

  const vol = Number(volumeControl.value) / 100;
  audio.volume = vol;

  volumeControl.addEventListener("input", () => {
    audio.volume = Number(volumeControl.value) / 100;
    volumeControl.setAttribute("aria-valuenow", volumeControl.value);
  });

  btnMusicToggle.addEventListener("click", toggleMusic);

  audio.addEventListener("play", updateMusicUI);
  audio.addEventListener("pause", updateMusicUI);
  audio.addEventListener("error", () => {
    audio.pause();
    musicLabel.textContent = "Coloque nossa-musica.mp3 em assets/music/";
    musicDot.classList.remove("is-playing");
    iconPlay.classList.remove("hidden");
    iconPause.classList.add("hidden");
  });
}

function startMusic() {
  audio.play().catch(() => {
    musicLabel.textContent = "Toque ▶ para ouvir";
  });
}

function toggleMusic() {
  if (audio.paused) {
    audio.play().catch(() => {
      musicLabel.textContent = "Não foi possível tocar";
    });
  } else {
    audio.pause();
  }
}

function updateMusicUI() {
  const playing = !audio.paused;
  iconPlay.classList.toggle("hidden", playing);
  iconPause.classList.toggle("hidden", !playing);
  musicDot.classList.toggle("is-playing", playing);
  musicLabel.textContent = playing ? "Tocando agora" : "Pausado";
  btnMusicToggle.setAttribute("aria-label", playing ? "Pausar música" : "Reproduzir música");
}

/* ==========================================================================
   Linha do tempo
   ========================================================================== */

function renderTimeline() {
  timelineEl.innerHTML = "";
  TIMELINE.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "timeline-item reveal";
    li.innerHTML = `
      <div class="timeline-spacer" aria-hidden="true"></div>
      <article class="timeline-card">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>
      </article>
    `;
    li.style.transitionDelay = `${index * 0.1}s`;
    timelineEl.appendChild(li);
  });
}

/* ==========================================================================
   Galeria
   ========================================================================== */

function filterGalleryFiles(names) {
  const skip = new Set(["manifest.json", "favicon.svg", FINAL_COUPLE_IMAGE]);
  return names.filter((name) => {
    if (!name || skip.has(name)) return false;
    if (name.startsWith("placeholder-casal")) return false;
    return /\.(jpe?g|png|gif|webp|svg|avif)$/i.test(name);
  });
}

async function loadGalleryList() {
  if (Array.isArray(GALLERY_IMAGES) && GALLERY_IMAGES.length > 0) {
    return filterGalleryFiles(GALLERY_IMAGES);
  }

  try {
    const res = await fetch("assets/images/manifest.json");
    if (!res.ok) throw new Error("manifest");
    const data = await res.json();
    if (Array.isArray(data)) {
      return filterGalleryFiles(data);
    }
  } catch {
    /* file:// ou manifest ausente — lista padrão */
  }

  return ["placeholder-1.svg", "placeholder-2.svg", "placeholder-3.svg", "placeholder-4.svg"];
}

function renderGallery(files) {
  galleryFiles = files;
  galeriaGrid.innerHTML = "";

  if (!files.length) {
    galeriaVazia.hidden = false;
    return;
  }

  galeriaVazia.hidden = true;

  files.forEach((file, index) => {
    const src = `assets/images/${encodeURIComponent(file)}`;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gallery-item reveal";
    btn.setAttribute("role", "listitem");
    btn.setAttribute("aria-label", `Abrir foto ${index + 1}`);
    btn.style.transitionDelay = `${(index % 6) * 0.08}s`;

    const img = document.createElement("img");
    img.src = src;
    img.alt = `Momento ${index + 1}`;
    img.loading = "lazy";
    img.decoding = "async";

    const overlay = document.createElement("span");
    overlay.className = "gallery-item__overlay";
    overlay.textContent = "Ver em tela cheia";

    btn.append(img, overlay);
    btn.addEventListener("click", () => openLightbox(index));
    galeriaGrid.appendChild(btn);
  });
}

/* ==========================================================================
   Lightbox
   ========================================================================== */

function openLightbox(index) {
  lightboxIndex = index;
  updateLightboxImage();
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function updateLightboxImage() {
  const file = galleryFiles[lightboxIndex];
  if (!file) return;
  const src = `assets/images/${encodeURIComponent(file)}`;
  lightboxImg.src = src;
  lightboxImg.alt = `Foto ${lightboxIndex + 1} de ${galleryFiles.length}`;
  lightboxCaption.textContent = lightboxImg.alt;
}

function lightboxStep(delta) {
  if (!galleryFiles.length) return;
  lightboxIndex = (lightboxIndex + delta + galleryFiles.length) % galleryFiles.length;
  updateLightboxImage();
}

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => lightboxStep(-1));
lightboxNext.addEventListener("click", () => lightboxStep(1));

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") lightboxStep(-1);
  if (e.key === "ArrowRight") lightboxStep(1);
});

/* ==========================================================================
   Contador de tempo
   ========================================================================== */

function updateCounter() {
  const now = new Date();
  let start = new Date(dataInicio);
  if (Number.isNaN(start.getTime())) return;

  if (now < start) {
    setCounterValues(0, 0, 0, 0, 0, 0);
    return;
  }

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  setCounterValues(years, months, days, hours, minutes, seconds);
}

function setCounterValues(y, mo, d, h, mi, s) {
  document.getElementById("cnt-anos").textContent = String(y);
  document.getElementById("cnt-meses").textContent = String(mo);
  document.getElementById("cnt-dias").textContent = String(d);
  document.getElementById("cnt-horas").textContent = String(h).padStart(2, "0");
  document.getElementById("cnt-minutos").textContent = String(mi).padStart(2, "0");
  document.getElementById("cnt-segundos").textContent = String(s).padStart(2, "0");
}

/* ==========================================================================
   Animações ao scroll
   ========================================================================== */

function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
}

function initLetterReveal() {
  if (!letterEl) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          letterEl.classList.add("is-revealed");
          observer.disconnect();
        }
      });
    },
    { threshold: 0.25 }
  );
  observer.observe(letterEl);
}

/* ==========================================================================
   Navegação suave (offset do header)
   ========================================================================== */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const id = anchor.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - varHeaderOffset();
    window.scrollTo({ top, behavior: "smooth" });
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });
});

function varHeaderOffset() {
  return parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h"), 10) || 56;
}

/* ==========================================================================
   Botão voltar ao topo
   ========================================================================== */

window.addEventListener(
  "scroll",
  () => {
    if (!hasEntered) return;
    btnTopo.style.opacity = window.scrollY > 400 ? "1" : "0";
    btnTopo.style.pointerEvents = window.scrollY > 400 ? "auto" : "none";
  },
  { passive: true }
);

btnTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ==========================================================================
   Partículas / corações discretos
   ========================================================================== */

function initParticles(canvasId, options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const particles = [];
  const count = options.count ?? 28;
  const heartRatio = options.hearts ?? 0.35;

  function resize() {
    canvas.width = canvas.offsetWidth * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }

  function createParticle() {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      size: 4 + Math.random() * 10,
      speedY: 0.15 + Math.random() * 0.45,
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: 0.08 + Math.random() * 0.22,
      isHeart: Math.random() < heartRatio,
      phase: Math.random() * Math.PI * 2,
    };
  }

  for (let i = 0; i < count; i++) particles.push(createParticle());

  function drawHeart(x, y, size, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = options.color ?? "#d4567a";
    ctx.beginPath();
    const s = size / 12;
    ctx.moveTo(x, y + 2 * s);
    ctx.bezierCurveTo(x, y, x - 4 * s, y, x - 4 * s, y + 2 * s);
    ctx.bezierCurveTo(x - 4 * s, y + 5 * s, x, y + 8 * s, x, y + 10 * s);
    ctx.bezierCurveTo(x, y + 8 * s, x + 4 * s, y + 5 * s, x + 4 * s, y + 2 * s);
    ctx.bezierCurveTo(x + 4 * s, y, x, y, x, y + 2 * s);
    ctx.fill();
    ctx.restore();
  }

  function frame() {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    ctx.clearRect(0, 0, w, h);

    particles.forEach((p) => {
      p.y -= p.speedY;
      p.x += p.speedX + Math.sin(p.phase + p.y * 0.02) * 0.15;
      if (p.y < -20) {
        p.y = h + 20;
        p.x = Math.random() * w;
      }

      if (p.isHeart) {
        drawHeart(p.x, p.y, p.size, p.opacity);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 164, 184, ${p.opacity})`;
        ctx.fill();
      }
    });

    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(frame);
}

/* ==========================================================================
   Utilitários
   ========================================================================== */

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function setupFinalPhoto() {
  if (fotoCasalFinal && FINAL_COUPLE_IMAGE) {
    fotoCasalFinal.src = `assets/images/${encodeURIComponent(FINAL_COUPLE_IMAGE)}`;
  }
}

/* ==========================================================================
   Inicialização
   ========================================================================== */

async function init() {
  renderTimeline();
  setupAudio();
  setupFinalPhoto();

  const files = await loadGalleryList();
  renderGallery(files);

  initParticles("particles-canvas", { count: 24, hearts: 0.3 });
  initParticles("finale-particles", { count: 18, hearts: 0.55, color: "#e8a4b8" });
}

init();
