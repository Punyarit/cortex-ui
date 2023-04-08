import { stylesMapper } from './styles-mapper/styles-mapper';
import { UiClassName, StyleStates, UiStates } from './types/c-box.types';

export class CBox extends HTMLElement {
  public uiStyles?: UiClassName;
  public uiStates?: UiStates;

  public iconStyles?: UiClassName;

  private styleElement: HTMLStyleElement;
  constructor() {
    super();
    // create shadow root
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.styleElement = document.createElement('style');
    this.styleElement.textContent = ':host{display:block}';
    const slot = document.createElement('slot');
    shadowRoot.appendChild(this.styleElement);
    shadowRoot.appendChild(slot);
  }

  set ui(value: string | string[]) {
    if (!value) return;
    this.uiStyles ||= {};
    this.setUi(value, this);
  }

  set ['ui-active'](value: string | string[]) {
    if (!value) return;
    this.checkState('active');
    this.setUi(value, this, 'active');
  }

  set ['ui-focus'](value: string | string[]) {
    if (!value) return;
    this.checkState('focus');
    this.setUi(value, this, 'focus');
    this.tabIndex = 0;
  }

  //📌 Apply styles to the outer element (parent element) when the focus-element (child element) is focused
  set ['ui-focus-within'](value: string | string[]) {
    if (!value) return;
    this.checkState('focus-within');
    this.setUi(value, this, 'focus-within');
  }

  // 📌 Apply style when element is focused via keyboard or non-mouse interaction
  set ['ui-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.checkState('focus-visible');
    this.setUi(value, this, 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-hover'](value: string | string[]) {
    if (!value) return;
    this.checkState('hover');
    this.setUi(value, this, 'hover');
  }

  set ['ui-target'](value: string | string[]) {
    if (!value) return;
    this.checkState('target');
    this.setUi(value, this, 'target');
  }

  set icon(value: string | string[]) {
    if (!value) return;
    this.iconStyles ||= {};

    let styles: string[];
    if (typeof value === 'string') {
      styles = value?.split(',')?.map((style) => style.trim());
    } else if (Array.isArray(value)) {
      styles = value;
    } else {
      throw SyntaxError('Icon properties can only have a type of string or string[].');
    }

    // for (let index = 0; index < styles.length; ++index) {
    //   const [iconName, iconStyle] = styles[index].split(':').map((s) => s.trim());
    //   if (iconName && iconStyle) {
    //     const [size, color, side] = iconStyle.split(' ');
    //     const sizeImportant = size.endsWith('!') ? '!important' : '';
    //     const colorImportant = color.endsWith('!') ? '!important' : '';
    //     const iconSide = side ? side : 'before';
    //     const iconClassName = `${iconName}__${iconSide}`;

    //     this.iconStyles[iconClassName] = `:host(.${iconClassName})::${iconSide}{
    //       content: '\uE800';
    //       font-family: ${iconName};
    //       font-size: var(--size-${size.replace('!', '')})${sizeImportant};
    //       color: var(--${color.replace('!', '')})${colorImportant};
    //     }`;

    //     className += (className ? ' ' : '') + iconClassName;
    //   }
    // }

    let className = '';
    // create dynamic style
    for (let index = 0; index < styles.length; ++index) {
      const [iconName, style] = styles[index].split(':').map((s) => s.trim());
      if (iconName && style) {
        let iconSide = '';
        const cssText = style
          .split(' ')
          .filter((s) => {
            if (s === 'before' || s === 'after') {
              iconSide = s;
              return false;
            } else {
              return true;
            }
          })
          .map((s) => {
            const styleProp = stylesMapper.get(`c-box[${s.replace('!', '').trim()}]`);
            return styleProp ? `${styleProp}${s.endsWith('!') ? '!important' : ''};` : '';
          })
          .join('');
        const iconClassName = `${iconName}__${iconSide}`;
        className += (className ? ' ' : '') + iconClassName;
        this.iconStyles[iconClassName] = `:host(.${iconClassName})::${iconSide}{content: '\uE800';font-family: ${iconName};${cssText}}`;
      }
    }

    this.className = className;
    this.updateStyles();
  }
  public updateStyles() {
    // may be dirty but this can improve dom. *remove all whitespace without using helper function.
    this.styleElement.textContent = `:host{display:block}${this.uiStyles ? Object.values(this.uiStyles).join('') : ''}${this.uiStates?.active ? Object.values(this.uiStates.active).join('') : ''}${this.uiStates?.focus ? Object.values(this.uiStates.focus).join('') : ''}${
        this.uiStates?.['focus-within'] ? Object.values(this.uiStates['focus-within']).join('') : ''
      }${
        this.uiStates?.['focus-visible']
          ? Object.values(this.uiStates['focus-visible']).join('')
          : ''
      }${this.uiStates?.hover ? Object.values(this.uiStates.hover).join('') : ''}${this.uiStates?.target ? Object.values(this.uiStates.target).join('') : ''}${this.iconStyles ? Object.values(this.iconStyles).join('') : ''}}
    `;
  }

  private checkState(state?: StyleStates) {
    if (state && !this.uiStates?.[state]) {
      this.uiStates ||= {};
      this.uiStates[state] = {};
    }
  }

  async setUi(value: string | string[], box: CBox.Ref, state?: StyleStates) {
    const { StylesScoper } = await import('./styles-scoper/styles-scoper');
    StylesScoper.scope(value, box, state);
  }
}

customElements.define('c-box', CBox);

declare global {
  namespace CBox {
    type Ref = CBox;
  }
}
