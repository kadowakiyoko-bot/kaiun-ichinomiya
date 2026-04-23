"""
全国一の宮102社のWikipedia画像URL一括取得スクリプト

Wikipedia API (ja.wikipedia.org) の pageimages プロパティを使用。
取得できなかった社は検索APIで代替候補を探す。
結果は ichinomiya-102.json に追記。

画像ライセンス: Wikimedia Commons (CC BY-SA 等) → 要クレジット表記。
"""

import json
import sys
import time
from pathlib import Path
from urllib.parse import quote
import urllib.request
import urllib.error

sys.stdout.reconfigure(encoding='utf-8')

BASE = Path(r"C:\Users\Owner\Documents\dev\06_アプリ開発\kaiun-ichinomiya")
DATA_JSON = BASE / "data" / "ichinomiya-102.json"

WIKI_API = "https://ja.wikipedia.org/w/api.php"
USER_AGENT = "kaiun-ichinomiya/1.0 (https://kaiun-ichinomiya.vercel.app)"


def http_get_json(url: str) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read().decode("utf-8"))


def query_page_image(title: str, thumbsize: int = 600) -> dict | None:
    """titleページの代表画像を取得。存在しなければNone"""
    params = (
        f"?action=query&format=json&prop=pageimages|pageprops"
        f"&pithumbsize={thumbsize}&titles={quote(title)}&redirects=1"
    )
    try:
        data = http_get_json(WIKI_API + params)
        pages = data.get("query", {}).get("pages", {})
        for pid, page in pages.items():
            if pid == "-1":
                return None
            thumb = page.get("thumbnail")
            pageimage = page.get("pageimage")
            if thumb and pageimage:
                return {
                    "title": page.get("title", title),
                    "thumbUrl": thumb["source"],
                    "thumbWidth": thumb["width"],
                    "thumbHeight": thumb["height"],
                    "pageimage": pageimage,
                    "wikiUrl": f"https://ja.wikipedia.org/wiki/{quote(page.get('title', title))}",
                }
        return None
    except (urllib.error.URLError, Exception) as e:
        print(f"  ERROR for {title}: {e}")
        return None


def search_page_title(query: str) -> str | None:
    """検索で近い記事タイトルを返す"""
    params = f"?action=opensearch&format=json&limit=3&search={quote(query)}"
    try:
        data = http_get_json(WIKI_API + params)
        if len(data) > 1 and data[1]:
            return data[1][0]
        return None
    except Exception:
        return None


def get_image_for_shrine(shrine: dict) -> dict | None:
    """神社データから画像情報を取得する"""
    name = shrine["name"]

    # 1回目：社名そのまま
    result = query_page_image(name)
    if result:
        return result

    # 2回目：カッコ内を除去（例：「都都古別神社（八槻）」→「都都古別神社 八槻」）
    clean_name = name.replace("（", " ").replace("）", "").replace("(", " ").replace(")", "").strip()
    if clean_name != name:
        result = query_page_image(clean_name)
        if result:
            return result

    # 3回目：検索API
    search_title = search_page_title(name)
    if search_title and search_title != name:
        result = query_page_image(search_title)
        if result:
            return result

    return None


def main():
    with open(DATA_JSON, encoding="utf-8") as f:
        shrines = json.load(f)

    print(f"対象: {len(shrines)}社")
    ok = 0
    missing = []

    for i, shrine in enumerate(shrines, 1):
        name = shrine["name"]
        print(f"[{i:3d}/{len(shrines)}] {name} ... ", end="", flush=True)

        info = get_image_for_shrine(shrine)
        if info:
            shrine["imageUrl"] = info["thumbUrl"]
            shrine["imageWidth"] = info["thumbWidth"]
            shrine["imageHeight"] = info["thumbHeight"]
            shrine["imageSource"] = "Wikimedia Commons"
            shrine["imageSourcePage"] = info["wikiUrl"]
            shrine["imageAttribution"] = "画像：Wikimedia Commons (CC BY-SA)"
            print(f"OK ({info['thumbWidth']}x{info['thumbHeight']})")
            ok += 1
        else:
            shrine["imageUrl"] = None
            shrine["imageSource"] = None
            shrine["imageAttribution"] = None
            print("MISS")
            missing.append(name)

        time.sleep(0.3)  # 優しくレート抑える

    # 結果書き戻し
    with open(DATA_JSON, "w", encoding="utf-8") as f:
        json.dump(shrines, f, ensure_ascii=False, indent=2)

    print(f"\n{'='*50}")
    print(f"成功: {ok}/{len(shrines)} 社")
    print(f"失敗: {len(missing)} 社")
    if missing:
        print(f"\n画像なし社:")
        for m in missing:
            print(f"  - {m}")

    # ログ出力
    log_path = BASE / "scripts" / "fetch_images.log"
    with open(log_path, "w", encoding="utf-8") as f:
        f.write(f"取得成功: {ok}/{len(shrines)}\n")
        f.write(f"取得失敗: {len(missing)}\n\n")
        f.write("--- 画像なし社 ---\n")
        for m in missing:
            f.write(f"{m}\n")
    print(f"\nログ: {log_path}")


if __name__ == "__main__":
    main()
