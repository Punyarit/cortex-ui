import { appendSlot } from './helpers/appendSlot';
import { getAttrStyle } from './helpers/getAttrStyle';
import { getCssResult } from './helpers/getCssResult';
import { getMediaRuleValue } from './helpers/getMediaRuleValue';
import { parseStyleString } from './helpers/parseStyleString';
import { Theme } from '../theme/theme';
import { throwUnableModifyValue } from './helpers/throwUnableModifyValue';
import { AllCombinations, AttrStyle, CssType } from './types/box.types';
import { setStyleProperty } from './helpers/setStyleProperty';
import { svgStateStates } from './styles-mapper/svg-state';

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
    console.log('box.js |this.styleSheet| = ', this.styleSheet);
    if (this.styleSheet.cssRules.length) throwUnableModifyValue('css');

    let styleList = '';
    let classList = '';
    for (const styleType in styles) {
      const [type, attr1, attr2, attr3] = styleType.split('_');
      const attr1val = attr2 === 'visible' || attr2 === 'within' ? `${attr1}-${attr2}` : attr1;
      const attr2val = attr2 === 'visible' || attr2 === 'within' ? attr3 : attr2;

      const styleValue = styles[styleType as keyof CXBox.Styles];
      const styleGroup = parseStyleString(styleValue!);
      const attrStyle1 = getAttrStyle(attr1val as AttrStyle);
      const attrStyle2 = getAttrStyle(attr2val as AttrStyle);
      const attr1IsState = attrStyle1 && attrStyle1?.length <= 14;
      switch (type as CssType) {
        case 'class':
          for (let index = 0; index < styleGroup.length; ++index) {
            const [className, styleName] = styleGroup[index];
            const mediaRule = getMediaRuleValue(attrStyle1, attrStyle2);
            const cssResult = getCssResult(this, styleName, type, attr1val, attr2val);
            const styleText = `${mediaRule ? `${mediaRule}{` : ''}:host(.${className}${
              attr1IsState ? attrStyle1 : ''
            }){${cssResult}}${mediaRule ? '}' : ''}`;
            styleList += styleText + ' ';
            classList += className + ' ';
          }
          break;
        case 'svg':
          for (let mainIndex = 0; mainIndex < styleGroup.length; ++mainIndex) {
            const [svgType, styleName] = styleGroup[mainIndex];
            const cssResult = getCssResult(this, styleName, type, attr1val, attr2val);
            if (mainIndex === 0 && svgType.startsWith('<svg')) {
              const svg = new DOMParser().parseFromString(svgType, 'image/svg+xml').documentElement;

              if (attr1IsState === true) {
                svg.setAttribute('state', attr1val!);
              }
              this.shadowRoot?.appendChild(svg);
              styleList += `:host svg{${cssResult}}${svgStateStates[attr1IsState ? attr1val : '']}`;
            } else {
              styleList += `:host${attr1IsState ? `(${attrStyle1})` : ``} ${svgType}{${cssResult}}`;
            }
          }
          break;
        default:
          throw new SyntaxError(`No css type "${type}"`);
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
