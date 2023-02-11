export const ingredient = ['cx-popover'] as const;
export type IngredientKey = typeof ingredient[number];
export type IngredientAttr = Partial<Record<IngredientKey, boolean>>;
