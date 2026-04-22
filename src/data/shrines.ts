import data from "../../data/ichinomiya-102.json";
import type { Shrine } from "@/types";

export const shrines: Shrine[] = data as unknown as Shrine[];

export const shrineById = (id: string): Shrine | undefined =>
  shrines.find((s) => s.id === id);
