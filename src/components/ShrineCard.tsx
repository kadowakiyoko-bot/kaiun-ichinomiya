"use client";

import type { Shrine } from "@/types";
import { goriyakuColor } from "@/data/constants";

interface ShrineCardProps {
  shrine: Shrine;
  onClick?: () => void;
  isSelected?: boolean;
  isVisited?: boolean;
  compact?: boolean;
}

export default function ShrineCard({
  shrine,
  onClick,
  isSelected,
  isVisited,
  compact,
}: ShrineCardProps) {
  const difficulty = shrine.一人旅アクセス?.最終アクセス難易度 || "";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`torii-card text-left w-full p-2.5 ${
        isSelected ? "ring-2 ring-torii-500/70" : ""
      } ${isVisited ? "bg-gold-100/40" : ""}`}
    >
      <div className="flex gap-3">
        {/* サムネ画像 */}
        <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden relative bg-gradient-to-br from-torii-500 to-torii-700 flex items-center justify-center">
          {shrine.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={shrine.imageUrl}
              alt={shrine.name}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(e) => {
                // ロード失敗時はプレースホルダーに
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <span className="text-3xl text-white/90" aria-hidden>
              ⛩
            </span>
          )}
          {isVisited && (
            <span
              className="absolute top-1 right-1 bg-gold-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow"
              aria-label="参拝済"
            >
              ✓
            </span>
          )}
        </div>

        {/* テキスト */}
        <div className="min-w-0 flex-1">
          <h3 className="font-serif font-bold text-base text-torii-700 leading-snug truncate">
            {shrine.name}
          </h3>
          <p className="text-[11px] text-ink-500 truncate">
            {shrine.読み}
          </p>
          <p className="text-[11px] text-ink-700 truncate mt-0.5">
            {shrine.都道府県} ・ {shrine.旧国}
          </p>

          {!compact && (
            <p className="text-xs text-ink-700 mt-1.5 leading-snug line-clamp-2">
              {shrine.開運キーワード}
            </p>
          )}

          <div className="mt-1.5 flex items-center gap-1 flex-wrap">
            {shrine.ご利益.slice(0, 3).map((g) => (
              <span
                key={g}
                className="goriyaku-badge"
                style={{ background: goriyakuColor(g) }}
              >
                {g}
              </span>
            ))}
            {difficulty && (
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium diff-${difficulty}`}
              >
                {difficulty}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
