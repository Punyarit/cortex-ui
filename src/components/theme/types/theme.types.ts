export const themeColors = ['light', 'dark'] as const;
export type ThemeColorTypes = typeof themeColors[number];

export const themeSizes = ['small', 'medium', 'large'] as const;
export type ThemeSizeTypes = typeof themeSizes[number];

export const theneVersions = [1, 2] as const;

export type ThemeVersion = typeof theneVersions[number];
