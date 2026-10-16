# 08 · partnerzy · stan: do zrobienia

Twoje pliki: `css/08-partnerzy.css`, `js/08-partnerzy.js`, HTML między `<!-- S:08-partnerzy -->` …
`<!-- /S:08-partnerzy -->`. Wspólne: komponenty 00 (etykieta, `tr`). `bg="white"`.

**Oryginał:** `.section_partners`; 1440×900: y 13240, 2917 px = 3,24 ekranu; 375×812: y 15532, 3,02 ekranu [ref.json].
HTML `orig\sekcje\08-partnerzy.html` (atrybuty `data-cylinder-zones="48"`, `data-text-zones="20"`,
`data-tick-zones="23"`, `data-tick-multiplier="8"`). CSS: Webflow + wstrzyknięty (`.cylindar__*` z
`perspective:70vw`, `--cylinder-viewport-height`, `--cylinder-visual-offset`, `--cylinder-indicator-height`,
`.scroll-tick{height:1.5px}`, `.cylindar__text__item .body-xl{transition:all .15s ease-in-out}`,
`.section_partners .content.is-12-col{margin-top:-10em}` (≤767: `-25em`, `padding-bottom:2em`), `.scroll-item>.body-xl
{transition:all .2s ease-in-out}`, ≤767 `.cylindar__text__item .body-xl.is-o-20,.is-active{font-size:1em}`). JS
(`orig\pretty\`): `cylinder.js` (cały: walec 3D z nazwami obracany przewijaniem, kreski wskaźnika po bokach) i
`scroll-list.js` (cały). Przeczytaj oba.
Referencja: `out\cominvi\ref\sek_*_s7_p*.jpg`.

**Praktyki:** `praktyki/przewijanie.md#Przypięcie`, `praktyki/przewijanie.md#Paralaksa`.

## Układ i ruch
Etykieta „S.07 · Nasi partnerzy”, akapit `body-xl` 3 wiersze (odsłaniany), potem przypięty walec: 14 nazw spółek
(3 kopie listy w HTML) na obracającym się walcu 3D, aktywna nazwa w środku czarna, reszta `opacity .05`
(`is-o-20`) / `.15`; po bokach skale z kreskami (wskaźnik postępu). Obrót, strefy (`zones`), przełączanie aktywnej
nazwy — liczby z kodu. Nazwy: `brand.md` → 08 (fikcyjne).

## Kluczowe elementy
Obrót walca względem przewijania (kąt w 8 punktach w dół i w górę), aktywna nazwa, kreski wskaźnika; prawdziwe kółko
w dół / w górę / w dół.

## Przejście z sekcją powyżej
07 → 08 (B5); `margin-top:-10em` kolumny 12 [css-wstrz]: nachodzenie na akapit?

## Telefon
375: 3,02 ekranu; `margin-top:-25em` [css-wstrz]; rozmiar nazw `1em` na ≤767 [css-wstrz].

## Ryzyka
- Transformacje 3D w przeglądarce bez okna renderują się zawodnie: porównuj wartości z DOM (`getComputedStyle().transform`),
  obraz tylko pomocniczo (`narzedzia.md`).

## Gotowe, gdy
B1, B2, B5, B7 + liczby: wysokość 3,24 / 3,02 ekranu, kąt walca w połowie, która nazwa aktywna w 0,25 / 0,5 / 0,75.
