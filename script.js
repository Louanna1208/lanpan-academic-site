// Keep links to the former single-page website working.
if (document.body.dataset.page === "about") {
  const previousSections = {
    "#research": "research.html",
    "#representations": "research.html#representations",
    "#task-relations": "research.html#task-relations",
    "#effect-boundaries": "research.html#effect-boundaries",
    "#real-world": "research.html#real-world",
    "#publications": "projects.html",
    "#projects": "projects.html",
    "#contact": "contact.html"
  };
  const redirectPreviousSection = () => {
    const destination = previousSections[window.location.hash];
    if (destination) {
      window.location.replace(new URL(destination, window.location.href));
    }
  };
  redirectPreviousSection();
  window.addEventListener("hashchange", redirectPreviousSection);
}

const progress = document.querySelector(".reading-progress");
let scheduled = false;

if (progress) {
  const updateProgress = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    progress.style.transform = `scaleX(${fraction})`;
    scheduled = false;
  };

  updateProgress();
  window.addEventListener("scroll", () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(updateProgress);
    }
  }, { passive: true });
  window.addEventListener("resize", updateProgress);
}
