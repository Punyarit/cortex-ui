import { initialStyleText } from '../constant/initialStyle';

export function initDefaultStyle() {
  const initialStyle = new CSSStyleSheet();
  initialStyle.replaceSync(initialStyleText);
  document.adoptedStyleSheets.push(initialStyle);
}
