import { stylesMapper } from './styles-mapper/styles-mapper';
import { getStyleResult } from './helper/getStyleResult';

export class Div2 extends HTMLElement {
  private styleSheet = new CSSStyleSheet();

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(document.createElement('slot'));
    shadowRoot.adoptedStyleSheets = [this.styleSheet];
  }

  set $(value: string) {}

  set $style(value: string) {
    console.log('div2.js |123| = ', 123);
    const sxGroup = this.parseStyleString(value);
    let classList = '';
    let styleList = '';
    for (const className in sxGroup) {
      const styles = sxGroup[className];
      switch (className) {
        case 'active':
        case 'focus':
        case 'focus-within':
        case 'focus-visible':
        case 'hover':
        case 'target':
          const cssStateResult = `:host(:${className}){${this.getCssResult(styles)}}`;
          styleList += cssStateResult + ' ';
          break;

        default:
          const cssResult = `:host(.${className}){${this.getCssResult(styles)}}`;
          styleList += cssResult + ' ';
          classList += className + ' ';
          break;
      }
    }
    this.className = classList;
    this.styleSheet.replaceSync(styleList);
  }

  parseStyleString(styleString: string) {
    const styles = {} as Record<string, string>;
    const styleDeclarations = styleString.trim().split(';');

    for (let i = 0, len = styleDeclarations.length; i < len; ++i) {
      const styleDeclaration = styleDeclarations[i].trim();

      if (styleDeclaration) {
        const [key, value] = styleDeclaration.split(':');
        styles[key.trim()] = value.trim();
      }
    }

    return styles;
  }

  getCssResult(styleValue: string) {
    return styleValue
      .split(' ')
      .filter(Boolean)
      .map((s, index) => {
        if (s.includes('$')) {
          const str = s.replace('$', '');
          let styleResult = stylesMapper.get(`c-div[${str.replace('!', '').trim()}]`);
          if (!styleResult) {
            const [attr1, attr2, attr3] = str.split('-') as [string, string, string | undefined];
            styleResult = getStyleResult(str, attr1, attr2, attr3);
          }
          const [styleAttr, styleValue] = styleResult!.split(':');
          // create function that find variable name
          const variableName = styleAttr.replace(/-([a-z])/g, (_, match) => match.toUpperCase());
          const setter = `$${variableName}`;
          Object.defineProperty(this, setter, {
            set: (value: string) => {
              // if (variableName === 'fontSize') { font size display by theme}
              this.style.setProperty(`--${variableName}`, value);
            },
          });
          this.style.setProperty(`--${variableName}`, styleValue);
          return `${styleAttr}: var(--${variableName})${s.endsWith('!') ? '!important' : ''};`;
        } else {
          let styleResult = stylesMapper.get(`c-div[${s.replace('!', '').trim()}]`);
          if (!styleResult) {
            const [attr1, attr2, attr3] = s.split('-') as [string, string, string | undefined];
            styleResult = getStyleResult(s, attr1, attr2, attr3);
          }

          return styleResult ? `${styleResult}${s.endsWith('!') ? '!important' : ''};` : '';
        }
      })
      .join('');
  }
}

customElements.define('cx-box', Div2);
