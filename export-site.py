"""Stage the game and downloadable, source-controlled DB/source snapshot."""
from pathlib import Path
import shutil, zipfile
p=Path(__file__).parent
out=p/'dist'
out.mkdir(exist_ok=True)
shutil.copy2(p/'black-forest.html',out/'index.html')
shutil.copy2(p/'black-forest.html',p/'index.html')
shutil.copy2(p/'.nojekyll',out/'.nojekyll')
shutil.copytree(p/'assets',out/'assets',dirs_exist_ok=True)
for name in ['jobs-114.csv','jobs-100.csv','items-1000.csv']:
    shutil.copy2(p/'data'/name,out/name)
    shutil.copy2(p/'data'/name,p/name)
with zipfile.ZipFile(out/'black-forest-source.zip','w',zipfile.ZIP_DEFLATED) as z:
    for f in sorted(p.rglob('*')):
        if f.is_file() and not set(f.relative_to(p).parts)&{'.git','.openai','dist','node_modules','.sites-runtime'} and f.suffix!='.png':
            z.write(f,Path('black-forest')/f.relative_to(p))

# Reviewable GitHub Pages bundle; this does not publish to GitHub.
with zipfile.ZipFile(out/'black-forest-github-pages.zip','w',zipfile.ZIP_DEFLATED) as z:
    z.write(out/'index.html','index.html')
    z.write(out/'.nojekyll','.nojekyll')
    for f in sorted((out/'assets').rglob('*')):
        if f.is_file():z.write(f,f.relative_to(out))
    for name in ['jobs-114.csv','jobs-100.csv','items-1000.csv']:
        z.write(out/name,name)
