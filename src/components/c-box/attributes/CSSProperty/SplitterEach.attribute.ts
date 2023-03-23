import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';
import { UIScopedStyles } from '../UIScopedStyles';

export class SplitterEachAttribute {
  constructor(private box: CBox.Ref, private attr: string, private value: string) {}

  init() {
    UIScopedStyles.setStylesheet();
    UIScopedStyles.scopedProperty('spitter-each', this.createStyleText(), this.attr, this.box);
  }

  private createStyleText() {
    const attrs = this.value.split(' ');
    let cssText = '';

    for (let index = 0; index < attrs.length; index++) {
      const valueWithImportant = attrs[index].endsWith('!') ? '!important' : '';
      cssText += `--${this.attr}-attr-${index}:${attrs[index].replace(
        '!',
        ''
      )}${valueWithImportant};`;
    }

    return cssText;
  }
}
