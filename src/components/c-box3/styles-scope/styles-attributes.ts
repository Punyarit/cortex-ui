import { UiSpacing, UiSpacingTypes } from '../types/c-box.types';

export class StylesAttributes {
  static setSpacing(
    box: CBox.Ref,
    value: string,
    style: UiSpacingTypes | UiSpacingTypes[],
    attr: string
  ) {
    box.uiSpacing ||= {} as UiSpacing;
    const important = value?.endsWith('!') ? '!important' : '';
    const val = value.replace('!', '');
    box.setAttribute(attr, value);
    if (Array.isArray(style)) {
      for (let index = 0; index < style.length; index++) {
        box.uiSpacing[style[index]] = `:host{${style[index]}:var(--size-${val})${important}}`;
      }
    } else {
      box.uiSpacing[style] = `:host{${style}:var(--size-${val})${important}}`;
    }
    box.updateStyles();
  }
}
