# 04 · minerały · stan: do zrobienia

Twoje pliki: `css/04-mineraly.css`, `js/04-mineraly.js`, HTML między `<!-- S:04-mineraly -->` …
`<!-- /S:04-mineraly -->`, media `img/mineraly/` (twoje). Wspólne: komponenty 00 (etykieta). `bg="white"`.

**Oryginał:** `.section_minerals`; 1440×900: y 4086, 2430 px = 2,70 ekranu; 375×812: y 5012, 2,70 ekranu [ref.json];
referencja: „dogania albo odgrywa się” w części punktów. HTML `orig\sekcje\04-mineraly.html` (66 KB: duże SVG koła
z kreskami). CSS: Webflow + wstrzyknięty `orig\main-wstrzykniety.css` (`.section_minerals …`: `background #fff`,
`.minerals-slider{clip-path:circle(50%)}`, sekwencja `minerals-slider_sequence` 60% wysokości, ≤767
`.minerals-inner>.col-3{order:3}`). JS (`orig\pretty\`): `minerals.js` (cały: przypięcie `minerals-stage`, koło
`.circle.is-2` z maską `conic-gradient` rosnącą `--angle`, lista nazw `.minerals-names .body-xl` aktywna po kolei,
krzywa `mineralsEase` = `M0,0 C0.6,0 0,1 1,1`, stałe `$ .25, j .3, G .25`, telefon `yPercent` listy) i
`minerals-canvas-local-debug.js` (sekwencje klatek skał z pliku binarnego, manifest, przełączanie minerału). Przeczytaj
całe oba.
Referencja: `out\cominvi\ref\sek_*_s3_p*.jpg`.

**Praktyki:** `praktyki/przewijanie.md#Przypięcie`, `praktyki/grafika.md#WebGL`, `praktyki/grafika.md#Zamienniki`.

## Układ i ruch (z kodu, potem pomiar)
Przypięta scena na wysokość sekcji; w środku koło (kreski wokół, druga warstwa koła rysuje się `conic` maską wraz z
postępem), w kole obracająca się skała (klatki); po lewej lista Złoto / Srebro / Ołów / Miedź / Cynk (aktywna czarna,
reszta `opacity .15`), nad nią „Minerały, które wydobywamy”; po prawej symbol i numer (`AU #79` …). Zmiana minerału
przy przewijaniu (progi z kodu), skała zmienia się (jak: cięcie, przenikanie, poziome przejście — w klatkach ref p0.5
widać dwie połówki skał: zmierz).

## Zamiennik: skały (brand.md)
Własna bryła three.js (wersja z `%LOCALAPPDATA%\wir-tools\three-build` albo z CDN jsdelivr, plik do `lib/`),
proceduralna skała (ikosfera z szumem, płaskie ściany, szaro-srebrna / złotawa / ołowiana / miedziana / cynkowa
tekstura proceduralna), oświetlenie jak zdjęcia oryginału (białe tło, miękki cień). Wyrenderuj lokalnie do klatek
(tyle klatek, rozmiar i format jak sekwencje oryginału: zmierz w manifeście / pliku binarnym), po jednej sekwencji na
minerał, i odtwarzaj na `<canvas>` tak jak oryginał (ten sam postęp → klatka). Albo, jeśli prościej i tak samo na oko,
renderuj three.js na żywo z tym samym obrotem na klatkę — wybierz i uzasadnij liczbami (koszt klatki < 4 ms na 1440).

## Kluczowe elementy
Przypięcie (start i koniec), zmiana aktywnego minerału (progi), obrót skały względem przewijania, rysowanie koła.
Przewijanie kółkiem w dół, w górę i znowu w dół (B2) i skok w środek sekcji.

## Przejście z sekcją powyżej
03 → 04: tło (jasnozielone → białe?) i moment zmiany (B5).

## Telefon
375×812: 2,70 ekranu jak desktop; lista `yPercent` [kod minerals.js `M()`], kolejność kolumn ≤767 [css-wstrz].

## Ryzyka
- Wysokość sekcji zależy od `minerals-stage` (przypięcie `+= stage - innerHeight`): wszystko poniżej się przesuwa.
- Rozmiar klatek: łącznie ≤ 6 MB.

## Gotowe, gdy
B1, B2 (aktywny minerał i kąt koła w 8 punktach postępu w dół i w górę obok oryginału), B6, B7 + liczby: wysokość
2,70 ekranu, średnica koła (vw), progi zmian minerału (postęp), kąt `--angle` w połowie.

## Pomiar i kod (podagent 04, 18.10)
- Oś: brak pinu w JS; `.minerals-inner` `position:sticky` w `.minerals-stage` 270vh [css]. ST listy i koła: trigger stage,
  `top top` → `+=stage−innerHeight`, scrub 1; `--angle` = postęp × 360; aktywny = floor(postęp × 5) → progi 0,2 / 0,4 /
  0,6 / 0,8 [kod]. Nazwa .15 ↔ 1 0,25 s, symbol/numer y 0,25 s, ≤767 `scrollLeft` 0,3 s, lista yPercent 0 → 120 w
  ostatnich 10% ekranu osi [kod]. Kąt w połowie: 180° [pomiar 1440 i 375].
- Skała: jedna sekwencja 600 klatek 720×720 (h264 `.af`, 24 kl./s, GOP 5; zapas: AVIF `minerals-0001…0600.avif`),
  120 klatek na minerał, cięcie (bez przenikania) przy 120/240/360/480; tło klatki #fcfcfc; bryła w klatce h ≈ 0,80
  (cynk w 0,64 × h 0,58) [pomiar klatek]. Tween frame 0 → 599 liniowo, stage `top top` → `bottom bottom`, scrub .4;
  rysowanie contain × 0,85 na białym płótnie [kod]. Slider `.minerals-slider_inner` z kodu nie istnieje w HTML (tylko
  płótno).
- Układ 1440 [pomiar]: lista x 32, y 450 od góry ekranu (etykieta), nazwy 48 px co 52; koło 680 (47,2 vw) w kolumnie
  6/12 (x 380); płótno 680 × 501,6 (60%); winieta 646 (95%); symbol x 1192 na wysokości etykiety listy.
  375 [pomiar]: kolejność prawa kolumna → koło → lista ([css-head] `col-3:last-of-type{order:1}`, `.col-6{order:2;padding:2em}`),
  nazwy 3.5em w poziomym pasku, koło 313,5 (100%).
- Nasze: klatki 544 px WebP (q .66), razem 5,65 MB, `narzedzia/skaly.py` + `skaly.html` (three.js r149, `lib/three.min.js`).
