# Tryb lekki sprawdzania (decyzja Grzegorza 16.10.2026, próba: sekcje 02–10)

Powód: sekcja 00 trwała 43 min i 412 tys. tokenów, z czego większość to sprawdzanie. Podagent: Opus 5.5, `effort: medium`.
Budowa bez zmian (liczby z kodu, CSS i pomiaru, jak w zleceniu). Zmienia się tylko zakres sprawdzania z checklisty B:

| Punkt | Tryb lekki |
|---|---|
| B1 | pudełka głównych elementów parami na 1440 i 375 (±1 vw); łamanie wierszy na 1440 i 375 |
| B2 | pomiar parami wszystkich ruchomych elementów w **4 punktach** (0 / 0,33 / 0,66 / 1) w dół i w górę, jednym odczytem na punkt; **bez** jazdy prawdziwym kółkiem i odczytów po 0 / 0,3 / 1 s (wyjątek: sekcja z `scrub` liczbowym albo przypięciem → jeden przejazd kółkiem w dół i w górę) |
| B3 | czasy i krzywe najechań **z kodu**, zrzut stanu po najechaniu obok oryginału; **bez** zapisu co 50 ms |
| B5 | granica sekcji przy 50% wysokości okna, w dół i w górę; tekst nie wchodzi na tekst |
| B6 | pudełko i temat obrazu na 1440 i 375 |
| B7 | emulacja 375×812 (bez 360×649) |
| D | `compare.py --ref=HEAD` raz na koniec |
| wierzch | `wierzch.py --sec=<sekcja>` raz na koniec |

Zrzuty: najwyżej 3 pary (oryginał | nasza) wycięte do miejsca różnicy. W raporcie przy każdym punkcie jak zawsze:
złapał / nic / nie dotyczy / przeszkadzał — to dane do oceny, czy tryb lekki przepuszcza błędy.
