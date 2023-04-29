import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';
import { xyStyleMapper } from '../../styles-mapper/abbr-styles-mapper';
import { ScopedProperty } from '../scoped/ScopedProperty';
import { UIScopedStyles } from '../scoped/UIScoped';

export class XYSizeVariableAttribute {
  constructor(private box: CBox.Ref, private attr: string, private value: string) {}

  init() {
    UIScopedStyles.setStylesheet();
    ScopedProperty.scope('prop', this.createStyleText(), this.attr, this.box);
  }

  private createStyleText() {
    const valueWithImportant = this.value?.endsWith('!') ? '!important' : '';
    const [style1, style2] = xyStyleMapper.get(this.attr)!;
    return `{
      ${style1}: var(--size-${this.value.replace('!', '')})${valueWithImportant};
      ${style2}: var(--size-${this.value.replace('!', '')})${valueWithImportant};
    }`;
  }
}
