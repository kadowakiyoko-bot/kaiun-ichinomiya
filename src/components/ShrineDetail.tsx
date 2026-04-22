"use client";

import { useState } from "react";
import type { Shrine } from "@/types";
import { goriyakuColor } from "@/data/constants";
import StampButton from "./StampButton";

interface ShrineDetailProps {
  shrine: Shrine;
  onClose: () => void;
}

type TabKey = "basic" | "food" | "omamori" | "secret" | "access";

const TABS: Array<{ key: TabKey; label: string; icon: string }> = [
  { key: "basic", label: "基本", icon: "⛩" },
  { key: "food", label: "開運フード", icon: "🍡" },
  { key: "omamori", label: "お守り", icon: "🧧" },
  { key: "secret", label: "秘密の話", icon: "✨" },
  { key: "access", label: "参拝情報", icon: "🗺" },
];

export default function ShrineDetail({ shrine, onClose }: ShrineDetailProps) {
  const [tab, setTab] = useState<TabKey>("basic");
  const [openSecret, setOpenSecret] = useState<number | null>(0);

  const foodStore = shrine.開運フード.店 || shrine.開運フード["店または場所"] || "";

  return (
    <div
      className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={onClose}
    >
      <div
        className="bg-washi rounded-t-3xl md:rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="relative p-5 md:p-6 bg-gradient-to-br from-torii-50 to-gold-100 border-b border-torii-100">
          <button
            type="button"
            onClick={onClose}
            aria-label="閉じる"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-ink-500 shadow"
          >
            ✕
          </button>

          <p className="text-[11px] text-gold-700 font-bold tracking-wider">
            {shrine.旧国} 一宮 ・ {shrine.都道府県}
          </p>
          <h2 className="font-serif font-black text-2xl md:text-3xl text-torii-700 mt-1 leading-tight">
            {shrine.name}
          </h2>
          <p className="text-xs text-ink-500 mt-1">{shrine.読み}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {shrine.ご利益.map((g) => (
              <span
                key={g}
                className="goriyaku-badge"
                style={{ background: goriyakuColor(g) }}
              >
                {g}
              </span>
            ))}
          </div>

          <div className="mt-3 p-3 rounded-xl bg-white/70 border border-gold-300">
            <p className="text-[10px] text-gold-700 font-bold">開運キーワード</p>
            <p className="font-serif font-bold text-torii-700 text-base mt-0.5">
              {shrine.開運キーワード}
            </p>
          </div>
        </div>

        {/* タブ */}
        <div className="border-b border-torii-100 overflow-x-auto">
          <div className="flex px-3 gap-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`px-3 md:px-4 py-3 text-xs md:text-sm font-medium whitespace-nowrap border-b-2 ${
                  tab === t.key
                    ? "border-torii-500 text-torii-700 font-bold"
                    : "border-transparent text-ink-500 hover:text-ink-700"
                }`}
              >
                <span className="mr-1">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* コンテンツ */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 md:p-6 space-y-5">
          {tab === "basic" && (
            <div className="space-y-4">
              <Section title="主祭神">
                <p className="font-serif font-bold text-lg text-ink-900">
                  {shrine.主祭神}
                </p>
                {shrine.配祀神 && shrine.配祀神.length > 0 && (
                  <div className="mt-2">
                    <p className="text-[11px] text-ink-500 font-bold">配祀神</p>
                    <ul className="text-xs text-ink-700 mt-1 space-y-0.5">
                      {shrine.配祀神.map((k, i) => (
                        <li key={i}>・{k}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Section>

              <Section title="創建">
                <p className="text-xs text-ink-700 leading-relaxed">
                  {shrine.創建}
                </p>
              </Section>

              <Section title="女性に人気のポイント">
                <p className="text-sm text-ink-900 leading-relaxed">
                  {shrine.女性人気ポイント}
                </p>
              </Section>

              {shrine.公式URL && (
                <a
                  href={shrine.公式URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-torii-500 hover:text-torii-700 underline"
                >
                  公式サイトへ →
                </a>
              )}
            </div>
          )}

          {tab === "food" && (
            <div>
              <Section title="開運フード" emoji="🍡">
                <p className="font-serif font-bold text-lg text-torii-700">
                  {shrine.開運フード.name}
                </p>
                {foodStore && (
                  <p className="text-xs text-ink-500 mt-1">📍 {foodStore}</p>
                )}
                <div className="mt-3 p-3 bg-gold-100/50 rounded-xl">
                  <p className="text-[10px] text-gold-700 font-bold">効能</p>
                  <p className="text-sm text-ink-900 mt-1">{shrine.開運フード.効能}</p>
                </div>
                {shrine.開運フード.エピソード && (
                  <div className="mt-3">
                    <p className="text-[10px] text-ink-500 font-bold">エピソード</p>
                    <p className="text-xs text-ink-700 leading-relaxed mt-1">
                      {shrine.開運フード.エピソード}
                    </p>
                  </div>
                )}
              </Section>
            </div>
          )}

          {tab === "omamori" && (
            <div className="space-y-3">
              {shrine.必買お守り.map((o, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-torii-100 bg-white"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-serif font-bold text-base text-torii-700">
                      {o.name}
                    </p>
                    <p className="text-xs font-bold text-gold-700 shrink-0">
                      {o.初穂料}
                    </p>
                  </div>
                  <p className="text-xs text-ink-700 leading-relaxed mt-2">
                    {o.特徴}
                  </p>
                  <p className="text-[11px] text-ink-500 mt-2 italic">
                    👉 {o.どんな人向け}
                  </p>
                </div>
              ))}
            </div>
          )}

          {tab === "secret" && (
            <div className="space-y-2">
              {shrine.秘密の話.map((s, i) => {
                const isOpen = openSecret === i;
                return (
                  <div
                    key={i}
                    className="border border-torii-100 rounded-xl overflow-hidden bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenSecret(isOpen ? null : i)}
                      className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-torii-50"
                    >
                      <span className="text-gold-500 shrink-0">✨</span>
                      <div className="flex-1">
                        <p className="font-serif font-bold text-sm text-torii-700">
                          {s.title}
                        </p>
                      </div>
                      <span
                        className={`text-ink-500 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      >
                        ▼
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1">
                        <p className="text-xs text-ink-700 leading-relaxed">
                          {s.内容}
                        </p>
                        <p className="text-[10px] text-ink-500 mt-2">
                          出典: {s.ソース}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {tab === "access" && (
            <div className="space-y-4">
              <Section title="所要時間">
                <p className="text-sm text-ink-900">{shrine.参拝所要時間}</p>
              </Section>

              <Section title="住所・最寄り駅">
                <p className="text-xs text-ink-700">{shrine.住所}</p>
                <p className="text-xs text-ink-500 mt-1">
                  🚃 {shrine.参拝情報.最寄り駅}
                </p>
                {shrine.参拝情報.駐車場 && (
                  <p className="text-xs text-ink-500 mt-1">
                    🅿 {shrine.参拝情報.駐車場}
                  </p>
                )}
              </Section>

              <Section title="授与所・御朱印">
                <p className="text-xs text-ink-700">
                  受付: {shrine.参拝情報.授与所受付時間}
                </p>
                <p className="text-xs text-ink-700 mt-1">
                  御朱印: {shrine.参拝情報.御朱印初穂料}
                </p>
              </Section>

              <Section title="ベストシーズン">
                <div className="grid grid-cols-2 gap-2">
                  {(["春", "夏", "秋", "冬"] as const).map((s) => (
                    <div
                      key={s}
                      className="p-2 rounded-lg bg-washi border border-torii-100"
                    >
                      <p className="text-[10px] font-bold text-torii-700">{s}</p>
                      <p className="text-[11px] text-ink-700 mt-0.5">
                        {shrine.ベストシーズン[s] || "—"}
                      </p>
                    </div>
                  ))}
                </div>
              </Section>

              {shrine.セット参拝コース?.length > 0 && (
                <Section title="セット参拝コース">
                  <ul className="text-xs text-ink-700 space-y-1">
                    {shrine.セット参拝コース.map((c, i) => (
                      <li key={i}>・{c}</li>
                    ))}
                  </ul>
                </Section>
              )}

              <Section title="一人旅アクセス">
                <div className="flex gap-2 flex-wrap mb-2">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium diff-${shrine.一人旅アクセス.最終アクセス難易度}`}
                  >
                    難易度: {shrine.一人旅アクセス.最終アクセス難易度}
                  </span>
                  {shrine.一人旅アクセス.電車のみで完結可 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-success-light text-[#2D6A4F]">
                      🚃 電車のみOK
                    </span>
                  )}
                </div>
                <p className="text-xs text-ink-700 leading-relaxed">
                  {shrine.一人旅アクセス.女性一人歩き安全性コメント}
                </p>
              </Section>
            </div>
          )}
        </div>

        {/* フッター：スタンプ */}
        <div className="p-4 md:p-5 border-t border-torii-100 bg-washi">
          <StampButton shrineId={shrine.id} shrineName={shrine.name} />
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  emoji,
  children,
}: {
  title: string;
  emoji?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[11px] font-bold text-gold-700 uppercase tracking-wider mb-1.5">
        {emoji && <span className="mr-1">{emoji}</span>}
        {title}
      </p>
      <div>{children}</div>
    </div>
  );
}
