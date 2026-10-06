from pathlib import Path
import json, argparse
from urllib.parse import quote
p=Path(__file__).parent
license='\n\n'.join((p/'vendor'/f).read_text(encoding='utf-8') for f in ['ROT-LICENSE.txt','LOOT-LICENSE.txt','LZ-LICENSE.txt'])
modules=['vendor/rot.js','vendor/loot-table.js','vendor/lz-string.js','legacy-v1.js','content.js','literature.js','expansion.js','supplemental.js','class-tree.js','effects.js','relationships.js','assets.js','equipment-migration.js','engine.js','qa-relationships.js','career.js','chapters.js']
fragment='<style>\n'+(p/'style.css').read_text(encoding='utf-8')+'\n</style>\n'+(p/'shell.html').read_text(encoding='utf-8')
fragment+='\n<script>\n/*\n'+license+'\n*/\n'+'\n'.join((p/f).read_text(encoding='utf-8') for f in modules)+'\n</script>\n<script>\ndocument.getElementById("black-forest-game").dataset.license='+json.dumps(license)+';\n'+(p/'ui.js').read_text(encoding='utf-8')+'\n</script>\n'
parser=argparse.ArgumentParser();parser.add_argument('--inline-output');args=parser.parse_args()
if args.inline_output:Path(args.inline_output).write_text(fragment,encoding='utf-8')
favicon='<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,'+quote('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#172418"/><path d="M17 4c2 8 8 10 8 17a9 9 0 0 1-18 0c0-5 4-7 5-12 1 4 3 6 4 7 2-4 2-8 1-12" fill="#b7d4a2"/></svg>')+'">'
(p/'black-forest.html').write_text('<!DOCTYPE html>\n<html lang="ko"><head>'+favicon+'<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="color-scheme" content="light dark"><title>검은 숲의 방랑자 — 마지막 불씨</title><meta name="description" content="일반 100개·히든 14개 직업과 1000개 장비, 고전 문학의 세계를 탐험하는 모바일 텍스트 RPG"><style>body{margin:0;padding:20px;background:#090d0b;color-scheme:dark;font-family:system-ui}@media(max-width:600px){body{padding:0}}</style></head><body>\n'+fragment+'\n</body></html>',encoding='utf-8')
print('Built bundled game:',(p/'black-forest.html').stat().st_size,'bytes')
