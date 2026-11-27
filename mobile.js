// Menú móvil: botón hamburguesa + "Hablemos" siempre visible (27 nov 2026)
(() => {
  const h = document.querySelector('header.top');
  const n = h && h.querySelector('nav');
  if (!n) return;
  const en = document.documentElement.lang === 'en';
  const L = en ? ['Open menu', 'Close menu'] : ['Abrir menú', 'Cerrar menú'];
  if (!n.id) n.id = 'menu-principal';

  const r = document.createElement('div');
  r.className = 'm-right';
  const cta = n.querySelector('a.cta');
  if (cta) { const c = cta.cloneNode(true); c.className = 'm-cta'; r.append(c); }
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'm-btn';
  b.setAttribute('aria-controls', n.id);
  b.innerHTML = '<i aria-hidden="true"></i>';
  r.append(b);
  h.querySelector('.wrap').append(r);
  h.classList.add('m');

  const set = open => {
    h.classList.toggle('open', open);
    b.setAttribute('aria-expanded', String(open));
    b.setAttribute('aria-label', L[open ? 1 : 0]);
  };
  set(false);
  b.addEventListener('click', e => { e.stopPropagation(); set(!h.classList.contains('open')); });
  n.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
  document.addEventListener('click', e => { if (!h.contains(e.target)) set(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { set(false); b.focus(); } });
  matchMedia('(min-width: 901px)').addEventListener('change', () => set(false));
})();
