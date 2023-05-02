import { UiSpacing, UiSpacingTypes } from '../types/c-div.types';

export class StylesAttributes {
  static setSpacing(
    box: CXDiv.Ref,
    value: string,
    style: UiSpacingTypes | UiSpacingTypes[],
    attr: string,
    axis?: 'margin-x' | 'margin-y' | 'padding-x' | 'padding-y'
  ) {
    box.spaceMap ||= {} as UiSpacing;
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
        box.spaceMap[axis!] = `:host([${attribute}]){${styles.join('')}}`;
      }
    } else {
      if (+value > 200) {
        box.spaceMap[style] = `:host([${attribute}]){${style}:var(--size-${val})${important}}`;
      }
    }
    box.spaceCSSResult = box.spaceMap ? Object.values(box.spaceMap).join('') : '';
    box.updateStyles();
  }
}
