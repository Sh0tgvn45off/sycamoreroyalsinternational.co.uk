document.addEventListener('DOMContentLoaded', () => {
  const triggers = Array.from(document.querySelectorAll('.founder-trigger'));
  const modal = document.getElementById('founder-modal');
  const modalCard = modal?.querySelector('.founder-modal-card');
  const closeBtn = modal?.querySelector('.founder-modal-close');
  const linkBtn = modal?.querySelector('#founder-linkedin');
  const emailBtn = modal?.querySelector('#founder-email');
  const title = modal?.querySelector('.founder-modal-title');

  // On/off + pulse animation loops
  triggers.forEach((btn) => {
    const baseName = btn.dataset.name || btn.textContent.trim();
    let onState = true;

    // toggle text every 1s
    setInterval(() => {
      onState = !onState;
      btn.textContent = onState ? `➤ ${baseName}` : baseName;
    }, 1000);

    // pulse every 3.5s
    setInterval(() => {
      btn.classList.add('pulse');
      setTimeout(() => btn.classList.remove('pulse'), 800);
    }, 3500);

    // open modal
    btn.addEventListener('click', () => {
      if (!modal) return;
      const linkedin = btn.dataset.linkedin || '#';
      const email = btn.dataset.email || '#';
      if (linkBtn) linkBtn.href = linkedin;
      if (emailBtn) emailBtn.href = email;
      if (title) title.textContent = `Connect with ${baseName}`;
      modal.classList.add('active');
      document.body.classList.add('modal-open');
    });
  });

  const closeModal = () => {
    modal?.classList.remove('active');
    document.body.classList.remove('modal-open');
  };

  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  modalCard?.addEventListener('click', (e) => e.stopPropagation());
});