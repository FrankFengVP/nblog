import datetime
import json
import re
from pathlib import Path

p = next(Path("raw").glob("*测不准*.html"))
text = p.read_text(encoding="utf-8")
m = re.search(r'id="js-initialData"[^>]*>(\{.*?\})</script>', text, re.DOTALL)
a = json.loads(m.group(1))["initialState"]["entities"]["answers"]["3012239893"]
print("createdTime", a.get("createdTime"))
print("updatedTime", a.get("updatedTime"))
