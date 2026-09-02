export type MoodTheme =
  | "default"
  | "celebration"
  | "cozy"
  | "dateNight"
  | "culinary";

export type MoodCardTheme = Exclude<MoodTheme, "default">;

export type MoodAsset = {
  id: MoodCardTheme;
  title: string;
  imageUrl: string;
};