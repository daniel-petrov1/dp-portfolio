document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-include]").forEach(async el => {
    const name = el.dataset.include;
    try {
      const res = await fetch(`/components/${name}.html`);
      if (res.ok) {
        el.innerHTML = await res.text();
      } else {
        console.error(`Include failed: ${name}.html`);
      }
    } catch (err) {
      console.error(err);
    }
  });
});