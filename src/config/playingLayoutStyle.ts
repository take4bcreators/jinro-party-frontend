/** ゲーム中ページのスタイル */
export const PlayingLayoutStyle = {
  SkyBlue: 'SkyBlue',
  Orange: 'Orange',
  Purple: 'Purple',
  Dark: 'Dark',
  Red: 'Red',
} as const;
export type PlayingLayoutStyle =
  (typeof PlayingLayoutStyle)[keyof typeof PlayingLayoutStyle];
