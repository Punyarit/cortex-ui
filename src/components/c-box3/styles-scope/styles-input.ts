import { stylesMapper } from '../styles-mapper/styles-mapper';
import { InputSelector, StyleStates, UiInput } from '../types/c-box.types';

export class StylesInput {
  static scope(value: string | string[], box: CBox.Ref, state?: StyleStates) {
    const target = box.children[0].tagName.toLowerCase();
    if (target !== 'input' && target !== 'textarea') {
      throw SyntaxError(
        "When using C-BOX with 'input' property, must only be applied to the INPUT or TEXTAREA element."
      );
    }
    box.uiInput ||= {};
    box.uiInput[state || 'default'] ||= {};

    const styles = this.getStylesArray(value);
    this.generateDynamicStyles(styles, box, target, state);

    box.uiInputCSSResult = box.uiInput
      ? Object.values(box.uiInput)
          .flatMap((r) => Object.values(r!))
          .join('')
      : '';

    box.updateStyles();
  }

  static getStylesArray(value: string | string[]): string[] {
    if (typeof value === 'string') {
      return value.split(',').map((style) => style.trim());
    } else if (Array.isArray(value)) {
      return value;
    } else {
      throw SyntaxError('UI properties can only have a type of string or string[].');
    }
  }

  static generateDynamicStyles(
    styles: string[],
    box: CBox.Ref,
    target: 'input' | 'textarea',
    state?: StyleStates
  ): void {
    for (const style of styles) {
      const [selectorValue, styleValue] = style.split(':').map((s) => s.trim()) as [
        InputSelector,
        string
      ];
      if (selectorValue && styleValue) {
        const cssText = this.createCssText(styleValue);

        (box.uiInput as any)[state || 'default'][selectorValue] = `::slotted(${target}${
          selectorValue !== 'input' && selectorValue !== 'placeholder' ? `:${selectorValue}` : ''
        }${state ? `:${state}` : ''})${
          selectorValue === 'placeholder' ? `::${selectorValue}` : ''
        }{${cssText}}`;
      }
    }
  }

  static createCssText(styleValue: string): string {
    return styleValue
      .split(' ')
      .filter(Boolean)
      .map((s) => {
        const styleProp = stylesMapper.get(`c-box[${s.replace('!', '').trim()}]`);
        return styleProp ? `${styleProp}${s.endsWith('!') ? '!important' : ''};` : '';
      })
      .join('');
  }
}
