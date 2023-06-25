import generateComponentId from './helper/generateComponentId';
import { getMediaScreen } from './helper/getMediaScreen';
import { getStyleResult } from './helper/getStyleResult';
import { parseCSS } from './helper/parseCSS';
import stylis, { compile, serialize, stringify } from 'stylis';
import { StyleSheetStore } from './helper/styleSheetStore';
import appCxss from './cxss/app.cxss';

export class Box extends HTMLElement {
  set css(css: string) {
    const cssObj = parseCSS(this, css);
    let cssRule = ``;
    let className = ``;
    for (const selector in cssObj) {
      let selectorVal = selector;
      let mediaSelector: string | undefined;
      let mediaScreen: string | undefined;
      if (selector.startsWith('@media')) {
        const [media, actSelector] = selector.trim().split(' ');
        selectorVal = className.includes(actSelector.replace('.', '')) ? '' : actSelector;
        mediaSelector = actSelector;
        mediaScreen = `${getMediaScreen(media)}{`;
      }
      const classNameVal = selectorVal.split(':')[0].slice(1);

      cssRule += `${mediaScreen || ''}${getStyleResult(
        selector,
        cssObj,
        mediaScreen ? mediaSelector! : undefined
      )}`;

      this.setAttribute(generateComponentId(cssRule), '');
      if (selectorVal[0] === '.') className += `${classNameVal} `;
    }

    this.className = className.slice(0, -1);

    // StyleSheetStore.Box ||= document.getElementsByTagName('cx-box');
    // if (this === StyleSheetStore.Box[StyleSheetStore.Box.length - 1]) {
    //   const styleSheet = new CSSStyleSheet();
    //   styleSheet.replaceSync(cssRule);
    //   document.adoptedStyleSheets.push(styleSheet);
    // }
  }
}

customElements.define('cx-box', Box);
