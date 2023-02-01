import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';

export const tagName = 'cx-menu';
// export const onPressed = 'pressed';

@customElement(tagName)
export class Menu extends ComponentBase<CXMenu.Props> {
  // config: CXMenu.Set = {};

  static styles = css``;

  constructor() {
    super();
    if (this.config) this.initConfig();
  }

  private initConfig(): void {
    this.fixConfig();
    this.cacheConfig(this.config);
    this.exec();
  }

  render(): TemplateResult {
    return html`<div>cx-menu Component was created!</div>`;
  }

  // Method
  // public log(config: { text: string }): void {
  //   console.log('log: ', config.text);
  // }

  // Event
  // private pressed(): void {
  //   this.setCustomEvent<CXMenu.Details[typeof onPressed]>(onPressed, {
  //     event: onPressed,
  //   });
  // }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXMenu {
    type Ref = Menu;

    type Var = unknown;

    type Set = unknown;

    type Fix = { [K in keyof Set]: (value: Set[K]) => Fix } & { exec: () => Ref };

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
    [tagName]: CXMenu.Ref;
  }

  // interface GlobalEventHandlersEventMap {
  //   [onPressed]: (customEvent: CXMenu.Pressed) => void;
  // }
}
