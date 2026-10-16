# 02 · o nas · stan: do zrobienia

Twoje pliki: `css/02-onas.css`, `js/02-onas.js`, HTML między `<!-- S:02-onas -->` … `<!-- /S:02-onas -->`. Komponenty
wspólne (etykieta sekcji, tekst odsłaniany `tr`, przycisk): opis na górze `css/00-wspolne.css` / `js/00-wspolne.js`;
używaj ich, nie buduj od nowa. Sekcja ma `id="onas"` (link z menu) i `bg="white"` jak oryginał.

**Oryginał:** `.section_about`; 1440×900: y 900, wysokość 1538 px = 1,71 ekranu; 375×812: y 812, 2,38 ekranu
[ref.json]. HTML: `%LOCALAPPDATA%\wir-tools\out\cominvi\orig\sekcje\02-onas.html`. CSS: Webflow CSS (`cssrules.py`
dla klas z HTML) i wstrzyknięty `orig\main-wstrzykniety.css` (`.section_about …`, `.stats-card`, `.icon-wrap
{mix-blend-mode:multiply}`, reguły ≤767). JS (`orig\pretty\`): obraz `image-p is-portrait` (szukaj w `main.js`
`image-p` / `parallax`, w. 6498–6710), ikony kart liczb Lottie `data-lottie="11"…"16"` (`service-icons.js`: lottie-web
z danymi animacji; `main.js` w. 9755–9990: leniwe ładowanie, wyzwalacze), tekst `tr="1"` (komponent 00). Przeczytaj
całe te fragmenty.
Referencja: `out\cominvi\ref\sek_1440x900_s1_p*.jpg`, `sek_375x812_s1_p*.jpg` (s1 = ta sekcja), `sekcje_*.jpg`.
Narzędzia na oryginale: `py -I narzedzia\orig.py <narzędzie>.py …`.

**Praktyki:** `praktyki/przewijanie.md#Paralaksa`, `praktyki/przewijanie.md#Wjazd elementów`, `praktyki/grafika.md#Zamienniki`.

## Układ (zmierz pudełka na 1440 i 375, B1)
Etykieta „S.01 · O nas”; akapit `body-xl` (3 wiersze) odsłaniany; zdjęcie pionowe po lewej; siatka 6 kart liczb
(`stats-card`: ikona Lottie, `stat_number` 2,5em, podpis `eyebrow-m o-60`), kreski między kartami; po prawej akapit
`body-s` i przycisk „O nas”. Teksty: `brand.md` → 02 (podział `/` = wiersz).

## Ruch (ustal z kodu i pomiaru, B2)
Zdjęcie: ruch w pudełku przy przewijaniu (paralaksa / skala? o ile %, w jakim zakresie); karty liczb: wjazd? ikony
Lottie: kiedy grają (wejście w ekran / najechanie), czas i krzywa z JSON. Liczby: czy liczą się w górę.

## Kadry (B6)
Zdjęcie `img/onas.webp` (Pexels 6831219, dwie osoby z czołówkami, pomarańczowa kurtka): pudełko, `object-fit` i punkt
zaczepienia jak oryginał; temat (twarze / światła) w tym samym miejscu ±5%; obraz większy od pudełka o tyle, o ile jedzie.
Ikony: własne SVG/Lottie o tym samym ruchu co ikony oryginału (prosta kreska jak oryginał; tematy: metry, tony, ludzie,
praca, projekty aktywne, ukończone) — możesz zapisać jako Lottie JSON i odtwarzać `lottie-web` w wersji z oryginału
(sprawdź wersję w `service-icons.js`, plik do `lib/`), albo SVG + GSAP o tych samych czasach. Ikony będą też w 03 i 07:
zrób je w osobnym pliku `js/ikony.js` (twoje; opisz API na górze) tak, żeby sekcje 03 i 07 mogły dodać swoje.

## Kluczowe elementy
Tekst odsłaniany (komponent, sprawdź tylko, że działa tu), ruch zdjęcia, ikony Lottie, przycisk.

## Przejście z sekcją powyżej
Hero (ciemna) → 02 (biała): granica przy 85 / 50 / 15% wysokości okna w dół i w górę; kolor nawigacji (blend
`difference`) w tych punktach (B5).

## Telefon
≤767: `.section_about .content{grid-row-gap:2em}`, `.stats-card{padding-bottom:2em}`, przycisk `margin-bottom:0`
[css-wstrz]; ≤479 `padding-top:1em`; `content_column.align-r` `order:-1` [css].

## Gotowe, gdy
B1, B2, B5, B6, B7 + liczby: wysokość sekcji (ekrany) 1,71 / 2,38, pudełko zdjęcia (vw), położenie siatki liczb, czas
ikony Lottie.

## Pomiary podagenta 02 (16.10)
- Pudełka 1440 (vw od góry sekcji) [pomiar]: zdjęcie x 2,22 y 30 w 47,22 h 59,03; obraz w środku 120 % × 120 %, top −12 %,
  left 0 (widać lewe 83 % obrazu); siatka liczb x 50,56 y 30 w 47,22 h 23,36, karty 23,06 × 4,83, rzędy co 9,27;
  ikona 3,33 × 3,33 (3em); tekst + przycisk x 74,17 y 72,26 w 23,61 (dół kolumny = dół zdjęcia). 375: siatka y 117,5
  (kolejność: liczby, tekst, zdjęcie y 396,5 w 91,8 h 114,7), sekcja 2,38 ekranu.
- Paralaksa [kod main.js nd()]: yPercent −10 → 10 obrazu (o 12 % wysokości pudełka w każdą stronę), ease none,
  scrub true, start 'top bottom' pudełka, koniec += wysokość pudełka + okno; w 4 punktach góra obrazu −0,24 / −0,16 /
  −0,08 / 0 wysokości pudełka [pomiar].
- Ikony [kod service-icons.js]: Lottie icon-11 (60 kl./s, 182 kl.), icon-12…16 (30 kl./s, 91 kl.) = 3,03 s; połowa
  floor(kl. × 0,5) = 91 / 45 kl. = 1,52 / 1,5 s; wejście sekcji (IO próg 0,01) raz gra 0 → połowa; najechanie karty
  0 → połowa, zjazd połowa → koniec. Krycie ikony 1 (style.opacity = 1 z kodu, mimo .is-2 {opacity:.5}).
- Karty i liczby bez wjazdu, liczby nie liczą się w górę [kod: brak takich animacji w main.js].
