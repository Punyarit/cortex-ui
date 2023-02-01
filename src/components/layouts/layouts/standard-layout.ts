import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../../base/component-base/component.base';

export const tagName = 'cx-default-layout';
// export const onPressed = 'pressed';

@customElement(tagName)
export class StandardLayout extends ComponentBase<StandardLayout.Props> {
  // config: StandardLayout.Set = {};

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
    return html`<div>cx-default-layout Component was created!</div>`;
  }

  // Method
  // public log(config: { text: string }): void {
  //   console.log('log: ', config.text);
  // }

  // Event
  // private pressed(): void {
  //   this.setCustomEvent<StandardLayout.Details[typeof onPressed]>(onPressed, {
  //     event: onPressed,
  //   });
  // }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace StandardLayout {
    type Ref = StandardLayout;

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
      [tagName]: StandardLayout.Ref;
    }
  }

  interface HTMLElementTagNameMap {
    [tagName]: StandardLayout.Ref;
  }

  // interface GlobalEventHandlersEventMap {
  //   [onPressed]: StandardLayout.Pressed;
  // }
}
