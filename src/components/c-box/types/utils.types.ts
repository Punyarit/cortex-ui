export const utils = ['content'] as const;

export type UtilKeys = typeof utils[number];

export type UtilAttrs = Record<keyof UtilKeys, boolean>;
