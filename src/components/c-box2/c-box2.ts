import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { AttributeChangedType } from './types/attribute-changed.types';
import { CBoxTypes } from './types/c-box.types';

export type UiStyleText = {
  class: string[];
  style: string[];
  rule: string[];
};
@customElement('c-box2')
export class CBox extends LitElement {
  static styles = css``;

  // ui
  public uiStyleTexts?: UiStyleText;
  @property({ type: Object }) ['ui']?: string[];
  public uiActiveTexts?: UiStyleText;
  @property({ type: Object }) ['ui-active']?: string[];
  public uiFocusTexts?: UiStyleText;
  @property({ type: Object }) ['ui-focus']?: string[];
  public uiFocusVisibleTexts?: UiStyleText;
  @property({ type: Object }) ['ui-focus-visible']?: string[];
  public uiFocusWithinTexts?: UiStyleText;
  @property({ type: Object }) ['ui-focus-within']?: string[];
  public uiHoverTexts?: UiStyleText;
  @property({ type: Object }) ['ui-hover']?: string[];
  public uiTargetTexts?: UiStyleText;
  @property({ type: Object }) ['ui-target']?: string[];
  public uiToggleTexts?: UiStyleText;
  @property({ type: Object }) ['ui-toggle']?: string[];

  // border
  @property({ type: String }) ['border']?: string;
  @property({ type: String }) ['border-left']?: string;
  @property({ type: String }) ['border-top']?: string;
  @property({ type: String }) ['border-right']?: string;
  @property({ type: String }) ['border-bottom']?: string;
  @property({ type: String }) ['tx']?: string;

  // icon prefix
  @property({ type: String }) ['icon-prefix']?: string;
  @property({ type: String }) ['icon-prefix-active']?: string;
  @property({ type: String }) ['icon-prefix-focus-within']?: string;
  @property({ type: String }) ['icon-prefix-focus']?: string;
  @property({ type: String }) ['icon-prefix-focus-visible']?: string;
  @property({ type: String }) ['icon-prefix-hover']?: string;
  @property({ type: String }) ['icon-prefix-target']?: string;
  @property({ type: String }) ['icon-prefix-toggle']?: string;
  // icon suffix
  @property({ type: String }) ['icon-suffix']?: string;
  @property({ type: String }) ['icon-suffix-active']?: string;
  @property({ type: String }) ['icon-suffix-focus-within']?: string;
  @property({ type: String }) ['icon-suffix-focus']?: string;
  @property({ type: String }) ['icon-suffix-focus-visible']?: string;
  @property({ type: String }) ['icon-suffix-hover']?: string;
  @property({ type: String }) ['icon-suffix-target']?: string;
  @property({ type: String }) ['icon-suffix-toggle']?: string;
  // VariableAttribute
  @property({ type: String }) ['bg']?: string;

  // ValueAttribute
  @property({ type: String }) ['transition']?: string;
  @property({ type: String }) ['cursor']?: string;
  @property({ type: String }) ['display']?: string;
  @property({ type: String }) ['flex-basis']?: string;
  @property({ type: String }) ['flex-direction']?: string;
  @property({ type: String }) ['flex-grow']?: string;
  @property({ type: String }) ['flex-shrink']?: string;
  @property({ type: String }) ['flex-wrap']?: string;
  @property({ type: String }) ['opacity']?: string;
  @property({ type: String }) ['order']?: string;
  @property({ type: String }) ['overflow']?: string;
  @property({ type: String }) ['overflow-x']?: string;
  @property({ type: String }) ['overflow-y']?: string;
  @property({ type: String }) ['position']?: string;
  @property({ type: String }) ['tx-overflow']?: string;
  @property({ type: String }) ['tx-transform']?: string;
  @property({ type: String }) ['user-select']?: string;
  @property({ type: String }) ['visibility']?: string;
  @property({ type: String }) ['whitespace']?: string;
  @property({ type: String }) ['z-index']?: string;
  // SizeVariableAttribute
  @property({ type: String }) ['round']?: string;
  @property({ type: String }) ['left']?: string;
  @property({ type: String }) ['top']?: string;
  @property({ type: String }) ['right']?: string;
  @property({ type: String }) ['bottom']?: string;
  @property({ type: String }) ['col-gap']?: string;
  @property({ type: String }) ['row-gap']?: string;
  @property({ type: String }) ['h']?: string;
  @property({ type: String }) ['min-h']?: string;
  @property({ type: String }) ['max-h']?: string;
  @property({ type: String }) ['w']?: string;
  @property({ type: String }) ['min-w']?: string;
  @property({ type: String }) ['max-w']?: string;
  @property({ type: String }) ['m']?: string;
  @property({ type: String }) ['ml']?: string;
  @property({ type: String }) ['mt']?: string;
  @property({ type: String }) ['mr']?: string;
  @property({ type: String }) ['mb']?: string;
  @property({ type: String }) ['p']?: string;
  @property({ type: String }) ['pl']?: string;
  @property({ type: String }) ['pt']?: string;
  @property({ type: String }) ['pr']?: string;
  @property({ type: String }) ['pb']?: string;
  @property({ type: String }) ['mx']?: string;
  @property({ type: String }) ['my']?: string;
  @property({ type: String }) ['px']?: string;
  @property({ type: String }) ['py']?: string;

  public styleRef = createRef();

  render() {
    return html`
      <style ${ref(this.styleRef)}>
        ${this.uiStyleTexts?.rule}
        ${this.uiActiveTexts?.rule}
        ${this.uiFocusTexts?.rule}
        ${this.uiFocusVisibleTexts?.rule}
        ${this.uiFocusWithinTexts?.rule}
        ${this.uiHoverTexts?.rule}
        ${this.uiTargetTexts?.rule}
        ${this.uiToggleTexts?.rule}
      </style>
      <slot></slot>
    `;
  }

  async willUpdate(changedProps: Map<AttributeChangedType, unknown>) {
    for (const attr in Object.fromEntries(changedProps)) {
      new (await import('./AttributeFactory')).AttributeFactory(
        attr as AttributeChangedType,
        this as CBox2.Ref
      ).construct();
    }
    super.willUpdate(changedProps);
  }
}

declare global {
  namespace CBox2 {
    type Ref = CBox;
  }

  namespace JSX {
    interface IntrinsicElements {
      ['c-box2']:
        | React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
        | CBoxTypes;
    }
  }

  interface HTMLElementTagNameMap {
    ['c-box2']: CBox2.Ref;
  }
}
