export const utils = ['content'] as const;

export type UtilKeys = typeof utils[number];

export type UtilAttr = Record<keyof UtilKeys, boolean>;
