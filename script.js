gsap.registerPlugin(ScrollToPlugin);

function primeSections() {
  document.querySelectorAll(".section").forEach(sec => {
    const rect = sec.getBoundingClientRect();
    const onScreen = rect.top < window.innerHeight && rect.bottom > 0;
    if (onScreen) sec.classList.add("active");
  });
}

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach(entry => {
      const { target } = entry;

      if (entry.isIntersecting && !target.classList.contains("active")) {
        target.classList.add("active");          
        gsap.to(target, { opacity: 1, y: 0, duration: 0.8, ease: "power1.out" });
        obs.unobserve(target);                   
      }
    });
  },
  {
    rootMargin: "0px 0px -15% 0px",   
    threshold : 0                     
  }
);

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".section").forEach(sec => observer.observe(sec));
  primeSections();                    
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    gsap.to(window, { duration: 1, scrollTo: link.getAttribute("href") });
  });
});