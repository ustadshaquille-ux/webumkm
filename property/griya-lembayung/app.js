// Griya Lembayung — maket 3D perumahan: pilih kavling, masuk ke rumah, tur ruangan ikut scroll.
import * as THREE from "./vendor/three.module.min.js";

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const WA = "628131880038";
const diam = matchMedia("(prefers-reduced-motion: reduce)").matches;
const hp = () => innerWidth <= 900;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const halus = (t) => t * t * t * (t * (t * 6 - 15) + 10);
const rentang = (p, a, b) => halus(clamp((p - a) / (b - a)));
const juta = (n) => (n >= 1000 ? `Rp ${(n / 1000).toLocaleString("id-ID", { maximumFractionDigits: 3 })} miliar` : `Rp ${n} juta`);
const rupiah = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");

// ---------------------------------------------------------------- data unit
// Satu daftar ini menggerakkan maket, panel, daftar unit, dan simulasi KPR.
const DALAM = 13, LEBAR = [9, 7, 7, 7, 7, 7, 7, 9];
const BARIS = [
  { k: "A", depan: -20, arah: -1, pola: "jtjttdtt" },
  { k: "B", depan: -13, arah: 1, pola: "tjjtdtjt" },
  { k: "C", depan: 13, arah: -1, pola: "ttjdtjtt" },
  { k: "D", depan: 20, arah: 1, pola: "jdttjttj" },
];
const STATUS = { t: "tersedia", d: "dipesan", j: "terjual" };
const NAMA_STATUS = { tersedia: "Tersedia", dipesan: "Dipesan", terjual: "Terjual" };
const UNIT = [];
for (const b of BARIS) {
  let x = -30;
  LEBAR.forEach((w, i) => {
    const hook = w > 7;
    UNIT.push({
      id: `${b.k}-${String(i + 1).padStart(2, "0")}`, baris: b.k, w, cx: x + w / 2, depan: b.depan, arah: b.arah,
      rot: b.arah === 1 ? 0 : Math.PI, status: STATUS[b.pola[i]], hook,
      harga: (hook ? 815 : 685) + (i >= 6 ? 10 : 0), lt: w * DALAM, lb: 45,
      tipe: hook ? "Tipe 45/117 hook" : "Tipe 45/91", hadap: b.arah === 1 ? "Utara" : "Selatan",
    });
    x += w;
  });
}
let pilih = UNIT.find((u) => u.id === "B-04");
let sorot = null;

// ---------------------------------------------------------------- isi tur
const RUANG = [
  null,
  { ruang: "Tampak atas", judul: "Atapnya kami angkat supaya Anda bisa melihat ke dalam.", spek: [] },
  { ruang: "Denah terbuka", judul: "45 m² untuk dua kamar tidur, ruang keluarga, dan dapur.", spek: [["Bangunan", "6 × 7,5 m"], ["Kamar tidur", "2"], ["Kamar mandi", "1"]] },
  { ruang: "Carport & taman depan", judul: "Satu mobil masuk, taman depan tetap ada.", spek: [["Carport", "3 × 4,5 m"], ["Taman", "3 × 4 m"], ["Kanopi", "Baja ringan"]] },
  { ruang: "Ruang tamu", judul: "Ruang tamu menyatu dengan ruang makan, jadi terasa lapang.", spek: [["Ukuran", "3 × 3,6 m"], ["Plafon", "2,8 m"], ["Lantai", "Granit 60 × 60"]] },
  { ruang: "Ruang makan & dapur", judul: "Dapur di belakang, dekat pintu ke area servis.", spek: [["Ukuran", "3 × 3,9 m"], ["Meja dapur", "Bentuk L"], ["Pintu belakang", "Ada"]] },
  { ruang: "Kamar utama", judul: "Kamar utama menghadap taman depan.", spek: [["Ukuran", "3 × 3,2 m"], ["Kasur", "Muat 160 cm"], ["Jendela", "1,7 m"]] },
  { ruang: "Kamar mandi", judul: "Kamar mandi di tengah, dekat dari kedua kamar.", spek: [["Ukuran", "1,6 × 1,6 m"], ["Kloset", "Duduk"], ["Shower", "Sekat kaca"]] },
  { ruang: "Kamar kedua", judul: "Untuk anak, tamu, atau ruang kerja.", spek: [["Ukuran", "3 × 2,7 m"], ["Kasur", "Muat 90 cm"], ["Jendela", "Ke belakang"]] },
  { ruang: "Seluruh denah", judul: "Semua ruang punya jendela atau bukaan, tidak ada sudut mati.", spek: [] },
  { ruang: "Sore hari", judul: "", spek: [], akhir: true },
];
const TITIK = [0, 0.13, 0.21, 0.3, 0.4, 0.5, 0.6, 0.69, 0.78, 0.87, 0.955];

// ---------------------------------------------------------------- UI yang tidak butuh 3D
const el = {
  panggung: $("#atas"), lekat: $("#lekat"), awal: $("#lapis-awal"), tur: $("#lapis-tur"), kepala: $("#kepala"),
  kartu: $("#kartu"), rel: $("#rel"), garis: $("#garis"), garisL: $("#garis-l"), garisT: $("#garis-t"), panel: $("#panel"),
};

function isiPanel(u) {
  $("#p-no").textContent = u.id;
  const s = $("#p-status"); s.dataset.s = u.status; s.textContent = NAMA_STATUS[u.status];
  $("#p-tipe").textContent = u.tipe;
  $("#p-lt").textContent = `${u.lt} m²`;
  $("#p-lb").textContent = `${u.lb} m²`;
  $("#p-hadap").textContent = u.hadap;
  $("#p-harga").textContent = juta(u.harga);
  $("#p-masuk").textContent = u.status === "terjual" ? "Lihat rumah ini" : "Masuk ke rumah ini";
}

function tautanWa() {
  const u = pilih;
  const pesan = {
    survei: "Halo, saya mau jadwalkan survei ke Griya Lembayung.",
    unit: `Halo, saya tertarik unit ${u.id} (${u.tipe}, ${juta(u.harga)}). Bisa jadwalkan survei?`,
    kpr: pesanKpr(),
    pitch: "Halo Baqil, saya lihat demo Griya Lembayung. Saya mau siteplan interaktif seperti itu untuk proyek saya.",
  };
  $$("[data-wa]").forEach((a) => (a.href = `https://wa.me/${WA}?text=${encodeURIComponent(pesan[a.dataset.wa] || pesan.survei)}`));
}

// daftar unit (juga jadi cadangan kalau 3D tidak jalan)
function bangunDaftar() {
  const ket = { A: "Sisi utara", B: "Tengah, hadap utara", C: "Tengah, hadap selatan", D: "Sisi selatan" };
  $("#blok-daftar").innerHTML = BARIS.map((b) => `<div class="blok"><h3>Blok ${b.k}<small>${ket[b.k]}</small></h3><ul>${UNIT.filter((u) => u.baris === b.k)
    .map((u) => `<li><button class="kav" type="button" data-id="${u.id}" data-s="${u.status}" aria-label="Unit ${u.id}, ${NAMA_STATUS[u.status]}, ${juta(u.harga)}"><b>${u.id}</b><span>${u.status === "terjual" ? "Terjual" : juta(u.harga).replace("Rp ", "")}</span></button></li>`).join("")}</ul></div>`).join("");
  $("#blok-daftar").addEventListener("click", (e) => {
    const b = e.target.closest(".kav"); if (!b) return;
    pilihUnit(UNIT.find((u) => u.id === b.dataset.id));
    gulirKe(0, 1400);
  });
}

// simulasi KPR
const kpr = { unit: $("#kpr-unit"), dp: $("#kpr-dp"), tenor: $("#kpr-tenor"), bunga: $("#kpr-bunga") };
let hitungan = null;
function bangunKpr() {
  kpr.unit.innerHTML = UNIT.filter((u) => u.status !== "terjual").map((u) => `<option value="${u.id}">${u.id} · ${u.tipe} · ${juta(u.harga)}</option>`).join("");
  for (const i of [kpr.unit, kpr.dp, kpr.tenor, kpr.bunga]) i.addEventListener("input", () => { hitungKpr(); tautanWa(); });
}
function hitungKpr() {
  const u = UNIT.find((x) => x.id === kpr.unit.value) || UNIT.find((x) => x.status !== "terjual");
  const harga = u.harga * 1e6, dp = +kpr.dp.value / 100, n = +kpr.tenor.value * 12, r = +kpr.bunga.value / 100 / 12;
  const pokok = harga * (1 - dp), cicilan = (pokok * r) / (1 - Math.pow(1 + r, -n));
  hitungan = { u, dp: +kpr.dp.value, tenor: +kpr.tenor.value, bunga: +kpr.bunga.value, cicilan, um: harga * dp };
  $("#o-dp").textContent = `${kpr.dp.value}%`;
  $("#o-tenor").textContent = `${kpr.tenor.value} tahun`;
  $("#o-bunga").textContent = `${(+kpr.bunga.value).toLocaleString("id-ID")}%`;
  $("#kpr-cicilan").textContent = rupiah(cicilan);
  $("#kpr-harga").textContent = rupiah(harga);
  $("#kpr-um").textContent = rupiah(harga * dp);
  $("#kpr-pokok").textContent = rupiah(pokok);
}
function pesanKpr() {
  if (!hitungan) return "";
  const h = hitungan;
  return `Halo, saya coba simulasi KPR unit ${h.u.id} (${juta(h.u.harga)}): uang muka ${h.dp}% (${rupiah(h.um)}), tenor ${h.tenor} tahun, bunga ${h.bunga.toLocaleString("id-ID")}%. Cicilan sekitar ${rupiah(h.cicilan)} per bulan. Mohon info lebih lanjut.`;
}

// denah 2D dari ukuran ruang yang sama dengan maket
function bangunDenah() {
  const S = 62, PX = 30, PY = 24, FSD = 4.5, W = 6, D = 7.5;
  const R = [["Ruang tamu", 0, 0, 3, 3.6], ["Ruang makan", 0, 3.6, 3, 1.7], ["Dapur", 0, 5.3, 3, 2.2], ["Kamar utama", 3, 0, 3, 3.2], ["Lorong", 3, 3.2, 1.4, 1.6], ["K. mandi", 4.4, 3.2, 1.6, 1.6], ["Kamar 2", 3, 4.8, 3, 2.7]];
  const X = (x) => PX + x * S, Y = (z) => PY + (D - z) * S; // depan rumah di bawah
  const garis = (x1, z1, x2, z2, w = 2.4) => `<line x1="${X(x1)}" y1="${Y(z1)}" x2="${X(x2)}" y2="${Y(z2)}" stroke="#131B2C" stroke-width="${w}" stroke-linecap="square"/>`;
  let s = `<svg viewBox="0 0 ${PX * 2 + W * S} ${PY * 2 + (D + FSD) * S}" role="img" aria-label="Denah rumah tipe 45: ruang tamu, ruang makan, dapur, dua kamar tidur, satu kamar mandi, carport dan taman depan">`;
  s += `<rect x="${X(0)}" y="${Y(0)}" width="${3 * S}" height="${FSD * S}" fill="rgba(19,27,44,.05)"/><rect x="${X(3)}" y="${Y(0)}" width="${3 * S}" height="${FSD * S}" fill="rgba(36,64,214,.07)"/>`;
  s += `<text x="${X(1.5)}" y="${Y(-2.2)}" text-anchor="middle" font-size="15" font-weight="600">Carport</text><text x="${X(1.5)}" y="${Y(-2.2) + 19}" text-anchor="middle" font-size="12.5" opacity=".6">3 × 4,5</text>`;
  s += `<text x="${X(4.5)}" y="${Y(-2.2)}" text-anchor="middle" font-size="15" font-weight="600">Taman</text><text x="${X(4.5)}" y="${Y(-2.2) + 19}" text-anchor="middle" font-size="12.5" opacity=".6">3 × 4</text>`;
  s += `<rect x="${X(0)}" y="${Y(D)}" width="${W * S}" height="${D * S}" fill="#fff"/>`;
  for (const [n, x, z, w, d] of R) {
    const kecil = w < 2 || d < 2;
    s += `<text x="${X(x + w / 2)}" y="${Y(z + d / 2) - 2}" text-anchor="middle" font-size="${kecil ? 12.5 : 15}" font-weight="600">${n}</text>`;
    if (n !== "Lorong") s += `<text x="${X(x + w / 2)}" y="${Y(z + d / 2) + 16}" text-anchor="middle" font-size="12.5" opacity=".6">${String(w).replace(".", ",")} × ${String(d).replace(".", ",")}</text>`;
  }
  // dinding luar (dengan celah pintu) lalu sekat dalam
  s += garis(0, 0, 0.45, 0, 4) + garis(1.35, 0, 6, 0, 4) + garis(0, D, 0.45, D, 4) + garis(1.25, D, 6, D, 4) + garis(0, 0, 0, D, 4) + garis(6, 0, 6, D, 4);
  s += garis(3, 0, 3, 3.35) + garis(3, 4.65, 3, D) + garis(3, 3.2, 3.2, 3.2) + garis(4, 3.2, 6, 3.2) + garis(3, 4.8, 3.2, 4.8) + garis(4, 4.8, 6, 4.8) + garis(4.4, 3.2, 4.4, 3.6) + garis(4.4, 4.4, 4.4, 4.8);
  s += `<line x1="${X(0)}" y1="${Y(3.6)}" x2="${X(3)}" y2="${Y(3.6)}" stroke="#131B2C" stroke-width="1" stroke-dasharray="4 6" opacity=".45"/><line x1="${X(0)}" y1="${Y(5.3)}" x2="${X(3)}" y2="${Y(5.3)}" stroke="#131B2C" stroke-width="1" stroke-dasharray="4 6" opacity=".45"/>`;
  // jendela = garis biru
  const jen = (x1, z1, x2, z2) => `<line x1="${X(x1)}" y1="${Y(z1)}" x2="${X(x2)}" y2="${Y(z2)}" stroke="#2440D6" stroke-width="5"/>`;
  s += jen(1.75, 0, 2.75, 0) + jen(3.7, 0, 5.4, 0) + jen(1.7, D, 2.7, D) + jen(3.9, D, 5.4, D);
  s += `<text x="${X(3)}" y="${Y(-FSD) + 20}" text-anchor="middle" font-size="12.5" opacity=".6">Jalan</text></svg>`;
  $("#denah").innerHTML = s;
}

// gulir halus buatan sendiri (dipakai saat "masuk ke rumah")
let batalGulir = () => {};
function gulirKe(y, dur = 2400) {
  batalGulir();
  const html = document.documentElement;
  if (diam) { html.style.scrollBehavior = "auto"; scrollTo(0, y); html.style.scrollBehavior = ""; return; }
  const y0 = scrollY, t0 = performance.now(); let batal = false;
  html.style.scrollBehavior = "auto";
  batalGulir = () => { batal = true; html.style.scrollBehavior = ""; };
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  (function f(now) {
    if (batal) return;
    const t = clamp((now - t0) / dur);
    scrollTo(0, y0 + (y - y0) * ease(t));
    if (t < 1) requestAnimationFrame(f); else batalGulir();
  })(t0);
}
for (const ev of ["wheel", "touchstart", "keydown"]) addEventListener(ev, () => batalGulir(), { passive: true });

const jarakTur = () => el.panggung.offsetHeight - el.lekat.offsetHeight;
const progres = () => clamp((scrollY - el.panggung.offsetTop) / Math.max(1, jarakTur()));
const masuk = () => gulirKe(el.panggung.offsetTop + jarakTur() * 0.21, 2600);

let pindahRumah = () => {};
function pilihUnit(u) {
  if (!u) return;
  pilih = u;
  pindahRumah();
  isiPanel(u);
  $("#k-no").textContent = u.id;
  $$(".kav").forEach((b) => b.classList.toggle("pilih", b.dataset.id === u.id));
  if (u.status !== "terjual") { kpr.unit.value = u.id; hitungKpr(); }
  kartuKe(idxKartu, true);
  tautanWa();
}

// kartu tur
let idxKartu = -1, tKartu = 0;
function kartuKe(i, paksa = false) {
  if (i === idxKartu && !paksa) return;
  idxKartu = i;
  const r = RUANG[i]; if (!r) return;
  const isi = () => {
    $("#k-ruang").textContent = r.akhir ? `${pilih.id} · ${pilih.tipe}` : r.ruang;
    $("#k-judul").textContent = r.akhir ? (pilih.status === "terjual" ? `${pilih.id} sudah terjual. Masih ada unit lain dengan denah yang sama.` : `Jadikan ${pilih.id} milik Anda, ${juta(pilih.harga)}.`) : r.judul;
    $("#k-spek").innerHTML = r.spek.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join("");
    $("#k-aksi").hidden = !r.akhir;
    el.kartu.classList.remove("ganti");
  };
  clearTimeout(tKartu);
  if (paksa || diam) return isi();
  el.kartu.classList.add("ganti");
  tKartu = setTimeout(isi, 260);
}
el.rel.innerHTML = RUANG.slice(2).map((r) => `<li><i></i><span>${r.ruang}</span></li>`).join("");
const relLi = [...el.rel.children];

function perbaruiUi(p) {
  const diPanggung = scrollY < el.panggung.offsetTop + jarakTur() + 4;
  el.awal.classList.toggle("sembunyi", p > 0.025);
  el.tur.classList.toggle("tampil", p > 0.1 && diPanggung);
  el.tur.setAttribute("aria-hidden", p > 0.1 ? "false" : "true");
  el.kepala.classList.toggle("padat", !diPanggung);
  // kartu = titik terdekat
  let i = 1;
  for (let k = 1; k < TITIK.length; k++) if (p >= (TITIK[k - 1] + TITIK[k]) / 2) i = k;
  kartuKe(Math.max(1, i));
  relLi.forEach((li, n) => { li.classList.toggle("kini", n + 2 === i); li.classList.toggle("lewat", n + 2 < i); });
}

// ---------------------------------------------------------------- mulai UI
bangunDaftar(); bangunKpr(); bangunDenah();
$("#st-tersedia").textContent = `${UNIT.filter((u) => u.status === "tersedia").length} dari ${UNIT.length}`;
$("#st-harga").textContent = juta(Math.min(...UNIT.filter((u) => u.status !== "terjual").map((u) => u.harga)));
$("#p-masuk").addEventListener("click", masuk);
$("#kembali").addEventListener("click", () => gulirKe(0, 1800));
kpr.unit.value = pilih.id; hitungKpr();
pilihUnit(pilih);

// ---------------------------------------------------------------- 3D
let renderer = null;
try {
  renderer = new THREE.WebGLRenderer({ canvas: $("#maket"), antialias: true, powerPreference: "high-performance" });
} catch (e) { document.documentElement.classList.add("tanpa-gl"); }

if (!renderer) {
  addEventListener("scroll", () => el.kepala.classList.toggle("padat", scrollY > 40), { passive: true });
} else {
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const BG = new THREE.Color("#ECEEE9"), BGM = new THREE.Color("#1B2236");
  const scene = new THREE.Scene();
  scene.background = BG.clone();
  scene.fog = new THREE.Fog(scene.background, 200, 500);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.5, 900);
  const HEMI0 = 1.75, SUN0 = 1.55;

  const hemi = new THREE.HemisphereLight(0xffffff, 0xeceee6, HEMI0);
  const sun = new THREE.DirectionalLight(0xfff3e2, SUN0);
  sun.castShadow = true;
  sun.shadow.mapSize.set(hp() ? 1024 : 2048, hp() ? 1024 : 2048);
  sun.shadow.camera.near = 1; sun.shadow.camera.far = 420;
  scene.add(hemi, sun, sun.target);
  const ARAH_SUN = new THREE.Vector3(-0.62, 1, 0.42).normalize();
  const lampuDalam = new THREE.PointLight(0xffc27a, 0, 16, 1.6);

  // --- bahan
  const mat = (hex, o = {}) => new THREE.MeshStandardMaterial({ color: hex, roughness: 0.92, metalness: 0, ...o });
  const GEO = new THREE.BoxGeometry(1, 1, 1);
  const kotak = (par, m, w, h, d, x, y, z, bayang = true) => {
    const k = new THREE.Mesh(GEO, m); k.scale.set(w, h, d); k.position.set(x, y, z); k.castShadow = bayang; k.receiveShadow = true; par.add(k); return k;
  };
  const prisma = (W, D, H) => {
    const s = new THREE.Shape(); s.moveTo(-D / 2, 0); s.lineTo(D / 2, 0); s.lineTo(0, H); s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: W, bevelEnabled: false }); g.translate(0, 0, -W / 2); g.rotateY(Math.PI / 2); return g;
  };
  const M = {
    jalan: mat("#D3D6D0"), tersedia: mat("#FAFAF7"), dipesan: mat("#F2E0C2"), terjual: mat("#BFC3BE"),
    rumah: mat("#F6F5F1"), rumahJual: mat("#D6D8D3"), atap: mat("#E3E1DB"), atapJual: mat("#C4C7C2"),
    pohon: mat("#D5DDCC"), batang: mat("#CFCBC2"), taman: mat("#DFE6D6"), air: mat("#C6D6E6", { roughness: 0.3 }),
    sorot: new THREE.MeshBasicMaterial({ color: "#2440D6" }), hover: new THREE.MeshBasicMaterial({ color: "#131B2C" }),
    jendela: mat("#D8DAD5"), jendelaHuni: mat("#D8DAD5", { emissive: "#FFB866", emissiveIntensity: 0 }),
    lampuJalan: mat("#E9E9E4", { emissive: "#FFD9A0", emissiveIntensity: 0 }),
  };

  // --- tapak
  const tapak = new THREE.Group(); scene.add(tapak);
  const lantaiBayang = new THREE.Mesh(new THREE.PlaneGeometry(1600, 1600), new THREE.ShadowMaterial({ opacity: 0.13 }));
  lantaiBayang.rotation.x = -Math.PI / 2; lantaiBayang.position.y = -0.01; lantaiBayang.receiveShadow = true; tapak.add(lantaiBayang);
  const jalan = (x0, x1, z0, z1) => kotak(tapak, M.jalan, x1 - x0, 0.05, z1 - z0, (x0 + x1) / 2, 0.025, (z0 + z1) / 2, false);
  jalan(-37, 31, -20, -13); jalan(-37, 31, 13, 20); jalan(-37, -30, -13, 13); jalan(-54, -37, -3.5, 3.5);
  // taman di sisi timur
  kotak(tapak, M.taman, 18, 0.1, 66, 40, 0.05, 0, false);
  const kolam = new THREE.Mesh(new THREE.CylinderGeometry(4.6, 4.6, 0.08, 40), M.air); kolam.position.set(40, 0.12, -6); kolam.scale.z = 1.5; kolam.receiveShadow = true; tapak.add(kolam);
  const gazebo = new THREE.Group(); gazebo.position.set(40, 0, 13); tapak.add(gazebo);
  for (const [x, z] of [[-1.6, -1.6], [1.6, -1.6], [-1.6, 1.6], [1.6, 1.6]]) kotak(gazebo, M.rumah, 0.18, 2.4, 0.18, x, 1.3, z);
  kotak(gazebo, M.rumah, 4, 0.14, 4, 0, 0.17, 0);
  const atapGz = new THREE.Mesh(new THREE.ConeGeometry(3.3, 1.4, 4), M.atap); atapGz.position.y = 3.2; atapGz.rotation.y = Math.PI / 4; atapGz.castShadow = true; gazebo.add(atapGz);
  // gerbang
  kotak(tapak, M.rumah, 1.2, 4.4, 1.2, -52, 2.2, -4.6); kotak(tapak, M.rumah, 1.2, 4.4, 1.2, -52, 2.2, 4.6); kotak(tapak, M.atap, 1.5, 0.5, 11, -52, 4.6, 0);
  kotak(tapak, M.rumah, 3, 2.6, 3, -47, 1.3, 7.2); // pos jaga

  // pohon (instanced)
  const acak = (() => { let s = 7; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();
  const tPohon = [];
  for (let z = -30; z <= 30; z += 6) tPohon.push([33 + acak() * 2, z + acak() * 2, 1 + acak() * 0.5]);
  for (let i = 0; i < 16; i++) tPohon.push([35 + acak() * 12, -31 + acak() * 62, 0.9 + acak() * 0.9]);
  for (let x = -50; x <= -39; x += 5.5) { tPohon.push([x, -5.6, 1]); tPohon.push([x, 5.6, 1]); }
  for (let z = -18; z <= 18; z += 7.2) tPohon.push([-39.2, z, 0.9 + acak() * 0.4]);
  const tOk = tPohon.filter(([x, z]) => !(Math.hypot(x - 40, (z + 6) / 1.5) < 5.6) && !(Math.abs(x - 40) < 3.4 && Math.abs(z - 13) < 3.4) && !(x < -37 && Math.abs(z) < 4.2));
  const tajuk = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1.5, 1), M.pohon, tOk.length);
  const batang = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.12, 0.16, 1.8, 6), M.batang, tOk.length);
  const dm = new THREE.Object3D();
  tOk.forEach(([x, z, s], i) => {
    dm.position.set(x, 1.6 + 1.3 * s, z); dm.scale.set(s, s * 1.12, s); dm.rotation.y = acak() * 6; dm.updateMatrix(); tajuk.setMatrixAt(i, dm.matrix);
    dm.position.set(x, 0.9, z); dm.scale.set(1, 1, 1); dm.updateMatrix(); batang.setMatrixAt(i, dm.matrix);
  });
  tajuk.castShadow = batang.castShadow = true; tajuk.receiveShadow = true; tapak.add(tajuk, batang);
  // lampu jalan
  for (const z of [-16.5, 16.5]) for (let x = -26; x <= 26; x += 13) { kotak(tapak, M.batang, 0.1, 3.4, 0.1, x, 1.7, z + (z < 0 ? 3.1 : -3.1)); kotak(tapak, M.lampuJalan, 0.34, 0.16, 0.34, x, 3.45, z + (z < 0 ? 3.1 : -3.1), false); }

  // --- kavling + rumah sederhana
  const FS = 4.5; // jarak muka bangunan dari jalan
  const GEO_ATAP = prisma(6.7, 8.3, 1.55);
  const pilihan = [];
  for (const u of UNIT) {
    const g = new THREE.Group(); g.position.set(u.cx, 0, u.depan); g.rotation.y = u.rot; tapak.add(g); u.g = g;
    kotak(g, M[u.status], u.w - 0.3, 0.14, DALAM - 0.3, 0, 0.07, DALAM / 2, false);
    const r = new THREE.Group(); g.add(r); u.rumah = r;
    const jual = u.status === "terjual";
    kotak(r, jual ? M.rumahJual : M.rumah, 6, 2.8, 7.5, 0, 1.54, FS + 3.75);
    const a = new THREE.Mesh(GEO_ATAP, jual ? M.atapJual : M.atap); a.position.set(0, 2.94, FS + 3.75); a.castShadow = a.receiveShadow = true; r.add(a);
    kotak(r, jual ? M.atapJual : M.atap, 3, 0.1, 4.3, -1.5, 2.55, FS - 2.2);
    kotak(r, jual ? M.jendelaHuni : M.jendela, 1.7, 1.1, 0.06, 1.55, 1.6, FS - 0.02, false);
    kotak(r, jual ? M.jendelaHuni : M.jendela, 1, 1.1, 0.06, -0.75, 1.6, FS - 0.02, false);
    const p = new THREE.Mesh(GEO, new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false }));
    p.scale.set(u.w, 5, DALAM); p.position.set(0, 2.5, DALAM / 2); p.userData.u = u; g.add(p); pilihan.push(p);
    u.angkat = 0;
  }
  const bingkai = (m) => { const b = new THREE.Mesh(GEO, m); b.scale.set(1, 0.08, DALAM + 0.34); b.visible = false; tapak.add(b); return b; };
  const bPilih = bingkai(M.sorot), bHover = bingkai(M.hover);
  const taruhBingkai = (b, u) => { if (!u) { b.visible = false; return; } b.visible = true; b.scale.x = u.w + 0.34; b.position.set(u.cx, 0.04, u.depan + u.arah * DALAM / 2); };

  // --- rumah rinci (yang dimasuki): bagian bawah tetap, bagian atas bisa diangkat seperti tutup maket
  const rinci = new THREE.Group(), bawah = new THREE.Group(), atas = new THREE.Group(); rinci.add(bawah, atas); scene.add(rinci);
  const warna = []; // bahan yang berubah dari putih maket -> warna asli
  const CLAY = new THREE.Color("#F4F3EF");
  const W = (asli, { clay = "#F4F3EF", ...o } = {}) => { const m = mat("#F4F3EF", o); warna.push({ m, clay: new THREE.Color(clay), asli: new THREE.Color(asli) }); return m; };
  const R = {
    dinding: W("#F3F1EB"), lantai: W("#DCD7CC", { clay: "#EDECE7" }), lantaiKm: W("#B9CFD3", { clay: "#E8E9E6" }), paving: W("#BEC1BB", { clay: "#E6E7E2" }),
    rumput: W("#86A870", { clay: "#DFE6D6" }), kayu: W("#B58A5C"), kayuTua: W("#6E5540"), sofa: W("#5C6A8A"), bantal: W("#E3BE5C"), karpet: W("#D9DEE9", { clay: "#EFEFEA" }),
    putih: W("#FBFAF7"), gelap: W("#3A4256"), seprai: W("#F1EFEA"), selimut: W("#7F92BD"), selimut2: W("#D98C6A"), daun: W("#4E7F58"), pot: W("#E7E3DA"),
    kabinet: W("#4A5874"), mejaDapur: W("#ECE9E2"), logam: W("#B9BEC6", { roughness: 0.45, metalness: 0.4 }), mobil: W("#3450B4", { roughness: 0.4, metalness: 0.2, clay: "#EDECE8" }),
    ban: W("#23262D"), kaca: W("#BFD8E6", { transparent: true, opacity: 0.38, roughness: 0.1, emissive: "#FFB866", emissiveIntensity: 0 }),
  };
  const A = { // bagian atas: perlu transparan supaya bisa memudar saat diangkat
    dinding: W("#F3F1EB", { transparent: true }), atap: W("#5C6573", { transparent: true, clay: "#E3E1DB" }), kanopi: W("#49505C", { transparent: true, clay: "#E3E1DB" }),
    kaca: W("#BFD8E6", { transparent: true, opacity: 0.38, roughness: 0.1, emissive: "#FFB866", emissiveIntensity: 0 }), aksen: W("#8A6A4A", { transparent: true }),
  };
  const bk = (par, m, w, h, d, bx, y, bz, bayang = true) => kotak(par, m, w, h, d, bx - 3, y, bz + FS, bayang);
  const silinder = (par, m, r, h, bx, y, bz, seg = 20) => { const s = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), m); s.position.set(bx - 3, y, bz + FS); s.castShadow = s.receiveShadow = true; par.add(s); return s; };
  const TW = 0.12, H1 = 1.15, H2 = 2.8, LT = 0.14; // tebal dinding, tinggi potongan, tinggi penuh, tinggi lantai
  function dinding(sumbu, c, a0, a1, bukaan = []) {
    const taruh = (par, m, s, e, y0, y1, bayang = true) => {
      if (e - s < 0.01 || y1 - y0 < 0.01) return;
      const L = e - s, t = (s + e) / 2, h = y1 - y0, y = LT + (y0 + y1) / 2;
      return sumbu === "x" ? bk(par, m, L, h, TW, t, y, c, bayang) : bk(par, m, TW, h, L, c, y, t, bayang);
    };
    let pos = a0;
    for (const [s, e, jenis] of [...bukaan].sort((p, q) => p[0] - q[0])) {
      taruh(bawah, R.dinding, pos, s, 0, H1); taruh(atas, A.dinding, pos, s, H1, H2);
      if (jenis === "jendela") { taruh(bawah, R.dinding, s, e, 0, 0.9); taruh(bawah, R.kaca, s, e, 0.9, H1, false); taruh(atas, A.kaca, s, e, H1, 2.1, false); }
      taruh(atas, A.dinding, s, e, 2.1, H2); pos = e;
    }
    taruh(bawah, R.dinding, pos, a1, 0, H1); taruh(atas, A.dinding, pos, a1, H1, H2);
  }
  // lantai & halaman
  bk(bawah, R.lantai, 6, LT, 7.5, 3, LT / 2, 3.75, false);
  bk(bawah, R.lantaiKm, 1.6, 0.02, 1.6, 5.2, LT + 0.01, 4, false);
  bk(bawah, R.paving, 3, 0.1, 4.3, 1.5, 0.19, -2.25, false);          // carport
  bk(bawah, R.rumput, 2.9, 0.1, 4.1, 4.5, 0.19, -2.35, false);        // taman depan
  bk(bawah, R.paving, 0.5, 0.11, 0.5, 3.55, 0.2, -1.2, false); bk(bawah, R.paving, 0.5, 0.11, 0.5, 3.55, 0.2, -2.3, false); bk(bawah, R.paving, 0.5, 0.11, 0.5, 3.55, 0.2, -3.4, false);
  bk(bawah, R.rumput, 6, 0.1, 0.9, 3, 0.19, 8, false);                // taman belakang
  bk(bawah, R.dinding, 2.9, 0.75, 0.12, 4.5, 0.5, -4.35);              // pagar depan
  bk(bawah, R.dinding, 6.7, 1.5, 0.12, 3, 0.85, 8.45);                 // tembok belakang
  // dinding
  dinding("x", 0, -0.06, 6.06, [[0.45, 1.35, "pintu"], [1.75, 2.75, "jendela"], [3.7, 5.4, "jendela"]]);
  dinding("x", 7.5, -0.06, 6.06, [[0.45, 1.25, "pintu"], [1.7, 2.7, "jendela"], [3.9, 5.4, "jendela"]]);
  dinding("z", 0, 0, 7.5); dinding("z", 6, 0, 7.5);
  dinding("z", 3, 0, 7.5, [[3.35, 4.65, "pintu"]]);
  dinding("x", 3.2, 3, 6, [[3.2, 4, "pintu"]]);
  dinding("x", 4.8, 3, 6, [[3.2, 4, "pintu"]]);
  dinding("z", 4.4, 3.2, 4.8, [[3.6, 4.4, "pintu"]]);
  // atap, kanopi, aksen fasad
  const atapR = new THREE.Mesh(prisma(6.7, 8.3, 1.55), A.atap); atapR.position.set(0, LT + H2, FS + 3.75); atapR.castShadow = atapR.receiveShadow = true; atas.add(atapR);
  bk(atas, A.kanopi, 3.1, 0.08, 4.3, 1.5, 2.6, -2.2); bk(atas, A.kanopi, 0.1, 2.5, 0.1, 0.12, 1.35, -4.2); bk(atas, A.kanopi, 0.1, 2.5, 0.1, 2.9, 1.35, -4.2);
  bk(atas, A.aksen, 0.9, H2 - H1, 0.05, 0.9, LT + (H1 + H2) / 2, -0.09, false);
  bk(bawah, R.kayu, 0.86, H1 - 0.02, 0.05, 0.9, LT + H1 / 2, -0.02, false); // daun pintu depan
  // ruang tamu
  const y0 = LT;
  bk(bawah, R.karpet, 1.7, 0.02, 2.3, 1.65, y0 + 0.01, 1.9, false);
  bk(bawah, R.sofa, 0.85, 0.4, 2.1, 0.62, y0 + 0.2, 1.9); bk(bawah, R.sofa, 0.2, 0.78, 2.1, 0.24, y0 + 0.39, 1.9); bk(bawah, R.sofa, 0.85, 0.56, 0.18, 0.62, y0 + 0.28, 0.86); bk(bawah, R.sofa, 0.85, 0.56, 0.18, 0.62, y0 + 0.28, 2.94);
  bk(bawah, R.bantal, 0.16, 0.34, 0.4, 0.44, y0 + 0.6, 1.3); bk(bawah, R.bantal, 0.16, 0.34, 0.4, 0.44, y0 + 0.6, 2.5);
  silinder(bawah, R.kayu, 0.38, 0.05, 1.7, y0 + 0.36, 1.9); silinder(bawah, R.gelap, 0.04, 0.34, 1.7, y0 + 0.17, 1.9, 8);
  bk(bawah, R.kayu, 0.36, 0.42, 1.7, 2.74, y0 + 0.21, 1.9); bk(bawah, R.gelap, 0.05, 0.62, 1.15, 2.86, y0 + 0.86, 1.9);
  const tanaman = (bx, bz, s = 1) => { silinder(bawah, R.pot, 0.17 * s, 0.3 * s, bx, y0 + 0.15 * s, bz, 12); const d = new THREE.Mesh(new THREE.IcosahedronGeometry(0.34 * s, 1), R.daun); d.position.set(bx - 3, y0 + 0.62 * s, bz + FS); d.scale.y = 1.35; d.castShadow = true; bawah.add(d); };
  tanaman(0.34, 3.3); tanaman(2.7, 0.36, 0.8);
  bk(bawah, R.kayu, 0.3, 0.5, 0.8, 1.55, y0 + 0.25, 0.26); // rak sepatu dekat pintu
  // ruang makan
  bk(bawah, R.kayu, 0.85, 0.05, 1.35, 1.35, y0 + 0.74, 4.45);
  for (const [dx, dz] of [[-0.34, -0.58], [0.34, -0.58], [-0.34, 0.58], [0.34, 0.58]]) bk(bawah, R.kayu, 0.06, 0.72, 0.06, 1.35 + dx, y0 + 0.36, 4.45 + dz);
  for (const [dx, dz] of [[-0.68, -0.32], [-0.68, 0.32], [0.68, -0.32], [0.68, 0.32]]) { bk(bawah, R.putih, 0.4, 0.05, 0.4, 1.35 + dx, y0 + 0.45, 4.45 + dz); bk(bawah, R.putih, 0.05, 0.42, 0.4, 1.35 + dx + Math.sign(dx) * 0.19, y0 + 0.68, 4.45 + dz); bk(bawah, R.gelap, 0.3, 0.44, 0.3, 1.35 + dx, y0 + 0.22, 4.45 + dz); }
  // dapur
  bk(bawah, R.kabinet, 1.55, 0.84, 0.6, 2.16, y0 + 0.42, 7.13); bk(bawah, R.mejaDapur, 1.6, 0.05, 0.64, 2.16, y0 + 0.865, 7.11);
  bk(bawah, R.kabinet, 0.6, 0.84, 1.3, 2.64, y0 + 0.42, 6.18); bk(bawah, R.mejaDapur, 0.64, 0.05, 1.34, 2.62, y0 + 0.865, 6.18);
  bk(bawah, R.gelap, 0.44, 0.02, 0.5, 2.62, y0 + 0.9, 6.05, false); bk(bawah, R.logam, 0.5, 0.02, 0.38, 2.05, y0 + 0.9, 7.12, false);
  bk(bawah, R.logam, 0.62, 1.7, 0.62, 2.63, y0 + 0.85, 5.14);
  // kamar utama
  bk(bawah, R.kayuTua, 2.05, 0.26, 1.66, 4.9, y0 + 0.13, 1.55); bk(bawah, R.seprai, 2, 0.2, 1.6, 4.9, y0 + 0.36, 1.55); bk(bawah, R.selimut, 1.25, 0.06, 1.64, 4.5, y0 + 0.48, 1.55);
  bk(bawah, R.putih, 0.36, 0.12, 0.6, 5.62, y0 + 0.52, 1.18); bk(bawah, R.putih, 0.36, 0.12, 0.6, 5.62, y0 + 0.52, 1.92); bk(bawah, R.kayuTua, 0.08, 0.95, 1.8, 5.9, y0 + 0.47, 1.55);
  bk(bawah, R.kayu, 0.4, 0.42, 0.4, 5.72, y0 + 0.21, 0.42); bk(bawah, R.kayu, 0.4, 0.42, 0.4, 5.72, y0 + 0.21, 2.68);
  bk(bawah, R.putih, 0.52, 2, 1.7, 3.36, y0 + 1, 1.1);
  // kamar mandi
  bk(bawah, R.putih, 0.4, 0.4, 0.56, 5.66, y0 + 0.2, 3.62); bk(bawah, R.putih, 0.4, 0.34, 0.16, 5.66, y0 + 0.56, 3.36);
  bk(bawah, R.kayu, 0.56, 0.5, 0.4, 4.78, y0 + 0.55, 3.46); bk(bawah, R.putih, 0.5, 0.06, 0.36, 4.78, y0 + 0.83, 3.46);
  bk(bawah, R.kaca, 0.03, 1.05, 0.8, 5.1, y0 + 0.55, 4.36, false); bk(bawah, R.logam, 0.06, 1.4, 0.06, 5.86, y0 + 0.7, 4.66);
  // kamar kedua
  bk(bawah, R.kayu, 0.95, 0.24, 1.95, 5.48, y0 + 0.12, 6.1); bk(bawah, R.seprai, 0.9, 0.18, 1.9, 5.48, y0 + 0.33, 6.1); bk(bawah, R.selimut2, 0.94, 0.06, 1.1, 5.48, y0 + 0.44, 6.45); bk(bawah, R.putih, 0.6, 0.12, 0.34, 5.48, y0 + 0.48, 5.4);
  bk(bawah, R.kayu, 1.2, 0.05, 0.55, 3.8, y0 + 0.74, 7.14); bk(bawah, R.kayu, 0.05, 0.72, 0.5, 3.25, y0 + 0.36, 7.14); bk(bawah, R.kayu, 0.05, 0.72, 0.5, 4.36, y0 + 0.36, 7.14);
  bk(bawah, R.gelap, 0.42, 0.46, 0.42, 3.8, y0 + 0.23, 6.62); bk(bawah, R.putih, 0.3, 1.6, 0.9, 3.24, y0 + 0.8, 5.4);
  // mobil di carport
  const mobil = new THREE.Group(); mobil.position.set(-1.5, 0.24, FS - 2.25); bawah.add(mobil);
  kotak(mobil, R.mobil, 1.72, 0.52, 3.9, 0, 0.56, 0); kotak(mobil, R.mobil, 1.56, 0.5, 2.05, 0, 1.05, 0.2); kotak(mobil, R.kaca, 1.58, 0.36, 1.6, 0, 1.06, 0.2, false);
  for (const [x, z] of [[-0.82, -1.25], [0.82, -1.25], [-0.82, 1.25], [0.82, 1.25]]) { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 0.22, 18), R.ban); b.rotation.z = Math.PI / 2; b.position.set(x, 0.33, z); b.castShadow = true; mobil.add(b); }
  // pohon taman depan
  silinder(bawah, R.kayuTua, 0.07, 1.5, 4.9, 0.95, -2.6, 8);
  const taj = new THREE.Mesh(new THREE.IcosahedronGeometry(0.95, 1), R.daun); taj.position.set(4.9 - 3, 2.2, -2.6 + FS); taj.scale.y = 1.15; taj.castShadow = true; bawah.add(taj);
  tanaman(1.2, 8.05, 0.9); tanaman(4.8, 8.05, 1.1);
  lampuDalam.position.set(-1.4, 2, FS + 2.2); rinci.add(lampuDalam);
  const bahanAtas = Object.values(A);

  pindahRumah = () => {
    for (const u of UNIT) u.rumah.visible = u !== pilih;
    rinci.position.copy(pilih.g.position); rinci.rotation.y = pilih.rot; rinci.updateMatrixWorld(true);
    taruhBingkai(bPilih, pilih); pipihLalu = -1;
    hitungKunci();
  };

  // --- kamera: titik-titik tur dalam koordinat bangunan (bx, y, bz)
  const B = (bx, y, bz) => new THREE.Vector3(bx - 3, y, bz + FS);
  const KUNCI = [
    null, // 0 = tampak seluruh perumahan (dihitung dari ukuran layar)
    { pos: B(3, 25, -9), lihat: B(3, 0, 3.4) },
    { pos: B(3, 20, -6.5), lihat: B(3, 0, 3) },
    { pos: B(-3.6, 5.4, -12.4), lihat: B(2.4, 0.8, -1.9) },
    { pos: B(0.7, 7.4, -4.4), lihat: B(1.6, 0.5, 1.9) },
    { pos: B(-2.6, 7.2, 0.9), lihat: B(1.7, 0.5, 5.5) },
    { pos: B(7.8, 6.8, -3.8), lihat: B(4.6, 0.5, 1.6) },
    { pos: B(7.9, 5.6, 1.9), lihat: B(5.15, 0.4, 4) },
    { pos: B(8.6, 6.8, 3), lihat: B(4.6, 0.5, 6.2) },
    { pos: B(3, 19, 1.4), lihat: B(3, 0, 3.75) },
    { pos: B(-3.4, 1.75, -13.6), lihat: B(3.2, 2.3, 2) },
  ];
  const kunci = []; // posisi dunia
  const BOX = new THREE.Box3(new THREE.Vector3(-54, 0, -34), new THREE.Vector3(50, 5, 34));
  const POJOK = [];
  for (const x of [BOX.min.x, BOX.max.x]) for (const y of [0, 5]) for (const z of [BOX.min.z, BOX.max.z]) POJOK.push(new THREE.Vector3(x, y, z));
  let geser0 = { x: 0, y: 0 }, jarak0 = 180;
  const v3 = new THREE.Vector3();
  function tampakLuas() {
    // cari jarak kamera supaya seluruh perumahan muat di area bebas layar, lalu geser ke tengah area itu
    const p = hp();
    const az = THREE.MathUtils.degToRad(p ? 112 : 22), elv = THREE.MathUtils.degToRad(p ? 50 : 38);
    const arah = new THREE.Vector3(Math.sin(az) * Math.cos(elv), Math.sin(elv), Math.cos(az) * Math.cos(elv));
    const target = new THREE.Vector3(-2, 0, 0);
    const area = p ? { x0: -0.94, x1: 0.94, y0: -0.42, y1: 0.5 } : { x0: -0.93, x1: 0.5, y0: -0.9, y1: 0.36 };
    camera.clearViewOffset();
    const ukur = (d) => {
      camera.position.copy(target).addScaledVector(arah, d); camera.lookAt(target); camera.updateMatrixWorld(); camera.updateProjectionMatrix();
      let a = 9, b = -9, c = 9, e = -9;
      for (const q of POJOK) { v3.copy(q).project(camera); a = Math.min(a, v3.x); b = Math.max(b, v3.x); c = Math.min(c, v3.y); e = Math.max(e, v3.y); }
      return { a, b, c, e };
    };
    let lo = 40, hi = 700;
    for (let i = 0; i < 26; i++) { const d = (lo + hi) / 2, m = ukur(d); (m.b - m.a <= area.x1 - area.x0 && m.e - m.c <= area.y1 - area.y0) ? (hi = d) : (lo = d); }
    const m = ukur(hi); jarak0 = hi;
    geser0 = { x: ((m.a + m.b) / 2 - (area.x0 + area.x1) / 2) / 2, y: ((area.y0 + area.y1) / 2 - (m.c + m.e) / 2) / 2 };
    kunci[0] = { pos: camera.position.clone(), lihat: target.clone() };
  }
  function hitungKunci() {
    rinci.updateMatrixWorld(true);
    // jarak kamera per jenis titik: tampak atas, ruangan, tampak jalan. Layar tegak mundur lebih jauh supaya ruangan tetap utuh.
    const p = hp(), skala = (i) => (i === 10 ? (p ? 1.2 : 1) : i >= 3 && i <= 8 ? (p ? 1.75 : 1.5) : p ? 1.6 : 1);
    for (let i = 1; i < KUNCI.length; i++) {
      const lihat = KUNCI[i].lihat.clone(), pos = lihat.clone().add(KUNCI[i].pos.clone().sub(lihat).multiplyScalar(skala(i)));
      kunci[i] = { pos: pos.applyMatrix4(rinci.matrixWorld), lihat: lihat.applyMatrix4(rinci.matrixWorld) };
    }
  }

  const camPos = new THREE.Vector3(), camLihat = new THREE.Vector3(), tujuPos = new THREE.Vector3(), tujuLihat = new THREE.Vector3();
  function poseKamera(p) {
    let i = 0;
    while (i < TITIK.length - 2 && p >= TITIK[i + 1]) i++;
    const t = clamp((p - TITIK[i]) / (TITIK[i + 1] - TITIK[i]));
    const e = i === 0 ? halus(t) : halus(clamp((t - 0.14) / 0.72));
    tujuPos.lerpVectors(kunci[i].pos, kunci[i + 1].pos, e);
    tujuLihat.lerpVectors(kunci[i].lihat, kunci[i + 1].lihat, e);
    if (i >= 2 && i < 9) tujuPos.y += Math.sin(e * Math.PI) * 1.1; // sedikit naik saat pindah ruangan
    if (i === 9) tujuPos.y += Math.sin(e * Math.PI) * 5;
  }

  function ukuran() {
    const w = el.lekat.clientWidth, h = el.lekat.clientHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, hp() ? 1.6 : 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.fov = hp() ? 46 : 30;
    tampakLuas(); hitungKunci();
  }

  // --- arah kursor / ketuk
  const sinar = new THREE.Raycaster(), tikus = new THREE.Vector2(-9, -9);
  let pAkhir = 0, turun = null;
  const kenaUnit = (ev) => {
    const r = el.lekat.getBoundingClientRect();
    tikus.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    sinar.setFromCamera(tikus, camera);
    const k = sinar.intersectObjects(pilihan, false)[0];
    return k ? k.object.userData.u : null;
  };
  const kanvas = renderer.domElement;
  kanvas.addEventListener("pointermove", (ev) => {
    if (ev.pointerType !== "mouse" || pAkhir > 0.02) return;
    const u = kenaUnit(ev);
    if (u !== sorot) { sorot = u; isiPanel(u || pilih); taruhBingkai(bHover, u && u !== pilih ? u : null); kanvas.style.cursor = u ? "pointer" : ""; }
  });
  kanvas.addEventListener("pointerleave", () => { sorot = null; isiPanel(pilih); taruhBingkai(bHover, null); kanvas.style.cursor = ""; });
  kanvas.addEventListener("pointerdown", (ev) => (turun = { x: ev.clientX, y: ev.clientY, t: performance.now() }));
  kanvas.addEventListener("pointerup", (ev) => {
    if (!turun || pAkhir > 0.02) return;
    const geserJari = Math.hypot(ev.clientX - turun.x, ev.clientY - turun.y), lama = performance.now() - turun.t; turun = null;
    if (geserJari > 10 || lama > 600) return;
    const u = kenaUnit(ev); if (!u) return;
    sorot = null; taruhBingkai(bHover, null);
    pilihUnit(u);
    if (ev.pointerType === "mouse") masuk();
  });

  // --- loop
  const proyeksi = new THREE.Vector3();
  let tampak = true, tLalu = performance.now(), awalKamera = true, malamLalu = -1, pipihLalu = -1;
  new IntersectionObserver((e) => (tampak = e[0].isIntersecting), { rootMargin: "100px" }).observe(el.panggung);
  const cBg = new THREE.Color(), cClay = new THREE.Color();
  const SUN_SIANG = new THREE.Color("#FFF3E2"), SUN_MALAM = new THREE.Color("#8FA2E8"), HEMI_MALAM = new THREE.Color("#93A2D6"), PUTIH = new THREE.Color("#ffffff");

  function bingkaiAnim(now) {
    requestAnimationFrame(bingkaiAnim);
    const dt = Math.min(0.05, (now - tLalu) / 1000); tLalu = now;
    const p = progres();
    if (p !== pAkhir || awalKamera) perbaruiUi(p);
    pAkhir = p;
    if (!tampak) return;

    // kamera
    poseKamera(p);
    const k = awalKamera || diam ? 1 : 1 - Math.exp(-dt * 5.5);
    camPos.lerp(tujuPos, k); camLihat.lerp(tujuLihat, k); awalKamera = false;
    camera.position.copy(camPos); camera.lookAt(camLihat);
    const w = el.lekat.clientWidth, h = el.lekat.clientHeight;
    const keTur = rentang(p, 0, 0.13);
    const gx = geser0.x * (1 - keTur), gy = geser0.y * (1 - keTur) + (hp() ? 0.1 : 0) * keTur * (1 - rentang(p, 0.88, 0.95) * 0.4);
    const fovDasar = hp() ? 46 : 30, fov = fovDasar + rentang(p, 0.885, 0.95) * (hp() ? 14 : 20); // adegan sore: sudut lebih lebar
    if (Math.abs(camera.fov - fov) > 0.01) { camera.fov = fov; camera.updateProjectionMatrix(); }
    camera.setViewOffset(w, h, gx * w, gy * h, w, h);

    // tutup maket (atap + dinding atas) diangkat, warna masuk, lalu sore
    const angkat = rentang(p, 0.125, 0.2) * (1 - rentang(p, 0.875, 0.935));
    const berwarna = rentang(p, 0.15, 0.24);
    const malam = rentang(p, 0.885, 0.95);
    atas.position.y = angkat * 9; atas.visible = angkat < 0.995;
    for (const m of bahanAtas) m.opacity = (m === A.kaca ? 0.38 : 1) * (1 - angkat);
    atas.traverse((o) => { if (o.isMesh) o.castShadow = angkat < 0.25 && o.material !== A.kaca; });
    for (const b of warna) b.m.color.lerpColors(b.clay, b.asli, berwarna);
    if (malam !== malamLalu) {
      malamLalu = malam;
      cBg.lerpColors(BG, BGM, malam); scene.background.copy(cBg); scene.fog.color.copy(cBg);
      hemi.intensity = HEMI0 - malam * (HEMI0 - 0.62); hemi.color.lerpColors(PUTIH, HEMI_MALAM, malam);
      sun.intensity = SUN0 - malam * (SUN0 - 0.5); sun.color.lerpColors(SUN_SIANG, SUN_MALAM, malam);
      R.kaca.emissiveIntensity = A.kaca.emissiveIntensity = malam * 1.6; M.jendelaHuni.emissiveIntensity = malam * 1.3; M.lampuJalan.emissiveIntensity = malam * 2.2;
      lampuDalam.intensity = malam * 26; lantaiBayang.material.opacity = 0.13 + malam * 0.2;
      document.body.classList.toggle("malam", malam > 0.5 && p < 0.999);
      el.lekat.style.background = `#${cBg.getHexString()}`;
    }
    scene.fog.near = THREE.MathUtils.lerp(jarak0 * 1.15, 45, keTur); scene.fog.far = THREE.MathUtils.lerp(jarak0 * 2.6, 190, keTur);

    // bayangan: melebar di tampak luas, rapat & tajam saat di dalam rumah
    const S = THREE.MathUtils.lerp(72, 15, keTur) + malam * 12;
    const fokus = v3.lerpVectors(kunci[0].lihat, rinci.position, keTur);
    sun.target.position.copy(fokus); sun.position.copy(fokus).addScaledVector(ARAH_SUN, 190);
    const sc = sun.shadow.camera; sc.left = -S; sc.right = S; sc.top = S; sc.bottom = -S; sc.updateProjectionMatrix();
    sun.shadow.normalBias = THREE.MathUtils.lerp(0.5, 0.04, keTur); sun.shadow.bias = -0.0004;

    // rumah lain di sekitar dipipihkan saat tur supaya tidak menghalangi pandangan
    const pipih = rentang(p, 0.135, 0.2) * (1 - rentang(p, 0.875, 0.935));
    if (pipih !== pipihLalu) { pipihLalu = pipih; for (const u of UNIT) u.rumah.scale.y = Math.abs(u.cx - pilih.cx) < 24 && Math.abs(u.depan - pilih.depan) < 40 ? 1 - pipih * 0.985 : 1; }
    bPilih.visible = p < 0.07;
    // rumah yang disorot terangkat sedikit
    for (const u of UNIT) {
      const t = u === sorot && p < 0.02 ? 0.9 : 0;
      if (Math.abs(u.angkat - t) > 0.001) { u.angkat += (t - u.angkat) * (diam ? 1 : 1 - Math.exp(-dt * 10)); u.rumah.position.y = u.angkat; }
    }
    const naikRinci = sorot === pilih && p < 0.02 ? 0.9 : 0;
    rinci.position.y += (naikRinci - rinci.position.y) * (diam ? 1 : 1 - Math.exp(-dt * 10));

    renderer.render(scene, camera);

    // garis dari kavling ke panel (desktop, tampak luas saja)
    const u = sorot || pilih;
    if (p < 0.02 && !hp()) {
      proyeksi.set(u.cx, 4.6, u.depan + u.arah * (FS + 3.75)).project(camera);
      const x = (proyeksi.x * 0.5 + 0.5) * w, y = (-proyeksi.y * 0.5 + 0.5) * h, pr = el.panel.getBoundingClientRect(), lr = el.lekat.getBoundingClientRect();
      const x2 = pr.left - lr.left, y2 = pr.top - lr.top + 52;
      el.garisL.setAttribute("x1", x); el.garisL.setAttribute("y1", y); el.garisL.setAttribute("x2", x2); el.garisL.setAttribute("y2", y2);
      el.garisT.setAttribute("cx", x); el.garisT.setAttribute("cy", y);
      el.garis.classList.add("tampil");
    } else el.garis.classList.remove("tampil");
  }

  let tUkuran = 0, lebarLalu = innerWidth;
  addEventListener("resize", () => { clearTimeout(tUkuran); tUkuran = setTimeout(() => { if (hp() && innerWidth === lebarLalu) { renderer.setSize(el.lekat.clientWidth, el.lekat.clientHeight, false); camera.aspect = el.lekat.clientWidth / el.lekat.clientHeight; camera.updateProjectionMatrix(); return; } lebarLalu = innerWidth; ukuran(); awalKamera = true; }, 120); });
  kanvas.addEventListener("webglcontextlost", (e) => e.preventDefault());

  ukuran(); pindahRumah();
  requestAnimationFrame(bingkaiAnim);
  window.__maket = { scene, camera, UNIT, pilihUnit };
}
