"""Media sekcji 01 (hero) z filmu Pexels 18898292 (_zrodla/pexels/hero-18898292.mp4, 1920×1080, 29,97 kl/s, 16,7 s).
Jak manifest oryginału (orig/cave-manifest.json): film wejścia 86 klatek 24 kl/s (3,6 s), klatki przewijane: desktop
150 × 1920×1080, telefon 132 × 440×960; przewijane zaczynają się tam, gdzie kończy się film wejścia (ciągłość).
Kadr: postać w miejscu maszyny oryginału (1440×900: 72% / 56% ekranu; 375×812: 69% / 57%), przycięcie i powiększenie 1,3.
Kolor (16.10, druga wersja): krzywa (podniesione cienie, płaskie światła) i zabarwienie na granat oryginału (średni kolor płótna oryginału
w 4 miejscach: góra 54,71,95 / lewo-dół 17,21,28 / środek 85,103,129 / prawo 69,86,109; nasza 1440: 33,44,57 / 30,42,55 / 35,47,60 w kadrach 0 / 50 / 100%).
usage (z folderu projektu): py -I narzedzia\\hero-media.py [--tylko=intro|seq]"""
import os, sys, subprocess, glob, shutil
SRC = os.path.join('_zrodla', 'pexels', 'hero-18898292.mp4')
T_INTRO, D_INTRO, FPS = 1.0, 3.6, 24          # film wejścia: 1,0–4,6 s źródła
T_SEQ, D_SEQ = T_INTRO + D_INTRO, 150 / 24     # klatki przewijane: 4,6–10,85 s źródła (150 klatek po 24 kl/s)
MIX = "colorchannelmixer=rr=.187:rg=.367:rb=.071:gr=.248:gg=.487:gb=.095:br=.329:bg=.646:bb=.125,gblur=sigma=0.7"
# 16.10 (decyzja Grzegorza): przyciemnione, spłaszczony kontrast; percentyle jasności płótna 50 / 90 / 99 w kadrach 0 / 50 /
# 100% przewinięcia jak w oryginale (90. i 99. ≤ oryginał +10%), średni kolor ±5. Oryginał ciemnieje w środku
# przewijania, więc w klatkach przewijanych gamma (i na telefonie nasycenie) maleje po sinusie: 0 na początku i końcu.
WAR = {
    'desktop': dict(crop='crop=1477:831:69:162,scale=1920:1080:flags=lanczos', n=150, q=58, intro='hero-intro',
                    krzywa='0/0.06 0.15/0.19 0.4/0.41 0.7/0.47 1/0.51', gamma=.06, nasyc=0),
    'mobile': dict(crop='crop=495:1080:745:0,scale=440:960:flags=lanczos', n=132, q=62, intro='hero-intro-mobile',
                   krzywa='0/0.1 0.1/0.27 0.3/0.42 0.6/0.5 1/0.55', gamma=.12, nasyc=.25),
}
tylko = next((a.split('=')[1] for a in sys.argv[1:] if a.startswith('--tylko=')), '')

def ff(*a): subprocess.run(['ffmpeg', '-v', 'error', '-y', *a], check=True)

os.makedirs('video', exist_ok=True)
for nazwa, w in WAR.items():
    vf = f"{w['crop']},curves=all='{w['krzywa']}',{MIX}"
    if tylko in ('', 'intro'):
        base = os.path.join('video', w['intro'])
        ff('-ss', str(T_INTRO), '-t', str(D_INTRO), '-i', SRC, '-an', '-vf', vf + ',eq=gamma=1' + f',fps={FPS}', '-frames:v', '86',
           '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-pix_fmt', 'yuv420p', '-g', '12', '-movflags', '+faststart', base + '.mp4')
        ff('-ss', str(T_INTRO), '-t', str(D_INTRO), '-i', SRC, '-an', '-vf', vf + ',eq=gamma=1' + f',fps={FPS}', '-frames:v', '86',
           '-c:v', 'libvpx-vp9', '-crf', '38', '-b:v', '0', '-row-mt', '1', '-g', '12', '-pix_fmt', 'yuv420p', base + '.webm')
    if tylko in ('', 'seq'):
        out = os.path.join('img', 'hero', 'seq', nazwa)
        shutil.rmtree(out, ignore_errors=True); os.makedirs(out)
        fps = w['n'] / D_SEQ                     # telefon: 132 klatki na ten sam odcinek ruchu (założenie)
        mod = (f",eq=eval=frame:gamma='1-{w['gamma']}*sin(PI*t/{D_SEQ})':saturation='1-{w['nasyc']}*sin(PI*t/{D_SEQ})'")
        ff('-ss', str(T_SEQ), '-i', SRC, '-an', '-vf', vf + mod + f',fps={fps:.4f}', '-frames:v', str(w['n']),
           '-c:v', 'libwebp', '-quality', str(w['q']), '-compression_level', '6', '-start_number', '0',
           os.path.join(out, 'frame_%05d.webp'))
for f in sorted(glob.glob('video/hero-intro*')): print(f, round(os.path.getsize(f) / 1e6, 2), 'MB')
for d in sorted(glob.glob('img/hero/seq/*')):
    fs = glob.glob(d + '/*.webp'); print(d, len(fs), 'klatek', round(sum(map(os.path.getsize, fs)) / 1e6, 2), 'MB')
