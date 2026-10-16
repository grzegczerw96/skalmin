# 06 · technologia · stan: do zrobienia

Twoje pliki: `css/06-technologia.css`, `js/06-technologia.js`, HTML między `<!-- S:06-technologia -->` …
`<!-- /S:06-technologia -->`. Wspólne: komponenty 00 (etykieta, `tr`, przycisk, ewentualnie `text-display-reveal`).
`id="technologia"`, `bg="white"`.

**Oryginał:** `.section_technology`; 1440×900: y 8151, 3112 px = 3,46 ekranu; 375×812: y 8409, 5,66 ekranu [ref.json].
HTML `orig\sekcje\06-technologia.html`. CSS: Webflow + wstrzyknięty `orig\main-wstrzykniety.css` (`.svgtext-mask`,
`.is-text-mask>.mask-fill`, `html[lang=es] .section_technology .overlay-gradients`, `.machine-card_*` (≥992 przygaszanie
innych kart `opacity .4`, opis `line-inner` wjeżdża przy najechaniu; ≤991 przycisk OTWÓRZ/ZAMKNIJ), `.machines-*`,
≤767 `.machines-wrapper,.machines-grid-wrapper{display:none!important}` + `machine-grid_mobile`). JS (`orig\pretty\`):
`text-display-reveal.js` (`.display-text`, `.overlay-gradient`: napis „Ponad 360 maszyn” z maską SVG i gradientami
`gradient-left/right`), `service-cards.js` (karty maszyn: najechanie, otwórz/zamknij na telefonie), `tr` (komponent 00).
Przeczytaj całe; sprawdź też, czy `technology.js` / `workshops.js` działają na stronie głównej (main.js w. 10064–10075
ładuje je tylko dla podstrony technology — potwierdź).
Referencja: `out\cominvi\ref\sek_*_s5_p*.jpg`.

**Praktyki:** `praktyki/przewijanie.md#Okno rośnie`, `praktyki/mysz.md#Najechanie`, `praktyki/przewijanie.md#Wjazd elementów`.

## Układ
Etykieta „S.05 · Technologia”, akapit `body-xl` 5 wierszy (tło `--light-green`?), wielki napis `body-xxl` „Ponad 360
maszyn” 7em (2 wiersze, `line-height 80%`) z podpisem `eyebrow-m` „dla wydajności podziemnej”, siatka 3×2 kart maszyn
(czarne tło, maszyna, podpis `body-m`, opis przy najechaniu), akapit `body-xl` 4 wiersze wyśrodkowany, przycisk „Nasza
flota”. Teksty: `brand.md` → 06; opisy maszyn napisz sam (liczba słów z `teksty.tsv`, długość ±10%) i dopisz do `brand.md`.

## Ruch
Napis „Ponad 360 maszyn”: przypięcie? maska / gradienty (od → do, zakres przewijania); karty: wjazd (kaskada),
najechanie (przygaszanie innych 0,4 s `cubic-bezier(.5,0,0,1)` [css-wstrz], opis wierszami).

## Kadry
`img/maszyny/{rowniarka,ladowarka-teleskopowa,walec,koparkoladowarka,wiertnica,ladowarka}.webp` (wycięte, przezroczyste
tło): tło karty jak oryginał (zmierz kolor), `object-fit:contain` [css-wstrz], maszyna w tym samym miejscu i skali co w
oryginale ±5% (B6). Kolejność jak oryginał: Równiarka drogowa, Teleładowarka, Walec, Koparkoładowarki z koszem
roboczym, Wiertnica czołowa, Ładowarka LHD.

## Kluczowe elementy
Napis „Ponad 360 maszyn” (maska / gradienty przy przewijaniu), najechanie karty maszyny (co 50 ms), wjazd kart.

## Przejście z sekcją powyżej
05 → 06: tło (białe → jasnozielone?) i moment zmiany (B5).

## Telefon
375: 5,66 ekranu (!), osobna siatka mobilna `machine-grid_mobile` [css-wstrz], OTWÓRZ/ZAMKNIJ; ≤479 `padding-top:1em`.

## Gotowe, gdy
B1, B2, B3, B5, B6, B7 + liczby: wysokość 3,46 / 5,66 ekranu, rozmiar napisu (vw), pudełka kart, czasy najechania.
