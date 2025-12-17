/* =================================================
   ABOUT PAGE - INTERACTIVE SCROLL ANIMATION
   Updated to handle 10 sections (240vh each)
   ================================================= */

// Only run on About page
if (document.querySelector('.about-scroll-wrapper')) {
  
  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Pin the intro text section
  ScrollTrigger.create({
    trigger: ".about-scroll-wrapper",
    start: "top top",
    end: "+=400",
    pin: ".about-intro-content",
    pinSpacing: false
  });

  // Handling scroll for the tabs - UPDATED FOR 10 SECTIONS WITH MORE SPACE
  const sections = document.querySelectorAll('.about-tab-content');
  const visuals = document.querySelectorAll('.about-tab-visual');
  const scrollMultiplier = window.innerHeight * 2.4; // more time per section (was 2.2)
  const lastIndex = sections.length - 1;

  function updateActiveSection() {
    const scrollPosition = window.scrollY;
    const introHeight = document.querySelector('.about-intro')?.offsetHeight || 0;
    const adjustedScroll = scrollPosition - introHeight;

    sections.forEach((section, index) => {
      const sectionStart = index * scrollMultiplier;
      const sectionEnd = (index + 1) * scrollMultiplier;

      if (adjustedScroll >= sectionStart && adjustedScroll < sectionEnd) {
        section.classList.add('is-active');
        if (visuals[index]) visuals[index].classList.add('is-active');
      } else {
        section.classList.remove('is-active');
        if (visuals[index]) visuals[index].classList.remove('is-active');
      }
    });

    // Keep last section active until user scrolls well past it
    if (adjustedScroll > (lastIndex + 0.5) * scrollMultiplier) {
      sections[lastIndex].classList.add('is-active');
      if (visuals[lastIndex]) visuals[lastIndex].classList.add('is-active');
    }
  }

  // Initial check
  setTimeout(updateActiveSection, 100);

  // Update on scroll with throttling for better performance
  let ticking = false;
  document.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Debugging: Log current section (only when debug parameter is present)
  if (window.location.search.includes('debug')) {
    document.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      const currentSection = Math.floor(scrollPos / scrollMultiplier);
      console.log('Scroll:', scrollPos, 'Section:', currentSection);
    });
  }
}