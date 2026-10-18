/* 07-zespol: sekcja „Nasz zespół”. Ruch z kodu oryginału (orig/pretty):
   - przełącznik i cytaty (testimonials.js q()): wskaźnik .toggle-indicator xPercent = numer × 110, 0,6 s 'main' (krzywa
     'custom' oryginału = M0,0 C0.6,0 0,1 1,1); najechanie na opcję przesuwa wskaźnik i podświetla numer (kolor .8 s
     cubic-bezier(.5,0,0,1)), zjazd z całego bloku wraca do aktywnego; klik: stop zegara, zmiana cytatu bez ruchu
     wskaźnika (ruszył już przy najechaniu), start zegara; zegar: co 5 s następny cytat, tylko gdy blok .testimonials jest
     widoczny w ≥25% (IntersectionObserver)
   - zmiana cytatu (L(), A()): stary cytat znika od razu (display none), nowy (display flex) dzielony na słowa i wiersze
     (.testimonial-line overflow hidden > .testimonial-line-inner), wiersze obu akapitów yPercent 100 → 0, 0,6 s 'main',
     kaskada 0,05 s; cały cytat opacity 0 → 1, 0,6 s 'main'
   - karty (cards-reveal.js, jak w 03): autoAlpha 0 → 1, y 2em → 0, 0,8 s power2.out, ScrollTrigger 'top 85%', once;
     do startu klasa .is-card-reveal-pending
   - ikony kart (service-icons.js): Lottie „Icon 01–05” (data-lottie 6–10), najechanie karty: pierwsza połowa od 0,
     zjazd: druga połowa; własne SVG z czasami i krzywymi z JSON (rejestracja niżej)
   - akapity cytatów tr="1": komponent 00. Karty bez najechania (poza ikoną), przycisk „Oferty pracy”: komponent 00. */
(function () {
  const I = window.SM && window.SM.ikony;
  if (!I) return;
  const { K, klucze } = I;
  let licznik = 0;
  const f2 = (v) => (+v).toFixed(2);

  // łamana z zaokrąglonymi narożnikami (promień r); zamknięta albo otwarta
  function zaokr(P, r, zamkn) {
    const n = P.length; let d = '';
    const wew = (i) => zamkn || (i > 0 && i < n - 1);
    for (let i = 0; i < n; i++) {
      const c = P[i];
      if (!wew(i)) { d += (i === 0 ? 'M' : 'L') + f2(c[0]) + ',' + f2(c[1]); continue; }
      const a = P[(i + n - 1) % n], b = P[(i + 1) % n];
      const da = Math.hypot(a[0] - c[0], a[1] - c[1]), db = Math.hypot(b[0] - c[0], b[1] - c[1]);
      const ta = Math.min(r, da / 2) / da, tb = Math.min(r, db / 2) / db;
      const p1 = [c[0] + (a[0] - c[0]) * ta, c[1] + (a[1] - c[1]) * ta], p2 = [c[0] + (b[0] - c[0]) * tb, c[1] + (b[1] - c[1]) * tb];
      d += (i === 0 ? 'M' : 'L') + f2(p1[0]) + ',' + f2(p1[1]) + 'Q' + f2(c[0]) + ',' + f2(c[1]) + ' ' + f2(p2[0]) + ',' + f2(p2[1]);
    }
    return d + (zamkn ? 'Z' : '');
  }
  const lerp = (a, b, t) => a + (b - a) * t;
  const lp = (A, B, t) => A.map((p, i) => [lerp(p[0], B[i][0], t), lerp(p[1], B[i][1], t)]);
  const T = (a, b, t0, t1, t2, t3, e1, e2) => [[t0, a, ...e1], [t1, b, .167, .833], [t2, b, ...e2], [t3, a]];   // tam i z powrotem

  /* ---- trybik (Operacje; oryginał Icon 01: 60 kl./s, 181 kl.; obrót 0 → 92° kl. 0→45 (.7/.3), 92 → 90° 45→75 (.33/.27),
     90 → −2° 105→150 (.7/.3), → 0° 150→180 (.33/.27); koło środka r 8,73 → 7,67 kl. 0→45, wraca 105→150 (.7/.3)) ---- */
  const kolo6 = (() => {
    const P = [];
    for (let i = 0; i < 144; i++) {
      const a = i / 144 * Math.PI * 2, c = Math.cos(a * 6);
      const r = 23.6 + 4.6 * Math.sign(c) * Math.pow(Math.abs(c), .55);
      P.push((r * Math.cos(a - Math.PI / 2)).toFixed(2) + ',' + (r * Math.sin(a - Math.PI / 2)).toFixed(2));
    }
    return 'M' + P.join('L') + 'Z';
  })();
  I.rejestruj('trybik', { fps: 60, klatki: 181,
    svg: `<g class="b-rot"><path d="${kolo6}"/></g><circle class="b-o" r="8.73"/>`,
    os(svg, tl, sek) {
      const rot = svg.querySelector('.b-rot'), o = svg.querySelector('.b-o');
      gsap.set(rot, { svgOrigin: '0 0' });
      klucze(tl, rot, sek, [[0, { rotation: 0 }, .7, .3], [45, { rotation: 92 }, .33, .27], [75, { rotation: 90 }, .17, .67],
        [105, { rotation: 90 }, .7, .3], [150, { rotation: -2 }, .33, .27], [180, { rotation: 0 }]]);
      const p = { r: 8.73 };
      klucze(tl, p, sek, [[0, { r: 8.73 }, .7, .3], [45, { r: 7.67 }, .7, .3], [105, { r: 7.67 }, .7, .3], [150, { r: 8.73 }]],
        () => o.setAttribute('r', f2(p.r)));
    } });

  /* ---- diament (Procesy jakości; Icon 02: 60 kl./s, 182 kl.; obrys ściska się do ~85% szerokości kl. 0→45 (1/.84), wraca
     45→88 (.16/0), drugi raz 92→135→180; trzy ściany (łamane po 3 punkty) przesuwają się w lewo kl. 0→88 (.8/.2), wracają
     92→180; ściany przycięte do obrysu) ---- */
  I.rejestruj('diament', { fps: 60, klatki: 182,
    svg: '<defs><clipPath><path class="d-clip"/></clipPath></defs><path class="d-obrys"/><path class="d-pas"/>' +
      '<g class="d-sciany"><path class="d-s7"/><path class="d-s11"/><path class="d-s9"/></g>',
    os(svg, tl, sek) {
      const id = 'ik-diament-' + (++licznik);
      svg.querySelector('clipPath').id = id;
      svg.querySelector('.d-sciany').setAttribute('clip-path', `url(#${id})`);
      const q = svg.querySelector.bind(svg);
      const klip = q('.d-clip'), obrys = q('.d-obrys'), pas = q('.d-pas');
      const s7 = q('.d-s7'), s11 = q('.d-s11'), s9 = q('.d-s9');
      const A7 = [[26.4, -28.65], [40.3, -10.7], [-.5, 28.95]], B7 = [[2.4, -28.95], [11.7, -10.67], [-.5, 28.95]];
      const A11 = B7.slice(), B11 = [[-3.5, -28.95], [-12.7, -10.6], [-.5, 28.95]];
      const A9 = [[-.5, 28.95], [-12.65, -10.67], [-3.5, -28.95]], B9 = [[-.5, 28.95], [-38.1, -10.75], [-25.6, -28.99]];
      const st = { q: 0, f: 0 };
      const poly = (P) => 'M' + P.map((p) => f2(p[0]) + ',' + f2(p[1])).join('L');
      const rys = () => {
        const S = [[lerp(18.29, 13.4, st.q), -28.95], [lerp(-18.29, -15.29, st.q), -28.95], [lerp(-30.48, -27.03, st.q), -10.67],
          [0, 28.95], [lerp(30.48, 25.14, st.q), -10.67]];
        const d = poly([S[1], S[0], S[4], S[3], S[2]]) + 'Z';
        klip.setAttribute('d', d); obrys.setAttribute('d', zaokr([S[1], S[0], S[4], S[3], S[2]], 2.5, true));
        pas.setAttribute('d', `M${f2(S[2][0])},-10.67H${f2(S[4][0])}`);
        s7.setAttribute('d', poly(lp(A7, B7, st.f))); s11.setAttribute('d', poly(lp(A11, B11, st.f)));
        s9.setAttribute('d', poly(lp(A9, B9, st.f)));
      };
      klucze(tl, st, sek, [[0, { q: 0 }, 1, .84], [45, { q: 1 }, .16, 0], [88, { q: 0 }, .17, .83], [92, { q: 0 }, 1, .84],
        [135, { q: 1 }, .16, 0], [180, { q: 0 }]], rys);
      klucze(tl, st, sek, [[0, { f: 0 }, .8, .2], [88, { f: 1 }, .17, .83], [92, { f: 1 }, .8, .2], [180, { f: 0 }]], rys);
      rys();
    } });

  /* ---- serce (Ochrona; Icon 03: 60 kl./s, 182 kl.; serce pulsuje 1 → 1,02 → 1 (kl. 0→40 1/.67, 40→80 .33/.3), drugi raz
     od 100; linia pulsu znika od początku kl. 10→70 (.7/.3), rysuje się od nowa kl. 108→168 (.7/.3)) ---- */
  I.rejestruj('serce', { fps: 60, klatki: 182,
    svg: '<g class="s-serce"><path d="M0,-21C-6,-30 -22,-31 -29,-19C-34,-9 -30,0 -22,7L0,29L22,7C30,0 34,-9 29,-19C22,-31 6,-30 0,-21Z"/></g>' +
      '<path class="s-p1" d="M-28,0H-8L-6.4,-3.2L0,11.2L6.4,-11.2L11.2,0H28"/><path class="s-p2" d="M-28,0H-8L-6.4,-3.2L0,11.2L6.4,-11.2L11.2,0H28"/>',
    os(svg, tl, sek) {
      const g = svg.querySelector('.s-serce');
      gsap.set(g, { svgOrigin: '0 0' });
      klucze(tl, g, sek, [[0, { scale: 1 }, 1, .67], [40, { scale: 1.02 }, .33, .3], [80, { scale: 1 }, .17, .2],
        [100, { scale: 1 }, 1, .67], [140, { scale: 1.02 }, .33, .3], [180, { scale: 1 }]]);
      const a = I.trim(svg.querySelector('.s-p1')), b = I.trim(svg.querySelector('.s-p2'));
      b.e = 0; b.set();
      klucze(tl, a, sek, [[10, { s: 0 }, .7, .3], [70, { s: 1 }]], a.set);
      klucze(tl, b, sek, [[108, { e: 0 }, .7, .3], [168, { e: 1 }]], b.set);
    } });

  /* ---- pachołek (Serwis; Icon 04: 60 kl./s, 182 kl.; cały znak w dół o 2 kl. 0→38 (1/.67), wraca 38→75 (.33/0), drugi raz
     od 105; pasy: łuk z czubka rozkłada się wzdłuż stożka: pas 1 kl. 40,9→88 / 92→144,8, pas 2 34,6→81,7 / 99→151,8,
     pas 3 28,3→75,4 / 106,1→158,9, pas 4 22→69,1 / 113,1→165,9, pas 5 15,7→62,9 / 120,2→173 (wszystkie .8/.2)) ---- */
  I.rejestruj('pacholek', { fps: 60, klatki: 182,
    svg: '<g class="c-wszystko"><path d="M-15.5,11L-5.2,-26.5Q0,-32 5.2,-26.5L15.5,11"/><path d="M-15.5,11A15.5,5 0 0 0 15.5,11"/>' +
      '<path d="M-17,10L-31,17L0,32L31,17L17,10"/><path class="c-p1"/><path class="c-p2"/><path class="c-p3"/><path class="c-p4"/>' +
      '<path class="c-p5"/></g>',
    os(svg, tl, sek) {
      const wsz = svg.querySelector('.c-wszystko');
      klucze(tl, wsz, sek, [[0, { y: 0 }, 1, .67], [38, { y: 2 }, .33, 0], [75, { y: 0 }, .17, .83], [105, { y: 0 }, 1, .67],
        [142, { y: 2 }, .33, 0], [180, { y: 0 }]]);
      const R3 = [[2.7, -15.1], [0, -14.5], [-2.7, -15.1]];
      const pasy = [
        { A: R3, B: [[6.6, -4.4], [0, -2.5], [-6.6, -4.4]], y: -14.26, t: [40.9, 88, 92, 144.8] },
        { A: R3, B: [[9.7, 5.9], [-.1, 8.9], [-9.8, 5.9]], y: -14.26, t: [34.6, 81.7, 99, 151.8] },
        { A: [[-2.4, -29.3], [-1.3, -28.8], [0, -28.7], [1.3, -28.8], [2.4, -29.3]],
          B: [[-12.5, 2.6], [-7, 5], [0, 5.8], [7, 5], [12.5, 2.6]], y: -.6, t: [28.3, 75.4, 106.1, 158.9] },
        { A: [[8.2, -.6], [0, .6], [-8.2, -.6]], B: [[15.3, 25.1], [0, 30.8], [-15.3, 25.1]], y: -14.26, t: [22, 69.1, 113.1, 165.9] },
        { A: [[-11.8, -1.5], [-6.6, .7], [0, 1.5], [6.6, .7], [11.8, -1.5]],
          B: [[-14.3, 11.9], [-8, 15.7], [0, 17.1], [8, 15.7], [14.3, 11.9]], y: -.6, t: [15.7, 62.9, 120.2, 173] }];
      pasy.forEach((p, i) => {
        const el = svg.querySelector('.c-p' + (i + 1)), st = { u: 0 };
        const rys = () => {
          const P = lp(p.A, p.B, st.u).map((a) => [a[0], a[1] + p.y]);
          const c = (a, m, b) => [2 * m[0] - (a[0] + b[0]) / 2, 2 * m[1] - (a[1] + b[1]) / 2];
          let d = 'M' + f2(P[0][0]) + ',' + f2(P[0][1]);
          for (let j = 0; j + 2 < P.length; j += 2) { const k = c(P[j], P[j + 1], P[j + 2]); d += `Q${f2(k[0])},${f2(k[1])} ${f2(P[j + 2][0])},${f2(P[j + 2][1])}`; }
          el.setAttribute('d', d);
          el.style.visibility = i < 3 && st.u < .004 ? 'hidden' : '';   // pasy 1–3 stoją na czubku: w oryginale zasłania je maska stożka
        };
        const [a, b, c, e] = p.t;
        klucze(tl, st, sek, [[a, { u: 0 }, .8, .2], [b, { u: 1 }, .167, .833], [c, { u: 1 }, .8, .2], [e, { u: 0 }]], rys);
        rys();
      });
    } });

  /* ---- teczka (Administracja; Icon 05: 60 kl./s, 182 kl.; przednia klapa zamyka się kl. 8→40 (.8/.2), stoi do 100, otwiera
     się 100→153,3 (.8/.2); znak przesuwa się x −1,33 kl. 0→48 (.8/.2), wraca 48→80 (.33/.2), +1 kl. 100→153,3 (.8/.2),
     wraca 153,3→180 (.33/.67)) ---- */
  I.rejestruj('teczka', { fps: 60, klatki: 182,
    svg: '<g class="t-wszystko"><path class="t-d"/></g>',
    os(svg, tl, sek) {
      const wsz = svg.querySelector('.t-wszystko'), el = svg.querySelector('.t-d');
      const st = { m: 0 };
      const rys = () => {
        const m = st.m;
        const P = [[lerp(26.94, 26.9, m), lerp(-5.5, -7.5, m)], [26.94, -18.5], [.2, -18.5], [-9, -28.6], [-33.7, -28.6], [-33.7, 28.6],
          [21.7, 28.6], [lerp(33.5, 28.3, m), lerp(3.4, 3.4, m)], [26.9, -5.1], [lerp(-9.3, -16.8, m), -5.1],
          [lerp(-20.2, -22.4, m), lerp(8.4, 10.6, m)]];
        el.setAttribute('d', zaokr(P, 4.5, false));
      };
      klucze(tl, st, sek, [[8, { m: 0 }, .8, .2], [40, { m: 1 }, .167, .833], [100, { m: 1 }, .8, .2], [153.3, { m: 0 }, .167, .833],
        [180, { m: 0 }]], rys);
      klucze(tl, wsz, sek, [[0, { x: 0 }, .8, .2], [48, { x: -1.33 }, .33, .2], [80, { x: 0 }, .8, .2], [100, { x: 0 }, .8, .2],
        [153.3, { x: 1 }, .33, .67], [180, { x: 0 }]]);
      rys();
    } });
})();

SM.sekcja('07-zespol', () => {
  const sek = document.querySelector('.section_teams');
  if (!sek) return;
  const karty = Array.from(sek.querySelectorAll('.team-card'));

  // ---- wjazd kart (cards-reveal.js) ----
  karty.forEach((k) => {
    k.classList.add('is-card-reveal-pending');
    gsap.fromTo(k, { autoAlpha: 0, y: '2em' }, { autoAlpha: 1, y: 0, duration: .8, ease: 'power2.out', immediateRender: false,
      onStart: () => k.classList.remove('is-card-reveal-pending'),
      scrollTrigger: { trigger: k, start: 'top 85%', once: true, invalidateOnRefresh: true } });
  });

  // ---- ikony ----
  if (SM.ikony) karty.forEach((k) => {
    const el = k.querySelector('[data-ikona]');
    if (el && SM.ikony.wstaw(el, el.dataset.ikona)) SM.ikony.karta(k, el);
  });

  // ---- cytaty (testimonials.js) ----
  const blok = sek.querySelector('.testimonials');
  if (!blok) return;
  const opcje = Array.from(blok.querySelectorAll('.toggle-option'));
  const wskaznik = blok.querySelector('.toggle-indicator');
  const cytaty = Array.from(blok.querySelectorAll('.testimonial'));
  const ids = Array.from(blok.querySelectorAll('.toggle-id'));
  if (opcje.length < 2 || !wskaznik || cytaty.length < 2) return;

  // słowa → wiersze (A()): offsetTop słów po zmianie na display flex
  function podziel(p) {
    if (!p.dataset.orig) p.dataset.orig = (p.innerText || p.textContent || '').replace(/[ \t]*\n[ \t]*/g, ' ');
    let tekst = p.dataset.orig;                                   // „nowrap” z HTML (spięte słowa) jako twarde spacje: słowo = jednostka
    JSON.parse(p.dataset.glue || '[]').forEach((g) => { tekst = tekst.split(g).join(g.replace(/ /g, String.fromCharCode(160))); });
    p.textContent = tekst;
    const slowa = p.textContent.trim().split(/ +/).map((s) => {
      const w = document.createElement('span'); w.className = 'testimonial-word'; w.style.display = 'inline-block'; w.textContent = s; return w;
    });
    p.textContent = '';
    slowa.forEach((w, i) => { if (i) p.appendChild(document.createTextNode(' ')); p.appendChild(w); });
    const wiersze = []; let y = null, biez = [];
    slowa.forEach((w) => { const t = w.offsetTop; if (y === null) y = t; if (t !== y && biez.length) { wiersze.push(biez); biez = []; y = t; } biez.push(w); });
    if (biez.length) wiersze.push(biez);
    p.textContent = '';
    return wiersze.map((ws) => {
      const l = document.createElement('span'); l.className = 'testimonial-line'; l.style.cssText = 'display:block;overflow:hidden';
      const w = document.createElement('span'); w.className = 'testimonial-line-inner'; w.style.display = 'inline-block';
      ws.forEach((x, i) => { if (i) w.appendChild(document.createTextNode(' ')); w.appendChild(x); });
      l.appendChild(w); p.appendChild(l); return w;
    });
  }
  function wiersze(c) {
    const wszystkie = [];
    c.querySelectorAll('p.body-xl').forEach((p) => wszystkie.push(...podziel(p)));
    if (wszystkie.length) {
      gsap.killTweensOf(wszystkie); gsap.set(wszystkie, { yPercent: 100 });
      gsap.to(wszystkie, { yPercent: 0, duration: .6, ease: 'main', stagger: .05, overwrite: 'auto' });
    }
  }

  cytaty.forEach((c) => c.querySelectorAll('p.body-xl').forEach((p) => {
    p.dataset.glue = JSON.stringify([...p.querySelectorAll('.nowrap')].map((s) => s.textContent.replace(/\s+/g, ' ').trim()));
  }));
  let akt = Math.max(0, ids.findIndex((e) => e.classList.contains('is-active')));
  cytaty.forEach((c, i) => gsap.set(c, { opacity: i === akt ? 1 : 0 }));
  gsap.set(wskaznik, { xPercent: akt * 110 });
  const numery = (n) => ids.forEach((e, i) => e.classList.toggle('is-active', i === n));
  const wskaz = (n) => gsap.to(wskaznik, { duration: .6, xPercent: n * 110, ease: 'main', overwrite: 'auto' });

  function przelacz(n, ruch = true) {
    if (n === akt) return;
    if (ruch) wskaz(n);
    numery(n);
    const stary = cytaty[akt], nowy = cytaty[n];
    if (stary && nowy && stary !== nowy) {
      stary.classList.remove('is-active'); nowy.classList.add('is-active');
      wiersze(nowy);
      gsap.to(stary, { duration: .6, opacity: 0, ease: 'main', overwrite: 'auto' });
      gsap.to(nowy, { duration: .6, opacity: 1, ease: 'main', overwrite: 'auto' });
    }
    akt = n;
  }

  let zegar = null;
  const start = () => { if (!zegar) zegar = setInterval(() => przelacz((akt + 1) % opcje.length), 5000); };
  const stop = () => { if (zegar) { clearInterval(zegar); zegar = null; } };
  new IntersectionObserver((w) => w.forEach((e) => { if (e.target === blok) (e.isIntersecting ? start : stop)(); }), { threshold: .25 })
    .observe(blok);

  opcje.forEach((o, i) => {
    o.addEventListener('mouseenter', () => { wskaz(i); numery(i); });
    o.addEventListener('click', () => { stop(); przelacz(i, false); start(); });
  });
  blok.addEventListener('mouseleave', () => { wskaz(akt); numery(akt); });
});
