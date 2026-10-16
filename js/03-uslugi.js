/* 03-uslugi: sekcja „Nasze usługi”. Ruch z kodu oryginału (orig/pretty):
   - wjazd kart (cards-reveal.js S()): każda karta osobno, autoAlpha 0 → 1, y 2em → 0, 0,8 s power2.out, ScrollTrigger
     trigger karta, start 'top 85%', once; do startu klasa .is-card-reveal-pending (krycie 0); wszystkie szerokości
   - najechanie karty ≥992 (service-cards.js $ / P): tło białe → --accent, opis .desc height 0 → wysokość treści
     i opacity 0 → 1, tytuł translateY −(wysokość opisu + odstęp .card-inner 1,15em), wiersze opisu (SplitText, span.line >
     span.line-inner) translateY 100% → 0 z opóźnieniem i × 0,03 s; wszystko przejściami CSS 0,8 s cubic-bezier(.5,0,0,1);
     zjazd: to samo wstecz, wiersze od ostatniego (opóźnienia odwrócone); po dojechaniu wysokość opisu = auto
   - obraz (service-cards.js T()): w 6. komórce .services-viewer obraz is-N karty N: display block, opacity 0 → 1 0,5 s
     cubic-bezier(.5,0,0,1), z-index 2; przycisk opacity → 0 (0,5 s), potem display none; zjazd: obraz opacity → 0 (0,5 s),
     przycisk wraca, gdy żadna karta nie jest pod myszą; ≤991 obrazów brak
   - ikony (service-icons.js, Lottie „Icon 06–10”, 60 kl./s): stoją na klatce 0, najechanie karty: pierwsza połowa od 0,
     zjazd: druga połowa (js/ikony.js SM.ikony.karta); bez gry przy wejściu sekcji (tylko .stats-card ją mają)
   - akapit tr="1": komponent 00. */
(function () {
  const I = window.SM && window.SM.ikony;
  if (!I) return;
  const { K, klucze } = I;
  let licznik = 0;

  // kreska od s do e z przesunięciem o (stopnie jak „offset” Trim Paths w Lottie); wzór kreski powtarza się co długość
  // ścieżki, więc przesunięcie zawija się na zamkniętej ścieżce jak w Lottie
  function trimO(el) {
    const len = el.getTotalLength();
    const o = { s: 0, e: 1, o: 0 };
    o.set = () => {
      const d = Math.max(0, o.e - o.s) * len;
      el.style.visibility = d < .01 ? 'hidden' : '';
      el.style.strokeDasharray = `${d} ${Math.max(0, len - d) + .001}`;
      el.style.strokeDashoffset = -(o.s + o.o / 360) * len;
    };
    o.set();
    return o;
  }
  // kreska po kilku ścieżkach po kolei (Trim Paths „individually” na scalonych ścieżkach)
  function trimWiele(els) {
    const dl = els.map((el) => el.getTotalLength());
    const suma = dl.reduce((a, b) => a + b, 0);
    const o = { s: 0, e: 1 };
    o.set = () => {
      let pocz = 0;
      els.forEach((el, i) => {
        const a = Math.max(0, o.s * suma - pocz), b = Math.min(dl[i], o.e * suma - pocz);
        const d = Math.max(0, b - a);
        el.style.visibility = d < .01 ? 'hidden' : '';
        el.style.strokeDasharray = `${d} ${dl[i] + 1}`;
        el.style.strokeDashoffset = -a;
        pocz += dl[i];
      });
    };
    o.set();
    return o;
  }
  const tam = (a, b, t0, t1, t2, t3, e1, e2) =>      // a → b (t0 → t1, krzywa e1), stoi, b → a (t2 → t3, krzywa e2)
    [[t0, a, ...e1], [t1, b, .167, .833], [t2, b, ...e2], [t3, a]];
  const E = [.8, .2];

  /* ---- plan (Inżynieria; oryginał Icon 06: 60 kl./s, 182 kl.; treść w ramce y 0 → −20,5 kl. 20→80, wraca 100→160;
     pionowa kreska x +16 kl. 10→70, wraca 110→170; narożnik wydłuża się o 26,2 kl. 0→60, wraca 120→180; krzywe .8/.2) ---- */
  I.rejestruj('plan', { fps: 60, klatki: 182,
    svg: '<defs><clipPath><rect x="-30" y="-28" width="60" height="56" rx="6"/></clipPath></defs>' +
      '<rect x="-30" y="-28" width="60" height="56" rx="6"/><g class="p-clip"><g class="p-tresc"><path d="M-34,-12H34"/>' +
      '<path class="p-pion" d="M-6,-12V18"/><path class="p-kat"/></g></g>',
    os(svg, tl, sek) {
      const id = 'ik-plan-' + (++licznik);
      svg.querySelector('clipPath').id = id;
      svg.querySelector('.p-clip').setAttribute('clip-path', `url(#${id})`);
      const tresc = svg.querySelector('.p-tresc'), pion = svg.querySelector('.p-pion'), kat = svg.querySelector('.p-kat');
      const k = { R: 13 };
      const rys = () => kat.setAttribute('d', `M-34,18H${(k.R - 6).toFixed(2)}A6,6 0 0 1 ${k.R.toFixed(2)},24V60`);
      klucze(tl, tresc, sek, tam({ y: 0 }, { y: -20.5 }, 20, 80, 100, 160, E, E));
      klucze(tl, pion, sek, tam({ x: 0 }, { x: 16 }, 10, 70, 110, 170, E, E));
      klucze(tl, k, sek, tam({ R: 13 }, { R: 39.2 }, 0, 60, 120, 180, E, E), rys);
      rys();
    } });

  /* ---- podpora (Obudowa; Icon 07: 60 kl./s, 182 kl.; słup −9,3…10,4 → −17,1…18,6, nasadki 8,2 / 9,1 do płyt;
     kl. 0→40, stoi do 140, wraca 140→180; krzywa .8/.2) ---- */
  I.rejestruj('podpora', { fps: 60, klatki: 182,
    svg: '<path d="M-34,-30H34M-34,30H34"/><path d="M-26,-25H26L19,-19.5H-19Z"/><path d="M-26,25H26L19,19.5H-19Z"/>' +
      '<path class="p-slup"/><g class="p-gora"><path d="M-6,-4V-1A6,5 0 0 0 6,-1V-4"/></g>' +
      '<g class="p-dol"><path d="M-6,4V1A6,5 0 0 1 6,1V4"/></g>',
    os(svg, tl, sek) {
      const slup = svg.querySelector('.p-slup'), g = svg.querySelector('.p-gora'), d = svg.querySelector('.p-dol');
      const s = { a: -9.3, b: 10.4 };
      const rys = () => slup.setAttribute('d', `M0,${s.a.toFixed(2)}V${s.b.toFixed(2)}`);
      klucze(tl, s, sek, tam({ a: -9.3, b: 10.4 }, { a: -17.1, b: 18.6 }, 0, 40, 140, 180, E, E), rys);
      klucze(tl, g, sek, tam({ y: -14.7 }, { y: -22.9 }, 0, 40, 140, 180, E, E));
      klucze(tl, d, sek, tam({ y: 13.8 }, { y: 22.9 }, 0, 40, 140, 180, E, E));
      rys();
    } });

  /* ---- gwiazda (Drążenie; Icon 08: 60 kl./s, 181 kl.; obrót 0 → 45° kl. 0→75, wraca 105→180 (.8/.2); kontur B znika
     od początku s 0 → 100% kl. 0→50 (1/.4), offset 0 → 30° (1/.67), wraca 130→180 (.6/0, .33/0); kontur A rysuje się
     e 0 → 100% kl. 25→75 (.6/.4), offset 6 → 35° (.3/0), wraca 105→155 (.6/.4, 1/.7)) ---- */
  const gw = (() => {
    let d = '';
    for (let i = 0; i < 12; i++) {
      const r = i % 2 ? 14.5 + (i % 4 === 1 ? 1.5 : 0) : 26 - (i % 4 === 0 ? 0 : 2);
      const a = (i * 30 - 90) * Math.PI / 180;
      d += (i ? 'L' : 'M') + (r * Math.cos(a)).toFixed(2) + ',' + (r * Math.sin(a)).toFixed(2);
    }
    return d + 'Z';
  })();
  I.rejestruj('gwiazda', { fps: 60, klatki: 181,
    svg: `<g class="g-rot"><path class="g-a" d="${gw}"/><path class="g-b" d="${gw}"/></g>`,
    os(svg, tl, sek) {
      const rot = svg.querySelector('.g-rot');
      const a = trimO(svg.querySelector('.g-a')), b = trimO(svg.querySelector('.g-b'));
      gsap.set(rot, { svgOrigin: '0 0' });
      klucze(tl, rot, sek, tam({ rotation: 0 }, { rotation: 45 }, 0, 75, 105, 180, E, E));
      klucze(tl, a, sek, [[25, { e: 0 }, .6, .4], [75, { e: 1 }, .167, .833], [105, { e: 1 }, .6, .4], [155, { e: 0 }]], a.set);
      klucze(tl, a, sek, [[25, { o: 6 }, .3, 0], [75, { o: 35 }, .167, .833], [105, { o: 35 }, 1, .7], [155, { o: 6 }]], a.set);
      klucze(tl, b, sek, [[0, { s: 0 }, 1, .4], [50, { s: 1 }, .167, .833], [130, { s: 1 }, .6, 0], [180, { s: 0 }]], b.set);
      klucze(tl, b, sek, [[0, { o: 0 }, 1, .67], [50, { o: 30 }, .167, .833], [130, { o: 30 }, .33, 0], [180, { o: 0 }]], b.set);
    } });

  /* ---- zebatka (Wydobycie; Icon 09: 60 kl./s, 182 kl.; kreska x −10 zwija się do góry kl. 0→40 (wraca 140→180), druga
     rośnie od dołu kl. 24→64 (wraca 116→156); koło zębate: obrót 0→74° kl. 0→50 (.8/.2), 74→70° 50→80 (.33/.67),
     70→74° 100→130, 74→0° 130→180 (.8/.2); promień 10,6 → 8,9 (u nas 8 → 6,7) kl. 0→50, wraca 130→180) ---- */
  I.rejestruj('zebatka', { fps: 60, klatki: 182,
    svg: '<path d="M27,-5V-23A4,4 0 0 0 23,-27H-23A4,4 0 0 0 -27,-23V23A4,4 0 0 0 -23,27H-5"/><path d="M7.6,-27V-7"/>' +
      '<path class="z-l1"/><path class="z-l2"/><g transform="translate(15 15)"><g class="z-kolo"><circle class="z-c" r="8"/>' +
      '<path class="z-zeby" stroke-width="2.5"/></g></g>',
    os(svg, tl, sek) {
      const l1 = svg.querySelector('.z-l1'), l2 = svg.querySelector('.z-l2'), kolo = svg.querySelector('.z-kolo');
      const c = svg.querySelector('.z-c'), zeby = svg.querySelector('.z-zeby');
      const p = { b: 27.4, a: 27.2, r: 8 };
      const rys = () => {
        l1.setAttribute('d', `M-10,-27.4V${p.b.toFixed(2)}`); l1.style.visibility = p.b < -27 ? 'hidden' : '';
        l2.setAttribute('d', `M-10,${p.a.toFixed(2)}V27.4`); l2.style.visibility = p.a > 27 ? 'hidden' : '';
        c.setAttribute('r', p.r.toFixed(2));
        let d = '';
        for (let i = 0; i < 8; i++) {
          const k = (i * 45 + 22.5) * Math.PI / 180, x = Math.cos(k), y = Math.sin(k);
          d += `M${(x * (p.r + 1.5)).toFixed(2)},${(y * (p.r + 1.5)).toFixed(2)}L${(x * 12.5).toFixed(2)},${(y * 12.5).toFixed(2)}`;
        }
        zeby.setAttribute('d', d);
      };
      gsap.set(kolo, { svgOrigin: '0 0' });
      klucze(tl, p, sek, tam({ b: 27.4 }, { b: -27.4 }, 0, 40, 140, 180, E, E), rys);
      klucze(tl, p, sek, tam({ a: 27.2 }, { a: -27.4 }, 24, 64, 116, 156, E, E), rys);
      klucze(tl, p, sek, tam({ r: 8 }, { r: 6.7 }, 0, 50, 130, 180, E, E), rys);
      klucze(tl, kolo, sek, [[0, { rotation: 0 }, .8, .2], [50, { rotation: 74 }, .33, .67], [80, { rotation: 70 }, 0, 1],
        [100, { rotation: 70 }, .33, .67], [130, { rotation: 74 }, .8, .2], [180, { rotation: 0 }]]);
      rys();
    } });

  /* ---- trasa (Odstawa; Icon 10: 60 kl./s, 182 kl.; węzły pulsują 1 → .86 → 1 (1/.67, .33/0) od kl. 0 / 16 / 32 i drugi
     raz od 90 / 102 / 114; strzałka zwija się do środka kl. 30→44 (1/.999), wraca 152→180 (.33/0); trasa znika od
     początku kl. 0→42 (1/.999), rysuje się od nowa 110→162 (.33/0); w miejscu strzałki węzeł: skala .84 → 1,045 kl.
     44→64 (.001/0), → 1 (64→84, .33/.67), znika 110→130 liniowo) ---- */
  I.rejestruj('trasa', { fps: 60, klatki: 182,
    svg: '<circle class="t-w0" cx="-23" cy="-21" r="6.5"/><circle class="t-w1" cx="23" cy="-21" r="6.5"/>' +
      '<circle class="t-w2" cx="-23" cy="21" r="6.5"/><circle class="t-w3" cx="23" cy="21" r="6.5"/>' +
      '<path class="t-r0" d="M-14,-21H14"/><path class="t-r1" d="M16,-14L-16,14"/><path class="t-r2" d="M-14,21H29"/>' +
      '<path class="t-str" d="M23,14L30,21L23,28"/>',
    os(svg, tl, sek) {
      [[0, 90], [16, 102], [32, 114]].forEach(([a, b], i) => {
        const w = svg.querySelector('.t-w' + i);
        gsap.set(w, { transformOrigin: '50% 50%' });
        klucze(tl, w, sek, [[a, { scale: 1 }, 1, .67], [a + 20, { scale: .86 }, .33, 0], [a + 40, { scale: 1 }, 1, .67],
          [b, { scale: 1 }, 1, .67], [b + 20, { scale: .86 }, .33, 0], [b + 40, { scale: 1 }]]);
      });
      const w3 = svg.querySelector('.t-w3');
      gsap.set(w3, { transformOrigin: '50% 50%', scale: .84, autoAlpha: 0 });
      tl.set(w3, { autoAlpha: 1 }, sek(44));
      tl.to(w3, { scale: 1.045, duration: sek(20), ease: K(.001, 0) }, sek(44));
      tl.to(w3, { scale: 1, duration: sek(20), ease: K(.33, .67) }, sek(64));
      tl.to(w3, { scale: .09, duration: sek(20), ease: 'none' }, sek(110));
      tl.set(w3, { autoAlpha: 0 }, sek(130));
      const str = I.trim(svg.querySelector('.t-str'));
      klucze(tl, str, sek, [[30, { s: 0, e: 1 }, 1, .999], [44, { s: .5, e: .5 }, .33, 0], [152, { s: .5, e: .5 }, .33, 0],
        [180, { s: 0, e: 1 }]], str.set);
      const r = trimWiele(['.t-r0', '.t-r1', '.t-r2'].map((s) => svg.querySelector(s)));
      tl.fromTo(r, { s: 0, e: 1 }, { s: 1, e: 1, duration: sek(42), ease: K(1, .999), onUpdate: r.set, immediateRender: false }, 0);
      tl.fromTo(r, { s: 0, e: 0 }, { s: 0, e: 1, duration: sek(52), ease: K(.33, 0), onUpdate: r.set, immediateRender: false }, sek(110));
    } });
})();

SM.sekcja('03-uslugi', () => {
  const sek = document.querySelector('.section_services');
  if (!sek) return;
  const karty = Array.from(sek.querySelectorAll('.service-card'));
  const viewer = sek.querySelector('.services-viewer');
  const obrazy = viewer ? Array.from(viewer.querySelectorAll('.service-image')) : [];
  const przycisk = viewer && viewer.querySelector('.button');
  const KR = 'cubic-bezier(0.5, 0, 0, 1)';
  const PRZ = `height 0.8s ${KR}, opacity 0.8s ${KR}`;
  const desktop = () => !SM.mq('(max-width: 991px)');
  const menu = () => document.documentElement.getAttribute('data-menu-open') === 'true';

  // ---- wjazd kart ----
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

  // ---- opis wierszami (≥992) ----
  const czesci = (k) => ({ inner: k.querySelector('.card-inner'), desc: k.querySelector('.desc'), tyt: k.querySelector('.body-l'),
    p: k.querySelector('.desc .body-s') });
  function wysokosc(c) {                     // wysokość treści opisu (oryginał ue(): pomiar z height auto, potem powrót)
    const st = c.desc.style.cssText;
    c.desc.style.cssText += ';transition:none;height:auto;visibility:hidden';
    const h = c.desc.getBoundingClientRect().height;
    c.desc.style.cssText = st;
    return h;
  }
  function podziel(k) {
    const c = czesci(k);
    if (k.__split) { k.__split.revert(); k.__split = null; }
    c.p.__inners = [];
    if (!desktop()) {                          // ≤991: opis zwykły, bez stylów w linii (oryginał Q())
      [c.desc, c.tyt].forEach((el) => el.removeAttribute('style'));
      k.style.backgroundColor = ''; k.classList.remove('is-svc-hover');
      return;
    }
    const st = c.desc.style.cssText;
    c.desc.style.cssText += ';transition:none;height:auto;visibility:hidden';
    const s = k.__split = new SplitText(c.p, { type: 'lines', tag: 'span', linesClass: 'line' });
    s.lines.forEach((l) => {
      const w = document.createElement('span'); w.className = 'line-inner';
      while (l.firstChild) w.appendChild(l.firstChild);
      l.appendChild(w); c.p.__inners.push(w);
    });
    c.desc.style.cssText = st;
    k.__h = wysokosc(c);
    if (k.__hover) wjazd(k, true); else zjazd(k, true);
  }
  function wjazd(k, natychmiast) {
    const c = czesci(k), h = k.__h || 0;
    const gap = parseFloat(getComputedStyle(c.inner).rowGap) || 0;
    if (c.desc.__koniec) { c.desc.removeEventListener('transitionend', c.desc.__koniec); c.desc.__koniec = null; }
    c.desc.style.transition = natychmiast ? 'none' : PRZ;
    c.desc.style.height = natychmiast ? 'auto' : h + 'px';
    c.desc.style.opacity = '1';
    c.desc.style.pointerEvents = '';
    c.tyt.style.transition = natychmiast ? 'none' : '';
    c.tyt.style.transform = `translateY(-${h + gap}px)`;
    c.p.__inners.forEach((w, i) => { w.style.transitionDelay = natychmiast ? '0s' : i * .03 + 's'; w.style.transition = natychmiast ? 'none' : ''; w.style.transform = 'translateY(0%)'; });
    if (natychmiast) { k.offsetHeight; c.desc.style.transition = PRZ; c.tyt.style.transition = ''; c.p.__inners.forEach((w) => { w.style.transition = ''; }); }
    else {
      const f = c.desc.__koniec = (e) => {
        if (e.propertyName !== 'height' || e.target !== c.desc) return;
        c.desc.removeEventListener('transitionend', f); c.desc.__koniec = null;
        if (k.__hover) c.desc.style.height = 'auto';
      };
      c.desc.addEventListener('transitionend', f);
    }
  }
  function zjazd(k, natychmiast) {
    const c = czesci(k);
    if (c.desc.__koniec) { c.desc.removeEventListener('transitionend', c.desc.__koniec); c.desc.__koniec = null; }
    c.desc.style.transition = natychmiast ? 'none' : PRZ;
    if (!natychmiast && c.desc.style.height === 'auto') { c.desc.style.height = c.desc.getBoundingClientRect().height + 'px'; c.desc.offsetHeight; }
    c.desc.style.height = '0'; c.desc.style.opacity = '0'; c.desc.style.pointerEvents = 'none';
    c.tyt.style.transition = natychmiast ? 'none' : '';
    c.tyt.style.transform = '';
    const n = c.p.__inners.length;
    c.p.__inners.forEach((w, i) => { w.style.transitionDelay = natychmiast ? '0s' : (n - 1 - i) * .03 + 's'; w.style.transition = natychmiast ? 'none' : ''; w.style.transform = 'translateY(100%)'; });
    if (natychmiast) { k.offsetHeight; c.desc.style.transition = PRZ; c.tyt.style.transition = ''; c.p.__inners.forEach((w) => { w.style.transition = ''; }); }
  }

  // ---- obraz w 6. komórce ----
  obrazy.forEach((im) => {
    im.style.transition = `opacity 0.8s ${KR}`;
    im.addEventListener('transitionend', (e) => {
      if (e.propertyName === 'opacity' && parseFloat(getComputedStyle(im).opacity) === 0) { im.style.display = 'none'; im.style.zIndex = '0'; }
    });
  });
  if (przycisk) { przycisk.style.transition = `opacity 0.8s ${KR}`; przycisk.style.opacity = '1'; }
  function pokazObraz(i) {
    obrazy.forEach((im, j) => {
      im.style.transition = `opacity 0.5s ${KR}`;
      if (j === i) { im.style.display = 'block'; im.offsetWidth; im.style.opacity = '1'; im.style.zIndex = '2'; }
      else { im.style.opacity = '0'; im.style.zIndex = '0'; }
    });
    if (!przycisk) return;
    if (przycisk.__koniec) przycisk.removeEventListener('transitionend', przycisk.__koniec);
    przycisk.style.transition = `opacity 0.5s ${KR}`;
    przycisk.style.opacity = '0';
    const f = przycisk.__koniec = (e) => {
      if (e.propertyName !== 'opacity') return;
      if (parseFloat(getComputedStyle(przycisk).opacity) === 0) przycisk.style.display = 'none';
      przycisk.removeEventListener('transitionend', f); przycisk.__koniec = null;
    };
    przycisk.addEventListener('transitionend', f);
  }
  function schowajObraz(i) {
    const im = obrazy[i];
    if (im) { im.style.transition = `opacity 0.5s ${KR}`; im.style.opacity = '0'; im.style.zIndex = '0'; }
    if (!przycisk || karty.some((k) => k.__hover)) return;
    if (przycisk.__koniec) { przycisk.removeEventListener('transitionend', przycisk.__koniec); przycisk.__koniec = null; }
    przycisk.style.display = ''; przycisk.offsetWidth; przycisk.style.opacity = '1';
  }

  // ---- najechanie ----
  karty.forEach((k, i) => {
    k.style.transition = `background-color 0.8s ${KR}`;
    k.style.backgroundColor = 'var(--white)';
    k.addEventListener('pointerenter', () => {
      if (!desktop() || menu() || k.__hover) return;
      k.__hover = true; k.classList.add('is-svc-hover');
      wjazd(k); k.style.backgroundColor = 'var(--accent)';
      pokazObraz(i);
    });
    k.addEventListener('pointerleave', () => {
      if (!desktop() || !k.__hover) return;
      k.__hover = false; k.classList.remove('is-svc-hover');
      zjazd(k); k.style.backgroundColor = 'var(--white)';
      schowajObraz(i);
    });
  });
  document.addEventListener('menu:open-start', () => karty.forEach((k, i) => {
    if (!k.__hover) return;
    k.__hover = false; k.classList.remove('is-svc-hover'); zjazd(k, true); k.style.backgroundColor = 'var(--white)'; schowajObraz(i);
  }));

  karty.forEach(podziel);
  let szer = innerWidth, t = null;
  addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => {
      if (innerWidth === szer) return;
      szer = innerWidth; karty.forEach(podziel);
      if (!desktop()) obrazy.forEach((im) => { im.style.opacity = '0'; im.style.display = 'none'; });
      if (przycisk && !desktop()) { przycisk.style.display = ''; przycisk.style.opacity = '1'; }
    }, 150);
  });
});
