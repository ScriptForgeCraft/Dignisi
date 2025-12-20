 
import "@js/navigation/headerScroll.js";
import "@js/navigation/mobileMenu.js";
import "@js/partners-scroll.js";

const langItem = document.querySelector(".nav-lang");
const langButton = langItem.querySelector(".lang-switcher__button");

langButton.addEventListener("click", (e) => {
  e.stopPropagation();
  langItem.classList.toggle("open");

  const expanded = langButton.getAttribute("aria-expanded") === "true";
  langButton.setAttribute("aria-expanded", String(!expanded));
});

document.addEventListener("click", () => {
  langItem.classList.remove("open");
  langButton.setAttribute("aria-expanded", "false");
});

document.addEventListener("DOMContentLoaded", async () => {
  const initCharts = () => {
    import("@js/pricesChart.js");
    import("@js/salesChart.js");
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          initCharts();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  const chartsBlock = document.querySelector(".analytics");
  if (chartsBlock) observer.observe(chartsBlock);
});

document.addEventListener("click", function (e) {
  const el = e.target.closest(".copy-item");
  if (!el) return;

  const text = el.dataset.copy;

  navigator.clipboard.writeText(text).then(() => {
    el.classList.add("copied");

    setTimeout(() => {
      el.classList.remove("copied");
    }, 800);
  });
});

document.addEventListener("click", function (e) {
  const el = e.target.closest(".copy-item");
  if (!el) return;
  const original = el.getAttribute("data-copy");

  navigator.clipboard.writeText(original).then(() => {
    el.setAttribute("data-copy-text", "Copied!");

    el.classList.add("copied");

    setTimeout(() => {
      el.removeAttribute("data-copy-text");
      el.classList.remove("copied");
    }, 1000);
  });
});

const appFigure = document.querySelector(".about-image");

if (appFigure) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        appFigure.classList.toggle("is-visible", entry.isIntersecting);
      }
    },
    {
      root: null,
      threshold: 0.35,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  io.observe(appFigure);
}
