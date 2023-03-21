export function findCssRuleIndex(sheet: CSSStyleSheet, ruleSelector: string): number | null {
  const rules = sheet.cssRules;
  const len = rules.length;

  for (let i = 0; i < len; i++) {
    const rule = rules[i];
    if (rule instanceof CSSStyleRule && rule.selectorText === ruleSelector) {
      return i;
    }
  }

  return null;
}
