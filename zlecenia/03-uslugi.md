# 03 · usługi · stan: do zrobienia

Twoje pliki: `css/03-uslugi.css`, `js/03-uslugi.js`, HTML między `<!-- S:03-uslugi -->` … `<!-- /S:03-uslugi -->`.
Wspólne: komponenty 00 (etykieta, `tr`, przycisk) i ikony z `js/ikony.js` (sekcja 02: dodaj swoje 5 ikon przez jego
API; jeśli API nie pozwala, opisz w raporcie, czego potrzebujesz). `id="uslugi"`, `bg="white"`.

**Oryginał:** `.section_services`; 1440×900: y 2438, 1648 px = 1,83 ekranu; 375×812: y 2744, 2,79 ekranu [ref.json].
HTML `orig\sekcje\03-uslugi.html`. CSS: Webflow + wstrzyknięty `orig\main-wstrzykniety.css` (dużo reguł
`.service-card …` dla ≥992: tytuł `body-l` na dole karty, opis `.desc` wysuwa się `height` + `opacity` 0,8 s
`cubic-bezier(.5,0,0,1)`, `.is-card-reveal-pending`, `html[data-menu-open] .service-card`, ≤767 `padding` kart).
JS (`orig\pretty\`): `service-cards.js` (cały: najechanie kart, opis wierszami `line-inner`), `cards-reveal.js` (wjazd
kart), ikony Lottie `data-lottie="1"…"5"` (`service-icons.js`, `main.js` w. 9755–9990), obrazy `service-image is-1…5`
w `services-viewer` (szukaj w `service-cards.js` / `main.js`: obraz za kursorem albo w karcie przy najechaniu?),
`tr` (komponent 00). Przeczytaj całe.
Referencja: `out\cominvi\ref\sek_*_s2_p*.jpg`. Najechania oryginału nagraj sam (co 50 ms, B3) — tylko kluczowe.

**Praktyki:** `praktyki/mysz.md#Najechanie`, `praktyki/przewijanie.md#Wjazd elementów`, `praktyki/mysz.md#Mysz steruje`.

## Układ
Etykieta „S.02 · Nasze usługi”, akapit `body-xl` 4 wiersze (tło sekcji `--light-green`? zmierz), siatka 3 kolumn
`is-grid-3`: 5 kart (ikona, tytuł `body-l`, opis `body-s` 3 wiersze), przycisk „Zobacz więcej” (`button-lg`?). Teksty:
`brand.md` → 03; opisy kart napisz sam (oryginał w `teksty.tsv`: ta sama liczba słów w każdym z 3 wierszy, długość
±10%) i dopisz do `brand.md` → 03.

## Ruch i najechania
Wjazd kart (kaskada: krok, czas, naraz w ruchu), najechanie karty (tytuł w górę, opis wierszami, obraz
`service-image` — gdzie i jak), ikony Lottie (kiedy grają). Zjazd myszy w połowie.

## Kadry
`img/usluga-1..5.webp` (Pexels: ludzie w kaskach / hala / jaskinia z czołówką / szlifowanie z iskrami / kryształy) w
pudełkach i kadrach jak `service-image is-1..5` oryginału (B6).

## Kluczowe elementy
Najechanie karty (wjazd i zjazd co 50 ms obok oryginału), wjazd kart, obraz przy najechaniu.

## Przejście z sekcją powyżej
02 (biała) → 03: kolor tła (biały → jasnozielony?) i w którym miejscu (B5).

## Telefon
375: karty jedna kolumna?, opis widoczny bez najechania? (≥992 reguły tylko desktop). ≤767 `.section_services
.service-card{padding:1.5em 2em 2em 1.5em}`, `.card-inner{gap:4em}` [css-wstrz].

## Gotowe, gdy
B1, B2, B3, B5, B6, B7 + liczby: wysokość 1,83 / 2,79 ekranu, pudełka kart (vw), czasy najechania, kaskada wjazdu.
