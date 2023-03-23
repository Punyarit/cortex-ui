import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';
import { UIScopedStyles } from '../UIScopedStyles';

export class SplitterAttribute {
  constructor(private box: CBox.Ref, private attr: string, private value: string) {}

  init() {
    const [size, source, color] = this.value.split(' ');

    UIScopedStyles.setStylesheet();
    UIScopedStyles.scopedProperty(
      'splitter',
      this.createStyleText(size, source, color),
      this.attr,
      this.box
    );
  }

  private createStyleText(size: string, source: string, color: string) {
    const sourceWithImportant = source.endsWith('!') ? '!important' : '';
    const sizeWithImportant = size.endsWith('!') ? '!important' : '';
    const colorWithImportant = color.endsWith('!') ? '!important' : '';

    return `
      --${this.attr}: ${source.replace('!', '')}${sourceWithImportant};
      --${this.attr}-size: var(--size-${size.replace('!', '')})${sizeWithImportant};
      --${this.attr}-color: var(--${color.replace('!', '')})${colorWithImportant};
    `;
  }
}
