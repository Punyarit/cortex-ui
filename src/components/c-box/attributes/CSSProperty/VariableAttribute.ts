import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';
import { UIScopedStyles } from '../UIScopedStyles';

export class VariableAttribute {
  constructor(private box: CBox.Ref, private attr: string, private value: string) {}

  init() {
    UIScopedStyles.setStylesheet();
    UIScopedStyles.scopedProperty('variable', this.createStyleText(), this.attr, this.box);
  }

  private createStyleText() {
    const valueWithImportant = this.value.endsWith('!') ? '!important' : '';
    return `
      --${this.attr}: var(--${this.value.replace('!', '')})${valueWithImportant};
    `;
  }
}
