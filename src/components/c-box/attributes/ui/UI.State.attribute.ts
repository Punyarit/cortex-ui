import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';
import { stylesMapper } from '../../styles-mapper/styles-mapper';
import { CBoxUiAttribute, UiStateType } from '../../types/attribute-changed.types';
import { ScopedStyle } from '../scoped/ScopedStyles'
import { UIScopedStyles } from '../scoped/UIScoped';

export class UIStateAttribute {
  constructor(
    private attr: string,
    private box: CBoxUiAttribute,
    private value: string,
    private state: UiStateType
  ) {}
  init() {
    UIScopedStyles.setStylesheet();

    const styles = this.value.split(',').map((style) => style.trim());

    for (const style of styles) {
      const [uiName, uiStyle] = style.split(':').map((s) => s.trim());

      if (uiName && uiStyle) {
        const styleText = uiStyle
          .split(' ')
          .filter(Boolean)
          .map((s) => {
            const styleProp = stylesMapper.get(`c-box[${s.replace('!', '').trim()}]`);
            return styleProp ? `${styleProp}${s?.endsWith('!') ? '!important' : ''};` : '';
          })
          .join('');

        ScopedStyle.scope('state', styleText, this.box, uiName, this.attr, this.state);
      }
    }

    const uiAttrValue = styles.map((s) => s.split(':')[0].trim()).join(' ');
    this.box.setAttribute(`_${this.attr}`, uiAttrValue);
    this.box.removeAttribute(this.attr);
  }
}
