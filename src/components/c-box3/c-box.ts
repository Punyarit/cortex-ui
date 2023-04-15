import {
  UiClassName,
  StyleStates,
  UiStates,
  UiPseudoState,
  UiToggleSelectedRef,
  ToggleEvents,
  UiSpacing,
  UiSpacingTypes,
} from './types/c-box.types';

export class CBox extends HTMLElement {
  public uiStyles?: UiClassName;
  public uiBefore?: UiPseudoState;
  public uiAfter?: UiPseudoState;
  public uiStates?: UiStates;
  public uiClassNames?: Record<string, string[]>;
  public iconStyles?: UiClassName;

  public uiToggleSelectedRef?: UiToggleSelectedRef;

  public toggleEvents?: ToggleEvents;
  public cacheToggleEvents?: ToggleEvents;
  public isToggleDirty?: boolean;

  public uiSpacing?: UiSpacing;

  public uiAnimate?: any;
  public async toggleStyles(toggleGroup: CBox.Ref | null) {
    (await import('./styles-toggle/box-toggles')).BoxToggle.toggleStyles(this, toggleGroup);
  }

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

  set ['ui-animate'](value: string[]) {
    this.setAnimation(value);
  }

  public async setAnimation(value: string[]) {
    (await import('./styles-scope/styles-animate')).StylesAnimate.animate(this, value);
  }

  set ui(value: string | string[]) {
    if (!value) return;
    this.uiStyles = {};
    this.setUi(value, this);
  }

  set ['ui-toggle'](value: string | string[]) {
    if (!value) return;
    this.checkState('toggle');
    this.setUi(value, this, 'toggle');
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

  // icon
  set icon(value: string | string[]) {
    if (!value) return;
    this.setIcon(value, this);
  }

  set ['icon-toggle'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, this, 'toggle');
  }

  set ['icon-active'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, this, 'active');
  }

  set ['icon-focus'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, this, 'focus');
    this.tabIndex = 0;
  }

  set ['icon-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, this, 'focus-within');
  }

  set ['icon-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, this, 'focus-visible');
    this.tabIndex = 0;
  }

  set ['icon-hover'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, this, 'hover');
  }

  set ['icon-target'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, this, 'target');
  }

  // before
  set ['ui-before'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'before');
  }

  set ['ui-before-toggle'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'before', 'toggle');
  }

  set ['ui-before-active'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'before', 'active');
  }

  set ['ui-before-focus'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'before', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-before-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'before', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-before-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'before', 'focus-within');
  }

  set ['ui-before-hover'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'before', 'hover');
  }

  set ['ui-before-target'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'before', 'target');
  }

  // after
  set ['ui-after'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'after');
  }
  set ['ui-after-toggle'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'after', 'toggle');
  }

  set ['ui-after-active'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'after', 'active');
  }

  set ['ui-after-focus'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'after', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-after-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'after', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-after-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'after', 'focus-within');
  }

  set ['ui-after-hover'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'after', 'hover');
  }

  set ['ui-after-target'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'after', 'target');
  }

  // spacing
  set w(value: string) {
    this.setSpacing(value, 'width', 'w');
  }

  set ['max-w'](value: string) {
    this.setSpacing(value, 'max-width', 'max-w');
  }

  set ['min-w'](value: string) {
    this.setSpacing(value, 'min-width', 'min-w');
  }

  set h(value: string) {
    this.setSpacing(value, 'height', 'h');
  }

  set ['max-h'](value: string) {
    this.setSpacing(value, 'max-height', 'max-h');
  }

  set ['min-h'](value: string) {
    this.setSpacing(value, 'min-height', 'min-h');
  }

  set p(value: string) {
    this.setSpacing(value, 'padding', 'p');
  }

  set pl(value: string) {
    this.setSpacing(value, 'padding-left', 'pl');
  }

  set pt(value: string) {
    this.setSpacing(value, 'padding-top', 'pt');
  }

  set pr(value: string) {
    this.setSpacing(value, 'padding-right', 'pr');
  }

  set pb(value: string) {
    this.setSpacing(value, 'padding-bottom', 'pb');
  }

  set px(value: string) {
    this.setSpacing(value, ['padding-left', 'padding-right'], 'px', 'padding-x');
  }

  set py(value: string) {
    this.setSpacing(value, ['padding-top', 'padding-bottom'], 'py', 'padding-y');
  }

  set m(value: string) {
    this.setSpacing(value, 'margin', 'm');
  }

  set ml(value: string) {
    this.setSpacing(value, 'margin-left', 'ml');
  }

  // the mt property sometimes not working. it may be related to collapsing margins.
  // workaround add: inline-block / transition to target element
  set mt(value: string) {
    this.setSpacing(value, 'margin-top', 'mt');
  }

  set mr(value: string) {
    this.setSpacing(value, 'margin-right', 'mr');
  }

  set mb(value: string) {
    this.setSpacing(value, 'margin-bottom', 'mb');
  }

  set mx(value: string) {
    this.setSpacing(value, ['margin-left', 'margin-right'], 'mx', 'margin-x');
  }

  set my(value: string) {
    this.setSpacing(value, ['margin-top', 'margin-bottom'], 'my', 'margin-y');
  }

  public async setSpacing(
    value: string,
    style: UiSpacingTypes | UiSpacingTypes | UiSpacingTypes[],
    attr: string,
    axis?: 'margin-x' | 'margin-y' | 'padding-x' | 'padding-y'
  ) {
    if (!value) return;
    (await import('./styles-scope/styles-attributes')).StylesAttributes.setSpacing(
      this,
      value,
      style,
      attr,
      axis
    );
  }

  public updateStyles() {
    // may be dirty but this can improve dom. *remove all whitespace without using helper function.
    this.styleElement.textContent = `:host{display:block}${
      this.uiStyles ? Object.values(this.uiStyles).join('') : ''
    }${this.uiStates?.active ? Object.values(this.uiStates.active).join('') : ''}${
      this.uiStates?.focus ? Object.values(this.uiStates.focus).join('') : ''
    }${
      this.uiStates?.['focus-within'] ? Object.values(this.uiStates['focus-within']).join('') : ''
    }${
      this.uiStates?.['focus-visible'] ? Object.values(this.uiStates['focus-visible']).join('') : ''
    }${this.uiStates?.hover ? Object.values(this.uiStates.hover).join('') : ''}${
      this.uiStates?.target ? Object.values(this.uiStates.target).join('') : ''
    }${this.uiStates?.toggle ? Object.values(this.uiStates.toggle).join('') : ''}${
      this.iconStyles ? Object.values(this.iconStyles).join('') : ''
    }${this.uiBefore ? Object.values(this.uiBefore).join('') : ''}${
      this.uiAfter ? Object.values(this.uiAfter).join('') : ''
    }${this.uiSpacing?.width || ''}${this.uiSpacing?.height || ''}${this.uiSpacing?.padding || ''}${
      this.uiSpacing?.['padding-left'] || ''
    }${this.uiSpacing?.['padding-top'] || ''}${this.uiSpacing?.['padding-right'] || ''}${
      this.uiSpacing?.['padding-bottom'] || ''
    }${this.uiSpacing?.margin || ''}${this.uiSpacing?.['margin-left'] || ''}${
      this.uiSpacing?.['margin-top'] || ''
    }${this.uiSpacing?.['margin-right'] || ''}${this.uiSpacing?.['margin-bottom'] || ''}${
      this.uiSpacing?.['margin-x'] || ''
    }${this.uiSpacing?.['margin-y'] || ''}${this.uiSpacing?.['padding-x'] || ''}${
      this.uiSpacing?.['padding-y'] || ''
    }${this.uiSpacing?.['max-width'] || ''}${this.uiSpacing?.['max-height'] || ''}${
      this.uiSpacing?.['min-width'] || ''
    }${this.uiSpacing?.['min-height'] || ''}${this.uiAnimate || ''}}
    `;
  }

  private checkState(state: StyleStates) {
    if (!this.uiStates?.[state]) {
      this.uiStates ||= {};
    }
    this.uiStates[state] = {};
  }

  async setUi(value: string | string[], box: CBox.Ref, state?: StyleStates) {
    const { StylesScope } = await import('./styles-scope/styles-scope');
    StylesScope.scope(value, box, state);
  }

  async setPseudoUi(
    value: string | string[],
    box: CBox.Ref,
    pseudo: 'before' | 'after',
    state?: StyleStates
  ) {
    const { StylesPseudo } = await import('./styles-scope/styles-pseudo');
    StylesPseudo.scope(value, box, pseudo, state);
  }

  async setIcon(value: string | string[], box: CBox.Ref, state?: StyleStates) {
    const { StylesIcon } = await import('./styles-scope/styles-icon');
    StylesIcon.scope(value, box, state);
  }
}

customElements.define('c-box', CBox);

declare global {
  namespace CBox {
    type Ref = CBox;
  }
}
