document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-include]").forEach(async el => {
    const name = el.dataset.include;

    try {
      const res = await fetch(`/components/${name}.html`);
      if (!res.ok) throw new Error(name);

      el.innerHTML = await res.text();

      // 👉 подстановка live-ссылки
      const liveLink = el.dataset.liveLink;
      if (liveLink) {
        const liveBtn = el.querySelector(".project-nav__btn--live");
        if (liveBtn) liveBtn.href = liveLink;
      }

    } catch (e) {
      console.error(`Include failed: ${name}`);
    }
  });
});