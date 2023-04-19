import {
  UiClassName,
  StyleStates,
  UiStates,
  UiPseudoState,
  UiToggleSelectedRef,
  ToggleEvents,
  UiSpacing,
  UiSpacingTypes,
  UiAnimateState,
  UiBreakpointState,
  UiBreakpoint,
  Breakpoint,
  UiIconBreakpoint,
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

  public uiBreakpoint?: UiBreakpoint;
  public uiBreakpointStates?: UiBreakpointState;
  public iconBreakpoint?: UiIconBreakpoint;

  public uiSpacing?: UiSpacing;

  public uiAnimate?: string;

  public uiAnimateStates?: UiAnimateState;

  public async toggleStyles(toggleGroup: CBox.Ref | null) {
    (await import('./helpers/box-toggles')).BoxToggle.toggleStyles(this, toggleGroup);
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

  // fix xs = 0 - 600 px. in the future the breakpoint will set in theme
  set ['ui-xs'](value: string[]) {
    this.setBreakpoint(value, 'xs');
  }

  set ['ui-xs-active'](value: string[]) {
    this.setBreakpoint(value, 'xs', 'active');
  }

  set ['ui-xs-focus'](value: string[]) {
    this.setBreakpoint(value, 'xs', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-xs-focus-visible'](value: string[]) {
    this.setBreakpoint(value, 'xs', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-xs-focus-within'](value: string[]) {
    this.setBreakpoint(value, 'xs', 'focus-within');
  }

  set ['ui-xs-hover'](value: string[]) {
    this.setBreakpoint(value, 'xs', 'hover');
  }

  set ['ui-xs-target'](value: string[]) {
    this.setBreakpoint(value, 'xs', 'target');
  }

  set ['ui-xs-toggle'](value: string[]) {
    this.setBreakpoint(value, 'xs', 'toggle');
  }

  // ___
  set ['ui-sm'](value: string[]) {
    this.setBreakpoint(value, 'sm');
  }

  set ['ui-sm-active'](value: string[]) {
    this.setBreakpoint(value, 'sm', 'active');
  }

  set ['ui-sm-focus'](value: string[]) {
    this.setBreakpoint(value, 'sm', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-sm-focus-visible'](value: string[]) {
    this.setBreakpoint(value, 'sm', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-sm-focus-within'](value: string[]) {
    this.setBreakpoint(value, 'sm', 'focus-within');
  }

  set ['ui-sm-hover'](value: string[]) {
    this.setBreakpoint(value, 'sm', 'hover');
  }

  set ['ui-sm-target'](value: string[]) {
    this.setBreakpoint(value, 'sm', 'target');
  }

  set ['ui-sm-toggle'](value: string[]) {
    this.setBreakpoint(value, 'sm', 'toggle');
  }

  // __
  set ['ui-md'](value: string[]) {
    this.setBreakpoint(value, 'md');
  }

  set ['ui-md-active'](value: string[]) {
    this.setBreakpoint(value, 'md', 'active');
  }

  set ['ui-md-focus'](value: string[]) {
    this.setBreakpoint(value, 'md', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-md-focus-visible'](value: string[]) {
    this.setBreakpoint(value, 'md', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-md-focus-within'](value: string[]) {
    this.setBreakpoint(value, 'md', 'focus-within');
  }

  set ['ui-md-hover'](value: string[]) {
    this.setBreakpoint(value, 'md', 'hover');
  }

  set ['ui-md-target'](value: string[]) {
    this.setBreakpoint(value, 'md', 'target');
  }

  set ['ui-md-toggle'](value: string[]) {
    this.setBreakpoint(value, 'md', 'toggle');
  }

  //

  set ['ui-lg'](value: string[]) {
    this.setBreakpoint(value, 'lg');
  }

  set ['ui-lg-active'](value: string[]) {
    this.setBreakpoint(value, 'lg', 'active');
  }

  set ['ui-lg-focus'](value: string[]) {
    this.setBreakpoint(value, 'lg', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-lg-focus-visible'](value: string[]) {
    this.setBreakpoint(value, 'lg', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-lg-focus-within'](value: string[]) {
    this.setBreakpoint(value, 'lg', 'focus-within');
  }

  set ['ui-lg-hover'](value: string[]) {
    this.setBreakpoint(value, 'lg', 'hover');
  }

  set ['ui-lg-target'](value: string[]) {
    this.setBreakpoint(value, 'lg', 'target');
  }

  set ['ui-lg-toggle'](value: string[]) {
    this.setBreakpoint(value, 'lg', 'toggle');
  }

  // __
  set ['ui-xl'](value: string[]) {
    this.setBreakpoint(value, 'xl');
  }

  set ['ui-xl-active'](value: string[]) {
    this.setBreakpoint(value, 'xl', 'active');
  }

  set ['ui-xl-focus'](value: string[]) {
    this.setBreakpoint(value, 'xl', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-xl-focus-visible'](value: string[]) {
    this.setBreakpoint(value, 'xl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-xl-focus-within'](value: string[]) {
    this.setBreakpoint(value, 'xl', 'focus-within');
  }

  set ['ui-xl-hover'](value: string[]) {
    this.setBreakpoint(value, 'xl', 'hover');
  }

  set ['ui-xl-target'](value: string[]) {
    this.setBreakpoint(value, 'xl', 'target');
  }

  set ['ui-xl-toggle'](value: string[]) {
    this.setBreakpoint(value, 'xl', 'toggle');
  }

  // __
  set ['ui-xxl'](value: string[]) {
    this.setBreakpoint(value, 'xxl');
  }

  set ['ui-xxl-active'](value: string[]) {
    this.setBreakpoint(value, 'xxl', 'active');
  }

  set ['ui-xxl-focus'](value: string[]) {
    this.setBreakpoint(value, 'xxl', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-xxl-focus-visible'](value: string[]) {
    this.setBreakpoint(value, 'xxl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-xxl-focus-within'](value: string[]) {
    this.setBreakpoint(value, 'xxl', 'focus-within');
  }

  set ['ui-xxl-hover'](value: string[]) {
    this.setBreakpoint(value, 'xxl', 'hover');
  }

  set ['ui-xxl-target'](value: string[]) {
    this.setBreakpoint(value, 'xxl', 'target');
  }

  set ['ui-xxl-toggle'](value: string[]) {
    this.setBreakpoint(value, 'xxl', 'toggle');
  }

  // ui animate
  set ['ui-animate'](value: string[]) {
    this.setAnimation(value);
  }

  set ['ui-animate-toggle'](value: string[]) {
    this.setAnimation(value, 'toggle');
  }

  set ['ui-animate-active'](value: string[]) {
    this.setAnimation(value, 'active');
  }

  set ['ui-animate-focus'](value: string[]) {
    this.setAnimation(value, 'focus');
    this.tabIndex = 0;
  }

  set ['ui-animate-focus-within'](value: string[]) {
    this.setAnimation(value, 'focus-within');
  }

  set ['ui-animate-focus-visible'](value: string[]) {
    this.setAnimation(value, 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-animate-hover'](value: string[]) {
    this.setAnimation(value, 'hover');
  }

  set ['ui-animate-target'](value: string[]) {
    this.setAnimation(value, 'target');
  }

  public async setAnimation(value: string[], state?: StyleStates) {
    (await import('./styles-scope/styles-animate')).StylesAnimate.animate(this, value, state);
  }

  public async setBreakpoint(value: string[], breakpoint: Breakpoint, state?: StyleStates) {
    (await import('./styles-scope-breakpoint/styles-scope-breakpoint')).StylesScopeBreakpoint.scope(
      breakpoint,
      value,
      this,
      state
    );
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
    this.setIcon(value);
  }

  set ['icon-toggle'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, 'toggle');
  }

  set ['icon-active'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, 'active');
  }

  set ['icon-focus'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, 'focus');
    this.tabIndex = 0;
  }

  set ['icon-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, 'focus-within');
  }

  set ['icon-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, 'focus-visible');
    this.tabIndex = 0;
  }

  set ['icon-hover'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, 'hover');
  }

  set ['icon-target'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, 'target');
  }

  // icon xs
  set ['icon-xs'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xs');
  }

  set ['icon-xs-active'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xs', 'active');
  }

  set ['icon-xs-focus'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xs', 'focus');
    this.tabIndex = 0;
  }

  set ['icon-xs-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xs', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['icon-xs-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xs', 'focus-within');
  }

  set ['icon-xs-hover'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xs', 'hover');
  }

  set ['icon-xs-target'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xs', 'target');
  }

  set ['icon-xs-toggle'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xs', 'toggle');
  }

  // icon sm
  set ['icon-sm'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'sm');
  }

  set ['icon-sm-active'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'sm', 'active');
  }

  set ['icon-sm-focus'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'sm', 'focus');
    this.tabIndex = 0;
  }

  set ['icon-sm-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'sm', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['icon-sm-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'sm', 'focus-within');
  }

  set ['icon-sm-hover'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'sm', 'hover');
  }

  set ['icon-sm-target'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'sm', 'target');
  }

  set ['icon-sm-toggle'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'sm', 'toggle');
  }

  // icon md
  set ['icon-md'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'md');
  }

  set ['icon-md-active'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'md', 'active');
  }

  set ['icon-md-focus'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'md', 'focus');
    this.tabIndex = 0;
  }

  set ['icon-md-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'md', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['icon-md-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'md', 'focus-within');
  }

  set ['icon-md-hover'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'md', 'hover');
  }

  set ['icon-md-target'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'md', 'target');
  }

  set ['icon-md-toggle'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'md', 'toggle');
  }

  // icon lg
  set ['icon-lg'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'lg');
  }

  set ['icon-lg-active'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'lg', 'active');
  }

  set ['icon-lg-focus'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'lg', 'focus');
    this.tabIndex = 0;
  }

  set ['icon-lg-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'lg', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['icon-lg-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'lg', 'focus-within');
  }

  set ['icon-lg-hover'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'lg', 'hover');
  }

  set ['icon-lg-target'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'lg', 'target');
  }

  set ['icon-lg-toggle'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'lg', 'toggle');
  }

  // icon xl
  set ['icon-xl'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xl');
  }

  set ['icon-xl-active'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xl', 'active');
  }

  set ['icon-xl-focus'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xl', 'focus');
    this.tabIndex = 0;
  }

  set ['icon-xl-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['icon-xl-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xl', 'focus-within');
  }

  set ['icon-xl-hover'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xl', 'hover');
  }

  set ['icon-xl-target'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xl', 'target');
  }

  set ['icon-xl-toggle'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xl', 'toggle');
  }

  // icon xxl
  set ['icon-xxl'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xxl');
  }

  set ['icon-xxl-active'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xxl', 'active');
  }

  set ['icon-xxl-focus'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xxl', 'focus');
    this.tabIndex = 0;
  }

  set ['icon-xxl-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xxl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['icon-xxl-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xxl', 'focus-within');
  }

  set ['icon-xxl-hover'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xxl', 'hover');
  }

  set ['icon-xxl-target'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xxl', 'target');
  }

  set ['icon-xxl-toggle'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xxl', 'toggle');
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
    console.log('c-box.js |this.iconBreakpoint| = ', this.iconBreakpoint);
    // may be dirty but this can improve dom. *remove all whitespace without using helper function.
    this.styleElement.textContent = `:host{display:block}${
      this.uiStyles ? Object.values(this.uiStyles).join('') : ''
    }${
      this.uiStates
        ? Object.values(this.uiStates)
            .map((states) => Object.values(states)[0])
            .join('')
        : ''
    }${this.iconStyles ? Object.values(this.iconStyles).join('') : ''}${
      this.uiBefore ? Object.values(this.uiBefore).join('') : ''
    }${this.uiAfter ? Object.values(this.uiAfter).join('') : ''}${
      this.uiSpacing ? Object.values(this.uiSpacing).join('') : ''
    }${this.uiAnimateStates ? Object.values(this.uiAnimateStates).join('') : ''}${
      this.uiBreakpoint
        ? Object.values(this.uiBreakpoint)
            .flatMap((styles) => Object.values(styles!))
            .join('')
        : ''
    }${
      this.uiBreakpointStates
        ? Object.values(this.uiBreakpointStates)
            .flatMap((breakpointObj) => Object.values(breakpointObj!))
            .flatMap((stateObj) => Object.values(stateObj))
            .join('')
        : ''
    }${
      this.iconBreakpoint
        ? Object.values(this.iconBreakpoint)
            .flatMap((res) => Object.values(res!))
            .join('')
        : ''
    }}}
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

  async setIcon(value: string | string[], state?: StyleStates) {
    const { StylesIcon } = await import('./styles-scope/styles-icon');
    StylesIcon.scope(value, this, state);
  }

  async setIconBreakpoint(value: string | string[], breakpoint: Breakpoint, state?: StyleStates) {
    (await import('./styles-scope-breakpoint/styles-icon-breakpoint')).StylesIconBreakpoint.scope(
      breakpoint,
      value,
      this,
      state
    );
  }
}

customElements.define('c-box', CBox);

declare global {
  namespace CBox {
    type Ref = CBox;
  }
}
