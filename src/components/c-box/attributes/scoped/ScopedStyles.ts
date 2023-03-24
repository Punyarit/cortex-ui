import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';
import { CBoxUiAttribute, UiStateType } from '../../types/attribute-changed.types';
import { UIScopedStyles } from './UIScoped';

export class ScopedStyle {
  static scope(
    type: 'style' | 'state',
    styleText: string,
    box: CBoxUiAttribute,
    uiName: string,
    attr: string,
    state?: UiStateType
  ) {
    if (styleText) {
      if (!box.scopedCache) {
        box.scopedCache = {};
      }
      let selectorText: string | undefined;

      if (box.scopedCache[uiName]) {
        selectorText = box.scopedCache[uiName][0];
      } else {
        if (box.scopedCache.size) {
          selectorText = UIScopedStyles.setSelectorText(
            type,
            attr,
            box.scopedCache[uiName][1],
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
          UIScopedStyles.counter++;
        }
      }

      if (typeof box.scopedCache?.[uiName]?.[1] === 'number') {
        UIScopedStyles.sheet?.deleteRule(box.scopedCache?.[uiName]?.[1]);
      }

      if (typeof box.scopedCache?.[uiName]?.[1] !== 'number') {
        box.scopedCache[uiName] = [selectorText!, UIScopedStyles.counter - 1];
      }

      const rule = `${selectorText}{${styleText}}`;
      UIScopedStyles.sheet?.insertRule(rule, box.scopedCache[uiName][1]);
    }
  }
}
