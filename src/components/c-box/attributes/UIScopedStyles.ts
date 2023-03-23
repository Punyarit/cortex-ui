import { findCssRuleIndex } from '../../../helpers/functions/cssRule/findCssRuleIndex';
import { CBoxUiAttribute, UiStateType } from '../types/attribute-changed.types';
import { ScopedStyleType } from '../types/scoped-styles.types';

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
    type: 'style' | 'state',
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
            type,
            attr,
            box.scopedCache.values().next().value[1],
            uiName,
            state
          );
        } else {
          selectorText = UIScopedStyles.setSelectorText(
            type,
            attr,
            UIScopedStyles.counter,
            uiName,
            state
          );

          box.setAttribute(`c${UIScopedStyles.counter}`, '');
          box.scopedCache.set(uiName, [selectorText!, UIScopedStyles.counter]);
          UIScopedStyles.counter++;
        }
      }

      const indexSelector = findCssRuleIndex(UIScopedStyles.sheet, selectorText!);
      if (typeof indexSelector === 'number') {
        UIScopedStyles.sheet?.deleteRule(indexSelector);
      }

      const rule = `${selectorText}{${styleText}}`;
      UIScopedStyles.sheet?.insertRule(rule, UIScopedStyles.sheet.cssRules.length);
    }
  }

  static scopedProperty(
    type: ScopedStyleType,
    styleText: string,
    attr: string,
    box: CBoxUiAttribute
  ) {
    if (!box.scopedCache) {
      box.scopedCache = new Map();
    }

    let selectorText: string | undefined;

    if (box.scopedCache.has(attr)) {
      selectorText = box.scopedCache.get(attr)?.[0];
    } else {
      if (box.scopedCache.size) {
        selectorText = UIScopedStyles.setSelectorText(
          type,
          attr,
          box.scopedCache.values().next().value[1]
        );
      } else {
        selectorText = UIScopedStyles.setSelectorText(type, attr, UIScopedStyles.counter);

        box.setAttribute(`c${UIScopedStyles.counter}`, '');
        box.scopedCache.set(attr, [selectorText!, UIScopedStyles.counter]);
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

      case 'size':
      case 'value':
      case 'variable':
      case 'splitter':
      case 'spitter-each':
      case 'toggle-splitter':
        return `c-box[${attr}]`;
    }
  }
}
