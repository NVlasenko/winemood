export type MoodTheme =
  | "default"
  | "celebration"
  | "cozy"
  | "dateNight"
  | "culinary";

export type MoodCardTheme = Exclude<MoodTheme, "default">;

export type Mood = {
  id: number;
  title: string;
  imageUrl: string;
  theme: MoodCardTheme;
};