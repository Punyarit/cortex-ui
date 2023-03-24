import { findCssRuleIndex } from "../../../../helpers/functions/cssRule/findCssRuleIndex"
import { CBoxUiAttribute, UiStateType } from "../../types/attribute-changed.types"
import { UIScopedStyles } from "./UIScoped"

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
}
