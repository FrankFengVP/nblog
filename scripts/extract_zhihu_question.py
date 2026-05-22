import json
import re
import html as html_lib
import sys
from pathlib import Path


def strip_html(c: str) -> str:
    c = re.sub(r"<br\s*/?>", "\n", c)
    c = re.sub(r"</p>", "\n\n", c)
    c = re.sub(r"</h2>", "\n\n", c)
    c = re.sub(r"</h3>", "\n\n", c)
    c = re.sub(r"<li>", "\n- ", c)
    c = re.sub(r"<[^>]+>", "", c)
    return html_lib.unescape(re.sub(r"\n{3,}", "\n\n", c)).strip()


def main() -> None:
    raw_dir = Path("raw")
    html_files = sorted(raw_dir.glob("*.html"), key=lambda p: p.stat().st_mtime, reverse=True)
    if len(sys.argv) > 1:
        p = Path(sys.argv[1])
    else:
        p = html_files[0]

    text = p.read_text(encoding="utf-8", errors="replace")
    m = re.search(r'id="js-initialData"[^>]*>(\{.*?\})</script>', text, re.DOTALL)
    if not m:
        print("NO_INITIAL_DATA", p)
        raise SystemExit(1)

    d = json.loads(m.group(1))
    ents = d.get("initialState", {}).get("entities", {})

    meta = {"source": str(p), "url": None, "title": None, "author": None, "date": None}

    url_m = re.search(r"saved from url=\([^)]+\)(https?://[^\s]+)", text)
    if url_m:
        meta["url"] = url_m.group(1)

    questions = ents.get("questions") or {}
    for q in questions.values():
        meta["title"] = q.get("title") or meta["title"]

    articles = ents.get("articles") or {}
    for a in articles.values():
        meta["title"] = a.get("title") or meta["title"]
        meta["author"] = (a.get("author") or {}).get("name") or meta["author"]
        meta["date"] = a.get("created") or meta["date"]
        content = strip_html(a.get("content", ""))
        meta["type"] = "article"
        meta["id"] = a.get("id")
        out = raw_dir / "extracted-article.txt"
        out.write_text(content, encoding="utf-8")
        (raw_dir / "extracted-meta.json").write_text(
            json.dumps({**meta, "content_len": len(content)}, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        print(json.dumps(meta, ensure_ascii=False, indent=2))
        print("LEN", len(content))
        print(content[:800])
        print("...")
        return

    answers = ents.get("answers") or {}
    if not answers:
        print("NO_CONTENT", list(ents.keys()))
        raise SystemExit(1)

    # Prefer answer id from saved URL
    target_id = None
    if meta["url"] and "/answer/" in meta["url"]:
        target_id = meta["url"].rstrip("/").split("/answer/")[-1]

    picked = None
    if target_id and target_id in answers:
        picked = answers[target_id]
    else:
        picked = max(answers.values(), key=lambda a: a.get("voteup_count") or 0)

    meta["author"] = (picked.get("author") or {}).get("name")
    meta["date"] = (
        picked.get("createdTime")
        or picked.get("created_time")
        or picked.get("created")
    )
    meta["type"] = "answer"
    meta["id"] = picked.get("id")
    qid = picked.get("question")
    if qid and str(qid) in questions:
        meta["title"] = questions[str(qid)].get("title") or meta["title"]
    if meta["url"] is None and meta["id"]:
        meta["url"] = f"https://www.zhihu.com/question/{qid}/answer/{meta['id']}"

    content = strip_html(picked.get("content", ""))
    out = raw_dir / "extracted-article.txt"
    out.write_text(content, encoding="utf-8")
    (raw_dir / "extracted-meta.json").write_text(
        json.dumps({**meta, "content_len": len(content)}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(json.dumps(meta, ensure_ascii=False, indent=2))
    print("LEN", len(content))
    print(content[:800])
    print("...")


if __name__ == "__main__":
    main()
