/* Website demo model Sendang: perilaku halaman. Dipakai semua demo (sites/aset-mewah/mewah.js).
   Data usaha dikirim lewat window.SITE = { wa, nama }. Semua bagian bersifat opsional. */
(() => {
  "use strict";
  const SITE = window.SITE || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const reduce = root.classList.contains("reduce");
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const desktop = () => matchMedia("(min-width: 900px)").matches;
  const reveal = () => $$(".anim-hide").forEach(el => (el.style.visibility = "visible"));
  if (typeof gsap === "undefined") { reveal(); return; }
  gsap.registerPlugin(ScrollTrigger, SplitText);

  /* Scroll halus */
  let lenis = null;
  if (!reduce && typeof Lenis !== "undefined") {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const goTo = (el, dur = 1.6) => (lenis ? lenis.scrollTo(el, { duration: dur, easing: t => 1 - Math.pow(1 - t, 4) }) : (el === 0 ? scrollTo(0, 0) : el.scrollIntoView()));
  $$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
    const id = a.getAttribute("href"); if (id.length < 2) return;
    const el = $(id); if (!el) return;
    e.preventDefault(); closeMenu(); goTo(id === "#top" ? 0 : el, id === "#top" ? 1.4 : 1.6);
  }));

  /* Menu HP */
  const burger = $("#burger"), nav = $("#nav"), hero = $("#top");
  function setMenu(open) {
    root.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open); burger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    if (lenis) open ? lenis.stop() : lenis.start();
    nav.classList.remove("is-hidden");
  }
  function closeMenu() { if (root.classList.contains("menu-open")) setMenu(false); }
  burger.addEventListener("click", () => setMenu(!root.classList.contains("menu-open")));
  addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });

  /* Navigasi */
  let lastY = scrollY;
  function navState() {
    const y = scrollY, h = hero.offsetHeight;
    nav.classList.toggle("is-solid", y > h - 90);
    if (!root.classList.contains("menu-open")) {
      if (y > h * .5 && y > lastY + 4) nav.classList.add("is-hidden");
      else if (y < lastY - 4 || y <= h * .5) nav.classList.remove("is-hidden");
    }
    lastY = y;
  }
  addEventListener("scroll", navState, { passive: true }); navState();

  /* Hero */
  const h1 = $("#heroH1");
  if (reduce) reveal();
  else {
    const safe = setTimeout(reveal, 3200);
    let first = true;
    document.fonts.ready.then(() => {
      SplitText.create(h1, {
        type: "lines", mask: "lines", maskClass: "mask", autoSplit: true,
        onSplit(self) {
          if (!first) return; first = false; clearTimeout(safe);
          h1.style.visibility = "visible";
          return gsap.from(self.lines, { yPercent: 118, duration: 1.5, ease: "expo.out", stagger: 0.11, delay: 0.25 });
        },
      });
      gsap.fromTo(".hero__id, .hero__sub, .hero__cta", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.1, delay: 0.95 });
      gsap.from(".hero__media", { scale: 1.16, duration: 2.8, ease: "expo.out" });
      gsap.from(".hero__shade", { opacity: 0, duration: 1.8, ease: "power2.out" });
      gsap.from(".hero__hint", { opacity: 0, duration: 1.4, delay: 1.5 });
      nav.style.transition = "none";
      gsap.from(nav, { yPercent: -100, opacity: 0, duration: 1.3, ease: "expo.out", delay: 0.5, clearProps: "transform,opacity", onComplete: () => { nav.style.transition = ""; } });
      if (window.Ripple) {
        gsap.delayedCall(1.15, () => Ripple.drop(0.46, 0.84, 1.1));
        gsap.delayedCall(1.7, () => Ripple.drop(0.7, 0.9, 0.85));
      }
    });
    gsap.to("#heroMedia", { yPercent: 10, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
  }

  /* Pernyataan: kata menyala saat gulir */
  const besar = $("#besar");
  if (besar && !reduce) {
    besar.innerHTML = besar.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(" ");
    gsap.to("#besar .w", { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: besar, start: "top 84%", end: "bottom 50%", scrub: 0.5 } });
  }

  /* Paralaks foto */
  if (!reduce) {
    $$("[data-parallax]").forEach(fr => {
      const im = $("img", fr);
      gsap.fromTo(im, { yPercent: -7, scale: 1.14 }, { yPercent: 7, scale: 1.14, ease: "none", scrollTrigger: { trigger: fr, start: "top bottom", end: "bottom top", scrub: true } });
    });
    $$("[data-parallax-bg]").forEach(el => {
      gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });
  }

  /* Galeri: geser samping saat gulir (desktop), geser jari (HP) */
  const gal = $("#galeri");
  if (gal) {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      if (reduce) return;
      const track = $("#galeriTrack"), view = $("#galeriView"), bar = $("#galeriBar");
      const g = () => parseFloat(getComputedStyle(view).paddingLeft) || 0;
      const dist = () => Math.max(0, track.scrollWidth + 2 * g() - view.clientWidth);
      if (dist() < 40) return;
      gsap.to(track, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: gal, start: "top top", end: () => "+=" + Math.round(Math.max(dist() * 1.4, 480)), pin: true, scrub: 0.7, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: s => { bar.style.transform = `scaleX(${s.progress})`; } },
      });
      return () => { bar.style.transform = ""; };
    });
  }

  /* Layanan: daftar + foto bergantian */
  const items = $$("#pengList .item"), pimgs = $$(".peng__panel img");
  let rf = null;
  function setItem(i, toggle) {
    items.forEach((it, k) => {
      let on = k === i;
      if (toggle && on && !desktop() && it.classList.contains("is-on")) on = false;
      it.classList.toggle("is-on", on); $(".item__head", it).setAttribute("aria-expanded", on);
    });
    if (pimgs.length) pimgs.forEach((im, k) => im.classList.toggle("is-on", k === i % pimgs.length));
    clearTimeout(rf); rf = setTimeout(() => ScrollTrigger.refresh(), 900);
  }
  items.forEach((it, i) => {
    const b = $(".item__head", it);
    b.addEventListener("click", () => setItem(i, true));
    b.addEventListener("focus", () => { if (desktop()) setItem(i); });
    if (fine) it.addEventListener("mouseenter", () => { if (desktop()) setItem(i); });
  });

  /* Formulir: kirim ke WhatsApp */
  const form = $("#form");
  if (form) {
    const nama = $("#nama"), pesan = $("#pesanTeks"), galat = $("#galat");
    $$('input[name="perlu"]', form).forEach(r => r.addEventListener("change", () => { galat.textContent = ""; }));
    form.addEventListener("submit", e => {
      e.preventDefault();
      const k = $('input[name="perlu"]:checked', form);
      if (!k) { galat.textContent = "Mohon pilih keperluan Anda terlebih dahulu."; return; }
      const n = nama.value.trim(), p = pesan.value.trim();
      const teks = `Selamat siang, ${SITE.nama}. Saya ${n || "calon pelanggan"} ingin menanyakan mengenai ${k.value}.${p ? " " + p : ""} Terima kasih.`;
      galat.textContent = "";
      window.open(`https://wa.me/${SITE.wa}?text=${encodeURIComponent(teks)}`, "_blank", "noopener");
      const ket = $("#rKet"); if (ket) ket.textContent = "WhatsApp terbuka di tab baru.";
    });
  }

  /* Tombol magnetis */
  if (fine && !reduce) {
    $$("[data-magnet]").forEach(el => {
      const qx = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" }), qy = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
      el.addEventListener("pointermove", e => { const r = el.getBoundingClientRect(); qx((e.clientX - r.left - r.width / 2) * 0.22); qy((e.clientY - r.top - r.height / 2) * 0.32); });
      el.addEventListener("pointerleave", () => { qx(0); qy(0); });
    });
  }

  /* Bar bawah (HP) */
  const bar = $("#bar"), kontak = $("#hubungi");
  if (bar && kontak) {
    let pastHero = false, inKontak = false;
    const upd = () => bar.classList.toggle("is-on", pastHero && !inKontak);
    new IntersectionObserver(es => { pastHero = !es[0].isIntersecting; upd(); }, { threshold: 0.35 }).observe(hero);
    new IntersectionObserver(es => { inKontak = es[0].isIntersecting; upd(); }, { threshold: 0.15 }).observe(kontak);
  }

  /* Hari ini pada daftar jam buka */
  const hariIni = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][new Date().getDay()];
  $$(".jam div").forEach(d => { if (d.dataset.hari === hariIni) d.classList.add("hari-ini"); });

  /* Tulisan besar di footer dipas selebar layar */
  function fit() {
    const el = $(".foot__big"); if (!el) return;
    const sp = $("span", el); el.style.fontSize = "100px";
    const w = sp.getBoundingClientRect().width, avail = el.clientWidth;
    if (w > 0) el.style.fontSize = Math.min(avail / w * 100 * 0.985, innerWidth * 0.27) + "px";
  }
  document.fonts.ready.then(() => { fit(); ScrollTrigger.refresh(); });
  addEventListener("resize", fit);
  addEventListener("load", () => { fit(); ScrollTrigger.refresh(); });
})();
