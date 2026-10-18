"""Recenzja kierownika jednej sekcji (tanio): oryginał | nasza w tych samych punktach postępu sekcji, na 1440 i 375.
Sekcje mają u nas te same klasy co w oryginale (np. .section_about). Wynik: wysokość sekcji w ekranach (oryginał / nasza),
pudełka podanych elementów (vw) w każdym punkcie, pary zrzutów OUT/recenzja/<klasa>_<W>_p<punkt>.jpg.
usage: py -I narzedzia\recenzja.py .section_about [--p=0.25,0.5,0.75] [--el=.image-p,.stats] [--sizes=1440x900,375x812]"""
import os, sys, json
sys.path.insert(0, r'C:\Projekty\warsztat-nowy\tools')
import _env
from PIL import Image, ImageDraw
from playwright.sync_api import sync_playwright
opt = lambda k, d: next((a.split('=', 1)[1] for a in sys.argv if a.startswith('--' + k + '=')), d)
SEC = sys.argv[1]; P = [float(x) for x in opt('p', '0.25,0.5,0.75').split(',')]
EL = [e for e in opt('el', '').split(',') if e]
OUT = os.path.join(_env.OUT, 'recenzja'); os.makedirs(OUT, exist_ok=True)
SY = '(window.lenis&&window.__lenisWrapper?window.lenis.scroll:scrollY)'
GEO = "s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [r.top+" + SY + ",r.height]}"
BOX = "els=>els.map(s=>{const e=document.querySelector(s);if(!e)return null;const b=e.getBoundingClientRect();return [b.x,b.y,b.width,b.height].map(v=>+(v/innerWidth*100).toFixed(1))})"
GO = "y=>{const l=window.lenis||window.__lenis;l.scrollTo(y,{immediate:true,force:true})}"
def shots(b, url, tag, w, h, orig):
    pg = b.new_context(viewport={'width': w, 'height': h}, is_mobile=w < 768, has_touch=w < 768).new_page()
    pg.goto(url, wait_until='load', timeout=90000); pg.wait_for_timeout(10000 if orig else 3000)
    lim = pg.evaluate('(window.lenis||window.__lenis).limit')
    for y in range(0, int(lim) + h, h): pg.evaluate(GO, y); pg.wait_for_timeout(100)   # leniwe obrazy
    lim = pg.evaluate('(window.lenis||window.__lenis).limit')   # (po doładowaniu obrazów strona oryginału rośnie)
    top, hh = pg.evaluate(GEO, SEC); res = {'h': round(hh / h, 2), 'p': {}}
    for f in P:
        pg.evaluate(GO, int(max(0, min(lim, top - h + f * (hh + h))))); pg.wait_for_timeout(1500)
        res['p'][f] = pg.evaluate(BOX, EL); pg.screenshot(path=os.path.join(OUT, f'_{tag}_{f}.png'))
    pg.context.close(); return res
with sync_playwright() as p:
    b = _env.launch(p, scrollbars=True)
    for w, h, _ in _env.sizes(opt('sizes', '1440x900,375x812')):
        o = shots(b, 'https://www.cominvi.com.mx/', 'o', w, h, True)
        n = shots(b, _env.page_url(query='?intro=0'), 'n', w, h, False)
        print(f'{w}: wysokość {o["h"]} / {n["h"]} ekranu' + ('  !' if abs(o['h'] - n['h']) > .03 else ''))
        for f in P:
            for e, a, c in zip(EL, o['p'][f], n['p'][f]):
                d = max(abs(x - y) for x, y in zip(a, c)) if a and c else None
                print(f'  p{f} {e}: {a} / {c}' + ('  !' if d is None or d > 1 else ''))
            A, B = Image.open(os.path.join(OUT, f'_o_{f}.png')), Image.open(os.path.join(OUT, f'_n_{f}.png'))
            S = Image.new('RGB', (A.width * 2 + 10, A.height + 20), 'red'); S.paste(A, (0, 20)); S.paste(B, (A.width + 10, 20))
            ImageDraw.Draw(S).text((4, 4), f'ORYGINAŁ | NASZA  {SEC} {w} p{f}', fill='white')
            if w > 800: S = S.resize((S.width // 2, S.height // 2))
            S.save(os.path.join(OUT, f'{SEC.strip(".")}_{w}_p{f}.jpg'), quality=82)
    b.close()
print('pary:', OUT)
