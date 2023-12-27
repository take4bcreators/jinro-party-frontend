export const StateTitleStyle = {
  Default: 'Default',
  Orange: 'Orange',
  Purple: 'Purple',
  Dark: 'Dark',
  Red: 'Red',
} as const;
export type StateTitleStyle =
  (typeof StateTitleStyle)[keyof typeof StateTitleStyle];
