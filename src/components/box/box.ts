import { getStyleResult } from './helpers/getStyleResult';
import { stylesMapper } from './styles-mapper/styles-mapper';
import { AllCombinations, AttrStyle, Breakpoint, State } from './types/box.types';
export class Box extends HTMLElement {
  private styleSheet = new CSSStyleSheet();

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(document.createElement('slot'));
    shadowRoot.adoptedStyleSheets = [this.styleSheet];
  }

  set $style(styles: CXBox.Styles) {
    let styleList = '';
    let classList = '';
    for (const styleType in styles) {
      const [type, attr1, attr2] = styleType.split('_');
      const styleValue = styles[styleType as keyof CXBox.Styles];

      switch (type as keyof CXBox.Styles) {
        case 'class':
          const attrStyle1 = this.getAttrStyle(attr1 as AttrStyle);
          const attrStyle2 = this.getAttrStyle(attr2 as AttrStyle);
          const styleGroup = this.parseStyleString(styleValue);

          for (const styleVal of styleGroup) {
            const [className, styleName] = styleVal;
            const mediaRule = this.getMediaRuleValue(attrStyle1, attrStyle2);
            const cssResult = this.getCssResult(styleName, attr1, attr2);
            const styleText = `${mediaRule ? `${mediaRule}{` : ''}:host(.${className}${
              attrStyle1 && attrStyle1?.length <= 14 ? attrStyle1 : ''
            }){${cssResult}}${mediaRule ? '}' : ''}`;
            styleList += styleText + ' ';
            classList += className + ' ';
          }

          break;

        case 'style':
          break;

        default:
          throw new SyntaxError('No style type!');
      }
    }

    this.className = classList;
    this.styleSheet.replaceSync(styleList);
  }

  parseStyleString(styleString: string) {
    const styles = [] as any;
    const styleDeclarations = styleString.trim().split(';');

    for (let i = 0, len = styleDeclarations.length; i < len; ++i) {
      const styleDeclaration = styleDeclarations[i].trim();

      if (styleDeclaration) {
        const [key, value] = styleDeclaration.split(':');
        styles[i] = [key.trim(), value.trim()];
      }
    }

    return styles;
  }

  getCssResult(styleValue: string, attr1?: string, attr2?: string) {
    return styleValue
      .split(' ')
      .filter(Boolean)
      .map((sx) => {
        if (sx.includes('$')) {
          const newSx = sx.replace('$', '');
          const [styleAttr, styleValue] = this.getStyleResult(newSx).split(':');
          const setterName = this.setStyleProperty(styleAttr, styleValue, attr1, attr2);
          return `${styleAttr}: var(--${setterName})${sx.endsWith('!') ? '!important' : ''};`;
        } else {
          const styleResult = this.getStyleResult(sx);
          return styleResult ? `${styleResult}${sx.endsWith('!') ? '!important' : ''};` : '';
        }
      })
      .join('');
  }

  setStyleProperty(styleAttr: string, styleValue: string, attr1?: string, attr2?: string) {
    const setterName = `${styleAttr.replaceAll('-', '_')}${attr1 ? `_${attr1}` : ''}${
      attr2 ? `_${attr2}` : ''
    }`;
    Object.defineProperty(this, `$${setterName}`, {
      set: (value: string) => {
        // if (styleAttr === 'fontSize') { font size display by theme}
        this.style.setProperty(`--${setterName}`, value);
      },
    });
    this.style.setProperty(`--${setterName}`, styleValue);
    return setterName;
  }

  getStyleResult(style: string): string {
    let styleResult = stylesMapper.get(`c-div[${style.replace('!', '').trim()}]`);
    if (!styleResult) {
      const [attr1, attr2, attr3] = style.split('-') as [string, string, string | undefined];
      styleResult = getStyleResult(style, attr1, attr2, attr3);
    }

    return styleResult!;
  }

  getMediaRuleValue(attrStyle1?: string, attrStyle2?: string) {
    if (attrStyle1 && attrStyle1?.length > 14) {
      return attrStyle1;
    } else if (attrStyle2 && attrStyle2?.length > 14) {
      return attrStyle2;
    }
  }

  getAttrStyle(attr: AttrStyle) {
    console.log('box.js |attr| = ', attr);
    if (!attr) return;
    switch (attr) {
      case 'active':
      case 'focus':
      case 'focus-visible':
      case 'focus-within':
      case 'hover':
      case 'target':
        return `:${attr}`;

      case 'xs':
      case 'sm':
      case 'md':
      case 'lg':
      case 'xl':
      case 'xxl':
        const breakpointValue = {
          xs: {
            min: null,
            max: 599,
          },
          sm: {
            min: 600,
            max: 959,
          },
          md: {
            min: 960,
            max: 1279,
          },
          lg: {
            min: 1280,
            max: 1919,
          },
          xl: {
            min: 1920,
            max: 2559,
          },
          xxl: {
            min: 2560,
            max: null,
          },
        };

        let mediaRule = ``;
        if (breakpointValue[attr]?.min && breakpointValue[attr]?.max) {
          mediaRule = `@media only screen and (min-width: ${breakpointValue[attr].min}px) and (max-width: ${breakpointValue[attr].max}px)`;
        } else if (!breakpointValue[attr]?.min && breakpointValue[attr]?.max) {
          mediaRule = `@media only screen and (max-width: ${breakpointValue[attr].max}px)`;
        } else if (breakpointValue[attr]?.min && !breakpointValue[attr]?.max) {
          mediaRule = `@media only screen and (min-width: ${breakpointValue[attr].min}px)`;
        }

        return mediaRule;

      default:
        throw new SyntaxError('No style attr!');
    }
  }
}

customElements.define('cx-box', Box);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXBox {
    type Ref = Box;

    type Styles = Record<AllCombinations, string>;
  }

  interface HTMLElementTagNameMap {
    ['cx-box']: CXBox.Ref;
  }
}
