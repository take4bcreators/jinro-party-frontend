export const PlayerPanelDataSrc = {
  Playing: 'Playing',
  Entry: 'Entry',
} as const;
export type PlayerPanelDataSrc =
  (typeof PlayerPanelDataSrc)[keyof typeof PlayerPanelDataSrc];
