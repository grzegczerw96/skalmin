/* 08-partnerzy: walec z nazwami spółek obracany przewijaniem. Odtworzone z assets/cylinder.js oryginału (initCylinder):
   - 14 nazw na walcu 3D: promień R = min(szerokość okna, wysokość okna) × 0,4; kąt między nazwami r = (360 / 48 × 20) / 13
     = 11,538° (data-cylinder-zones 48, data-text-zones 20); nazwa h: translate3d(-50%,-50%,0) translate3d(0, sin·R, cos·R)
     rotateX(−h·r)
   - obrót .cylindar__text__wrapper: rotateX 0 → 150°, ease none, postęp = postęp przypięcia (bez wygładzania; wygładza Lenis)
   - przypięcie: desktop (min(okno) ≥ 767) trigger „center center”, droga 2000 px (w kodzie „+=2000svh”, GSAP czyta liczbę);
     telefon (< 767): droga 2500 − wysokość okna, wysokość walca = wysokość okna (zmienna --cylinder-viewport-height).
     U nas position: sticky w .sm-pin (css) + ScrollTrigger bez pin: start „top top”, ta sama droga
   - aktywna nazwa: indeks round(postęp × 13); aktywna dostaje .is-active (bez .is-o-15/.is-o-20), reszta .is-o-20
     (przejście krycia 0,15 s ease-in-out w css); przy otwartym menu bez zmiany nazw (data-menu-open)
   - kreski po bokach (.scroll-indicator_c ×2): 14 × (data-tick-multiplier 8 / 2) = 56 kresek, kreska s na top s/55 × 100 %,
     wysokość skali 0,4 × okno (telefon 0,8 ×), aktywna kreska round(postęp × 55): .is-xxl, ±1 .is-xl, ±2 .is-l, ±3 .is-m
   Druga kopia listy (.scroll-list, scroll-list.js) jest w oryginale zawsze ukryta (display:none) → pominięta. */
SM.sekcja('08-partnerzy', () => {
  const sek = document.querySelector('.section_partners');
  const cw = sek && sek.querySelector('.cylindar__wrapper');
  if (!cw) return;
  const pin = cw.closest('.sm-pin');
  const tw = cw.querySelector('.cylindar__text__wrapper');
  const items = [...cw.querySelectorAll('.cylindar__text__item')];
  const names = items.map((e) => e.querySelector('.body-xl'));
  const skale = [...cw.querySelectorAll('.scroll-indicator_c')];
  const int = (k, d) => { const v = parseInt(cw.dataset[k], 10); return Number.isFinite(v) && v > 0 ? v : d; };
  const strefy = int('cylinderZones', 10), tekstowe = int('textZones', 7), mnoznik = int('tickMultiplier', 1);

  const wys = () => (window.visualViewport && visualViewport.height > 0 ? visualViewport.height : innerHeight);
  const tel = () => Math.min(innerWidth, wys()) < 767;
  const droga = () => (tel() ? Math.max(1, 2500 - wys()) : 2000);
  const nTicks = items.length * Math.max(1, Math.round(mnoznik / 2));

  skale.forEach((s) => {                                   // 56 kresek na skalę (ne())
    const wz = s.querySelector('.scroll-tick');
    s.innerHTML = '';
    for (let i = 0; i < nTicks; i++) {
      const t = wz.cloneNode(true);
      t.style.top = (nTicks <= 1 ? 50 : i / (nTicks - 1) * 100) + '%';
      s.appendChild(t);
    }
  });

  function uklad() {                                       // W(): wysokość walca, skala, ustawienie nazw
    if (tel()) cw.style.setProperty('--cylinder-viewport-height', Math.round(wys()) + 'px');
    else cw.style.removeProperty('--cylinder-viewport-height');
    const m = Math.min(innerWidth, wys());
    cw.style.setProperty('--cylinder-indicator-height', m * (m < 767 ? .8 : .4) + 'px');
    const R = m * .4, n = items.length;
    const c = 360 / strefy * tekstowe, r = n > 1 ? c / (n - 1) : c;
    items.forEach((el, h) => {
      const w = h * r * Math.PI / 180;
      el.style.transform = `translate3d(-50%, -50%, 0) translate3d(0px, ${Math.sin(w) * R}px, ${Math.cos(w) * R}px) rotateX(${-h * r}deg)`;
    });
    pin.style.setProperty('--pin-dist', droga() + 'px');
  }
  uklad();

  gsap.set(tw, { transformOrigin: '50% 50% 0', force3D: true });
  const tl = gsap.timeline({ defaults: { ease: 'none' } });
  tl.fromTo(tw, { rotateX: 0 }, { rotateX: 150 }, 0).pause(0);

  let aktywna = -1, kreska = -1;
  function stan(p) {
    tl.progress(p);
    if (document.documentElement.getAttribute('data-menu-open') !== 'true') {
      const i = Math.max(0, Math.min(names.length - 1, Math.round(p * (names.length - 1))));
      if (i !== aktywna) {
        aktywna = i;
        names.forEach((e) => e.classList.remove('is-active'));
        names[i].classList.add('is-active');
        names[i].classList.remove('is-o-15', 'is-o-20');
        names.forEach((e, h) => { if (h !== i && !e.classList.contains('is-o-20')) e.classList.add('is-o-20'); });
      }
    }
    const k = nTicks <= 1 ? 0 : Math.round(Math.max(0, Math.min(1, p)) * (nTicks - 1));
    if (k !== kreska) {
      kreska = k;
      skale.forEach((s) => {
        const t = s.children;
        for (const e of t) e.classList.remove('is-xxl', 'is-xl', 'is-l', 'is-m');
        [[0, 'is-xxl'], [-1, 'is-xl'], [1, 'is-xl'], [-2, 'is-l'], [2, 'is-l'], [-3, 'is-m'], [3, 'is-m']]
          .forEach(([d, kl]) => { if (t[k + d]) t[k + d].classList.add(kl); });
      });
    }
  }

  ScrollTrigger.addEventListener('refreshInit', uklad);
  ScrollTrigger.create({
    trigger: pin, start: 'top top', end: () => '+=' + droga(), invalidateOnRefresh: true,
    onRefresh: (st) => stan(st.progress), onToggle: (st) => stan(st.progress), onUpdate: (st) => stan(st.progress),
  });
  stan(0);
});
