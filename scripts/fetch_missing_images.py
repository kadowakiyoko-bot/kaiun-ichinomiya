"""
画像取得できなかった11社について、具体的なWikipedia記事タイトルを指定して再取得。
同名別社・かっこ付・連名などの曖昧性解消用。
"""

import json
import sys
import time
from pathlib import Path
from urllib.parse import quote
import urllib.request

sys.stdout.reconfigure(encoding='utf-8')

BASE = Path(r"C:\Users\Owner\Documents\dev\06_アプリ開発\kaiun-ichinomiya")
DATA_JSON = BASE / "data" / "ichinomiya-102.json"

WIKI_API = "https://ja.wikipedia.org/w/api.php"
USER_AGENT = "kaiun-ichinomiya/1.0 (https://kaiun-ichinomiya.vercel.app)"

# id → Wikipedia正式記事タイトル候補リスト（順番に試す）
EXPLICIT_TITLES = {
    # 天津神社・奴奈川神社（越後国・糸魚川）
    "天津神社・奴奈川神社": ["天津神社 (糸魚川市)", "天津神社"],
    # 飛騨国一宮
    "水無神社": ["飛騨一宮水無神社", "水無神社 (高山市)"],
    # 上賀茂神社
    "賀茂別雷神社（上賀茂神社）": ["賀茂別雷神社", "上賀茂神社"],
    # 下鴨神社
    "賀茂御祖神社（下鴨神社）": ["賀茂御祖神社", "下鴨神社"],
    # 伯耆国一宮
    "倭文神社": ["倭文神社 (湯梨浜町宮内)", "倭文神社 (伯耆国一宮)", "倭文神社"],
    # 石見国一宮
    "物部神社": ["物部神社 (大田市)", "物部神社 (石見国)"],
    # 備後国一宮
    "素盞嗚神社": ["素盞嗚神社 (福山市新市町)", "素盞嗚神社 (備後国)"],
    # 筑前国と長門国どちらもある（都道府県で判別）
    # 長門国: 住吉神社 (下関市)
    # 筑前国: 住吉神社 (福岡市)
    # 讃岐国
    "田村神社": ["田村神社 (高松市)"],
    # 薩摩国
    "新田神社": ["新田神社 (薩摩川内市)"],
}


def http_get_json(url: str) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read().decode("utf-8"))


def query_page_image(title: str, thumbsize: int = 600) -> dict | None:
    params = (
        f"?action=query&format=json&prop=pageimages"
        f"&pithumbsize={thumbsize}&titles={quote(title)}&redirects=1"
    )
    try:
        data = http_get_json(WIKI_API + params)
        pages = data.get("query", {}).get("pages", {})
        for pid, page in pages.items():
            if pid == "-1":
                return None
            thumb = page.get("thumbnail")
            if thumb:
                return {
                    "title": page.get("title", title),
                    "thumbUrl": thumb["source"],
                    "thumbWidth": thumb["width"],
                    "thumbHeight": thumb["height"],
                    "wikiUrl": f"https://ja.wikipedia.org/wiki/{quote(page.get('title', title))}",
                }
        return None
    except Exception as e:
        print(f"    ERROR: {e}")
        return None


def title_for_住吉(shrine: dict) -> list[str]:
    """住吉神社を旧国で判別"""
    if "長門" in shrine.get("旧国", ""):
        return ["住吉神社 (下関市)"]
    if "筑前" in shrine.get("旧国", ""):
        return ["住吉神社 (福岡市)"]
    return []


def main():
    with open(DATA_JSON, encoding="utf-8") as f:
        shrines = json.load(f)

    missing = [s for s in shrines if not s.get("imageUrl")]
    print(f"画像なし: {len(missing)}社")

    fixed = 0
    still_missing = []

    for shrine in missing:
        name = shrine["name"]
        print(f"\n処理中: {name} ({shrine.get('旧国','')})")

        # 候補タイトル生成
        if name == "住吉神社":
            candidates = title_for_住吉(shrine)
        else:
            candidates = EXPLICIT_TITLES.get(name, [])

        result = None
        for c in candidates:
            print(f"  試行: {c}")
            r = query_page_image(c)
            if r:
                print(f"    OK → {r['title']} ({r['thumbWidth']}x{r['thumbHeight']})")
                result = r
                break
            time.sleep(0.3)

        if result:
            shrine["imageUrl"] = result["thumbUrl"]
            shrine["imageWidth"] = result["thumbWidth"]
            shrine["imageHeight"] = result["thumbHeight"]
            shrine["imageSource"] = "Wikimedia Commons"
            shrine["imageSourcePage"] = result["wikiUrl"]
            shrine["imageAttribution"] = "画像：Wikimedia Commons (CC BY-SA)"
            fixed += 1
        else:
            still_missing.append(name)
            print(f"  全候補失敗")

    with open(DATA_JSON, "w", encoding="utf-8") as f:
        json.dump(shrines, f, ensure_ascii=False, indent=2)

    total = sum(1 for s in shrines if s.get("imageUrl"))
    print(f"\n{'='*50}")
    print(f"追加取得: {fixed}社")
    print(f"合計画像あり: {total}/{len(shrines)} 社")
    if still_missing:
        print(f"\n最終的に画像なし: {len(still_missing)}社")
        for m in still_missing:
            print(f"  - {m}")


if __name__ == "__main__":
    main()
