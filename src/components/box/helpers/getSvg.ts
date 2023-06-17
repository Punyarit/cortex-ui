export const getSvg = async (iconPath: string) => {
  const svgText = await (await fetch(iconPath)).text();
  return new DOMParser().parseFromString(svgText, 'image/svg+xml').documentElement;
};
