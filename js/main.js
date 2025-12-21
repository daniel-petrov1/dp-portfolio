const initActiveNav = () => {
  const nav = document.querySelector('[data-include="global-nav"]');
  if (!nav) return;

  const path = window.location.pathname.toLowerCase();
  
  nav.querySelectorAll(".global-nav__btn").forEach(btn => {
    const type = btn.dataset.nav;
    btn.classList.remove("is-active");

    if (type === "mods" && path.includes("/modifications")) {
      btn.classList.add("is-active");
    }

    if (type === "work" && (path === "/" || path === "/index.html" || path.includes("/cases/"))) {
      btn.classList.add("is-active");
    }
  });
};

const observer = new MutationObserver((mutations, obs) => {
  const nav = document.querySelector('[data-include="global-nav"]');
  if (nav && nav.children.length > 0) {
    initActiveNav();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

document.addEventListener("DOMContentLoaded", initActiveNav);

// copy btn
const alertEl = document.getElementById("copy-alert");

function showAlert() {
  if (!alertEl) return;
  alertEl.classList.add("show");
  setTimeout(() => alertEl.classList.remove("show"), 2000);
}

function swapIcon(icon) {
  if (!icon) return;
  icon.classList.remove("fi-rr-copy");
  icon.classList.add("fi-rr-check-circle");

  setTimeout(() => {
    icon.classList.remove("fi-rr-check-circle");
    icon.classList.add("fi-rr-copy");
  }, 2000);
}

document.addEventListener("click", e => {
  const target = e.target;

  /* =====================
     COPY CLASS (data-copy)
  ===================== */
  const copySpan = target.closest("[data-copy]");
  if (copySpan) {
    const text = copySpan.dataset.copy;
    const icon = copySpan.querySelector("i");

    navigator.clipboard.writeText(text)
      .then(() => {
        showAlert();
        swapIcon(icon);
      })
      .catch(err => console.error("Copy failed:", err));

    return;
  }

  /* =====================
     COPY CODE BUTTON
  ===================== */
  const btn = target.closest(".mod-code__copy-btn");
  if (!btn) return;

  const codeEl = btn
    .closest(".mod-code__block-wrap")
    ?.querySelector("code");

  if (!codeEl) return;

  const textEl = btn.querySelector(".mod-code__copy-text");
  const iconEl = btn.querySelector(".mod-code__copy-icon");

  navigator.clipboard.writeText(codeEl.textContent)
    .then(() => {
      // текст кнопки
      if (textEl) {
        const original = textEl.textContent;
        textEl.textContent = "Copied!";
        setTimeout(() => textEl.textContent = original, 2000);
      }

      swapIcon(iconEl);
      showAlert();
    })
    .catch(err => console.error("Copy failed:", err));
});

// marquue
const track = document.querySelector('.marquee__track');
let pos = 0;

function animate() {
  pos -= 0.5; // скорость
  if (pos <= -track.offsetWidth / 2) pos = 0; // сброс
  track.style.transform = `translateX(${pos}px)`;
  requestAnimationFrame(animate);
}

animate();