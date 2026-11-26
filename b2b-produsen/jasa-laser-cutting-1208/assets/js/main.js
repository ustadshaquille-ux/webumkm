/* Garis Laser (demo) — perilaku semua halaman. Turunan template "Sendang".
   Bagian yang diganti per klien ada di CONFIG (diisi build.py lewat atribut data di <body>). */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const CONFIG = { wa: document.body.dataset.wa || "", nama: document.body.dataset.nama || "" };
  const reduce = root.classList.contains("reduce");
  // Di laptop/PC, wa.me berhenti di halaman perantara ("Open app") yang buntu tanpa aplikasi WhatsApp Desktop.
  // Jadi di perangkat non-HP semua tautan WhatsApp langsung diarahkan ke WhatsApp Web.
  const ua = navigator.userAgent;
  const hp = /Android|iPhone|iPad|iPod|Mobile/i.test(ua) || (navigator.maxTouchPoints > 1 && /Macintosh/i.test(ua));
  const keWa = (u) => {
    if (hp) return u;
    try {
      const x = new URL(u);
      if (x.hostname !== "wa.me") return u;
      const t = x.searchParams.get("text");
      return `https://web.whatsapp.com/send?phone=${x.pathname.replace(/\D/g, "")}${t ? `&text=${encodeURIComponent(t)}` : ""}`;
    } catch { return u; }
  };
  $$('a[href^="https://wa.me/"]').forEach((el) => { el.href = keWa(el.href); });
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const desktop = () => matchMedia("(min-width: 900px)").matches;
  const reveal = () => $$(".anim-hide").forEach(el => (el.style.visibility = "visible"));
  const hasGsap = typeof gsap !== "undefined";
  if (hasGsap) gsap.registerPlugin(ScrollTrigger, SplitText);

  /* ---------- Scroll halus ---------- */
  let lenis = null;
  if (hasGsap && !reduce && typeof Lenis !== "undefined") {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const goTo = el => { if (lenis) lenis.scrollTo(el, { offset: el === 0 ? 0 : -24, duration: 1.5, easing: t => 1 - Math.pow(1 - t, 4) }); else (el === 0 ? scrollTo(0, 0) : el.scrollIntoView()); };
  $$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
    const id = a.getAttribute("href"); if (id.length < 2) return;
    const el = $(id); if (!el) return;
    e.preventDefault(); closeMenu(); goTo(id === "#top" ? 0 : el);
    history.replaceState(null, "", id);
  }));

  /* ---------- Menu HP ---------- */
  const burger = $("#burger");
  function setMenu(open) {
    root.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open); burger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    if (lenis) open ? lenis.stop() : lenis.start();
    $("#nav").classList.remove("is-hidden");
  }
  function closeMenu() { if (root.classList.contains("menu-open")) setMenu(false); }
  if (burger) burger.addEventListener("click", () => setMenu(!root.classList.contains("menu-open")));
  addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });

  /* ---------- Navigasi ---------- */
  const nav = $("#nav"), top = $("#top");
  let lastY = scrollY;
  function navState() {
    const y = scrollY, h = top ? top.offsetHeight : 0;
    nav.classList.toggle("is-solid", y > h - 90);
    if (!root.classList.contains("menu-open")) {
      if (y > h * .5 && y > lastY + 4) nav.classList.add("is-hidden");
      else if (y < lastY - 4 || y <= h * .5) nav.classList.remove("is-hidden");
    }
    lastY = y;
  }
  addEventListener("scroll", navState, { passive: true }); navState();

  /* ---------- Jalur potong laser (satu momen di beranda) ---------- */
  function potong() {
    const wrap = $(".potong"); if (!wrap) return;
    const svg = $("svg", wrap), titik = $(".titik", svg), jalur = $$(".jalur", svg);
    if (reduce || !hasGsap) { wrap.classList.add("is-lepas"); return; }
    const taruh = (x, y) => titik.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
    jalur.forEach(p => { const L = p.getTotalLength(); p.dataset.l = L; p.style.strokeDasharray = L; p.style.strokeDashoffset = L; });
    const tl = gsap.timeline({ delay: 0.55, onComplete: () => { wrap.classList.add("is-lepas"); gsap.to(titik, { opacity: 0, duration: 0.5 }); } });
    const kini = { x: 0, y: 0 };
    jalur.forEach((p, i) => {
      const L = +p.dataset.l, awal = p.getPointAtLength(0);
      if (i === 0) { kini.x = awal.x; kini.y = awal.y; tl.call(() => taruh(kini.x, kini.y)); }
      else tl.to(kini, { x: awal.x, y: awal.y, duration: 0.2, ease: "power2.inOut", onUpdate: () => taruh(kini.x, kini.y) });
      tl.to(titik, { opacity: 1, duration: 0.1 });                                   // tembus (pierce)
      const o = { v: 0 };
      tl.to(o, { v: 1, duration: i === 0 ? 2.2 : 0.42, ease: i === 0 ? "power1.inOut" : "none",
        onUpdate: () => { const d = L * o.v, pt = p.getPointAtLength(d); p.style.strokeDashoffset = L - d; kini.x = pt.x; kini.y = pt.y; taruh(pt.x, pt.y); } });
      tl.to(titik, { opacity: 0.22, duration: 0.08 });                                // laser mati saat pindah
    });
  }

  /* ---------- Intro ---------- */
  const h1 = $("#heroH1") || $("#kepalaH1");
  if (!hasGsap || reduce) { reveal(); potong(); }
  else {
    const safe = setTimeout(reveal, 3200);
    let first = true;
    document.fonts.ready.then(() => {
      if (h1) SplitText.create(h1, {
        type: "lines", mask: "lines", maskClass: "mask", autoSplit: true,
        onSplit(self) {
          if (!first) return; first = false; clearTimeout(safe);
          h1.style.visibility = "visible";
          return gsap.from(self.lines, { yPercent: 118, duration: 1.4, ease: "expo.out", stagger: 0.1, delay: 0.2 });
        },
      });
      gsap.fromTo(".anim-hide:not(h1)", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.1, delay: 0.85 });
      gsap.from(".hero__media, .kepala__media", { scale: 1.12, duration: 2.6, ease: "expo.out" });
      nav.style.transition = "none";
      gsap.from(nav, { yPercent: -100, opacity: 0, duration: 1.2, ease: "expo.out", delay: 0.4, clearProps: "transform,opacity", onComplete: () => { nav.style.transition = ""; } });
      potong();
    });
    if (top) gsap.to(".hero__media, .kepala__media", { yPercent: 9, ease: "none", scrollTrigger: { trigger: top, start: "top top", end: "bottom top", scrub: true } });
  }

  if (hasGsap && !reduce) {
    /* kata menyala */
    const besar = $("#besar");
    if (besar) {
      besar.innerHTML = besar.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(" ");
      gsap.to("#besar .w", { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: besar, start: "top 84%", end: "bottom 50%", scrub: 0.5 } });
    }
    /* paralaks foto */
    $$("[data-parallax]").forEach(fr => {
      const im = $("img", fr);
      gsap.fromTo(im, { yPercent: -6, scale: 1.13 }, { yPercent: 6, scale: 1.13, ease: "none", scrollTrigger: { trigger: fr, start: "top bottom", end: "bottom top", scrub: true } });
    });
    $$("[data-parallax-bg]").forEach(el => {
      gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });
    /* geser samping (desktop) */
    const track = $("#geserTrack");
    if (track) gsap.matchMedia().add("(min-width: 900px)", () => {
      const view = $("#geserView"), bar = $("#geserBar");
      const g = () => parseFloat(getComputedStyle(view).paddingLeft) || 0;
      const dist = () => Math.max(0, track.scrollWidth + 2 * g() - view.clientWidth);
      gsap.to(track, { x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: "#aplikasi", start: "top top", end: () => "+=" + Math.round(Math.max(dist() * 1.4, 480)), pin: true, scrub: 0.7, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: s => { bar.style.transform = `scaleX(${s.progress})`; } } });
      return () => { bar.style.transform = ""; };
    });
  }

  /* ---------- Layanan: daftar + foto bergantian ---------- */
  const items = $$("#pengList .item"), pimgs = $$(".peng__panel img");
  let rf = null;
  function setItem(i, toggle) {
    items.forEach((it, k) => {
      let on = k === i;
      if (toggle && on && !desktop() && it.classList.contains("is-on")) on = false;
      it.classList.toggle("is-on", on); $(".item__head", it).setAttribute("aria-expanded", on);
    });
    pimgs.forEach((im, k) => im.classList.toggle("is-on", k === i));
    if (hasGsap) { clearTimeout(rf); rf = setTimeout(() => ScrollTrigger.refresh(), 900); }
  }
  items.forEach((it, i) => {
    const b = $(".item__head", it);
    b.addEventListener("click", () => setItem(i, true));
    b.addEventListener("focus", () => { if (desktop()) setItem(i); });
    if (fine) it.addEventListener("mouseenter", () => { if (desktop()) setItem(i); });
  });

  /* ---------- Minta penawaran (dikirim lewat WhatsApp) ---------- */
  const form = $("#form");
  if (form) {
    const jml = $("#jumlah"), rTotal = $("#rTotal"), rKet = $("#rKet"), galat = $("#galat");
    const pilihan = n => { const el = $(`input[name="${n}"]:checked`, form); return el ? el.value : ""; };
    const nilai = id => ($("#" + id).value || "").trim();
    const angka = () => Math.max(1, Math.min(99999, parseInt(jml.value, 10) || 1));
    const qs = new URLSearchParams(location.search).get("material");
    if (qs) { const r = $(`input[name="material"][data-kode="${qs}"]`, form); if (r) r.checked = true; }
    function ringkas() {
      const m = pilihan("material"), t = nilai("tebal"), u = nilai("ukuran"), f = pilihan("file");
      rTotal.textContent = `${m}${t ? `, ${t} mm` : ""}, ${angka()} buah`;
      rKet.textContent = `${u ? `Ukuran ${u}. ` : "Ukuran belum diisi. "}${f === "Belum ada file" ? "Belum ada file desain." : `File ${f}.`}`;
    }
    form.addEventListener("input", () => { galat.textContent = ""; ringkas(); });
    form.addEventListener("change", ringkas);
    $("#jKurang").addEventListener("click", () => { jml.value = Math.max(1, angka() - 1); ringkas(); });
    $("#jTambah").addEventListener("click", () => { jml.value = angka() + 1; ringkas(); });
    jml.addEventListener("blur", () => { jml.value = angka(); ringkas(); });
    form.addEventListener("submit", e => {
      e.preventDefault();
      const t = nilai("tebal");
      if (t && !/^[0-9]+([.,][0-9]+)?$/.test(t)) { galat.textContent = "Mohon isi ketebalan dalam angka milimeter, misalnya 3 atau 1,2."; $("#tebal").focus(); return; }
      const j = new Date().getHours();
      const salam = j < 11 ? "pagi" : j < 15 ? "siang" : j < 18 ? "sore" : "malam";
      const nama = nilai("nama"), f = pilihan("file"), c = nilai("catatan");
      const baris = [
        `Selamat ${salam}, ${CONFIG.nama}. Saya ${nama || "calon pelanggan"} ingin meminta penawaran laser cutting.`, "",
        `Material: ${pilihan("material")}`,
        `Ketebalan: ${t ? t + " mm" : "belum diketahui"}`,
        `Ukuran: ${nilai("ukuran") || "akan saya sampaikan"}`,
        `Jumlah: ${angka()} buah`,
        `File desain: ${f}`,
      ];
      if (c) baris.push(`Catatan: ${c}`);
      baris.push("", f === "Belum ada file" ? "Sketsa atau foto contoh akan saya kirimkan melalui chat ini. Terima kasih." : "File desain akan saya kirimkan melalui chat ini. Terima kasih.");
      galat.textContent = "";
      window.open(keWa(`https://wa.me/${CONFIG.wa}?text=${encodeURIComponent(baris.join("\n"))}`), "_blank", "noopener");
      rKet.textContent = "WhatsApp terbuka di tab baru. Lampirkan file desain Anda di sana.";
    });
    ringkas();
  }

  /* ---------- Tombol magnetis (mouse) ---------- */
  if (hasGsap && fine && !reduce) {
    $$("[data-magnet]").forEach(el => {
      const qx = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" }), qy = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
      el.addEventListener("pointermove", e => { const r = el.getBoundingClientRect(); qx((e.clientX - r.left - r.width / 2) * 0.2); qy((e.clientY - r.top - r.height / 2) * 0.3); });
      el.addEventListener("pointerleave", () => { qx(0); qy(0); });
    });
  }

  /* ---------- Bar CTA bawah (HP) ---------- */
  const bar = $("#bar"), tujuan = $("#penawaran");
  if (bar && top) {
    let lewat = false, diForm = false;
    const upd = () => bar.classList.toggle("is-on", lewat && !diForm);
    new IntersectionObserver(es => { lewat = !es[0].isIntersecting; upd(); }, { threshold: 0.3 }).observe(top);
    if (tujuan) new IntersectionObserver(es => { diForm = es[0].isIntersecting; upd(); }, { threshold: 0.1 }).observe(tujuan);
  }

  if (hasGsap) {
    addEventListener("load", () => ScrollTrigger.refresh());
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
})();
