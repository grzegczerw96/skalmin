"""Wycięcie przedmiotu z tła (u2net ogólny, lokalnie, onnxruntime), przycięte do obrysu z marginesem.
usage: py -I narzedzia\wytnij.py wejście.jpg wyjście.webp [szerokość=1200] [podgląd.jpg]"""
import os, sys
T = os.path.join(os.environ['LOCALAPPDATA'], 'wir-tools')
sys.path.insert(0, os.path.join(T, 'rembg')); sys.path.insert(0, os.path.join(T, 'pw'))
import numpy as np, onnxruntime as ort
from PIL import Image, ImageFilter
src, dst = sys.argv[1], sys.argv[2]; W = int(sys.argv[3]) if len(sys.argv) > 3 else 1200
im = Image.open(src).convert('RGB')
x = np.asarray(im.resize((320, 320), Image.LANCZOS), dtype=np.float32) / 255.0
x = ((x - np.array([0.485, 0.456, 0.406], np.float32)) / np.array([0.229, 0.224, 0.225], np.float32)).transpose(2, 0, 1)[None]
sess = ort.InferenceSession(os.path.join(T, 'rembg', 'models', 'u2net.onnx'), providers=['CPUExecutionProvider'])
m = sess.run(None, {sess.get_inputs()[0].name: x})[0][0, 0]
m = (m - m.min()) / (m.max() - m.min() + 1e-8)
a = Image.fromarray((m * 255).astype(np.uint8)).resize(im.size, Image.BILINEAR).filter(ImageFilter.GaussianBlur(1))
a = a.point(lambda v: 0 if v < 30 else min(255, int((v - 30) * 1.4)))
out = im.copy(); out.putalpha(a)
bb = a.point(lambda v: 255 if v > 60 else 0).getbbox()
pad = int(0.03 * max(im.size)); bb = (max(0, bb[0] - pad), max(0, bb[1] - pad), min(im.width, bb[2] + pad), min(im.height, bb[3] + pad))
out = out.crop(bb)
if out.width > W: out = out.resize((W, round(out.height * W / out.width)), Image.LANCZOS)
out.save(dst, 'WEBP', quality=82, method=6); print(dst, os.path.getsize(dst), 'B', out.size)
if len(sys.argv) > 4:
    prev = Image.new('RGB', out.size, (20, 20, 20)); prev.paste(out, (0, 0), out); prev.thumbnail((400, 400)); prev.save(sys.argv[4], quality=85)
