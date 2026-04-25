"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import ShrineCard from "@/components/ShrineCard";
import ShrineDetail from "@/components/ShrineDetail";
import ProgressGauge from "@/components/ProgressGauge";
import { shrines, shrineById } from "@/data/shrines";
import { useStamps } from "@/hooks/useStamps";
import { REGION_ORDER, PREFECTURE_TO_REGION } from "@/data/constants";
import type { Shrine } from "@/types";

export default function MyPage() {
  const { stamps, totalCount, isHydrated, isVisited } = useStamps();
  const [selected, setSelected] = useState<Shrine | null>(null);

  const visitedShrines = useMemo(() => {
    return stamps
      .map((stamp) => {
        const s = shrineById(stamp.shrineId);
        return s ? { shrine: s, stamp } : null;
      })
      .filter((x): x is { shrine: Shrine; stamp: (typeof stamps)[number] } => Boolean(x))
      .sort((a, b) => (a.stamp.visitedAt < b.stamp.visitedAt ? 1 : -1));
  }, [stamps]);

  // 地方ごとの達成率
  const regionStats = useMemo(() => {
    const stats: Record<string, { total: number; visited: number }> = {};
    for (const s of shrines) {
      const r = PREFECTURE_TO_REGION[s.都道府県] || "その他";
      if (!stats[r]) stats[r] = { total: 0, visited: 0 };
      stats[r].total++;
      if (isVisited(s.id)) stats[r].visited++;
    }
    return stats;
  }, [isVisited]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-[900px] mx-auto w-full px-4 py-5 space-y-6 pb-16">
        <div>
          <p className="text-xs text-gold-700 font-bold tracking-widest">
            MY CHOUMEI — 参拝帳
          </p>
          <h2 className="font-serif font-black text-2xl text-torii-700 mt-1">
            あなたの開運めぐり
          </h2>
        </div>

        <ProgressGauge count={totalCount} />

        {/* 五畿七道進捗 */}
        <section>
          <h3 className="font-serif font-bold text-torii-700 text-lg mb-3">
            📍 地方別の達成状況
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[...REGION_ORDER, ...(regionStats["その他"] ? ["その他"] : [])].map((r) => {
              const s = regionStats[r];
              if (!s) return null;
              const pct = Math.round((s.visited / s.total) * 100);
              return (
                <div key={r} className="torii-card p-3">
                  <p className="font-serif font-bold text-torii-700 text-sm">
                    {r}
                  </p>
                  <p className="text-xs text-ink-500 mt-0.5">
                    {s.visited} / {s.total} 社
                  </p>
                  <div className="mt-2 h-1.5 rounded-full bg-ink-100 overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${pct}%`,
                        background:
                          pct === 100
                            ? "linear-gradient(90deg, #D4AF37, #A07A10)"
                            : "linear-gradient(90deg, #BB3D20, #D4AF37)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 参拝履歴 */}
        <section>
          <h3 className="font-serif font-bold text-torii-700 text-lg mb-3">
            ⛩ 参拝の記録
          </h3>
          {!isHydrated ? (
            <p className="text-xs text-ink-500 text-center py-8">読み込み中...</p>
          ) : visitedShrines.length === 0 ? (
            <div className="torii-card p-8 text-center">
              <p className="text-4xl mb-3" aria-hidden>
                ⛩
              </p>
              <p className="text-sm text-ink-700 font-bold">
                まだ参拝の記録がありません
              </p>
              <p className="text-xs text-ink-500 mt-1 leading-relaxed">
                地図から一の宮を探して、
                <br />
                「参拝しました！」ボタンで記録を残しましょう。
              </p>
              <Link
                href="/map"
                className="btn-torii mt-4 inline-block px-5 py-2 rounded-full text-sm font-bold"
              >
                地図へ →
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {visitedShrines.map(({ shrine, stamp }) => (
                <div
                  key={shrine.id}
                  className="torii-card p-3 cursor-pointer"
                  onClick={() => setSelected(shrine)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="stamp-mark w-12 h-12 text-[10px] shrink-0"
                      style={{ transform: "rotate(-8deg)" }}
                      aria-hidden
                    >
                      参拝
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-serif font-bold text-torii-700 text-sm truncate">
                        {shrine.name}
                      </p>
                      <p className="text-[11px] text-ink-500 truncate">
                        {shrine.都道府県} / {shrine.旧国}
                      </p>
                      <p className="text-[11px] text-gold-700 font-bold mt-1">
                        {new Date(stamp.visitedAt).toLocaleDateString("ja-JP", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      {stamp.memo && (
                        <p className="text-xs text-ink-700 mt-1.5 line-clamp-2 italic">
                          「{stamp.memo}」
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {selected && (
        <ShrineDetail shrine={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
