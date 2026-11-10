// SMART Kitchen Set: interaksi halaman (tanpa library)
(() => {
  const WA = '6282123842211';
  const PESAN = {
    umum: 'Halo SMART Kitchen Set, saya ingin konsultasi kitchen set / furniture custom.',
    tanya: 'Halo SMART Kitchen Set, saya mau bertanya:',
    order: 'Halo SMART Kitchen Set, saya ingin estimasi harga. Berikut foto acuan, foto lokasi, dan ukuran kurang lebihnya:'
  };
  const waUrl = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
  window.SMART_WA = waUrl;

  document.querySelectorAll('[data-wa]').forEach(a => {
    a.href = waUrl(PESAN[a.dataset.wa] || PESAN.umum);
    a.target = '_blank';
    a.rel = 'noopener';
  });

  // latar blur foto (foto tidak dipotong): url absolut supaya tidak salah alamat dari file CSS
  document.querySelectorAll('.media').forEach(m => {
    const im = m.querySelector('img');
    if (im) m.style.setProperty('--bg', `url("${new URL(im.getAttribute('src'), location.href).href}")`);
  });

  // dock HP muncul setelah hero
  const dock = document.getElementById('dock');
  const hero = document.querySelector('.hero');
  const onScroll = () => dock.classList.toggle('show', window.scrollY > hero.offsetHeight * 0.6);
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
  menuM.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });

  // menu aktif sesuai bagian yang dibaca
  const links = [...document.querySelectorAll('.menu a')];
  const secIO = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(l => { const s = document.querySelector(l.getAttribute('href')); if (s) secIO.observe(s); });

  // muncul halus saat discroll
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.rv').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 60 + 'ms';
    io.observe(el);
  });

  // filter portfolio
  const tabs = [...document.querySelectorAll('.filter button')];
  const cards = [...document.querySelectorAll('#pj-grid .pj')];
  const saring = f => {
    tabs.forEach(t => t.setAttribute('aria-selected', t.dataset.f === f));
    cards.forEach(c => c.classList.toggle('hide', f !== 'semua' && !c.dataset.g.split(' ').includes(f)));
  };
  tabs.forEach(b => b.addEventListener('click', () => saring(b.dataset.f)));
  // kartu produk -> portfolio tersaring
  document.querySelectorAll('[data-filter]').forEach(a => a.addEventListener('click', () => saring(a.dataset.filter)));

  // lightbox galeri (foto + video)
  const lb = document.getElementById('lb');
  const lbMedia = lb.querySelector('.lb-media');
  const lbCap = lb.querySelector('.lb-cap');
  const lbNum = lb.querySelector('.lb-num');
  let list = [], idx = 0, judul = '';
  const show = i => {
    idx = (i + list.length) % list.length;
    const it = list[idx];
    lbMedia.innerHTML = '';
    if (it.t === 'v') {
      const v = document.createElement('video');
      v.src = it.v; v.poster = it.s; v.controls = true; v.playsInline = true; v.autoplay = true;
      lbMedia.append(v);
    } else {
      const im = new Image();
      im.src = it.b || it.s; im.alt = it.c;
      lbMedia.append(im);
      const nx = list[(idx + 1) % list.length];
      if (nx && nx.t !== 'v') new Image().src = nx.b || nx.s;   // muat foto berikutnya lebih dulu
    }
    lbCap.textContent = judul ? `${it.c} · ${judul}` : it.c;
    lbNum.textContent = list.length > 1 ? `${idx + 1} / ${list.length}` : '';
    lb.querySelectorAll('.lb-nav').forEach(b => b.hidden = list.length < 2);
  };
  const buka = (items, i, j) => {
    list = items; judul = j || '';
    show(i || 0);
    if (!lb.open) lb.showModal();
  };
  const tutup = () => { lbMedia.innerHTML = ''; lb.close(); };
  const baca = el => { try { return JSON.parse(el.dataset.items); } catch (e) { return []; } };

  document.querySelectorAll('.pj').forEach(c => {
    const open = () => buka(baca(c), 0, c.querySelector('.pj-loc').textContent);
    c.addEventListener('click', open);
    c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
  document.querySelectorAll('.qc').forEach(q => {
    q.querySelectorAll('.qc-ph').forEach(b => b.addEventListener('click', () => buka(baca(q), +b.dataset.i)));
  });
  // video lain berhenti saat satu diputar
  const vids = [...document.querySelectorAll('.vd video')];
  vids.forEach(v => v.addEventListener('play', () => vids.forEach(o => o !== v && o.pause())));

  lb.querySelector('.lb-x').onclick = tutup;
  lb.querySelector('.lb-prev').onclick = () => show(idx - 1);
  lb.querySelector('.lb-next').onclick = () => show(idx + 1);
  lb.addEventListener('click', e => { if (e.target === lb || e.target === lbMedia) tutup(); });
  lb.addEventListener('cancel', e => { e.preventDefault(); tutup(); });
  lb.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
  let sx = 0;
  lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50 && list.length > 1) show(idx + (dx < 0 ? 1 : -1));
  });
})();
