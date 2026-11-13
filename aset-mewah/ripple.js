/* Riak air di foto hero (WebGL, tanpa library).
   - Tiap gerakan kursor / sentuhan menjatuhkan riak; riak merambat dan memudar.
   - Hanya hidup di bagian bawah foto (area kolam) supaya terasa seperti air, bukan filter.
   - GPU berhenti total saat tidak ada riak, saat hero di luar layar, atau tab tersembunyi.
   - Gagal (file://, WebGL mati, gerak dikurangi) -> foto statis tetap tampil, tidak ada error. */
window.Ripple = (function () {
  const noop = { drop() {}, ok: false };
  const canvas = document.getElementById("heroGl");
  const img = document.getElementById("heroImg");
  const hero = document.getElementById("top");
  if (!canvas || !img || !hero) return noop;
  if (document.documentElement.classList.contains("reduce")) { canvas.remove(); return noop; }

  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
  if (!gl) { canvas.remove(); return noop; }

  const MAX = 12;
  const vs = "attribute vec2 p;varying vec2 v;void main(){v=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0.,1.);}";
  const fs = `precision mediump float;
  varying vec2 v; uniform sampler2D tex; uniform vec2 res, imgSize; uniform float t; uniform vec4 R[${MAX}];
  vec2 cover(vec2 uv){ float r=res.x/res.y, ir=imgSize.x/imgSize.y; vec2 s = r>ir ? vec2(1.,ir/r) : vec2(r/ir,1.); return (uv-.5)*s+.5; }
  void main(){
    float asp = res.x/res.y;
    vec2 p = vec2(v.x*asp, v.y);
    vec2 disp = vec2(0.); float lit = 0.;
    for(int i=0;i<${MAX};i++){
      vec4 r = R[i]; float age = t - r.z;
      if(age>0. && age<5.){
        vec2 d = p - vec2(r.x*asp, r.y); float dist = length(d);
        float w = dist - age*.24;
        float env = exp(-w*w*70.) * exp(-age*.75) * r.w;
        float o = sin(w*70.);
        disp += d/(dist+1e-4) * o * env * .015;
        lit += o * env;
      }
    }
    float zone = mix(.22, 1., smoothstep(.5, .82, v.y));
    vec3 c = texture2D(tex, cover(v + disp*zone)).rgb;
    c += lit*zone*.11;
    gl_FragColor = vec4(c,1.);
  }`;

  function sh(type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; }
  const vsh = sh(gl.VERTEX_SHADER, vs), fsh = sh(gl.FRAGMENT_SHADER, fs);
  if (!vsh || !fsh) { canvas.remove(); return noop; }
  const pg = gl.createProgram(); gl.attachShader(pg, vsh); gl.attachShader(pg, fsh); gl.linkProgram(pg);
  if (!gl.getProgramParameter(pg, gl.LINK_STATUS)) { canvas.remove(); return noop; }
  gl.useProgram(pg);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pg, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = n => gl.getUniformLocation(pg, n);
  const uRes = U("res"), uImg = U("imgSize"), uT = U("t"), uR = U("R");

  const ripples = new Float32Array(MAX * 4).fill(0); // x, y, mulai, kekuatan
  for (let i = 0; i < MAX; i++) ripples[i * 4 + 2] = -99;
  let idx = 0, running = false, visible = true, now = 0, t0 = performance.now(), ready = false, lastT = -99;

  function size() {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    const w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  function active() { for (let i = 0; i < MAX; i++) if (now - ripples[i * 4 + 2] < 5) return true; return false; }
  function frame() {
    running = false;
    if (!ready || !visible || document.hidden) return;
    now = (performance.now() - t0) / 1000;
    size();
    gl.uniform2f(uRes, canvas.width, canvas.height); gl.uniform1f(uT, now); gl.uniform4fv(uR, ripples);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (!canvas.classList.contains("is-ready")) canvas.classList.add("is-ready");
    if (active()) { running = true; requestAnimationFrame(frame); }
  }
  function kick() { if (!running) { running = true; requestAnimationFrame(frame); } }

  function drop(x, y, k) { // x,y = 0..1 relatif ke hero
    now = (performance.now() - t0) / 1000;
    const o = idx * 4; ripples[o] = x; ripples[o + 1] = y; ripples[o + 2] = now; ripples[o + 3] = k == null ? 1 : k;
    idx = (idx + 1) % MAX; lastT = now; kick();
  }

  // pointer
  let lx = -1, ly = -1, lt = 0;
  hero.addEventListener("pointermove", e => {
    if (e.pointerType === "touch") return;
    const r = hero.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    const tt = performance.now(); const d = Math.hypot((x - lx) * r.width, (y - ly) * r.height);
    if (lx < 0 || (d > 46 && tt - lt > 70)) {
      const sp = Math.min(1, .45 + d / (tt - lt + 1) * .35);
      drop(x, y, sp); lx = x; ly = y; lt = tt; hint();
    }
  }, { passive: true });
  hero.addEventListener("pointerdown", e => {
    if (e.target.closest("a,button")) return;
    const r = hero.getBoundingClientRect(); drop((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height, 1.25); hint();
  }, { passive: true });
  function hint() { const h = document.getElementById("heroHint"); if (h) h.classList.add("is-off"); }

  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) kick(); }, { threshold: 0 }).observe(hero);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) kick(); });
  new ResizeObserver(() => kick()).observe(hero);

  // tekstur
  function load() {
    try {
      const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img); // SecurityError di file:// -> masuk catch
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.uniform1i(U("tex"), 0); gl.uniform2f(uImg, img.naturalWidth, img.naturalHeight);
      ready = true; api.ok = true; kick();
    } catch (err) { canvas.remove(); }
  }
  const api = { drop, ok: false };
  if (img.complete && img.naturalWidth) load(); else img.addEventListener("load", load, { once: true });
  canvas.addEventListener("webglcontextlost", e => { e.preventDefault(); canvas.classList.remove("is-ready"); ready = false; });
  return api;
})();
