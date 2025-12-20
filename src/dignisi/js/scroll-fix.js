(() => {
  if (!window.visualViewport) return;

  let lastVVHeight = window.visualViewport.height;

  let lastScrollY = window.scrollY;

  let rafLock = false;

  window.addEventListener(
    "scroll",
    () => {
      lastScrollY = window.scrollY;
    },
    { passive: true }
  );

  const onVVResize = () => {
    if (rafLock) return;
    rafLock = true;

    requestAnimationFrame(() => {
      const newVVHeight = window.visualViewport.height;
      const diff = lastVVHeight - newVVHeight;

   
      window.scrollTo({
        top: lastScrollY + diff,
        left: 0,
        behavior: "auto",
      });

      lastVVHeight = newVVHeight;
      rafLock = false;
    });
  };

  window.visualViewport.addEventListener("resize", onVVResize);
  window.visualViewport.addEventListener("scroll", onVVResize); 
})();
