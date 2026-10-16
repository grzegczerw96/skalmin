/* ikony.js: ikony kart (zamiennik ikon Lottie oryginału: assets/service-icons.js + /lottie/icon-NN.json). Własne SVG
   kreską 3 (pole 96 × 96 jak kompozycja Lottie 960 px przy skali 1000%), ruch GSAP o czasach i krzywych z JSON
   oryginału (klatki kluczowe, krzywe C(o.x,0 i.x,1)). Ładowane z <script defer> w bloku S:02 (po base.js).

   API (window.SM.ikony):
     SM.ikony.rejestruj(nazwa, { fps, klatki, svg, os })   nowa ikona: fps i liczba klatek jak w Lottie (np. 30, 91);
         svg = wnętrze <svg viewBox="-48 -48 96 96">; os(svgEl, tl, sek) dokłada ruch do pauzowanej osi tl
         (sek(klatka) = czas w s). Połowa = floor(klatki × 0,5) jak oryginał (data-lottie-mid domyślnie 0,5).
     SM.ikony.wstaw(el, nazwa)   wstawia SVG do el (np. div.service-icon_icon), zwraca obiekt ikony (też el.__ikona)
     ikona.wejscie()             jak playSegments([0, połowa], true): skok do 0 i ruch do połowy (najechanie karty,
                                 wejście sekcji)
     ikona.zjazd()               jak playSegments([połowa, klatki − 1], true): skok do połowy i ruch do końca
     SM.ikony.karta(karta, el)   wiąże najechanie karty jak oryginał: pointerenter → wejscie, pointerleave → zjazd
   Ikony: metry, tony, siec, zespol, w-toku, gotowe (sekcja 02). Sekcje 03 i 07 dopisują swoje przez rejestruj(). */
(function () {
  const SM = window.SM || (window.SM = {});
  const NS = 'http://www.w3.org/2000/svg';
  const krzywe = {};
  const K = (ox, ix) => {                         // krzywa klatki Lottie: o = (ox, 0), i = (ix, 1)
    const n = 'ik-' + ox + '-' + ix;
    if (!krzywe[n]) { CustomEase.create(n, `M0,0 C${ox},0 ${ix},1 1,1`); krzywe[n] = n; }
    return krzywe[n];
  };
  const defs = {};

  // kreska od s do e (ułamki długości ścieżki), jak „trim paths” w Lottie
  function trim(el) {
    const len = el.getTotalLength();
    const o = { s: 0, e: 1 };
    const set = () => {
      const d = Math.max(0, o.e - o.s) * len;
      el.style.visibility = d < .01 ? 'hidden' : '';          // zero długości z okrągłym końcem dałoby kropkę
      el.style.strokeDasharray = `${d} ${len + 1}`;
      el.style.strokeDashoffset = -o.s * len;
    };
    o.set = set; set();
    return o;
  }
  // klatki kluczowe [klatka, wartość, ox, ix] → kolejne tweeny na osi (wartość = obiekt właściwości)
  function klucze(tl, cel, sek, lista, onUpdate) {
    gsap.set(cel, lista[0][1]);
    for (let i = 0; i < lista.length - 1; i++) {
      const [f0, , ox, ix] = lista[i]; const [f1, v1] = lista[i + 1];
      tl.to(cel, { ...v1, duration: sek(f1) - sek(f0), ease: K(ox, ix), onUpdate, immediateRender: false }, sek(f0));
    }
  }

  const ikony = SM.ikony = {
    K, trim, klucze,
    rejestruj(nazwa, d) { defs[nazwa] = d; },
    wstaw(el, nazwa) {
      const d = defs[nazwa]; if (!d || !el) return null;
      el.innerHTML = `<svg viewBox="-48 -48 96 96" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
        stroke-linejoin="round" aria-hidden="true" focusable="false" style="display:block;width:100%;height:auto;overflow:visible">${d.svg}</svg>`;
      const svg = el.firstElementChild;
      const sek = (f) => f / d.fps;
      const tl = gsap.timeline({ paused: true });
      d.os(svg, tl, sek);
      const pol = Math.max(1, Math.min(d.klatki - 1, Math.floor(d.klatki * .5)));
      const koniec = Math.max(pol, d.klatki - 1);
      // długość osi = cała animacja (ostatnia klatka), nawet gdy ostatni ruch kończy się wcześniej
      tl.set({}, {}, sek(d.klatki - 1));
      tl.seek(0, false);                 // false: z wywołaniami onUpdate (kreski i ścieżki rysuje onUpdate)
      let tw = null;
      const graj = (a, b) => { if (tw) tw.kill(); tl.pause(); tl.seek(sek(a), false); tw = tl.tweenFromTo(sek(a), sek(b), { ease: 'none' }); };
      const ik = el.__ikona = { el, tl, polowa: sek(pol), koniec: sek(koniec),
        wejscie: () => graj(0, pol), zjazd: () => graj(pol, koniec) };
      return ik;
    },
    karta(karta, el) {
      const ik = el.__ikona; if (!ik || karta.__ikonaKarta) return;
      karta.__ikonaKarta = true;
      karta.addEventListener('pointerenter', ik.wejscie);
      karta.addEventListener('pointerleave', ik.zjazd);
    },
  };

  /* ---- metry (oryginał icon-11: 60 kl./s, 182 kl.; końce miary 0→60→120→180 krzywa .8/.2; podkłady 20→80 .16/0,
     100→160 1/.84) ---- */
  ikony.rejestruj('metry', { fps: 60, klatki: 182,
    svg: '<path class="m-miara"/><path class="m-tor" stroke-width="2"/><path class="m-podklady" stroke-width="2"/>',
    os(svg, tl, sek) {
      const miara = svg.querySelector('.m-miara'), tor = svg.querySelector('.m-tor'), pod = svg.querySelector('.m-podklady');
      const p = { L: -24, R: 24, s: 0 };
      const rys = () => {
        miara.setAttribute('d', `M${p.L},-21V-10M${p.L},-15.5H${p.R}M${p.R},-21V-10`);
        tor.setAttribute('d', `M${p.L - 4},9H${p.R + 4}M${p.L - 4},19H${p.R + 4}`);
        const w = (p.R - p.L) * (.62 + .38 * p.s); let d = '';
        for (let i = 0; i < 5; i++) { const x = (p.L + p.R) / 2 - w / 2 + w * i / 4; d += `M${x.toFixed(2)},5V23`; }
        pod.setAttribute('d', d);
      };
      klucze(tl, p, sek, [[0, { L: -24, R: 24 }, .8, .2], [60, { L: -34.3, R: 34.5 }, .8, .2], [120, { L: -34.3, R: 34.5 }, .8, .2],
        [180, { L: -24, R: 24 }]], rys);
      klucze(tl, p, sek, [[20, { s: 0 }, .16, 0], [80, { s: 1 }, .16, .84], [100, { s: 1 }, 1, .84], [160, { s: 0 }]], rys);
      rys();
    } });

  /* ---- tony (icon-12: 30 kl./s, 91 kl.; wskazówka 0→62→39→39→−25→0 w kl. 0/20/40/50/70/90; uchwyt y −22,7→−17→−18,7→
     −18,7→−23,7→−22,7) ---- */
  ikony.rejestruj('tony', { fps: 30, klatki: 91,
    svg: '<path d="M-14,-6H14L20,26H-20Z"/><path d="M-9,16A9,9 0 0 1 9,16" stroke-width="2"/>' +
      '<g class="t-wsk"><path d="M0,16V8"/></g><g class="t-uchwyt"><path d="M-7,-6V-12A7,7 0 0 1 7,-12V-6"/></g>',
    os(svg, tl, sek) {
      const w = svg.querySelector('.t-wsk'), u = svg.querySelector('.t-uchwyt');
      gsap.set(w, { svgOrigin: '0 16' });
      const E = [.8, .2], F = [.167, .2], H = [.167, .833];
      klucze(tl, w, sek, [[0, { rotation: 0 }, ...E], [20, { rotation: 62 }, ...F], [40, { rotation: 39 }, ...H], [50, { rotation: 39 }, ...E],
        [70, { rotation: -25 }, .16, .2], [90, { rotation: 0 }]]);
      klucze(tl, u, sek, [[0, { y: 0 }, ...E], [20, { y: 5.7 }, ...F], [40, { y: 4 }, ...H], [50, { y: 4 }, ...E], [70, { y: -1 }, ...F],
        [90, { y: 0 }]]);
    } });

  /* ---- siec (icon-13: pień znika kl. 8→28 krzywa 1/.67, wraca 62→82 .33/0; gałąź zwija się do środka 12/16→32/36,
     rozwija 54/58→74/78; węzły skala 100→90→100: 0→20 (1/.84), 20→36 (.16/0), drugi raz 59→75→90, przesunięte o 4 kl.) ---- */
  ikony.rejestruj('siec', { fps: 30, klatki: 91,
    svg: '<path class="s-pien" d="M0,-13V0"/><path class="s-gal" d="M-22,13V0H22V13"/>' +
      '<circle class="s-w0" cx="0" cy="-20" r="7"/><circle class="s-w1" cx="-22" cy="20" r="7"/><circle class="s-w2" cx="22" cy="20" r="7"/>',
    os(svg, tl, sek) {
      const pien = trim(svg.querySelector('.s-pien')), gal = trim(svg.querySelector('.s-gal'));
      klucze(tl, pien, sek, [[8, { e: 1 }, 1, .67], [28, { e: 0 }, .167, .833], [62, { e: 0 }, .33, 0], [82, { e: 1 }]], pien.set);
      klucze(tl, gal, sek, [[12, { s: 0 }, 1, .67], [32, { s: .5 }, .167, .833], [58, { s: .5 }, .33, 0], [78, { s: 0 }]], gal.set);
      klucze(tl, gal, sek, [[16, { e: 1 }, 1, .67], [36, { e: .5 }, .167, .833], [54, { e: .5 }, .33, 0], [74, { e: 1 }]], gal.set);
      [[0, 59], [4, 55], [8, 51]].forEach(([a, b], i) => {
        const c = svg.querySelector('.s-w' + i);
        gsap.set(c, { transformOrigin: '50% 50%' });
        klucze(tl, c, sek, [[a, { scale: 1 }, 1, .84], [a + 20, { scale: .9 }, .16, 0], [a + 36, { scale: 1 }, 1, .84], [b, { scale: 1 }, 1, .84],
          [b + 16, { scale: .9 }, .16, 0], [b + 31, { scale: 1 }]]);
      });
    } });

  /* ---- zespol (icon-14: kreski między węzłami znikają kl. 0/2/4/6 → +18 (.8/.2), wracają 66/68/70/72 → +18;
     węzły obrót 0→90° i ściągnięcie do środka kl. 10/12/14/16 → +28, powrót 51/49/47/45 → +28) ---- */
  ikony.rejestruj('zespol', { fps: 30, klatki: 91,
    svg: '<path class="z-k0" d="M-13,-20.4H13"/><path class="z-k1" d="M21,-12.4V12.4"/><path class="z-k2" d="M13,20.4H-13"/>' +
      '<path class="z-k3" d="M-21,12.4V-12.4"/>' +
      [[21, -20.4], [-21, -20.4], [-21, 20.4], [21, 20.4]].map(([x, y], i) =>
        `<g class="z-w${i}"><g class="z-o"><circle r="7"/><path d="M0,-7V-2.5" stroke-width="2"/></g></g>`).join(''),
    os(svg, tl, sek) {
      [0, 1, 2, 3].forEach((i) => {
        const k = trim(svg.querySelector('.z-k' + i));
        const a = i * 2, b = 72 - i * 2;
        klucze(tl, k, sek, [[a, { e: 1 }, .8, .2], [a + 18, { e: 0 }, .167, .833], [b, { e: 0 }, .8, .2], [b + 18, { e: 1 }]], k.set);
      });
      [[21, -20.4, 14, -13.4], [-21, -20.4, -13.5, -13.4], [-21, 20.4, -13.5, 13.4], [21, 20.4, 14, 13.4]].forEach(([x, y, x2, y2], i) => {
        const g = svg.querySelector('.z-w' + i), o = g.firstElementChild;   // zewnętrzna: położenie, wewnętrzna: obrót
        gsap.set(o, { svgOrigin: '0 0' });
        const a = 10 + i * 2, b = 51 - i * 2;
        klucze(tl, g, sek, [[a, { x, y }, .8, .2], [a + 28, { x: x2, y: y2 }, .167, .833], [b, { x: x2, y: y2 }, .8, .2], [b + 28, { x, y }]]);
        klucze(tl, o, sek, [[a, { rotation: 0 }, .8, .2], [a + 28, { rotation: 90 }, .167, .833], [b, { rotation: 90 }, .8, .2],
          [b + 28, { rotation: 0 }]]);
      });
    } });

  /* ---- w-toku (icon-15: wskazówki 0→237,3° i 0→90° w kl. 0→30, stoją do 60, wracają 60→90; krzywa .8/.2) ---- */
  ikony.rejestruj('w-toku', { fps: 30, klatki: 91,
    svg: '<path d="M-8,-22H-20V28H2"/><path d="M8,-22H20V-4"/><path d="M-8,-26H8V-18H-8Z"/><path d="M-12,-4H0M-12,6H-6" stroke-width="2"/>' +
      '<circle cx="14" cy="16" r="13" fill="#fff"/><g class="w-dl"><path d="M14,16V7"/></g><g class="w-kr"><path d="M14,16H19"/></g>',
    os(svg, tl, sek) {
      const dl = svg.querySelector('.w-dl'), kr = svg.querySelector('.w-kr');
      gsap.set([dl, kr], { svgOrigin: '14 16' });
      const E = [.8, .2];
      klucze(tl, dl, sek, [[0, { rotation: 0 }, ...E], [30, { rotation: 237.3 }, ...E], [60, { rotation: 237.3 }, ...E], [90, { rotation: 0 }]]);
      klucze(tl, kr, sek, [[0, { rotation: 0 }, ...E], [30, { rotation: 90 }, ...E], [60, { rotation: 90 }, ...E], [90, { rotation: 0 }]]);
    } });

  /* ---- gotowe (icon-16: całość y 0→−3,6→−2→−2→−3,6→0 w kl. 0/20/40/50/70/90; ptaszek znika 0→20 (1/.67), wraca 70→90
     (.33/0); wieko y −20,1→−13,6 w kl. 0→21, wraca 69→90) ---- */
  ikony.rejestruj('gotowe', { fps: 30, klatki: 91,
    svg: '<g class="g-cal"><path d="M-22,-7.6V20A4,4 0 0 0 -18,24H18A4,4 0 0 0 22,20V-7.6"/><g class="g-wieko"><path d="M-25,0H25V6H-25Z"/></g>' +
      '<path class="g-pt" d="M-8,7L-2,13L9,1"/></g>',
    os(svg, tl, sek) {
      const cal = svg.querySelector('.g-cal'), wieko = svg.querySelector('.g-wieko'), pt = trim(svg.querySelector('.g-pt'));
      klucze(tl, cal, sek, [[0, { y: 0 }, 1, .67], [20, { y: -3.6 }, .33, 0], [40, { y: -2 }, .167, .833], [50, { y: -2 }, 1, .67],
        [70, { y: -3.6 }, .33, 0], [90, { y: 0 }]]);
      klucze(tl, pt, sek, [[0, { e: 1 }, 1, .67], [20, { e: 0 }, 1, 0], [70, { e: 0 }, .33, 0], [90, { e: 1 }]], pt.set);
      klucze(tl, wieko, sek, [[0, { y: -20.1 }, 1, .67], [21, { y: -13.6 }, 1, 0], [69, { y: -13.6 }, .33, 0], [90, { y: -20.1 }]]);
    } });
})();
