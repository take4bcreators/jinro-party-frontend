/** ボタンのスタイル */
export const ButtonStyle = {
  Blue: 'Blue',
  Pink: 'Pink',
  Orange: 'Orange',
  Purple: 'Purple',
  Plane: 'Plane',
  Disable: 'Disable',
  None: 'None',
} as const;
export type ButtonStyle = (typeof ButtonStyle)[keyof typeof ButtonStyle];
