export type MoodTheme =
  | 'default'
  | 'celebration'
  | 'cozy'
  | 'dateNight'
  | 'culinary';

export type MoodCardTheme = Exclude<MoodTheme, 'default'>;

export interface Mood {
  id: number;
  title: string;
  image: string;
  theme: MoodCardTheme;
}