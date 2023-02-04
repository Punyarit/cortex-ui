import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { ModalSingleton } from '../modal/singleton/modal.singleton';
import { ThemeVersion } from '../theme/types/theme.types';

export const tagName = 'cx-popover';
// export const onPressed = 'pressed';

@customElement(tagName)
export class Popover extends ComponentBase<CXPopover.Props> {
  // config: CXPopover.Set = {};

  static styles = css`
    .popover {
      display: inline-block;
      background-color: var(--white);
      border-radius: var(--base-size-8);
    }
  `;

  constructor() {
    super();
    if (this.config) this.exec();
  }

  render(): TemplateResult {
    return html`<div class="popover">
      <slot></slot>
    </div>`;
  }

  updated() {
    ModalSingleton.ref?.append(this);
  }
  // Method
  // public log(config: { text: string }): void {
  //   console.log('log: ', config.text);
  // }

  // Event
  // private pressed(): void {
  //   this.setCustomEvent<CXPopover.Details[typeof onPressed]>(onPressed, {
  //     event: onPressed,
  //   });
  // }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXPopover {
    type Ref = Popover;

    type Var<T extends ThemeVersion = 2> = unknown;

    type Set<T extends ThemeVersion = 2> = unknown;

    type Fix = Required<{ [K in keyof Set]: (value: Set[K]) => Fix }> & {
      exec: () => void;
    };

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
    [tagName]: CXPopover.Ref;
  }

  // namespace JSX {
  //  interface IntrinsicElements {
  //   [tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> | CXPopover.Ref;
  //  }
  // }

  // interface GlobalEventHandlersEventMap {
  //   [onPressed]: CXPopover.Pressed;
  // }
}
