/* 00-wspolne: nawigacja, menu, przyciski, tekst odsłaniany, duży tytuł. Odtworzone z main.js oryginału (pretty/main.js:
   menu Ip() w. 7434–8068, nawigacja zp/Fp/zr/Hp w. 8069–8404, motywy fn.themes w. 7248) oraz assets/button-hover.js,
   text-reveal.js, text-display-reveal.js. Krzywa 'main' = M0,0 C0.6,0 0,1 1,1 (base.js).

   FUNKCJA / KLASA → CO ROBI, JAK UŻYĆ
   (wszystko startuje samo w SM.sekcja('00-wspolne'), czyli przed sekcjami 01–10)
   SM.nav.el                     element nav.navbar
   SM.nav.start()                stan początkowy do wejścia hero: pasek za krawędziami (left/right −9em), jak po
                                 schowaniu przy przewijaniu; wołać przed planszą ładowania
   SM.nav.wjazd({duration, ease}) tween left/right → margines strony (2em, ≤991: 1em); domyślnie 1,2 s 'main' jak
                                 wejście hero oryginału (main.js w. 5826); do wstawienia w oś: tl.add(SM.nav.wjazd(), 0)
   SM.nav.ukryj(tak)             schowaj / pokaż pasek (0,5 s 'main', oryginał ng())
                                 Pasek sam chowa się przy przewijaniu w dół (>2 px na klatkę) i wraca przy przewijaniu
                                 w górę: 0,5 s, krzywa domyślna GSAP, od nowa w każdej klatce przewijania (oryginał zp()).
   SM.menu.otworz() / zamknij() / przelacz(); SM.menu.otwarte
                                 menu: strona (main.content-wrap) zjeżdża w dół i maleje, 1,2 s 'main'; przewijanie
                                 stoi (Lenis stop), po zamknięciu strona w tym samym miejscu. Zdarzenia na document:
                                 'menu:open-start', 'menu:close-end'. Linki menu z href="#id" skaczą do sekcji.
                                 UWAGA dla sekcji: w czasie menu <main> dostaje transform, więc position:fixed w main
                                 zachowuje się jak absolute. Kod niżej przesuwa takie elementy (np. przypięcia
                                 ScrollTriggera) o przewinięcie na czas menu; prościej: przypinać przez position:sticky.
   SM.przyciski(korzeń)          najechanie przycisków .button (treść x 0 → 2,25em), małych przycisków kart
                                 .card .button-sm i linków menu; tylko ≥992 px jak oryginał; drugi raz nic nie wiąże
   SM.tekst(el)                  tekst odsłaniany przewijaniem (oryginał [tr="1"]): SplitText na wiersze, slowa i znaki;
                                 znaki krycie .2 → 1, w każdym wierszu osobny ScrollTrigger: trigger wiersz,
                                 start 'top 85%', end 'top 50%', scrub true, kaskada 0,02 (czas znaku 0,5 → w wierszu
                                 ok. 40 znaków naraz w ruchu ~25). Robi się samo dla [tr="1"] obecnych na starcie;
                                 SM.tekst(el) dla dodanych później. Po zmianie szerokości okna (200 ms) dzielone od nowa.
   SM.tytulDuzy(el)              wejście .title-big (sekcja 06; text-display-reveal.js): paski .overlay-gradient
                                 szerokość 0 → 100% (≤478: 130%), 2 s 'main', kaskada .025; słowa
                                 .eyebrow-wrapper-a > .eyebrow-m z obrotu 70° i yPercent 100, 1,2 s, kaskada .02;
                                 raz, gdy .display wejdzie na 80% ekranu. Robi się samo dla .title-big na starcie.
   linki a[href^="#"] w stronie  przewijanie Lenisem do celu; samo "#" nic nie robi

   Warianty text-reveal.js oryginału: (1) [tr="1"] (w. 78–99, opisany wyżej; jedyny na stronie głównej);
   (2) w. 127–149: .section_process (inne podstrony) na telefonie <767 px: wiersze z funkcji M() (wejście w pierwszych
   25% osi, wyjście w ostatnich 25%); (3) w. 212–248: .section_process na desktopie: h3/p krycie .2→1 'top 85%'→'top 50%',
   potem h3 gaśnie 'top 12em'→'top -12em'; (4) w. 294–338: indeksy i kreska procesu. (2)–(4) nie występują na stronie
   głównej, więc ich tu nie ma. */
(function () {
  const SM = window.SM;
  const E = gsap;
  const dm = () => SM.mq('(max-width: 991px)') ? '1em' : '2em';           // oryginał Br()
  const desktop = () => SM.mq('(min-width: 992px)');                      // button-hover.js d()
  const EASE_MENU_HOVER = CustomEase.create('sm-menu-hover', 'M0,0 C0.68,0 0,1 1,1 ');
  const EASE_LOGO = CustomEase.create('sm-logo', 'M0,0 C0.51,0 0,1 1,1');

  // motywy kolorów kółka menu (fn.themes, main.js w. 7248); u nas jak w oryginale: motyw = pierwszy [bg] na stronie
  const MOTYWY = {
    white: { menuIconBg: 'var(--white)', menuIconBorder: 'var(--primary)', menuIconBarsBg: 'var(--primary)' },
    lightgreen: { menuIconBg: 'var(--light-green)', menuIconBorder: 'var(--primary)', menuIconBarsBg: 'var(--primary)' },
    black: { menuIconBg: 'var(--black)', menuIconBorder: 'var(--white)', menuIconBarsBg: 'var(--white)' },
    hero: { menuIconBg: 'transparent', menuIconBorder: 'var(--white)', menuIconBarsBg: 'var(--white)' },
    menu: { menuIconBg: 'var(--accent)', menuIconBorder: 'var(--primary)', menuIconBarsBg: 'var(--primary)' },
  };
  let motyw = 'white';
  const kolory = (k) => MOTYWY[k] || MOTYWY.white;

  SM.nav = {
    el: null,
    start() { const n = this.el || document.querySelector('.navbar'); if (n) E.set(n, { left: '-9em', right: '-9em' }); },
    wjazd(o = {}) {
      const n = this.el || document.querySelector('.navbar');
      return E.to(n, { left: dm(), right: dm(), pointerEvents: 'auto', duration: o.duration ?? 1.2, ease: o.ease || 'main', overwrite: 'auto' });
    },
    ukryj(tak) {
      E.to(this.el, { duration: .5, ease: 'main', overwrite: 'auto', left: tak ? '-9em' : dm(), right: tak ? '-9em' : dm(),
        pointerEvents: tak ? 'none' : 'auto' });
    },
  };
  SM.menu = { otwarte: false, otworz() {}, zamknij() {}, przelacz() {} };

  /* ================= nawigacja ================= */
  function nawigacja() {
    const nav = SM.nav.el = document.querySelector('.navbar');
    if (!nav) return;
    // chowanie przy przewijaniu (zp): tween od nowa w każdej klatce z ruchem > 2 px
    let ost = SM.lenis.scroll;
    SM.lenis.on('scroll', (l) => {
      const d = l.scroll - ost; ost = l.scroll;
      if (SM.nav._cisza) return;
      if (d > 2) E.to(nav, { duration: .5, left: '-9em', right: '-9em', pointerEvents: 'none', overwrite: 'auto' });
      else if (d < -2) E.to(nav, { duration: .5, left: dm(), right: dm(), overwrite: 'auto' });
    });
    SM.nav._skok = (y) => { SM.nav._cisza = true; SM.lenis.scrollTo(y, { immediate: true, force: true }); ost = SM.lenis.scroll; SM.nav._cisza = false; };
    addEventListener('resize', () => {
      if (document.documentElement.getAttribute('data-menu-open') === 'true') return;
      const l = parseFloat(getComputedStyle(nav).left);
      if (l >= 0) E.set(nav, { left: dm(), right: dm(), overwrite: 'auto' });   // schowanego nie wyciągamy
    });
    // motyw kółka: pierwszy [bg] (Hp/bindScroll, raz; przy przewijaniu kolory odwraca mix-blend-mode)
    const pierwszy = document.querySelector('main [bg], [bg]');
    motyw = pierwszy && MOTYWY[(pierwszy.getAttribute('bg') || '').toLowerCase()] ? pierwszy.getAttribute('bg').toLowerCase() : 'white';
    ustawKolory(kolory(motyw));
    // logo: najechanie (Fp, main.js w. 8130)
    const logo = nav.querySelector('.is-logo_main');
    if (logo) {
      const t1 = logo.querySelector('.is-t-1'), t2 = logo.querySelector('.is-t-2');
      const p1 = [...t1.querySelectorAll('.logo-path')], p2 = [...t2.querySelectorAll('.logo-path')];
      // wartości w jednostkach SVG zmierzone na oryginale (yPercent −120 / −100 / −42 / 100 jego liter, 16.10.2026)
      const spocznij = () => { E.set(t1, { y: 0 }); E.set(t2, { y: 27 }); E.set(p1, { y: 0 }); E.set(p2, { y: 10.79 }); };
      spocznij();
      // oryginał przesuwa grupy o yPercent (−120, −100), a GSAP liczy procent od ramki grupy SVG w każdej klatce; ramka
      // rośnie, gdy litery w kaskadzie się rozjeżdżają. U nas litery to <text> (inna ramka), więc ramkę liczymy jak
      // oryginał: wysokość litery 11,1 (dopasowana do końcowych −13,61 i 4,59) + rozrzut liter grupy.
      const ramka = (ls) => {
        let a = Infinity, b = -Infinity;
        ls.forEach((l) => { const y = +E.getProperty(l, 'y'); a = Math.min(a, y); b = Math.max(b, y); });
        return 11.1 + b - a;
      };
      let trwa = false;
      logo.addEventListener('mouseenter', () => {
        if (trwa) return; trwa = true;
        const g = { p: 0 };
        const tl = E.timeline({ defaults: { duration: .5, ease: EASE_LOGO, overwrite: 'auto' }, onComplete: () => { spocznij(); trwa = false; } });
        tl.to([...p1, ...p2], { y: -4.53, stagger: { each: .03 } }, 0)
          .to(g, { p: 1, onUpdate: () => { E.set(t1, { y: -1.2 * g.p * ramka(p1) }); E.set(t2, { y: 27 - g.p * ramka(p2) }); } }, 0);
      });
    }
    nav.querySelector('.is-link')?.addEventListener('click', (e) => {
      e.preventDefault(); if (!SM.menu.otwarte) SM.lenis.scrollTo(0);
    });
  }

  let ikona = null, paski = null, p1 = null, p2 = null, napis = null;
  function ustawKolory(k) {
    if (!ikona) return;
    E.set(ikona, { backgroundColor: k.menuIconBg, borderColor: k.menuIconBorder, overwrite: 'auto' });
    E.set(paski, { backgroundColor: k.menuIconBarsBg, overwrite: 'auto' });
  }

  /* ================= menu (Ip) ================= */
  const ZC = ['8em', '11em', '14em', '10em', '13em', '16em', '12em', '15em', '18em', '21em', '24em', '27em'];
  function menu() {
    const html = document.documentElement;
    const btn = document.querySelector('button.is-menu');
    const strona = document.querySelector('main.content-wrap') || document.querySelector('main');
    const wnetrze = document.querySelector('.nav-inner');
    if (!btn || !strona || !wnetrze) return;
    ikona = btn.querySelector('.menu-icon'); paski = [...btn.querySelectorAll('.menu-icon_bar')];
    p1 = btn.querySelector('.menu-icon_bar.is-1'); p2 = btn.querySelector('.menu-icon_bar.is-2');
    napis = btn.querySelector('.is-menu_label-inner');
    ustawKolory(kolory(motyw));
    const linki = [...wnetrze.querySelectorAll('.links .link-item a')];
    linki.forEach((a, i) => { a.dataset.originalMarginTop = ZC[i] || '0px'; });
    html.setAttribute('data-menu-open', 'false');

    let otw = false, os_ = null, blokada = null, hoverTl = null, Es = 0, zmianaOkna = false;
    // --- najechanie na kółko (_ / k) ---
    const wazne = (on) => {
      if (on) {
        ikona.style.setProperty('background-color', 'var(--primary)', 'important');
        ikona.style.setProperty('border-color', 'var(--primary)', 'important');
        paski.forEach((b) => b.style.setProperty('background-color', '#fff', 'important'));
      } else {
        ikona.style.removeProperty('background-color'); ikona.style.removeProperty('border-color');
        paski.forEach((b) => b.style.removeProperty('background-color'));
      }
    };
    ikona.addEventListener('mouseenter', () => {
      if (otw || html.getAttribute('data-menu-open') === 'true') return;
      blokada = 'hover'; wazne(true);
      hoverTl && hoverTl.kill();
      hoverTl = E.timeline({ defaults: { duration: .6, ease: EASE_MENU_HOVER, overwrite: 'auto' } })
        .to(napis, { yPercent: -50 }, 0)
        .to(p1, { top: '49%', rotation: 0, transformOrigin: '50% 50%' }, 0)
        .to(p2, { bottom: '49%', rotation: 90, transformOrigin: '50% 50%' }, 0);
    });
    ikona.addEventListener('mouseleave', () => {
      if (otw || html.getAttribute('data-menu-open') === 'true' || blokada === 'open') return;
      hoverTl && hoverTl.kill(); hoverTl = null;
      const d = { duration: .6, ease: EASE_MENU_HOVER, overwrite: 'auto' };
      E.to(p1, { ...d, top: '42%', rotation: 0, transformOrigin: '50% 50%' });
      E.to(p2, { ...d, bottom: '42%', rotation: 0, transformOrigin: '50% 50%' });
      E.to(napis, { ...d, yPercent: 0 });
      wazne(false); ustawKolory(kolory(motyw)); blokada = null;
    });
    ikona.addEventListener('pointerdown', () => { E.set(napis, { yPercent: 0, overwrite: 'auto' }); blokada = 'open'; });

    // --- strona: zjeżdża i maleje (page-wrap oryginału); u nas <main> w miejscu, przewinięcie stoi ---
    const st = { y: 0, s: 1, r: 0 };
    let stale = [];
    const docTop = () => strona.getBoundingClientRect().top + scrollY;   // przed transformacją
    let mTop = 0;
    function rysuj() {
      const o = Es - mTop;                                   // górna krawędź okna w układzie <main>
      const vh = innerHeight, h = strona.offsetHeight;
      strona.style.transformOrigin = `50% ${o}px`;
      strona.style.transform = `translate3d(0, ${st.y}px, 0) scale(${st.s})`;
      const dol = Math.max(0, h - o - vh);
      strona.style.clipPath = `inset(${Math.max(0, o)}px 0px ${dol}px 0px round ${st.r}px)`;
    }
    function cel() {                                        // be() / ft: dokąd zjeżdża strona
      const w = innerWidth, tab = w >= 768 && w <= 991, tel = w < 768;
      const fs = parseFloat(getComputedStyle(strona).fontSize) || 16;
      const y = tel ? 32 * fs : tab ? 15 * fs : wnetrze.getBoundingClientRect().bottom + fs * 9;
      return { y, s: w > 0 ? Math.max(0, w - (tel ? 32 : 64)) / w : 1 };
    }
    function przypnij(tak) {                                // position:fixed w <main> trzyma się okna mimo transformacji
      if (tak) {
        stale = [...strona.querySelectorAll('*')].filter((e) => getComputedStyle(e).position === 'fixed');
        stale.forEach((e) => { e.dataset.smTranslate = e.style.translate; e.style.translate = `0 ${Es - mTop}px`; });
      } else {
        stale.forEach((e) => { e.style.translate = e.dataset.smTranslate || ''; delete e.dataset.smTranslate; });
        stale = [];
      }
    }
    function sprzatnij() {
      strona.style.transform = ''; strona.style.transformOrigin = ''; strona.style.clipPath = ''; strona.style.willChange = '';
      przypnij(false);
    }
    function marginesy(tl, zamykanie) {                      // he()
      const m = (i, a) => a.dataset.originalMarginTop;
      if (zamykanie) { E.set(linki, { marginTop: 0 }); tl.fromTo(linki, { marginTop: 0 }, { marginTop: m, overwrite: 'auto' }, 0); }
      else { E.set(linki, { marginTop: m }); tl.to(linki, { marginTop: 0, overwrite: 'auto' }, 0); }
    }
    function koniecZamykania() {
      otw = false; SM.menu.otwarte = false;
      html.setAttribute('data-menu-open', 'false'); html.classList.remove('sm-menu');
      btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-label', 'otwórz menu');
      wnetrze.setAttribute('inert', '');
      sprzatnij();
      blokada = null; wazne(false); ustawKolory(kolory(motyw));
      SM.lenis.start();
      if (zmianaOkna) { zmianaOkna = false; ScrollTrigger.refresh(); }
      document.dispatchEvent(new CustomEvent('menu:close-end'));
    }
    function przelacz() {                                    // de()
      const L = html.getAttribute('data-menu-open') === 'true';
      E.set(napis, { yPercent: 0, overwrite: 'auto' });
      if (os_ && os_.isActive()) { os_.reversed() ? os_.play() : os_.reverse(); return; }
      os_ && os_.kill(); os_ = null;
      hoverTl && hoverTl.kill(); hoverTl = null;
      if (!L) {                                              // otwieranie
        html.setAttribute('data-menu-open', 'true'); html.classList.add('sm-menu');
        wnetrze.removeAttribute('inert');
        btn.setAttribute('aria-expanded', 'true'); btn.setAttribute('aria-label', 'zamknij menu');
        document.dispatchEvent(new CustomEvent('menu:open-start'));
        blokada = 'open'; wazne(false);
        Es = SM.lenis.scroll; SM.lenis.stop();
        mTop = docTop(); przypnij(true);
        strona.style.willChange = 'transform';
      }
      const c = cel();
      const tl = os_ = E.timeline({
        defaults: { duration: 1.2, ease: 'main' },
        onUpdate: rysuj,
        onComplete: () => {
          os_ = null;
          if (L) koniecZamykania();
          else { otw = true; SM.menu.otwarte = true; }
        },
        onReverseComplete: () => {
          os_ = null;
          if (L) { otw = true; SM.menu.otwarte = true; html.setAttribute('data-menu-open', 'true'); ustawKolory(kolory('menu')); }
          else koniecZamykania();
        },
      });
      marginesy(tl, L);
      tl.to(ikona, { rotation: L ? 0 : 45, transformOrigin: '50% 50%', overwrite: 'auto' }, 0);
      if (!L) {
        const z = kolory(motyw), m = kolory('menu');
        tl.fromTo(ikona, { backgroundColor: z.menuIconBg, borderColor: z.menuIconBorder },
          { backgroundColor: m.menuIconBg, borderColor: m.menuIconBorder, overwrite: 'auto' }, 0);
        tl.fromTo(paski, { backgroundColor: z.menuIconBarsBg }, { backgroundColor: m.menuIconBarsBg, overwrite: 'auto' }, 0);
        tl.set(p1, { top: '49%', rotation: 0, transformOrigin: '50% 50%' }, 0);
        tl.set(p2, { bottom: '49%', rotation: 90, transformOrigin: '50% 50%' }, 0);
      } else {
        // [pomiar] oryginał przy zamykaniu od razu wraca do kolorów motywu (tło kółka przezroczyste w 1. klatce)
        ustawKolory(kolory(motyw));
        tl.to(p1, { top: '42%', rotation: 0, transformOrigin: '50% 50%', overwrite: 'auto' }, 0);
        tl.to(p2, { bottom: '42%', rotation: 0, transformOrigin: '50% 50%', overwrite: 'auto' }, 0);
      }
      tl.to(st, { y: L ? 0 : c.y, s: L ? 1 : c.s, r: L ? 0 : 16 }, 0);      // top, scale, border-radius 1rem
      rysuj();
    }
    btn.addEventListener('click', (e) => { e.preventDefault(); przelacz(); });
    // klik w stronę przy otwartym menu zamyka (t.__menuOutsideHandler)
    strona.addEventListener('click', (e) => {
      if (html.getAttribute('data-menu-open') !== 'true') return;
      e.preventDefault(); e.stopPropagation(); przelacz();
    }, true);
    // linki menu do sekcji tej strony: skok pod zamykającą się stroną, zamknięcie
    wnetrze.addEventListener('click', (e) => {
      const a = e.target.closest('a'); if (!a) return;
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      e.preventDefault();
      const t = href.length > 1 && document.getElementById(href.slice(1));
      if (t) {
        // położenie celu w dokumencie mimo transformacji <main>
        const mr = strona.getBoundingClientRect(), tr = t.getBoundingClientRect();
        const y = Math.min(SM.lenis.limit, Math.max(0, mTop + (tr.top - mr.top) / st.s));
        SM.nav._skok(y); Es = SM.lenis.scroll;
        przypnij(false); przypnij(true); rysuj();
        ScrollTrigger.update();
      }
      if (html.getAttribute('data-menu-open') === 'true') przelacz();
    });
    addEventListener('resize', () => {
      if (html.getAttribute('data-menu-open') !== 'true') return;
      zmianaOkna = true;
      if (otw && !os_) { const c = cel(); st.y = c.y; st.s = c.s; rysuj(); }
    });
    wnetrze.setAttribute('inert', '');
    SM.menu.przelacz = przelacz;
    SM.menu.otworz = () => { if (html.getAttribute('data-menu-open') !== 'true') przelacz(); };
    SM.menu.zamknij = () => { if (html.getAttribute('data-menu-open') === 'true') przelacz(); };
  }

  /* ================= przyciski i linki menu (button-hover.js) ================= */
  const DUR = .5;
  function przesuniecieLinku(a) {                         // w(): −(szerokość ikony + odstęp)
    const ic = a.querySelector('.navlink_icon');
    const cs = getComputedStyle(a);
    const g = parseFloat(cs.columnGap || cs.gap) || 0;
    const v = (ic ? ic.getBoundingClientRect().width : 0) + g;
    return v > 0 ? -v : '-2.3em';
  }
  SM.przyciski = function (root = document) {
    root.querySelectorAll('.button').forEach((b) => {
      if (b.dataset.smHover) return;
      const c = b.querySelector('.button-inner_content'); if (!c) return;
      b.dataset.smHover = '1';
      const spocznij = () => desktop() ? E.set(c, { x: '0em' }) : E.set(c, { clearProps: 'transform' });
      spocznij();
      const wjazd = () => { if (desktop()) E.to(c, { x: '2.25em', duration: DUR, ease: 'main', overwrite: 'auto' }); };
      const zjazd = () => desktop() ? E.to(c, { x: '0em', duration: DUR, ease: 'main', overwrite: 'auto' }) : spocznij();
      b.addEventListener('pointerenter', wjazd); b.addEventListener('pointerleave', zjazd);
      b.addEventListener('mouseenter', wjazd); b.addEventListener('mouseleave', zjazd);
      b.addEventListener('focusin', wjazd); b.addEventListener('focusout', zjazd);
    });
    root.querySelectorAll('.card').forEach((k) => {
      if (k.dataset.smHover) return;
      const i = k.querySelector('.button-sm_inner'), s = k.querySelector('.button-sm'); if (!i || !s) return;
      k.dataset.smHover = '1';
      const spocznij = () => { if (desktop()) { E.set(i, { x: '-0.75em' }); E.set(s, { backgroundColor: 'rgb(255, 255, 255)' }); } };
      spocznij();
      const wjazd = () => { if (!desktop()) return; E.to(i, { x: '0.25em', duration: DUR, ease: 'main', overwrite: 'auto' });
        E.to(s, { backgroundColor: 'rgb(244, 121, 32)', duration: DUR, ease: 'main', overwrite: 'auto' }); };
      const zjazd = () => { if (!desktop()) return spocznij(); E.to(i, { x: '-0.75em', duration: DUR, ease: 'main', overwrite: 'auto' });
        E.to(s, { backgroundColor: 'rgb(255, 255, 255)', duration: DUR, ease: 'main', overwrite: 'auto' }); };
      ['pointerenter', 'mouseenter', 'focusin'].forEach((t) => k.addEventListener(t, wjazd));
      ['pointerleave', 'mouseleave', 'focusout'].forEach((t) => k.addEventListener(t, zjazd));
    });
    root.querySelectorAll('.navlink').forEach((a) => {
      if (a.dataset.smHover) return;
      a.dataset.smHover = '1';
      E.set(a, { x: przesuniecieLinku(a) });
      const wjazd = () => { if (desktop()) E.to(a, { x: '0em', duration: DUR, ease: 'main', overwrite: 'auto' }); };
      const zjazd = () => desktop() ? E.to(a, { x: przesuniecieLinku(a), duration: DUR, ease: 'main', overwrite: 'auto' }) : E.set(a, { x: przesuniecieLinku(a) });
      ['pointerenter', 'mouseenter', 'focusin'].forEach((t) => a.addEventListener(t, wjazd));
      ['pointerleave', 'mouseleave', 'focusout'].forEach((t) => a.addEventListener(t, zjazd));
    });
  };
  let rafLinki = 0;
  addEventListener('resize', () => {                       // B(): linki menu od nowa po zmianie okna
    cancelAnimationFrame(rafLinki);
    rafLinki = requestAnimationFrame(() => document.querySelectorAll('.navlink[data-sm-hover]').forEach((a) => E.set(a, { x: przesuniecieLinku(a) })));
  });

  /* ================= tekst odsłaniany (text-reveal.js U()) ================= */
  const teksty = new Set();
  function podziel(el) {
    const s = new SplitText(el, { type: 'lines,words,chars', tag: 'span', linesClass: 'line', wordsClass: 'word', charsClass: 'char' });
    if (!s.chars.length) { s.revert(); return; }
    E.set(s.words, { display: 'inline-block', whiteSpace: 'nowrap' });
    E.set(s.chars, { opacity: .2, display: 'inline-block', willChange: 'opacity' });
    const tw = [];
    s.lines.forEach((ln) => {
      const ch = s.chars.filter((c) => ln.contains(c)); if (!ch.length) return;
      tw.push(E.to(ch, { opacity: 1, stagger: { each: .02, from: 'start' }, ease: 'none',
        scrollTrigger: { trigger: ln, start: 'top 85%', end: 'top 50%', scrub: true, refreshPriority: -1 } }));
    });
    el._smTekst = { s, tw };
  }
  function zwolnij(el) {
    const d = el._smTekst; if (!d) return;
    d.tw.forEach((t) => { t.scrollTrigger && t.scrollTrigger.kill(); t.kill(); });
    d.s.revert(); el._smTekst = null;
  }
  SM.tekst = function (el) {
    (typeof el === 'string' ? document.querySelectorAll(el) : el.length !== undefined ? el : [el]).forEach((e) => {
      if (teksty.has(e)) return; teksty.add(e); podziel(e);
    });
  };
  let szer = innerWidth, tPodzial = 0;
  addEventListener('resize', () => {                       // G(): revert + split po 200 ms (tylko gdy zmieniła się szerokość)
    if (innerWidth === szer) return; szer = innerWidth;
    clearTimeout(tPodzial);
    tPodzial = setTimeout(() => { teksty.forEach((e) => { zwolnij(e); podziel(e); }); ScrollTrigger.refresh(); }, 200);
  });

  /* ================= duży tytuł (text-display-reveal.js) ================= */
  SM.tytulDuzy = function (el) {
    if (!el || el._smTytul) return; el._smTytul = true;
    const t = el.closest('.display-text') || el;
    const g = [...el.querySelectorAll('.overlay-gradients .overlay-gradient')];
    if (!g.length) return;
    E.set(g, { width: '0%' });
    const eb = t.querySelector('.eyebrow-wrapper-a > .eyebrow-m');
    let slowa = [];
    if (eb) {
      if (!eb.dataset.splitted) {
        const cz = (eb.textContent || '').split(/(\s+)/); eb.textContent = '';
        cz.forEach((c) => { if (!c.trim().length) eb.appendChild(document.createTextNode(c));
          else { const s = document.createElement('span'); s.className = 'eyebrow-word'; s.textContent = c; eb.appendChild(s); } });
        eb.dataset.splitted = 'true';
      }
      slowa = [...eb.querySelectorAll('.eyebrow-word')];
      E.set(slowa, { display: 'inline-block', yPercent: 100, rotation: 70, transformOrigin: 'left bottom' });
    }
    const w = SM.mq('(max-width: 478px)') ? '130%' : '100%';
    const tl = E.timeline({ paused: true, defaults: { duration: 2, ease: 'main' } });
    tl.to(g, { width: w, stagger: .025 }, 0);
    if (slowa.length) tl.to(slowa, { duration: 1.2, yPercent: 0, rotation: 0, stagger: .02 }, 0);
    const st = ScrollTrigger.create({ trigger: el.querySelector('.display') || el, start: 'top 80%', refreshPriority: -1,
      onEnter: () => tl.play(0), toggleActions: 'play none none none' });
    tl.eventCallback('onComplete', () => st.kill());
  };

  /* ================= linki do sekcji w stronie ================= */
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented) return;
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || a.closest('.nav-inner') || a.closest('.navbar')) return;
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const t = id && document.getElementById(id);
    if (t) SM.lenis.scrollTo(t);
  });

  const start = () => {
    nawigacja();
    menu();
    SM.przyciski(document);
    // SplitText dzieli właściwy krój: gdy jakiś krój (np. latin-ext z ą, ż) jeszcze się ładuje, czekamy na fonts.ready
    const tekst = () => { SM.tekst('[tr="1"]'); document.querySelectorAll('.title-big').forEach(SM.tytulDuzy); };
    if (document.fonts.status === 'loaded') tekst();
    else document.fonts.ready.then(() => { tekst(); ScrollTrigger.refresh(); });
  };
  // base.js uruchamia sekcje w .then() po document.fonts.load; gdy kroje są już w pamięci, to .then wykonuje się zaraz
  // po base.js, zanim ten plik się zarejestruje (16.10.2026: zgłoszone kierownikowi). Wtedy start od razu.
  if (document.documentElement.classList.contains('sm-ready')) { start(); ScrollTrigger.refresh(); }
  else SM.sekcja('00-wspolne', start);
})();
