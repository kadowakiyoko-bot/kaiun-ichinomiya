"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import type { Shrine } from "@/types";

interface ShrineMapProps {
  shrineList: Shrine[];
  selectedShrine: Shrine | null;
  onSelectShrine: (shrine: Shrine) => void;
  visitedIds: Set<string>;
}

function createMarkerIcon(shrine: Shrine, isSelected: boolean, isVisited: boolean): L.DivIcon {
  const size = isSelected ? 40 : 30;
  const borderWidth = isSelected ? 3 : 2;
  // 未訪問: 朱赤 / 訪問済み: ゴールド
  const fillColor = isVisited ? "#D4AF37" : "#BB3D20";
  const innerChar = isVisited ? "✓" : "⛩";
  const innerColor = "white";

  return L.divIcon({
    className: "torii-marker",
    html: `
      <div style="
        position: relative;
        width: ${size}px;
        height: ${size + 10}px;
        cursor: pointer;
      ">
        <div style="
          width: ${size}px;
          height: ${size}px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          background: linear-gradient(135deg, ${fillColor}, ${fillColor}dd);
          border: ${borderWidth}px solid white;
          box-shadow: 0 2px 8px rgba(26,16,8,0.35)${isSelected ? `, 0 0 18px ${fillColor}80` : ""};
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <span style="
            transform: rotate(45deg);
            font-size: ${isSelected ? 16 : 13}px;
            color: ${innerColor};
            font-weight: bold;
            line-height: 1;
          ">${innerChar}</span>
        </div>
      </div>
    `,
    iconSize: [size, size + 10],
    iconAnchor: [size / 2, size + 10],
    popupAnchor: [0, -(size + 6)],
  });
}

export default function ShrineMap({
  shrineList,
  selectedShrine,
  onSelectShrine,
  visitedIds,
}: ShrineMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const container = containerRef.current;
    const japanBounds = L.latLngBounds([24, 122], [46, 149]);

    const map = L.map(container, {
      center: [36.5, 137.5],
      zoom: 6,
      zoomControl: false,
      minZoom: 5,
      maxZoom: 18,
      maxBounds: japanBounds,
      maxBoundsViscosity: 1.0,
    });

    L.tileLayer(
      "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>',
        maxZoom: 18,
      }
    ).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    mapRef.current = map;

    setTimeout(() => {
      map.invalidateSize();
      map.setView([36.5, 137.5], 6);
    }, 300);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    shrineList.forEach((shrine) => {
      const isSelected = selectedShrine?.id === shrine.id;
      const isVisited = visitedIds.has(shrine.id);
      const icon = createMarkerIcon(shrine, isSelected, isVisited);

      const goriyakuChips = shrine.ご利益
        .slice(0, 3)
        .map(
          (g) =>
            `<span style="font-size:10px;padding:2px 8px;border-radius:99px;color:white;background:#BB3D20;font-weight:500">${g}</span>`
        )
        .join("");

      const popup = `
        <div style="min-width:220px;max-width:280px;font-family:sans-serif">
          <div style="font-size:15px;font-weight:bold;color:#6B1810;margin-bottom:2px">${shrine.name}</div>
          <div style="font-size:11px;color:#7A6555">${shrine.読み}</div>
          <div style="font-size:12px;color:#7A6555;margin-top:4px">${shrine.都道府県}・${shrine.旧国}</div>
          <div style="margin-top:8px;display:flex;gap:4px;flex-wrap:wrap">${goriyakuChips}</div>
          <div style="font-size:12px;color:#3D2B1A;margin-top:8px;line-height:1.5">${shrine.開運キーワード}</div>
          ${isVisited ? '<div style="margin-top:8px;font-size:11px;color:#A07A10;font-weight:bold">⛩ 参拝済み</div>' : ""}
          <div style="margin-top:10px;text-align:center">
            <span style="font-size:11px;color:#BB3D20;cursor:pointer;font-weight:bold">▶ 詳しく見る</span>
          </div>
        </div>`;

      const marker = L.marker([shrine.緯度, shrine.経度], { icon })
        .addTo(map)
        .bindPopup(popup, { maxWidth: 300 })
        .on("click", () => onSelectShrine(shrine));

      markersRef.current.push(marker);
    });
  }, [shrineList, selectedShrine, visitedIds, onSelectShrine]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedShrine) return;

    map.setView([selectedShrine.緯度, selectedShrine.経度], 9, {
      animate: true,
      duration: 0.5,
    });
  }, [selectedShrine]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "600px", borderRadius: "16px", zIndex: 1 }}
    />
  );
}
