"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ja">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#FBF7F0",
          color: "#1A1008",
        }}
      >
        <div
          style={{
            maxWidth: 420,
            width: "100%",
            textAlign: "center",
            background: "white",
            borderRadius: 16,
            padding: 32,
            boxShadow: "0 4px 20px rgba(26,16,8,0.08)",
            border: "1px solid #F4D6CD",
          }}
        >
          <p style={{ fontSize: 48, marginBottom: 16 }}>⛩</p>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 900,
              color: "#6B1810",
              marginBottom: 8,
            }}
          >
            一時的に表示できませんでした
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "#3D2B1A",
              lineHeight: 1.7,
            }}
          >
            通信や端末側の問題で表示に失敗しました。
            <br />
            下のボタンでもう一度お試しください。
          </p>
          <p
            style={{
              fontSize: 11,
              color: "#7A6555",
              marginTop: 12,
              wordBreak: "break-all",
            }}
          >
            {error.message || "Unknown error"}
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 20,
              padding: "10px 24px",
              borderRadius: 999,
              border: "none",
              background: "#BB3D20",
              color: "white",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            もう一度試す
          </button>
        </div>
      </body>
    </html>
  );
}
