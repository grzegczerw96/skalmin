/* SkalMin: części wspólne (zmienia tylko kierownik).
   - gładkie przewijanie: Lenis na oknie, ustawienia z main.js oryginału (lerp .125, syncTouch, syncTouchLerp .15/.075);
     window.lenis i window.__lenis (narzędzia warsztatu przewijają przez __lenis)
   - GSAP 3.13.0 + ScrollTrigger, CustomEase, SplitText; krzywa oryginału 'main' = M0,0 C0.6,0 0,1 1,1
   - sekcje rejestrują się przez SM.sekcja('NN-nazwa', fn); base uruchamia je po załadowaniu krojów, po kolei, potem
     ScrollTrigger.refresh()
   - plansza ładowania: robi ją sekcja 01; kontrakt: window.__loaderDone = true i zdarzenie 'loader:done' na document
     (jak w oryginale). ?intro=0 → bez planszy: base ustawia oba od razu.
   - ?okno → w rogu rozmiar okna i powiększenie, np. „1536×742 · 1,25” */
(function () {
  const q = new URLSearchParams(location.search);
  const SM = window.SM = {
    intro: q.get('intro') !== '0',
    coarse: matchMedia('(pointer: coarse)').matches || matchMedia('(hover: none)').matches,
    mq: (s) => matchMedia(s).matches,
    _sekcje: [],
    sekcja(nazwa, fn) { this._sekcje.push([nazwa, fn]); },
    lenis: null,
  };

  gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);
  CustomEase.create('main', 'M0,0 C0.6,0 0,1 1,1 ');
  SM.ease = 'main';

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  const lenis = SM.lenis = new Lenis({ lerp: .125, smoothWheel: true, syncTouch: true, syncTouchLerp: SM.coarse ? .15 : .075 });
  window.lenis = window.__lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  function loaderDone() {
    if (window.__loaderDone) return;
    window.__loaderDone = true; document.dispatchEvent(new CustomEvent('loader:done'));
  }
  SM.loaderDone = loaderDone;
  if (!SM.intro) document.documentElement.classList.add('no-intro');

  const fonts = ['600 1em "Inter Tight"', '500 1em "Inter Tight"', '400 1em "IBM Plex Mono"']
    .map((f) => document.fonts.load(f, 'SkalMinąę'));
  Promise.all(fonts).catch(() => {}).then(() => {
    for (const [nazwa, fn] of SM._sekcje) {
      try { fn(); } catch (e) { console.error('sekcja ' + nazwa, e); }
    }
    ScrollTrigger.refresh();
    if (!SM.intro) loaderDone();
    document.documentElement.classList.add('sm-ready');
  });

  if (q.has('okno')) {
    const el = document.createElement('div'); el.className = 'sm-okno';
    const pisz = () => { el.textContent = innerWidth + '×' + innerHeight + ' · ' + String(+devicePixelRatio.toFixed(2)).replace('.', ','); };
    pisz(); addEventListener('resize', pisz);
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(el));
    if (document.body) document.body.appendChild(el);
  }
})();
