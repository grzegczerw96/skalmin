"""Część C (kierownik): (1) linki menu: otwórz menu, kliknij link, po 2,5 s góra celu względem okna i stan strony
(menu zamknięte, main bez transformacji); (2) szybkie przewinięcie zaraz po wczytaniu: kółko 600 px co 60 ms do końca
strony, w każdej sekcji zrzut po 250 ms i liczba widocznych obrazów jeszcze niewczytanych; arkusz OUT/c_szybko_<W>.jpg.
usage: py -I narzedzia\czesc_c.py [--sizes=1440x900,375x812]"""
import os, sys
sys.path.insert(0, r'C:\Projekty\warsztat-nowy\tools')
import _env
from PIL import Image
from playwright.sync_api import sync_playwright
opt = lambda k, d: next((a.split('=', 1)[1] for a in sys.argv if a.startswith('--' + k + '=')), d)
SECS = ['.section_hero', '.section_about', '.section_services', '.section_minerals', '.section_safety', '.section_technology',
        '.section_teams', '.section_partners', '.section_next', '.footer']
PUSTE = """()=>[...document.querySelectorAll('img')].filter(i=>{const r=i.getBoundingClientRect();
  return r.bottom>0&&r.top<innerHeight&&r.width>20&&getComputedStyle(i).visibility!=='hidden'&&(!i.complete||!i.naturalWidth)}).length"""
with sync_playwright() as p:
    b = _env.launch(p, scrollbars=True)
    for w, h, dpr in _env.sizes(opt('sizes', '1440x900,375x812')):
        pg = _env.open_page(b, _env.page_url(query='?intro=0'), w, h, dpr, wait=1500)
        links = pg.evaluate("[...document.querySelectorAll('.nav-inner a[href^=\"#\"]')].map(a=>a.getAttribute('href')).filter(h=>h.length>1)")
        for href in links:
            pg.click('.is-menu'); pg.wait_for_timeout(1400)
            pg.click(f'.nav-inner a[href="{href}"]'); pg.wait_for_timeout(2500)
            r = pg.evaluate(f"""()=>({{top:Math.round(document.querySelector('{href}').getBoundingClientRect().top),
              open:document.documentElement.getAttribute('data-menu-open'),tf:getComputedStyle(document.querySelector('main')).transform}})""")
            print(f'{w} menu {href}: góra celu {r["top"]} px, menu-open {r["open"]}, main {r["tf"][:30]}' + ('' if abs(r['top']) <= 2 and r['tf'] == 'none' else '  !'))
        pg.context.close()
        # szybkie przewinięcie od razu po wczytaniu
        pg = _env.new_page(b, w, h, dpr); pg.goto(_env.page_url(query='?intro=0'), wait_until='domcontentloaded')
        pg.wait_for_timeout(300); pg.mouse.move(w // 2, h // 2)
        tops = None; files = []; y = 0
        while True:
            pg.mouse.wheel(0, 600); pg.wait_for_timeout(60)
            if tops is None:
                tops = pg.evaluate("S=>S.map(s=>{const e=document.querySelector(s);return e?e.getBoundingClientRect().top+scrollY:null})", SECS)
            y = pg.evaluate('scrollY'); lim = pg.evaluate('window.__lenis.limit')
            while tops and files.__len__() < len(SECS) and tops[len(files)] is not None and y >= tops[len(files)] - h * 0.3:
                pg.wait_for_timeout(250); f = os.path.join(_env.OUT, f'_c_{w}_{len(files)}.png'); pg.screenshot(path=f)
                files.append((f, pg.evaluate(PUSTE)))
            if y >= lim - 2: break
        for i, (f, n) in enumerate(files): print(f'{w} szybko {SECS[i]}: niewczytane widoczne obrazy {n}' + ('  !' if n else ''))
        tw = 360 if w > 800 else 150; im0 = Image.open(files[0][0]); th = int(im0.height * tw / im0.width)
        S = Image.new('RGB', (5 * (tw + 4), 2 * (th + 4)), 'white')
        for i, (f, _) in enumerate(files): S.paste(Image.open(f).resize((tw, th)), ((i % 5) * (tw + 4), (i // 5) * (th + 4)))
        S.save(os.path.join(_env.OUT, f'c_szybko_{w}.jpg'), quality=80); pg.context.close()
    b.close()
