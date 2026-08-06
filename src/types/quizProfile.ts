import type { WineCatalogCard } from "./wineCatalogCard";

export type QuizHistoryItem = {
  id: number;
  createdAt: string;
  wines: WineCatalogCard[];
};