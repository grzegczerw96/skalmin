/* 06-technologia: sekcja „Technologia”. Ruch z kodu oryginału (orig/pretty):
   - wielki napis „Ponad 360 maszyn” (text-display-reveal.js): robi go SM.tytulDuzy z 00 (samo dla .title-big):
     paski .overlay-gradient width 0 → 100% (≤478: 130%), 2 s 'main', kaskada .025 (czarne paski z pomarańczowym czołem
     przesuwają się pod maską mix-blend lighten z tekstem); słowa podpisu z obrotu 70°, 1,2 s, kaskada .02;
     raz, gdy .display wejdzie na 80% ekranu; bez przypięcia i bez scrub
   - karty ≥992 (service-cards.js, CSS wstrzyknięty): najechanie = CSS (06-technologia.css): inne karty .machine-card_bg
     opacity .4 (.4 s cubic-bezier(.5,0,0,1)), wiersze opisu translateY 100% → 0 (.4 s ease, opóźnienie i × .03 s;
     zjazd od ostatniego wiersza, opóźnienia odwrócone)
   - ≤991: opis pod tytułem, klik w kartę otwiera / zamyka (service-cards.js, w. 404–481): .machine-bottom-wrap wysokość
     wiersza tytułu → scrollHeight, 1,2 s 'main' (machinesStep = M0,0 C0.6,0 0,1 1,1); przyciski OTWÓRZ / ZAMKNIJ
     yPercent 0 → −100, plus w ZAMKNIJ obrót 0 → 135°, 1,2 s; otwarcie jednej karty zamyka pozostałe
   - akapity tr="1": komponent 00 */
SM.sekcja('06-technologia', () => {
  const sek = document.querySelector('.section_technology');
  if (!sek) return;
  const karty = [...sek.querySelectorAll('.machine-card')];
  const maly = () => SM.mq('(max-width: 991px)');
  const odnow = () => ScrollTrigger.refresh();

  const wiersz = (k) => Math.max(0, Math.round(k.querySelector('.machines_label').getBoundingClientRect().height)) || 24;
  function przyciski(k, otwarte) {
    const w = k.querySelector('.machine_button-wrap');
    gsap.to(w.querySelectorAll('.machine_button, .machines_button'), { yPercent: otwarte ? -100 : 0, duration: 1.2, ease: 'main' });
    gsap.to(w.querySelector('.machines_button.is-close > .is-plus'), { rotate: otwarte ? 135 : 0, duration: 1.2, ease: 'main' });
  }
  function stan(k) {
    const b = k.querySelector('.machine-bottom-wrap');
    if (!maly()) {
      gsap.killTweensOf(b); b.style.height = ''; b.style.overflow = ''; k.classList.remove('is-open');
      gsap.set(k.querySelectorAll('.machine_button, .machines_button, .is-close > .is-plus'), { clearProps: 'all' });
      return;
    }
    b.style.overflow = 'hidden';
    if (k.classList.contains('is-open')) b.style.height = 'auto'; else b.style.height = wiersz(k) + 'px';
  }
  function otworz(k) {
    const b = k.querySelector('.machine-bottom-wrap');
    const p = wiersz(k), h = b.scrollHeight;
    if (b.style.height === 'auto') b.style.height = b.scrollHeight + 'px';
    b.style.height = p + 'px';
    k.classList.add('is-open');
    gsap.to(b, { height: h, duration: 1.2, ease: 'main', overwrite: true, onComplete: () => { b.style.height = 'auto'; odnow(); } });
    przyciski(k, true);
  }
  function zamknij(k) {
    const b = k.querySelector('.machine-bottom-wrap');
    const p = wiersz(k);
    if (b.style.height === 'auto') b.style.height = b.scrollHeight + 'px';
    k.classList.remove('is-open');
    gsap.to(b, { height: p, duration: 1.2, ease: 'main', overwrite: true, onComplete: odnow });
    przyciski(k, false);
  }
  karty.forEach((k) => {
    k.addEventListener('click', () => {
      if (!maly()) return;
      if (k.classList.contains('is-open')) zamknij(k);
      else { karty.forEach((o) => { if (o !== k && o.classList.contains('is-open')) zamknij(o); }); otworz(k); }
    });
    stan(k);
  });
  let szer = innerWidth, t = null;
  addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => { if (innerWidth !== szer) { szer = innerWidth; karty.forEach(stan); } }, 150);
  });
});
