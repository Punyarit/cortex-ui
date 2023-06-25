export function createAndInjectStyle(cssText: string, styleId: string, styleTag?: HTMLElement) {
  const style = styleTag || document.createElement('style');
  style.id = styleId;
  style.textContent = cssText;
  document.head.appendChild(style);
}
