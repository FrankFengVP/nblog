import json
import re
from pathlib import Path

raw = Path("raw")
htmls = [p for p in raw.glob("*.html") if "痛苦极致" in p.name]
path = htmls[0] if htmls else sorted(raw.glob("*.html"), key=lambda p: p.stat().st_mtime)[-1]
text = path.read_text(encoding="utf-8")
d = json.loads(re.search(r'id="js-initialData"[^>]*>(\{.*?\})</script>', text, re.DOTALL).group(1))
ents = d["initialState"]["entities"]
for qid, q in ents.get("questions", {}).items():
    print("question:", qid, q.get("title"))
lines = []
for qid, q in ents.get("questions", {}).items():
    lines.append(f"question: {qid} | {q.get('title')}")
for aid, a in ents.get("answers", {}).items():
    lines.append(f"answer: {aid}")
    lines.append(f"author: {(a.get('author') or {}).get('name')}")
    lines.append(f"created: {a.get('created') or a.get('createdTime')}")
    lines.append(f"updated: {a.get('updated') or a.get('updatedTime')}")
Path("raw/meta.txt").write_text("\n".join(lines), encoding="utf-8")
