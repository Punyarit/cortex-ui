import { findCssRuleIndex } from '../../../helpers/functions/cssRule/findCssRuleIndex';
import { CBoxUiAttribute, UiStateType } from '../types/attribute-changed.types';

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

  static scopeStyles(
    styleText: string,
    box: CBoxUiAttribute,
    uiName: string,
    attr: string,
    state?: UiStateType
  ) {
    if (styleText) {
      if (!box.scopedCache) {
        box.scopedCache = new Map();
      }
      let selectorText: string | undefined;

      if (box.scopedCache.has(uiName)) {
        selectorText = box.scopedCache.get(uiName)?.[0];
      } else {
        if (box.scopedCache.size) {
          selectorText = UIScopedStyles.setSelectorText(
            attr,
            uiName,
            box.scopedCache.values().next().value[1],
            state
          );
        } else {
          selectorText = UIScopedStyles.setSelectorText(attr, uiName, UIScopedStyles.counter, state);

          box.setAttribute(`c${UIScopedStyles.counter}`, '');
          box.scopedCache.set(uiName, [selectorText, UIScopedStyles.counter]);
          UIScopedStyles.counter++;
        }
      }

      const indexSelector = findCssRuleIndex(UIScopedStyles.sheet, selectorText!);
      if (typeof indexSelector === 'number') {
        UIScopedStyles.sheet?.deleteRule(indexSelector);
      }

      const rule = `${selectorText}{${styleText}}`;
      UIScopedStyles.sheet?.insertRule(rule, 0);
    }
  }

  static setSelectorText(
    attr: string,
    uiName: string,
    counter: number,
    state?: UiStateType
  ): string {
    if (state) {
      return `c-box[_${attr}~="${uiName}"]:${state}[c${counter}]`;
    } else {
      return `c-box[_${attr}~="${uiName}"][c${counter}]`;
    }
  }
}
