export const PlayerPanelStyle = {
  Default: 'Default',
  Large: 'Large',
  GameMaster: 'GameMaster',
} as const;
export type PlayerPanelStyle =
  (typeof PlayerPanelStyle)[keyof typeof PlayerPanelStyle];
