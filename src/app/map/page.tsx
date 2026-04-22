"use client";

import { useMemo, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import FilterPanel from "@/components/FilterPanel";
import ShrineCard from "@/components/ShrineCard";
import ShrineDetail from "@/components/ShrineDetail";
import { shrines } from "@/data/shrines";
import { useStamps } from "@/hooks/useStamps";
import { prefectureIndex } from "@/data/constants";
import type { Shrine } from "@/types";

const ShrineMap = dynamic(() => import("@/components/ShrineMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-2xl bg-torii-50 flex items-center justify-center">
      <span className="text-ink-500 text-sm animate-pulse">
        地図を読み込み中...
      </span>
    </div>
  ),
});

export default function MapPage() {
  const { isVisited, stamps } = useStamps();
  const visitedIds = useMemo(
    () => new Set(stamps.map((s) => s.shrineId)),
    [stamps]
  );

  const [selectedGoriyaku, setSelectedGoriyaku] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [onlyUnvisited, setOnlyUnvisited] = useState(false);
  const [selected, setSelected] = useState<Shrine | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const availableProvinces = useMemo(
    () =>
      Array.from(new Set(shrines.map((s) => s.都道府県))).sort(
        (a, b) => prefectureIndex(a) - prefectureIndex(b)
      ),
    []
  );

  const filtered = useMemo(() => {
    let result = shrines;
    if (selectedGoriyaku.length > 0) {
      result = result.filter((s) =>
        selectedGoriyaku.some((g) => s.ご利益.some((goriyaku) => goriyaku.includes(g)))
      );
    }
    if (selectedDifficulty.length > 0) {
      result = result.filter((s) =>
        selectedDifficulty.includes(s.一人旅アクセス?.最終アクセス難易度 || "")
      );
    }
    if (selectedProvinces.length > 0) {
      result = result.filter((s) => selectedProvinces.includes(s.都道府県));
    }
    if (onlyUnvisited) {
      result = result.filter((s) => !visitedIds.has(s.id));
    }
    return result;
  }, [selectedGoriyaku, selectedDifficulty, selectedProvinces, onlyUnvisited, visitedIds]);

  const handleSelect = useCallback((shrine: Shrine) => {
    setSelected(shrine);
  }, []);

  const activeCount =
    selectedGoriyaku.length +
    selectedDifficulty.length +
    selectedProvinces.length +
    (onlyUnvisited ? 1 : 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 flex flex-col md:flex-row gap-4 px-4 pb-4 max-w-[1400px] mx-auto w-full">
        <aside className="hidden md:flex flex-col gap-4 w-[320px] shrink-0 max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar pr-1">
          <FilterPanel
            selectedGoriyaku={selectedGoriyaku}
            onGoriyakuChange={setSelectedGoriyaku}
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
            selectedProvinces={selectedProvinces}
            onProvincesChange={setSelectedProvinces}
            availableProvinces={availableProvinces}
            onlyUnvisited={onlyUnvisited}
            onOnlyUnvisitedChange={setOnlyUnvisited}
          />

          <div className="torii-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif font-bold text-sm text-torii-700">
                ⛩ 一の宮一覧
              </h3>
              <span className="text-xs text-ink-500">{filtered.length}社</span>
            </div>
            <div className="space-y-2">
              {filtered.map((s) => (
                <ShrineCard
                  key={s.id}
                  shrine={s}
                  isSelected={selected?.id === s.id}
                  isVisited={isVisited(s.id)}
                  onClick={() => handleSelect(s)}
                  compact
                />
              ))}
              {filtered.length === 0 && (
                <p className="text-xs text-ink-500 text-center py-8">
                  条件に合う一の宮が見つかりませんでした
                </p>
              )}
            </div>
          </div>
        </aside>

        {/* モバイル：フィルター切替 */}
        <div className="md:hidden flex gap-2">
          <button
            type="button"
            onClick={() => setShowMobileFilters((v) => !v)}
            className="flex-1 py-2.5 rounded-2xl bg-white/90 border border-torii-100 text-sm font-medium text-torii-700 flex items-center justify-center gap-2"
          >
            🔍 絞り込み
            {activeCount > 0 && (
              <span className="bg-torii-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>
          <div className="px-4 py-2.5 rounded-2xl bg-gold-100 border border-gold-300 text-xs font-bold text-gold-700 flex items-center">
            {filtered.length}社
          </div>
        </div>

        {showMobileFilters && (
          <div className="md:hidden">
            <FilterPanel
              selectedGoriyaku={selectedGoriyaku}
              onGoriyakuChange={setSelectedGoriyaku}
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
              selectedProvinces={selectedProvinces}
              onProvincesChange={setSelectedProvinces}
              availableProvinces={availableProvinces}
              onlyUnvisited={onlyUnvisited}
              onOnlyUnvisitedChange={setOnlyUnvisited}
            />
          </div>
        )}

        {/* 地図エリア */}
        <div className="flex-1 flex flex-col gap-4 md:sticky md:top-[72px] md:self-start">
          <div className="rounded-2xl overflow-hidden border-2 border-torii-100 shadow-lg">
            <ShrineMap
              shrineList={filtered}
              selectedShrine={selected}
              onSelectShrine={handleSelect}
              visitedIds={visitedIds}
            />
          </div>

          {/* モバイル：一覧 */}
          <div className="md:hidden space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-sm text-torii-700">
                ⛩ 一の宮一覧
              </h3>
              <span className="text-xs text-ink-500">{filtered.length}社</span>
            </div>
            {filtered.slice(0, 20).map((s) => (
              <ShrineCard
                key={s.id}
                shrine={s}
                isSelected={selected?.id === s.id}
                isVisited={isVisited(s.id)}
                onClick={() => handleSelect(s)}
                compact
              />
            ))}
            {filtered.length > 20 && (
              <p className="text-center text-xs text-ink-500 py-2">
                他 {filtered.length - 20} 社は地図から探してね
              </p>
            )}
          </div>
        </div>
      </main>

      {selected && (
        <ShrineDetail shrine={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
