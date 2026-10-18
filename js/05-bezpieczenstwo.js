/* 05-bezpieczenstwo: sekcja „Polityka bezpieczeństwa”.
   - paralaksa obrazu .image-p: jak w 02 (main.js nd()): yPercent −10 → 10, ease none, scrub true; trigger .image-wrapper,
     start 'top bottom', koniec += wysokość pudełka + wysokość okna
   - przyklejenie tekstu (assets/safety-sticky.js, tylko ≥992): pin .body-m od chwili, gdy jego góra dojdzie do
     (okno·0,5 − wysokość/2), do chwili, gdy dół .sticky-wrap dojdzie do dołu tekstu (pinSpacing false) = CSS sticky;
     tu tylko liczymy top (zmienna --safety-top) przy każdym odświeżeniu
   - akapit tr="1": komponent 00 (SM.tekst) */
SM.sekcja('05-bezpieczenstwo', () => {
  const sek = document.querySelector('.section_safety');
  if (!sek) return;

  sek.querySelectorAll('.image-p').forEach((img) => {
    const box = img.closest('.image-wrapper');
    gsap.fromTo(img, { yPercent: -10 }, { yPercent: 10, ease: 'none', immediateRender: false,
      scrollTrigger: { trigger: box, start: 'top bottom', end: () => '+=' + Math.max(1, Math.round(box.getBoundingClientRect().height + innerHeight)),
        scrub: true, invalidateOnRefresh: true } });
  });

  const tekst = sek.querySelector('.sticky-wrap .body-m');
  const top = () => { if (tekst) tekst.style.setProperty('--safety-top', Math.max(0, Math.round(innerHeight * .5 - tekst.offsetHeight * .5)) + 'px'); };
  top();
  ScrollTrigger.addEventListener('refreshInit', top);
});
