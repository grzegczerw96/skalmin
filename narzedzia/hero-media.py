"""Media sekcji 01 (hero) z filmu Pexels 18898292 (_zrodla/pexels/hero-18898292.mp4, 1920×1080, 29,97 kl/s, 16,7 s).
Jak manifest oryginału (orig/cave-manifest.json): film wejścia 86 klatek 24 kl/s (3,6 s), klatki przewijane: desktop
150 × 1920×1080, telefon 132 × 440×960; przewijane zaczynają się tam, gdzie kończy się film wejścia (ciągłość).
Kadr: postać w miejscu maszyny oryginału (1440×900: 72% / 56% ekranu; 375×812: 69% / 57%), przycięcie i powiększenie 1,3.
Kolor: krzywa (podniesione cienie, ściśnięte światła) i zabarwienie na granat oryginału (średni kolor płótna oryginału
w 4 miejscach: góra 54,71,95 / lewo-dół 17,21,28 / środek 85,103,129 / prawo 69,86,109; nasza średnia 49,66,87).
usage (z folderu projektu): py -I narzedzia\\hero-media.py [--tylko=intro|seq]"""
import os, sys, subprocess, glob, shutil
SRC = os.path.join('_zrodla', 'pexels', 'hero-18898292.mp4')
T_INTRO, D_INTRO, FPS = 1.0, 3.6, 24          # film wejścia: 1,0–4,6 s źródła
T_SEQ, D_SEQ = T_INTRO + D_INTRO, 150 / 24     # klatki przewijane: 4,6–10,85 s źródła (150 klatek po 24 kl/s)
GRADE = ("curves=all='0/0.05 0.15/0.2 0.4/0.5 0.7/0.66 1/0.76',"
         "colorchannelmixer=rr=.187:rg=.367:rb=.071:gr=.248:gg=.487:gb=.095:br=.329:bg=.646:bb=.125,gblur=sigma=0.7")
WAR = {
    'desktop': dict(crop='crop=1477:831:69:162,scale=1920:1080:flags=lanczos', n=150, q=58, intro='hero-intro'),
    'mobile': dict(crop='crop=495:1080:745:0,scale=440:960:flags=lanczos', n=132, q=62, intro='hero-intro-mobile'),
}
tylko = next((a.split('=')[1] for a in sys.argv[1:] if a.startswith('--tylko=')), '')

def ff(*a): subprocess.run(['ffmpeg', '-v', 'error', '-y', *a], check=True)

os.makedirs('video', exist_ok=True)
for nazwa, w in WAR.items():
    vf = w['crop'] + ',' + GRADE
    if tylko in ('', 'intro'):
        base = os.path.join('video', w['intro'])
        ff('-ss', str(T_INTRO), '-t', str(D_INTRO), '-i', SRC, '-an', '-vf', vf + f',fps={FPS}', '-frames:v', '86',
           '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-pix_fmt', 'yuv420p', '-g', '12', '-movflags', '+faststart', base + '.mp4')
        ff('-ss', str(T_INTRO), '-t', str(D_INTRO), '-i', SRC, '-an', '-vf', vf + f',fps={FPS}', '-frames:v', '86',
           '-c:v', 'libvpx-vp9', '-crf', '38', '-b:v', '0', '-row-mt', '1', '-g', '12', '-pix_fmt', 'yuv420p', base + '.webm')
    if tylko in ('', 'seq'):
        out = os.path.join('img', 'hero', 'seq', nazwa)
        shutil.rmtree(out, ignore_errors=True); os.makedirs(out)
        fps = w['n'] / D_SEQ                     # telefon: 132 klatki na ten sam odcinek ruchu (założenie)
        ff('-ss', str(T_SEQ), '-i', SRC, '-an', '-vf', vf + f',fps={fps:.4f}', '-frames:v', str(w['n']),
           '-c:v', 'libwebp', '-quality', str(w['q']), '-compression_level', '6', '-start_number', '0',
           os.path.join(out, 'frame_%05d.webp'))
for f in sorted(glob.glob('video/hero-intro*')): print(f, round(os.path.getsize(f) / 1e6, 2), 'MB')
for d in sorted(glob.glob('img/hero/seq/*')):
    fs = glob.glob(d + '/*.webp'); print(d, len(fs), 'klatek', round(sum(map(os.path.getsize, fs)) / 1e6, 2), 'MB')
