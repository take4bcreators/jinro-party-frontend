export const FlexBaseLayoutStyle = {
  Default: 'Default',
  Top: 'Top',
} as const;
export type FlexBaseLayoutStyle =
  (typeof FlexBaseLayoutStyle)[keyof typeof FlexBaseLayoutStyle];
