import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { colors } from '../constants/version-2/color.base.theme';
import { dark } from '../constants/version-2/color.dark.theme';
import { light } from '../constants/version-2/color.light.theme';
import { fontWeights } from '../constants/version-2/font-weight.theme';
import { numbers } from '../constants/version-2/number.theme';
import { sizes } from '../constants/version-2/size.theme';

@customElement('cx-theme-v2')
export class ThemeV2 extends LitElement {
  static styles = [colors, light, dark, fontWeights, sizes, numbers];
  render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
