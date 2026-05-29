"""Extract metadata + body from newest (or given) Zhihu HTML in raw/."""
import json
import re
from datetime import datetime, timezone
from pathlib import Path

import extract_zhihu_html as ex


def find_html(raw: Path) -> Path:
    htmls = sorted(raw.glob("*.html"), key=lambda p: p.stat().st_mtime, reverse=True)
    if not htmls:
        raise SystemExit("No HTML in raw/")
    return htmls[0]


def main() -> None:
    raw = Path("raw")
    path = find_html(raw)
    text = path.read_text(encoding="utf-8", errors="replace")
    m = re.search(r'id="js-initialData"[^>]*>(\{.*?\})</script>', text, re.DOTALL)
    if not m:
        raise SystemExit("NO_INITIAL_DATA")

    d = json.loads(m.group(1))
    ents = d["initialState"]["entities"]
    lines = [f"file: {path.name}"]

    url_m = re.search(
        r"saved from url=\(\d+\)(https?://www\.zhihu\.com/[^\s\"'>]+)",
        text,
    )
    if url_m:
        lines.append(f"url: {url_m.group(1).rstrip('\"')}")

    kind = None
    body = ""
    title = ""
    author = ""
    created = None

    for qid, q in ents.get("questions", {}).items():
        title = q.get("title") or title
        lines.append(f"question_id: {qid}")

    for aid, a in (ents.get("articles") or {}).items():
        kind = "article"
        title = a.get("title") or title
        author = (a.get("author") or {}).get("name") or ""
        created = a.get("created") or a.get("createdTime")
        body = ex.html_to_text(a.get("content", ""))
        lines.append(f"article_id: {aid}")

    for aid, a in (ents.get("answers") or {}).items():
        kind = "answer"
        author = (a.get("author") or {}).get("name") or author
        created = a.get("created") or a.get("createdTime") or created
        body = ex.html_to_text(a.get("content", ""))
        lines.append(f"answer_id: {aid}")
        lines.append(f"url_token: {a.get('url_token')}")

    lines.extend(
        [
            f"kind: {kind}",
            f"title: {title}",
            f"author: {author}",
            f"created: {created}",
        ]
    )
    if created:
        lines.append(
            f"date: {datetime.fromtimestamp(int(created), timezone.utc).strftime('%Y-%m-%d')}"
        )

    out_meta = raw / "meta.txt"
    out_body = raw / "extracted-article.txt"
    out_meta.write_text("\n".join(lines), encoding="utf-8")
    out_body.write_text(body, encoding="utf-8")
    print("\n".join(lines))
    print("---")
    print(f"body_len: {len(body)}")
    print(body[:800])


if __name__ == "__main__":
    main()
