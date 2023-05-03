import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../div/div';
import { classes, styles } from './button.styles';

@customElement('c-button')
export class Button extends LitElement {
  static styles = css``;

  @property({ type: Object })
  styles = {} as typeof this.styleResult;

  @property({ type: Object })
  configs = {
    type: 'primary',
  };

  private styleResult = {
    round: 12,
    bgColor: 'error-500',
    txColor: 'black',
    w: '100pc',
    select: 'auto',
  };

  // private configResult = this.configs;

  render() {
    return html`
      <c-div
        .$style="round-${this.styles.round || this.styleResult.round} transition-250"
        .$style-focus-within=${'shadow-3-solid-primary-200'}>
        <c-div
          .$css="${{}}"
          .$css-active="${{}}"
          .$css-toggle="${{}}"
          .$css-active-xs="${{}}"
          .$css-toggle-xs="${{}}"
          .$icon="${'angle-left-u: tx-white'}"
          .$style="${styles.setStyle(
            this.styles.round || this.styleResult.round,
            this.styles.bgColor || this.styleResult.bgColor,
            this.styles.txColor || this.styleResult.txColor,
            this.styles.w || this.styleResult.w,
            this.styles.select || this.styleResult.select
          )}"
          .$style-active="${'bg-primary-700! shadow-5!'}"
          .$style-hover="${'bg-primary-600'}"
          .$style-focus="${'shadow-3'}"
          .$class=${classes.wrapper}>
          <slot></slot>
        </c-div>
      </c-div>
    `;
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }
}
