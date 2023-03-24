import { findCssRuleIndex } from "../../../../helpers/functions/cssRule/findCssRuleIndex"
import { CBoxUiAttribute } from "../../types/attribute-changed.types"
import { ScopedStyleType } from "../../types/scoped-styles.types"
import { UIScopedStyles } from "./UIScoped"

export class ScopedProperty {
  static scope(
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

    const rule = `${selectorText}${styleText}`;
    UIScopedStyles.sheet?.insertRule(rule, 0);
  }
}
