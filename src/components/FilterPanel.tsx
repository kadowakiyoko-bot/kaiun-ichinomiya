"use client";

import { GORIYAKU_CATEGORIES } from "@/data/constants";

interface FilterPanelProps {
  selectedGoriyaku: string[];
  onGoriyakuChange: (next: string[]) => void;
  selectedDifficulty: string[];
  onDifficultyChange: (next: string[]) => void;
  selectedProvinces: string[];
  onProvincesChange: (next: string[]) => void;
  availableProvinces: string[];
  onlyUnvisited: boolean;
  onOnlyUnvisitedChange: (next: boolean) => void;
}

function toggle<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

export default function FilterPanel({
  selectedGoriyaku,
  onGoriyakuChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedProvinces,
  onProvincesChange,
  availableProvinces,
  onlyUnvisited,
  onOnlyUnvisitedChange,
}: FilterPanelProps) {
  return (
    <div className="torii-card p-4 space-y-4">
      <h3 className="font-serif font-bold text-sm text-torii-700">
        しぼりこみ
      </h3>

      {/* ご利益 */}
      <div>
        <p className="text-xs font-bold text-ink-700 mb-2">ご利益で探す</p>
        <div className="flex flex-wrap gap-1.5">
          {GORIYAKU_CATEGORIES.map((g) => {
            const active = selectedGoriyaku.includes(g);
            return (
              <button
                key={g}
                type="button"
                onClick={() => onGoriyakuChange(toggle(selectedGoriyaku, g))}
                className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                  active
                    ? "bg-torii-500 text-white border-torii-500"
                    : "bg-white text-ink-700 border-torii-100 hover:border-torii-300"
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {/* アクセス難易度 */}
      <div>
        <p className="text-xs font-bold text-ink-700 mb-2">アクセスのしやすさ</p>
        <div className="flex gap-1.5">
          {["易", "中", "難"].map((d) => {
            const active = selectedDifficulty.includes(d);
            return (
              <button
                key={d}
                type="button"
                onClick={() => onDifficultyChange(toggle(selectedDifficulty, d))}
                className={`text-[11px] px-3 py-1 rounded-full border transition-colors ${
                  active
                    ? "bg-gold-500 text-white border-gold-500"
                    : `diff-${d}`
                }`}
              >
                {d === "易" ? "気軽に" : d === "中" ? "ちょい準備" : "覚悟要"}
              </button>
            );
          })}
        </div>
      </div>

      {/* 都道府県 */}
      {availableProvinces.length > 0 && (
        <div>
          <p className="text-xs font-bold text-ink-700 mb-2">都道府県</p>
          <div className="max-h-28 overflow-y-auto custom-scrollbar flex flex-wrap gap-1.5 pr-1">
            {availableProvinces.map((p) => {
              const active = selectedProvinces.includes(p);
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => onProvincesChange(toggle(selectedProvinces, p))}
                  className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
                    active
                      ? "bg-torii-700 text-white border-torii-700"
                      : "bg-white text-ink-500 border-ink-100 hover:border-torii-300"
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 未参拝のみ */}
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={onlyUnvisited}
          onChange={(e) => onOnlyUnvisitedChange(e.target.checked)}
          className="accent-torii-500"
        />
        <span className="text-xs text-ink-700">未参拝の一の宮だけ表示</span>
      </label>
    </div>
  );
}
