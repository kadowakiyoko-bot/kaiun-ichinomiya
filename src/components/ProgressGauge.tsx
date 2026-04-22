"use client";

import { getShogo } from "@/data/constants";

interface ProgressGaugeProps {
  count: number;
  total?: number;
  compact?: boolean;
}

export default function ProgressGauge({ count, total = 102, compact }: ProgressGaugeProps) {
  const pct = Math.round((count / total) * 100);
  const shogo = getShogo(count);

  return (
    <div className={`torii-card p-4 ${compact ? "" : "md:p-6"}`}>
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] text-ink-500 font-medium">あなたの称号</p>
          <p className="font-serif font-bold text-torii-700 text-xl leading-none mt-1">
            {shogo.title}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-serif font-black text-torii-500 leading-none text-4xl md:text-5xl">
            {count}
            <span className="text-base font-bold text-ink-500 ml-1">/ {total}</span>
          </p>
          <p className="text-[11px] text-gold-700 font-bold mt-1">{pct}% 達成</p>
        </div>
      </div>

      <div className="mt-3 relative h-3 rounded-full bg-ink-100 overflow-hidden">
        <div
          className="gauge-bar h-full rounded-full"
          style={
            {
              background:
                "linear-gradient(90deg, #BB3D20 0%, #D4AF37 100%)",
              "--gauge-target": `${pct}%`,
            } as React.CSSProperties
          }
        />
      </div>

      {shogo.next && (
        <p className="text-[10px] text-ink-500 mt-2">
          あと <span className="font-bold text-torii-700">{shogo.next - count}社</span> で次の称号へ
        </p>
      )}
    </div>
  );
}
