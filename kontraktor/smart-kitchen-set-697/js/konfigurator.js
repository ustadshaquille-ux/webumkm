// SMART Kitchen Set: konfigurator dapur 3D + estimasi harga.
// Three.js baru dimuat saat bagian "Rancang" hampir terlihat, supaya halaman awal tetap ringan.

// ====== TARIF (Rupiah per meter lari) — GANTI SESUAI HARGA ASLI KLIEN ======
const TARIF = {
  kabinetBawah: { hpl: 2_600_000, hplKayu: 2_800_000, duco: 4_400_000 },
  kabinetAtas:  { hpl: 2_100_000, hplKayu: 2_300_000, duco: 3_600_000 },
  meja: { quartz: 2_000_000, solid: 2_700_000, granit: 2_400_000, marmer: 3_200_000 },
  pegangan: { tanam: 0, bar: 90_000, emas: 160_000 },   // per pintu
  faktorIsland: 1.2,                                    // island finishing 2 sisi
  rentang: [0.9, 1.12]                                  // kisaran bawah–atas
};

const KABINET = [
  { id: 'putih',  nama: 'HPL Putih Doff',  grup: 'hpl',     warna: '#efece6', kasar: 0.62, tekstur: null,  info: 'HPL putih doff. Bersih, terang, tahan gores, mudah dirawat.' },
  { id: 'oak',    nama: 'HPL Oak Natural', grup: 'hplKayu', warna: '#c9a57c', kasar: 0.7,  tekstur: 'oak',    info: 'Motif kayu oak terang. Hangat dan cocok untuk gaya Scandinavian.' },
  { id: 'walnut', nama: 'HPL Walnut',      grup: 'hplKayu', warna: '#6b4a33', kasar: 0.66, tekstur: 'walnut', info: 'Motif walnut gelap. Kesan elegan dan tenang.' },
  { id: 'greige', nama: 'Duco Greige',     grup: 'duco',    warna: '#cfc5b6', kasar: 0.45, tekstur: null,  info: 'Cat duco greige (abu-krem). Permukaan mulus tanpa sambungan.' },
  { id: 'sage',   nama: 'Duco Sage',       grup: 'duco',    warna: '#9ba48f', kasar: 0.45, tekstur: null,  info: 'Duco hijau sage. Lembut, segar, sedang banyak dicari.' },
  { id: 'navy',   nama: 'Duco Navy',       grup: 'duco',    warna: '#2f3a4a', kasar: 0.4,  tekstur: null,  info: 'Duco biru navy. Tegas dan mewah, cantik dipadu handle emas.' },
  { id: 'hitam',  nama: 'Duco Hitam Doff', grup: 'duco',    warna: '#262523', kasar: 0.5,  tekstur: null,  info: 'Duco hitam doff. Modern, dramatis, sidik jari tidak mudah terlihat.' },
  { id: 'krem',   nama: 'Duco Krem Klasik',grup: 'duco',    warna: '#ece3d0', kasar: 0.42, tekstur: null,  info: 'Duco krem untuk dapur klasik dengan list dan detail.' }
];
const MEJA = [
  { id: 'calacatta', nama: 'Quartz Calacatta', grup: 'quartz', warna: '#f3f1ed', tekstur: 'marmerPutih', tebal: 0.03, info: 'Quartz putih dengan urat abu halus. Tahan noda dan gores.' },
  { id: 'beton',     nama: 'Quartz Abu Beton', grup: 'quartz', warna: '#a7a39c', tekstur: 'beton',       tebal: 0.03, info: 'Quartz abu bertekstur beton. Tidak mudah terlihat kotor.' },
  { id: 'solid',     nama: 'Solid Surface Putih', grup: 'solid', warna: '#f6f4ef', tekstur: null,      tebal: 0.03, info: 'Solid surface tanpa sambungan. Tahan panas dan lembap.' },
  { id: 'granit',    nama: 'Granit Hitam',     grup: 'granit', warna: '#1d1c1b', tekstur: 'granit',      tebal: 0.04, info: 'Granit hitam alami. Paling tahan untuk masak berat.' },
  { id: 'marmer',    nama: 'Marmer Statuario', grup: 'marmer', warna: '#ece9e3', tekstur: 'marmerTegas', tebal: 0.04, info: 'Marmer alam dengan urat tegas. Setiap lembar unik.' }
];
const NAMA_BENTUK = { I: 'Lurus', L: 'Huruf L', U: 'Huruf U', P: 'Lurus + island' };
const NAMA_HANDLE = { tanam: 'Tanam (tanpa handle)', bar: 'Batang hitam', emas: 'Batang emas' };

// ====== FORM & HARGA (jalan tanpa 3D) ======
const form = document.getElementById('cfg-form');
const $ = s => document.querySelector(s);
const fmt1 = v => v.toFixed(1).replace('.', ',');

function swatches(el, list, name) {
  el.innerHTML = list.map((m, i) => `
    <label class="sw" title="${m.nama}">
      <input type="radio" name="${name}" value="${m.id}" ${i === 0 ? 'checked' : ''}>
      <i style="background:${swatchBg(m)}"></i>${m.nama}
    </label>`).join('');
}
function swatchBg(m) {
  if (m.tekstur === 'oak') return 'repeating-linear-gradient(95deg,#c9a57c 0 6px,#bf9a70 6px 9px,#d2b089 9px 14px)';
  if (m.tekstur === 'walnut') return 'repeating-linear-gradient(95deg,#6b4a33 0 5px,#5c3f2b 5px 8px,#76533a 8px 13px)';
  if (m.tekstur === 'marmerPutih') return 'linear-gradient(135deg,#f3f1ed 40%,#cfcac2 42%,#f3f1ed 45%,#f3f1ed 70%,#dcd8d1 72%,#f3f1ed 74%)';
  if (m.tekstur === 'marmerTegas') return 'linear-gradient(120deg,#ece9e3 35%,#9b968e 37%,#ece9e3 41%,#ece9e3 66%,#b6b1a9 68%,#ece9e3 71%)';
  if (m.tekstur === 'granit') return 'radial-gradient(#4a4845 1px,transparent 1.5px) 0 0/6px 6px,#1d1c1b';
  if (m.tekstur === 'beton') return 'radial-gradient(#8f8b84 1px,transparent 1.5px) 0 0/5px 5px,#a7a39c';
  return m.warna;
}
swatches($('#sw-kabinet'), KABINET, 'kabinet');
swatches($('#sw-top'), MEJA, 'meja');

function baca() {
  const f = new FormData(form);
  return {
    bentuk: f.get('bentuk'), a: +f.get('a'), b: +f.get('b'), c: +f.get('c'), d: +f.get('d'),
    atas: f.get('atas') === 'on', kabinet: f.get('kabinet'), meja: f.get('meja'), handle: f.get('handle')
  };
}
function tulis(s) {
  const set = (n, v) => { const el = form.elements[n]; if (el && v != null) el.value = v; };
  ['bentuk', 'a', 'b', 'c', 'd', 'kabinet', 'meja', 'handle'].forEach(k => set(k, s[k]));
  form.elements.atas.checked = !!s.atas;
}
function kode(s) { return [s.bentuk, s.a, s.b, s.c, s.d, s.atas ? 1 : 0, s.kabinet, s.meja, s.handle].join('_'); }
function dariKode(k) {
  const p = (k || '').split('_');
  if (p.length !== 9 || !NAMA_BENTUK[p[0]]) return null;
  const lim = (v, lo, hi) => Math.min(hi, Math.max(lo, +v || lo));
  return {
    bentuk: p[0], a: lim(p[1], 1.5, 5), b: lim(p[2], 1.2, 4), c: lim(p[3], 1.2, 4), d: lim(p[4], 1.2, 3),
    atas: p[5] === '1',
    kabinet: KABINET.some(x => x.id === p[6]) ? p[6] : 'putih',
    meja: MEJA.some(x => x.id === p[7]) ? p[7] : 'calacatta',
    handle: NAMA_HANDLE[p[8]] ? p[8] : 'tanam'
  };
}

function hitung(s) {
  const kab = KABINET.find(x => x.id === s.kabinet), mj = MEJA.find(x => x.id === s.meja);
  let bawah = s.a;
  if (s.bentuk === 'L' || s.bentuk === 'U') bawah += s.b - 0.6;
  if (s.bentuk === 'U') bawah += s.c - 0.6;
  const island = s.bentuk === 'P' ? s.d : 0;
  const bawahBerdinding = s.bentuk === 'U' ? bawah - (s.c - 0.6) : bawah;  // sisi kanan U tanpa kabinet atas
  const atas = s.atas ? Math.max(0, bawahBerdinding - 0.6) : 0;            // dikurangi area hood
  const pintu = Math.round((bawah + island) / 0.5) + Math.round(atas / 0.45);
  const total =
    bawah * TARIF.kabinetBawah[kab.grup] +
    atas * TARIF.kabinetAtas[kab.grup] +
    island * TARIF.kabinetBawah[kab.grup] * TARIF.faktorIsland +
    (bawah + island) * TARIF.meja[mj.grup] +
    pintu * TARIF.pegangan[s.handle];
  const bulat = v => Math.round(v / 500_000) * 0.5;               // dalam juta, kelipatan 0,5
  return { lo: bulat(total * TARIF.rentang[0]), hi: bulat(total * TARIF.rentang[1]), bawah, atas, island };
}
const jt = v => (v % 1 ? v.toFixed(1).replace('.', ',') : v) ;

function perbarui() {
  const s = baca();
  form.querySelectorAll('.range[data-for]').forEach(r => { r.hidden = !r.dataset.for.split(' ').includes(s.bentuk); });
  $('#o-a').textContent = fmt1(s.a) + ' m';
  $('#o-b').textContent = fmt1(s.b) + ' m';
  $('#o-c').textContent = fmt1(s.c) + ' m';
  $('#o-d').textContent = fmt1(s.d) + ' m';
  $('#note-kabinet').textContent = KABINET.find(x => x.id === s.kabinet).info;
  $('#note-top').textContent = MEJA.find(x => x.id === s.meja).info;
  const h = hitung(s);
  $('#cfg-price').textContent = `Rp ${jt(h.lo)} – ${jt(h.hi)} juta`;
  $('#cfg-meta').textContent = `Kabinet bawah ${fmt1(h.bawah)} m` + (h.atas ? ` · atas ${fmt1(h.atas)} m` : '') + (h.island ? ` · island ${fmt1(h.island)} m` : '');

  const k = kode(s);
  if (disentuh) history.replaceState(null, '', '#d=' + k);
  const link = location.origin + location.pathname + '#d=' + k;
  const ukuran = [`dinding utama ${fmt1(s.a)} m`];
  if (s.bentuk === 'L' || s.bentuk === 'U') ukuran.push(`sisi kiri ${fmt1(s.b)} m`);
  if (s.bentuk === 'U') ukuran.push(`sisi kanan ${fmt1(s.c)} m`);
  if (s.bentuk === 'P') ukuran.push(`island ${fmt1(s.d)} m`);
  const pesan = [
    'Halo SMART Kitchen Set, saya sudah mencoba rancang dapur di website:',
    `• Bentuk: ${NAMA_BENTUK[s.bentuk]}`,
    `• Ukuran: ${ukuran.join(', ')}`,
    `• Kabinet atas: ${s.atas ? 'ya' : 'tidak'}`,
    `• Finishing: ${KABINET.find(x => x.id === s.kabinet).nama}`,
    `• Meja: ${MEJA.find(x => x.id === s.meja).nama}`,
    `• Pegangan: ${NAMA_HANDLE[s.handle]}`,
    `• Estimasi di web: Rp ${jt(h.lo)}–${jt(h.hi)} juta`,
    `Lihat rancangan: ${link}`,
    '',
    'Mohon dibantu jadwal survei dan penawaran rinci. Terima kasih.'
  ].join('\n');
  const a = $('#cfg-send');
  a.href = window.SMART_WA ? window.SMART_WA(pesan) : `https://wa.me/6282123842211?text=${encodeURIComponent(pesan)}`;
  a.target = '_blank'; a.rel = 'noopener';
  if (scene3d) scene3d.jadwalkan(s);
}

// buka rancangan yang dibagikan lewat link
const awal = dariKode((location.hash.match(/#d=([^&]+)/) || [])[1]);
if (awal) { tulis(awal); requestAnimationFrame(() => document.getElementById('rancang').scrollIntoView()); }
let disentuh = !!awal;
form.addEventListener('input', () => { disentuh = true; perbarui(); });
form.addEventListener('change', () => { disentuh = true; perbarui(); });
let scene3d = null;
perbarui();

// ====== 3D ======
const wadah = document.getElementById('cfg-canvas');
const pemicu = new IntersectionObserver(async es => {
  if (!es.some(e => e.isIntersecting)) return;
  pemicu.disconnect();
  try {
    scene3d = await buat3D();
    scene3d.jadwalkan(baca());
    document.getElementById('cfg-loading').remove();
  } catch (err) {
    console.error(err);
    document.getElementById('cfg-loading').innerHTML = 'Pratinjau 3D tidak bisa dimuat di perangkat ini.<br>Estimasi harga tetap berjalan.';
  }
}, { rootMargin: '400px 0px' });
pemicu.observe(wadah);

async function buat3D() {
  const THREE = await import('three');
  const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
  const { RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js');

  const hp = matchMedia('(max-width: 900px)').matches;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, hp ? 1.6 : 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;
  wadah.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minPolarAngle = 0.35;
  controls.maxPolarAngle = 1.42;
  controls.minAzimuthAngle = -1.25;
  controls.maxAzimuthAngle = 1.25;
  controls.minDistance = 2.5;
  controls.maxDistance = 14;

  // cahaya
  const hemi = new THREE.HemisphereLight(0xfff6ea, 0xb9ad9c, 0.55);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff1de, 2.2);
  sun.position.set(-3, 6, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(hp ? 1024 : 2048, hp ? 1024 : 2048);
  Object.assign(sun.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 0.5, far: 25 });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.02;
  scene.add(sun, sun.target);

  // ---- tekstur prosedural (dibuat di canvas, tanpa file gambar) ----
  const rnd = (() => { let s = 7; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  function kanvas(w, h, gambar) {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    gambar(c.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return t;
  }
  const TEX = {
    oak: () => kanvas(512, 512, (g, w, h) => kayu(g, w, h, '#c9a57c', ['#b8915f', '#d6b48c', '#bd986b'])),
    walnut: () => kanvas(512, 512, (g, w, h) => kayu(g, w, h, '#6b4a33', ['#573a27', '#7a573d', '#4f3424'])),
    marmerPutih: () => kanvas(1024, 512, (g, w, h) => marmer(g, w, h, '#f3f1ed', 'rgba(120,115,108,', 0.35)),
    marmerTegas: () => kanvas(1024, 512, (g, w, h) => marmer(g, w, h, '#ece9e3', 'rgba(70,66,60,', 0.7)),
    granit: () => kanvas(512, 512, (g, w, h) => bintik(g, w, h, '#1d1c1b', ['#3c3a37', '#2c2b29', '#55524d', '#141312'], 9000)),
    beton: () => kanvas(512, 512, (g, w, h) => bintik(g, w, h, '#a7a39c', ['#9a968f', '#b3afa8', '#8e8a83'], 7000)),
    lantai: () => kanvas(1024, 1024, (g, w, h) => {
      // lantai papan kayu terang, 8 papan per tekstur
      const papan = 8, tp = h / papan, nada = ['#cfb595', '#c7ab89', '#d6bea0', '#c3a683'];
      for (let r = 0; r < papan; r++) {
        const geser = (r % 2) * w * 0.47;
        for (let k = -1; k < 2; k++) {
          const x0 = geser + k * w * 0.94;
          g.fillStyle = nada[(r + k + 4) % nada.length]; g.fillRect(x0, r * tp, w * 0.94, tp);
          for (let s = 0; s < 14; s++) {
            g.strokeStyle = `rgba(110,80,50,${0.05 + rnd() * 0.1})`; g.lineWidth = 0.6 + rnd();
            const y = r * tp + rnd() * tp; g.beginPath(); g.moveTo(x0, y);
            for (let x = x0; x < x0 + w * 0.94; x += 40) g.lineTo(x, y + Math.sin(x * 0.01 + s) * 2);
            g.stroke();
          }
          g.fillStyle = 'rgba(80,58,38,.45)'; g.fillRect(x0, r * tp, 2, tp);
        }
        g.fillStyle = 'rgba(80,58,38,.4)'; g.fillRect(0, r * tp, w, 2);
      }
    })
  };
  function kayu(g, w, h, dasar, serat) {
    g.fillStyle = dasar; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 160; i++) {
      g.strokeStyle = serat[i % serat.length]; g.globalAlpha = 0.25 + rnd() * 0.35; g.lineWidth = 0.6 + rnd() * 2.4;
      const x = rnd() * w; g.beginPath(); g.moveTo(x, 0);
      for (let y = 0; y <= h; y += 32) g.lineTo(x + Math.sin(y * 0.02 + i) * 3 + (rnd() - 0.5) * 2, y);
      g.stroke();
    }
    g.globalAlpha = 1;
  }
  function marmer(g, w, h, dasar, urat, kuat) {
    g.fillStyle = dasar; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 14; i++) {
      let x = rnd() * w, y = rnd() * h;
      g.strokeStyle = urat + (0.12 + rnd() * kuat) + ')'; g.lineWidth = 0.6 + rnd() * (i < 3 ? 3 : 1.4);
      g.beginPath(); g.moveTo(x, y);
      for (let k = 0; k < 60; k++) { x += 14 + rnd() * 10; y += (rnd() - 0.45) * 22; g.lineTo(x, y); }
      g.stroke();
    }
  }
  function bintik(g, w, h, dasar, warna, n) {
    g.fillStyle = dasar; g.fillRect(0, 0, w, h);
    for (let i = 0; i < n; i++) { g.fillStyle = warna[i % warna.length]; const r = rnd() * 2.2; g.fillRect(rnd() * w, rnd() * h, r, r); }
  }
  const cache = {};
  const tex = k => (cache[k] ||= TEX[k]());

  // ---- material ----
  const mat = {
    dinding: new THREE.MeshStandardMaterial({ color: 0xe4dbcd, roughness: 0.95 }),
    lantai: new THREE.MeshStandardMaterial({ map: (() => { const t = tex('lantai'); t.repeat.set(5, 5); return t; })(), roughness: 0.5, metalness: 0 }),
    plint: new THREE.MeshStandardMaterial({ color: 0x2a2724, roughness: 0.8 }),
    stainless: new THREE.MeshStandardMaterial({ color: 0xc9cbcd, roughness: 0.25, metalness: 0.9 }),
    kacaHitam: new THREE.MeshStandardMaterial({ color: 0x0c0c0d, roughness: 0.08, metalness: 0.2 }),
    cincin: new THREE.MeshStandardMaterial({ color: 0x5a5a5a, roughness: 0.4 }),
    hitamMetal: new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.35, metalness: 0.7 }),
    emas: new THREE.MeshStandardMaterial({ color: 0xc8a165, roughness: 0.28, metalness: 1 }),
    alur: new THREE.MeshStandardMaterial({ color: 0x1b1a18, roughness: 0.9 }),
    led: new THREE.MeshStandardMaterial({ color: 0xffe2b0, emissive: 0xffc77a, emissiveIntensity: 0.15 }),
    kursi: new THREE.MeshStandardMaterial({ color: 0xc19a6b, roughness: 0.6 }),
    lampu: new THREE.MeshStandardMaterial({ color: 0x2b2a28, roughness: 0.5, metalness: 0.4, side: THREE.DoubleSide }),
    bohlam: new THREE.MeshStandardMaterial({ color: 0xfff1d6, emissive: 0xffd08a, emissiveIntensity: 0.3 })
  };
  const matKab = {}, matMeja = {};
  KABINET.forEach(k => {
    const m = new THREE.MeshStandardMaterial({ color: k.tekstur ? 0xffffff : k.warna, roughness: k.kasar, metalness: 0 });
    if (k.tekstur) m.map = tex(k.tekstur);
    matKab[k.id] = m;
  });
  MEJA.forEach(k => {
    const m = new THREE.MeshStandardMaterial({ color: k.tekstur ? 0xffffff : k.warna, roughness: k.grup === 'solid' ? 0.45 : 0.18, metalness: 0 });
    if (k.tekstur) m.map = tex(k.tekstur);
    matMeja[k.id] = m;
  });

  // ---- pembangun geometri ----
  const geoBox = new THREE.BoxGeometry(1, 1, 1);
  function kotak(parent, m, w, h, d, x, y, z, bayang = true) {
    const o = new THREE.Mesh(geoBox, m);
    o.scale.set(w, h, d); o.position.set(x, y, z);
    o.castShadow = bayang; o.receiveShadow = true;
    parent.add(o); return o;
  }
  const geoSilinder = new THREE.CylinderGeometry(1, 1, 1, 20);
  function silinder(parent, m, r, h, x, y, z) {
    const o = new THREE.Mesh(geoSilinder, m);
    o.scale.set(r, h, r); o.position.set(x, y, z); o.castShadow = true; parent.add(o); return o;
  }

  const T_PLINT = 0.1, T_BADAN = 0.76, D_BAWAH = 0.58, Y_ATAS = 1.5, T_ATAS = 0.72, D_ATAS = 0.35;

  function pegangan(parent, s, w, x, yTop, zDepan, vertikal = false) {
    if (s.handle === 'tanam') { kotak(parent, mat.alur, w - 0.03, 0.012, 0.004, x, yTop - 0.012, zDepan + 0.001, false); return; }
    const m = s.handle === 'emas' ? mat.emas : mat.hitamMetal;
    const p = Math.min(0.32, w * 0.55);
    if (vertikal) kotak(parent, m, 0.014, p, 0.022, x, yTop, zDepan + 0.016);
    else kotak(parent, m, p, 0.014, 0.022, x, yTop - 0.05, zDepan + 0.016);
  }

  // satu deret kabinet di koordinat lokal: sepanjang +x, punggung di z=0, muka di z=D_BAWAH
  function deret(s, len, opsi) {
    const g = new THREE.Group();
    const kab = matKab[s.kabinet], mj = MEJA.find(x => x.id === s.meja);
    const n = Math.max(1, Math.round(len / 0.6)), w = len / n;
    const tinggiPenuh = opsi.lemariTinggi ? n - 1 : -1;     // modul terakhir jadi lemari tinggi
    const lenMeja = opsi.lemariTinggi ? len - w : len;

    kotak(g, mat.plint, len, T_PLINT, D_BAWAH - 0.06, len / 2, T_PLINT / 2, (D_BAWAH - 0.06) / 2, false);
    kotak(g, kab, lenMeja, T_BADAN, D_BAWAH, lenMeja / 2, T_PLINT + T_BADAN / 2, D_BAWAH / 2);

    for (let i = 0; i < n; i++) {
      const x = w * i + w / 2, zf = D_BAWAH;
      if (i === tinggiPenuh) {
        const H = 2.2 - T_PLINT;
        kotak(g, kab, w, H, D_BAWAH, x, T_PLINT + H / 2, D_BAWAH / 2);
        kotak(g, kab, w - 0.004, 1.2, 0.018, x, T_PLINT + 0.6, zf + 0.009);
        kotak(g, kab, w - 0.004, H - 1.204, 0.018, x, T_PLINT + 1.2 + (H - 1.2) / 2 + 0.002, zf + 0.009);
        pegangan(g, s, w, x - w / 2 + 0.06, T_PLINT + 1.05, zf + 0.018, true);
        continue;
      }
      if (i === opsi.kompor && !opsi.island) {
        const hs = [0.2, 0.26, 0.28]; let y = T_PLINT;
        hs.forEach(h => { kotak(g, kab, w - 0.004, h - 0.004, 0.018, x, y + h / 2, zf + 0.009); pegangan(g, s, w, x, y + h, zf + 0.018); y += h; });
      } else {
        const ganda = w > 0.75;
        const wd = ganda ? w / 2 : w;
        for (let j = 0; j < (ganda ? 2 : 1); j++) {
          const xd = ganda ? x - w / 4 + j * w / 2 : x;
          kotak(g, kab, wd - 0.004, T_BADAN - 0.004, 0.018, xd, T_PLINT + T_BADAN / 2, zf + 0.009);
          pegangan(g, s, wd, xd, T_PLINT + T_BADAN, zf + 0.018);
        }
      }
    }

    // meja
    const t = mj.tebal, yM = T_PLINT + T_BADAN;
    const dM = opsi.island ? 0.92 : D_BAWAH + 0.04;
    const zM = opsi.island ? (D_BAWAH + 0.02) - dM / 2 : dM / 2;
    const meja = kotak(g, matMeja[s.meja], lenMeja, t, dM, lenMeja / 2, yM + t / 2, zM);
    if (matMeja[s.meja].map) { meja.material = matMeja[s.meja].clone(); meja.material.map = matMeja[s.meja].map.clone(); meja.material.map.repeat.set(lenMeja / 2.4, 1); meja.material.map.needsUpdate = true; }
    const yPermukaan = yM + t;

    // bak cuci + kran
    if (opsi.bak != null && opsi.bak < n) {
      const xb = w * opsi.bak + w / 2;
      kotak(g, mat.stainless, Math.min(0.56, w * 0.92), 0.004, 0.4, xb, yPermukaan + 0.001, 0.32, false);
      kotak(g, mat.alur, Math.min(0.48, w * 0.8), 0.003, 0.32, xb, yPermukaan + 0.004, 0.32, false);
      silinder(g, mat.stainless, 0.014, 0.32, xb, yPermukaan + 0.16, 0.08);
      const leher = silinder(g, mat.stainless, 0.012, 0.2, xb, yPermukaan + 0.31, 0.16);
      leher.rotation.x = Math.PI / 2;
    }
    // kompor tanam
    if (opsi.kompor != null && opsi.kompor < n) {
      const xk = w * opsi.kompor + w / 2;
      kotak(g, mat.kacaHitam, Math.min(0.6, w * 0.95), 0.008, 0.5, xk, yPermukaan + 0.004, 0.3, false);
      [[-0.14, 0.2], [0.14, 0.2], [-0.14, 0.4], [0.14, 0.4]].forEach(([dx, dz]) => {
        const r = new THREE.Mesh(new THREE.TorusGeometry(0.065, 0.006, 6, 28), mat.cincin);
        r.rotation.x = Math.PI / 2; r.position.set(xk + dx * Math.min(1, w / 0.6), yPermukaan + 0.01, dz); g.add(r);
      });
    }

    // kabinet atas + hood + LED
    if (s.atas && !opsi.island && !opsi.tanpaAtas) {
      const yA = Y_ATAS + T_ATAS / 2;
      const batas = opsi.lemariTinggi ? n - 1 : n;
      for (let i = 0; i < batas; i++) {
        const x = w * i + w / 2;
        if (i === opsi.kompor) {
          kotak(g, mat.stainless, Math.min(0.6, w * 0.95), 0.12, 0.48, x, Y_ATAS + 0.06, 0.24);
          kotak(g, mat.stainless, 0.26, 2.4 - Y_ATAS - 0.12, 0.24, x, (Y_ATAS + 0.12 + 2.4) / 2, 0.12);
          continue;
        }
        kotak(g, kab, w, T_ATAS, D_ATAS, x, yA, D_ATAS / 2);
        kotak(g, kab, w - 0.004, T_ATAS - 0.004, 0.018, x, yA, D_ATAS + 0.009);
        if (s.handle !== 'tanam') pegangan(g, s, w, x, Y_ATAS + 0.08, D_ATAS + 0.018);
        kotak(g, mat.led, w - 0.02, 0.008, 0.02, x, Y_ATAS - 0.006, D_ATAS - 0.04, false);
      }
    }

    // island: overhang + kursi + lampu gantung
    if (opsi.island) {
      const jumlah = Math.max(2, Math.floor(len / 0.6));
      for (let i = 0; i < jumlah; i++) {
        const x = (len / jumlah) * (i + 0.5), z = -0.42;
        silinder(g, mat.kursi, 0.18, 0.05, x, 0.68, z);
        [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => {
          const kaki = silinder(g, mat.kursi, 0.012, 0.68, x + a * 0.11, 0.34, z + b * 0.11);
          kaki.rotation.set(b * 0.1, 0, -a * 0.1);
        });
      }
      const nL = len > 2 ? 3 : 2;
      for (let i = 0; i < nL; i++) {
        const x = (len / nL) * (i + 0.5), z = 0.15;
        silinder(g, mat.hitamMetal, 0.004, 0.75, x, 2.6 - 0.375, z);
        const kap = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.22, 28, 1, true), mat.lampu);
        kap.position.set(x, 1.8, z); kap.castShadow = true; g.add(kap);
        const b = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 12), mat.bohlam);
        b.position.set(x, 1.72, z); g.add(b);
        lampuIsland.push({ x, z });
      }
    }

    // panel ujung yang terlihat
    if (opsi.panelKanan) kotak(g, kab, 0.02, T_PLINT + T_BADAN + t, D_BAWAH + 0.04, len + 0.01, (T_PLINT + T_BADAN + t) / 2, (D_BAWAH + 0.04) / 2);
    if (opsi.panelKiri) kotak(g, kab, 0.02, T_PLINT + T_BADAN + t, D_BAWAH + 0.04, -0.01, (T_PLINT + T_BADAN + t) / 2, (D_BAWAH + 0.04) / 2);
    return g;
  }

  // ---- ruangan & susunan ----
  let isi = null, lampuIsland = [], lampuMalam = [];
  const ruang = new THREE.Group(); scene.add(ruang);

  function bersihkan(o) {
    o.traverse(c => { if (c.isMesh && c.geometry !== geoBox && c.geometry !== geoSilinder) c.geometry.dispose(); if (c.isMesh && c.material && !Object.values(mat).includes(c.material) && !Object.values(matKab).includes(c.material) && !Object.values(matMeja).includes(c.material)) { c.material.map?.dispose(); c.material.dispose(); } });
  }

  function bangun(s) {
    if (isi) { ruang.remove(isi); bersihkan(isi); }
    lampuMalam.forEach(l => scene.remove(l)); lampuMalam = []; lampuIsland = [];
    isi = new THREE.Group();
    const A = s.a, H = 2.6;
    const pakaiKiri = s.bentuk === 'L' || s.bentuk === 'U';
    const pakaiKanan = s.bentuk === 'U';
    const kedalaman = Math.max(pakaiKiri ? s.b : 0.6, pakaiKanan ? s.c : 0.6, s.bentuk === 'P' ? 3.3 : 0.6);

    // lantai & dinding
    const lantai = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), mat.lantai);
    lantai.rotation.x = -Math.PI / 2; lantai.position.set(A / 2, 0, 3); lantai.receiveShadow = true; isi.add(lantai);
    kotak(isi, mat.dinding, A + 0.1, H, 0.1, A / 2, H / 2, -0.05, false);
    kotak(isi, mat.dinding, 0.1, H, kedalaman + 1.4, -0.05, H / 2, (kedalaman + 1.4) / 2 - 0.1, false);

    // deret utama (A)
    const nA = Math.max(1, Math.round(A / 0.6));
    const lemariTinggi = !pakaiKanan && A >= 3.4;
    const nPakai = lemariTinggi ? nA - 1 : nA;
    let bak = Math.max(0, Math.floor(nPakai * 0.3));
    let kompor = Math.min(nPakai - 1, Math.max(bak + 1, Math.round(nPakai * 0.72)));
    if (pakaiKanan) kompor = Math.min(kompor, nPakai - 2);   // modul pojok kanan dipakai sisi kanan
    if (kompor != null && kompor <= bak) kompor = null;
    if (nPakai < 2) kompor = null;
    if (pakaiKiri && nPakai >= 3) bak = Math.max(1, bak);  // hindari bak di modul pojok
    isi.add(deret(s, A, { bak, kompor, lemariTinggi, panelKanan: !pakaiKanan && !lemariTinggi }));

    if (pakaiKiri) {
      const len = s.b - 0.6;
      const gB = deret(s, len, { panelKiri: true });
      gB.rotation.y = Math.PI / 2; gB.position.set(0, 0, s.b); isi.add(gB);
    }
    if (pakaiKanan) {
      const len = s.c - 0.6;
      const gC = deret(s, len, { panelKanan: true, tanpaAtas: true });   // sisi terbuka: tanpa kabinet gantung
      gC.rotation.y = -Math.PI / 2; gC.position.set(A, 0, 0.6); isi.add(gC);
    }
    if (s.bentuk === 'P') {
      const D = s.d, zPunggung = 2.4;
      const gI = deret(s, D, { island: true });
      gI.rotation.y = Math.PI; gI.position.set(A / 2 + D / 2, 0, zPunggung - 0.0); isi.add(gI);
      // lampu malam di atas island (posisi dunia)
      lampuIsland.forEach(p => {
        const L = new THREE.PointLight(0xffc98a, 0, 3.2, 1.6);
        L.position.set(A / 2 + D / 2 - p.x, 1.68, zPunggung - p.z); scene.add(L); lampuMalam.push(L);
      });
    }
    // lampu LED bawah kabinet (versi malam)
    if (s.atas) {
      const segmen = [[A / 2, 1.42, 0.35]];
      if (pakaiKiri) segmen.push([0.35, 1.42, (s.b + 0.6) / 2]);
      segmen.forEach(([x, y, z]) => { const L = new THREE.PointLight(0xffd29a, 0, 2.6, 1.4); L.position.set(x, y, z); scene.add(L); lampuMalam.push(L); });
    }
    ruang.add(isi);
    terapkanMalam();

    const pusat = new THREE.Vector3(A / 2, 0.95, Math.min(kedalaman, 3.4) / 2 + 0.2);
    const ukuran = Math.max(A, kedalaman);
    return { pusat, ukuran };
  }

  // ---- kamera ----
  let target = new THREE.Vector3(), jarakAwal = 6;
  function posisiAwal(info, instan) {
    jarakAwal = info.ukuran * 1.25 + 3.2;
    const arah = new THREE.Vector3(0.5, 0.48, 1).normalize();
    const pos = info.pusat.clone().addScaledVector(arah, jarakAwal);
    if (instan) { camera.position.copy(pos); controls.target.copy(info.pusat); }
    else { animasiKamera = { dari: camera.position.clone(), ke: pos, tDari: controls.target.clone(), tKe: info.pusat.clone(), t: 0 }; }
  }
  let animasiKamera = null, pertama = true, infoTerakhir = null, bentukTerakhir = null;

  // ---- malam ----
  let malam = false;
  function terapkanMalam() {
    hemi.intensity = malam ? 0.08 : 0.35;
    sun.intensity = malam ? 0.12 : 3.2;
    scene.environmentIntensity = malam ? 0.18 : 0.5;
    mat.led.emissiveIntensity = malam ? 3.2 : 0.15;
    mat.bohlam.emissiveIntensity = malam ? 4 : 0.3;
    lampuMalam.forEach(l => { l.intensity = malam ? 2.2 : 0; });
    wadah.parentElement.style.background = malam ? 'linear-gradient(#2a2622,#1c1916)' : '';
    perluRender = true;
  }
  const tombolMalam = document.getElementById('cfg-light');
  tombolMalam.addEventListener('click', () => { malam = !malam; tombolMalam.setAttribute('aria-pressed', malam); terapkanMalam(); });
  document.getElementById('cfg-reset').addEventListener('click', () => infoTerakhir && posisiAwal(infoTerakhir, false));

  // ---- ukuran & loop ----
  function ukur() {
    const w = wadah.clientWidth, h = wadah.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    perluRender = true;
  }
  new ResizeObserver(ukur).observe(wadah);

  let perluRender = true, terlihat = true, antrean = null;
  controls.addEventListener('change', () => { perluRender = true; });
  new IntersectionObserver(es => { terlihat = es[0].isIntersecting; }).observe(wadah);

  function loop() {
    requestAnimationFrame(loop);
    if (!terlihat || document.hidden) return;
    if (antrean) {
      const s = antrean; antrean = null;
      infoTerakhir = bangun(s);
      if (pertama) { posisiAwal(infoTerakhir, true); pertama = false; }
      else if (s.bentuk !== bentukTerakhir) posisiAwal(infoTerakhir, false);
      bentukTerakhir = s.bentuk;
      sun.target.position.copy(infoTerakhir.pusat);
      perluRender = true;
    }
    if (animasiKamera) {
      const a = animasiKamera; a.t = Math.min(1, a.t + 0.035);
      const e = 1 - Math.pow(1 - a.t, 3);
      camera.position.lerpVectors(a.dari, a.ke, e); controls.target.lerpVectors(a.tDari, a.tKe, e);
      if (a.t >= 1) animasiKamera = null;
      perluRender = true;
    }
    const berubah = controls.update();
    if (perluRender || berubah) { renderer.render(scene, camera); perluRender = false; }
  }
  ukur();
  loop();

  return { jadwalkan: s => { antrean = s; } };
}
