import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';
import { UIScopedStyles } from '../UIScopedStyles';

export class ValueAttribute {
  constructor(private box: CBox.Ref, private attr: string, private value: string) {}

  init() {
    UIScopedStyles.setStylesheet();
    UIScopedStyles.scopedProperty('value', this.createStyleText(), this.attr, this.box);
  }

  private createStyleText() {
    const valueWithImportant = this.value.endsWith('!') ? '!important' : '';
    return `--${this.attr}: ${this.value.replace('!', '')}${valueWithImportant};`;
  }
}
