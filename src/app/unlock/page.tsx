"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function UnlockForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/";
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.replace(next);
      } else {
        setError("合言葉が違うようです。もう一度お試しください。");
      }
    } catch {
      setError("通信エラーが発生しました。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100dvh",
        background:
          "linear-gradient(180deg, #1a0f2e 0%, #2d1b4e 50%, #1a0f2e 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        fontFamily:
          '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic UI", sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          textAlign: "center",
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 215, 130, 0.3)",
          borderRadius: 24,
          padding: "40px 28px",
          boxShadow: "0 8px 40px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 8 }}>⛩️ ✨</div>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.05em",
            margin: 0,
            color: "#ffd782",
          }}
        >
          富旅 一之宮巡り
        </h1>
        <p
          style={{
            fontSize: 13,
            opacity: 0.85,
            letterSpacing: "0.1em",
            margin: "6px 0 24px",
          }}
        >
          ICHINOMIYA NAVIGATOR
        </p>

        <div
          style={{
            position: "relative",
            height: 140,
            borderRadius: 14,
            overflow: "hidden",
            marginBottom: 24,
            background:
              "linear-gradient(135deg, #ffd782 0%, #ff9ec7 50%, #b78fff 100%)",
            filter: "blur(2px)",
          }}
          aria-hidden
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.3), transparent 50%)",
            }}
          />
        </div>

        <p style={{ fontSize: 15, lineHeight: 1.8, margin: "0 0 8px" }}>
          このアプリは、<br />
          <strong style={{ color: "#ffd782" }}>富旅 本講座生 限定</strong>の
          特別ツールです
        </p>
        <p style={{ fontSize: 13, opacity: 0.75, margin: "0 0 24px" }}>
          全国の一之宮を巡る、開運ナビゲーター。<br />
          一般公開はしておりません。
        </p>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
          <label
            htmlFor="pw"
            style={{
              fontSize: 12,
              opacity: 0.7,
              letterSpacing: "0.1em",
              textAlign: "left",
            }}
          >
            合言葉
          </label>
          <input
            id="pw"
            type="password"
            inputMode="numeric"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            placeholder="••••"
            style={{
              padding: "14px 16px",
              borderRadius: 10,
              border: "1px solid rgba(255, 215, 130, 0.4)",
              background: "rgba(255, 255, 255, 0.08)",
              color: "#fff",
              fontSize: 18,
              letterSpacing: "0.3em",
              textAlign: "center",
              outline: "none",
            }}
          />
          {error && (
            <p
              style={{
                color: "#ffb4b4",
                fontSize: 13,
                margin: 0,
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            style={{
              padding: "14px",
              borderRadius: 10,
              border: "none",
              background:
                loading || !password
                  ? "rgba(255, 215, 130, 0.3)"
                  : "linear-gradient(90deg, #ffd782 0%, #ffb56b 100%)",
              color: "#1a0f2e",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.1em",
              cursor: loading || !password ? "not-allowed" : "pointer",
              boxShadow: "0 4px 16px rgba(255, 215, 130, 0.3)",
            }}
          >
            {loading ? "確認中..." : "▶ 中に入る"}
          </button>
        </form>

        <div
          style={{
            marginTop: 28,
            paddingTop: 20,
            borderTop: "1px solid rgba(255, 215, 130, 0.15)",
            fontSize: 12,
            opacity: 0.75,
            lineHeight: 1.7,
          }}
        >
          🎁 合言葉は、<br />
          <a
            href="https://tomitabi-honki-juku.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#ffd782",
              textDecoration: "underline",
              fontWeight: 600,
            }}
          >
            富旅 本気塾(無料2日間)
          </a>
          {" "}でお伝えしています。
        </div>
      </div>
    </main>
  );
}

export default function UnlockPage() {
  return (
    <Suspense fallback={null}>
      <UnlockForm />
    </Suspense>
  );
}
