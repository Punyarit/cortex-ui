import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';
import { CBoxUiAttribute, UiStateType } from '../../types/attribute-changed.types';
import { ScopedStyleType } from '../../types/scoped-styles.types';

export class UIScopedStyles {
  static counter = 0;
  static tag?: HTMLStyleElement;
  static sheet?: CSSStyleSheet;

  static setStylesheet() {
    if (!UIScopedStyles.tag) {
      UIScopedStyles.tag = document.createElement('style');
      UIScopedStyles.tag.id = 'scoped-style';
      document.head.appendChild(UIScopedStyles.tag);
      const stylesheets = document.styleSheets;

      for (const sheet in stylesheets) {
        if ((stylesheets[sheet].ownerNode as HTMLElement)?.id === 'scoped-style') {
          UIScopedStyles.sheet = stylesheets[sheet];
          break;
        }
      }
    }
  }

  static setSelectorText(
    type: ScopedStyleType,
    attr: string,
    counter: number,
    uiName?: string,
    state?: UiStateType
  ) {
    switch (type) {
      case 'style':
        return `c-box[_${attr}~="${uiName}"][c${counter}]`;

      case 'state':
        return `c-box[_${attr}~="${uiName}"]:${state}[c${counter}]`;

      case 'prop':
        return `c-box[${attr}][c${counter}]`;
    }
  }
}
