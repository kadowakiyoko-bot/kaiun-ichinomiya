"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[kaiun-ichinomiya]", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center torii-card p-8">
        <p className="text-5xl mb-4" aria-hidden>
          ⛩
        </p>
        <h2 className="font-serif font-black text-xl text-torii-700 mb-2">
          一時的に表示できませんでした
        </h2>
        <p className="text-sm text-ink-700 leading-relaxed">
          通信や端末側の問題で表示に失敗しました。<br />
          下のボタンでもう一度お試しください。
        </p>
        <p className="text-[11px] text-ink-500 mt-3 break-all">
          {error.message || "Unknown error"}
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={reset}
            className="btn-torii px-5 py-2.5 rounded-full text-sm font-bold"
          >
            もう一度試す
          </button>
          <a
            href="/"
            className="text-xs text-ink-500 underline hover:text-torii-500"
          >
            トップへ戻る
          </a>
        </div>
        <p className="text-[10px] text-ink-500 mt-4 leading-relaxed">
          それでも直らない場合は、ブラウザの「キャッシュとサイトデータを削除」
          をお試しください。参拝記録もリセットされる場合があります。
        </p>
      </div>
    </div>
  );
}
