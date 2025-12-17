document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('dynamic-form');
  const appRadios = Array.from(document.querySelectorAll('input[name="appType"]'));
  const triggers = Array.from(document.querySelectorAll('.apply-trigger'));

  const volunteerFields = document.querySelector('.volunteer-only');
  const prayerFields = document.querySelector('.prayer-only');
  const skillFields = document.querySelector('.skill-only');

  const scrollToForm = () => {
    const target = document.getElementById('application-form');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const setRequiredForType = (val) => {
    const set = (id, req) => { const el = document.getElementById(id); if (el) el.required = req; };
    set('interest', val === 'VOLUNTEER');
    set('availability', val === 'VOLUNTEER');
    set('prayer-focus', val === 'PRAYER_COMMUNITY');
    set('prayer-availability', val === 'PRAYER_COMMUNITY');
    set('skill-area', val === 'SKILL_SHARE');
    set('skill-details', val === 'SKILL_SHARE');
  };

  const showFormFor = (value) => {
    if (!value) { form.style.display = 'none'; return; }
    form.style.display = 'block';

    volunteerFields.style.display = (value === 'VOLUNTEER') ? 'block' : 'none';
    prayerFields.style.display    = (value === 'PRAYER_COMMUNITY') ? 'block' : 'none';
    skillFields.style.display     = (value === 'SKILL_SHARE') ? 'block' : 'none';

    setRequiredForType(value);
  };

  // Radio change
  appRadios.forEach(r => {
    r.addEventListener('change', () => {
      showFormFor(r.value);
      scrollToForm();
    });
  });

  // Button triggers
  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = btn.dataset.application;
      const radio = appRadios.find(r => r.value === val);
      if (radio) {
        radio.checked = true;
        showFormFor(val);
        scrollToForm();
      }
    });
  });

  // Submit handler: POST to Google Apps Script endpoint 
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const selected = appRadios.find(r => r.checked);
    if (!selected) {
      alert('Please select an application type.');
      return;
    }

    const data = new FormData(form);
    data.append('application_type', selected.value);

    try {
      const resp = await fetch('https://script.google.com/macros/s/AKfycbzNnWcQBB5L-Nj2YmcR3z4ee59NvaHgMdkGgYOwfAcytd2KAeBDQHgUS1uDDE2QXTIx/exec', { // < Apps Script Web App URL
        method: 'POST',
        body: data,
        mode: 'no-cors'
      });
      alert('Thank you! Your application has been submitted.');
      form.reset();
      appRadios.forEach(r => r.checked = false);
      form.style.display = 'none';
      showFormFor(''); // hide blocks
    } catch (err) {
      console.error(err);
      alert('There was a problem submitting. Please try again.');
    }
  });
});