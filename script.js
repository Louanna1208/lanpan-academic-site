// Keep links to the former single-page website working.
if (window.location.pathname.endsWith("/projects.html") && window.location.hash === "#research-atlas") {
  window.location.replace(new URL("research-atlas.html", window.location.href));
}

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

document.querySelectorAll("[data-bilingual-post]").forEach((post) => {
  const toggle = post.querySelector(".blog-language-toggle");
  if (!toggle) return;
  let language = "en";
  toggle.hidden = false;
  toggle.addEventListener("click", () => {
    language = language === "en" ? "zh" : "en";
    post.lang = language === "zh" ? "zh-CN" : "en";
    post.querySelectorAll("[data-post-language]").forEach((section) => {
      section.hidden = section.dataset.postLanguage !== language;
    });
    toggle.textContent = language === "en" ? "中文" : "English";
    toggle.setAttribute("aria-label", language === "en" ? "Show Chinese version" : "Show English version");
  });
});

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
