/* -------------------------------------------------
   GLOBAL SCRIPT – assets/js/script.js
   ------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {

  /* =================================================
     1. MOBILE NAVIGATION TOGGLE
     ================================================= */
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav    = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    // Accessibility attributes
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-controls', 'main-nav');

    menuToggle.addEventListener('click', () => {
      const opened = mainNav.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', opened);
    });
  }

  /* =================================================
     2. SEARCH OVERLAY (modal)
     ================================================= */
  const searchToggle  = document.getElementById('search-toggle');
  const searchOverlay = document.getElementById('search-overlay');
  const searchInput   = document.getElementById('search-input');
  const searchGoBtn   = document.getElementById('search-go');

  // ---- Open overlay -------------------------------------------------
  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', () => {
      searchOverlay.classList.remove('hidden');
      setTimeout(() => searchInput.focus(), 100);
    });
  }

  // ---- Close when clicking outside the modal -------------------------
  if (searchOverlay) {
    searchOverlay.addEventListener('click', e => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.add('hidden');
      }
    });
  }

  // ---- Close on Escape key -------------------------------------------
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && searchOverlay && !searchOverlay.classList.contains('hidden')) {
      searchOverlay.classList.add('hidden');
    }
  });

  // ---- Perform a search (redirect to results page) -------------------
  const performSearch = () => {
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
    }
  };
  if (searchGoBtn) searchGoBtn.addEventListener('click', performSearch);
  if (searchInput) {
    searchInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') performSearch();
    });
  }

  /* =================================================
     3. GLOBAL LOADER – shows on any internal navigation
     ================================================= */
  const loader = document.getElementById('loader');

  const showLoader = () => {
    if (!loader) return;
    loader.classList.add('visible');

    // safety: hide after 1 s even if navigation never fires
    setTimeout(() => {
      loader.classList.remove('visible');
    }, 1000);
  };

  // Intercept clicks on internal links
  document.body.addEventListener('click', e => {
    const anchor = e.target.closest('a');
    if (!anchor) return;           // not a link

    // ------------------------------------------------------------------
    // Links we don't intercept:
    //   - external URLs (different origin)
    //   - hash‑only links  ("#section")
    //   - links with target="_blank" or download attribute
    //   - link that points to the current page
    // ------------------------------------------------------------------
    const href = anchor.getAttribute('href');
    if (!href ||
        href.startsWith('#') ||
        anchor.hasAttribute('target') ||
        anchor.hasAttribute('download')) {
      return; // let the browser handle it
    }

    const url = new URL(href, location.origin);
    if (url.origin !== location.origin) return; // external → ignore
    if (url.href === location.href) return;     // same page → ignore

    // --------------------------------------------------------------
    // Internal navigation – prevent default, show loader, then go
    // --------------------------------------------------------------
    e.preventDefault();
    showLoader();

    setTimeout(() => {
      // Normal navigation (preserves history)
      location.assign(url.href);
    }, 1000);
  });

  // When a page loads directly (refresh, address‑bar) make sure the overlay is hidden
  if (loader) loader.classList.remove('visible');

});


