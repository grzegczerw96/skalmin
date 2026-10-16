# 05 · bezpieczeństwo · stan: do zrobienia

Twoje pliki: `css/05-bezpieczenstwo.css`, `js/05-bezpieczenstwo.js`, HTML między `<!-- S:05-bezpieczenstwo -->` …
`<!-- /S:05-bezpieczenstwo -->`. Wspólne: komponenty 00 (etykieta, `tr`, przycisk). `id="bezpieczenstwo"`, `bg="white"`.

**Oryginał:** `.section_safety.is-lenis-sticky`; 1440×900: y 6516, 1635 px = 1,82 ekranu; 375×812: y 7205, 1,48
ekranu [ref.json]. HTML `orig\sekcje\05-bezpieczenstwo.html`. CSS: Webflow (`sticky-wrap`, `content-s`, `is-s-wrap`,
`image-wrapper.is-w-5.is-safety`, `is-big-safety` …) + wstrzyknięty `orig\main-wstrzykniety.css`
(`.section_safety.is-lenis-sticky .body-m[data-lenis-sticky]{position:relative!important;top:auto!important}`,
`@media (min-width:991px){.is-big-safety{aspect-ratio:2/2.5}}`, `.is-s-wrap{column-gap:2em}`). JS: `orig\pretty\
safety-sticky.js` (cały) + `main.js` w. 7357–7410 (`is-sticky-50`) i 10033–10060; `tr` = komponent 00.
Referencja: `out\cominvi\ref\sek_*_s4_p*.jpg`.

**Praktyki:** `praktyki/przewijanie.md#Przypięcie`, `praktyki/przewijanie.md#Tekst przewijaniem`.

## Układ
Etykieta „S.04 · Polityka bezpieczeństwa”, akapit `body-xl` 5 wierszy (odsłaniany), pod nim zdjęcie pionowe po lewej
(`is-portrait`, proporcja 2/2,5 na ≥991) i po prawej `body-m` 3 wiersze + przycisk „Czytaj dalej”; tekst po prawej
przyklejony (sticky) w czasie przewijania zdjęcia? (z kodu). Teksty: `brand.md` → 05.

## Kadry
`img/bezpieczenstwo.webp` (Pexels 34438147, górnik w masce z czołówką): pudełko i temat (twarz / maska) jak oryginał
±5%, ruch obrazu w pudełku, jeśli jest.

## Kluczowe elementy
Przyklejenie prawej kolumny (start / koniec), ruch zdjęcia, tekst odsłaniany.

## Przejście z sekcją powyżej
04 (biała, przypięta) → 05: po odpięciu 04 granica i tło (B5), tekst 04 nie wchodzi na tekst 05.

## Telefon
375: 1,48 ekranu; `.content.is-safety` kolumna ≤767, `.image-wrapper.is-w-5.is-safety{width:100%}` [css].

## Gotowe, gdy
B1, B2, B5, B6, B7 + liczby: wysokość 1,82 / 1,48 ekranu, pudełko zdjęcia (vw), zakres przyklejenia (px przewinięcia).
