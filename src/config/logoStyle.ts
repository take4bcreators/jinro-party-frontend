/** ロゴのスタイル */
export const LogoStyle = {
  Default: 'Default',
  Small: 'Small',
} as const;
export type LogoStyle = (typeof LogoStyle)[keyof typeof LogoStyle];
