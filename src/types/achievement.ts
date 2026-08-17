export type Achievement = {
  code: string;
  title: string;
  description: string;
  iconUrl: string;
  unlockedAt: string;
  progress?: number;
  total?: number;
};