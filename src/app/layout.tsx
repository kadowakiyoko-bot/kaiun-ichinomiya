import type { Metadata } from "next";
import "./globals.css";
import TomitabiFooter from "@/components/TomitabiFooter";

export const metadata: Metadata = {
  title: "富旅一の宮巡り | 全国102社・スタンプラリー",
  description:
    "富旅シリーズ。全国一の宮102社を地図から探して、スタンプラリーで訪問記録。御祭神・ご利益・開運フード・必買お守り・秘密の話まで。女性の一人旅にも優しい神社めぐりサイト。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col washi-bg text-ink-900 font-sans">
        <div className="flex-1">{children}</div>
        <TomitabiFooter />
      </body>
    </html>
  );
}
