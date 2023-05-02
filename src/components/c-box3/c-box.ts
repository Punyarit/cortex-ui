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
  UiPseudoBreakpoint,
  UiAnimateStatesBreakpoint,
  UiInput,
  UiInputBreakpoint,
} from './types/c-box.types';

export class CBox extends HTMLElement {
  public uiStyles?: UiClassName;
  public uiStylesCSSResult?: string;

  public uiStates?: UiStates;
  public uiStatesCSSResult?: string;

  public iconStyles?: UiClassName;
  public iconStylesCSSResult?: string;

  public uiBefore?: UiPseudoState;
  public uiBeforeCSSResult?: string;

  public uiAfter?: UiPseudoState;
  public uiAfterCSSResult?: string;

  public uiSpacing?: UiSpacing;
  public uiSpacingCSSResult?: string;

  public uiClassNames?: Record<string, string[]>;

  public uiToggleSelectedRef?: UiToggleSelectedRef;

  public toggleEvents?: ToggleEvents;
  public cacheToggleEvents?: ToggleEvents;
  public isToggleDirty?: boolean;

  public uiBreakpoint?: UiBreakpoint;
  public uiBreakpointCSSResult?: string;

  public uiBreakpointStates?: UiBreakpointState;
  public uiBreakpointStatesCSSResult?: string;

  public iconBreakpoint?: UiIconBreakpoint;
  public iconBreakpointCSSResult?: string;

  public uiBeforeBreakpoint?: UiPseudoBreakpoint;
  public uiBeforeBreakpointCSSResult?: string;
  public uiAfterBreakpoint?: UiPseudoBreakpoint;
  public uiAfterBreakpointCSSResult?: string;

  public uiAnimateStates?: UiAnimateState;
  public uiAnimateStatesCSSResult?: string;

  public uiAnimateStatesBreakpoint?: UiAnimateStatesBreakpoint;
  public uiAnimateStatesBreakpointCSSResult?: string;

  public uiInput?: UiInput;
  public uiInputCSSResult?: string;

  public uiInputBreakpoint?: UiInputBreakpoint;
  public uiInputBreakpointCSSResult?: string;

  public styleMap?: any;
  public styleMapCSSResult?: any;
  public slotMap?: any;
  public slotMapCSSResult?: string;

  public styleBreakpoint?: any;
  public styleBreakpointCSSResult?: string;

  public slotBreakpoint?: any;
  public slotBreakpointCSSResult?: string;

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

  set $slot(value: string | string[]) {
    this.setSlot(value);
  }

  set ['$slot-active'](value: string | string[]) {
    this.setSlot(value, 'active');
  }

  set ['$slot-focus'](value: string | string[]) {
    this.setSlot(value, 'focus');
    this.tabIndex = 0;
  }

  set ['$slot-focus-visible'](value: string | string[]) {
    this.setSlot(value, 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$slot-focus-within'](value: string | string[]) {
    this.setSlot(value, 'focus-within');
  }

  set ['$slot-hover'](value: string | string[]) {
    this.setSlot(value, 'hover');
  }

  set ['$slot-target'](value: string | string[]) {
    this.setSlot(value, 'target');
  }

  set ['$slot-toggle'](value: string | string[]) {
    this.setSlot(value, 'toggle');
  }

  // slot xs
  set ['$slot-xs'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xs');
  }
  set ['$slot-active-xs'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xs', 'active');
  }
  set ['$slot-focus-xs'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xs', 'focus');
    this.tabIndex = 0;
  }

  set ['$slot-focus-visible-xs'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xs', 'focus-visible');
    this.tabIndex = 0;
  }
  set ['$slot-focus-within-xs'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xs', 'focus-within');
  }
  set ['$slot-hover-xs'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xs', 'hover');
  }

  set ['$slot-target-xs'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xs', 'target');
  }

  set ['$slot-toggle-xs'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xs', 'toggle');
  }

  // slot sm
  set ['$slot-sm'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'sm');
  }
  set ['$slot-active-sm'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'sm', 'active');
  }
  set ['$slot-focus-sm'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'sm', 'focus');
    this.tabIndex = 0;
  }

  set ['$slot-focus-visible-sm'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'sm', 'focus-visible');
    this.tabIndex = 0;
  }
  set ['$slot-focus-within-sm'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'sm', 'focus-within');
  }
  set ['$slot-hover-sm'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'sm', 'hover');
  }

  set ['$slot-target-sm'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'sm', 'target');
  }

  set ['$slot-toggle-sm'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'sm', 'toggle');
  }

  // slot md
  set ['$slot-md'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'md');
  }
  set ['$slot-active-md'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'md', 'active');
  }
  set ['$slot-focus-md'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'md', 'focus');
    this.tabIndex = 0;
  }

  set ['$slot-focus-visible-md'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'md', 'focus-visible');
    this.tabIndex = 0;
  }
  set ['$slot-focus-within-md'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'md', 'focus-within');
  }
  set ['$slot-hover-md'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'md', 'hover');
  }

  set ['$slot-target-md'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'md', 'target');
  }

  set ['$slot-toggle-md'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'md', 'toggle');
  }

  // slot lg
  set ['$slot-lg'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'lg');
  }
  set ['$slot-active-lg'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'lg', 'active');
  }
  set ['$slot-focus-lg'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'lg', 'focus');
    this.tabIndex = 0;
  }

  set ['$slot-focus-visible-lg'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'lg', 'focus-visible');
    this.tabIndex = 0;
  }
  set ['$slot-focus-within-lg'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'lg', 'focus-within');
  }
  set ['$slot-hover-lg'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'lg', 'hover');
  }

  set ['$slot-target-lg'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'lg', 'target');
  }

  set ['$slot-toggle-lg'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'lg', 'toggle');
  }

  // slot xl
  set ['$slot-xl'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xl');
  }
  set ['$slot-active-xl'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xl', 'active');
  }
  set ['$slot-focus-xl'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xl', 'focus');
    this.tabIndex = 0;
  }

  set ['$slot-focus-visible-xl'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xl', 'focus-visible');
    this.tabIndex = 0;
  }
  set ['$slot-focus-within-xl'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xl', 'focus-within');
  }
  set ['$slot-hover-xl'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xl', 'hover');
  }

  set ['$slot-target-xl'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xl', 'target');
  }

  set ['$slot-toggle-xl'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xl', 'toggle');
  }

  // slot xxl
  set ['$slot-xxl'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xxl');
  }
  set ['$slot-active-xxl'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xxl', 'active');
  }
  set ['$slot-focus-xxl'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xxl', 'focus');
    this.tabIndex = 0;
  }

  set ['$slot-focus-visible-xxl'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xxl', 'focus-visible');
    this.tabIndex = 0;
  }
  set ['$slot-focus-within-xxl'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xxl', 'focus-within');
  }
  set ['$slot-hover-xxl'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xxl', 'hover');
  }

  set ['$slot-target-xxl'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xxl', 'target');
  }

  set ['$slot-toggle-xxl'](value: string | string[]) {
    this.setSlotBreakpoint(value, 'xxl', 'toggle');
  }
  public async setSlotBreakpoint(
    value: string | string[],
    breakpoint: Breakpoint,
    state?: StyleStates
  ) {
    await (
      await import('./styles-scope-breakpoint/slot-breakpoint')
    ).SlotBreakpoint.setHostStyle(breakpoint, value, this, state);
  }

  public async setSlot(value: string | string[], state?: StyleStates) {
    await (await import('./styles-scope/slot')).SlotMap.map(value, this, state);
  }

  set $style(value: string | string[]) {
    this.setStyleMap(value);
  }

  set ['$style-active'](value: string) {
    this.setStyleMap(value, 'active');
  }

  set ['$style-focus'](value: string) {
    this.setStyleMap(value, 'focus');
    this.tabIndex = 0;
  }

  set ['$style-focus-visible'](value: string) {
    this.setStyleMap(value, 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$style-focus-within'](value: string) {
    this.setStyleMap(value, 'focus-within');
  }

  set ['$style-hover'](value: string) {
    this.setStyleMap(value, 'hover');
  }
  set ['$style-target'](value: string) {
    this.setStyleMap(value, 'target');
  }

  set ['$style-toggle'](value: string) {
    this.setStyleMap(value, 'toggle');
  }

  // style breakpoint xs
  set ['$style-xs'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xs');
  }

  set ['$style-active-xs'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xs', 'active');
  }

  set ['$style-focus-xs'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xs', 'focus');
    this.tabIndex = 0;
  }

  set ['$style-focus-visible-xs'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xs', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$style-focus-within-xs'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xs', 'focus-within');
  }

  set ['$style-hover-xs'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xs', 'hover');
  }

  set ['$style-target-xs'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xs', 'target');
  }

  set ['$style-toggle-xs'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xs', 'toggle');
  }

  // style breakpoint sm
  set ['$style-sm'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'sm');
  }

  set ['$style-active-sm'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'sm', 'active');
  }

  set ['$style-focus-sm'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'sm', 'focus');
    this.tabIndex = 0;
  }

  set ['$style-focus-visible-sm'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'sm', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$style-focus-within-sm'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'sm', 'focus-within');
  }

  set ['$style-hover-sm'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'sm', 'hover');
  }

  set ['$style-target-sm'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'sm', 'target');
  }

  set ['$style-toggle-sm'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'sm', 'toggle');
  }

  // style breakpoint md
  set ['$style-md'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'md');
  }

  set ['$style-active-md'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'md', 'active');
  }

  set ['$style-focus-md'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'md', 'focus');
    this.tabIndex = 0;
  }

  set ['$style-focus-visible-md'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'md', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$style-focus-within-md'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'md', 'focus-within');
  }

  set ['$style-hover-md'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'md', 'hover');
  }

  set ['$style-target-md'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'md', 'target');
  }

  set ['$style-toggle-md'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'md', 'toggle');
  }

  // style breakpoint xs
  set ['$style-lg'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'lg');
  }

  set ['$style-active-lg'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'lg', 'active');
  }

  set ['$style-focus-lg'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'lg', 'focus');
    this.tabIndex = 0;
  }

  set ['$style-focus-visible-lg'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'lg', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$style-focus-within-lg'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'lg', 'focus-within');
  }

  set ['$style-hover-lg'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'lg', 'hover');
  }

  set ['$style-target-lg'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'lg', 'target');
  }

  set ['$style-toggle-lg'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'lg', 'toggle');
  }

  // style breakpoint xl
  set ['$style-xl'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xl');
  }

  set ['$style-active-xl'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xl', 'active');
  }

  set ['$style-focus-xl'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xl', 'focus');
    this.tabIndex = 0;
  }

  set ['$style-focus-visible-xl'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$style-focus-within-xl'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xl', 'focus-within');
  }

  set ['$style-hover-xl'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xl', 'hover');
  }

  set ['$style-target-xl'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xl', 'target');
  }

  set ['$style-toggle-xl'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xl', 'toggle');
  }

  // style breakpoint xxl
  set ['$style-xxl'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xxl');
  }

  set ['$style-active-xxl'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xxl', 'active');
  }

  set ['$style-focus-xxl'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xxl', 'focus');
    this.tabIndex = 0;
  }

  set ['$style-focus-visible-xxl'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xxl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$style-focus-within-xxl'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xxl', 'focus-within');
  }

  set ['$style-hover-xxl'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xxl', 'hover');
  }

  set ['$style-target-xxl'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xxl', 'target');
  }

  set ['$style-toggle-xxl'](value: string | string[]) {
    this.setStyleBreakpoint(value, 'xxl', 'toggle');
  }

  private async setStyleMap(value: string | string[], state?: StyleStates) {
    await (await import('./styles-scope/style-map')).StyleMap.style(value, this, state);
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

  // ui animate -xs
  set ['ui-animate-xs'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xs');
  }

  set ['ui-animate-xs-active'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xs', 'active');
  }

  set ['ui-animate-xs-focus'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xs', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-animate-xs-focus-visible'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xs', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-animate-xs-focus-within'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xs', 'focus-within');
  }

  set ['ui-animate-xs-hover'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xs', 'hover');
  }

  set ['ui-animate-xs-target'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xs', 'target');
  }

  set ['ui-animate-xs-toggle'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xs', 'toggle');
  }

  // ui animate -sm
  set ['ui-animate-sm'](value: string[]) {
    this.setAnimationBreakpoint(value, 'sm');
  }

  set ['ui-animate-sm-active'](value: string[]) {
    this.setAnimationBreakpoint(value, 'sm', 'active');
  }

  set ['ui-animate-sm-focus'](value: string[]) {
    this.setAnimationBreakpoint(value, 'sm', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-animate-sm-focus-visible'](value: string[]) {
    this.setAnimationBreakpoint(value, 'sm', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-animate-sm-focus-within'](value: string[]) {
    this.setAnimationBreakpoint(value, 'sm', 'focus-within');
  }

  set ['ui-animate-sm-hover'](value: string[]) {
    this.setAnimationBreakpoint(value, 'sm', 'hover');
  }

  set ['ui-animate-sm-target'](value: string[]) {
    this.setAnimationBreakpoint(value, 'sm', 'target');
  }

  set ['ui-animate-sm-toggle'](value: string[]) {
    this.setAnimationBreakpoint(value, 'sm', 'toggle');
  }

  // ui animate -md
  set ['ui-animate-md'](value: string[]) {
    this.setAnimationBreakpoint(value, 'md');
  }

  set ['ui-animate-md-active'](value: string[]) {
    this.setAnimationBreakpoint(value, 'md', 'active');
  }

  set ['ui-animate-md-focus'](value: string[]) {
    this.setAnimationBreakpoint(value, 'md', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-animate-md-focus-visible'](value: string[]) {
    this.setAnimationBreakpoint(value, 'md', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-animate-md-focus-within'](value: string[]) {
    this.setAnimationBreakpoint(value, 'md', 'focus-within');
  }

  set ['ui-animate-md-hover'](value: string[]) {
    this.setAnimationBreakpoint(value, 'md', 'hover');
  }

  set ['ui-animate-md-target'](value: string[]) {
    this.setAnimationBreakpoint(value, 'md', 'target');
  }

  set ['ui-animate-md-toggle'](value: string[]) {
    this.setAnimationBreakpoint(value, 'md', 'toggle');
  }

  // ui animate -lg
  set ['ui-animate-lg'](value: string[]) {
    this.setAnimationBreakpoint(value, 'lg');
  }

  set ['ui-animate-lg-active'](value: string[]) {
    this.setAnimationBreakpoint(value, 'lg', 'active');
  }

  set ['ui-animate-lg-focus'](value: string[]) {
    this.setAnimationBreakpoint(value, 'lg', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-animate-lg-focus-visible'](value: string[]) {
    this.setAnimationBreakpoint(value, 'lg', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-animate-lg-focus-within'](value: string[]) {
    this.setAnimationBreakpoint(value, 'lg', 'focus-within');
  }

  set ['ui-animate-lg-hover'](value: string[]) {
    this.setAnimationBreakpoint(value, 'lg', 'hover');
  }

  set ['ui-animate-lg-target'](value: string[]) {
    this.setAnimationBreakpoint(value, 'lg', 'target');
  }

  set ['ui-animate-lg-toggle'](value: string[]) {
    this.setAnimationBreakpoint(value, 'lg', 'toggle');
  }

  // ui animate -xl
  set ['ui-animate-xl'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xl');
  }

  set ['ui-animate-xl-active'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xl', 'active');
  }

  set ['ui-animate-xl-focus'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xl', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-animate-xl-focus-visible'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-animate-xl-focus-within'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xl', 'focus-within');
  }

  set ['ui-animate-xl-hover'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xl', 'hover');
  }

  set ['ui-animate-xl-target'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xl', 'target');
  }

  set ['ui-animate-xl-toggle'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xl', 'toggle');
  }

  // ui animate -xxl
  set ['ui-animate-xxl'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xxl');
  }

  set ['ui-animate-xxl-active'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xxl', 'active');
  }

  set ['ui-animate-xxl-focus'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xxl', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-animate-xxl-focus-visible'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xxl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-animate-xxl-focus-within'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xxl', 'focus-within');
  }

  set ['ui-animate-xxl-hover'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xxl', 'hover');
  }

  set ['ui-animate-xxl-target'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xxl', 'target');
  }

  set ['ui-animate-xxl-toggle'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xxl', 'toggle');
  }

  public async setAnimation(value: string[], state?: StyleStates) {
    (await import('./styles-scope/styles-animate')).StylesAnimate.animate(this, value, state);
  }

  public async setAnimationBreakpoint(
    value: string[],
    breakpoint: Breakpoint,
    state?: StyleStates
  ) {
    (
      await import('./styles-scope-breakpoint/styles-animate-breakpoint')
    ).StylesAnimateBreakpoint.scope(breakpoint, value, this, state);
  }

  public async setBreakpoint(value: string[], breakpoint: Breakpoint, state?: StyleStates) {
    (await import('./styles-scope-breakpoint/styles-scope-breakpoint')).StylesScopeBreakpoint.scope(
      breakpoint,
      value,
      this,
      state
    );
  }

  public async setStyleBreakpoint(
    value: string | string[],
    breakpoint: Breakpoint,
    state?: StyleStates
  ) {
    (await import('./styles-scope-breakpoint/style-breakpoint')).StyleBreakpoint.setHostStyle(
      breakpoint,
      value,
      this,
      state
    );
  }

  set ui(value: string | string[]) {
    if (!value) return;
    this.setUi(value, this);
  }

  set ['ui-toggle'](value: string | string[]) {
    if (!value) return;
    this.setUi(value, this, 'toggle');
  }

  set ['ui-active'](value: string | string[]) {
    if (!value) return;
    this.setUi(value, this, 'active');
  }

  set ['ui-focus'](value: string | string[]) {
    if (!value) return;
    this.setUi(value, this, 'focus');
    this.tabIndex = 0;
  }

  //📌 Apply styles to the outer element (parent element) when the focus-element (child element) is focused
  set ['ui-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setUi(value, this, 'focus-within');
  }

  // 📌 Apply style when element is focused via keyboard or non-mouse interaction
  set ['ui-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setUi(value, this, 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-hover'](value: string | string[]) {
    if (!value) return;
    this.setUi(value, this, 'hover');
  }

  set ['ui-target'](value: string | string[]) {
    if (!value) return;
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

  // before xs
  set ['ui-before-xs'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xs');
  }

  set ['ui-before-xs-active'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xs', 'active');
  }

  set ['ui-before-xs-focus'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xs', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-before-xs-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xs', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-before-xs-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xs', 'focus-within');
  }

  set ['ui-before-xs-hover'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xs', 'hover');
  }

  set ['ui-before-xs-target'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xs', 'target');
  }

  set ['ui-before-xs-toggle'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xs', 'toggle');
  }

  // before sm
  set ['ui-before-sm'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'sm');
  }

  set ['ui-before-sm-active'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'sm', 'active');
  }

  set ['ui-before-sm-focus'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'sm', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-before-sm-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'sm', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-before-sm-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'sm', 'focus-within');
  }

  set ['ui-before-sm-hover'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'sm', 'hover');
  }

  set ['ui-before-sm-target'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'sm', 'target');
  }

  set ['ui-before-sm-toggle'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'sm', 'toggle');
  }

  // before md
  set ['ui-before-md'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'md');
  }

  set ['ui-before-md-active'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'md', 'active');
  }

  set ['ui-before-md-focus'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'md', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-before-md-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'md', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-before-md-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'md', 'focus-within');
  }

  set ['ui-before-md-hover'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'md', 'hover');
  }

  set ['ui-before-md-target'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'md', 'target');
  }

  set ['ui-before-md-toggle'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'md', 'toggle');
  }

  // before lg
  set ['ui-before-lg'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'lg');
  }

  set ['ui-before-lg-active'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'lg', 'active');
  }

  set ['ui-before-lg-focus'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'lg', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-before-lg-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'lg', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-before-lg-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'lg', 'focus-within');
  }

  set ['ui-before-lg-hover'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'lg', 'hover');
  }

  set ['ui-before-lg-target'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'lg', 'target');
  }

  set ['ui-before-lg-toggle'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'lg', 'toggle');
  }

  // before lx
  set ['ui-before-xl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xl');
  }

  set ['ui-before-xl-active'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xl', 'active');
  }

  set ['ui-before-xl-focus'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xl', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-before-xl-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-before-xl-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xl', 'focus-within');
  }

  set ['ui-before-xl-hover'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xl', 'hover');
  }

  set ['ui-before-xl-target'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xl', 'target');
  }

  set ['ui-before-xl-toggle'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xl', 'toggle');
  }

  // before xll
  set ['ui-before-xxl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xxl');
  }

  set ['ui-before-xxl-active'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xxl', 'active');
  }

  set ['ui-before-xxl-focus'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xxl', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-before-xxl-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xxl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-before-xxl-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xxl', 'focus-within');
  }

  set ['ui-before-xxl-hover'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xxl', 'hover');
  }

  set ['ui-before-xxl-target'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xxl', 'target');
  }

  set ['ui-before-xxl-toggle'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xxl', 'toggle');
  }

  // _____________
  // before xs
  set ['ui-after-xs'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xs');
  }

  set ['ui-after-xs-active'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xs', 'active');
  }

  set ['ui-after-xs-focus'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xs', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-after-xs-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xs', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-after-xs-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xs', 'focus-within');
  }

  set ['ui-after-xs-hover'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xs', 'hover');
  }

  set ['ui-after-xs-target'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xs', 'target');
  }

  set ['ui-after-xs-toggle'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xs', 'toggle');
  }

  // after sm
  set ['ui-after-sm'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'sm');
  }

  set ['ui-after-sm-active'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'sm', 'active');
  }

  set ['ui-after-sm-focus'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'sm', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-after-sm-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'sm', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-after-sm-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'sm', 'focus-within');
  }

  set ['ui-after-sm-hover'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'sm', 'hover');
  }

  set ['ui-after-sm-target'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'sm', 'target');
  }

  set ['ui-after-sm-toggle'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'sm', 'toggle');
  }

  // after md
  set ['ui-after-md'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'md');
  }

  set ['ui-after-md-active'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'md', 'active');
  }

  set ['ui-after-md-focus'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'md', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-after-md-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'md', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-after-md-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'md', 'focus-within');
  }

  set ['ui-after-md-hover'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'md', 'hover');
  }

  set ['ui-after-md-target'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'md', 'target');
  }

  set ['ui-after-md-toggle'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'md', 'toggle');
  }

  // after lg
  set ['ui-after-lg'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'lg');
  }

  set ['ui-after-lg-active'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'lg', 'active');
  }

  set ['ui-after-lg-focus'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'lg', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-after-lg-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'lg', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-after-lg-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'lg', 'focus-within');
  }

  set ['ui-after-lg-hover'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'lg', 'hover');
  }

  set ['ui-after-lg-target'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'lg', 'target');
  }

  set ['ui-after-lg-toggle'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'lg', 'toggle');
  }

  // after lx
  set ['ui-after-xl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xl');
  }

  set ['ui-after-xl-active'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xl', 'active');
  }

  set ['ui-after-xl-focus'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xl', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-after-xl-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-after-xl-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xl', 'focus-within');
  }

  set ['ui-after-xl-hover'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xl', 'hover');
  }

  set ['ui-after-xl-target'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xl', 'target');
  }

  set ['ui-after-xl-toggle'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xl', 'toggle');
  }

  // after xll
  set ['ui-after-xxl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xxl');
  }

  set ['ui-after-xxl-active'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xxl', 'active');
  }

  set ['ui-after-xxl-focus'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xxl', 'focus');
    this.tabIndex = 0;
  }

  set ['ui-after-xxl-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xxl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['ui-after-xxl-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xxl', 'focus-within');
  }

  set ['ui-after-xxl-hover'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xxl', 'hover');
  }

  set ['ui-after-xxl-target'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xxl', 'target');
  }

  set ['ui-after-xxl-toggle'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xxl', 'toggle');
  }

  // after _______
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

  // input
  set ['input'](value: string | string[]) {
    this.setUiInput(value);
  }

  set ['input-active'](value: string | string[]) {
    this.setUiInput(value, 'active');
  }

  set ['input-focus'](value: string | string[]) {
    this.setUiInput(value, 'focus');
  }

  set ['input-focus-visible'](value: string | string[]) {
    this.setUiInput(value, 'focus-visible');
  }

  set ['input-hover'](value: string | string[]) {
    this.setUiInput(value, 'hover');
  }

  // input xs
  set ['input-xs'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'xs');
  }

  set ['input-xs-active'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'xs', 'active');
  }

  set ['input-xs-focus-visible'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'xs', 'focus-visible');
  }

  set ['input-xs-hover'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'xs', 'hover');
  }

  // input sm
  set ['input-sm'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'sm');
  }

  set ['input-sm-active'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'sm', 'active');
  }

  set ['input-sm-focus-visible'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'sm', 'focus-visible');
  }

  set ['input-sm-hover'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'sm', 'hover');
  }

  // input md
  set ['input-md'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'md');
  }

  set ['input-md-active'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'md', 'active');
  }

  set ['input-md-focus-visible'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'md', 'focus-visible');
  }

  set ['input-md-hover'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'md', 'hover');
  }

  // input lg
  set ['input-lg'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'lg');
  }

  set ['input-lg-active'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'lg', 'active');
  }

  set ['input-lg-focus-visible'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'lg', 'focus-visible');
  }

  set ['input-lg-hover'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'lg', 'hover');
  }
  // input xl
  set ['input-xl'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'xl');
  }

  set ['input-xl-active'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'xl', 'active');
  }

  set ['input-xl-focus-visible'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'xl', 'focus-visible');
  }

  set ['input-xl-hover'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'xl', 'hover');
  }

  // input xxl
  set ['input-xxl'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'xxl');
  }

  set ['input-xxl-active'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'xxl', 'active');
  }

  set ['input-xxl-focus-visible'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'xxl', 'focus-visible');
  }

  set ['input-xxl-hover'](value: string | string[]) {
    this.setUiInputBreakpoint(value, 'xxl', 'hover');
  }

  public async setUiInput(value: string | string[], state?: StyleStates) {
    await (await import('./styles-scope/styles-input')).StylesInput.scope(value, this, state);
  }

  public async setUiInputBreakpoint(
    value: string | string[],
    breakpoint: Breakpoint,
    state?: StyleStates
  ) {
    (await import('./styles-scope-breakpoint/styles-input-breakpoint')).StylesInputBreakpoint.scope(
      breakpoint,
      value,
      this,
      state
    );
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
    this.styleElement.textContent = `:host{display:block}${this.uiStylesCSSResult || ''}${
      this.uiStatesCSSResult || ''
    }${this.iconStylesCSSResult || ''}${this.uiBeforeCSSResult || ''}${
      this.uiAfterCSSResult || ''
    }${this.uiSpacingCSSResult || ''}${this.uiAnimateStatesCSSResult || ''}${
      this.uiBreakpointCSSResult || ''
    }${this.uiBreakpointStatesCSSResult || ''}${this.iconBreakpointCSSResult || ''}${
      this.uiBeforeBreakpointCSSResult || ''
    }${this.uiAfterBreakpointCSSResult || ''}${this.uiAnimateStatesBreakpointCSSResult || ''}${
      this.uiInputCSSResult || ''
    }${this.uiInputBreakpointCSSResult || ''}${this.styleMapCSSResult || ''}${
      this.styleBreakpointCSSResult || ''
    }${this.slotMapCSSResult || ''}${this.slotBreakpointCSSResult || ''}
    `;
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

  async setPseudoUiBreakpoint(
    value: string | string[],
    pseudo: 'before' | 'after',
    breakpoint: Breakpoint,
    state?: StyleStates
  ) {
    await (
      await import('./styles-scope-breakpoint/styles-pseudo-breakpoint')
    ).StylesPseudoBreakpoint.scope(breakpoint, value, this, pseudo, state);
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
