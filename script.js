const openLetterButton = document.getElementById("open-letter");
const closeLetterButton = document.getElementById("close-letter");
const letterDialog = document.getElementById("letter-dialog");
const hopeButton = document.getElementById("hope-button");
const timeButton = document.getElementById("time-button");
const responseBox = document.getElementById("response-box");
const prevSlideButton = document.getElementById("prev-slide");
const nextSlideButton = document.getElementById("next-slide");
const slides = Array.from(document.querySelectorAll("[data-slide]"));
const dots = Array.from(document.querySelectorAll("[data-dot]"));

const messages = [
  "Je ne te presse pas. Je voulais seulement te dire la vérité avec sincérité.",
  "Si tu as besoin de distance, je la respecterai. Mes regrets, eux, sont réels.",
  "Même si tu restes silencieuse pour l’instant, je voulais que tu saches ce que j’ai sur le coeur.",
];

let messageIndex = 0;
let activeSlideIndex = 0;
let autoplayId = null;

function renderSlides(nextIndex) {
  activeSlideIndex = (nextIndex + slides.length) % slides.length;

  slides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === activeSlideIndex);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === activeSlideIndex);
  });
}

function startAutoplay() {
  stopAutoplay();
  autoplayId = window.setInterval(() => {
    renderSlides(activeSlideIndex + 1);
  }, 4500);
}

function stopAutoplay() {
  if (autoplayId !== null) {
    window.clearInterval(autoplayId);
    autoplayId = null;
  }
}

openLetterButton?.addEventListener("click", () => {
  letterDialog?.showModal();
});

closeLetterButton?.addEventListener("click", () => {
  letterDialog?.close();
});

letterDialog?.addEventListener("click", (event) => {
  const rect = letterDialog.getBoundingClientRect();
  const inside =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

  if (!inside) {
    letterDialog.close();
  }
});

hopeButton?.addEventListener("click", () => {
  responseBox.textContent =
    "J’espère encore qu’un jour tu accepteras de me reparler, même quelques minutes.";
});

timeButton?.addEventListener("click", () => {
  responseBox.textContent = messages[messageIndex % messages.length];
  messageIndex += 1;
});

prevSlideButton?.addEventListener("click", () => {
  renderSlides(activeSlideIndex - 1);
  startAutoplay();
});

nextSlideButton?.addEventListener("click", () => {
  renderSlides(activeSlideIndex + 1);
  startAutoplay();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    renderSlides(index);
    startAutoplay();
  });
});

document.getElementById("memory-carousel")?.addEventListener("mouseenter", stopAutoplay);
document.getElementById("memory-carousel")?.addEventListener("mouseleave", startAutoplay);

renderSlides(0);
startAutoplay();
