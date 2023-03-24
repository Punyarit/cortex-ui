import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';
import { CBoxUiAttribute } from '../../types/attribute-changed.types';
import { ScopedStyleType } from '../../types/scoped-styles.types';
import { UIScopedStyles } from './UIScoped';

export class ScopedIcon {
  static scope(
    type: ScopedStyleType,
    styleText: string,
    attr: string,
    box: CBoxUiAttribute,
    prefixSuffix: '::before' | '::after',
    iconState?: string
  ) {
    if (!box.scopedCache) {
      box.scopedCache = {};
    }

    let selectorText: string | undefined;

    if (box.scopedCache[attr]) {
      selectorText = box.scopedCache[attr][0];
    } else {
      if (box.scopedCache.size) {
        selectorText = UIScopedStyles.setSelectorText(type, attr, box.scopedCache[attr][1]);
      } else {
        selectorText = UIScopedStyles.setSelectorText(type, attr, UIScopedStyles.counter);

        box.setAttribute(`c${UIScopedStyles.counter}`, '');

        UIScopedStyles.counter++;
      }
    }

    if (typeof box.scopedCache?.[attr]?.[1] === 'number') {
      UIScopedStyles.sheet?.deleteRule(box.scopedCache?.[attr]?.[1]);
    }

    if (typeof box.scopedCache?.[attr]?.[1] !== 'number') {
      box.scopedCache[attr] = [selectorText!, UIScopedStyles.counter - 1];
    }

    const rule = `${selectorText}${styleText}`;
    UIScopedStyles.sheet?.insertRule(rule, box.scopedCache[attr][1]);
  }
}
