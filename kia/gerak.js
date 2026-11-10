(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const diam = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ada = (x) => typeof window[x] !== "undefined";
  const tunggu = (ms) => new Promise((r) => setTimeout(r, diam ? 0 : ms));
  const html = document.documentElement;

  // ---------- gate: one question ----------
  const chat = $("#gerbang-chat"), ketik = $("#mengetik"), form = $("#gerbang-form"), bantu = $("#gerbang-bantu");
  function gelembung(teks, sisi = "kiri") {
    const d = document.createElement("div");
    d.className = `gelembung ${sisi}`;
    d.innerHTML = `<p></p><time>${new Date().toTimeString().slice(0, 5)}</time>`;
    d.querySelector("p").textContent = teks;
    chat.insertBefore(d, ketik);
    if (ada("gsap") && !diam) gsap.from(d, { y: 12, opacity: 0, scale: 0.96, duration: 0.45, ease: "back.out(2)", transformOrigin: sisi === "kiri" ? "0 100%" : "100% 100%" });
  }
  async function bilang(teks, jeda = 900) {
    ketik.hidden = false;
    chat.appendChild(ketik);
    await tunggu(jeda);
    ketik.hidden = true;
    gelembung(teks);
  }
  async function mulaiGerbang() {
    await tunggu(500);
    await bilang("hi 😭", 900);
    await bilang("one question before you come in", 1300);
    await bilang("what do we call each other?", 1200);
    form.classList.add("siap");
    $("#jawab").focus({ preventScroll: true });
    setTimeout(() => bantu.classList.add("siap"), diam ? 0 : 6000);
  }
  let salah = 0;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inp = $("#jawab"), v = inp.value.trim();
    if (!v) return;
    gelembung(v, "kanan");
    inp.value = "";
    if (/^s+e+n+g+$/i.test(v)) {
      form.classList.remove("siap");
      bantu.classList.remove("siap");
      await bilang("correct 😭", 700);
      await bilang("come in, seng", 900);
      await tunggu(700);
      buka();
    } else {
      salah++;
      form.classList.remove("goyang"); void form.offsetWidth; form.classList.add("goyang");
      await bilang(salah < 2 ? "hmm, not that one 😭 try again" : "still no… did you forget 😭", 700);
      if (salah >= 2) bantu.classList.add("siap");
    }
  });
  bantu.addEventListener("click", () => {
    bantu.classList.remove("siap");
    bilang("hint: used 514 times. starts with s. the g can be as long as you want", 600);
  });

  function buka() {
    try { sessionStorage.setItem("kia-masuk", "1"); } catch (e) {}
    const g = $("#gerbang");
    const akhir = () => { html.classList.add("masuk"); scrollTo(0, 0); mulaiHalaman(true); };
    if (ada("gsap") && !diam) gsap.to(g, { clipPath: "circle(0% at 50% 50%)", duration: 1.1, ease: "expo.inOut", onComplete: akhir });
    else akhir();
  }

  // ---------- date ruler (works without gsap too) ----------
  const tgl = $("#penggaris-tgl"), isi = $("#penggaris-isi");
  const bagian = $$("[data-tgl]");
  const hp = () => matchMedia("(max-width: 860px)").matches;
  function perbaruiPenggaris() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, scrollY / max) : 0;
    if (hp()) { isi.style.width = p * 100 + "%"; isi.style.height = ""; }
    else { isi.style.height = p * 100 + "%"; isi.style.width = ""; }
    let sekarang = bagian[0];
    for (const b of bagian) if (b.getBoundingClientRect().top < innerHeight * 0.5) sekarang = b;
    if (sekarang && tgl.textContent !== sekarang.dataset.tgl) tgl.textContent = sekarang.dataset.tgl;
  }
  addEventListener("scroll", perbaruiPenggaris, { passive: true });
  addEventListener("resize", perbaruiPenggaris);

  // ---------- page ----------
  let sudah = false;
  function mulaiHalaman(baruMasuk) {
    if (sudah) return;
    sudah = true;
    perbaruiPenggaris();
    if (!ada("gsap") || diam) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const lenis = ada("Lenis") ? new Lenis({ lerp: 0.08, wheelMultiplier: 0.9 }) : null;
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      $$('.isi-buku a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
        e.preventDefault(); lenis.scrollTo(a.getAttribute("href"), { offset: -20, duration: 1.6 });
      }));
    }

    // the one big moment: the title sets itself, the photo drops in
    document.fonts.ready.then(() => {
      const s = SplitText.create(".sampul-judul span", { type: "chars", mask: "chars" });
      gsap.timeline({ delay: baruMasuk ? 0.1 : 0.3 })
        .from(".sampul-atas", { opacity: 0, x: -20, duration: 0.8, ease: "power3.out" })
        .from(s.chars, { yPercent: 115, duration: 1.1, ease: "expo.out", stagger: 0.05 }, "-=0.4")
        .from(".sampul-foto", { y: -120, rotate: -14, opacity: 0, duration: 1.4, ease: "expo.out" }, "-=1.1")
        .from(".sampul-sub, .sampul-oleh", { opacity: 0, y: 14, duration: 0.9, ease: "power3.out", stagger: 0.12 }, "-=0.8");
    });

    // chat bubbles arrive one by one, like new messages
    $$("[data-chat]").forEach((el) => {
      gsap.from(el, { opacity: 0, y: 16, scale: 0.95, duration: 0.55, ease: "back.out(1.8)",
        scrollTrigger: { trigger: el, start: "top 90%" } });
    });

    // plates drift a little
    $$(".lampiran").forEach((f, i) => {
      gsap.to(f, { y: i % 2 ? -30 : 30, ease: "none", scrollTrigger: { trigger: f, start: "top bottom", end: "bottom top", scrub: true } });
    });

    // receipt numbers count up
    $$(".struk [data-hitung]").forEach((el) => {
      const n = +el.dataset.hitung, o = { v: 0 };
      gsap.to(o, { v: n, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: "#struk", start: "top 80%" },
        onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString("en-US")) });
    });
  }

  // ---------- 😭 on click ----------
  addEventListener("pointerdown", (e) => {
    if (!html.classList.contains("masuk") || diam || !ada("gsap")) return;
    if (e.target.closest("button, a, input, video, dialog, .lampiran")) return;
    const n = 5 + Math.floor(Math.random() * 4);
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.className = "nangis";
      s.textContent = Math.random() < 0.85 ? "😭" : "🤍";
      s.style.left = e.clientX - 11 + "px";
      s.style.top = e.clientY - 14 + "px";
      document.body.appendChild(s);
      const sudut = (-90 + (Math.random() - 0.5) * 120) * (Math.PI / 180), jarak = 70 + Math.random() * 90;
      gsap.to(s, { x: Math.cos(sudut) * jarak, y: Math.sin(sudut) * jarak, rotate: (Math.random() - 0.5) * 80,
        scale: 0.7 + Math.random() * 0.8, duration: 0.9 + Math.random() * 0.5, ease: "power3.out" });
      gsap.to(s, { opacity: 0, y: "+=30", delay: 0.6, duration: 0.6, ease: "power2.in", onComplete: () => s.remove() });
    }
  });

  // ---------- photos & video ----------
  const kotak = $("#kotak-foto");
  $$(".lampiran img").forEach((img) => img.addEventListener("click", () => {
    kotak.querySelector("img").src = img.dataset.besar || img.src;
    kotak.querySelector("img").alt = img.alt;
    kotak.showModal();
  }));
  kotak.addEventListener("click", (e) => { if (e.target === kotak || e.target.closest(".tutup")) kotak.close(); });
  const vid = $(".lampiran.video video"), putar = $(".putar");
  putar.addEventListener("click", () => { vid.muted = false; vid.controls = true; vid.play(); vid.closest(".lampiran").classList.add("main"); });

  $("#ulang").addEventListener("click", () => { try { sessionStorage.removeItem("kia-masuk"); } catch (e) {} location.reload(); });

  if (html.classList.contains("masuk")) mulaiHalaman(false);
  else mulaiGerbang();
})();
