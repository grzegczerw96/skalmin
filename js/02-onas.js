/* 02-onas: sekcja „O nas”. Ruch z kodu oryginału:
   - obraz .image-p (main.js nd(), w. 6498–6710): yPercent −10 → 10, ease none, scrub true; trigger .image-wrapper,
     start 'top bottom', koniec += wysokość pudełka + wysokość okna (invalidateOnRefresh)
   - ikony kart (service-icons.js _r(), main.js w. 9755–9990): stoją na klatce 0; gdy sekcja wejdzie w ekran
     (IntersectionObserver, próg 0,01; albo już jest w ekranie) każda ikona raz gra pierwszą połowę; najechanie karty:
     pierwsza połowa od 0, zjazd: druga połowa (js/ikony.js)
   - akapit tr="1": komponent 00 (SM.tekst), nic tu. Karty i liczby bez wjazdu (oryginał: brak). */
SM.sekcja('02-onas', () => {
  const sek = document.querySelector('.section_about');
  if (!sek) return;

  // paralaksa obrazu
  sek.querySelectorAll('.image-p').forEach((img) => {
    const box = img.closest('.image-wrapper');
    gsap.fromTo(img, { yPercent: -10 }, { yPercent: 10, ease: 'none', immediateRender: false,
      scrollTrigger: { trigger: box, start: 'top bottom', end: () => '+=' + Math.max(1, Math.round(box.getBoundingClientRect().height + innerHeight)),
        scrub: true, invalidateOnRefresh: true } });
  });

  // ikony
  if (!SM.ikony) return;
  const ikony = [];
  sek.querySelectorAll('.stats-card').forEach((karta) => {
    const el = karta.querySelector('[data-ikona]');
    const ik = el && SM.ikony.wstaw(el, el.dataset.ikona);
    if (!ik) return;
    SM.ikony.karta(karta, el);
    ikony.push(ik);
  });
  let zagrane = false;
  const wejscie = () => { if (zagrane) return; zagrane = true; ikony.forEach((ik) => ik.wejscie()); };
  const r = sek.getBoundingClientRect();
  if (r.bottom > 0 && r.top < innerHeight) wejscie();
  else {
    const io = new IntersectionObserver((w) => { if (w.some((x) => x.isIntersecting)) { io.disconnect(); wejscie(); } }, { threshold: .01 });
    io.observe(sek);
  }
});
