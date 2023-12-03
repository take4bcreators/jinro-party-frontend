export const FlexBaseLayoutStyle = {
  Default: 'Default',
  Top: 'Top',
  FooterCenter: 'FooterCenter',
} as const;
export type FlexBaseLayoutStyle =
  (typeof FlexBaseLayoutStyle)[keyof typeof FlexBaseLayoutStyle];
