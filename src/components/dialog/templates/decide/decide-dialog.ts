import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ThemeVersion } from '../../../theme/types/theme.types';
import '../../../button/button';
import { DecideDialogSingleton } from './decide-dialog.singleton';

export const tagName = 'cx-decide-dialog';
// export const onPressed = 'pressed';

@customElement(tagName)
export class DecideDialog extends LitElement {
  static styles = css``;

  @property({ type: String }) public title!: string;
  @property({ type: String }) public description!: string;
  @property({ type: String }) public textActionLeft!: string;
  @property({ type: String }) public textActionRight!: string;

  render(): TemplateResult {
    return html`<div>
      <div>${this.title}</div>
      <div>${this.description}</div>
      <cx-button .set="${{ text: this.textActionLeft }}"></cx-button>
      <cx-button .set="${{ text: this.textActionRight }}"></cx-button>
    </div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    DecideDialogSingleton.ref = this;
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXDecideDialog {
    type Ref = DecideDialog;
  }
}
