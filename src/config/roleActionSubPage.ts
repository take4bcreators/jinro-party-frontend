/** 役職アクションサブページ */
export const RoleActionSubPage = {
  /** アクションページ */
  Action: 'Action',
  /** チェックページ */
  Check: 'Check',
  /** 待ちページ */
  Wait: 'Wait',
} as const;
export type RoleActionSubPage =
  (typeof RoleActionSubPage)[keyof typeof RoleActionSubPage];
