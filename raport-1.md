# Raport sesji 1: SkalMin (odtworzenie https://www.cominvi.com.mx/)

## 1. Wynik
- **Podgląd:** https://grzegczerw96.github.io/skalmin/ (z `?v=<commit>`; `&okno` pokazuje rozmiar okna). Lokalnie
  `.claude/launch.json` → http://localhost:8787/ (`?intro=0` bez planszy).
- **Zbudowane:** cała strona główna: 00 nawigacja, menu, przycisk, etykieta, tekst odsłaniany; 01 plansza ładowania +
  hero (film i 150 klatek przewijanych); 02 o nas; 03 usługi; 04 minerały (przypięcie, koło, skały z klatek 3D);
  05 bezpieczeństwo (sticky); 06 technologia (napis z maską, karty maszyn); 07 zespół (cytaty, karty); 08 partnerzy
  (walec 3D); 09 następna strona; 10 stopka. Długość strony na 1440: 16604 px = oryginał co do piksela; na 375:
  18533 / 18564 px (−31 px z łamania polskich tekstów w 02 i 03).
- Każda sekcja przyjęta po własnej recenzji kierownika (pomiar parami, pary zrzutów), 0 rund poprawek.

## 2. Lista z checklisty
**A (przed budową):** pliki oryginału ✓ (HTML, CSS, main.js + 25 modułów, manifest klatek; czytelne w `orig/pretty`,
HTML sekcji w `orig/sekcje`, arkusz wstrzykiwany przez main.js w `orig/main-wstrzykniety.css`); referencja ✓
(`ref.py` przez nakładkę `narzedzia/orig.py`, 1440 i 375); rozmiary ✓; krój zastępczy ✓ (Inter Tight 500/600,
IBM Plex Mono 400 + odstęp liter); ograniczenie ruchu ✓ (oryginał reaguje tylko w 09: tak samo); teksty o tej samej
liczbie słów i wierszy ✓ (`brand.md`); brand kit ✓; kod sekcji przeczytany: kierownik wskazał wiersze, całość czytali
podagenci (odstępstwo, pkt 7); dwie liczby każdej sekcji ✓ (ref.json); zlecenia ✓.

**C (cała strona):**
- ✓ Przejścia w dół i w górę, `wierzch.py` cała strona na 1440, 375, 1779×520 i 1536×742 (ekran Grzegorza): 0
  przyciętych i częściowo zasłoniętych słów; jedyne stałe zgłoszenie to logo nawigacji nad etykietami przy
  przewijaniu w górę (tak samo w oryginale). Zasłonięte w całości: lista minerałów pod 05 (375, 1779×520) i kreski
  walca na literach (1779×520) — w oryginale tak samo (sprawdzone tym samym narzędziem).
- ✓ Zmiana szerokości: `covered.py --from=1350` → 1014 i 748: 0 zasłoniętych linków.
- ✓ Rozmiary krytyczne: `audit.py` 320, 768×1024, 1025, 1280×620, 1920: żadnego przewijania w bok (sprawdzone
  `scrollWidth` u nas i w oryginale na 320 / 768 / 1920); zgłoszenia „overflow” to tło 09 (120%) i gradienty 06,
  przycięte przez rodzica jak w oryginale; „overlap” to teksty dla czytników (`sr-only`).
- ✓ Szybkie przewinięcie od razu po wczytaniu (kółko 600 px co 60 ms): 0 pustych obrazów w każdej sekcji, 1440 i 375
  (`narzedzia/czesc_c.py`, arkusze `out/cominvi/c_szybko_*.jpg`).
- ✓ Linki menu: wszystkie lądują na górze sekcji w stanie gotowym (menu zamknięte, `main` bez transformacji). **Złapał:**
  na 375 „Technologia” lądowało 1180 px przed sekcją (Lenis przy zatrzymaniu i otwartym menu); poprawka jedną linią w
  `js/00-wspolne.js` (`843da0b`).
- ✓ Arkusz par całej strony: `ref.py --ours` 1440 i 375 → 95 par w `out/cominvi/pary/`, zestawienie środka każdej
  sekcji w `_zrodla/podglad/arkusz-par-*.jpg`. Wysokości wszystkich sekcji = oryginał, poza 03 na 375 (2,76 / 2,79).
- ✗ Telefon prawdziwy: nie był podłączony (odpowiedź Grzegorza na starcie).

**Sekcje:** wszystkie przyjęte po 0 rundach poprawek (tabela w pkt 4).

## 3. Decyzje dla Grzegorza (otwarte)
Brak otwartych. Podjęte w sesji: marka SkalMin; hero z filmu Pexels (przyciemniony po punkcie kontrolnym); zdjęcia z
Pexels; skały 04 proceduralne, zdjęcia 02 i 05 zostają (18.10); tryb lekki i modele (pkt 5); nachodzenie zgłaszać od
razu (tabela pkt 6 — nic nowego poza zachowaniem oryginału).

## 4. Koszt
| Sekcja | Model, tryb | Tokeny | Czas (narzędzie) | Rundy | Co znalazła recenzja kierownika |
|---|---|---|---|---|---|
| 00 wspólne | Opus high, pełny | 412 tys. | 43 min | 0 | nic nowego; stany menu = oryginał co do px. Podagent złapał wyścig w `base.js` i 6 różnic klas tekstu w `base.css` (poprawił kierownik) |
| 01 plansza + hero | Opus high, pełny | 392 tys. + 447 tys. (poprawka Grzegorza) | 43 + 11 min | 0 | układ ±0,1 vw; film za jasny wobec oryginału i słoneczna karta 2 → zgłoszone, Grzegorz: poprawić |
| 02 o nas | Opus medium, lekki | 259 tys. | 23 min | 0 | 1440 ±0,1 vw; 375 1–2,6 vw z łamania; `ikony.js` na listę skryptów (kierownik) |
| 03 usługi | Opus medium, lekki | 279 tys. | 22 min | 0 | 1440 ±0,0 vw; tytuł karty 2 na 375 3 wiersze → kierownik skrócił |
| 04 minerały | Opus medium, lekki + kółko | 285 tys. (po wznowieniu) | ok. 46 min (z przerwą na limit) | 0 | koło, progi, kąt = oryginał; wygląd skał → Grzegorz: zostaje |
| 05 bezpieczeństwo | Sonnet medium, lekki + kółko | 163 tys. | 16 min | 0 | zakres przyklejenia = oryginał (±5 px); zgłoszenie podagenta „05 zasłania 04 na 375” sprawdzone: oryginał tak samo |
| 06 technologia | Sonnet medium, lekki | 272 tys. | 38 min | 0 | ±0,0 vw na 1440 i 375; pozy 3 maszyn inne (odstępstwo) |
| 07 zespół | Sonnet medium, lekki | 391 tys. | 53 min | 0 | ±0,1 vw; najwięcej czasu na łamanie polskich cytatów na 3 szerokościach |
| 08 partnerzy | Sonnet medium, lekki + kółko | 190 tys. | 23 min | 0 | walec: kąt, nazwa, kreski = oryginał na 1440/768/375 |
| 09 + 10 | Sonnet medium, lekki | 205 tys. | 28 min | 0 | ±0,1 vw; długość strony 1440 = oryginał. Podagent złapał błąd `recenzja.py` (poprawione) |
| **Razem podagenci** | | **ok. 3,5 mln** | **ok. 6 h 10 min** | **0** | |

Próba trybu lekkiego (02–10): średnio ok. 26 min i 250 tys. tokenów na sekcję wobec 43 min / 400 tys. w trybie pełnym;
recenzja kierownika nie znalazła w sekcjach lekkich niczego, co tryb pełny by złapał, a lekki przepuścił. Sonnet
(05–10) bez rund poprawek, także w 06 i 08 (przełączenie na Opusa niepotrzebne); różnice czasu wynikały z łamania
tekstów, nie z modelu.

## 5. Checklista w praktyce
(z raportów podagentów i recenzji kierownika; „złapał” = znalazł coś, co trzeba było poprawić)

| Punkt | Złapał (co) | Wykonany, czysto | Nie dotyczy | Pominięty mimo że dotyczył | Przeszkadzał albo mylił |
|---|---|---|---|---|---|
| A krój zastępczy | — | ✓ (dobór z 22 krojów pomiarem) | | | |
| A teksty tej samej liczby słów i wierszy | **7×**: polskie wiersze łamały się inaczej (01 H1, 02, 03 tytuł, 05, 06, 07 cytaty, 08, 10 „Informacja o prywatności”) | | | | najdroższy punkt sesji (07: większość z 53 min); reguła „długość ±15%” za luźna dla 375 |
| A kod sekcji przeczytany | zlecenia 06, 08, 09 podawały mylne założenia (napis „przypięty”, „3,24 ekranu”, „samo przejście”), podagenci poprawili z kodu | | | kierownik czytał tylko wskaźniki (odstępstwo) | |
| A dwie liczby sekcji (wysokość) | wysokość 04 na 375 do sprawdzenia przy 05 (okazała się zgodna) | ✓ | | | |
| B1 układ i tekst | 00 (kopia „Menu” spod maski, text-box), 01 (`flex:1`), 03 (3 reguły ≤767), 04 (akcent ucięty), 05 (padding, odstęp), 06 (szerokość akapitu, skala maszyn), 07 (siatka 2 wiersze), 08 (`margin-top` skali), 10 (padding etykiet) | | | | |
| B2 ruch przy przewijaniu | 01 (bez sekcji niżej strona się nie przewija — test z przekładką), 02 (`seek` pomijał `onUpdate`) | 03–10 | | | punkty za końcem niepełnej strony nieosiągalne (mylące przy każdej sekcji) |
| B3 najechania | 00 (logo: yPercent od ramki, różnica 8 j.) | 01, 03, 06, 07, 10 | 04, 05, 08 | | zapis ze zrzutami przesuwał czasy (00) |
| B4 wejście | 01 (pierwsza klatka: nawigacja bez planszy) | | 00, 02–10 | | |
| B5 przejście z sekcją powyżej | 05→ zgłoszenie 375 (oryginał tak samo) | 02–10 | | | |
| B6 kadry | 01 (karta 1 pod przyciskiem), 02 (kadr 4:5), 06 (skala maszyn) | 03, 04, 09 | 05 (temat nie zmierzony) | 05 | |
| B7 telefon | 00 (gap `.intro`), 09 (`limit` oryginału rośnie po doładowaniu) | 01–08, 10 | | 360×649 (tryb lekki) | |
| D porównanie z poprzednią wersją | — | 00, 01 | | | **przeszkadzał w 02–10**: `compare.py` liczy punkty jako ułamek długości strony, więc po dodaniu sekcji tysiące pozornych różnic |
| wierzch | 04 („Ó” ucięte), 06 („ś” ucięte), 07 (ostatnia litera w masce) | 02, 03, 05, 08, 10 | | | |
| C przejścia | — (zgłoszenia = zachowanie oryginału) | ✓ | | | |
| C zmiana szerokości | — | ✓ | | | |
| C rozmiary krytyczne | — | ✓ | | | `audit.py` zgłasza „overflow” elementów przyciętych przez rodzica i `sr-only` jako nachodzenie |
| C szybkie przewinięcie | — | ✓ | | | |
| C linki menu | **skok na 375 1180 px przed celem** | | | | |
| C telefon | | | | ✗ (niepodłączony) | |

## 6. Nachodzenie i szerokości (lista dla Grzegorza)
| # | Gdzie | Rozmiar okna | Co | Oryginał też? | Decyzja |
|---|---|---|---|---|---|
| 1 | 04 → 05 | 375, 1779×520 | koniec listy minerałów chowa się pod 05 | tak (te same px) | nie błąd |
| 2 | 01 hero | 1779×520 | karty hero na etykiecie „+ 1.000.000 metrów bieżących” | tak | nie błąd |
| 3 | 08 | 1779×520 | kreski skali walca na literach nazw | tak | nie błąd |
| 4 | cała strona | wszystkie | stałe logo nawigacji nad etykietami S.0x przy przewijaniu w górę | tak | nie błąd |

## 7. Odstępstwa od oryginału
Zatwierdzone (lista z datami w `CLAUDE.md`): film hero z Pexels (kamera stoi), zdjęcia Pexels (02 małe postacie, 05
ciaśniejszy kadr, karta 2 hero spawacz), maszyny wycięte (walec bez kabiny, 3 maszyny w innej pozie), skały 04
proceduralne, jedna strona bez Barba (linki do sekcji; 09: kliknięcie → `#uslugi` zamiast przejścia na podstronę —
oryginał: przewinięcie 0,5 s, przyciemnienie 0,6 s, zwinięcie 1,4 s), polskie teksty z innym rozkładem słów w 3
wierszach (07 cytat 1 na 375, 08 akapit na 375). Procesowe: sekcja 00 (komponenty wspólne) zlecona podagentowi, nie
zbudowana przez kierownika; kod sekcji czytali podagenci, kierownik wskazywał wiersze.

## 8. Znane błędy i do sprawdzenia w sesji 2
- Wyśrodkowany tekst `tr="1"`: wiersze SplitText bez `display:block; width:100%` (07 poprawia u siebie; 06 dopasował
  szerokość akapitu 18em — może to ta sama przyczyna; do ujednolicenia w 00).
- Strona na 375 krótsza o 31 px (łamanie 02 i 03): nic nie psuje.
- Konsola: jeden 404 (favicon).
- Nie sprawdzone: prawdziwy telefon (pasek adresu w trakcie gestu), 360×649 (tryb lekki), tablet 768–991 tylko w
  części sekcji, najechania co 50 ms poza 00.

## 9. Propozycje do warsztatu
Odpowiedź Grzegorza 16.10 na 1–4: „tak 1-4, nie zmieniaj procesu, tylko na tę stronę próba” → stosowane tylko tu;
warsztat bez zmian. Wynik próby: pkt 4 wyżej. Do ponownego pytania na końcu sesji.

| # | Skąd | Plik i miejsce | Dokładne brzmienie | Co zyskujemy |
|---|---|---|---|---|
| 1 | zmiana Grzegorza 16.10 („A+B”); próba 02–10 | `checklista.md`, część B, nowy akapit na górze | „**Dwa tryby sprawdzania.** Pełny (wszystkie punkty B jak niżej) dla sekcji z nową albo kruchą techniką: wejście strony, przypięcie ze `scrub`, WebGL / sekwencje klatek, walec 3D. Lekki dla pozostałych: B1 pudełka i wiersze na 1440 i 375; B2 pomiar parami w 4 punktach w dół i w górę, bez kółka (chyba że przypięcie); B3 czasy z kodu + zrzut stanu po, bez zapisu co 50 ms; B5 granica przy 50%; B6 pudełko i temat na 1440 i 375; B7 tylko 375×812; D i `wierzch.py` raz na koniec. Tryb wpisuje kierownik w zleceniu.” | cominvi: 26 zamiast 43 min i 250 zamiast 400 tys. tokenów na sekcję, recenzja nie znalazła nic przepuszczonego |
| 2 | j.w. + decyzja o modelach | `sesja-1-strona.md`, krok 5, wiersz „Podagent: …” | „Podagent: Opus 5.5 `effort: high` dla sekcji w trybie pełnym; w trybie lekkim `effort: medium`, Opus albo Sonnet 5.5 (cominvi: Sonnet 6 sekcji bez rund poprawek, także walec 3D).” | mniej tokenów i czasu |
| 3 | podagent 00 | `narzedzia.md`, pułapki pomiaru | „\| Czasy ruchu przesunięte w zapisie ze zrzutami \| zrzut zatrzymuje wątek strony, a `gsap.ticker.lagSmoothing(0)` dogania czas skokiem \| wartości zapisywać co klatkę w samej stronie (`requestAnimationFrame` → tablica), zrzuty osobno po nagraniu \|” | zgodność do 1 px zamiast pozornych różnic kilkunastu px |
| 4 | kierownik, start | `tools/orig.py` (z `narzedzia/`) + wiersz w `narzedzia.md` | „\| Oryginał przewija się w elemencie (Lenis z `wrapper`) \| `orig.py <narzędzie>.py …` (przepisuje `scrollY`, `scrollTo`, `scrollHeight` na `window.lenis` tylko na stronie oryginału) \|” | bez tego wszystkie narzędzia mierzyły y = 0 |
| 5 | podagenci 03, 04, 06–10 (D „przeszkadzał” 8×) | `tools/compare.py` + `narzedzia.md` | „`--px`: punkty w stałych pikselach przewinięcia (nie ułamek długości strony), żeby po dodaniu sekcji porównanie pokazywało tylko sekcje nad nią” | D znowu użyteczne przy budowie sekcji po kolei |
| 6 | kierownik (recenzja 10 sekcji) | `tools/` nowe `recenzja.py` (z `narzedzia/`) + wiersz w `narzedzia.md` | „\| Recenzja sekcji przez kierownika \| `recenzja.py .section_x --el=…` (pary oryginał \| nasza w punktach postępu, wysokość sekcji, pudełka w vw; ta sama klasa sekcji po obu stronach) \|” | recenzja sekcji jednym poleceniem, ok. 3–5 min |
| 7 | A teksty (7× złapał, 07: większość czasu) | `checklista.md`, A, punkt „Teksty o tej samej liczbie słów” — dopisać | „…Polskie wiersze sprawdzić pomiarem na 1440 i 375 już przy pisaniu `brand.md` (podmiana tekstu w oryginale w przeglądarce: liczba wierszy i słów w wierszu), nie dopiero w sekcji.” | mniej przepisywania tekstów przez podagentów (07: ok. 30 min) |
| 8 | podagent 06, 08, 09 („co zmyliło”) | `sesja-1-strona.md`, krok 4 (zlecenia) — dopisać | „Napęd ruchu (przypięcie / scrub / raz) i długość przypięcia wpisywać do zlecenia z kodu, nie z wyglądu referencji.” | 3 zlecenia z mylnym napędem |
| 9 | C linki menu (złapał) | `praktyki/przewijanie.md`, Dociąganie albo `grafika.md` Elementy stałe — nowa pułapka | „Pułapka: skok z linku menu, gdy Lenis jest zatrzymany (menu), na telefonie (`syncTouch`) `lenis.scrollTo(immediate)` zostawia okno przed celem → po skoku `if (Math.abs(scrollY - y) > 1) scrollTo(0, y)` (cominvi, 18.10).” | błąd widoczny tylko na telefonie |
