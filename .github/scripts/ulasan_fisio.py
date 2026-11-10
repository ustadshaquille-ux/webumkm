"""Ambil rating, jumlah ulasan, dan ulasan teratas Google Maps untuk
Praktek Fisioterapi Puri Bintaro Hijau -> ulasan.json (dipakai index.html).
Dijalankan harian oleh .github/workflows/ulasan-fisio.yml. Hanya membaca Google Maps.
Keluar dengan kode 0 + tanpa menulis file kalau scraping gagal, supaya data lama tetap tampil."""
import datetime, json, pathlib, re, sys
from playwright.sync_api import sync_playwright

CID = "1336049142106396997"
PLACE_ID = "ChIJC9cWJAD7aS4RRZm3tZ2ZihI"
OUT = pathlib.Path(__file__).resolve().parents[2] / "klinik/praktek-fisioterapi-puri-bintaro-hijau-595/ulasan.json"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
MAKS = 9


def nama_pendek(n):
    p = n.split()
    if not p: return ""
    a = p[0][:1].upper() + p[0][1:]
    return a if len(p) == 1 else f"{a} {p[1][0].upper()}."


def ambil():
    with sync_playwright() as p:
        b = p.chromium.launch(headless=True)
        try:
            ctx = b.new_context(locale="id-ID", timezone_id="Asia/Jakarta", user_agent=UA, viewport={"width": 1280, "height": 900})
            ctx.add_cookies([{"name": "SOCS", "value": "CAESHAgBEhJnd3NfMjAyMzA4MTAtMF9SQzIaAmlkIAEaBgiAo_CmBg", "domain": ".google.com", "path": "/"}])
            pg = ctx.new_page()
            pg.goto(f"https://www.google.com/maps?cid={CID}&hl=id&gl=id", wait_until="domcontentloaded", timeout=60000)
            pg.wait_for_selector("div[role=main]", timeout=60000)
            pg.wait_for_timeout(6000)
            rating = jumlah = None
            for s in pg.eval_on_selector_all("[aria-label]", "e=>e.map(x=>x.getAttribute('aria-label'))"):
                s = s or ""
                m = re.fullmatch(r"\s*(\d[,.]\d) bintang\s*", s)
                if m and rating is None: rating = float(m.group(1).replace(",", "."))
                m = re.fullmatch(r"\s*([\d.]+) ulasan\s*", s)
                if m and jumlah is None: jumlah = int(m.group(1).replace(".", ""))
            ulasan = []
            tab = next((t for t in pg.query_selector_all("button[role=tab]") if t.inner_text().strip().startswith("Ulasan")), None)
            if tab:
                tab.click(); pg.wait_for_timeout(4000)
            for btn in pg.query_selector_all("button.w8nwRe"):  # tombol "Lainnya"
                try: btn.click(timeout=1000)
                except Exception: pass
            pg.wait_for_timeout(800)
            ulasan = pg.evaluate(r"""() => [...document.querySelectorAll('div[data-review-id].jftiEf')].map(r => {
                const st = r.querySelector('[role=img][aria-label*="bintang"]');
                return { nama: (r.querySelector('.d4r55')||{}).innerText || '',
                         bintang: st ? parseInt(st.getAttribute('aria-label')) : 0,
                         waktu: (r.querySelector('.rsqaWe')||{}).innerText || '',
                         teks: ((r.querySelector('.wiI7pd')||{}).innerText || '').trim() } })""")
        finally:
            b.close()
    hasil, lihat = [], set()
    for u in ulasan:
        if u["bintang"] >= 4 and len(u["teks"]) >= 25 and u["nama"] and u["nama"] not in lihat:
            lihat.add(u["nama"]); hasil.append({**u, "nama": nama_pendek(u["nama"])})
        if len(hasil) >= MAKS: break
    return rating, jumlah, hasil


def main():
    lama = json.loads(OUT.read_text("utf-8")) if OUT.exists() else {}
    try:
        rating, jumlah, ulasan = ambil()
    except Exception as e:
        print("gagal scraping:", e); return
    if not rating or not jumlah or rating > 5 or (lama.get("jumlah") and jumlah < lama["jumlah"] * 0.8):
        print("data tidak wajar, dilewati:", rating, jumlah); return
    data = {"rating": rating, "jumlah": jumlah,
            "ulasan": ulasan if len(ulasan) >= 3 else lama.get("ulasan", []),
            "link": f"https://www.google.com/maps?cid={CID}",
            "tulis": f"https://search.google.com/local/writereview?placeid={PLACE_ID}",
            "diperbarui": datetime.date.today().isoformat()}
    inti = lambda d: {k: v for k, v in d.items() if k != "diperbarui"}
    try: umur = (datetime.date.today() - datetime.date.fromisoformat(lama.get("diperbarui", "2000-01-01"))).days
    except ValueError: umur = 999
    if inti(lama) == inti(data) and umur < 7:
        print("tidak berubah:", rating, jumlah); return
    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=1), "utf-8")
    print("diperbarui:", rating, jumlah, len(data["ulasan"]), "ulasan")


if __name__ == "__main__":
    main()
    sys.exit(0)
