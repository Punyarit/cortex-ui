import { appendSlot } from './helpers/appendSlot';
import { getAttrStyle } from './helpers/getAttrStyle';
import { getCssResult } from './helpers/getCssResult';
import { getMediaRuleValue } from './helpers/getMediaRuleValue';
import { parseStyleString } from './helpers/parseStyleString';
import { throwUnableModifyValue } from './helpers/throwUnableModifyValue';
import { AllCombinations, AttrStyle, CssType } from './types/box.types';
export class Box extends HTMLElement {
  private styleSheet = new CSSStyleSheet();
  private sxStyleSheet?: CSSStyleSheet;
  private mainSlot = document.createElement('slot');

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.mainSlot);
    shadowRoot.adoptedStyleSheets = [this.styleSheet];
  }

  set slotOf(value: string) {
    this.slot = value;
    if (this.parentElement?.tagName === 'CX-BOX') {
      appendSlot(this.parentElement, value);
    }
  }

  set slotFor(value: string[]) {
    for (let index = 0; index < value.length; ++index) {
      appendSlot(this, value[index]);
    }
  }

  set sx(styles: string) {
    if (this.sxStyleSheet) throwUnableModifyValue('sx');
    this.sxStyleSheet = new CSSStyleSheet();
    this.sxStyleSheet.insertRule(`:host([sx]){${getCssResult(this, styles, 'sx')}}`);
    this.shadowRoot!.adoptedStyleSheets.push(this.sxStyleSheet);
    this.setAttribute('sx', '');
  }

  set css(styles: CXBox.Styles) {
    if (this.styleSheet.cssRules.length) throwUnableModifyValue('css');

    let styleList = '';
    let classList = '';
    for (const styleType in styles) {
      const [type, attr1, attr2] = styleType.split('_');
      const styleValue = styles[styleType as keyof CXBox.Styles];
      const styleGroup = parseStyleString(styleValue!);

      switch (type as CssType) {
        case 'class':
          const attrStyle1 = getAttrStyle(attr1 as AttrStyle);
          const attrStyle2 = getAttrStyle(attr2 as AttrStyle);

          for (let index = 0; index < styleGroup.length; ++index) {
            const [className, styleName] = styleGroup[index];
            const mediaRule = getMediaRuleValue(attrStyle1, attrStyle2);
            const cssResult = getCssResult(this, styleName, type, attr1, attr2);
            const styleText = `${mediaRule ? `${mediaRule}{` : ''}:host(.${className}${
              attrStyle1 && attrStyle1?.length <= 14 ? attrStyle1 : ''
            }){${cssResult}}${mediaRule ? '}' : ''}`;
            styleList += styleText + ' ';
            classList += className + ' ';
          }
          break;

        case 'icon':
          for (let index = 0; index < styleGroup.length; ++index) {
            const [iconName, styleName] = styleGroup[index];
            // @ts-ignore
            import('../../../assets/icons/svg/icon1.svg').then((res) => {
              console.log('box.js |res| = ', res);
            });
          }
          break;

        default:
          throw new SyntaxError('No css type!');
      }
    }

    this.className = classList.trim();
    this.styleSheet.replaceSync(styleList);
  }
}

customElements.define('cx-box', Box);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXBox {
    type Ref = Box;

    type Styles = Partial<Record<AllCombinations, string>>;
  }

  interface HTMLElementTagNameMap {
    ['cx-box']: CXBox.Ref;
  }
}
