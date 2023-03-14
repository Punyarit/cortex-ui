import { stylesMapper } from '../../styles-mapper/styles-mapper';

export class UIAttribute {
  private uiNameIndex = {} as { [uiName: string]: number };
  constructor(
    private box: HTMLElement,
    private value: string,
    private state?: 'active' | 'focus' | 'focus-within' | 'focus-visible' | 'hover' | 'target'
  ) {}
  init() {
    let isUpdated = false;

    let uiAttr = `${this.state ? 'ui-' + this.state : 'ui'}`;

    const styles = this.value.split(',').map((style) => style.trim());

    for (const style of styles) {
      const [uiName, uiStyle] = style.split(':').map((s) => s.trim());

      if (uiName && uiStyle) {
        const styleText = uiStyle
          .split(' ')
          .filter(Boolean)
          .map((s) => {
            const styleProp = stylesMapper.get(`c-box[${s.replace('!', '').trim()}]`);
            return styleProp ? `${styleProp}${s.endsWith('!') ? '!important' : ''};` : '';
          })
          .join('');

        if (styleText) {
          const styleSheet = this.box.shadowRoot!.styleSheets[0];

          const rule = `:host([_${uiAttr}~="${uiName}"]${
            this.state ? ':' + this.state : ''
          }){${styleText}}`;
          styleSheet.insertRule(rule, 0);

          if (typeof this.uiNameIndex[uiName] === 'number') {
            styleSheet.deleteRule(this.uiNameIndex[uiName]);
          }
          this.uiNameIndex[uiName] = styleSheet.cssRules.length - 1;
        }
        isUpdated = true;
      }
    }

    if (isUpdated) {
      const uiAttrValue = styles.map((s) => s.split(':')[0].trim()).join(' ');
      this.box.setAttribute(`_${uiAttr}`, uiAttrValue);
      this.box.removeAttribute(uiAttr);
    }
  }
}
