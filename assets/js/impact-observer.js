/* -------------------------------------------------
   impact-observer.js – reveal .impact-card when it
   enters the viewport (fade‑up + scale)
   ------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.impact-card');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // run once per card
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach(card => observer.observe(card));
});
