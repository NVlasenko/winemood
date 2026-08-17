export type Achievement = {
  code: string;
  title: string;
  description: string;
  iconUrl?: string;
  unlockedAt: string | null;
  progress?: number;
  total?: number;
};
