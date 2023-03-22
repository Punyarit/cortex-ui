import { stylesMapper } from '../../styles-mapper/styles-mapper';
import { CBoxUiAttribute } from '../../types/attribute-changed.types';
import { UIScopedStyles } from '../UIScopedStyles';
export class UIAttribute {
  constructor(private attr: string, private box: CBoxUiAttribute, private value: string) {}
  init() {
    UIScopedStyles.setStylesheet();
    if (!this.value) return;
    const styles = this.value?.split(',')?.map((style) => style.trim());

    for (const style of styles) {
      const [uiName, uiStyle] = style?.split(':').map((s) => s.trim());

      if (uiName && uiStyle) {
        const styleText = uiStyle
          .split(' ')
          .filter(Boolean)
          .map((s) => {
            const styleProp = stylesMapper.get(`c-box[${s.replace('!', '').trim()}]`);
            return styleProp ? `${styleProp}${s.endsWith('!') ? '!important' : ''};` : '';
          })
          .join('');

        UIScopedStyles.scopeStyles(styleText, this.box, uiName, this.attr);
      }
    }

    const uiAttrValue = styles.map((s) => s.split(':')[0].trim()).join(' ');
    this.box.setAttribute(`_${this.attr}`, uiAttrValue);
    this.box.removeAttribute(this.attr);
  }
}
