/** プレイヤーアイコン */
export const PlayerIcon = {
  Icon01: 'Icon01',
  Icon02: 'Icon02',
  Icon03: 'Icon03',
  Icon04: 'Icon04',
  Icon05: 'Icon05',
  Icon06: 'Icon06',
  Icon07: 'Icon07',
  Icon08: 'Icon08',
  Icon09: 'Icon09',
  Icon10: 'Icon10',
} as const;
export type PlayerIcon = (typeof PlayerIcon)[keyof typeof PlayerIcon];
