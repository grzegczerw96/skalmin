# 10 · stopka · stan: do zrobienia

Twoje pliki: `css/10-stopka.css`, `js/10-stopka.js`, HTML między `<!-- S:10-stopka -->` … `<!-- /S:10-stopka -->`.
Wspólne: logo z 00 (skopiuj SVG logo z HTML sekcji 00, nie zmieniaj go), `eyebrow-s`.

**Oryginał:** `.footer`; 1440×900: wysokość 447 px (≈0,5 ekranu); 375×812: y 18794, 0,72 ekranu [survey, ref.json].
HTML `orig\sekcje\10-stopka.html`. CSS: Webflow (`footer`, `footer-inner`, `footer_left/right`, `footer-links`,
`footer-links_col`, `footer-link`, `footer-p`, `footer_socials`, `footer_social-link`, `social-logo`) + wstrzyknięty
`.footer-link{position:relative}`, `.footer-link:after` (kreska 1 px `#151515`, `scaleX(0)` → `1`, 0,5 s
`cubic-bezier(.32,.01,0,1)`, `transform-origin` prawo → lewo przy zjeździe). JS: brak własnego (sprawdź w main.js
`footer`). Referencja: `out\cominvi\ref\sek_375x812_s9_p*.jpg`, `sek_1440x900_s8_p4.jpg` (koniec strony).

**Praktyki:** `praktyki/mysz.md#Najechanie`.

## Układ
Białe tło; lewo: logo SkalMin + 3 ikony społecznościowe (własne proste SVG: LinkedIn / Instagram / Facebook zastąp
neutralnymi znakami „in”, kwadrat-obiektyw, „f”? — użyj ogólnych kształtów, bez logo marek, jeśli to możliwe; jeśli
oryginał ma logo marek społecznościowych, dopuszczalne proste ogólne ikony); prawo: 4 kolumny (Odkryj / Biblioteka /
Prawne / Kontakt) z linkami; na dole pasek „2026 SkalMin - Projekt i wykonanie: studium odtworzenia”. Teksty:
`brand.md` → 00. Linki do sekcji tej strony (`#uslugi`, `#technologia`, `#bezpieczenstwo`, `#onas`), reszta `#`.

## Kluczowe elementy
Podkreślenie linku przy najechaniu (wjazd i zjazd), przejście 09 → stopka (czy stopka wyjeżdża spod 09).

## Telefon
375: 0,72 ekranu, układ kolumn.

## Gotowe, gdy
B1, B3, B5, B7 + liczby: wysokość stopki, położenie kolumn (vw), czas podkreślenia.
