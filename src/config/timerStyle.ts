export const TimerStyle = {
  Default: 'Default',
  NoStyle: 'NoStyle',
  Medium: 'Medium',
} as const;
export type TimerStyle = (typeof TimerStyle)[keyof typeof TimerStyle];
