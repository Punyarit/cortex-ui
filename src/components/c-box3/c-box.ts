import { stylesMapper } from './styles-mapper/styles-mapper';
import { UiClassName, StyleStates, UiStates } from './types/c-box.types';

export class CBox extends HTMLElement {
  public uiStyles?: UiClassName;
  public uiStates?: UiStates;

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

  public updateStyles() {
    this.styleElement.textContent = `
      :host{display:block}
      ${this.uiStyles ? Object.values(this.uiStyles).join('') : ''}
      ${this.uiStates?.active ? Object.values(this.uiStates.active).join('') : ''}
      ${this.uiStates?.focus ? Object.values(this.uiStates.focus).join('') : ''}
      ${
        this.uiStates?.['focus-within'] ? Object.values(this.uiStates['focus-within']).join('') : ''
      }
      ${
        this.uiStates?.['focus-visible']
          ? Object.values(this.uiStates['focus-visible']).join('')
          : ''
      }
      ${this.uiStates?.hover ? Object.values(this.uiStates.hover).join('') : ''}
      ${this.uiStates?.target ? Object.values(this.uiStates.target).join('') : ''}
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
