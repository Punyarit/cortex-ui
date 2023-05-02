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
} from './types/c-div.types';

export class Div extends HTMLElement {
  public classMap?: UiClassName;
  public classCSSResult?: string;

  public classStateMap?: UiStates;
  public classStateCSSResult?: string;

  public iconMap?: UiClassName;
  public iconCSSResult?: string;

  public beforeMap?: UiPseudoState;
  public beforeCSSResult?: string;

  public afterMap?: UiPseudoState;
  public afterCSSResult?: string;

  public spaceMap?: UiSpacing;
  public spaceCSSResult?: string;

  public classNames?: Record<string, string[]>;

  public toggleSelectedRef?: UiToggleSelectedRef;
  public toggleEvents?: ToggleEvents;
  public cacheToggleEvents?: ToggleEvents;
  public isToggleDirty?: boolean;

  public classBreakpoint?: UiBreakpoint;
  public classBreakpointCSSResult?: string;

  public classStateBreakpoint?: UiBreakpointState;
  public classStateBreakpointCSSResult?: string;

  public iconBreakpoint?: UiIconBreakpoint;
  public iconBreakpointCSSResult?: string;

  public beforeBreakpoint?: UiPseudoBreakpoint;
  public beforeBreakpointCSSResult?: string;
  public afterBreakpoint?: UiPseudoBreakpoint;
  public afterBreakpointCSSResult?: string;

  public animateMap?: UiAnimateState;
  public animateMapCSSResult?: string;

  public animateBreakpoint?: UiAnimateStatesBreakpoint;
  public animateBreakpointCSSResult?: string;

  public inputMap?: UiInput;
  public inputCSSResult?: string;

  public inputBreakpoint?: UiInputBreakpoint;
  public inputBreakpointCSSResult?: string;

  public styleMap?: any;
  public styleMapCSSResult?: string;

  public slotMap?: any;
  public slotMapCSSResult?: string;

  public styleBreakpoint?: any;
  public styleBreakpointCSSResult?: string;

  public slotBreakpoint?: any;
  public slotBreakpointCSSResult?: string;

  public async toggleStyles(toggleGroup: CXDiv.Ref | null) {
    (await import('./helpers/toggle-cache')).BoxToggle.toggleStyles(this, toggleGroup);
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
      await import('./styles-scope-breakpoint/$slot-breakpoint')
    ).SlotBreakpoint.setHostStyle(breakpoint, value, this, state);
  }

  public async setSlot(value: string | string[], state?: StyleStates) {
    await (await import('./styles-scope/$slot')).SlotMap.map(value, this, state);
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
    await (await import('./styles-scope/$style')).StyleMap.style(value, this, state);
  }

  // fix xs = 0 - 600 px. in the future the breakpoint will set in theme
  set ['$class-xs'](value: string[]) {
    this.setClassBreakpoint(value, 'xs');
  }

  set ['$class-active-xs'](value: string[]) {
    this.setClassBreakpoint(value, 'xs', 'active');
  }

  set ['$class-focus-xs'](value: string[]) {
    this.setClassBreakpoint(value, 'xs', 'focus');
    this.tabIndex = 0;
  }

  set ['$class-focus-visible-xs'](value: string[]) {
    this.setClassBreakpoint(value, 'xs', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$class-focus-within-xs'](value: string[]) {
    this.setClassBreakpoint(value, 'xs', 'focus-within');
  }

  set ['$class-hover-xs'](value: string[]) {
    this.setClassBreakpoint(value, 'xs', 'hover');
  }

  set ['$class-target-xs'](value: string[]) {
    this.setClassBreakpoint(value, 'xs', 'target');
  }

  set ['$class-toggle-xs'](value: string[]) {
    this.setClassBreakpoint(value, 'xs', 'toggle');
  }

  // ___
  set ['$class-sm'](value: string[]) {
    this.setClassBreakpoint(value, 'sm');
  }

  set ['$class-active-sm'](value: string[]) {
    this.setClassBreakpoint(value, 'sm', 'active');
  }

  set ['$class-focus-sm'](value: string[]) {
    this.setClassBreakpoint(value, 'sm', 'focus');
    this.tabIndex = 0;
  }

  set ['$class-focus-visible-sm'](value: string[]) {
    this.setClassBreakpoint(value, 'sm', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$class-focus-within-sm'](value: string[]) {
    this.setClassBreakpoint(value, 'sm', 'focus-within');
  }

  set ['$class-hover-sm'](value: string[]) {
    this.setClassBreakpoint(value, 'sm', 'hover');
  }

  set ['$class-target-sm'](value: string[]) {
    this.setClassBreakpoint(value, 'sm', 'target');
  }

  set ['$class-toggle-sm'](value: string[]) {
    this.setClassBreakpoint(value, 'sm', 'toggle');
  }

  // __
  set ['$class-md'](value: string[]) {
    this.setClassBreakpoint(value, 'md');
  }

  set ['$class-active-md'](value: string[]) {
    this.setClassBreakpoint(value, 'md', 'active');
  }

  set ['$class-focus-md'](value: string[]) {
    this.setClassBreakpoint(value, 'md', 'focus');
    this.tabIndex = 0;
  }

  set ['$class-focus-visible-md'](value: string[]) {
    this.setClassBreakpoint(value, 'md', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$class-focus-within-md'](value: string[]) {
    this.setClassBreakpoint(value, 'md', 'focus-within');
  }

  set ['$class-hover-md'](value: string[]) {
    this.setClassBreakpoint(value, 'md', 'hover');
  }

  set ['$class-target-md'](value: string[]) {
    this.setClassBreakpoint(value, 'md', 'target');
  }

  set ['$class-toggle-md'](value: string[]) {
    this.setClassBreakpoint(value, 'md', 'toggle');
  }

  //

  set ['$class-lg'](value: string[]) {
    this.setClassBreakpoint(value, 'lg');
  }

  set ['$class-active-lg'](value: string[]) {
    this.setClassBreakpoint(value, 'lg', 'active');
  }

  set ['$class-focus-lg'](value: string[]) {
    this.setClassBreakpoint(value, 'lg', 'focus');
    this.tabIndex = 0;
  }

  set ['$class-focus-visible-lg'](value: string[]) {
    this.setClassBreakpoint(value, 'lg', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$class-focus-within-lg'](value: string[]) {
    this.setClassBreakpoint(value, 'lg', 'focus-within');
  }

  set ['$class-hover-lg'](value: string[]) {
    this.setClassBreakpoint(value, 'lg', 'hover');
  }

  set ['$class-target-lg'](value: string[]) {
    this.setClassBreakpoint(value, 'lg', 'target');
  }

  set ['$class-toggle-lg'](value: string[]) {
    this.setClassBreakpoint(value, 'lg', 'toggle');
  }

  // __
  set ['$class-xl'](value: string[]) {
    this.setClassBreakpoint(value, 'xl');
  }

  set ['$class-active-xl'](value: string[]) {
    this.setClassBreakpoint(value, 'xl', 'active');
  }

  set ['$class-focus-xl'](value: string[]) {
    this.setClassBreakpoint(value, 'xl', 'focus');
    this.tabIndex = 0;
  }

  set ['$class-focus-visible-xl'](value: string[]) {
    this.setClassBreakpoint(value, 'xl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$class-focus-within-xl'](value: string[]) {
    this.setClassBreakpoint(value, 'xl', 'focus-within');
  }

  set ['$class-hover-xl'](value: string[]) {
    this.setClassBreakpoint(value, 'xl', 'hover');
  }

  set ['$class-target-xl'](value: string[]) {
    this.setClassBreakpoint(value, 'xl', 'target');
  }

  set ['$class-toggle-xl'](value: string[]) {
    this.setClassBreakpoint(value, 'xl', 'toggle');
  }

  // __
  set ['$class-xxl'](value: string[]) {
    this.setClassBreakpoint(value, 'xxl');
  }

  set ['$class-active-xxl'](value: string[]) {
    this.setClassBreakpoint(value, 'xxl', 'active');
  }

  set ['$class-focus-xxl'](value: string[]) {
    this.setClassBreakpoint(value, 'xxl', 'focus');
    this.tabIndex = 0;
  }

  set ['$class-focus-visible-xxl'](value: string[]) {
    this.setClassBreakpoint(value, 'xxl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$class-focus-within-xxl'](value: string[]) {
    this.setClassBreakpoint(value, 'xxl', 'focus-within');
  }

  set ['$class-hover-xxl'](value: string[]) {
    this.setClassBreakpoint(value, 'xxl', 'hover');
  }

  set ['$class-target-xxl'](value: string[]) {
    this.setClassBreakpoint(value, 'xxl', 'target');
  }

  set ['$class-toggle-xxl'](value: string[]) {
    this.setClassBreakpoint(value, 'xxl', 'toggle');
  }

  // ui animate
  set ['$animate'](value: string[]) {
    this.setAnimation(value);
  }

  set ['$animate-toggle'](value: string[]) {
    this.setAnimation(value, 'toggle');
  }

  set ['$animate-active'](value: string[]) {
    this.setAnimation(value, 'active');
  }

  set ['$animate-focus'](value: string[]) {
    this.setAnimation(value, 'focus');
    this.tabIndex = 0;
  }

  set ['$animate-focus-within'](value: string[]) {
    this.setAnimation(value, 'focus-within');
  }

  set ['$animate-focus-visible'](value: string[]) {
    this.setAnimation(value, 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$animate-hover'](value: string[]) {
    this.setAnimation(value, 'hover');
  }

  set ['$animate-target'](value: string[]) {
    this.setAnimation(value, 'target');
  }

  // ui animate -xs
  set ['$animate-xs'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xs');
  }

  set ['$animate-active-xs'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xs', 'active');
  }

  set ['$animate-focus-xs'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xs', 'focus');
    this.tabIndex = 0;
  }

  set ['$animate-focus-visible-xs'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xs', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$animate-focus-within-xs'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xs', 'focus-within');
  }

  set ['$animate-hover-xs'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xs', 'hover');
  }

  set ['$animate-target-xs'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xs', 'target');
  }

  set ['$animate-toggle-xs'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xs', 'toggle');
  }

  // ui animate -sm
  set ['$animate-sm'](value: string[]) {
    this.setAnimationBreakpoint(value, 'sm');
  }

  set ['$animate-active-sm'](value: string[]) {
    this.setAnimationBreakpoint(value, 'sm', 'active');
  }

  set ['$animate-focus-sm'](value: string[]) {
    this.setAnimationBreakpoint(value, 'sm', 'focus');
    this.tabIndex = 0;
  }

  set ['$animate-focus-visible-sm'](value: string[]) {
    this.setAnimationBreakpoint(value, 'sm', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$animate-focus-within-sm'](value: string[]) {
    this.setAnimationBreakpoint(value, 'sm', 'focus-within');
  }

  set ['$animate-hover-sm'](value: string[]) {
    this.setAnimationBreakpoint(value, 'sm', 'hover');
  }

  set ['$animate-target-sm'](value: string[]) {
    this.setAnimationBreakpoint(value, 'sm', 'target');
  }

  set ['$animate-toggle-sm'](value: string[]) {
    this.setAnimationBreakpoint(value, 'sm', 'toggle');
  }

  // ui animate -md
  set ['$animate-md'](value: string[]) {
    this.setAnimationBreakpoint(value, 'md');
  }

  set ['$animate-active-md'](value: string[]) {
    this.setAnimationBreakpoint(value, 'md', 'active');
  }

  set ['$animate-focus-md'](value: string[]) {
    this.setAnimationBreakpoint(value, 'md', 'focus');
    this.tabIndex = 0;
  }

  set ['$animate-focus-visible-md'](value: string[]) {
    this.setAnimationBreakpoint(value, 'md', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$animate-focus-within-md'](value: string[]) {
    this.setAnimationBreakpoint(value, 'md', 'focus-within');
  }

  set ['$animate-hover-md'](value: string[]) {
    this.setAnimationBreakpoint(value, 'md', 'hover');
  }

  set ['$animate-target-md'](value: string[]) {
    this.setAnimationBreakpoint(value, 'md', 'target');
  }

  set ['$animate-toggle-md'](value: string[]) {
    this.setAnimationBreakpoint(value, 'md', 'toggle');
  }

  // ui animate -lg
  set ['$animate-lg'](value: string[]) {
    this.setAnimationBreakpoint(value, 'lg');
  }

  set ['$animate-active-lg'](value: string[]) {
    this.setAnimationBreakpoint(value, 'lg', 'active');
  }

  set ['$animate-focus-lg'](value: string[]) {
    this.setAnimationBreakpoint(value, 'lg', 'focus');
    this.tabIndex = 0;
  }

  set ['$animate-focus-visible-lg'](value: string[]) {
    this.setAnimationBreakpoint(value, 'lg', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$animate-focus-within-lg'](value: string[]) {
    this.setAnimationBreakpoint(value, 'lg', 'focus-within');
  }

  set ['$animate-hover-lg'](value: string[]) {
    this.setAnimationBreakpoint(value, 'lg', 'hover');
  }

  set ['$animate-target-lg'](value: string[]) {
    this.setAnimationBreakpoint(value, 'lg', 'target');
  }

  set ['$animate-toggle-lg'](value: string[]) {
    this.setAnimationBreakpoint(value, 'lg', 'toggle');
  }

  // ui animate -xl
  set ['$animate-xl'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xl');
  }

  set ['$animate-active-xl'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xl', 'active');
  }

  set ['$animate-focus-xl'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xl', 'focus');
    this.tabIndex = 0;
  }

  set ['$animate-focus-visible-xl'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$animate-focus-within-xl'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xl', 'focus-within');
  }

  set ['$animate-hover-xl'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xl', 'hover');
  }

  set ['$animate-target-xl'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xl', 'target');
  }

  set ['$animate-toggle-xl'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xl', 'toggle');
  }

  // ui animate -xxl
  set ['$animate-xxl'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xxl');
  }

  set ['$animate-active-xxl'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xxl', 'active');
  }

  set ['$animate-focus-xxl'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xxl', 'focus');
    this.tabIndex = 0;
  }

  set ['$animate-focus-visible-xxl'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xxl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$animate-focus-within-xxl'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xxl', 'focus-within');
  }

  set ['$animate-hover-xxl'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xxl', 'hover');
  }

  set ['$animate-target-xxl'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xxl', 'target');
  }

  set ['$animate-toggle-xxl'](value: string[]) {
    this.setAnimationBreakpoint(value, 'xxl', 'toggle');
  }

  public async setAnimation(value: string[], state?: StyleStates) {
    (await import('./styles-scope/$animate')).StylesAnimate.animate(this, value, state);
  }

  public async setAnimationBreakpoint(
    value: string[],
    breakpoint: Breakpoint,
    state?: StyleStates
  ) {
    (
      await import('./styles-scope-breakpoint/$animate-breakpoint')
    ).StylesAnimateBreakpoint.scope(breakpoint, value, this, state);
  }

  public async setClassBreakpoint(value: string[], breakpoint: Breakpoint, state?: StyleStates) {
    (await import('./styles-scope-breakpoint/$scope-breakpoint')).StylesScopeBreakpoint.scope(
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
    (await import('./styles-scope-breakpoint/$style-breakpoint')).StyleBreakpoint.setHostStyle(
      breakpoint,
      value,
      this,
      state
    );
  }

  set $class(value: string | string[]) {
    if (!value) return;
    this.setClass(value, this);
  }

  set ['$class-toggle'](value: string | string[]) {
    if (!value) return;
    this.setClass(value, this, 'toggle');
  }

  set ['$class-active'](value: string | string[]) {
    if (!value) return;
    this.setClass(value, this, 'active');
  }

  set ['$class-focus'](value: string | string[]) {
    if (!value) return;
    this.setClass(value, this, 'focus');
    this.tabIndex = 0;
  }

  //📌 Apply styles to the outer element (parent element) when the focus-element (child element) is focused
  set ['$class-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setClass(value, this, 'focus-within');
  }

  // 📌 Apply style when element is focused via keyboard or non-mouse interaction
  set ['$class-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setClass(value, this, 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$class-hover'](value: string | string[]) {
    if (!value) return;
    this.setClass(value, this, 'hover');
  }

  set ['$class-target'](value: string | string[]) {
    if (!value) return;
    this.setClass(value, this, 'target');
  }

  // icon
  set $icon(value: string | string[]) {
    if (!value) return;
    this.setIcon(value);
  }

  set ['$icon-toggle'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, 'toggle');
  }

  set ['$icon-active'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, 'active');
  }

  set ['$icon-focus'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, 'focus');
    this.tabIndex = 0;
  }

  set ['$icon-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, 'focus-within');
  }

  set ['$icon-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$icon-hover'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, 'hover');
  }

  set ['$icon-target'](value: string | string[]) {
    if (!value) return;
    this.setIcon(value, 'target');
  }

  // icon xs
  set ['$icon-xs'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xs');
  }

  set ['$icon-active-xs'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xs', 'active');
  }

  set ['$icon-focus-xs'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xs', 'focus');
    this.tabIndex = 0;
  }

  set ['$icon-focus-visible-xs'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xs', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$icon-focus-within-xs'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xs', 'focus-within');
  }

  set ['$icon-hover-xs'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xs', 'hover');
  }

  set ['$icon-target-xs'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xs', 'target');
  }

  set ['$icon-toggle-xs'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xs', 'toggle');
  }

  // icon sm
  set ['$icon-sm'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'sm');
  }

  set ['$icon-active-sm'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'sm', 'active');
  }

  set ['$icon-focus-sm'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'sm', 'focus');
    this.tabIndex = 0;
  }

  set ['$icon-focus-visible-sm'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'sm', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$icon-focus-within-sm'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'sm', 'focus-within');
  }

  set ['$icon-hover-sm'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'sm', 'hover');
  }

  set ['$icon-target-sm'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'sm', 'target');
  }

  set ['$icon-toggle-sm'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'sm', 'toggle');
  }

  // icon md
  set ['$icon-md'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'md');
  }

  set ['$icon-active-md'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'md', 'active');
  }

  set ['$icon-focus-md'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'md', 'focus');
    this.tabIndex = 0;
  }

  set ['$icon-focus-visible-md'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'md', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$icon-focus-within-md'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'md', 'focus-within');
  }

  set ['$icon-hover-md'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'md', 'hover');
  }

  set ['$icon-target-md'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'md', 'target');
  }

  set ['$icon-toggle-md'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'md', 'toggle');
  }

  // icon lg
  set ['$icon-lg'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'lg');
  }

  set ['$icon-active-lg'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'lg', 'active');
  }

  set ['$icon-focus-lg'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'lg', 'focus');
    this.tabIndex = 0;
  }

  set ['$icon-focus-visible-lg'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'lg', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$icon-focus-within-lg'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'lg', 'focus-within');
  }

  set ['$icon-hover-lg'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'lg', 'hover');
  }

  set ['$icon-target-lg'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'lg', 'target');
  }

  set ['$icon-toggle-lg'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'lg', 'toggle');
  }

  // icon xl
  set ['$icon-xl'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xl');
  }

  set ['$icon-active-xl'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xl', 'active');
  }

  set ['$icon-focus-xl'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xl', 'focus');
    this.tabIndex = 0;
  }

  set ['$icon-focus-visible-xl'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$icon-focus-within-xl'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xl', 'focus-within');
  }

  set ['$icon-hover-xl'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xl', 'hover');
  }

  set ['$icon-target-xl'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xl', 'target');
  }

  set ['$icon-toggle-xl'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xl', 'toggle');
  }

  // icon xxl
  set ['$icon-xxl'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xxl');
  }

  set ['$icon-active-xxl'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xxl', 'active');
  }

  set ['$icon-focus-xxl'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xxl', 'focus');
    this.tabIndex = 0;
  }

  set ['$icon-focus-visible-xxl'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xxl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$icon-focus-within-xxl'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xxl', 'focus-within');
  }

  set ['$icon-hover-xxl'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xxl', 'hover');
  }

  set ['$icon-target-xxl'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xxl', 'target');
  }

  set ['$icon-toggle-xxl'](value: string | string[]) {
    if (!value) return;
    this.setIconBreakpoint(value, 'xxl', 'toggle');
  }

  // before
  set $before(value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'before');
  }

  set ['$before-toggle'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'before', 'toggle');
  }

  set ['$before-active'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'before', 'active');
  }

  set ['$before-focus'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'before', 'focus');
    this.tabIndex = 0;
  }

  set ['$before-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'before', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$before-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'before', 'focus-within');
  }

  set ['$before-hover'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'before', 'hover');
  }

  set ['$before-target'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'before', 'target');
  }

  // before xs
  set ['$before-xs'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xs');
  }

  set ['$before-active-xs'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xs', 'active');
  }

  set ['$before-focus-xs'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xs', 'focus');
    this.tabIndex = 0;
  }

  set ['$before-focus-visible-xs'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xs', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$before-focus-within-xs'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xs', 'focus-within');
  }

  set ['$before-hover-xs'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xs', 'hover');
  }

  set ['$before-target-xs'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xs', 'target');
  }

  set ['$before-toggle-xs'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xs', 'toggle');
  }

  // before sm
  set ['$before-sm'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'sm');
  }

  set ['$before-active-sm'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'sm', 'active');
  }

  set ['$before-focus-sm'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'sm', 'focus');
    this.tabIndex = 0;
  }

  set ['$before-focus-visible-sm'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'sm', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$before-focus-within-sm'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'sm', 'focus-within');
  }

  set ['$before-hover-sm'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'sm', 'hover');
  }

  set ['$before-target-sm'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'sm', 'target');
  }

  set ['$before-toggle-sm'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'sm', 'toggle');
  }

  // before md
  set ['$before-md'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'md');
  }

  set ['$before-active-md'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'md', 'active');
  }

  set ['$before-focus-md'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'md', 'focus');
    this.tabIndex = 0;
  }

  set ['$before-focus-visible-md'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'md', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$before-focus-within-md'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'md', 'focus-within');
  }

  set ['$before-hover-md'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'md', 'hover');
  }

  set ['$before-target-md'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'md', 'target');
  }

  set ['$before-toggle-md'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'md', 'toggle');
  }

  // before lg
  set ['$before-lg'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'lg');
  }

  set ['$before-active-lg'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'lg', 'active');
  }

  set ['$before-focus-lg'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'lg', 'focus');
    this.tabIndex = 0;
  }

  set ['$before-focus-visible-lg'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'lg', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$before-focus-within-lg'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'lg', 'focus-within');
  }

  set ['$before-hover-lg'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'lg', 'hover');
  }

  set ['$before-target-lg'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'lg', 'target');
  }

  set ['$before-toggle-lg'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'lg', 'toggle');
  }

  // before lx
  set ['$before-xl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xl');
  }

  set ['$before-active-xl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xl', 'active');
  }

  set ['$before-focus-xl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xl', 'focus');
    this.tabIndex = 0;
  }

  set ['$before-focus-visible-xl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$before-focus-within-xl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xl', 'focus-within');
  }

  set ['$before-hover-xl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xl', 'hover');
  }

  set ['$before-target-xl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xl', 'target');
  }

  set ['$before-toggle-xl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xl', 'toggle');
  }

  // before xll
  set ['$before-xxl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xxl');
  }

  set ['$before-active-xxl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xxl', 'active');
  }

  set ['$before-focus-xxl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xxl', 'focus');
    this.tabIndex = 0;
  }

  set ['$before-focus-visible-xxl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xxl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$before-focus-within-xxl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xxl', 'focus-within');
  }

  set ['$before-hover-xxl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xxl', 'hover');
  }

  set ['$before-target-xxl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xxl', 'target');
  }

  set ['$before-toggle-xxl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'before', 'xxl', 'toggle');
  }

  // _____________
  // before xs
  set ['$after-xs'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xs');
  }

  set ['$after-active-xs'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xs', 'active');
  }

  set ['$after-focus-xs'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xs', 'focus');
    this.tabIndex = 0;
  }

  set ['$after-focus-visible-xs'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xs', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$after-focus-within-xs'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xs', 'focus-within');
  }

  set ['$after-hover-xs'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xs', 'hover');
  }

  set ['$after-target-xs'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xs', 'target');
  }

  set ['$after-toggle-xs'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xs', 'toggle');
  }

  // after sm
  set ['$after-sm'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'sm');
  }

  set ['$after-active-sm'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'sm', 'active');
  }

  set ['$after-focus-sm'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'sm', 'focus');
    this.tabIndex = 0;
  }

  set ['$after-focus-visible-sm'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'sm', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$after-focus-within-sm'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'sm', 'focus-within');
  }

  set ['$after-hover-sm'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'sm', 'hover');
  }

  set ['$after-target-sm'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'sm', 'target');
  }

  set ['$after-toggle-sm'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'sm', 'toggle');
  }

  // after md
  set ['$after-md'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'md');
  }

  set ['$after-active-md'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'md', 'active');
  }

  set ['$after-focus-md'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'md', 'focus');
    this.tabIndex = 0;
  }

  set ['$after-focus-visible-md'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'md', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$after-focus-within-md'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'md', 'focus-within');
  }

  set ['$after-hover-md'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'md', 'hover');
  }

  set ['$after-target-md'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'md', 'target');
  }

  set ['$after-toggle-md'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'md', 'toggle');
  }

  // after lg
  set ['$after-lg'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'lg');
  }

  set ['$after-active-lg'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'lg', 'active');
  }

  set ['$after-focus-lg'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'lg', 'focus');
    this.tabIndex = 0;
  }

  set ['$after-focus-visible-lg'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'lg', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$after-focus-within-lg'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'lg', 'focus-within');
  }

  set ['$after-hover-lg'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'lg', 'hover');
  }

  set ['$after-target-lg'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'lg', 'target');
  }

  set ['$after-toggle-lg'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'lg', 'toggle');
  }

  // after lx
  set ['$after-xl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xl');
  }

  set ['$after-active-xl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xl', 'active');
  }

  set ['$after-focus-xl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xl', 'focus');
    this.tabIndex = 0;
  }

  set ['$after-focus-visible-xl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$after-focus-within-xl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xl', 'focus-within');
  }

  set ['$after-hover-xl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xl', 'hover');
  }

  set ['$after-target-xl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xl', 'target');
  }

  set ['$after-toggle-xl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xl', 'toggle');
  }

  // after xll
  set ['$after-xxl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xxl');
  }

  set ['$after-active-xxl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xxl', 'active');
  }

  set ['$after-focus-xxl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xxl', 'focus');
    this.tabIndex = 0;
  }

  set ['$after-focus-visible-xxl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xxl', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$after-focus-within-xxl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xxl', 'focus-within');
  }

  set ['$after-hover-xxl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xxl', 'hover');
  }

  set ['$after-target-xxl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xxl', 'target');
  }

  set ['$after-toggle-xxl'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUiBreakpoint(value, 'after', 'xxl', 'toggle');
  }

  // after _______
  set ['$after'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'after');
  }
  set ['$after-toggle'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'after', 'toggle');
  }

  set ['$after-active'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'after', 'active');
  }

  set ['$after-focus'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'after', 'focus');
    this.tabIndex = 0;
  }

  set ['$after-focus-visible'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'after', 'focus-visible');
    this.tabIndex = 0;
  }

  set ['$after-focus-within'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'after', 'focus-within');
  }

  set ['$after-hover'](value: string | string[]) {
    if (!value) return;
    this.setPseudoUi(value, this, 'after', 'hover');
  }

  set ['$after-target'](value: string | string[]) {
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
  set ['$input'](value: string | string[]) {
    this.setInput(value);
  }

  set ['$input-active'](value: string | string[]) {
    this.setInput(value, 'active');
  }

  set ['$input-focus'](value: string | string[]) {
    this.setInput(value, 'focus');
  }

  set ['$input-focus-visible'](value: string | string[]) {
    this.setInput(value, 'focus-visible');
  }

  set ['$input-hover'](value: string | string[]) {
    this.setInput(value, 'hover');
  }

  // input xs
  set ['$input-xs'](value: string | string[]) {
    this.setInputBreakpoint(value, 'xs');
  }

  set ['$input-active-xs'](value: string | string[]) {
    this.setInputBreakpoint(value, 'xs', 'active');
  }

  set ['$input-focus-visible-xs'](value: string | string[]) {
    this.setInputBreakpoint(value, 'xs', 'focus-visible');
  }

  set ['$input-hover-xs'](value: string | string[]) {
    this.setInputBreakpoint(value, 'xs', 'hover');
  }

  // input sm
  set ['$input-sm'](value: string | string[]) {
    this.setInputBreakpoint(value, 'sm');
  }

  set ['$input-active-sm'](value: string | string[]) {
    this.setInputBreakpoint(value, 'sm', 'active');
  }

  set ['$input-focus-visible-sm'](value: string | string[]) {
    this.setInputBreakpoint(value, 'sm', 'focus-visible');
  }

  set ['$input-hover-sm'](value: string | string[]) {
    this.setInputBreakpoint(value, 'sm', 'hover');
  }

  // input md
  set ['$input-md'](value: string | string[]) {
    this.setInputBreakpoint(value, 'md');
  }

  set ['$input-active-md'](value: string | string[]) {
    this.setInputBreakpoint(value, 'md', 'active');
  }

  set ['$input-focus-visible-md'](value: string | string[]) {
    this.setInputBreakpoint(value, 'md', 'focus-visible');
  }

  set ['$input-hover-md'](value: string | string[]) {
    this.setInputBreakpoint(value, 'md', 'hover');
  }

  // input lg
  set ['$input-lg'](value: string | string[]) {
    this.setInputBreakpoint(value, 'lg');
  }

  set ['$input-active-lg'](value: string | string[]) {
    this.setInputBreakpoint(value, 'lg', 'active');
  }

  set ['$input-focus-visible-lg'](value: string | string[]) {
    this.setInputBreakpoint(value, 'lg', 'focus-visible');
  }

  set ['$input-hover-lg'](value: string | string[]) {
    this.setInputBreakpoint(value, 'lg', 'hover');
  }
  // input xl
  set ['$input-xl'](value: string | string[]) {
    this.setInputBreakpoint(value, 'xl');
  }

  set ['$input-active-xl'](value: string | string[]) {
    this.setInputBreakpoint(value, 'xl', 'active');
  }

  set ['$input-focus-visible-xl'](value: string | string[]) {
    this.setInputBreakpoint(value, 'xl', 'focus-visible');
  }

  set ['$input-hover-xl'](value: string | string[]) {
    this.setInputBreakpoint(value, 'xl', 'hover');
  }

  // input xxl
  set ['$input-xxl'](value: string | string[]) {
    this.setInputBreakpoint(value, 'xxl');
  }

  set ['$input-active-xxl'](value: string | string[]) {
    this.setInputBreakpoint(value, 'xxl', 'active');
  }

  set ['$input-focus-visible-xxl'](value: string | string[]) {
    this.setInputBreakpoint(value, 'xxl', 'focus-visible');
  }

  set ['$input-hover-xxl'](value: string | string[]) {
    this.setInputBreakpoint(value, 'xxl', 'hover');
  }

  public async setInput(value: string | string[], state?: StyleStates) {
    await (await import('./styles-scope/$input')).StylesInput.scope(value, this, state);
  }

  public async setInputBreakpoint(
    value: string | string[],
    breakpoint: Breakpoint,
    state?: StyleStates
  ) {
    (await import('./styles-scope-breakpoint/$input-breakpoint')).StylesInputBreakpoint.scope(
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
    (await import('./styles-scope/$attributes')).StylesAttributes.setSpacing(
      this,
      value,
      style,
      attr,
      axis
    );
  }

  public updateStyles() {
    // may be dirty but this can improve dom. *remove all whitespace without using helper function.
    this.styleElement.textContent = `:host{display:block}${this.classCSSResult || ''}${
      this.classStateCSSResult || ''
    }${this.iconCSSResult || ''}${this.beforeCSSResult || ''}${this.afterCSSResult || ''}${
      this.spaceCSSResult || ''
    }${this.animateMapCSSResult || ''}${this.classBreakpointCSSResult || ''}${
      this.classStateBreakpointCSSResult || ''
    }${this.iconBreakpointCSSResult || ''}${this.beforeBreakpointCSSResult || ''}${
      this.afterBreakpointCSSResult || ''
    }${this.animateBreakpointCSSResult || ''}${this.inputCSSResult || ''}${
      this.inputBreakpointCSSResult || ''
    }${this.styleMapCSSResult || ''}${this.styleBreakpointCSSResult || ''}${
      this.slotMapCSSResult || ''
    }${this.slotBreakpointCSSResult || ''}
    `;
  }

  async setClass(value: string | string[], box: CXDiv.Ref, state?: StyleStates) {
    const { StylesScope } = await import('./styles-scope/$class');
    StylesScope.scope(value, box, state);
  }

  async setPseudoUi(
    value: string | string[],
    box: CXDiv.Ref,
    pseudo: 'before' | 'after',
    state?: StyleStates
  ) {
    const { StylesPseudo } = await import('./styles-scope/$pseudo');
    StylesPseudo.scope(value, box, pseudo, state);
  }

  async setPseudoUiBreakpoint(
    value: string | string[],
    pseudo: 'before' | 'after',
    breakpoint: Breakpoint,
    state?: StyleStates
  ) {
    await (
      await import('./styles-scope-breakpoint/$pseudo-breakpoint')
    ).StylesPseudoBreakpoint.scope(breakpoint, value, this, pseudo, state);
  }

  async setIcon(value: string | string[], state?: StyleStates) {
    const { StylesIcon } = await import('./styles-scope/$icon');
    StylesIcon.scope(value, this, state);
  }

  async setIconBreakpoint(value: string | string[], breakpoint: Breakpoint, state?: StyleStates) {
    (await import('./styles-scope-breakpoint/$icon-breakpoint')).StylesIconBreakpoint.scope(
      breakpoint,
      value,
      this,
      state
    );
  }
}

customElements.define('c-div', Div);

declare global {
  namespace CXDiv {
    type Ref = Div;
  }
}
