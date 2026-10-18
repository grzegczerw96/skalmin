/* 04-mineraly: sekcja „Minerały”. Ruch z kodu oryginału (orig/pretty/minerals.js, minerals-canvas-local-debug.js):
   - oś: ScrollTrigger trigger .minerals-stage, start 'top top', end '+=' (wysokość stage − innerHeight), scrub 1;
     ekran przyklejony przez CSS (sticky), nie pin
   - koło .circle.is-2: maska conic-gradient(#fff 0 … --angle, transparent), --angle = postęp × 360°
   - aktywny minerał = floor(min(postęp, .999999) × 5): nazwa krycie .15 → 1 (0,25 s 'main'), symbol i numer
     (.eyebrow-slider) y → −offsetTop aktywnego (0,25 s 'main'); ≤767 lista nazw przewijana w bok do środka aktywnej
     (scrollLeft, 0,3 s 'main'), a w ostatnich 10% ekranu osi lista zjeżdża w dół (yPercent 0 → 120, funkcja M())
   - skała: 600 klatek (5 × 120, obrót 360° na minerał, cięcie co 120) na <canvas>, tween frame 0 → 599 liniowo,
     trigger stage 'top top' → 'bottom bottom', scrub .4; klatka = round(frame); obraz „contain” w płótnie × 0,85 na białym;
     gęstość płótna = devicePixelRatio (poza desktopem ≤ 2). Klatki z narzedzia/skaly.py (img/mineraly/m-NNN.webp). */
(function () {
  const SM = window.SM;
  SM.sekcja('04-mineraly', () => {
    const e = document.querySelector('.section_minerals');
    if (!e) return;
    const EASE = 'main';
    const stage = e.querySelector('.minerals-stage');
    const left = e.querySelector('.minerals_left');
    const names = Array.from(e.querySelectorAll('.minerals-names .body-xl'));
    const namesBox = e.querySelector('.minerals-names');
    const sliders = Array.from(e.querySelectorAll('.eyebrow-slider'));
    const mobile = () => SM.mq('(max-width: 767px)');

    // ---------- koło: 180 kresek co 2° (geometria jak SVG oryginału: promień 308 → 296 w polu 616) ----------
    const NS = 'http://www.w3.org/2000/svg';
    e.querySelectorAll('.circle').forEach((svg) => {
      const g = document.createElementNS(NS, 'g');
      for (let i = 0; i < 180; i++) {
        const a = Math.PI - i * Math.PI / 90, c = Math.cos(a), s = Math.sin(a);
        const l = document.createElementNS(NS, 'line');
        l.setAttribute('x1', (308 + 308 * c).toFixed(3)); l.setAttribute('y1', (308 - 308 * s).toFixed(3));
        l.setAttribute('x2', (308 + 296 * c).toFixed(3)); l.setAttribute('y2', (308 - 296 * s).toFixed(3));
        l.setAttribute('stroke', '#151515'); g.appendChild(l);
      }
      svg.appendChild(g);
    });
    const o = e.querySelector('.circle.is-2');
    const MASK = 'conic-gradient(from 0deg at 50% 50%, #fff 0deg, #fff var(--angle, 0deg), transparent var(--angle, 0deg))';
    Object.assign(o.style, { webkitMaskImage: MASK, maskImage: MASK, maskMode: 'luminance', webkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat', webkitMaskPosition: 'center', maskPosition: 'center', willChange: 'transform, -webkit-mask-image, mask-image' });
    o.style.setProperty('--angle', '0deg');

    // ---------- lista, symbol, numer ----------
    let postep = 0, aktywny = -1;
    const M = (n) => {                                     // ≤767: lista zjeżdża w ostatnich 10% ekranu osi
      if (!mobile()) { gsap.set(left, { yPercent: 0 }); return; }
      const r = Math.max(0, stage.offsetHeight - innerHeight);
      if (r <= 0) { gsap.set(left, { yPercent: 0 }); return; }
      const a = Math.max(0, 1 - Math.min(1, innerHeight * .1 / r));
      const d = n <= a ? 0 : Math.min(1, (n - a) / (1 - a));
      gsap.set(left, { yPercent: Math.round(d * 1200) / 10 });
    };
    const I = (n) => {                                     // ≤767: aktywna nazwa na środek paska
      if (!mobile() || !namesBox || !names[n]) return;
      Object.assign(namesBox.style, { overflowX: 'auto', overflowY: 'hidden', flexWrap: 'nowrap' });
      names.forEach((x) => { x.style.flex = '0 0 auto'; });
      if (namesBox.scrollWidth <= namesBox.clientWidth) return;
      const s = namesBox.getBoundingClientRect(), m = names[n].getBoundingClientRect();
      const d = m.left - s.left + m.width / 2 - namesBox.clientWidth / 2;
      const v = Math.max(0, Math.min(Math.round(namesBox.scrollLeft + d), namesBox.scrollWidth - namesBox.clientWidth));
      gsap.to(namesBox, { scrollLeft: v, duration: .3, ease: EASE, overwrite: 'auto' });
    };
    const T = (n) => {
      names.forEach((t, r) => {
        const s = r === n;
        t.classList.toggle('is-active', s); t.classList.toggle('is-o-15', !s);
        gsap.to(t, { opacity: s ? 1 : .15, duration: .25, ease: EASE, overwrite: 'auto' });
      });
      I(n);
    };
    const P = (n) => {
      sliders.forEach((t) => {
        const sp = Array.from(t.querySelectorAll('span'));
        const m = Math.min(Math.max(n, 0), sp.length - 1);
        sp.forEach((d, l) => d.classList.toggle('is-active', l === m));
        gsap.to(t, { y: -(sp[m].offsetTop - sp[0].offsetTop), duration: .25, ease: EASE, overwrite: 'auto' });
      });
    };
    const A = () => {                                      // symbol na wysokości etykiety listy (desktop)
      const n = e.querySelector('.minerals-list .eyebrow-wrapper'), t = e.querySelector('.minerals_right .eyebrow-wrapper.is-a');
      if (!n || !t) return;
      if (mobile()) { t.style.position = ''; t.style.top = ''; return; }
      const s = t.offsetParent || t.parentElement;
      t.style.position = 'absolute';
      t.style.top = Math.round(n.getBoundingClientRect().top - s.getBoundingClientRect().top) + 'px';
    };
    A();
    addEventListener('resize', () => requestAnimationFrame(() => { A(); const n = Math.max(0, aktywny); I(n); M(postep); P(n); }));

    ScrollTrigger.create({
      trigger: stage, start: 'top top', end: () => '+=' + Math.max(0, Math.round(stage.offsetHeight - innerHeight)),
      scrub: 1, invalidateOnRefresh: true,
      onUpdate: (st) => {
        postep = st.progress;
        o.style.setProperty('--angle', Math.max(0, Math.min(360, st.progress * 360)) + 'deg');
        M(st.progress);
        const s = Math.min(names.length - 1, Math.floor(Math.max(0, Math.min(.999999, st.progress)) * names.length));
        if (s !== aktywny) { aktywny = s; T(s); P(s); }
      },
      onLeave: () => { o.style.setProperty('--angle', '360deg'); M(1); if (aktywny !== -1) { T(names.length - 1); P(names.length - 1); } },
      onLeaveBack: () => { o.style.setProperty('--angle', '0deg'); M(0); if (aktywny !== -1) { T(0); P(0); } },
      onRefresh: A,
    });

    // ---------- skała: sekwencja klatek na <canvas> ----------
    const N = 600, FIT = .85;
    const a = e.querySelector('.minerals_canvas'), cx = a.getContext('2d', { alpha: false });
    const src = (i) => 'img/mineraly/m-' + String(i).padStart(3, '0') + '.webp';
    const img = new Array(N), stan = new Array(N).fill(0);   // 0 nic, 1 w drodze, 2 gotowa
    const st = { frame: 0 };
    let cel = 0, narys = -1, w = 1, h = 1, ruszyl = false, wDrodze = 0;
    const rozmiar = () => {
      const dpr = SM.mq('(min-width: 992px)') ? (devicePixelRatio || 1) : Math.min(devicePixelRatio || 1, 2);
      w = Math.max(a.clientWidth, 1); h = Math.max(a.clientHeight, 1);
      a.width = Math.round(w * dpr); a.height = Math.round(h * dpr);
      cx.setTransform(dpr, 0, 0, dpr, 0, 0); cx.imageSmoothingQuality = 'high';
      narys = -1; rysuj();
    };
    const najblizsza = (t) => {
      if (stan[t] === 2) return t;
      for (let r = 1; r < N; r++) { if (t - r >= 0 && stan[t - r] === 2) return t - r; if (t + r < N && stan[t + r] === 2) return t + r; }
      return -1;
    };
    function rysuj() {
      const k = najblizsza(cel);
      if (k < 0 || k === narys) return;
      const im = img[k], s = Math.min(w / im.naturalWidth, h / im.naturalHeight) * FIT;
      const dw = im.naturalWidth * s, dh = im.naturalHeight * s;
      cx.fillStyle = '#fff'; cx.fillRect(0, 0, w, h);
      cx.drawImage(im, (w - dw) / 2, (h - dh) / 2, dw, dh);
      narys = k;
    }
    // wczytywanie: najpierw najbliższe celu (jak plan oryginału: przed celem więcej niż za nim), po 6 naraz
    const nastepna = () => {
      if (stan[cel] === 0) return cel;
      for (let r = 1; r < N; r++) {
        if (cel + r < N && stan[cel + r] === 0) return cel + r;
        if (cel - r >= 0 && stan[cel - r] === 0) return cel - r;
      }
      return -1;
    };
    const laduj = () => {
      while (ruszyl && wDrodze < 6) {
        const i = nastepna(); if (i < 0) return;
        stan[i] = 1; wDrodze++;
        const im = new Image(); im.decoding = 'async'; im.src = src(i);
        const gotowe = () => { stan[i] = 2; img[i] = im; wDrodze--; if (Math.abs(i - cel) <= Math.abs(narys - cel) || narys < 0) { narys = -1; rysuj(); } laduj(); };
        im.decode().then(gotowe, () => { if (im.complete && im.naturalWidth) gotowe(); else { stan[i] = 0; wDrodze--; } });
      }
    };
    const start = () => { if (ruszyl) return; ruszyl = true; laduj(); };
    // pierwsza klatka od razu; reszta po wczytaniu strony + 1 s albo gdy sekcja jest ekran od widoku (oryginał: 1000 ms, rootMargin 100%)
    stan[0] = 1; { const im = new Image(); im.src = src(0); im.decode().catch(() => {}).then(() => { stan[0] = 2; img[0] = im; narys = -1; rysuj(); }); }
    const poLoad = () => setTimeout(start, 1000);
    if (document.readyState === 'complete') poLoad(); else addEventListener('load', poLoad, { once: true });
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((en) => { if (en.some((x) => x.isIntersecting)) { start(); io.disconnect(); } }, { rootMargin: '100% 0px' });
      io.observe(e);
    }
    if ('ResizeObserver' in window) new ResizeObserver(rozmiar).observe(a); else addEventListener('resize', rozmiar);
    rozmiar();
    gsap.to(st, {
      frame: N - 1, duration: N / 24, ease: 'none',
      onUpdate: () => { const k = Math.round(st.frame); if (k !== cel) { cel = k; rysuj(); if (ruszyl) laduj(); } },
      scrollTrigger: { trigger: stage, start: 'top top', end: 'bottom bottom', scrub: .4, invalidateOnRefresh: true },
    });
    SM.mineraly = { st, stan, img, rysuj: () => { narys = -1; rysuj(); }, get cel() { return cel; }, get narys() { return narys; } };   // pomiar
  });
})();
