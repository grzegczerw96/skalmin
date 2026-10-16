# 00 · wspólne: nawigacja, menu, przycisk, etykieta sekcji, tekst odsłaniany · stan: do zrobienia

Komponenty, których używają wszystkie sekcje. Twoje pliki: `css/00-wspolne.css`, `js/00-wspolne.js`, HTML między
`<!-- S:00-wspolne -->` a `<!-- /S:00-wspolne -->` (nawigacja i menu; leżą poza `<main>`). Kolejne sekcje będą tylko
**używać** klas i funkcji z tego zlecenia (opisz je na górze `js/00-wspolne.js` i `css/00-wspolne.css`: klasa / funkcja
→ co robi, jak użyć). Sekcji 01–10 jeszcze nie ma: sprawdzaj na stronie testowej `test/00.html` (twoja, poza `index.html`;
kopia `<head>` i skryptów z `index.html` + kilka bloków demo: białe tło, etykieta, akapit `tr`, przycisk), a nawigację na
`index.html` z tymczasowo wyższym `<main>` (`min-height` w swoim CSS tylko na czas pracy, usuń przed commitem).

**Oryginał:** https://www.cominvi.com.mx/ — HTML: `%LOCALAPPDATA%\wir-tools\out\cominvi\orig\sekcje\00-nav.html`,
`00-menu.html`, przykład przycisku i etykiety w `02-onas.html` (wiersze 1–10 i 85–110). CSS:
`orig\cominvi-staging.webflow.shared.451204bcb.min.css` (czytaj `py -I C:\Projekty\warsztat-nowy\tools\cssrules.py
<css> navbar is-menu menu-icon menu-icon_bar is-menu_label-wrap is-menu_label-inner is-label nav-inner navlink
navlink_label links link-item button button_inner button-inner_content button-arrow tag eyebrow-s ...`). JS (czytelny):
`orig\pretty\main.js` — menu `Ip()` w. 7434–8068 (najechanie na „Menu”, otwarcie / zamknięcie, linki), nawigacja
`zp/ng/Fp/zr/Dp/In/sd` w. 8069–8309, motywy kolorów `fn.themes` w. 7248–7294 i `window.__theme` w. 8310–8404,
otwarcie/zamknięcie menu z maską `mask-overlay` / `page-info` w. 11149–11330 i 12440–12720 (szukaj `nav-inner`);
`orig\pretty\button-hover.js` (cały: najechanie przycisków, krzywa `M0,0 C0.6,0 0,1 1,1`); `orig\pretty\text-reveal.js`
(cały, + `orig\pretty\index.js`, z którego importuje) i `orig\pretty\text-display-reveal.js`. Przeczytaj całe te
fragmenty, zanim zaczniesz (checklista A: czytanie wyrywkami dało błędy na poprzednich stronach).
Referencja: `%LOCALAPPDATA%\wir-tools\out\cominvi\ref\` (`sekcje_1440x900.jpg`, `sekcje_375x812.jpg`, wejście).
Oryginał przewija się w `.page-wrap`: narzędzia na oryginale przez `py -I narzedzia\orig.py <narzędzie>.py …`.

**Praktyki:** `praktyki/grafika.md#Elementy stałe`, `praktyki/mysz.md#Najechanie`, `praktyki/przewijanie.md#Tekst przewijaniem`.

## Komponenty
1. **Nawigacja** (`nav.navbar`, `position:fixed`, `z-index:998`): `left/right: var(--site-margin)` [css], `top: 1.5em`
   (≤991: `1em`) [css], `pointer-events:none` na pasku, kolor `--white` [css]. Na 1440: x 32–1408, y 24, wysokość 48 px
   [pomiar]. Po lewej logo (u nas SkalMin: `brand.md` → Logo; dwie wersje SVG jak w oryginale `is-logo_main` /
   `is-logo`, sprawdź, kiedy która), po prawej przycisk `is-menu`: napis „Menu” w masce (dwie kopie, najechanie
   przesuwa `yPercent -50`, 0,6 s, krzywa `M0,0 C0.68,0 0,1 1,1` [kod w. 7496–7546]), kółko `menu-icon` z dwiema
   kreskami (najechanie: `gap 0`, kreski w krzyż `top/bottom 49%`, `rotation 0/90`, tło `--primary`, kreski białe [kod]).
   Kolory nawigacji według motywu sekcji: sekcje mają atrybut `bg` (`hero`, `white`, `black`; w oryginale na
   `.section_*`), motywy w `fn.themes` [kod w. 7248]. Sprawdź na żywej stronie, czy kolor logo / kółka zmienia się przy
   przewijaniu między sekcjami (`window.__theme.bindScroll` czyta tylko pierwszy `[bg]`, ale może być inny mechanizm:
   szukaj `mix-blend-mode` w CSS i `[bg]` w main.js). Zrób dokładnie tak, jak żywa strona. U nas sekcje będą miały ten
   sam atrybut `bg` co oryginał.
   - W hero oryginału nawigacja przy wejściu jedzie z `left/right` innych niż `2em` do `2em` (1,2 s, `main`) [kod
     w. 5826–5838]: to część wejścia hero (sekcja 01), ale zrób w nawigacji możliwość ustawienia stanu początkowego
     (np. klasa albo funkcja `SM.nav.intro()`), opisz w raporcie.
2. **Menu** (`.nav-inner`, otwierane przyciskiem): układ, linki `navlink` (32 px), języki PL / EN, otwarcie i
   zamknięcie (maska `mask-overlay`, `page-info`, kolejność, czasy, krzywe) dokładnie z kodu. Linki menu prowadzą do
   sekcji tej strony (`#uslugi`, `#technologia`, `#bezpieczenstwo`, `#onas`; Blog, Kontakt, Dołącz → `#`); skok przez
   `SM.lenis.scrollTo`. Teksty: `brand.md` → 00. Menu ma blokować przewijanie strony jak oryginał (`lenis.stop()`?).
3. **Przycisk** (`a.button` w oryginale: `button_inner`, `button-inner_content`, `button_label-small`, strzałka
   `button-arrow` 32×32 viewBox; warianty: base / czarny / `w-variant-…` w CSS): wygląd ze zmiennych `--_ui-colors---*`
   z `:root` oryginału (tło `--primary`, tekst biały, najechanie: tło `--accent`, tekst `--primary`, strzałki) i ruch
   najechania z `button-hover.js` (czasy, krzywa, kolejność, wjazd i zjazd). Jedna klasa / jeden znacznik HTML do
   skopiowania przez sekcje (wzór w komentarzu na górze CSS).
4. **Etykieta sekcji** („S.01” w czarnym prostokącie + nazwa sekcji, `eyebrow-s`): wygląd z CSS oryginału (klasy z
   `02-onas.html` w. 1–10). Wzór HTML w komentarzu.
5. **Tekst odsłaniany przewijaniem** (`[tr="1"]` w oryginale, 15+ akapitów `body-xl` w sekcjach): SplitText na wiersze,
   wiersze `opacity .2 → 1` z kaskadą, `scrub`, `start "top 85%" end "top 50%"` i inne warianty w `text-reveal.js`
   (w. 78–99, 127–149, 212–248, 294–338: opisz, który wariant kiedy) [kod]. Funkcja dla sekcji, np.
   `SM.tekst(el, {wariant})` albo automatycznie dla `[tr="1"]` po `SM.sekcja(...)`. Uwaga: base uruchamia sekcje po
   załadowaniu krojów; SplitText musi dzielić już właściwy krój. Przy zmianie szerokości okna wiersze dzielone od nowa
   (jak oryginał: sprawdź, czy robi `revert` + `split` na `resize`).
6. Jeśli w kodzie oryginału jest inny mały wspólny element strony głównej (np. `text-display-reveal` dla `.title-big,
   .display-text, .overlay-gradient`), zrób go tu i opisz.

## Kluczowe elementy (B2/B3 w pełni)
Najechanie na „Menu” (napis + kreski), otwarcie i zamknięcie menu, najechanie przycisku, kaskada tekstu odsłanianego
(środek ruchu: ile wierszy naraz w ruchu).

## Telefon
≤991: `top 1em`, margines `1em` [css]. Menu na telefonie: sprawdź układ na 375×812 (`m-overlay` jest `display:none`
w CSS). Najechania tylko tam, gdzie mysz (`pointer: fine`), jak oryginał.

## Ryzyka
- Kolory nawigacji między sekcjami: zmierz na żywej stronie w 3 miejscach (hero, biała sekcja, czarna 09), nie z danych.
- Tekst odsłaniany: oryginał dzieli tekst na wiersze ręcznie w HTML? (klasa `line` w `teksty.tsv`) — sprawdź, czy
  SplitText, czy gotowe `<span class="line">`; nasze teksty w `brand.md` mają podział `/` = koniec wiersza.
- Menu otwarte przy przewiniętej stronie (w połowie sekcji) i zamknięte: strona wraca w to samo miejsce.

## Gotowe, gdy
B1 (nawigacja na 1440 i 375 ±1 vw), B2 (tekst odsłaniany: krycie wierszy w 6 punktach postępu w dół i w górę obok
oryginału, na jednym akapicie sekcji 02 oryginału), B3 (najechanie „Menu” i przycisku co 50 ms obok oryginału),
B7 (375×812). Liczby do zgodności: pozycja i rozmiar logo i „Menu”, czasy najechań, czas otwarcia menu, krycie wierszy
w połowie postępu.

## Dopisane przez podagenta 00 (16.10.2026): źródła i pomiary
Źródła: `[css-wstrz]` = arkusz wstrzykiwany przez main.js (w. 13050, `var tg`; `orig\main-wstrzykniety.css`), wygrywa z
Webflow CSS; `[css-head]` = `<style>` w `<head>` oryginału (Osmo i drobne reguły).
- Nawigacja: `.navbar{mix-blend-mode:difference}` [css-wstrz] → kolory paska odwraca tło (biały nad ciemnym, czarny nad
  białym); motyw kółka czytany raz z pierwszego `[bg]` (= `hero`: tło przezroczyste, ramka i kreski białe) i nie zmienia się
  przy przewijaniu [kod w. 8394–8400, pomiar: hero / about / next]. Logo: `a{height:1.75em}` [css-wstrz]; tylko
  `.is-logo_main` widoczne (`.is-logo{display:none}` zawsze) [css]. Pudełka 1440: pasek 32,24 1376×48; logo 32,34 100×27;
  „Menu” 1307,40 35×16; kółko 1360,24 48×48 [pomiar]; 375: pasek 15,4 / logo 100×27 / kółko 311,6 [pomiar].
- Pasek chowa się przy przewijaniu w dół (`left/right −9em`, 0,5 s, krzywa domyślna GSAP, tween od nowa w każdej klatce
  z ruchem > 2 px) i wraca przy ruchu w górę [kod zp() w. 8069; pomiar: ok. 1 s do −144 px]. `ng()` nigdy nie wołane;
  wejście hero przesuwa pasek tylko, gdy nie stoi na marginesie [kod w. 5826].
- Logo, najechanie: grupy liter `is-t-1` yPercent −120, `is-t-2` −100, litery −42 (druga kopia z +100), kaskada 0,03,
  0,5 s, krzywa `M0,0 C0.51,0 0,1 1,1`, po końcu powrót bez ruchu [kod Fp() w. 8130]. yPercent grupy SVG liczony co klatkę
  od ramki grupy (rośnie przy rozjechaniu liter): koniec −13,61 / 4,59 j., szczyt −15,6 przy 0,3 s [pomiar].
- Menu: strona zjeżdża do `top` = dół `.nav-inner` + 9em (1440: 470 px; 768–991: 15em; <768: 32em = 492 px przy 375),
  skala (W−64)/W (<768: (W−32)/W), promień 1rem, 1,2 s `main`; kółko obrót 45°, tło → `--accent`, ramka i kreski →
  `--primary`, kreski od razu w krzyż; linki z `margin-top` 8/11/14/10/13/16/12/15/18/21/24/27em → 0 [kod Ip()]. Przy
  zamykaniu kolory kółka wracają od razu (1. klatka) [pomiar]. Maska `mask-overlay` wyłączona `display:none!important`
  [css-wstrz]; `page-info` `display:none` [css]. Lenis stoi, po zamknięciu strona w tym samym miejscu [pomiar 1622/1622].
- Linki menu: tekst `text-box: trim-both cap alphabetic` [css-head] (wysokość 22,8 px, nie 28,8); `.navlink-locale
  .navlink_label{color:inherit}`, bieżący język `--accent` [css-head]; najechanie linku x −(ikona + odstęp) = −36,8 → 0,
  0,5 s `main`, ≥992 px [button-hover.js].
- Najechanie „Menu” (tylko kółko, `mouseenter` na `.menu-icon`, bez warunku szerokości): od razu tło i ramka `--primary`,
  kreski białe; 0,6 s `M0,0 C0.68,0 0,1 1,1`: napis yPercent −50 (−14 px), kreski `top/bottom 49%`, druga obrót 90°;
  zjazd tak samo z powrotem, kolory od razu [kod w. 7499–7608, pomiar co 50 ms].
- Przycisk: najechanie przesuwa `.button-inner_content` o 2,25em (36 px), 0,5 s `main`, tylko ≥992 px; tło się nie
  zmienia (zmiana tła tylko w wariancie `button-white`: → `--primary`, 0,5 s `cubic-bezier(.6,0,0,1)`) [button-hover.js,
  css-wstrz, pomiar]. `clip-path: inset(0 round .5em); contain: paint` [css-wstrz]. Napis wersalikami (dziedziczy z
  `.button`), ≤991: `.9rem`, ≤479: `.85rem` [css-wstrz].
- Etykieta: ≤991 `.eyebrow-s{font-size:.75rem}` [css-wstrz] (12 px przy 375, nie .5em); ≤479 odstęp `.3em` [css-wstrz];
  napis w czarnym prostokącie biały [css-head]; `.intro` ma `gap:16px` (działa ≤767, gdy flex) [css].
- Tekst odsłaniany: oryginał dzieli w przeglądarce (SplitType: lines, words, chars), HTML bez podziału; przy zmianie
  okna revert + split po 200 ms [text-reveal.js]. Krycie średnie wierszy przy górze akapitu na 67,5% ekranu (1440):
  0,60 / 0,40 / 0,27, znaków w ruchu 25 / 21 / 13 [pomiar, sekcja 02].
