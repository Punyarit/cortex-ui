import { abbrStylesMapper } from '../../styles-mapper/abbr-styles-mapper';
import { ScopedProperty } from '../scoped/ScopedProperty';
import { UIScopedStyles } from '../scoped/UIScoped';

export class VariableAttribute {
  constructor(private box: CBoxTest.Ref, private attr: string, private value: string) {}

  init() {
    UIScopedStyles.setStylesheet();
    ScopedProperty.scope('prop', this.createStyleText(), this.attr, this.box);
  }

  private createStyleText() {
    const valueWithImportant = this.value.endsWith('!') ? '!important' : '';
    return `{${abbrStylesMapper.get(this.attr)}: var(--${this.value.replace(
      '!',
      ''
    )})${valueWithImportant};}`;
  }
}
