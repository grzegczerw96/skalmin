/* 09-nastepna: tło i przycisk „Następna strona”. Odtworzone z main.js oryginału:
   - tło (id, w. 6829–6905): .next_background scale 1,2 (środek), y = S × 40 px, S = (środek sekcji − środek okna) /
     (wysokość sekcji / 2 + wysokość okna / 2), obcięte do −1…1; liczone przy przewijaniu (ScrollTrigger scrub + lenis scroll)
   - przycisk (Cp, w. 6938–6985): gdy góra sekcji u < 0, transform translate3d(0, calc(−50% + u px), 0); inaczej brak
     (sticky robi css); odświeżane co tyknięcie GSAP i przy zmianie rozmiaru
   - kliknięcie przycisku (odstępstwo zatwierdzone: bez podstrony i Barba): skok do #uslugi robi wspólny kod z 00; tu tylko
     przyciemnienie tła 1 → 0 (0,6 s, power1.out, przy prefers-reduced-motion 0 s; main.js w. 12032–12060), po wyjeździe
     sekcji z okna wraca do 1. Oryginał po kliknięciu: przewija do góry sekcji (0,5 s power1.inOut), gasi przyciemnienie,
     potem 1,4 s 'main': przycisk zwija wysokość do 0, ta strona zanika, nowa wjeżdża. Samoczynnego przejścia na końcu
     strony oryginał nie ma. */
SM.sekcja('09-nastepna', () => {
  const sek = document.querySelector('.section_next');
  if (!sek) return;
  const bg = sek.querySelector('.next_background');
  const btn = sek.querySelector('.next-button-wrapper');

  if (bg) {
    gsap.set(bg, { transformOrigin: '50% 50%', xPercent: 0, yPercent: 0, scale: 1.2 });
    const ustaw = gsap.quickSetter(bg, 'y', 'px');
    const licz = () => {
      const r = sek.getBoundingClientRect();
      const s = Math.max(-1, Math.min(1, ((r.top + r.height / 2) - innerHeight / 2) / Math.max(1, r.height / 2 + innerHeight / 2)));
      ustaw(s * 40);
    };
    ScrollTrigger.create({ trigger: sek, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true,
      onRefresh: licz, onUpdate: licz,
      onToggle: (st) => { if (!st.isActive) { gsap.killTweensOf(bg); gsap.set(bg, { '--next-overlay-opacity': 1 }); } } });
    SM.lenis.on('scroll', licz);
    licz();
  }

  if (btn) {
    let ost = null;
    const przycisk = () => {
      const g = sek.getBoundingClientRect().top;
      const u = g < 0 ? g : 0;
      if (ost !== null && Math.abs(ost - u) < .05) return;
      ost = u;
      if (u < -.05) btn.style.transform = `translate3d(0, calc(-50% + ${u}px), 0)`;
      else btn.style.removeProperty('transform');
    };
    przycisk();
    gsap.ticker.add(przycisk);
    addEventListener('resize', przycisk);
  }

  const a = sek.querySelector('[pt-next]');
  if (a && bg) {
    a.addEventListener('click', () => {
      const ogr = matchMedia('(prefers-reduced-motion: reduce)').matches;
      gsap.set(bg, { '--next-overlay-opacity': 1 });
      gsap.to(bg, { '--next-overlay-opacity': 0, duration: ogr ? 0 : .6, ease: 'power1.out', overwrite: true });
    });
  }
});
