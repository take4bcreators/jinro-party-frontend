export const PlayerIconElemStyle = {
  Default: 'Default',
  Disable: 'Disable',
} as const;
export type PlayerIconElemStyle =
  (typeof PlayerIconElemStyle)[keyof typeof PlayerIconElemStyle];
