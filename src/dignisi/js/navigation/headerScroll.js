document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".main-header");
  const langItem = document.querySelector(".nav-lang");

  let lastScrollY = window.scrollY;
  let lockHeader = false;

  document.querySelectorAll("nav a, .mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      lockHeader = true;

      header.classList.add("main-header--hidden");

      setTimeout(() => {
        header.classList.add("main-header--hidden");
      }, 50);
    });
  });

  window.addEventListener("scroll", () => {
    const currentY = window.scrollY;

    if (lockHeader) {
      header.classList.add("main-header--hidden");

      if (currentY > lastScrollY + 10) {
        lockHeader = false;
      }

      lastScrollY = currentY;
      return;
    }

    if (currentY > lastScrollY && currentY > 80) {
      header.classList.add("main-header--hidden");
    } else {
      header.classList.remove("main-header--hidden");
      langItem.classList.remove("open");
    }

    lastScrollY = currentY;
  });
});
