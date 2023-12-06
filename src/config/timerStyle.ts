export const TimerStyle = {
  Default: 'Default',
  NoStyle: 'NoStyle',
} as const;
export type TimerStyle = (typeof TimerStyle)[keyof typeof TimerStyle];
