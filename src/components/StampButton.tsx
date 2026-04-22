"use client";

import { useState } from "react";
import { useStamps } from "@/hooks/useStamps";

interface StampButtonProps {
  shrineId: string;
  shrineName: string;
}

export default function StampButton({ shrineId, shrineName }: StampButtonProps) {
  const { isVisited, addStamp, removeStamp, getStamp, updateMemo, isHydrated } = useStamps();
  const [justPressed, setJustPressed] = useState(false);
  const [editMemo, setEditMemo] = useState(false);
  const [memoText, setMemoText] = useState("");

  if (!isHydrated) {
    return (
      <div className="btn-torii text-center py-3 rounded-full font-bold text-sm opacity-60">
        準備中...
      </div>
    );
  }

  const visited = isVisited(shrineId);
  const record = getStamp(shrineId);

  const handlePress = () => {
    if (visited) return;
    addStamp(shrineId);
    setJustPressed(true);
    setTimeout(() => setJustPressed(false), 2200);
  };

  const handleRemove = () => {
    if (!confirm(`${shrineName}の参拝記録を取り消しますか？`)) return;
    removeStamp(shrineId);
    setEditMemo(false);
  };

  const handleSaveMemo = () => {
    updateMemo(shrineId, memoText);
    setEditMemo(false);
  };

  if (!visited) {
    return (
      <button
        type="button"
        onClick={handlePress}
        className="btn-torii w-full py-3.5 rounded-full font-serif font-bold text-base tracking-wide"
      >
        ⛩ 参拝しました！
      </button>
    );
  }

  // 訪問済み表示
  const visitedDate = record?.visitedAt
    ? new Date(record.visitedAt).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 p-4 rounded-xl bg-gold-100/60 border border-gold-300">
        <div
          className={`stamp-mark w-16 h-16 text-2xl shrink-0 ${
            justPressed ? "stamp-acquired" : ""
          }`}
          style={{ transform: justPressed ? undefined : "rotate(-8deg)" }}
          aria-hidden
        >
          参拝
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-gold-700 font-bold">参拝済み</p>
          <p className="font-serif font-bold text-torii-700 text-base leading-tight truncate">
            {shrineName}
          </p>
          {visitedDate && (
            <p className="text-[11px] text-ink-500 mt-0.5">{visitedDate}</p>
          )}
        </div>
      </div>

      {/* 一言メモ */}
      {!editMemo ? (
        <button
          type="button"
          onClick={() => {
            setMemoText(record?.memo || "");
            setEditMemo(true);
          }}
          className="w-full text-left text-xs text-ink-700 px-3 py-2 rounded-lg border border-torii-100 hover:border-torii-300"
        >
          {record?.memo ? (
            <span>
              <span className="text-ink-500 mr-1">メモ:</span>
              {record.memo}
            </span>
          ) : (
            <span className="text-ink-500">＋ 参拝の思い出をメモする</span>
          )}
        </button>
      ) : (
        <div className="space-y-2">
          <textarea
            value={memoText}
            onChange={(e) => setMemoText(e.target.value)}
            placeholder="例：桜が満開でした。お守りは勝守を授かりました。"
            maxLength={200}
            rows={3}
            className="w-full px-3 py-2 text-xs rounded-lg border border-torii-300 focus:border-torii-500 focus:outline-none"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSaveMemo}
              className="btn-torii px-4 py-1.5 rounded-full text-xs font-bold"
            >
              保存
            </button>
            <button
              type="button"
              onClick={() => setEditMemo(false)}
              className="px-4 py-1.5 rounded-full text-xs font-medium border border-ink-100 text-ink-500"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleRemove}
        className="text-[10px] text-ink-500 underline hover:text-torii-500"
      >
        参拝記録を取り消す
      </button>
    </div>
  );
}
