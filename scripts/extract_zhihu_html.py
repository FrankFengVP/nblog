"""Extract Zhihu article/answer text from saved HTML in raw/."""
import argparse
import html as html_lib
import json
import re
from pathlib import Path


def html_to_text(c: str) -> str:
    c = re.sub(r"<br\s*/?>", "\n", c)
    c = re.sub(r"</p>", "\n\n", c)
    c = re.sub(r"</h2>", "\n\n", c)
    c = re.sub(r"</h3>", "\n\n", c)
    c = re.sub(r"<li>", "\n- ", c)
    c = re.sub(r"<[^>]+>", "", c)
    return html_lib.unescape(re.sub(r"\n{3,}", "\n\n", c)).strip()


def extract(path: Path, out: Path) -> None:
    text = path.read_text(encoding="utf-8", errors="replace")
    m = re.search(r'id="js-initialData"[^>]*>(\{.*?\})</script>', text, re.DOTALL)
    if not m:
        raise SystemExit("NO_INITIAL_DATA")

    d = json.loads(m.group(1))
    ents = d.get("initialState", {}).get("entities", {})

    for aid, a in (ents.get("articles") or {}).items():
        print("=== ARTICLE", aid)
        print("TITLE:", a.get("title"))
        print("AUTHOR:", (a.get("author") or {}).get("name"))
        print("DATE:", a.get("created"))
        c = html_to_text(a.get("content", ""))
        out.write_text(c, encoding="utf-8")
        print("LEN", len(c))
        return

    for qid, q in (ents.get("questions") or {}).items():
        print("=== QUESTION", qid, q.get("title"))

    for aid, a in (ents.get("answers") or {}).items():
        print("=== ANSWER", aid)
        print("AUTHOR:", (a.get("author") or {}).get("name"))
        print("DATE:", a.get("created"))
        print("URL_TOKEN:", a.get("url_token"))
        c = html_to_text(a.get("content", ""))
        out.write_text(c, encoding="utf-8")
        print("LEN", len(c))
        print(c[:400])
        print("...")
        return

    raise SystemExit("NO_ARTICLE_OR_ANSWER")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("html", nargs="?", help="Path to saved Zhihu HTML")
    parser.add_argument("-o", "--out", default="raw/extracted-article.txt")
    args = parser.parse_args()

    raw = Path("raw")
    if args.html:
        path = Path(args.html)
    else:
        htmls = sorted(raw.glob("*.html"), key=lambda p: p.stat().st_mtime, reverse=True)
        if not htmls:
            raise SystemExit("No HTML in raw/")
        path = htmls[0]
        print("Using newest:", path.name)

    extract(path, Path(args.out))


if __name__ == "__main__":
    main()
