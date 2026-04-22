"use client";

import { useCallback, useEffect, useState } from "react";
import type { StampRecord } from "@/types";

const STORAGE_KEY = "kaiun-ichinomiya-stamps";

function loadStamps(): StampRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StampRecord[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveStamps(stamps: StampRecord[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stamps));
  } catch {
    /* ignore quota errors */
  }
}

export function useStamps() {
  const [stamps, setStamps] = useState<StampRecord[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setStamps(loadStamps());
    setIsHydrated(true);
  }, []);

  const isVisited = useCallback(
    (shrineId: string): boolean => {
      return stamps.some((s) => s.shrineId === shrineId);
    },
    [stamps]
  );

  const getStamp = useCallback(
    (shrineId: string): StampRecord | undefined => {
      return stamps.find((s) => s.shrineId === shrineId);
    },
    [stamps]
  );

  const addStamp = useCallback((shrineId: string, memo?: string) => {
    setStamps((prev) => {
      const existing = prev.find((s) => s.shrineId === shrineId);
      if (existing) return prev;
      const next = [
        ...prev,
        {
          shrineId,
          visitedAt: new Date().toISOString(),
          memo,
        },
      ];
      saveStamps(next);
      return next;
    });
  }, []);

  const removeStamp = useCallback((shrineId: string) => {
    setStamps((prev) => {
      const next = prev.filter((s) => s.shrineId !== shrineId);
      saveStamps(next);
      return next;
    });
  }, []);

  const updateMemo = useCallback((shrineId: string, memo: string) => {
    setStamps((prev) => {
      const next = prev.map((s) =>
        s.shrineId === shrineId ? { ...s, memo } : s
      );
      saveStamps(next);
      return next;
    });
  }, []);

  return {
    stamps,
    isHydrated,
    isVisited,
    getStamp,
    addStamp,
    removeStamp,
    updateMemo,
    totalCount: stamps.length,
  };
}
