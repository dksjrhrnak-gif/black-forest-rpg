#!/usr/bin/env bash
# Run from an extracted source bundle with Git/gh authenticated for the target repository.
# Prepares a review branch only; never merges or deploys main.
set -euo pipefail
bf_source_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
bf_target_dir="${1:?Usage: bash prepare-github-qa.sh /path/to/new-empty-checkout}"
bf_repo='dksjrhrnak-gif/black-forest-rpg'
bf_expected_main='6b78d47327b54d17c2c1a104c4fa5a2a840cdf2a'
git clone "https://github.com/$bf_repo.git" "$bf_target_dir"
cd "$bf_target_dir"
test "$(git rev-parse origin/main)" = "$bf_expected_main" || { echo 'main changed. Reconcile the new main before importing.' >&2; exit 1; }
git switch -c qa/v5-mobile-final
python3 - "$bf_source_dir" "$PWD" <<'PY'
from pathlib import Path
import shutil,sys
source,target=map(Path,sys.argv[1:])
for f in source.rglob('*'):
    if not f.is_file() or set(f.relative_to(source).parts)&{'.git','.openai','dist','node_modules','.sites-runtime'}:continue
    if f.suffix in {'.png','.tar.gz'}:continue
    dest=target/f.relative_to(source);dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(f,dest)
PY
npm test
python3 build.py
node export-data.cjs
python3 export-site.py
cp dist/black-forest-source.zip dist/black-forest-github-pages.zip .
cp dist/jobs-114.csv dist/jobs-100.csv dist/items-1000.csv .
git add .
git commit -m 'Reconcile v4: 114 careers, twelve-node chapters and three-slot save migration'
git push -u origin qa/v5-mobile-final
echo 'Run the v4 regression and mobile preview QA workflow. Merge main only after QA passes.'
