"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStamps } from "@/hooks/useStamps";
import UmeIcon from "@/components/UmeIcon";

const TABS = [
  { href: "/", label: "ホーム" },
  { href: "/map", label: "地図" },
  { href: "/shrines", label: "一覧" },
  { href: "/mypage", label: "マイ帳" },
];

export default function Header() {
  const pathname = usePathname();
  const { totalCount, isHydrated } = useStamps();

  return (
    <header className="sticky top-0 z-30 bg-washi/95 backdrop-blur-md border-b border-torii-100">
      {/* 上部：朱色細線 */}
      <div
        aria-hidden="true"
        style={{
          height: "2px",
          background: "#CE3A2D",
          opacity: 0.7,
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <UmeIcon size={20} color="#CE3A2D" />
          <div className="min-w-0">
            <h1 className="font-serif font-bold text-lg md:text-xl text-torii-700 leading-none truncate" style={{ letterSpacing: "0.15em" }}>
              富旅一の宮巡り
            </h1>
            <p className="text-[10px] text-ink-500 hidden md:block mt-1" style={{ letterSpacing: "0.18em", textTransform: "uppercase" }}>
              TOMITABI ICHINOMIYA MEGURI
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 md:gap-2">
          {TABS.map((t) => {
            const active =
              pathname === t.href ||
              (t.href !== "/" && pathname?.startsWith(t.href));
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`px-2.5 md:px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium transition-colors ${
                  active
                    ? "bg-torii-500 text-white shadow"
                    : "text-ink-700 hover:bg-torii-50"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
          <div
            className="hidden md:flex items-center gap-1 ml-1 px-3 py-1.5 rounded-full border border-gold-300 bg-gold-100/60 text-gold-700 text-xs font-bold"
            aria-label="参拝済み数"
          >
            <span>⛩</span>
            <span>{isHydrated ? totalCount : 0}</span>
            <span className="text-ink-500 font-normal">/ 102</span>
          </div>
        </nav>
      </div>

      {/* 下部：金細線 */}
      <div
        aria-hidden="true"
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent 0%, #A07A10 30%, #C4941A 50%, #A07A10 70%, transparent 100%)",
          opacity: 0.4,
        }}
      />
    </header>
  );
}
