import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { BaseSizeTypes, SizeTypes } from '../../types/sizes.type';
import {
  ButtonColors,
  ButtonExposeVar,
  ButtonIconSides,
  ButtonSizes,
  ButtonTypes,
} from './types/button.config.types';
import '../icon/icon';
import { IconSrcTypes } from '../icon/types/icon.types';
import '../spinner/spinner';
import ButtonFactory from './factory/factories/button.factory';
import { CxButtonPressed } from './types/button.types';
import { CxButtonName } from './types/button.name';
import { ColorTypes } from '../../types/colors.type';

@customElement(CxButtonName)
export class Button extends ComponentBase<CXButton.Props> {
  config: CXButton.Props['set'] = {
    disabled: false,
    type: 'primary',
    color: 'primary',
    size: 'medium',
    iconSrc: undefined,
    iconSide: 'prefix',
    iconOnly: false,
    text: '',
    loading: false,
  };

  static styles = css`
    :host {
      /* default variable will not change */
      --fontSize: var(--size-16);
      --paddingLeft: var(--size-16);
      --paddingRight: var(--size-16);
      --paddingTop: var(--size-10);
      --paddingBottom: var(--size-10);
      --borderRadius: var(--base-size-8);
      --outlineWidth: var(--size-3);

      display: inline-block;
    }
    .cx-button-container {
      font-family: inherit;
      min-width: var(--width);
      font-size: var(--fontSize);
      height: var(--height);
      color: var(--textColor);
      background-color: var(--backgroundColor);
      padding-left: var(--paddingLeft);
      padding-right: var(--paddingRight);
      padding-top: var(--paddingTop);
      padding-bottom: var(--paddingBottom);
      border-radius: var(--borderRadius);
      border-style: solid;
      cursor: pointer;
      user-select: none;
      border-width: var(--borderWidth);
      border-color: var(--borderColor);
      transition: background-color 0.125s, outline-width 0.25s, outline-color 0.25s,
        box-shadow 0.25s;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .cx-button-container[icon-only='true'] {
      min-width: var(--height);
      padding-left: var(--size-0);
      padding-right: var(--size-0);
      padding-top: var(--size-0);
      padding-bottom: var(--size-0);
    }

    .cx-button-container[data-disabled='true'] {
      background-color: var(--disabledColor);
      border-color: var(--borderDisabledColor);
      cursor: default;
      outline-width: var(--size-0);
      pointer-events: none;
      color: var(--textDisabledColor);
    }

    .cx-button-container[data-loading='true'] {
      pointer-events: none;
    }

    .cx-button-container:hover {
      background-color: var(--hoverColor);
      color: var(--textHoverColor);
      box-shadow: 0 0 var(--size-10) 0 var(--boxShadow);
    }

    .cx-button-container:active {
      background-color: var(--activeColor);
      color: var(--textActiveColor);
    }

    .cx-button-container:focus {
      outline-style: solid;
      outline-width: var(--outlineWidth);
      outline-color: var(--outlineColor);
    }
    cx-icon[prefix='true'] {
      margin-right: var(--size-10);
    }
    cx-icon[suffix='true'] {
      margin-left: var(--size-10);
    }

    cx-icon[prefix='true'],
    cx-icon[suffix='true'] {
      visibility: visible !important;
    }

    cx-icon[prefix='false'],
    cx-icon[suffix='false'] {
      visibility: hidden;
    }

    cx-icon[icon-only='true'] {
      margin-right: var(--size-0);
      visibility: visible !important;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
    if (this.config) this.exec();
  }

  render(): TemplateResult {
    return html`
      <style></style>
      <button
        icon-only="${this.set.iconOnly!}"
        class="cx-button-container"
        @click="${this.pressed}"
        data-disabled="${this.set.disabled!}"
        data-loading="${this.set.loading!}">
        ${this.renderIconLeft()} ${this.renderContent()} ${this.renderIconRight()}
      </button>
    `;
  }

  private setSpinnerConfig(): CXSpinner.Props['set'] {
    const spinnerSet: CXSpinner.Props['set'] = {
      color: this.set?.color,
      size: this.set?.size,
    };
    if (this.set?.type === 'primary') {
      spinnerSet.color = 'white';
    } else if (
      this.set?.color === 'primary' &&
      (this.set?.type === 'tertiary' || this.set.type === 'secondary-outline')
    ) {
      spinnerSet.color = 'gray';
    }
    return spinnerSet;
  }

  private renderIconLeft(): TemplateResult | undefined {
    if (this.set?.loading && this.set?.iconOnly) {
      const spinnerSet = this.setSpinnerConfig();
      return html`<cx-spinner .set="${spinnerSet}"></cx-spinner>`;
    }

    if (this.set?.iconSrc && !this.set?.loading) {
      return html` <cx-icon
        prefix="${this.set?.iconSide === 'prefix'}"
        icon-only="${this.set.iconOnly!}"
        .set="${{
          src: this.set?.iconSrc,
          color: (<CXButton.Var>this.var)?.textColor,
        }}"></cx-icon>`;
    }
  }

  private renderContent(): TemplateResult | undefined {
    if (this.set?.iconOnly) return;

    if (this.set?.loading) {
      const spinnerSet = this.setSpinnerConfig();
      return html`<cx-spinner .set="${spinnerSet}"></cx-spinner>`;
    }
    return html`<slot></slot>${this.set?.text}`;
  }

  private renderIconRight(): TemplateResult | undefined {
    if (this.set?.iconSrc && !this.set?.iconOnly && !this.set?.loading) {
      return html` <cx-icon
        suffix="${this.set?.iconSide === 'suffix'}"
        .set="${{
          src: this.set?.iconSrc,
          color: (<CXButton.Var>this.var)?.textColor,
        }}"></cx-icon>`;
    }
  }

  // life cycle
  updated(changedPros: Map<PropertyKey, unknown>): void {
    // 📌 offsetParent === null mean element is not visible from dom
    if (this.offsetParent === null) return;
    // 📌changedPros.has('set') will execute for init variables for 1st time and when "set" change
    if (changedPros.has('set')) {
      this.cacheVariables({ ...ButtonFactory.getCSSVariables(this.set)!, ...this.var });
      this.setHostVariables();
    }

    super.update(changedPros);
  }

  // Methods
  // FIXME: remove this method when everything is done!
  public onLog(config: { text: string }): void {
    console.log('Log:', config.text);
  }

  // Events
  private pressed(): void {
    // test
    this.setCustomEvent<CXButton.Details[typeof CxButtonPressed]>(CxButtonPressed, {
      event: CxButtonPressed,
    });
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXButton {
    type Ref = Button;

    type Var = {
      width?: SizeTypes;
      height?: SizeTypes;
      textColor?: ColorTypes;
      textActiveColor?: ColorTypes;
      textDisabledColor?: ColorTypes;
      backgroundColor?: ColorTypes;
      disabledColor?: ColorTypes;
      hoverColor?: ColorTypes;
      textHoverColor?: ColorTypes;
      activeColor?: ColorTypes;
      borderColor?: ColorTypes;
      borderDisabledColor?: ColorTypes;
      borderRadius?: BaseSizeTypes;
      borderWidth?: SizeTypes;
      outlineColor?: ColorTypes;
      outlineWidth?: SizeTypes;
      paddingLeft?: SizeTypes;
      paddingRight?: SizeTypes;
      paddingTop?: SizeTypes;
      paddingBottom?: SizeTypes;
      boxShadow?: ColorTypes;
      fontSize?: SizeTypes;
    };

    type Set = {
      disabled?: boolean;
      type?: ButtonTypes;
      color?: ButtonColors;
      size?: ButtonSizes;
      iconSide?: ButtonIconSides;
      iconOnly?: boolean;
      iconSrc?: IconSrcTypes;
      text?: string | number;
      loading?: boolean;
    };

    type Fix = Required<{
      [K in keyof Set]: (value: Set[K]) => Fix;
    }> & { exec: () => void };

    type Props = {
      var: Pick<Var, ButtonExposeVar>;
      set: Set;
      fix: Fix;
      make: Var;
    };

    type Details = {
      [CxButtonPressed]: { event: string };
    };

    type Events = {
      [CxButtonPressed]: (detail: Pressed) => void;
    };

    type Pressed = CustomEvent<Details[typeof CxButtonPressed]>;
  }

  interface HTMLElementTagNameMap {
    [CxButtonName]: CXButton.Ref;
  }
}
