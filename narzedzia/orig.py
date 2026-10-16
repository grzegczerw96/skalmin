"""Nakładka na narzędzia warsztatu dla oryginału cominvi.com.mx: oryginał przewija się w .page-wrap (Lenis z wrapperem,
window.lenis), a narzędzia zakładają przewijanie okna (scrollY, scrollTo, scrollHeight). Na stronie oryginału JS narzędzi
jest przepisywany: scrollY → lenis.scroll, scrollHeight dokumentu → lenis.limit + innerHeight, scrollTo(0,y) →
lenis.scrollTo(y, immediate). Skrypty samej strony bez zmian. Nasza strona (localhost) bez zmian.
usage (z folderu projektu): py -I narzedzia\orig.py <narzędzie>.py [argumenty narzędzia]
  np. py -I narzedzia\orig.py ref.py https://www.cominvi.com.mx/ --sizes=1440x900"""
import os, re, sys, runpy
TOOLS = r'C:\Projekty\warsztat-nowy\tools'
sys.path.insert(0, TOOLS)
import _env
from playwright.sync_api._generated import Page

_env.SCROLL = """y=>{const l=window.lenis||window.__lenis;if(l)l.scrollTo(y,{immediate:true,force:true});else scrollTo(0,y)}"""
SY = '(window.lenis?window.lenis.scroll:window.scrollY)'
SH = '(window.lenis?Math.round(window.lenis.limit+innerHeight):document.documentElement.scrollHeight)'
ST = '((y)=>{window.lenis?window.lenis.scrollTo(y,{immediate:true,force:true}):window.scrollTo(0,y)})('

def rewrite(js):
    js = js.replace('document.documentElement.scrollHeight', SH)
    js = re.sub(r'(?<![.\w])scrollY\b', SY, js)
    js = re.sub(r'(?<![.\w])scrollTo\(0,', ST, js)
    return js

_ev = Page.evaluate
def evaluate(self, expression, arg=None):
    if 'cominvi.com.mx' in (self.url or ''): expression = rewrite(expression)
    return _ev(self, expression, arg)
Page.evaluate = evaluate

tool = sys.argv[1]
path = tool if os.path.isabs(tool) else os.path.join(TOOLS, tool)
sys.argv = [path] + sys.argv[2:]
runpy.run_path(path, run_name='__main__')
