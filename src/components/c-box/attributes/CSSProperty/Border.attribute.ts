import { abbrMultiStyleMapper } from '../../styles-mapper/abbr-styles-mapper';
import { ScopedProperty } from '../scoped/ScopedProperty';
import { UIScopedStyles } from '../scoped/UIScoped';

export class BorderAttribute {
  constructor(private box: CBox.Ref, private attr: string, private value: string) {}

  init() {
    UIScopedStyles.setStylesheet();
    ScopedProperty.scope('prop', this.createStyleText(), this.attr, this.box);
  }

  private createStyleText() {
    const [attrSize, attrType, attrColor] = this.value.split(' ');

    const sizeWithImportant = attrSize.endsWith('!') ? '!important' : '';
    const sourceWithImportant = attrType.endsWith('!') ? '!important' : '';
    const colorWithImportant = attrColor.endsWith('!') ? '!important' : '';
    const [borderWidth, borderStyle, borderColor] = abbrMultiStyleMapper.get(this.attr)!;
    return `{
        ${borderStyle}: ${attrType.replace('!', '')}${sourceWithImportant};
        ${borderWidth}: var(--size-${attrSize.replace('!', '')})${sizeWithImportant};
        ${borderColor}: var(--${attrColor.replace('!', '')})${colorWithImportant};
      }
    `;
  }
}
