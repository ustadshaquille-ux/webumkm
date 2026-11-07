// SMART Kitchen Set: interaksi halaman (tanpa library)
(() => {
  const WA = '6282123842211';
  const PESAN = {
    umum: 'Halo SMART Kitchen Set, saya ingin konsultasi kitchen set / interior custom.',
    tanya: 'Halo SMART Kitchen Set, saya mau bertanya:'
  };
  const waUrl = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
  window.SMART_WA = waUrl;

  document.querySelectorAll('[data-wa]').forEach(a => {
    a.href = waUrl(PESAN[a.dataset.wa] || PESAN.umum);
    a.target = '_blank';
    a.rel = 'noopener';
  });

  // header & dock
  const top = document.getElementById('top');
  const dock = document.getElementById('dock');
  const hero = document.querySelector('.hero');
  const onScroll = () => {
    const y = window.scrollY;
    top.classList.toggle('scrolled', y > 20);
    dock.classList.toggle('show', y > hero.offsetHeight * 0.7);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // menu HP
  const burger = document.querySelector('.burger');
  const menuM = document.getElementById('menu-m');
  const setMenu = open => {
    burger.setAttribute('aria-expanded', open);
    menuM.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setMenu(menuM.hidden));
  menuM.addEventListener('click', e => { if (e.target.tagName === 'A') setMenu(false); });

  // menu aktif sesuai bagian yang dibaca
  const links = [...document.querySelectorAll('.menu a')];
  const secIO = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(l => { const s = document.querySelector(l.getAttribute('href')); if (s) secIO.observe(s); });

  // muncul halus saat discroll
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.rv').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 70 + 'ms';
    io.observe(el);
  });

  // filter proyek
  const tabs = document.querySelectorAll('.filter button');
  const cards = [...document.querySelectorAll('.p')];
  tabs.forEach(b => b.addEventListener('click', () => {
    tabs.forEach(t => t.setAttribute('aria-selected', t === b));
    const f = b.dataset.f;
    cards.forEach(c => c.classList.toggle('hide', f !== 'semua' && c.dataset.g !== f));
  }));

  // lightbox
  const lb = document.getElementById('lb');
  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('figcaption');
  let idx = 0;
  const visible = () => cards.filter(c => !c.classList.contains('hide'));
  const show = i => {
    const v = visible();
    idx = (i + v.length) % v.length;
    const c = v[idx], im = c.querySelector('img');
    lbImg.src = im.dataset.big || im.src;
    lbImg.alt = im.alt;
    lbCap.textContent = c.querySelector('b').textContent + ' · ' + c.querySelector('figcaption span').textContent;
  };
  cards.forEach(c => {
    c.tabIndex = 0;
    const open = () => { show(visible().indexOf(c)); lb.showModal(); };
    c.addEventListener('click', open);
    c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
  lb.querySelector('.lb-x').onclick = () => lb.close();
  lb.querySelector('.lb-prev').onclick = () => show(idx - 1);
  lb.querySelector('.lb-next').onclick = () => show(idx + 1);
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
  let sx = 0;
  lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
  });

})();
