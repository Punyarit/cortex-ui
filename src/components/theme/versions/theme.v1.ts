import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { colorsTheme } from '../constants/version-1/colorTheme';
import { fontTheme } from '../constants/version-1/fontTheme';

@customElement('cx-theme-v1')
export class ThemeV1 extends LitElement {
  static styles = [colorsTheme, fontTheme];
  render(): TemplateResult {
    return html` <slot></slot>`;
  }
}
