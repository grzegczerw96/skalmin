# Raport sesji 1 (w toku)

## Koszt i recenzja sekcji
| Sekcja | Tokeny podagenta | Rundy poprawek | Co znalazła recenzja kierownika |
|---|---|---|---|
| 00 wspólne | 412 tys. (139 narzędzi, 43 min) | 0 | nic nowego (stany końcowe menu i paska = oryginał co do px na 1440 i 375; w 0,4 s otwierania różnica ~30 px z rozrzutu kliknięcia, podagent mierzył co klatkę: zgodne). Podagent złapał wyścig w `base.js` i 6 różnic klas tekstu w `base.css` (poprawione przez kierownika) |
| 01 plansza + hero (tryb pełny, high) | 392 tys. (139 narzędzi, 43 min; przerwa na limit API) | 0 | układ = oryginał (H1, etykieta, karty ±0,1 vw na 1440 i 375); obraz filmu jaśniejszy i bardziej kontrastowy niż ciemny render oryginału (pytanie do Grzegorza); karta 2 słoneczna przy ciemnej karcie oryginału |

## Decyzje i odstępstwa (na bieżąco)
- 16.10 Grzegorz: „spróbujmy kolejne wszystkie sekcje A+B” → sekcje 02–10 w trybie lekkim (`zlecenia/_tryb-lekki.md`)
  i podagenci `effort: medium`. Sekcja 01 już w toku w pełnym trybie (high). Propozycja do warsztatu: niżej, w tabeli
  propozycji (decyzja po próbie).
- Sekcja 00 (komponenty wspólne: menu, motywy, tekst odsłaniany, przycisk) zlecona podagentowi zamiast budowy przez
  kierownika: w oryginale ok. 1000 wierszy kodu. Kierownik zrobił `base` (kroje, skalowanie, Lenis, GSAP, rejestracja
  sekcji, `?okno`).
- Do decyzji przy 02: akapit 02 z `brand.md` łamie się na 375 na 7 wierszy, w oryginale 6 (zgłosił podagent 00).

- 16.10 Grzegorz: „sekcje 2-4 opus medium jak teraz a resztę sonet medium” → 02–04 Opus 5.5 medium, 05–10 Sonnet 5.5
  medium (próba na tej stronie; w tabeli kosztów kolumna z modelem).
- 16.10 Grzegorz („ok” na punkcie kontrolnym): kierunek dobry; film hero przyciemnić i spłaszczyć kontrast, karta 2
  hero na ciemne ciepłe zdjęcie (odesłane podagentowi 01).

## Propozycje do warsztatu (zbierane w trakcie)
Odpowiedź Grzegorza 16.10: „tak 1-4, nie zmieniaj procesu, tylko na tę stronę próba” → 1–4 stosowane tylko na cominvi
jako próba; warsztat (`C:\Projekty\warsztat-nowy`) bez zmian. Po próbie: wyniki (czas, tokeny, co przepuścił tryb lekki)
i ponowne pytanie o wprowadzenie.

| # | Skąd | Plik i miejsce | Dokładne brzmienie | Co zyskujemy |
|---|---|---|---|---|
| 1 | zmiana sposobu pracy Grzegorza 16.10 („A+B”), sekcja 00: 43 min / 412 tys. tokenów, większość na sprawdzanie | `checklista.md`, część B, nowy akapit na górze | „**Dwa tryby sprawdzania.** Pełny (wszystkie punkty B jak niżej) dla sekcji z nową albo kruchą techniką: wejście strony, przypięcie ze `scrub`, WebGL / sekwencje klatek, walec 3D. Lekki dla pozostałych: B1 pudełka i wiersze na 1440 i 375; B2 pomiar parami w 4 punktach w dół i w górę, bez kółka (chyba że przypięcie); B3 czasy z kodu + zrzut stanu po, bez zapisu co 50 ms; B5 granica przy 50%; B6 pudełko i temat na 1440 i 375; B7 tylko 375×812; D i `wierzch.py` raz na koniec. Tryb wpisuje kierownik w zleceniu.” | szacunkowo 20–25 zamiast 40+ min na zwykłą sekcję (zweryfikować w raporcie: czas, tokeny, co tryb lekki przepuścił w sesji 2) |
| 2 | j.w. | `sesja-1-strona.md`, krok 5, wiersz „Podagent: …” | „Podagent: … Opus 5.5, `effort: high` dla sekcji w trybie pełnym, `effort: medium` w trybie lekkim (decyzja Grzegorza 16.10, próba na cominvi).” | mniej tokenów i krótszy czas na prostych sekcjach |
| 3 | podagent 00, „co przeszkadzało” | `narzedzia.md`, pułapki pomiaru, nowy wiersz | „\| Czasy ruchu przesunięte w zapisie ze zrzutami \| zrzut zatrzymuje wątek strony, a `gsap.ticker.lagSmoothing(0)` dogania czas skokiem \| wartości zapisywać co klatkę w samej stronie (`requestAnimationFrame` → tablica), zrzuty osobno po nagraniu \|” | podagent 00: zgodność do 1 px zamiast pozornych różnic kilkunastu px |
| 4 | kierownik, start cominvi (strona przewija się w `.page-wrap`, narzędzia zakładają okno) | `tools/`: nowe `orig.py` z projektu + wiersz w `narzedzia.md` | „\| Oryginał przewija się w elemencie (Lenis z `wrapper`) \| `orig.py <narzędzie>.py …` (przepisuje `scrollY`, `scrollTo`, `scrollHeight` na `window.lenis` tylko na stronie oryginału) \|” | `ref.py` zadziałał na cominvi bez przeróbek; bez tego wszystkie narzędzia mierzyły y = 0 |
