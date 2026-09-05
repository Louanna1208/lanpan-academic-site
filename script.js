const header = document.querySelector(".site-header");
const progress = document.querySelector(".reading-progress");
const sectionLinks = [...document.querySelectorAll('.site-header a[href^="#"]')]
  .filter(link => link.hash !== "#top");
let scheduled = false;

if (header) {
  const updateHeader = () => {
    header.dataset.scrolled = window.scrollY > 16 ? "true" : "false";
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    if (progress) progress.style.transform = `scaleX(${fraction})`;
    let current = null;
    for (const link of sectionLinks) {
      const section = document.querySelector(link.hash);
      if (section && section.getBoundingClientRect().top <= header.offsetHeight + 48) current = link;
    }
    if (fraction >= 0.99 && window.scrollY > 0) current = sectionLinks.at(-1);
    for (const link of sectionLinks) {
      if (link === current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
    scheduled = false;
  };

  updateHeader();
  window.addEventListener("scroll", () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(updateHeader);
    }
  }, { passive: true });
  window.addEventListener("resize", updateHeader);
}
