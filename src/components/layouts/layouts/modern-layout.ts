import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../../base/component-base/component.base';

export const tagName = 'cx-modern-layout';
// export const onPressed = 'pressed';

@customElement(tagName)
export class ModernLayout extends ComponentBase<CXModernLayout.Props> {
  // config: CXModernLayout.Set = {};

  static styles = css``;

  constructor() {
    super();
    if (this.config) this.exec();
  }

  render(): TemplateResult {
    return html`<div>cx-modern-layout Component was created!</div>`;
  }

  // Method
  // public log(config: { text: string }): void {
  //   console.log('log: ', config.text);
  // }

  // Event
  // private pressed(): void {
  //   this.setCustomEvent<CXModernLayout.Details[typeof onPressed]>(onPressed, {
  //     event: onPressed,
  //   });
  // }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXModernLayout {
    type Ref = ModernLayout;

    type Var = unknown;

    type Set = unknown;

    type Fix = Required<{ [K in keyof Set]: (value: Set[K]) => Fix }> & { exec: () => Ref };

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

  namespace JSX {
    interface IntrinsicElements {
      [tagName]: CXModernLayout.Ref;
    }
  }

  interface HTMLElementTagNameMap {
    [tagName]: CXModernLayout.Ref;
  }

  // interface GlobalEventHandlersEventMap {
  //   [onPressed]: CXModernLayout.Pressed;
  // }
}
