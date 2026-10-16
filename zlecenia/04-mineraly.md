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
