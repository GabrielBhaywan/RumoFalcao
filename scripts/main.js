const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('is-open');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});

const form = document.querySelector('#quote-form');
const status = document.querySelector('#form-status');
const requiredFields = ['nome', 'contato', 'servico', 'mensagem'];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let valid = true;
  status.textContent = '';

  requiredFields.forEach((name) => {
    const field = form.elements[name];
    const error = document.querySelector(`#${name}-error`);
    const missing = !field.value.trim();
    field.setAttribute('aria-invalid', String(missing));
    error.textContent = missing ? 'Preencha este campo para continuar.' : '';
    if (missing) valid = false;
  });

  if (!valid) {
    status.textContent = 'Confira os campos indicados.';
    form.querySelector('[aria-invalid="true"]').focus();
    return;
  }

  const data = new FormData(form);
  const subject = encodeURIComponent(`Pedido de orçamento — ${data.get('servico')}`);
  const body = encodeURIComponent(
    `Nome: ${data.get('nome')}\nEmpresa: ${data.get('empresa') || 'Não informada'}\nContato: ${data.get('contato')}\nServiço: ${data.get('servico')}\n\nProjeto:\n${data.get('mensagem')}`
  );
  status.textContent = 'Seu aplicativo de e-mail será aberto para você enviar a mensagem.';
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
});

form.addEventListener('input', (event) => {
  if (event.target.matches('input, select, textarea') && event.target.value.trim()) {
    event.target.setAttribute('aria-invalid', 'false');
    const error = document.querySelector(`#${event.target.name}-error`);
    if (error) error.textContent = '';
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();
