import { Theme } from '../theme/theme';
import { getMediaScreen } from './helper/getMediaScreen';
import { getStyleResult } from './helper/getStyleResult';
import { parseCSS } from './helper/parseCSS';

export class Box extends HTMLElement {
  #styleSheet = new CSSStyleSheet();

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(document.createElement('slot'));
    shadowRoot.adoptedStyleSheets = [this.#styleSheet];
  }

  set css(css: string) {
    const cssObj = parseCSS(this, css);
    let cssRule = ``;
    let className = ``;
    for (const selector in cssObj) {
      let selectorVal = selector;
      let mediaSelector: string;
      let mediaScreen: string | undefined;
      if (selector.startsWith('@media')) {
        const [media, actSelector] = selector.trim().split(' ');
        selectorVal = className.includes(actSelector.replace('.', '')) ? '' : actSelector;
        mediaSelector = actSelector;
        mediaScreen = `${getMediaScreen(media)}{`;
      }
      if (selectorVal[0] === '.') className += `${selectorVal.split(':')[0].slice(1).trim()} `;

      cssRule += `${mediaScreen || ''}${getStyleResult(
        selector,
        cssObj,
        mediaScreen ? mediaSelector! : undefined
      )}`;
    }
    if (className) this.className = className.slice(0, -1);
    this.#styleSheet.replaceSync(cssRule);
  }
}

customElements.define('cx-box', Box);
