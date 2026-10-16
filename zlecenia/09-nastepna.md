# 09 · następna strona · stan: do zrobienia

Twoje pliki: `css/09-nastepna.css`, `js/09-nastepna.js`, HTML między `<!-- S:09-nastepna -->` …
`<!-- /S:09-nastepna -->`. Wspólne: komponenty 00 (etykieta, przycisk w wariancie białym). `bg="black"`.

**Oryginał:** `.section_next` (`pt-next`); 1440×900: y 16157, 1 ekran; 375×812: y 17982, 1 ekran [ref.json];
`height:calc(100svh + 0px)` [css-wstrz]. HTML `orig\sekcje\09-nastepna.html`. CSS: Webflow + wstrzyknięty
(`.section_next{position:relative;height:calc(100svh)}`, `.next-button-wrapper{will-change:transform}`,
`.section_next .next_background:after{background:#00000026;opacity:var(--next-overlay-opacity,1)}`, ≤991
`padding-top:1em`). JS (`orig\pretty\main.js`): w. 6829–6980 (`id`, `od`, `Cp`: tło i przycisk przy przewijaniu),
11926–11960 i 12020–12060 (nakładka, `prefers-reduced-motion` w. 12032: przy ograniczeniu ruchu
`--next-overlay-opacity:1` — **jedyne miejsce strony głównej, które reaguje na ograniczenie ruchu; zrób tak samo**),
przejście Barba do podstrony usług po dojechaniu (szukaj `pt-next`). Przeczytaj całe.
Referencja: `out\cominvi\ref\sek_*_s8_p*.jpg` (+ stopka w p1.0).

**Praktyki:** `praktyki/przewijanie.md#Nachodzenie sekcji`, `praktyki/przewijanie.md#Paralaksa`.

## Układ i ruch
Pełnoekranowe zdjęcie (ciemne) z przyciemnieniem, etykieta „S.08 · Następna strona” (biała), biały przycisk „Nasze
usługi” jadący z przewijaniem (`next-button-scroll`). Ruch tła i przycisku z kodu. **Odstępstwo zatwierdzone:** nie
mamy podstrony; zamiast przejścia Barba przycisk prowadzi do `#uslugi` (płynny skok `SM.lenis.scrollTo`), a automatyczne
przejście po dojechaniu pomijamy — zapisz w raporcie, co oryginał robi w tym miejscu (liczby), żeby Grzegorz mógł
zdecydować.

## Kadry
`img/nastepna.webp` (Pexels 14761195, ludzie w pomarańczowych kombinezonach z lampami w ciemnej hali): pudełko,
`object-fit`, temat jak oryginał ±5%, ruch obrazu (paralaksa?) — obraz większy o tyle, o ile jedzie.

## Kluczowe elementy
Ruch tła i przycisku przy przewijaniu, przejście 08 → 09, stopka pod 09 (czy 09 odjeżdża, czy stopka wyjeżdża spod).

## Przejście z sekcją powyżej
08 (biała) → 09 (czarna): kolor nawigacji (blend) i granica (B5).

## Gotowe, gdy
B1, B2, B5, B6, B7 + liczby: położenie przycisku w 0 / 0,5 / 1, przesunięcie tła, krycie nakładki.
