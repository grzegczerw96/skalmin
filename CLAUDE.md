# SkalMin: odtworzenie https://www.cominvi.com.mx/

Czyta każda sesja w tym folderze. Proces i wiedza: `C:\Projekty\warsztat-nowy\README.md` (nie kopiować tutaj).

## Projekt
- **Oryginał:** https://www.cominvi.com.mx/ (strona główna); silnik: Webflow (tylko CSS i HTML) + własny kod Vite
  `https://cominvi.pages.dev/main.js` z GSAP 3.13.0 (ScrollTrigger, CustomEase, SplitText, Flip), Lenis 1.3.8, Barba
  2.10.3, Lottie (ikony), sekwencje klatek (hero, minerały). Pliki oryginału i referencja:
  `%LOCALAPPDATA%\wir-tools\out\cominvi\orig\` (`index.html`, CSS, `main.js`, `assets\*.js`; czytelne wersje JS w
  `orig\pretty\`), referencja `out\cominvi\ref\` (`ref.json`, arkusze), teksty `out\cominvi\teksty.tsv`.
- **Oryginał przewija się w `.page-wrap` (Lenis z wrapperem, `window.lenis`), nie w oknie.** Narzędzia warsztatu na
  oryginale uruchamiać przez nakładkę: `py -I narzedzia\orig.py <narzędzie>.py [argumenty]` (przepisuje `scrollY`,
  `scrollTo`, `scrollHeight` na `window.lenis`; nasza strona bez zmian). Nasza strona przewija okno (Lenis na oknie).
- **Marka i zamienniki:** `brand.md`. Teksty po polsku, nasze, **o długości oryginału** (ta sama liczba słów i
  wierszy, żeby design i kaskady zostały takie same); bez logo, zdjęć i tekstów oryginału.
- **Terminal Grzegorza:** PowerShell 5.1 (bez `&&`). Python 3.8, Node 14.
- **Podgląd:** `.claude/launch.json` → `http://localhost:8787/` (`?intro=0` bez planszy ładowania, `?okno` rozmiar okna
  w rogu). Panel podglądu musi być widoczny, inaczej ruch stoi.
- **Repo i Pages:** https://github.com/grzegczerw96/skalmin, podgląd https://grzegczerw96.github.io/skalmin/
  (sprawdzać z `?v=<commit>`). Commit jako `grzegczerw96 <greg.wolwlod@gmail.com>`, opis po polsku; push po każdej
  przyjętej sekcji. Repo usuwa tylko Grzegorz. W `<head>` zawsze `<meta name="robots" content="noindex, nofollow">`
  (to studium cudzej strony, nie ma trafiać do wyszukiwarek).

## Technologia
- Biblioteki jak w oryginale (wersje z jego kodu), pliki u siebie (`lib/`, `fonts/`); bez frameworka i systemu budowania.
- `index.html` (HTML sekcji między znacznikami `<!-- S:NN-nazwa -->`), `css/base.css` + `js/base.js` (wspólne:
  zmienne, skalowanie, kroje, klasy tekstu, Lenis, GSAP, rejestracja sekcji, `?okno`; zmienia tylko kierownik),
  `css/NN-nazwa.css` + `js/NN-nazwa.js` (sekcje). Wiersze do ok. 160 znaków.
- Sekcja w JS: `SM.sekcja('NN-nazwa', () => { … })` (uruchamiane po załadowaniu krojów, po kolei, potem
  `ScrollTrigger.refresh()`). Krzywa oryginału `'main'` (= `M0,0 C0.6,0 0,1 1,1`, najczęstsza w main.js). Lenis:
  `SM.lenis` / `window.__lenis`. Plansza ładowania: sekcja 01; kontrakt `window.__loaderDone` + zdarzenie
  `loader:done` na `document`; z `?intro=0` base ustawia je od razu.
- **Skalowanie jak oryginał (Osmo):** wszystko w `em`; `font-size` body = szerokość okna / (ideał / 16), ideał 1440
  (≥992), 834 (768–991), 550 (480–767), 390 (≤479); szerokość przycięta do [992, 1920] / [768, 991] / [480, 767] /
  [320, 479]. Margines strony `--site-margin` 2em (≤991: 1em).
- Progi szerokości z oryginału: ≤991, ≤767, ≤479 (i ≥1440 rzadko).
- Krój: Helvetica Now Display 500 / 700 → Inter Tight 500 / **600** (`--fw-medium`, `--fw-bold`; w CSS oryginału 700 →
  u nas `var(--fw-bold)`), szerokość wierszy −1,8…+0,5%, kreska +5% / 0%; PP Supply Mono 300 → IBM Plex Mono 400,
  `letter-spacing: var(--mono-ls)` (−0,022 em; bez niego +3,8% szerokości), kreska +3%. Pomiar 16.10 na 4 wierszach
  oryginału przy 100 px (`document.fonts.load`).
- Pasek przewijania ukryty jak w oryginale (`scrollbar-width: none`), więc szerokość treści = szerokość okna.
- `prefers-reduced-motion`: oryginał (strona główna) reaguje tylko w nakładce „następna strona” (main.js:12032); u nas
  tak samo (sekcja 09), poza tym ruch zawsze.

## Zatwierdzone odstępstwa od oryginału (nie „naprawiać”; dopisywać z datą)
- 16.10.2026 hero: film z Pexels (kamera stoi, idzie postać) zamiast renderu 3D jaskini z jadącą kamerą (decyzja
  Grzegorza: „Film z sieci (Pexels)”).
- 16.10.2026 zdjęcia z Pexels, maszyny wycięte z tła (walec bez kabiny), skały minerałów z własnej bryły 3D.
- 16.10.2026 hero: postać w filmie większa niż maszyna w oryginale; karta 2 = ładowarka kołowa w słońcu (w oryginale
  górnik w kasku). Nawigacja przy wejściu stoi (tak jak żywy oryginał; tween z `ci()` nic nie przesuwa).
- 16.10.2026 jedna strona: bez Barba i podstron; linki menu i przycisków prowadzą do sekcji tej strony albo `#`.

## Sekcje
| NN | Sekcja | Zlecenie | Stan | Uwagi |
|---|---|---|---|---|
| 00 | wspólne: nawigacja, menu, przycisk, etykieta sekcji, tekst odsłaniany | `zlecenia/00-wspolne.md` | przyjęta 16.10 (0 rund poprawek) | API na górze `js/00-wspolne.js` i `css/00-wspolne.css` |
| 01 | plansza ładowania + hero | `zlecenia/01-hero.md` | przyjęta 16.10 (0 rund) | media odtwarza `narzedzia/hero-media.py` |
| 02 | o nas | `zlecenia/02-onas.md` | do zrobienia | |
| 03 | usługi | `zlecenia/03-uslugi.md` | do zrobienia | |
| 04 | minerały | `zlecenia/04-mineraly.md` | do zrobienia | |
| 05 | bezpieczeństwo | `zlecenia/05-bezpieczenstwo.md` | do zrobienia | |
| 06 | technologia | `zlecenia/06-technologia.md` | do zrobienia | |
| 07 | zespół | `zlecenia/07-zespol.md` | do zrobienia | |
| 08 | partnerzy | `zlecenia/08-partnerzy.md` | do zrobienia | |
| 09 | następna strona | `zlecenia/09-nastepna.md` | do zrobienia | |
| 10 | stopka | `zlecenia/10-stopka.md` | do zrobienia | |

Raport ostatniej sesji: `raport-1.md`.
