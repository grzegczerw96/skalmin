/* 01-hero: plansza ładowania + hero. Odtworzone z main.js oryginału (pretty/main.js): film wejścia qd() w. 207–379,
   sekwencja klatek jd() w. 440–720, sterownik yl() w. 790–935, wejście tekstu i kart ci() w. 5807–5890, sekwencja
   przewijana Ka()/yp() w. 5946–6013, plansza _p() w. 6031–6283 (wariant strony głównej: main.js w. 13101 woła _p()
   dla namespace "home"; Tp() i Ep() to przejścia z podstron i podstrony). Krzywa 'main' = M0,0 C0.6,0 0,1 1,1.

   PRZEBIEG (liczby z kodu; czasy z pomiaru żywej strony 16.10, rAF co klatkę):
   - plansza: logo czeka na gotowość mediów (film wejścia + pierwsze 60 klatek) albo 1,5 s; potem biały kwadrat rośnie
     za znakiem, znak wjeżdża z obrotu 70° (0,8 s), ramka rozszerza się na napis (0,8 s, litery z dołu, kaskada .02),
     zwęża się do napisu (7,46em, 0,3 s);
   - ≥992 px (nie Safari): napis w ramce rośnie do całego ekranu +24 px (1,8 s), plansza ma w masce dziurę o tym samym
     prostokącie, tło ramki gaśnie w 0,9 s, napis w 1,8 s; ≤991 px i Safari: plansza gaśnie (1,8 s);
   - równo z odsłoną: wejście hero (H1 i etykiety yPercent 110/130 → 0, 1,2 s, kaskada .03; karty od 0,5 s
     yPercent 110 / 120, na ≤991 w px) i film wejścia (3,6 s odtworzone w 1,8 s, tempo 2);
   - koniec: płótno z klatką 0, film znika, 'loader:done'; dalej klatka = round(min(przewinięcie / wysokość okna, 1) ×
     (liczba klatek − 1)), bez opóźnienia (oryginał liczy z Lenisa).
   Nawigacja: w oryginale na stronie głównej stoi w miejscu (pomiar: left 32 px przez całe wejście, 1440 i 375), więc
   SM.nav.start()/wjazd() tu nie są używane. ?intro=0: bez planszy i filmu, od razu stan po wejściu. */
(function () {
  const SM = window.SM, E = gsap;
  const DR = 1.8, PP = DR * .5;                                         // Dr, pp
  const WAR = {                                                        // manifest oryginału (cave-manifest.json)
    desktop: { n: 150, dir: 'img/hero/seq/desktop/', intro: 'video/hero-intro' },
    mobile: { n: 132, dir: 'img/hero/seq/mobile/', intro: 'video/hero-intro-mobile' },
  };
  const BATCH = 30, AHEAD = 48, BEHIND = 12, YIELD = 4, INTRO_S = 3.6;  // batchSize, Bd, Nd, ic
  const plik = (w, i) => w.dir + 'frame_' + String(i).padStart(5, '0') + '.webp';
  const raf = () => new Promise((r) => requestAnimationFrame(r));
  // Ho(): Safari / urządzenia Apple: film wejścia przewijany ręcznie zamiast odtwarzania
  function apple() {
    const ua = navigator.userAgent || '', ven = navigator.vendor || '';
    const saf = /Safari/i.test(ua) && !/Chrome|Chromium|Edg|CriOS|FxiOS|OPR|Brave/i.test(ua);
    const mac = (navigator.platform || '').startsWith('Mac');
    return saf || /Apple/i.test(ven) || (!!(window.CSS && CSS.supports && CSS.supports('-webkit-touch-callout', 'none')) && mac);
  }

  /* ---------- klatki: wczytywanie i pamięć (Vd) ---------- */
  const gotowe = new Map(), wToku = new Map();
  function wczytaj(src) {
    if (!src) return Promise.resolve(null);
    if (gotowe.has(src)) return Promise.resolve(gotowe.get(src));
    if (wToku.has(src)) return wToku.get(src);
    const p = new Promise((res) => {
      const im = new Image(); im.decoding = 'async';
      im.onload = async () => { try { await im.decode(); } catch (e) {} gotowe.set(src, im); wToku.delete(src); res(im); };
      im.onerror = () => { wToku.delete(src); res(null); };
      im.src = src;
    });
    wToku.set(src, p); return p;
  }

  /* ---------- sekwencja na płótnie (jd) ---------- */
  function sekwencja(cv, war) {
    const g = cv.getContext('2d', { alpha: false }) || cv.getContext('2d');
    const n = war.n, src = (i) => plik(war, i);
    let zad = 0, nar = -1, flush = 0, tlo = false, stop = false;
    const wymiar = () => {
      const b = cv.parentElement.getBoundingClientRect(); if (b.width < 2 || b.height < 2) return false;
      const d = Math.max(1, devicePixelRatio || 1), w = Math.max(1, Math.round(b.width * d)), h = Math.max(1, Math.round(b.height * d));
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
      return true;
    };
    const rysuj = (im) => {                                            // b(): pokrycie jak object-fit: cover, środek
      if (!im || !im.naturalWidth) return false;
      wymiar();
      const W = cv.width, H = cv.height, s = Math.max(W / im.naturalWidth, H / im.naturalHeight);
      const w = im.naturalWidth * s, h = im.naturalHeight * s;
      g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H); g.drawImage(im, 0, 0, im.naturalWidth, im.naturalHeight, (W - w) / 2, (H - h) / 2, w, h);
      return true;
    };
    const okno = (i) => { for (let k = Math.max(0, i - BEHIND); k <= Math.min(n - 1, i + AHEAD); k++) wczytaj(src(k)); };   // S()
    const najblizsza = (i) => {                                        // k(): najbliższa wczytana klatka
      if (gotowe.has(src(i))) return i;
      for (let d = 1; d < n; d++) {
        if (i - d >= 0 && gotowe.has(src(i - d))) return i - d;
        if (i + d < n && gotowe.has(src(i + d))) return i + d;
      }
      return nar >= 0 ? nar : 0;
    };
    const maluj = (i) => {                                             // C()
      const q = Math.max(0, Math.min(n - 1, i));
      let k = q, im = gotowe.get(src(k));
      if (!im) {
        k = najblizsza(q); im = gotowe.get(src(k));
        wczytaj(src(q)).then((x) => { if (x && zad === q) maluj(q); });
      }
      if (!im || !rysuj(im)) return false;
      nar = k; cv.style.opacity = '1'; cv.style.visibility = 'visible';
      return true;
    };
    const ustaw = (i) => {                                             // I()
      const q = Math.max(0, Math.min(n - 1, Math.round(i)));
      if (q === zad && q === nar) return;
      zad = q; okno(q);
      if (flush) { cancelAnimationFrame(flush); flush = 0; }
      maluj(q);
      if (!gotowe.has(src(q))) flush = requestAnimationFrame(() => { flush = 0; okno(zad); maluj(zad); });
    };
    const reszta = async () => {                                       // x(): partie 2… po kolei, co 4 klatki oddech
      for (let k = 2 * BATCH; k < n; k++) { if (stop) return; await wczytaj(src(k)); if (k % YIELD === 0) await raf(); }
    };
    const start = []; for (let k = 0; k < Math.min(n, 2 * BATCH); k++) start.push(wczytaj(src(k)));   // _(): partie 0 i 1
    return {
      n,
      ready: Promise.all(start),
      postep(p) { ustaw(Math.round(Math.max(0, Math.min(1, +p || 0)) * (n - 1))); },
      tlo() { if (!tlo) { tlo = true; reszta(); } },
      pokaz() { cv.style.opacity = '1'; cv.style.visibility = 'visible'; },
      ukryj() { cv.style.opacity = '0'; cv.style.visibility = 'hidden'; },
      odswiez() { wymiar(); return maluj(zad); },
      async upewnij(i, proby = 12) {                                   // ensureFramePainted
        zad = i; okno(i);
        for (let k = 0; k < proby; k++) { if (maluj(i) && nar === i) return true; if (!gotowe.has(src(i))) await wczytaj(src(i)); else await raf(); }
        return false;
      },
      get klatka() { return nar; },
    };
  }

  /* ---------- film wejścia (qd) ---------- */
  function film(v, war) {
    const pok = (tak) => { v.style.setProperty('opacity', tak ? '1' : '0'); v.style.setProperty('visibility', tak ? 'visible' : 'hidden'); };
    let dl = INTRO_S, gra = false, scrub = false, nr = 0;
    for (const [typ, ext] of [['video/webm; codecs="vp9"', '.webm'], ['video/mp4', '.mp4']]) {
      const s = document.createElement('source'); s.src = war.intro + ext; s.type = typ; v.appendChild(s);
    }
    v.muted = true; v.playsInline = true; v.preload = 'auto';
    const ready = new Promise((res) => {
      const ok = () => { if (v.duration && isFinite(v.duration)) dl = v.duration; res(); };
      v.addEventListener('loadeddata', ok, { once: true }); v.addEventListener('canplay', ok, { once: true });
      v.addEventListener('error', res, { once: true }); setTimeout(ok, 1500);
    });
    try { v.load(); } catch (e) {}
    const klatkaWideo = () => {                                        // f(): wymuś narysowanie klatki po przewinięciu
      const id = ++nr, go = () => { if (id !== nr || !v.paused) return; const p = v.play(); p && p.then(() => { if (id === nr) v.pause(); }).catch(() => {}); };
      if (v.requestVideoFrameCallback) v.requestVideoFrameCallback(go); else requestAnimationFrame(go);
    };
    const doCzasu = (p) => { const t = Math.max(0, Math.min(+p || 0, 1)) * dl; try { v.pause(); } catch (e) {} try { if (Math.abs(v.currentTime - t) > .001) v.currentTime = t; } catch (e) {} if (scrub) klatkaWideo(); };
    return {
      ready,
      get scrub() { return scrub; },
      postep(p) { if (!gra) doCzasu(p); },
      async graj(tempo) {
        if (apple()) { scrub = true; pok(true); doCzasu(0); return false; }
        gra = true; scrub = false; pok(true);
        if (v.readyState < 2) await Promise.race([new Promise((r) => v.addEventListener('canplay', r, { once: true })), new Promise((r) => setTimeout(r, 1200))]);
        try { v.pause(); v.currentTime = 0; v.playbackRate = 1; await v.play(); v.playbackRate = tempo; return true; }
        catch (e) { gra = false; scrub = true; doCzasu(0); return false; }   // bez odtwarzania: przewijanie ręczne
      },
      stop() { gra = false; scrub = false; nr++; try { v.pause(); if (v.duration && isFinite(v.duration)) v.currentTime = Math.max(0, v.duration - .001); } catch (e) {} },
      pokaz: () => pok(true),
      ukryj() { this.stop(); pok(false); },
    };
  }

  /* ---------- wejście tekstu i kart hero (ci) ---------- */
  function wejscieHero() {
    try { window.__heroAnimationStarted = true; document.dispatchEvent(new CustomEvent('hero:ready')); } catch (e) {}
    const teksty = [...document.querySelectorAll('.section_hero .is-h1-span, .section_hero .eyebrow-l')];
    const karty = [...document.querySelectorAll('.section_hero .card')];
    const mob = SM.mq('(max-width: 991px)');
    const tl = E.timeline();
    teksty.forEach((el, i) => {
      const t = i * .03;
      tl.set(el, { autoAlpha: 1 }, t);
      tl.fromTo(el, { yPercent: el.matches('.eyebrow-l') ? 130 : 110, y: 0 }, { yPercent: 0, y: 0, duration: 1.2, ease: 'main', overwrite: 'auto' }, t);
    });
    karty.forEach((el, i) => {
      const w = [110, 120][i] ?? 100;
      tl.set(el, { autoAlpha: 1 }, .5);
      if (mob) tl.fromTo(el, { y: el.offsetHeight * w / 100 }, { y: 0, duration: 1.2, ease: 'main', overwrite: 'auto' }, .5);
      else tl.fromTo(el, { yPercent: w }, { yPercent: 0, duration: 1.2, ease: 'main', overwrite: 'auto' }, .5);
    });
    window.__heroAnimationTimeline = tl;
    return tl;
  }

  SM.sekcja('01-hero', () => {
    const hero = document.querySelector('.section_hero'); if (!hero) return;
    const cv = hero.querySelector('.hero-seq'), v = hero.querySelector('.hero-intro');
    const war = innerWidth <= 991 ? WAR.mobile : WAR.desktop;             // pl(): wariant raz, przy starcie
    const seq = sekwencja(cv, war);
    let tryb = 'intro';

    // przewijanie → klatka (yp(): postęp = przewinięcie / (wysokość okna × 100 / 100), bez opóźnienia)
    const zPrzewiniecia = () => seq.postep(Math.max(0, Math.min((SM.lenis.scroll || 0) / innerHeight, 1)));
    function przewijana() {
      tryb = 'scroll';
      zPrzewiniecia();
      SM.lenis.on('scroll', () => { if (tryb === 'scroll') zPrzewiniecia(); });
      ScrollTrigger.addEventListener('refresh', () => { if (tryb === 'scroll') { zPrzewiniecia(); seq.odswiez(); } });
      try { new ResizeObserver(() => { if (tryb === 'scroll') seq.odswiez(); }).observe(cv.parentElement); } catch (e) {}
    }
    window.__heroSeq = seq;                                               // dla pomiarów: __heroSeq.klatka

    if (!SM.intro) {                                                      // ?intro=0: stan po wejściu od razu
      const ld = document.querySelector('.loader'); if (ld) ld.remove();
      seq.ready.then(() => { przewijana(); seq.tlo(); });
      return;
    }

    const fm = film(v, war);
    const gotowe = Promise.all([fm.ready, seq.ready]).then(() => seq.tlo());

    // przekazanie film → płótno (finishIntroHandoff) i wiązanie przewijania (Ka)
    async function przekaz() {
      fm.stop(); tryb = 'intro-koniec'; fm.postep(1); fm.pokaz();
      if (!seq.odswiez() || seq.klatka !== 0) await seq.upewnij(0);
      seq.pokaz(); requestAnimationFrame(() => fm.ukryj());
      przewijana();
    }

    /* ---------- plansza (_p) ---------- */
    const n = document.querySelector('.loader');
    const r = n.querySelector('.loader-logo_wrap'), t = n.querySelector('.logo-inner'), i = n.querySelector('.is-logo-icon');
    const o = n.querySelector('.logo-icon'), s = n.querySelector('.logo-square'), a = n.querySelector('.is-logo-text');
    const c = a.querySelector('.logo-text');
    const litery = [...c.querySelectorAll('text')];
    const m = t.getBoundingClientRect().width;
    const v746 = 7.46 * (parseFloat(getComputedStyle(r).fontSize) || 16);
    E.set(a, { opacity: 0 }); E.set(r, { backgroundColor: 'transparent' }); E.set(s, { width: '0%', height: '0%' });
    E.set(i, { overflow: 'hidden' }); E.set(o, { autoAlpha: 0, yPercent: 100, rotation: 70, transformOrigin: '50% 50%' });

    // ramka logo: osobny element nad wszystkim, co klatkę na prostokącie .loader-logo_wrap
    const b = document.createElement('div'); b.className = 'loader-logo_outline'; document.body.appendChild(b);
    E.set(b, { position: 'fixed', pointerEvents: 'none', zIndex: 2147483647, autoAlpha: 0, mixBlendMode: 'normal' });
    const sledz = () => { const R = r.getBoundingClientRect(); E.set(b, { left: R.left, top: R.top, width: R.width, height: R.height }); };
    sledz(); E.ticker.add(sledz); addEventListener('resize', sledz);
    const bezRamki = () => { E.ticker.remove(sledz); removeEventListener('resize', sledz); b.remove(); };

    const koniec = () => {                                                // k()
      bezRamki(); n.remove();
      przekaz().then(() => { ScrollTrigger.refresh(); SM.loaderDone(); });
    };

    const x = E.timeline({ paused: true, defaults: { ease: 'main' } });
    x.to(s, { width: '100%', height: '100%', duration: .8 }, 0);
    x.to(o, { autoAlpha: 1, yPercent: 0, rotation: 0, duration: .8 }, 0);
    x.set(r, { backgroundColor: 'var(--primary)' }, '>');
    x.set(b, { autoAlpha: 1 }, '>');
    x.to(a, { opacity: 1, duration: .3 }, '<');
    x.to(r, { width: m, duration: .8 }, '<');
    x.from(litery, { yPercent: (k) => 100 + k * 40, stagger: .02, duration: .8 }, '<');
    x.set(r, { justifyContent: 'flex-end' });
    x.to(r, { width: v746, duration: .3 });

    const z = {                                                           // oś filmu wejścia (1,8 s)
      duration: DR, ease: 'main',
      onStart: () => { seq.tlo(); fm.graj(INTRO_S / DR); },
      onUpdate() { if (fm.scrub) fm.postep(this.progress()); },
    };
    const zanik = SM.mq('(max-width: 991px)') || apple();
    if (zanik) {                                                          // ≤991 px i Safari: plansza gaśnie
      x.add(bezRamki);
      x.add(() => wejscieHero(), '>');
      x.addLabel('heroIntro', '<'); x.to({}, z, '<');
      x.to(n, { opacity: 0, duration: DR, ease: 'main' }, '<');
      x.add(koniec);
    } else {                                                              // ≥992 px: ramka napisu rośnie do ekranu
      let dziura = null;
      x.add(() => {
        const Y = a.getBoundingClientRect(), X = c.getBoundingClientRect(), J = getComputedStyle(a), ml = parseFloat(J.marginLeft) || 0;
        document.body.appendChild(a); i.remove(); r.remove(); bezRamki();
        Object.assign(a.style, { position: 'fixed', left: Y.left - ml + 'px', top: Y.top + 'px', width: Y.width + 'px', height: Y.height + 'px',
          overflow: 'visible', zIndex: '1001', marginLeft: ml + 'px' });
        Object.assign(c.style, { position: 'fixed', left: X.left + 'px', top: X.top + 'px', width: X.width + 'px', height: X.height + 'px',
          pointerEvents: 'none', zIndex: '1002', willChange: 'opacity', backfaceVisibility: 'hidden', transform: 'translateZ(0)' });
        const NS = 'http://www.w3.org/2000/svg', W = innerWidth, H = innerHeight;
        const svg = document.createElementNS(NS, 'svg'), defs = document.createElementNS(NS, 'defs'), mask = document.createElementNS(NS, 'mask');
        const caly = document.createElementNS(NS, 'rect'), otw = document.createElementNS(NS, 'rect');
        svg.setAttribute('width', '0'); svg.setAttribute('height', '0'); svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
        svg.setAttribute('preserveAspectRatio', 'none'); Object.assign(svg.style, { position: 'absolute', width: '0', height: '0' });
        mask.setAttribute('id', 'pageRevealMask'); mask.setAttribute('maskUnits', 'userSpaceOnUse'); mask.setAttribute('maskContentUnits', 'userSpaceOnUse');
        mask.setAttribute('style', 'mask-type:luminance;');
        for (const [k, w] of [['x', 0], ['y', 0], ['width', W], ['height', H], ['fill', 'white']]) caly.setAttribute(k, String(w));
        const rx = parseFloat(J.borderTopLeftRadius) || (parseFloat(getComputedStyle(document.documentElement).fontSize) || 16) * .5;
        for (const [k, w] of [['x', Y.left], ['y', Y.top], ['width', Y.width], ['height', Y.height], ['fill', 'black'], ['rx', rx], ['ry', rx]]) otw.setAttribute(k, String(w));
        mask.append(caly, otw); defs.appendChild(mask); svg.appendChild(defs); a.appendChild(svg);
        n.style.mask = 'url(#pageRevealMask)'; n.style.webkitMask = 'url(#pageRevealMask)';
        dziura = otw;
      });
      x.to(a, { left: () => '-24px', top: () => '-24px', width: () => innerWidth + 48 + 'px', height: () => innerHeight + 48 + 'px', marginLeft: 0,
        duration: DR, ease: 'main' });
      x.to(a, { backgroundColor: 'transparent', duration: PP, ease: 'main' }, '<');
      x.add(() => { if (dziura) E.to(dziura, { attr: { x: -24, y: -24, width: innerWidth + 48, height: innerHeight + 48 }, duration: DR, ease: 'main' }); }, '<');
      x.add(() => wejscieHero(), '<');
      x.addLabel('heroIntro', '<'); x.to({}, z, '<');
      x.to(c, { opacity: 0, duration: DR, ease: 'main' }, '<');
      x.add(() => { a.remove(); koniec(); });
    }
    window.__loaderTimeline = x;

    let ruszyla = false;
    const rusz = () => { if (ruszyla) return; ruszyla = true; fm.postep(0); fm.ukryj(); x.play(0); };   // H()
    gotowe.then(rusz, rusz); setTimeout(rusz, 1500);
  });
})();
