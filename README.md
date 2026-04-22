# ⛩ 開運一の宮めぐり

全国一の宮会加盟 **102社** を地図から探して、スタンプラリー形式で訪問記録を残せるWebアプリ。

## 🔗 公開URL

**https://kaiun-ichinomiya.vercel.app**

## 📖 コンセプト

> 朱と金の結界をくぐる、私だけの神社旅。

40〜60代女性の「神社好き・御朱印集め・一人旅」層に向けた、雅で神聖な開運めぐりアプリ。

## ✨ 主な機能

### 地図で探す
- 全国102社の一の宮を日本地図に表示（国土地理院タイル）
- ピンの色で **訪問済み（金）/ 未訪問（朱）** を一目で判別
- フィルタ：ご利益（縁結び・金運・勝負運・厄除け等）／アクセス難易度／都道府県／未参拝のみ

### 各社の詳細情報
- 基本情報（御祭神・創建・ご利益タグ・住所・アクセス）
- 🍡 **開運フード**：参道名物や縁起のよい食べ物（店名・効能・エピソード）
- 🧧 **必買お守り**：公式授与品（初穂料・特徴・どんな人向け）
- ✨ **秘密の話**：公式資料・民俗文献に記載のあるエピソード（ソース付き）
- 女性人気ポイント（フォトスポット・体験型・季節限定）
- 参拝所要時間・ベストシーズン・セット参拝コース・一人旅アクセス安全性

### スタンプラリー
- 「参拝しました！」ボタンで訪問記録（端末内LocalStorage保存）
- 訪問日＋一言メモを残せる
- マイ帳で参拝履歴を一覧
- 地方別（五畿七道）達成率ゲージ
- 称号システム（これから → 入門 → 旅人 → 巡拝者 → 半達成 → 達人 → 大願成就）

## 🎨 デザインシステム

| 要素 | 色 |
|---|---|
| メイン | 鳥居朱 `#BB3D20` |
| アクセント | ゴールド `#D4AF37`（小テキストは深金 `#A07A10`） |
| 背景 | 和紙白 `#FDFAF5` |
| 本文 | 深墨 `#1A1008` |

- **フォント**：Noto Serif JP（見出し）+ Noto Sans JP（本文）
- **アクセシビリティ**：WCAG AA準拠、`prefers-reduced-motion` 対応

## 🛠 技術スタック

- **Framework**: Next.js 16.2.4 (App Router, Turbopack)
- **UI**: React 19.2.4 + Tailwind CSS v4
- **地図**: react-leaflet 5 + leaflet 1.9.4（国土地理院タイル）
- **型**: TypeScript 5
- **ホスティング**: Vercel
- **永続化**: LocalStorage（端末内保存）

## 📂 ディレクトリ構成

```
kaiun-ichinomiya/
├── data/
│   └── ichinomiya-102.json     # 102社マスターデータ
├── design/
│   ├── design-system.md        # デザインシステム仕様
│   ├── tailwind.config.example.js
│   └── wireframes.md           # 5画面ワイヤー
├── research/                   # リサーチ原本（ブロック別JSON）
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx            # ホーム
│   │   ├── map/page.tsx        # 地図画面
│   │   ├── shrines/page.tsx    # 五畿七道一覧
│   │   ├── mypage/page.tsx     # マイ帳
│   │   └── globals.css         # 朱×白×ゴールドトークン
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── ShrineMap.tsx       # Leaflet地図
│   │   ├── ShrineCard.tsx
│   │   ├── ShrineDetail.tsx    # 5タブモーダル
│   │   ├── FilterPanel.tsx
│   │   ├── ProgressGauge.tsx
│   │   └── StampButton.tsx
│   ├── data/
│   │   ├── shrines.ts          # JSON読み込み
│   │   └── constants.ts        # ご利益色・五畿七道・都道府県順
│   ├── hooks/
│   │   └── useStamps.ts        # LocalStorageフック
│   └── types/
│       └── index.ts
```

## 🚀 ローカル起動

```bash
npm install
npm run dev
# → http://localhost:3000
```

## 🏗 ビルド

```bash
npm run build
npm run start
```

## 📦 デプロイ

Vercelへ手動デプロイ：

```bash
npx -y vercel@latest --yes --prod
```

## 📊 データ収集ルール

- 緯度経度は**本殿位置**で統一（スタンプGPS判定のため）
- お守り初穂料は**公式明記のみ**採用、不明は「社務所にて（要現地確認）」
- 創建年は**伝承＋史書根拠の2段表示**
- 秘密の話は**公式資料・民俗文献記載のソース付き**のみ（創作・都市伝説NG）

## 🙏 データ出典

- 全国一の宮会加盟社公式リスト
- 各一の宮公式サイト
- 国土地理院地図（地図タイル）
- その他、各社のリサーチは `research/` 配下のJSONに詳細ソース記載

## 🎯 今後の拡張候補

- [ ] Googleログイン連携（機種変更時のスタンプ引継ぎ）
- [ ] 九星気学連動フィルタ（本命星×吉方位）
- [ ] お気に入り機能
- [ ] SNSシェア機能
- [ ] 新一の宮の追加（102社→拡張）
- [ ] 神社画像掲載（各社への許諾取得後）

---

© 2026 開運一の宮めぐり
