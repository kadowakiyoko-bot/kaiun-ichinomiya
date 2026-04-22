"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import ShrineCard from "@/components/ShrineCard";
import ShrineDetail from "@/components/ShrineDetail";
import { shrines } from "@/data/shrines";
import { useStamps } from "@/hooks/useStamps";
import { DO_ORDER, PROVINCE_TO_DO } from "@/data/constants";
import type { Shrine } from "@/types";

export default function ShrinesPage() {
  const { isVisited } = useStamps();
  const [selected, setSelected] = useState<Shrine | null>(null);
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => {
    const byDo: Record<string, Shrine[]> = {};
    for (const s of shrines) {
      const key = s.name.includes(query) || query === "" || s.読み.includes(query) || s.都道府県.includes(query) || s.旧国.includes(query) ? true : false;
      if (!key) continue;
      const d = PROVINCE_TO_DO[s.旧国] || "その他";
      if (!byDo[d]) byDo[d] = [];
      byDo[d].push(s);
    }
    return byDo;
  }, [query]);

  const doKeys = [...DO_ORDER, "その他"].filter((d) => grouped[d]?.length > 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-[900px] mx-auto w-full px-4 py-5 space-y-5 pb-16">
        <div>
          <p className="text-xs text-gold-700 font-bold tracking-widest">
            SHRINE LIST
          </p>
          <h2 className="font-serif font-black text-2xl text-torii-700 mt-1">
            五畿七道で分けて探す
          </h2>
          <p className="text-xs text-ink-500 mt-1">
            古代日本の地方区分で分類しました
          </p>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="神社名・都道府県・旧国で検索"
          className="w-full px-4 py-3 rounded-2xl border border-torii-100 focus:border-torii-500 focus:outline-none text-sm bg-white"
        />

        {doKeys.map((doName) => (
          <section key={doName}>
            <div className="flex items-baseline gap-2 mb-2">
              <h3 className="font-serif font-bold text-torii-700 text-lg">
                {doName}
              </h3>
              <span className="text-[11px] text-ink-500">
                {grouped[doName].length}社
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              {grouped[doName].map((s) => (
                <ShrineCard
                  key={s.id}
                  shrine={s}
                  isVisited={isVisited(s.id)}
                  onClick={() => setSelected(s)}
                  compact
                />
              ))}
            </div>
          </section>
        ))}

        {doKeys.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-ink-500">
              「{query}」に合う一の宮は見つかりませんでした
            </p>
          </div>
        )}
      </main>

      {selected && (
        <ShrineDetail shrine={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
