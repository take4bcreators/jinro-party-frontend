export const PlayerPanelStyle = {
  Default: 'Default',
  Large: 'Large',
} as const;
export type PlayerPanelStyle =
  (typeof PlayerPanelStyle)[keyof typeof PlayerPanelStyle];
