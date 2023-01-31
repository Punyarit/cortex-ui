import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../base/componentBase/component.base';
import { ColorTypes } from '../../types/colors.version-control';
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
import { ThemeVersion } from '../theme/types/theme.types';
import ButtonFactory from './factory/factories/button.factory';

export const tagName = 'cx-button';
export const onPressed = 'pressed';

@customElement(tagName)
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
      transition: background-color 0.125s, outline-width 0.25s, outline-color 0.25s, box-shadow 0.25s;
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

  constructor() {
    super();
    if (this.config) this.initConfig();
  }

  private initConfig(): void {
    this.fixConfig();
    this.setConfig(this.config);
    this.exec();
  }

  render(): TemplateResult<1> {
    return html`
      <button
        icon-only="${this.set.iconOnly!}"
        class="cx-button-container"
        @click="${this.pressed}"
        data-disabled="${this.set.disabled!}"
        data-loading="${this.set.loading!}"
      >
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
        .set="${{ src: this.set?.iconSrc, color: (<CXButton.Var>this.var)?.textColor }}"
      ></cx-icon>`;
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
        .set="${{ src: this.set?.iconSrc, color: (<CXButton.Var>this.var)?.textColor }}"
      ></cx-icon>`;
    }
  }

  // life cycle
  updated(changedProperties: Map<PropertyKey, unknown>): void {
    if (changedProperties.has('set')) {
      this.setVariablesToElement(ButtonFactory.getCSSVariables(this.set)!);
    }
    super.update(changedProperties);
  }

  // Methods
  // FIXME: remove this method when everything is done!
  public onLog(config: { text: string }): void {
    console.log('Log:', config.text);
  }

  // Events
  private pressed(): void {
    this.setCustomEvent<CXButton.Details[typeof onPressed]>(onPressed, {
      event: onPressed,
    });
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXButton {
    type Ref = Button;

    type Var<T extends ThemeVersion = 2> = {
      width?: SizeTypes;
      height?: SizeTypes;
      textColor?: ColorTypes<T>;
      textActiveColor?: ColorTypes<T>;
      textDisabledColor?: ColorTypes<T>;
      backgroundColor?: ColorTypes<T>;
      disabledColor?: ColorTypes<T>;
      hoverColor?: ColorTypes<T>;
      textHoverColor?: ColorTypes<T>;
      activeColor?: ColorTypes<T>;
      borderColor?: ColorTypes<T>;
      borderDisabledColor?: ColorTypes<T>;
      borderRadius?: BaseSizeTypes;
      borderWidth?: SizeTypes;
      outlineColor?: ColorTypes<T>;
      outlineWidth?: SizeTypes;
      paddingLeft?: SizeTypes;
      paddingRight?: SizeTypes;
      paddingTop?: SizeTypes;
      paddingBottom?: SizeTypes;
      boxShadow?: ColorTypes<T>;
      fontSize?: SizeTypes;
    };

    type Set<T extends ThemeVersion = 2> = {
      disabled?: boolean;
      type?: ButtonTypes<T>;
      color?: ButtonColors<T>;
      size?: ButtonSizes;
      iconSide?: ButtonIconSides;
      iconOnly?: boolean;
      iconSrc?: IconSrcTypes;
      text?: string | number;
      loading?: boolean;
    };

    type Fix = Required<{
      [K in keyof Set]: (value: Set[K]) => Fix;
    }> & { exec: () => Ref };

    type Props = {
      var: Pick<Var, ButtonExposeVar>;
      set: Set;
      fix: Fix;
    };

    type Details = {
      [onPressed]: { event: string };
    };

    type Events = {
      [onPressed]: (detail: Pressed) => void;
    };

    type Pressed = CustomEvent<Details[typeof onPressed]>;
  }

  interface HTMLElementTagNameMap {
    [tagName]: CXButton.Ref;
  }
}
