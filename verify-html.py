from pathlib import Path
import hashlib, subprocess
p=Path(__file__).parent
if __name__=='__main__':
    for name in ['index.html','black-forest.html']:
        data=(p/name).read_bytes()
        assert data.endswith(b'</html>'), f'{name}: content after closing html'
        assert data.count(b'</html>')==1, f'{name}: duplicate closing html'
        print('PASS HTML boundary:',name,hashlib.sha256(data).hexdigest())
    assert (p/'index.html').read_bytes()==(p/'black-forest.html').read_bytes(), 'export differs'
