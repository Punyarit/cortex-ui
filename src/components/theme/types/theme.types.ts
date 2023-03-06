export const themeColors = ['light', 'dark'] as const;
export type ThemeColorTypes = typeof themeColors[number];

export const themeSizes = ['small', 'medium', 'large'] as const;
export type ThemeSizeTypes = typeof themeSizes[number];
