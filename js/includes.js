// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelectorAll("[data-include]").forEach(async el => {
//     const name = el.dataset.include;

//     try {
//       const res = await fetch(`/components/${name}.html`);
//       if (!res.ok) throw new Error(name);

//       const html = await res.text();
//       el.innerHTML = html;

//       /* MOD CARDS */
//       if (name === "mod-item") {
//         const link = el.querySelector(".mod__link");
//         const href = el.dataset.href;
//         if (link) href ? (link.href = href) : link.removeAttribute("href");

//         // title
//         const titleEl = el.querySelector(".mod__name");
//         if (titleEl && el.dataset.title) titleEl.textContent = el.dataset.title;

//         // id
//         const idEl = el.querySelector(".mod__num");
//         if (idEl && el.dataset.id) idEl.textContent = `ID: ${el.dataset.id}`;

//         // media
//         const content = el.querySelector(".mod__content");
//         if (content) {
//           const { img, video, poster, title } = el.dataset;

//           if (video) {
//             content.innerHTML = `
//               <video class="mod__image"
//                 src="${video}"
//                 autoplay muted loop playsinline preload="auto"
//                 ${poster ? `poster="${poster}"` : ""}
//               ></video>
//             `;
//           } else if (img) {
//             content.innerHTML = `
//               <img class="mod__image" src="${img}" alt="${title || ""}">
//             `;
//           }
//         }
//       }

//       /* GLOBAL NAV ACTIVE */
//       if (name === "global-nav") {
//         const path = window.location.pathname.replace(/\/$/, "");
//         const buttons = el.querySelectorAll(".global-nav__btn");

//         buttons.forEach(btn => btn.classList.remove("is-active"));

//         buttons.forEach(btn => {
//           const type = btn.dataset.nav;

//           // Work
//           if (
//             type === "work" &&
//             (path === "" || path === "/" || path.endsWith("index.html") || path.includes("/cases/"))
//           ) {
//             btn.classList.add("is-active");
//           }

//           // Mods
//           if (
//             type === "mods" &&
//             (path === "/modifications" || path === "/modifications/index.html")
//           ) {
//             btn.classList.add("is-active");
//           }
//         });
//       }

//       /* MODIFICATION NAV BACK  */
//       if (name === "modification-nav") {
//         const backBtn = el.querySelector(".modification-nav__btn--back");
//         if (backBtn) {
//           const defaultHref = backBtn.getAttribute("href");
//           backBtn.href = el.dataset.href || defaultHref;
//         }
//       }

//     } catch (e) {
//       console.error(`Include failed: ${name}`);
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-include]").forEach(async el => {
    const name = el.dataset.include;

    try {
      const res = await fetch(`/components/${name}.html`);
      if (!res.ok) throw new Error(name);

      const html = await res.text();
      el.innerHTML = html;

      /* =====================
         MOD CARDS
      ===================== */
      if (name === "mod-item") {
        const link = el.querySelector(".mod__link");
        const href = el.dataset.href;
        if (link) href ? (link.href = href) : link.removeAttribute("href");

        // title
        const titleEl = el.querySelector(".mod__name");
        if (titleEl && el.dataset.title) titleEl.textContent = el.dataset.title;

        // id
        const idEl = el.querySelector(".mod__num");
        if (idEl && el.dataset.id) idEl.textContent = `ID: ${el.dataset.id}`;

        // media
        const content = el.querySelector(".mod__content");
        if (content) {
          const { img, video, poster, title } = el.dataset;

          if (video) {
            content.innerHTML = `
              <video class="mod__image"
                src="${video}"
                autoplay muted loop playsinline preload="auto"
                ${poster ? `poster="${poster}"` : ""}
              ></video>
            `;
          } else if (img) {
            content.innerHTML = `
              <img class="mod__image" src="${img}" alt="${title || ""}">
            `;
          }
        }
      }

      /* =====================
         GLOBAL NAV ACTIVE
      ===================== */
      if (name === "global-nav") {
        const path = window.location.pathname.replace(/\/$/, "");
        const buttons = el.querySelectorAll(".global-nav__btn");

        buttons.forEach(btn => btn.classList.remove("is-active"));

        buttons.forEach(btn => {
          const type = btn.dataset.nav;

          // Work
          if (
            type === "work" &&
            (path === "" || path === "/" || path.endsWith("index.html") || path.includes("/cases/"))
          ) {
            btn.classList.add("is-active");
          }

          // Mods
          if (
            type === "mods" &&
            path.startsWith("/modifications") // аналогично /cases/ для всех внутренних страниц
          ) {
            btn.classList.add("is-active");
          }
        });
      }

      /* =====================
         MODIFICATION NAV BACK
      ===================== */
      if (name === "modification-nav") {
        const backBtn = el.querySelector(".modification-nav__btn--back");
        if (backBtn) {
          const defaultHref = backBtn.getAttribute("href");
          backBtn.href = el.dataset.href || defaultHref;
        }
      }

      /* =====================
         PROJECT NAV (back + live)
      ===================== */
      if (name === "project-nav") {
        // Back button
        const backBtn = el.querySelector(".project-nav__btn--back");
        if (backBtn) {
          const defaultHref = backBtn.getAttribute("href");
          backBtn.href = el.dataset.href || defaultHref;
        }

        // Live button
        const liveBtn = el.querySelector(".project-nav__btn--live");
        if (liveBtn && el.dataset.liveLink) {
          liveBtn.href = el.dataset.liveLink;
        }
      }

    } catch (e) {
      console.error(`Include failed: ${name}`);
    }
  });
});
