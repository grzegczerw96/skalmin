"""Klatki skał sekcji 04 (minerały): renderuje narzedzia/skaly.html (three.js r149, lib/three.min.js) w Chrome przez
Playwright i zapisuje img/mineraly/m-000.webp … m-599.webp (5 minerałów × 120 klatek, obrót 360°; jak sekwencja oryginału:
600 klatek, 24 kl./s, cięcie co 120 [pomiar orig minerals-sequence.af]).
usage (z folderu projektu): py -I narzedzia\\skaly.py [--q=0.66] [--podglad]   (--podglad: tylko arkusz 5×4 klatek do OUT)"""
import os, sys, base64
sys.path.insert(0, r'C:\Projekty\warsztat-nowy\tools')
import _env
from playwright.sync_api import sync_playwright
opt = lambda k, d: next((a.split('=', 1)[1] for a in sys.argv if a.startswith('--' + k + '=')), d)
Q = float(opt('q', '0.66'))
DIR = os.path.join(_env.PROJ, 'img', 'mineraly'); os.makedirs(DIR, exist_ok=True)
podglad = '--podglad' in sys.argv
with sync_playwright() as p:
    b = _env.launch(p)
    pg = b.new_page(viewport={'width': 400, 'height': 400})
    pg.on('console', lambda m: m.type in ('error', 'warning') and print('konsola:', m.text[:300]))
    pg.on('pageerror', lambda e: print('błąd:', str(e)[:300]))
    pg.goto(_env.serve(_env.PROJ) + 'narzedzia/skaly.html'); pg.wait_for_function('window.gotowe')
    if podglad:
        from PIL import Image
        S = Image.new('RGB', (5 * 256, 4 * 256), 'white')
        for m in range(5):
            for j, k in enumerate((0, 30, 60, 90)):
                d = pg.evaluate('a=>klatka(a[0],a[1],{q:a[2]})', [m, k, Q])
                f = os.path.join(_env.OUT, '_skala.webp'); open(f, 'wb').write(base64.b64decode(d.split(',', 1)[1]))
                S.paste(Image.open(f).convert('RGB').resize((256, 256)), (m * 256, j * 256))
        S.save(os.path.join(_env.OUT, 'skaly-podglad.png')); print(os.path.join(_env.OUT, 'skaly-podglad.png'))
    else:
        tot = 0
        for m in range(5):
            for k in range(120):
                d = pg.evaluate('a=>klatka(a[0],a[1],{q:a[2]})', [m, k, Q])
                raw = base64.b64decode(d.split(',', 1)[1]); tot += len(raw)
                open(os.path.join(DIR, 'm-%03d.webp' % (m * 120 + k)), 'wb').write(raw)
            print('minerał', m, 'razem', round(tot / 1e6, 2), 'MB')
    b.close()
