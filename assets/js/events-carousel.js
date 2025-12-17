// Programs carousel: 2.5s autoplay, pause/resume, click-to-advance when paused, resume on mouseleave
document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.program-slide'));
  const carousel = document.querySelector('.program-carousel');
  const pauseBtn = document.querySelector('.carousel-pause');
  if (!slides.length || !carousel || !pauseBtn) return;

  let index = 0;
  let timer = null;
  let paused = false;
  const delay = 2500;

  const setActive = (next) => {
    slides.forEach((s, i) => {
      s.classList.toggle('is-active', i === next);
    });
    index = next;
  };

  const nextSlide = () => setActive((index + 1) % slides.length);

  const start = () => {
    if (timer) clearInterval(timer);
    timer = setInterval(nextSlide, delay);
    paused = false;
    pauseBtn.setAttribute('aria-pressed', 'false');
    pauseBtn.textContent = '||';
  };

  const stop = () => {
    if (timer) clearInterval(timer);
    timer = null;
    paused = true;
    pauseBtn.setAttribute('aria-pressed', 'true');
    pauseBtn.textContent = '▷';
  };

  // Init
  setActive(0);
  start();

  // Pause/resume button
  pauseBtn.addEventListener('click', () => {
    if (paused) start(); else stop();
  });

  // Click anywhere in the carousel to advance when paused
  carousel.addEventListener('click', (e) => {
    if (e.target === pauseBtn) return; // handled already
    if (paused) nextSlide();
  });

  // Resume on mouse leave
  carousel.addEventListener('mouseleave', () => {
    if (paused) start();
  });

  // Optional: pause on hover (but only if you click the button do you stay paused)
  carousel.addEventListener('mouseenter', () => {
    if (!paused) {
      if (timer) clearInterval(timer);
      timer = null;
    }
  });
});