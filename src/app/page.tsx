"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import ShrineCard from "@/components/ShrineCard";
import ShrineDetail from "@/components/ShrineDetail";
import ProgressGauge from "@/components/ProgressGauge";
import { shrines } from "@/data/shrines";
import { useStamps } from "@/hooks/useStamps";
import type { Shrine } from "@/types";

export default function Home() {
  const { totalCount, isVisited } = useStamps();
  const [selected, setSelected] = useState<Shrine | null>(null);

  // 人気の一の宮（ID順上位5社から3社pick）
  const popular = useMemo(
    () => [
      shrines.find((s) => s.name.includes("出雲大社")),
      shrines.find((s) => s.name.includes("鶴岡八幡宮")),
      shrines.find((s) => s.name.includes("嚴島") || s.name.includes("厳島")),
    ].filter((x): x is Shrine => Boolean(x)),
    []
  );

  // おすすめ（今日のラッキー一の宮）: 日付ベースで1社固定pick
  const today = useMemo(() => {
    const day = new Date().getDate() + new Date().getMonth() * 31;
    return shrines[day % shrines.length];
  }, []);

  // 最近参拝
  const recent = useMemo(() => {
    return shrines.filter((s) => isVisited(s.id)).slice(0, 3);
  }, [isVisited]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-[900px] mx-auto w-full px-4 py-5 space-y-6 pb-20">
        {/* ヒーロー */}
        <section className="text-center pt-4 pb-2">
          <p className="text-xs text-gold-700 font-bold tracking-widest">
            KAIUN ICHINOMIYA MEGURI
          </p>
          <h2 className="font-serif font-black text-3xl md:text-4xl text-torii-700 mt-2 leading-tight">
            朱と金の結界をくぐる、
            <br className="md:hidden" />
            私だけの神社旅。
          </h2>
          <p className="text-xs md:text-sm text-ink-500 mt-3 leading-relaxed">
            全国一の宮 <span className="font-bold text-torii-500">102社</span>{" "}
            を集めた、開運めぐりアプリ。
            <br />
            訪れた一の宮にはスタンプ、あなただけの御朱印帳を。
          </p>
        </section>

        {/* 進捗ゲージ */}
        <ProgressGauge count={totalCount} />

        {/* メインCTA */}
        <Link
          href="/map"
          className="btn-torii w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-serif font-bold text-lg"
        >
          🗾 地図で一の宮を探す
        </Link>

        <div className="shimenawa mx-auto max-w-xs" />

        {/* 人気の一の宮 */}
        <section>
          <h3 className="font-serif font-bold text-torii-700 text-lg mb-3">
            ⛩ 人気の一の宮
          </h3>
          <div className="grid gap-2">
            {popular.map((s) => (
              <ShrineCard
                key={s.id}
                shrine={s}
                isVisited={isVisited(s.id)}
                onClick={() => setSelected(s)}
              />
            ))}
          </div>
        </section>

        {/* 今日のラッキー */}
        <section>
          <h3 className="font-serif font-bold text-torii-700 text-lg mb-3">
            ✨ 今日おすすめの一の宮
          </h3>
          <div className="torii-card p-4 bg-gradient-to-br from-gold-100/60 to-torii-50">
            <p className="text-[10px] text-gold-700 font-bold tracking-wider">
              TODAY&apos;S PICK
            </p>
            <button
              type="button"
              onClick={() => setSelected(today)}
              className="mt-1 text-left w-full"
            >
              <p className="font-serif font-black text-xl text-torii-700">
                {today.name}
              </p>
              <p className="text-xs text-ink-500 mt-0.5">
                {today.読み} ・ {today.都道府県}
              </p>
              <p className="text-sm text-ink-900 mt-2 leading-relaxed">
                {today.開運キーワード}
              </p>
              <p className="text-xs text-torii-500 font-bold mt-2">
                詳しく見る →
              </p>
            </button>
          </div>
        </section>

        {/* 最近の参拝（あれば） */}
        {recent.length > 0 && (
          <section>
            <h3 className="font-serif font-bold text-torii-700 text-lg mb-3">
              📿 最近の参拝
            </h3>
            <div className="grid gap-2">
              {recent.map((s) => (
                <ShrineCard
                  key={s.id}
                  shrine={s}
                  isVisited
                  onClick={() => setSelected(s)}
                  compact
                />
              ))}
            </div>
            <Link
              href="/mypage"
              className="block text-center mt-3 text-xs text-torii-500 hover:text-torii-700 underline"
            >
              参拝の記録をすべて見る →
            </Link>
          </section>
        )}

        {/* フッター */}
        <footer className="text-center pt-10 pb-4">
          <p className="text-[10px] text-ink-500 leading-relaxed">
            データ出典：各一の宮公式サイト・全国一の宮会加盟社リスト
            <br />
            ©
            {new Date().getFullYear()} 開運一の宮めぐり
          </p>
        </footer>
      </main>

      {selected && (
        <ShrineDetail shrine={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
