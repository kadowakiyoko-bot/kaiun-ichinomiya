/**
 * 開運一の宮めぐり — Tailwind CSS 設定ファイル
 *
 * 姉妹アプリ「開運温泉巡りマップ」は Tailwind v4 + @theme inline (globals.css) 方式を採用。
 * このアプリも同じ構成を踏襲し、globals.css に @theme inline ブロックを置く形で運用する。
 * 本ファイルは「コピペして globals.css の @theme inline に貼り込む」用のリファレンス。
 *
 * 使い方:
 *   src/app/globals.css の先頭に以下を追記するだけで全トークンが使用可能になる。
 *   Tailwind v4 では tailwind.config.js は基本不要（preset/plugin除く）。
 *
 * Next.js + Tailwind v4 での読み込み:
 *   - next/font/google で Noto Serif JP / Noto Sans JP / Cormorant Garamond を読み込む
 *   - layout.tsx で className を body タグに適用
 *   - globals.css に @import "tailwindcss"; を先頭に置く
 */

// ============================================================
// globals.css に貼り込む @theme inline ブロック
// ============================================================
//
// @import "tailwindcss";
//
// @theme inline {
//
//   /* ---- Primary: 鳥居朱 ---- */
//   --color-shrine-torii-900: #6B1810;
//   --color-shrine-torii-700: #8F2618;
//   --color-shrine-torii-500: #BB3D20;
//   --color-shrine-torii-300: #D8795C;
//   --color-shrine-torii-100: #F5DDD8;
//   --color-shrine-torii-50:  #FBF1EE;
//
//   /* ---- Accent: 金 ---- */
//   --color-shrine-gold-700:  #A07A10;
//   --color-shrine-gold-500:  #D4AF37;
//   --color-shrine-gold-300:  #E8D080;
//   --color-shrine-gold-100:  #F9F0C8;
//
//   /* ---- Neutral: 和紙・墨 ---- */
//   --color-shrine-washi:     #FDFAF5;
//   --color-shrine-offwhite:  #FAF6F0;
//   --color-shrine-ink-900:   #1A1008;
//   --color-shrine-ink-700:   #3D2B1A;
//   --color-shrine-ink-500:   #7A6555;
//   --color-shrine-ink-300:   #B5A899;
//   --color-shrine-ink-100:   #E8E2DB;
//
//   /* ---- Semantic ---- */
//   --color-shrine-success:        #2D6A4F;
//   --color-shrine-success-light:  #D8F3DC;
//   --color-shrine-warning:        #D4A017;
//   --color-shrine-warning-light:  #FFF3CD;
//   --color-shrine-error:          #9B2226;
//   --color-shrine-error-light:    #FFE5E5;
//   --color-shrine-info:           #264653;
//   --color-shrine-info-light:     #D0E8ED;
//
//   /* ---- 霧 (地図・未訪問) ---- */
//   --color-shrine-kiri-300: #C8D8DD;
//   --color-shrine-kiri-100: #EDF4F6;
//
//   /* ---- フォント ---- */
//   /* next/font/google で読み込んだ変数名をここに指定 */
//   /* layout.tsx 例:
//      const notoSerifJP = Noto_Serif_JP({ subsets: ["latin"], weight: ["400","500","700"], variable: "--font-shrine-serif" });
//      const notoSansJP  = Noto_Sans_JP({  subsets: ["latin"], weight: ["400","500","700"], variable: "--font-shrine-sans"  });
//      const cormorant   = Cormorant_Garamond({ subsets: ["latin"], weight: ["400","600"],   variable: "--font-shrine-num"  });
//   */
//   --font-shrine-serif: var(--font-shrine-serif-loaded), "Yu Mincho", "YuMincho", serif;
//   --font-shrine-sans:  var(--font-shrine-sans-loaded),  "Hiragino Sans", sans-serif;
//   --font-shrine-num:   var(--font-shrine-num-loaded),   "Times New Roman", serif;
//
// }
//
// ============================================================
// グローバルCSSユーティリティ（@theme inline の外に書く）
// ============================================================
//
// /* 霞グラデーション背景（ページ全体） */
// .kasumi-bg {
//   background-image:
//     radial-gradient(ellipse at 10% 40%, rgba(187,61,32,0.06) 0%, transparent 50%),
//     radial-gradient(ellipse at 90% 20%, rgba(212,175,55,0.05) 0%, transparent 45%),
//     radial-gradient(ellipse at 50% 90%, rgba(187,61,32,0.04) 0%, transparent 50%);
//   background-color: var(--color-shrine-washi);
// }
//
// /* 金の区切り線 */
// .kinka-divider {
//   height: 1px;
//   background: linear-gradient(
//     to right,
//     transparent 0%,
//     var(--color-shrine-gold-300) 20%,
//     var(--color-shrine-gold-500) 50%,
//     var(--color-shrine-gold-300) 80%,
//     transparent 100%
//   );
//   margin: 24px auto;
//   width: 80%;
//   max-width: 400px;
// }
//
// /* グラデーションタイトルテキスト */
// .shrine-gradient-text {
//   background: linear-gradient(
//     135deg,
//     var(--color-shrine-torii-900) 0%,
//     var(--color-shrine-torii-500) 40%,
//     var(--color-shrine-gold-500)  70%,
//     var(--color-shrine-torii-700) 100%
//   );
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   background-clip: text;
// }
//
// /* カードホバー：金グロー */
// .shrine-card-glow:hover {
//   box-shadow:
//     0 0 15px rgba(212,175,55,0.22),
//     0 4px 15px rgba(26,16,8,0.08);
// }
//
// /* フィルターアクティブ状態 */
// .shrine-filter-active {
//   background: linear-gradient(135deg, var(--color-shrine-torii-500), var(--color-shrine-torii-700));
//   color: white;
//   box-shadow: 0 2px 10px rgba(187,61,32,0.30);
// }
//
// /* Leafletカスタマイズ（姉妹アプリ同様） */
// .leaflet-container {
//   border-radius: 16px;
//   border: 2px solid rgba(212,175,55,0.30);
// }
//
// .leaflet-popup-content-wrapper {
//   border-radius: 12px !important;
//   border: 1px solid rgba(212,175,55,0.30) !important;
//   box-shadow: 0 4px 20px rgba(187,61,32,0.12) !important;
// }
//
// .leaflet-popup-content {
//   margin: 12px 16px !important;
//   font-family: var(--font-shrine-sans) !important;
// }
//
// /* スクロールバー */
// .shrine-scrollbar::-webkit-scrollbar       { width: 6px; }
// .shrine-scrollbar::-webkit-scrollbar-track { background: var(--color-shrine-washi); border-radius: 3px; }
// .shrine-scrollbar::-webkit-scrollbar-thumb {
//   background: linear-gradient(
//     var(--color-shrine-torii-300),
//     var(--color-shrine-gold-300)
//   );
//   border-radius: 3px;
// }
//
// /* ご利益タグカラー */
// .goriyaku-縁結び     { background-color: #8B2252; color: #fff; }
// .goriyaku-勝負運     { background-color: #BB3D20; color: #fff; }
// .goriyaku-金運       { background-color: #A07A10; color: #fff; }
// .goriyaku-厄除け     { background-color: #264653; color: #fff; }
// .goriyaku-健康長寿   { background-color: #2D6A4F; color: #fff; }
// .goriyaku-学業成就   { background-color: #1B4F72; color: #fff; }
// .goriyaku-安産子育て { background-color: #7B3FA0; color: #fff; }
// .goriyaku-家内安全   { background-color: #5D4037; color: #fff; }
// .goriyaku-商売繁盛   { background-color: #BF6000; color: #fff; }
// .goriyaku-交通安全   { background-color: #1A6B6B; color: #fff; }
//
// /* スタンプアニメーション */
// @keyframes stamp-drop {
//   0%   { transform: scale(2.5) rotate(-15deg); opacity: 0; }
//   60%  { transform: scale(0.9)  rotate(3deg);  opacity: 1; }
//   80%  { transform: scale(1.05) rotate(-1deg); opacity: 1; }
//   100% { transform: scale(1.0)  rotate(0deg);  opacity: 1; }
// }
//
// @keyframes stamp-blur-in {
//   0%   { filter: blur(4px); opacity: 0.6; }
//   100% { filter: blur(0px); opacity: 1;   }
// }
//
// @keyframes gold-pulse {
//   0%   { box-shadow: 0 0 5px  rgba(212,175,55,0.3); }
//   50%  { box-shadow: 0 0 25px rgba(212,175,55,0.7), 0 0 50px rgba(212,175,55,0.3); }
//   100% { box-shadow: 0 0 10px rgba(212,175,55,0.4); }
// }
//
// .stamp-acquired {
//   animation:
//     stamp-drop    0.4s cubic-bezier(0.34,1.56,0.64,1) forwards,
//     stamp-blur-in 0.6s ease-out 0.1s forwards,
//     gold-pulse    1.0s ease-in-out 0.5s;
// }
//
// @media (prefers-reduced-motion: reduce) {
//   .stamp-acquired { animation: none; opacity: 1; }
// }
//
// ============================================================
// Tailwindクラス早見表（実装時コピー用）
// ============================================================
//
// 背景:
//   bg-shrine-washi          → #FDFAF5  (和紙白・ページ背景)
//   bg-shrine-offwhite        → #FAF6F0  (カード背景)
//   bg-shrine-torii-50        → #FBF1EE  (ホバー背景)
//   bg-shrine-torii-100       → #F5DDD8  (選択状態背景)
//   bg-shrine-gold-100        → #F9F0C8  (訪問済みカード背景)
//   bg-shrine-kiri-100        → #EDF4F6  (未訪問・フィルター非選択)
//
// テキスト:
//   text-shrine-ink-900       → #1A1008  (主テキスト)
//   text-shrine-ink-700       → #3D2B1A  (副テキスト)
//   text-shrine-ink-500       → #7A6555  (補足・キャプション)
//   text-shrine-ink-300       → #B5A899  (プレースホルダー)
//   text-shrine-torii-500     → #BB3D20  (強調・リンク)
//   text-shrine-gold-700      → #A07A10  (ゴールドテキスト)
//
// ボーダー:
//   border-shrine-ink-100     → #E8E2DB  (デフォルトカード境界)
//   border-shrine-torii-300   → #D8795C  (朱系ボーダー)
//   border-shrine-torii-500   → #BB3D20  (選択状態ボーダー)
//   border-shrine-gold-500    → #D4AF37  (ゴールドボーダー)
//
// フォント:
//   font-shrine-serif         → Noto Serif JP
//   font-shrine-sans          → Noto Sans JP
//   font-shrine-num           → Cormorant Garamond
//
// ============================================================
// package.json の依存関係（参考）
// ============================================================
//
// "dependencies": {
//   "next": "16.x.x",
//   "react": "19.x.x",
//   "react-dom": "19.x.x",
//   "leaflet": "^1.9.4",
//   "@types/leaflet": "^1.9.x",
//   "react-leaflet": "^5.0.0",
//   "lucide-react": "^0.x.x"       ← 追加（アイコン）
// },
// "devDependencies": {
//   "tailwindcss": "^4",
//   "@tailwindcss/postcss": "^4",
//   "typescript": "^5",
//   "@types/react": "^19",
//   "@types/react-dom": "^19"
// }
//
// ============================================================
// next/font 設定例（layout.tsx）
// ============================================================
//
// import { Noto_Serif_JP, Noto_Sans_JP, Cormorant_Garamond } from "next/font/google";
//
// const notoSerifJP = Noto_Serif_JP({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   variable: "--font-shrine-serif-loaded",
//   display: "swap",
// });
//
// const notoSansJP = Noto_Sans_JP({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   variable: "--font-shrine-sans-loaded",
//   display: "swap",
// });
//
// const cormorant = Cormorant_Garamond({
//   subsets: ["latin"],
//   weight: ["400", "600"],
//   variable: "--font-shrine-num-loaded",
//   display: "swap",
// });
//
// export default function RootLayout({ children }) {
//   return (
//     <html lang="ja">
//       <body
//         className={`
//           ${notoSerifJP.variable}
//           ${notoSansJP.variable}
//           ${cormorant.variable}
//           font-shrine-sans
//           kasumi-bg
//           text-shrine-ink-900
//           antialiased
//         `}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }

// このファイルは説明用のリファレンス。
// 実際の設定は src/app/globals.css の @theme inline に記述すること。
export {};
