export function findCssRuleIndex(
  sheet: CSSStyleSheet | undefined,
  ruleSelector: string
): number | null {
  if (!sheet) return null;
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
