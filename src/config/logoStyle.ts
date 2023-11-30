/** ロゴのスタイル */
export const LogoStyle = {
  Default: 'Default',
  Small: 'Small',
  FixedSmall: 'FixedSmall',
  FixedSmallHide: 'FixedSmallHide',
} as const;
export type LogoStyle = (typeof LogoStyle)[keyof typeof LogoStyle];
