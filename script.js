const header = document.querySelector(".site-header");

if (header) {
  const updateHeader = () => {
    header.dataset.scrolled = window.scrollY > 16 ? "true" : "false";
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}
