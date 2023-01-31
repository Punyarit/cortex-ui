import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../../base/componentBase/component.base';
import { ThemeVersion } from '../theme/types/theme.types';

export const tagName = 'cx-decide-dialog';
// export const onPressed = 'pressed';

@customElement(tagName)
export class DecideDialog extends ComponentBase<CXDecideDialog.Props> {
  // config: CXDecideDialog.Set = {};

  static styles = css``;

  constructor() {
    super();
    if (this.config) this.initConfig();
  }

  private initConfig(): void {
    this.fixConfig();
    this.setConfig(this.config);
    this.exec();
  }

  render(): TemplateResult {
    return html`<div>cx-decide-dialog Component was created!</div>`;
  }

  // Method
  // public log(config: { text: string }): void {
  //   console.log('log: ', config.text);
  // }

  // Event
  // private pressed(): void {
  //   this.setCustomEvent<CXDecideDialog.Details[typeof onPressed]>(onPressed, {
  //     event: onPressed,
  //   });
  // }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXDecideDialog {
    type Ref = DecideDialog;

    type Var<T extends ThemeVersion = 2> = unknown;

    type Set<T extends ThemeVersion = 2> = unknown;

    type Fix = Required<{ [K in keyof Set]: (value: Set[K]) => Fix }> & { exec: () => void };

    type Props = {
      var: Pick<Var, never>;
      set: Set;
      fix: Fix;
    };

    // type Details = {
    //   [onPressed]: { event: string };
    // };

    // type Events = {
    //   [onPressed]: (detail: Pressed) => void;
    // };

    // type Pressed = CustomEvent<Details[typeof onPressed]>;
  }

  interface HTMLElementTagNameMap {
    [tagName]: CXDecideDialog.Ref;
  }

  // namespace JSX {
  //  interface IntrinsicElements {
  //   [tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> | CXDecideDialog.Ref;
  //  }
  // }

  // interface GlobalEventHandlersEventMap {
  //   [onPressed]: CXDecideDialog.Pressed;
  // }
}
