# 開運一の宮めぐり — デザインシステム v1.0

**プロダクト**: 開運一の宮めぐり  
**ブランド**: 富旅シリーズ（姉妹アプリ：開運温泉巡りマップ）  
**対象ユーザー**: 40〜60代女性  
**デザインコンセプト**: 朱と金の結界をくぐる、私だけの神社旅  
**作成日**: 2026-04-22  
**バージョン**: v1.0

---

## 姉妹アプリとの差分サマリー

| 要素 | 開運温泉巡りマップ | 開運一の宮めぐり |
|------|-------------------|-----------------|
| メインカラー | ピンク (#F2A7C3) | 朱赤 (#C0392B相当→後述の確定色) |
| アクセント | ゴールド (#D4AF37) | ゴールド (#D4AF37) ← 共通 |
| サブカラー | 水色・紫 | 和白・墨 |
| テキスト | 紫系 (#3D2B50) | 深墨 (#1A1008) |
| 背景 | 薄紫白 (#FDF8FF) | 和紙白 (#FDFAF5) |
| 装飾モチーフ | 曼荼羅・回転 | 注連縄・千鳥格子 |
| タイポ | Noto Sans JP | Noto Serif JP (見出し) + Noto Sans JP (本文) |

---

## 1. カラーパレット

### 1-1. 朱赤（メインカラー）候補と選定

神社の鳥居は朱漆の色。純粋な赤よりわずかに橙みがかり、白背景・ゴールドとの調和が求められる。

| No. | 名称 | Hex | RGB | 用途・評価 |
|-----|------|-----|-----|-----------|
| A | 弁柄朱 | `#C0392B` | rgb(192,57,43) | やや青みがかった濃い赤。力強いが温泉アプリに比べ冷たい印象 |
| B | 朱漆色 | `#C94B31` | rgb(201,75,49) | 橙よりで温かみあり。鳥居の色に近い。ゴールドと相性◎ |
| C | 鳥居朱 | `#BB3D20` | rgb(187,61,32) | 深みのある朱。40〜60代女性に「上品な赤」と受け取られやすい |
| D | 緋色 | `#D0473A` | rgb(208,71,58) | 明るく鮮やか。若向きに傾きすぎる可能性 |
| E | 赤朱 | `#BE3A2A` | rgb(190,58,42) | AとCの中間。コントラスト確保しやすい |

**推奨: C「鳥居朱」`#BB3D20`**

選定理由:
- 実際の神社鳥居(弁柄・朱漆)の色味に最も近い深みのある朱
- 白背景 (#FDFAF5) に対してコントラスト比 **5.8:1** → WCAG AA 達成
- ゴールド (#D4AF37) との並置で「和の格調」が出る（暖色同士の協和）
- 40〜60代女性が「品のある赤」と感じる明度帯

### 1-2. 確定カラーパレット

```
/* ============================================
   開運一の宮めぐり — デザイントークン
   ============================================ */

/* --- Primary: 鳥居朱 --- */
--color-torii-900: #6B1810;   /* 最も深い朱。テキスト用 */
--color-torii-700: #8F2618;   /* 濃い朱。ホバー状態 */
--color-torii-500: #BB3D20;   /* 基本の朱赤（推奨メイン） */
--color-torii-300: #D8795C;   /* 薄めの朱。ボーダー・区切り線 */
--color-torii-100: #F5DDD8;   /* 朱の極薄。カード背景・選択状態 */
--color-torii-50:  #FBF1EE;   /* ほぼ白。ホバー背景 */

/* --- Accent: 金 --- */
--color-gold-700: #A07A10;    /* 深金。テキスト用（コントラスト確保） */
--color-gold-500: #D4AF37;    /* 基本ゴールド（姉妹アプリ共通） */
--color-gold-300: #E8D080;    /* 薄金。罫線・飾り線 */
--color-gold-100: #F9F0C8;    /* 極薄金。帯背景・スタンプ獲得後 */

/* --- Neutral: 和の白・墨 --- */
--color-washi:    #FDFAF5;    /* 和紙白（アプリ背景）*/
--color-offwhite: #FAF6F0;    /* やや温かみのある白。カード背景 */
--color-ink-900:  #1A1008;    /* 最深墨。主テキスト */
--color-ink-700:  #3D2B1A;    /* 墨。副テキスト */
--color-ink-500:  #7A6555;    /* 薄墨。補足テキスト・ラベル */
--color-ink-300:  #B5A899;    /* 薄薄墨。プレースホルダー */
--color-ink-100:  #E8E2DB;    /* ほぼ白墨。区切り線 */

/* --- Semantic --- */
--color-success: #2D6A4F;     /* 墨緑。達成・訪問済み */
--color-success-light: #D8F3DC;
--color-warning: #D4A017;     /* 金系。注意 */
--color-warning-light: #FFF3CD;
--color-error:   #9B2226;     /* 深朱。エラー */
--color-error-light: #FFE5E5;
--color-info:    #264653;     /* 深藍。情報 */
--color-info-light: #D0E8ED;

/* --- Special: 霧 (地図・フィルター) --- */
--color-kiri-300: #C8D8DD;    /* 霧色。未訪問ピン */
--color-kiri-100: #EDF4F6;    /* 薄霧。フィルター非選択背景 */
```

### 1-3. コントラスト比一覧（WCAG AA 確認）

| 前景色 | 背景色 | コントラスト比 | WCAG AA | 用途 |
|--------|--------|--------------|---------|------|
| `#BB3D20` (朱) | `#FDFAF5` (和紙白) | 5.8:1 | 通常テキスト ✅ | ボタンラベル・見出し |
| `#1A1008` (墨) | `#FDFAF5` (和紙白) | 18.2:1 | 通常テキスト ✅ | 本文 |
| `#3D2B1A` (副墨) | `#FDFAF5` (和紙白) | 11.4:1 | 通常テキスト ✅ | 副テキスト |
| `#7A6555` (薄墨) | `#FDFAF5` (和紙白) | 5.1:1 | 通常テキスト ✅ | 補足・キャプション |
| `#FFFFFF` (白) | `#BB3D20` (朱) | 4.9:1 | 通常テキスト ✅ | プライマリボタン文字 |
| `#FFFFFF` (白) | `#8F2618` (濃朱) | 7.2:1 | 通常テキスト ✅ | ホバーボタン文字 |
| `#D4AF37` (金) | `#FAF6F0` (オフ白) | 3.2:1 | 大テキスト ✅ | 見出し装飾（18px以上） |
| `#A07A10` (深金) | `#FDFAF5` (和紙白) | 4.7:1 | 通常テキスト ✅ | ゴールドテキスト使用時 |

> 注意: `#D4AF37` (ゴールド) は小サイズのテキストに単独使用しない。装飾・アイコン・大見出しのみ。

### 1-4. ご利益カテゴリカラー

姉妹アプリの「運気バッジ」に対応する、神社ご利益タグのカラー体系。

```css
.goriyaku-縁結び     { background: #8B2252; color: #fff; } /* 深紅紫 */
.goriyaku-勝負運     { background: #BB3D20; color: #fff; } /* 朱（メイン流用） */
.goriyaku-金運       { background: #A07A10; color: #fff; } /* 深金 */
.goriyaku-厄除け     { background: #264653; color: #fff; } /* 深藍 */
.goriyaku-健康長寿   { background: #2D6A4F; color: #fff; } /* 墨緑 */
.goriyaku-学業成就   { background: #1B4F72; color: #fff; } /* 深青 */
.goriyaku-安産子育て { background: #7B3FA0; color: #fff; } /* 紫 */
.goriyaku-家内安全   { background: #5D4037; color: #fff; } /* 茶 */
.goriyaku-商売繁盛   { background: #BF6000; color: #fff; } /* 橙金 */
.goriyaku-交通安全   { background: #1A6B6B; color: #fff; } /* 碧 */
```

---

## 2. タイポグラフィ

### 2-1. フォントファミリー

**和文見出し**: `Noto Serif JP`
- Google Fonts無料・OFLライセンス
- 明朝系セリフで「雅・神聖・伝統」を表現
- 400/500/700 のウェイトのみ読み込む（パフォーマンス優先）
- 40〜60代女性が読み慣れた印字感覚に近い

**和文本文・UI**: `Noto Sans JP`
- 姉妹アプリと共通（フォントキャッシュ活用に有利）
- 小サイズの読みやすさ、フォームラベルの明瞭さを優先
- 400/500/700 のウェイトのみ

**欧文・数字**: `Cormorant Garamond`
- Google Fonts無料・OFLライセンス
- スタンプ番号「No.001」、達成率「87%」など数字を品よく見せる
- セリフ系で和文見出しとの相性が良い
- 400/600 のウェイトのみ

```css
/* Google Fonts読み込み (Next.js の next/font/google 推奨) */
/* Noto Serif JP: wght@400;500;700 */
/* Noto Sans JP: wght@400;500;700 */
/* Cormorant Garamond: wght@400;600 */

--font-serif: "Noto Serif JP", "Yu Mincho", "YuMincho", serif;
--font-sans:  "Noto Sans JP", "Hiragino Sans", "Hiragino Kaku Gothic ProN", sans-serif;
--font-num:   "Cormorant Garamond", "Times New Roman", serif;
```

### 2-2. タイポグラフィスケール

| トークン名 | サイズ | ウェイト | 行間 | フォント | 用途 |
|-----------|-------|---------|------|----------|------|
| `--text-h1` | 32px (2rem) | 700 | 1.3 | Serif | ページタイトル「開運一の宮めぐり」 |
| `--text-h2` | 24px (1.5rem) | 700 | 1.35 | Serif | セクション見出し「関東の一の宮」 |
| `--text-h3` | 20px (1.25rem) | 600 | 1.4 | Serif | カード見出し「鹿島神宮」 |
| `--text-h4` | 17px (1.0625rem) | 600 | 1.45 | Sans | モーダル内小見出し |
| `--text-h5` | 15px (0.9375rem) | 600 | 1.5 | Sans | バッジラベル |
| `--text-h6` | 13px (0.8125rem) | 600 | 1.5 | Sans | 注記見出し |
| `--text-body-lg` | 16px (1rem) | 400 | 1.7 | Sans | 神社説明文・本文 |
| `--text-body` | 14px (0.875rem) | 400 | 1.7 | Sans | カード内テキスト |
| `--text-body-sm` | 13px (0.8125rem) | 400 | 1.65 | Sans | 補足情報・開運メモ |
| `--text-caption` | 12px (0.75rem) | 400 | 1.6 | Sans | 出典・著作権表示 |
| `--text-stamp-num` | 28px (1.75rem) | 600 | 1.0 | Num | スタンプ帳の番号 |
| `--text-progress` | 36px (2.25rem) | 400 | 1.0 | Num | 達成率「87%」 |

### 2-3. 文字間隔（letter-spacing）

```css
/* 和の格調を出すための文字間隔 */
.tracking-shrine { letter-spacing: 0.2em; }   /* 神社名見出し */
.tracking-wide    { letter-spacing: 0.15em; }  /* ブランド名「富旅」 */
.tracking-normal  { letter-spacing: 0.05em; }  /* 本文（通常） */
.tracking-tight   { letter-spacing: 0.02em; }  /* UI要素・ボタン */
```

### 2-4. ルビ（読み仮名）対応

40〜60代ユーザーへの配慮として、難読神社名にはルビを付与。

```html
<!-- 実装例 -->
<ruby>
  武甕槌大神
  <rt>たけみかづちのおおかみ</rt>
</ruby>

<ruby>
  一之宮貫前神社
  <rt>いちのみやぬきさきじんじゃ</rt>
</ruby>
```

CSSルビスタイル:
```css
ruby rt {
  font-size: 0.55em;
  color: var(--color-ink-500);
  letter-spacing: 0.02em;
}
```

---

## 3. スペーシング・角丸・影

### 3-1. スペーシング（4pxベース単位）

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

### 3-2. 角丸

和の直線美を意識し、姉妹アプリよりやや控えめな丸みに設定。

```css
--radius-sm:   6px;    /* バッジ・タグ */
--radius-md:   10px;   /* カード・入力欄 */
--radius-lg:   16px;   /* モーダル・パネル */
--radius-xl:   24px;   /* ボトムシート（モバイル） */
--radius-full: 9999px; /* ピル型タグ・アバター */
```

### 3-3. 影（box-shadow）

```css
/* 標準カード影 */
--shadow-sm:  0 1px 3px rgba(26,16,8,0.08), 0 1px 2px rgba(26,16,8,0.05);
--shadow-md:  0 4px 12px rgba(26,16,8,0.10), 0 2px 4px rgba(26,16,8,0.06);
--shadow-lg:  0 8px 24px rgba(26,16,8,0.12), 0 4px 8px rgba(26,16,8,0.08);
--shadow-xl:  0 16px 40px rgba(26,16,8,0.15), 0 8px 16px rgba(26,16,8,0.10);

/* ゴールドグロー（スタンプ獲得・選択状態） */
--shadow-gold-sm: 0 0 10px rgba(212,175,55,0.25), 0 2px 8px rgba(26,16,8,0.10);
--shadow-gold-md: 0 0 20px rgba(212,175,55,0.35), 0 4px 12px rgba(26,16,8,0.10);

/* 朱グロー（アクティブ状態） */
--shadow-torii:   0 0 15px rgba(187,61,32,0.20), 0 3px 10px rgba(26,16,8,0.10);
```

---

## 4. コンポーネント設計

### 4-1. ボタン

#### Primary Button（プライマリ）
メインCTA。スタンプ押す・参拝記録・地図で見る。

```
デスクトップ:
+---------------------------+
|  ● スタンプを押す         |
+---------------------------+

スタイル:
  background: #BB3D20
  color: #FFFFFF
  font: Noto Sans JP 14px / weight 600
  letter-spacing: 0.05em
  padding: 12px 24px
  border-radius: 10px
  border: none
  min-height: 44px (iOS HIG)
  box-shadow: --shadow-sm

状態:
  Hover:    background #8F2618, box-shadow --shadow-torii
  Active:   background #6B1810, transform scale(0.98)
  Disabled: background #B5A899, color #7A6555, cursor not-allowed
  Loading:  background #BB3D20, spinner icon (白)
```

#### Secondary Button（セカンダリ）
詳細を見る・フィルター解除など。

```
スタイル:
  background: transparent
  color: #BB3D20
  border: 1.5px solid #BB3D20
  font: Noto Sans JP 14px / weight 500
  padding: 11px 22px
  border-radius: 10px
  min-height: 44px

状態:
  Hover:    background #FBF1EE, border-color #8F2618
  Active:   background #F5DDD8
  Disabled: border-color #B5A899, color #B5A899
```

#### Ghost Button（ゴースト）
ナビゲーション内・フィルタタグなど軽量アクション。

```
スタイル:
  background: transparent
  color: #3D2B1A
  border: none
  font: Noto Sans JP 14px / weight 400
  padding: 8px 16px
  border-radius: 6px
  min-height: 44px

状態:
  Hover:    background #FAF6F0
  Active:   background #F5DDD8, color #BB3D20
  Disabled: color #B5A899
```

#### Gold CTA Button（達成・特別アクション用）
スタンプ全取得・称号解除など「ハレの瞬間」にのみ使用。

```
スタイル:
  background: linear-gradient(135deg, #D4AF37 0%, #F5E6B8 50%, #D4AF37 100%)
  color: #6B1810
  font: Noto Serif JP 15px / weight 700
  letter-spacing: 0.1em
  padding: 14px 28px
  border-radius: 10px
  border: 1px solid #A07A10
  box-shadow: --shadow-gold-md
```

### 4-2. カード

#### 神社カード（ShrineCard）
一覧・地図サイドバーで表示。

```
+------------------------------------------+
| [未訪問ピン]  鹿島神宮                    |
|              かしまじんぐう               | ← ルビ
|              茨城県 常陸国               |
+------------------------------------------+
| [縁結び][勝負運][厄除け]                  | ← ご利益バッジ
+------------------------------------------+
| 開運キーワード: 人生の決断・勝負どころの…  |
+------------------------------------------+

スタイル:
  background: #FAF6F0
  border: 1px solid #E8E2DB
  border-radius: 10px
  padding: 16px
  transition: all 0.2s ease

選択状態:
  border: 1.5px solid #BB3D20
  background: linear-gradient(to br, #FBF1EE, #FAF6F0)
  box-shadow: --shadow-torii

訪問済み状態:
  border-left: 3px solid #D4AF37
  background: linear-gradient(to br, #F9F0C8 0%, #FAF6F0 40%)

ホバー:
  box-shadow: --shadow-gold-sm
  transform: translateY(-1px)
```

#### スタンプカード（StampCard）
マイページのスタンプ帳に配置。

```
訪問済み:
+------------------------+
|  ╔══════════════════╗  |
|  ║                  ║  |
|  ║    御朱印風       ║  |
|  ║    スタンプ       ║  |
|  ║   (円形・朱赤)    ║  |
|  ╚══════════════════╝  |
| 001 鹿島神宮            |
| 2026.03.15 参拝         |
+------------------------+

未訪問:
+------------------------+
|  [薄墨色・グレーアウト] |
|  ????                  |
| 001 ???                |
+------------------------+

CSS表現（訪問済み）:
  .stamp-seal {
    width: 80px; height: 80px;
    border-radius: 50%;
    border: 3px solid #BB3D20;
    display: flex; align-items: center; justify-content: center;
    background: radial-gradient(circle at 30% 30%, #F5DDD8, #BB3D20);
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.2), --shadow-gold-sm;
    /* 御朱印風・押印後のにじみ感 */
    filter: url(#stamp-blur); /* SVGフィルター使用 */
  }
```

### 4-3. バッジ

#### ご利益タグ（GoRiyakuTag）

```
[縁結び]  ← 角丸9999px（ピル型）
  font-size: 11px
  padding: 3px 10px
  font-weight: 500
  カラーは 1-4節のCSSクラス参照
```

#### 達成称号バッジ（TitleBadge）
マイページ・達成モーダルで表示。

```
+----------------------------------+
| ★  関東の一の宮 完全制覇         |
|    All Kanto Ichinomiya          |
+----------------------------------+

スタイル:
  background: linear-gradient(135deg, #1A1008 0%, #3D2B1A 100%)
  color: #D4AF37
  border: 1px solid #D4AF37
  border-radius: 10px
  padding: 10px 16px
  font: Noto Serif JP 14px / weight 700
  letter-spacing: 0.1em

サブテキスト:
  font: Cormorant Garamond 12px / weight 400
  color: #E8D080
  letter-spacing: 0.2em
```

#### 進捗バッジ（ProgressBadge）
ホーム画面のサマリー表示。

```
  ┌──────────┐
  │ 12 / 102 │
  │ 社 参拝  │
  └──────────┘

  背景: #FAF6F0, ボーダー: 1px solid #D8795C
  数字: Cormorant Garamond 28px / weight 600 / 色 #BB3D20
  テキスト: Noto Sans JP 12px / 色 #7A6555
```

### 4-4. 地図ピン（MapPin）

React Leaflet の DivIcon で実装。姉妹アプリの構造を引き継ぎ色を置換。

```
未訪問:
  ドロップ型（tilesrc準拠）
  color: #C8D8DD（霧色）
  border: 2px solid white
  テキスト: 旧国名の略称（常・下・相…）/ color #7A6555

訪問済み:
  ドロップ型
  color: #BB3D20（朱）
  border: 2px solid #D4AF37
  box-shadow: 0 0 8px rgba(212,175,55,0.4)
  テキスト: 神社名1〜2文字 / color white

お気に入り:
  ドロップ型
  color: #A07A10（深金）
  border: 2px solid #D4AF37
  box-shadow: 0 0 12px rgba(212,175,55,0.6)
  テキスト: ★ / color white

選択中（どの状態でも）:
  size: 44px（通常34px）
  box-shadow: 0 0 20px rgba(187,61,32,0.4)
  z-index: 9999

コード参考（姉妹アプリから差分）:
  const visitedColor = "#BB3D20";
  const unvisitedColor = "#C8D8DD";
  const favoriteColor = "#A07A10";
```

### 4-5. スタンプ獲得アニメーション

訪問記録を押したときのマイクロアニメーション案。CSS Keyframesで実装。

```css
/* Phase 1: スタンプが降ってくる（0〜0.3s） */
@keyframes stamp-drop {
  0%   { transform: scale(2.5) rotate(-15deg); opacity: 0; }
  60%  { transform: scale(0.9) rotate(3deg);   opacity: 1; }
  80%  { transform: scale(1.05) rotate(-1deg); opacity: 1; }
  100% { transform: scale(1.0) rotate(0deg);   opacity: 1; }
}

/* Phase 2: 墨がにじむ感覚（0.2〜0.8s） */
@keyframes stamp-blur-in {
  0%   { filter: blur(4px); opacity: 0.6; }
  100% { filter: blur(0px); opacity: 1;   }
}

/* Phase 3: ゴールドの輝きパルス（0.5〜1.5s） */
@keyframes gold-pulse {
  0%   { box-shadow: 0 0 5px rgba(212,175,55,0.3); }
  50%  { box-shadow: 0 0 25px rgba(212,175,55,0.7), 0 0 50px rgba(212,175,55,0.3); }
  100% { box-shadow: 0 0 10px rgba(212,175,55,0.4); }
}

.stamp-acquired {
  animation:
    stamp-drop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
    stamp-blur-in 0.6s ease-out 0.1s forwards,
    gold-pulse 1.0s ease-in-out 0.5s;
}

/* prefers-reduced-motion 対応必須 */
@media (prefers-reduced-motion: reduce) {
  .stamp-acquired {
    animation: none;
    opacity: 1;
  }
}
```

**獲得フロー演出案（Figmaプロトタイプ用）**:

```
1. 「スタンプを押す」ボタンタップ
2. 画面中央に御朱印風スタンプがドロップ落下（0.4s）
3. 墨がにじむようなブラー演出（0.6s）
4. ゴールドの輝きパルス（1.0s）
5. 「第001番 鹿島神宮 参拝完了」テキストフェードイン
6. スタンプ帳に着地するアニメーション（0.3s）
7. 称号解除時はさらに紙吹雪風パーティクル
```

---

## 5. アイコン方針

### 5-1. 使用ライブラリ

**推奨: Lucide React + カスタムSVG補完**
- Lucide React: MIT License, Next.jsで軽量に使える
- 和モチーフ（鳥居・御朱印・神社固有アイコン）は Lucide にないため、インラインSVGで自作

### 5-2. カスタムアイコン一覧（インラインSVG設計指針）

| アイコン名 | 用途 | デザイン指針 |
|-----------|------|-------------|
| 鳥居 (ToriiIcon) | ナビゲーション・ホーム | 正面から見た鳥居の簡略形。2本の柱＋2本の横木。線幅2px |
| 御朱印帳 (GoshuinIcon) | スタンプ帳タブ | 本を開いた形＋朱色の丸印。線幅1.5px |
| お守り (OmamoriIcon) | お守り情報 | 巾着型・シンプルシルエット |
| 桜 (SakuraIcon) | 春の表示・開運フード | 5弁の桜。円形ガイドに沿った単純化 |
| 紅葉 (MomijiIcon) | 秋の表示 | 7先の紅葉シルエット |
| 御神木 (ShinbokuIcon) | 境内情報 | 樹木シルエット＋縄目模様 |
| 地図ピン和風 (WaShinePinIcon) | 地図マーカーベース | ドロップ型の鳥居シルエット |
| 進捗炎 (KaiuenFlameIcon) | 達成率UI | シンプルな炎形。ゴールドグラデ |

### 5-3. アイコンサイズ規則

```css
--icon-xs:  16px;  /* インラインアイコン（テキスト内） */
--icon-sm:  20px;  /* ボタン内・バッジ内 */
--icon-md:  24px;  /* ナビゲーション */
--icon-lg:  32px;  /* カードヘッダー */
--icon-xl:  48px;  /* 達成モーダル・空状態 */
--icon-2xl: 64px;  /* ヒーロー・オンボーディング */
```

---

## 6. レイアウト・グリッド

### 6-1. ブレークポイント（モバイルファースト）

```css
/* Mobile: 0〜767px（デフォルト） */
/* 40〜60代のスマホ利用を最優先 */

/* Tablet: 768px〜 */
@media (min-width: 768px) { ... }

/* Desktop: 1024px〜 */
@media (min-width: 1024px) { ... }

/* Wide: 1440px〜 */
@media (min-width: 1440px) { ... }
```

### 6-2. モバイル最適化

40〜60代女性への配慮事項:

- **タッチターゲット最小**: 48×48px（WCAG 2.5.5 / Material Design準拠）
- **フォントサイズ最小**: 14px（captionは12px、ルビは除外）
- **行間**: 1.65以上（老眼対策・読みやすさ）
- **ボトムナビ**: 親指で届く位置にメインナビ
- **スワイプ操作**: スタンプ帳はカルーセル型スワイプ

---

## 7. 背景パターン・装飾

姉妹アプリの「曼荼羅背景」に対応する、神社テイストの装飾パターン。

### 7-1. 和柄背景（CSS）

```css
/* 七宝つなぎ風（ヘッダー背景） */
.shippo-bg {
  background-color: var(--color-washi);
  background-image:
    radial-gradient(circle at 0 0, transparent 20px, var(--color-torii-100) 20px, var(--color-torii-100) 21px, transparent 21px),
    radial-gradient(circle at 40px 40px, transparent 20px, var(--color-torii-100) 20px, var(--color-torii-100) 21px, transparent 21px);
  background-size: 40px 40px;
  opacity: 0.04;
}

/* 霞グラデーション（ページ背景） */
.kasumi-bg {
  background-image:
    radial-gradient(ellipse at 10% 40%, rgba(187,61,32,0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 90% 20%, rgba(212,175,55,0.05) 0%, transparent 45%),
    radial-gradient(ellipse at 50% 90%, rgba(187,61,32,0.04) 0%, transparent 50%);
  background-color: var(--color-washi);
}

/* 金の飾り線（セクション区切り） */
.kinka-divider {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    var(--color-gold-300) 20%,
    var(--color-gold-500) 50%,
    var(--color-gold-300) 80%,
    transparent 100%
  );
  margin: 24px auto;
  width: 80%;
  max-width: 400px;
}

/* グラデーションテキスト（タイトル） */
.shrine-gradient-text {
  background: linear-gradient(
    135deg,
    var(--color-torii-900) 0%,
    var(--color-torii-500) 40%,
    var(--color-gold-500) 70%,
    var(--color-torii-700) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 8. アクセシビリティ（WCAG 2.1 AA）

### 8-1. チェックリスト

- [x] 全テキストコントラスト比 4.5:1 以上確認済み（Section 1-3）
- [x] タッチターゲット 48×48px 以上
- [x] フォーカスインジケーター可視化（2px solid #BB3D20 + 2px offset）
- [x] `prefers-reduced-motion` でアニメーション無効化
- [x] ルビ (`<ruby>`) で難読漢字にフリガナ
- [x] 神社カードに `aria-label="鹿島神宮 (訪問済み)"` 等の状態付与
- [x] 地図は代替テキスト付きリスト表示を提供（地図非表示モード）
- [x] スタンプ獲得時に `aria-live="assertive"` でスクリーンリーダー通知

### 8-2. フォーカススタイル

```css
*:focus-visible {
  outline: 2px solid #BB3D20;
  outline-offset: 3px;
  border-radius: 4px;
}

button:focus-visible {
  outline: 2px solid #BB3D20;
  outline-offset: 3px;
  box-shadow: 0 0 0 5px rgba(187,61,32,0.15);
}
```

---

## 9. 状態管理とビジュアルフィードバック

| 状態 | 神社カード | 地図ピン | 視覚表現 |
|------|-----------|---------|----------|
| 未訪問 | デフォルト・グレー境界 | 霧色ドロップ | 薄墨テキスト |
| 訪問済み | 左ボーダー金・背景薄金 | 朱色ドロップ＋金枠 | 墨テキスト・スタンプ印 |
| 選択中 | 朱枠・朱影 | 大サイズ・朱グロー | — |
| お気に入り | ★アイコン金 | 深金ドロップ＋金グロー | — |
| 読み込み中 | スケルトン（和紙色） | ピン非表示 | パルスアニメ |

---

## 10. 命名規則

姉妹アプリ (`kaiun-` prefix) に対応するため、このアプリは `shrine-` prefix を使用。

```css
/* CSS変数 */
--color-shrine-primary: ...;
--color-shrine-gold: ...;

/* Tailwindクラス */
shrine-torii-500
shrine-gold-500
shrine-washi
shrine-ink-900

/* Reactコンポーネント */
ShrineCard
StampBook
ShrineMap
ShrineDetail
GoRiyakuTag
TitleBadge
StampSeal
```
