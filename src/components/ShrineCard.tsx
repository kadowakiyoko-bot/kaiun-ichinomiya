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
      className={`torii-card text-left w-full p-3 ${
        isSelected ? "ring-2 ring-torii-500/70" : ""
      } ${isVisited ? "bg-gold-100/40" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-serif font-bold text-base text-torii-700 leading-snug truncate">
            {shrine.name}
          </h3>
          <p className="text-[11px] text-ink-500 truncate">
            {shrine.読み} ・ {shrine.都道府県} / {shrine.旧国}
          </p>
        </div>
        {isVisited && (
          <span className="shrink-0 text-[10px] font-bold text-gold-700 bg-gold-100 border border-gold-300 px-2 py-0.5 rounded-full">
            参拝済
          </span>
        )}
      </div>

      {!compact && (
        <p className="text-xs text-ink-700 mt-2 leading-relaxed line-clamp-2">
          {shrine.開運キーワード}
        </p>
      )}

      <div className="mt-2 flex items-center gap-1 flex-wrap">
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
            アクセス{difficulty}
          </span>
        )}
      </div>
    </button>
  );
}
