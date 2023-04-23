import { UiSpacing, UiSpacingTypes } from '../types/c-box.types';

export class StylesAttributes {
  static setSpacing(
    box: CBox.Ref,
    value: string,
    style: UiSpacingTypes | UiSpacingTypes[],
    attr: string,
    axis?: 'margin-x' | 'margin-y' | 'padding-x' | 'padding-y'
  ) {
    box.uiSpacing ||= {} as UiSpacing;
    const important = value?.endsWith('!') ? '!important' : '';
    const val = value.replace('!', '');
    const attribute = `${attr}-${value}`;
    box.setAttribute(attribute, '');
    if (Array.isArray(style)) {
      // css size attribute maximum is 200
      if (+value > 200) {
        const styles = [];
        for (let index = 0; index < style.length; index++) {
          styles[index] = `${style[index]}:var(--size-${val})${important};`;
        }
        box.uiSpacing[axis!] = `:host([${attribute}]){${styles.join('')}}`;
      }
    } else {
      if (+value > 200) {
        box.uiSpacing[style] = `:host([${attribute}]){${style}:var(--size-${val})${important}}`;
      }
    }
    box.uiSpacingCSSResult = box.uiSpacing ? Object.values(box.uiSpacing).join('') : '';
    box.updateStyles();
  }
}
