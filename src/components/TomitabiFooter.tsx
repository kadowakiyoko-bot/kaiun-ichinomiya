"use client";

/**
 * TomitabiFooter — 富旅シリーズ姉妹アプリリンク（共通フッター）
 */
import UmeIcon from "@/components/UmeIcon";

const SISTER_APPS = [
  {
    name: "富旅暦",
    en: "TOMITABI KOYOMI",
    desc: "二十四節気七十二候で暮らす",
    url: "https://tomitabi-koyomi.vercel.app",
  },
  {
    name: "富旅温泉",
    en: "TOMITABI ONSEN",
    desc: "九星気学×泉質で開運の湯",
    url: "https://kaiun-meguri-map.vercel.app",
  },
];

export default function TomitabiFooter() {
  return (
    <footer
      style={{
        background: "#FAFAFA",
        borderTop: "1px solid #E8E8E8",
        padding: "32px 16px 24px",
        marginTop: "40px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* シリーズ見出し */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "#E8E8E8" }} />
          <UmeIcon size={14} color="#CE3A2D" />
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#666666",
              letterSpacing: "0.25em",
              margin: 0,
            }}
          >
            富旅シリーズ
          </p>
          <UmeIcon size={14} color="#CE3A2D" />
          <div style={{ flex: 1, height: "1px", background: "#E8E8E8" }} />
        </div>

        {/* 姉妹アプリリンク */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "10px",
          }}
        >
          {SISTER_APPS.map((app) => (
            <a
              key={app.url}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                background: "#FFFFFF",
                border: "1px solid #E8E8E8",
                padding: "16px 18px",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#CE3A2D";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E8E8E8";
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#1A1A1A",
                  letterSpacing: "0.1em",
                  margin: "0 0 4px 0",
                }}
              >
                {app.name}
              </p>
              <p
                style={{
                  fontSize: "0.6rem",
                  color: "#999999",
                  letterSpacing: "0.18em",
                  margin: "0 0 6px 0",
                  textTransform: "uppercase",
                }}
              >
                {app.en}
              </p>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#666666",
                  margin: 0,
                }}
              >
                {app.desc} →
              </p>
            </a>
          ))}
        </div>

        {/* コピーライト */}
        <p
          style={{
            fontSize: "0.7rem",
            color: "#999999",
            textAlign: "center",
            marginTop: "20px",
            letterSpacing: "0.1em",
          }}
        >
          © 富旅 TOMITABI All rights reserved.
        </p>
      </div>
    </footer>
  );
}
