# 07 · zespół · stan: do zrobienia

Twoje pliki: `css/07-zespol.css`, `js/07-zespol.js`, HTML między `<!-- S:07-zespol -->` … `<!-- /S:07-zespol -->`.
Wspólne: komponenty 00, ikony `js/ikony.js` (sekcja 02; dodaj swoje 5 przez jego API), karty i obrazy jak w 03
(sprawdź, czy kod / CSS kart z 03 da się użyć: jeśli tak, opisz w raporcie, co trzeba przenieść do wspólnych, nie
kopiuj cudzych plików). `bg="white"`.

**Oryginał:** `.section_teams`; 1440×900: y 11263, 1977 px = 2,20 ekranu; 375×812: y 13005, 3,11 ekranu [ref.json].
HTML `orig\sekcje\07-zespol.html`. CSS: Webflow + wstrzyknięty (`.team-card{aspect-ratio:2/1.5}`, `.testimonials
.toggle-id{transition:color .8s cubic-bezier(.5,0,0,1)}`, `.toggle .toggle-indicator`, `.testimonial-line`). JS
(`orig\pretty\`): `testimonials.js` (cały: przełącznik 01/02, zmiana cytatu), `cards-reveal.js`, `service-cards.js`
(najechanie `team-card`), ikony `data-lottie="6"…"10"` (`service-icons.js`), `tr` (komponent 00).
Referencja: `out\cominvi\ref\sek_*_s6_p*.jpg`.

**Praktyki:** `praktyki/mysz.md#Najechanie`, `praktyki/przewijanie.md#Tekst przewijaniem`.

## Układ
Etykieta „S.06 · Nasz zespół”, `eyebrow-m` „Naszą siłą są nasi ludzie”, przełącznik 01 / 02, cytat `body-xl` 4 wiersze
+ podpis (wyśrodkowane, odsłaniane), siatka 5 kart zespołu (jasnozielone, ikona, nazwa `body-l`), przycisk „Oferty
pracy”. Teksty: `brand.md` → 07 (drugi cytat: podział na wiersze jak oryginał po przełączeniu — zmierz).

## Ruch
Przełącznik: automatycznie po czasie czy kliknięciem? (z kodu), zmiana cytatu (wiersze wyjeżdżają / wjeżdżają: czasy,
kaskada), wskaźnik `toggle-indicator`; karty: wjazd, najechanie (jak 03?).

## Kluczowe elementy
Zmiana cytatu (co 50 ms obok oryginału), najechanie karty, odsłanianie cytatu przewijaniem.

## Przejście z sekcją powyżej
06 (jasnozielona?) → 07 (biała?) (B5).

## Telefon
375: 3,11 ekranu; karty w kolumnie?

## Gotowe, gdy
B1, B2, B3, B5, B7 + liczby: wysokość 2,20 / 3,11 ekranu, czasy przełączenia cytatu, pudełka kart.
