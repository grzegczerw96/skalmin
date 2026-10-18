# SkalMin: marka, teksty, zamienniki

Fikcyjna firma: wykonawca robót górniczych pod ziemią (oryginał: CoMinVi, Meksyk). Decyzje Grzegorza 16.10.2026: marka
SkalMin, hero z filmu Pexels, zdjęcia z Pexels, skały minerałów z własnej bryły 3D, plansza ładowania jak w oryginale.

## Marka
- **Nazwa:** SkalMin (7 liter jak CoMinVi; zapis z wielkim M w tekście, w logo wersalikami SKALMIN).
- **Logo** (zamiast logo oryginału, rysuje sekcja 00): znak w kwadracie o proporcjach znaku oryginału, prosty kształt
  „skała przecięta poziomą żyłą” (trójkąt z jedną poziomą przerwą), obok napis SKALMIN w tej samej ramce co w oryginale.
  Kolory i ramka jak oryginał.
- **Ton:** rzeczowy, techniczny, krótkie zdania; liczby konkretne. Polska firma, siedziba: Kielce.
- **Kolory i kroje:** jak oryginał (zmienne w `css/base.css`): `--primary #151515`, `--accent #f47920`,
  `--light-green #ebf0ed`, `--gray #e0e0e0`. Krój: Inter Tight 500/600 za Helvetica Now Display 500/700, IBM Plex Mono
  400 za PP Supply Mono 300 (pomiar w `CLAUDE.md`).

## Zasada tekstów
Każdy element: **ta sama liczba słów** co w oryginale, a teksty dzielone na wiersze (SplitText, klasa `line` w
oryginale): **ta sama liczba słów w każdym wierszu** i długość wiersza w znakach ±15%. Akapity małym krojem (16 px),
których tu nie ma, pisze podagent sekcji według tej samej zasady (liczba słów z `teksty.tsv`, długość ±10%) i wpisuje
je tutaj. Pełny spis tekstów oryginału: `%LOCALAPPDATA%\wir-tools\out\cominvi\teksty.tsv` (sekcja, klasa, tekst, słowa,
wiersze na 1440, rozmiar).

## Teksty (oryginał → nasz; `/` = koniec wiersza)

### 00 · nawigacja, menu, stopka
- Menu → Menu; „open menu” → „otwórz menu”
- Menu: Our Services / Technology / Safety / About us / Blog / Contact / Join the Team / En / Es →
  Nasze usługi / Technologia / Bezpieczeństwo / O nas / Blog / Kontakt / Dołącz do zespołu / PL / EN
- Stopka: Explore → Odkryj (Nasze usługi, Technologia, Bezpieczeństwo, O nas, Dołącz do zespołu); Library → Biblioteka
  (Blog); Legal → Prawne (Nota o prywatności; 16.10, podagent 10: „Informacja o prywatności” zawijała się na 375 do 2 wierszy); Contact → Kontakt (Kontakt, info@skalmin.pl, +48 41 690 4050);
  „2026 CoMinVi - Designed and developed by Holographik®” → „2026 SkalMin - Projekt i wykonanie: studium odtworzenia”

### 01 · hero
- Your trusted partner / in underground mining → Twój zaufany partner / w robotach górniczych (16.10: „w górnictwie
  podziemnym” było o 16% szersze i łamało się na 375; podagent 01)
- Over time / + 1.000.000 linear meters → Przez lata / + 1.000.000 metrów bieżących
- Karty: Our Services / Technology → Nasze usługi / Technologia

### 02 · o nas
- S.01 · About us → S.01 · O nas
- CoMinVi is a leading underground mining / contractor with our Corporate Office and / Central Workshop based in
  Guanajuato, Mexico. → SkalMin to czołowy wykonawca robót pod / ziemią, z siedzibą zarządu oraz centralnym /
  warsztatem maszyn w Kielcach, w Polsce. (16.10, podagent 02: poprzednia wersja dawała 7 wierszy na 375 zamiast 6;
  teraz 3 wiersze 6/6/6 słów na 1440 i 6 wierszy na 375)
- Liczby: 1M Linear Meters / 20M Tons of mineral extracted / 5,1k Indirect jobs / 1,7k Current direct jobs / 7 Active
  projects / 36 Projects delivered → 1M Metrów bieżących / 18M Ton urobku wydobytego łącznie / 4,8k Miejsc pośrednich /
  1,5k Obecnych miejsc pracy / 9 Aktywne projekty / 41 Ukończone projekty
- Akapit (44 słowa, 23 + 21, między zdaniami `<br>` jak oryginał): Od ponad 20 lat specjalizujemy się w drążeniu
  wyrobisk dla krajowych i zagranicznych spółek górniczych, głównie przy wydobyciu rud miedzi, cynku i srebra. /
  Łączymy silną kulturę bezpieczeństwa, nowoczesny sprzęt i dbałość o jakość, aby dawać stałe, wysokie wyniki w
  każdych warunkach pracy pod ziemią. (16.10, podagent 02: wiersze jak oryginał, 1440: 4 + 4 = 8, 375: 5 + 4 = 9;
  poprzednia wersja 4 + 5 i 5 + 5)
- Przycisk: About us → O nas

### 03 · usługi
- S.02 · Our services → S.02 · Nasze usługi
- Leveraging our deep geological insight / and engineering prowess, we partner with / clients to transform raw
  opportunity into / operational excellence. → Łącząc głęboką wiedzę geologiczną oraz / kunszt inżynierów, pracujemy
  ramię w ramię / z klientami, zamieniając surowy potencjał w / operacyjną doskonałość.
- Karty: Engineering / Ground Support & Fortification / Development / Production / Hauling → Inżynieria / Obudowa i
  kotwienie wyrobisk (16.10: „wzmacnianie górotworu” łamało się na 375 na 3 wiersze) / Drążenie / Wydobycie / Odstawa (opisy kart: podagent, zasada wyżej)
- Przycisk: See More → Zobacz więcej
- Opisy kart (16.10, podagent 03; słowa w wierszach jak oryginał na 1440, długość karty −6…+5%):
  Planujemy i budujemy pewną, wydajną i trwałą sieć / wyrobisk, dopasowaną do geologii i warunków / eksploatacji
  w każdym naszym projekcie. (8/6/5) · Wzmacniamy wyrobiska pod ziemią kotwami, siatką, / torkretem i łukami ze stali, by
  zabezpieczyć spękany / lub zagrożony górotwór. (6/8/3) · Drążymy precyzyjnie chodniki dla ramp oraz punktów / dostępu,
  łącząc w pracy wiercenie, strzelanie oraz / techniki urabiania. (7/7/2) · Urabiamy rudę sprawdzoną metodą komorową,
  którą / dobieramy pod kątem wydajności, zubożenia oraz / bezpieczeństwa całej załogi. (6/6/3) · Odstawiamy urobek
  i skałę płonną za pomocą / ładowarek LHD, niskoprofilowych wozów oraz / sprawnej logistyki podziemnej. (7/5/3)
- Akapit: „z klientami,” w `span.nowrap` (inaczej „z” wisi na końcu 2. wiersza: 5/7/5/2 zamiast 5/6/6/2)

### 04 · minerały
- S.03 · Minerals → S.03 · Minerały; Minerals We Extract → Minerały, które wydobywamy
- Gold / Silver / Lead / Copper / Zinc → Złoto / Srebro / Ołów / Miedź / Cynk; symbole AU AG PB CU ZN i numery #79 #47
  #82 #29 #30 bez zmian (to chemia, nie treść oryginału)
- Teksty dla czytników (sr-only): „Gold : 600 Tonnes mined in 2025” → „Złoto : 600 ton wydobytych w 2025” (pozostałe tak
  samo, nasze liczby)

### 05 · bezpieczeństwo
- S.04 · Safety Policy → S.04 · Polityka bezpieczeństwa
- At CoMinVi, we are convinced that all / incidents and occupational illnesses are / foreseeable, which is why we
  direct our efforts / to make decisions and actions that reduce / incidents of team members and our assets. →
  W SkalMin wierzymy mocno w to, że / wypadki oraz choroby zawodowe można / przewidzieć, i to na nich skupiamy nasze
  siły, / by decyzje i działania co dzień ograniczały / zdarzenia z udziałem ludzi i naszego sprzętu.
- To this end, we are committed to providing our collaborators with a safe and healthy workplace. → W tym celu dbamy
  o to, by każdy z nas miał bezpieczne i zdrowe miejsce pracy.
- Przycisk: Read More → Czytaj dalej
- Łamanie (podagent 05): od 768 px spięte `nowrap`: „by decyzje” w body-xl; „każdy z nas miał bezpieczne” i „i zdrowe”
  w body-m (1440: 7/5/8/7/7 i 7/5/4 słów jak oryginał; 375: 10 wierszy jak oryginał).

### 06 · technologia
- S.05 · Technology → S.05 · Technologia
- Our underground fleet features more than / 360 specialized machines across key mining / categories. Every unit is
  selected for durability, / safety, and adaptability in confined, high-stakes / environments. → Nasza flota podziemna
  liczy łącznie ponad / 360 maszyn specjalnych z kluczowych kategorii / robót. Każdą z nich dobieramy dla trwałości, /
  bezpieczeństwa i pracy w ciasnych, trudnych / warunkach. (16.10, podagent 06: 6/6/7/6/1 słów na 1440 jak oryginał,
  9 wierszy na 375 jak oryginał; „dla trwałości” zamiast „według”, bo „trwałości,” wisiało samo w wierszu na 375)
- Over 360 machines → Ponad 360 maszyn (2 wiersze „Ponad 360” / „maszyn” przez `<br>` + `nowrap`: „Ponad 360” jest o 16%
  szersze niż „Over 360”); for underground performance → dla wydajności podziemnej; (ukryte) List of our machines →
  Lista naszych maszyn
- Maszyny: Motor Grader / Telehandler / Compactor / Backhoe Loaders With Baskets / Face-Drilling Rig / Load-Haul-Dump
  Loader → Równiarka drogowa / Teleładowarka / Walec / Koparki z koszem roboczym (16.10: „Koparkoładowarki z koszem
  roboczym” łamały się na 2 wiersze na 375) / Wiertnica czołowa / Ładowarka LHD; OPEN / CLOSE → OTWÓRZ / ZAMKNIJ
- Opisy maszyn (16.10, podagent 06; słowa w wierszach jak oryginał na 1440, wiersze wymuszone `.line-inner` z
  `nowrap`, każdy ≤ 380 px z 384): Maszyny do równania i profilowania dróg oraz / ramp, placów roboczych i nasypów pod
  ziemią / lub nad nią, poprawiając bezpieczeństwo oraz / odwodnienie. (7/7/6/1) · Uniwersalne maszyny z wysuwanym
  wysięgnikiem / służą do podnoszenia i ustawiania ciężkich części w / ciasnych wyrobiskach. Używane przy montażu i /
  serwisie oraz zaopatrzeniu załogi pod ziemią. (5/8/6/6) · Walce wibracyjne do zagęszczania luźnego gruntu, /
  niezbędne przy wykonywaniu górniczych / ramp, placów oraz infrastruktury podziemnej. (6/4/5) · Koparki z
  podnoszonym koszem roboczym, dające / bezpieczny dostęp do prac serwisowych, montażu / oraz prac budowlanych w
  ciasnych podziemnych / strefach górniczych. (6/6/6/2) · Wiertnice o napędzie hydraulicznym, z jednym lub / kilkoma
  wysięgnikami z młotami do skały, służą do / szybkiego wiercenia poziomego przy drążeniu tuneli. / Ich precyzja i
  wydajność czynią je niezbędnymi / do skutecznego i bezpiecznego prowadzenia / przodków. (7/8/6/7/5/1) ·
  Niskoprofilowe ładowarki do załadunku, odstawy i / wysypu urobku w ciasnych warunkach pod / ziemią. Ładowarki LHD
  pozostają kluczowe dla / produkcji dzięki ich zwrotności i dużej zdolności do / odstawy. (6/6/6/8/1)
- We operate leading brands like Epiroc, / Sandvik, Caterpillar, among others / ensuring maximum uptime and /
  productivity where it matters most. → Pracujemy na sprzęcie marek jak Volnor, / Kartex, Brenna oraz pozostałych, /
  zapewniając pełną dostępność i / wydajność tam, gdzie to najważniejsze. (6/4/4/5 jak oryginał; „Używamy maszyn
  czołowych marek jak Volnor,” było o 25% szersze niż w oryginale; akapit ma szerokość 18em jak w oryginale ~17em)
- Przycisk: Our Fleet → Nasza flota

### 07 · zespół
- S.06 · Our Team → S.06 · Nasz zespół; Our strength is our people → Naszą siłą są nasi ludzie; 01 / 02 bez zmian
- Cytat 1 (25 słów; 16.10 podagent 07, zmierzone na oryginale): “I enjoy working at this company because / it has a
  strong presence and reputation / both locally and nationally. I feel proud to / represent it legally.” / by Juan
  Erasmo Aguirre Morales → „Lubię tu pracować, bo ta firma ma / mocną markę i świetną renomę w regionie / oraz w
  całym kraju. Jestem z tego dumny, / że ją reprezentuję.” / — Marek Antoni Zieliński Kos (1440 i 834: 7/7/8/3 słów
  jak oryginał; 375: 4/5/4/3/4/4/1 zamiast 5/4/4/3/4/4/1, „ta” nie mieści się w 1. wierszu o 4 px; spięte
  `span.nowrap`: „mocną markę”, „i świetną”, „całym kraju.”, „tego dumny,”, „że ją”; 480–767 inaczej niż oryginał
  6/6/5/7/1)
- Cytat 2 (17 słów): “Thanks to CoMinVi, I’ve been able to develop my skills and improve my family’s quality of
  life.” / by Sebastián Caldera Nava → „Dzięki SkalMin mogę się rozwinąć i już / mam dla rodziny dużo lepsze jutro
  niż / jeszcze rok temu.” / — Paweł Kaczmarek Wójcik (podagent 07: 1440 i 834: 7/7/3 słów jak oryginał, 375: 4/5/4/4
  jak oryginał; „mam dla” w `span.nowrap`)
- Karty: Operation / Quality Processes / Security / Maintenance / Administration & ressources → Operacje / Procesy
  jakości / Ochrona / Serwis / Administracja i zasoby
- Przycisk: Job offers → Oferty pracy

### 08 · partnerzy
- S.07 · Our Partners → S.07 · Nasi partnerzy
- Leading mining companies trust CoMinVi / to carry out their underground operations with / safety, precision, and
  proven results. → Wiodące spółki górnicze ufają SkalMin / w prowadzeniu swoich robót pod ziemią z / bezpieczeństwem,
  precyzją i dobrym wynikiem. (podagent 08: 1440 5/7/5 słów jak oryginał, 768 6/6/5 jak oryginał; 375: 7 wierszy jak
  oryginał, ale 2/4/2/4/1/3/1 słów zamiast 2/2/4/2/3/3/1. Spięte: `nowrap-d` „w prowadzeniu” (≥992), `nowrap-m`
  „górnicze ufają” (≤767), `nowrap` „pod ziemią z”; poprzednia wersja dawała na 1440 4 wiersze, bo „pewnymi wynikami.”
  było za szerokie)
- Lista (fikcyjne spółki, ta sama liczba słów): Silver Crest, Trafigura, Agnico Eagle, Aura Mineral Inc., Capstone,
  Coeur Mining, Endeavour silver, Penoles, Fresnillo, First Majestic, Leagold Mining, Magna Gold, Minera Frisco,
  Equinox gold → Srebrna Grań, Rudolux, Borex Sokół, Aurum Kruszec S.A., Kamieniec, Kordyl Mining, Trudnik srebro,
  Pelnox, Frezanowo, Prima Majorat, Legold Górnictwo, Magnum Złoto, Minera Fryska, Ekwinoks złoto

### 09 · następna strona
- S.08 · Next Page → S.08 · Następna strona; przycisk Our Services → Nasze usługi

## Zamienniki grafik (pliki w `img/`, źródła w `_zrodla/` poza repo)
Wszystkie zdjęcia i film: Pexels (licencja Pexels: wolno używać i przerabiać bez podpisu). Numer = id na pexels.com.

| Miejsce w oryginale | Oryginał (alt) | Nasz plik | Pexels | Uwagi |
|---|---|---|---|---|
| 01 hero: tło (film wejścia 3,6 s + 150 klatek przewijanych, 3D jaskinia z maszyną) | jaskinia, granat, światła | `_zrodla/pexels/hero-18898292.mp4` → podagent 01 tnie na film wejścia i klatki | 18898292 (wideo, 1920×1080, 16,7 s) | ciemna jaskinia, postać z czołówką; przyciemnić i zabarwić na granat oryginału; kamera stoi (w oryginale jedzie): zapisać jako odstępstwo |
| 01 hero: karta 1 | dwóch górników z czołówkami w tunelu | `img/hero-karta-1.webp` | 13658087 | |
| 01 hero: karta 2 (Technologia) | górnik w pomarańczowym kasku (w oryginale) | `img/hero-karta-2.webp` | 3186949 | spawacz w masce w ciemnym warsztacie (16.10, zamiast ładowarki 28753112) |
| 02 o nas | dwóch górników z czołówkami i latarkami | `img/onas.webp` | 6831219 | |
| 03 usługi 1–5 (i 07 zespół, te same pliki w oryginale) | ludzie w kaskach / magazyn / sylwetka z czołówką / spawacz / grota kryształów | `img/usluga-1..5.webp` | 11139140 / 34718922 / 39336523 / 5845964 / 40076446 | 4: 16.10 podagent 03 zamiast 35273758 (iskry jak karta 2 hero); obraz 4 widać w oryginale przy najechaniu karty 4 |
| 04 minerały: 5 obracających się skał (sekwencje klatek) | skały rud | podagent 04: własna bryła three.js renderowana do klatek | — | |
| 05 bezpieczeństwo | górnik w masce i z czołówką | `img/bezpieczenstwo.webp` | 34438147 | |
| 06 maszyny ×6 (wycięte na czarnym) | równiarka, teleładowarka, walec, koparkoładowarka, wiertnica, ładowarka LHD | `img/maszyny/*.webp` (przezroczyste tło, `narzedzia/wytnij.py`) | 34200523 / 16717787 / 29470165 / 32917662 / 15743467 / 33201219 | walec bez kabiny (wycięcie modelu); napisy producentów na maszynach zostają |
| 09 następna strona: tło | dwóch górników w tunelu | `img/nastepna.webp` | 14761195 | |
| 03 / 07 ikony Lottie | ikony kart | podagent: własne ikony SVG z tym samym ruchem (czas, krzywa z JSON oryginału) | — | |
| 02 ikony kart liczb (Lottie icon-11…16) | miara, waga, schemat, 4 kwadraty, teczka z zegarem, teczka z ptaszkiem | `js/ikony.js`: metry (miara nad torem), tony (odważnik ze wskazówką), siec (3 węzły), zespol (4 węzły z lampką), w-toku (podkładka z zegarem), gotowe (skrzynia z wiekiem i ptaszkiem) | — | ruch i czasy z JSON oryginału |
