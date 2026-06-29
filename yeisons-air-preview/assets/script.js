const btn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-links');
if (btn && nav) {
  btn.addEventListener('click', () => nav.classList.toggle('open'));
}
const form = document.querySelector('[data-quote-form]');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.querySelector('[data-form-message]');
    if (message) {
      message.textContent = 'Preview only: this form would send the enquiry to Yeison\'s email or phone CRM.';
      message.style.display = 'block';
    }
  });
}
