# 01 · plansza ładowania + hero · stan: do zrobienia

Twoje pliki: `css/01-hero.css`, `js/01-hero.js`, HTML między `<!-- S:01-hero -->` … `<!-- /S:01-hero -->` (plansza
`.loader` może leżeć w tym samym bloku, na początku). Media: `video/` i `img/hero/` (twoje). Komponenty wspólne
(nawigacja, przycisk, etykieta, tekst odsłaniany): opis na górze `css/00-wspolne.css` i `js/00-wspolne.js`.

**Oryginał:** `.section_hero` (atrybut `bg="hero"`), y 0, wysokość 1 ekran (1440×900: 900 px; 375×812: 812 px)
[ref.json]; na ≤767 `height:100dvh` [css-wstrz]. HTML: `%LOCALAPPDATA%\wir-tools\out\cominvi\orig\sekcje\01-loader.html`,
`01-hero.html`. CSS: Webflow `orig\cominvi-staging.webflow.shared.451204bcb.min.css` (`cssrules.py`) i wstrzyknięty
`orig\main-wstrzykniety.css` (reguły `.hero-background…`, `[data-loader-sequence-canvas]`, `.loader-logo_outline`,
`.hero-content_left…`, `.section_hero .hero-bottom…`; wygrywają z Webflow). JS (czytelny `orig\pretty\main.js`):
w. 1–940 (film wejścia `data-cominvi-hero-intro-video`, sekwencja klatek, nakładki przyciemnienia), w. 5300–5330
(zdarzenia), 5635–5900 (`Ji`, `tr`, `sp`, film po `loader:done`, `ci()` = wejście tekstu i kart hero, nawigacja
`left/right`), 5891–6030 i 6313–6440 (sekwencja przewijana `__homeSequence*`, `ap()` w. 5733: postęp = przewinięcie /
(wysokość okna × rangeVh/100)), plansza: `_p` w. 6031–6290, `Tp` 6443–6497, `Ep` 6981–7247 (trzy warianty: ustal na
żywej stronie, który działa na stronie głównej). Manifest klatek: `orig\cave-manifest.json` (wejście 86 klatek 24 fps
3,6 s; przewijanie 150 klatek, `scrollRangeVh 100`, desktop ≥992 1920×1080; sprawdź wariant mobile). Przeczytaj całe
te fragmenty przed budową.
Referencja: `%LOCALAPPDATA%\wir-tools\out\cominvi\ref\wejscie_1440x900.jpg` (+ klatki `wejscie_1440x900_r1_*.jpg`,
`r2`), `wejscie_375x812.jpg`, `sek_1440x900_s0_p*.jpg`, `sek_375x812_s0_p*.jpg`. Uwaga: w nagraniu wejścia tło hero było
czarne (film nie zdążył?) — sprawdź jednym dłuższym nagraniem (`ref.py --ms=8000`), kiedy pojawia się obraz jaskini.
Oryginał przewija się w `.page-wrap`: narzędzia przez `py -I narzedzia\orig.py <narzędzie>.py …`.

**Praktyki:** `praktyki/wejscie.md#Plansza ładowania`, `praktyki/wejscie.md#Wejście tekstu`, `praktyki/grafika.md#Zamienniki`.

## Co wiadomo [klatki ref, pomiar]
- Plansza: ciemne tło, w środku małe logo w zaokrąglonej ramce (`.loader-logo_outline`: `border-radius .55em`, obrys
  `.188em` biały [css-wstrz]); ramka rośnie do pełnego ekranu (ok. 4,9 → 5,9 s od otwarcia w nagraniu), odsłaniając
  hero; potem wjeżdża tekst H1 i karty. Czasy z klatek (dwa przebiegi), krzywe i kolejność z kodu.
- H1: dwa wiersze `.is-h1-span` 3,5em (≤991: 2em), 700 → `var(--fw-bold)`, `line-height 110%`, biały, `opacity 0` na
  starcie [css]; wejście w `ci()` (krok `.03`, czas 1,2 s, krzywa `main`, `yPercent`) [kod w. 5807–5890].
- Po prawej na środku `eyebrow-l` „Przez lata / + 1.000.000 metrów bieżących” (biały, start `opacity 0`).
- Na dole po prawej dwie karty (`.section_hero .card`) z obrazkiem i przyciskiem-podpisem (Nasze usługi, Technologia).
- Tło: film wejścia, potem sekwencja klatek przewijana przez 100% wysokości okna, przyciemnienie `#02020233` [css-wstrz].

## Zamienniki (brand.md)
Film Pexels 18898292 `_zrodla/pexels/hero-18898292.mp4` (1920×1080, 16,7 s, kamera stoi, postać z czołówką idzie w
głąb). Zrób z niego (ffmpeg, lokalnie): film wejścia (tyle sekund co oryginał, mp4 + webm, rozmiar jak oryginał) i
klatki przewijane (150, webp, desktop 1920×1080 i wariant telefonu jak w manifeście; jakość dobierz tak, żeby całość
była rozsądna, np. ≤ 8 MB na wariant) z dalszej części filmu, tak żeby przejście film → klatki było ciągłe. Kolor:
przyciemnij i zabarw na granat oryginału (zmierz średni kolor kadru oryginału w 3 miejscach i dobierz krzywe), temat
(postać / światło) w tym samym miejscu kadru co maszyna w oryginale ±5% (B6). Karty: `img/hero-karta-1.webp`,
`img/hero-karta-2.webp` (kadr jak w oryginale). Logo planszy: SkalMin z sekcji 00.

## Kluczowe elementy (B2–B4 w pełni)
Plansza → hero (ramka logo rośnie), wejście H1 (kaskada), wejście kart, przewijanie sekwencji klatek (postęp 0 / 0,5 /
1 obok oryginału), nawigacja na starcie (jedzie do `2em`).

## Przejście z sekcją niżej
Hero jest pierwsza; sekcja 02 (`bg="white"`) wjeżdża zwykłym przewijaniem — sprawdź w referencji, czy hero jest
przypięte albo przesuwa się wolniej (p0.75 w `sekcje_1440x900.jpg`: hero widać jeszcze nad 02).

## Telefon
375×812: wariant klatek mobile (manifest), `100dvh` [css-wstrz], karty: `overflow:hidden` i bez przejść na ≤991
[css-wstrz]. Wejście co 100 ms na 375 obok oryginału.

## Ryzyka
- Rozmiar mediów (Pages): łącznie z klatkami < 25 MB; ładowanie klatek partiami jak oryginał (`batchSize 30`).
- Plansza a `?intro=0`: z `?intro=0` strona startuje od razu w stanie po wejściu (narzędzia go używają).
- Pierwsza klatka: nigdy kilka sekund innego układu ani zastępczego kroju (B4).

## Gotowe, gdy
B1, B2 (sekwencja: numer klatki w 6 punktach postępu w dół i w górę, nasza = oryginał), B4 (klatki 0 / 0,5 / 1 / 2 /
3 s od pierwszej zmiany obok oryginału, dwa przebiegi), B6 (kadr filmu i kart), B7. Liczby: czas planszy do odsłony,
czas i kaskada H1, położenie H1 i kart (vw), postęp sekwencji przy 50% przewinięcia.
