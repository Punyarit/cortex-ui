import { css, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { ModalSingleton } from '../modal/singleton/modal.singleton';
import { ThemeVersion } from '../theme/types/theme.types';
import { createRef, ref } from 'lit/directives/ref.js';
import { PopoverState } from '../modal/state/popover.state';

export const tagName = 'cx-popover';
// export const onPressed = 'pressed';

/**
 * use case
 * position
 * left | top | buttom | right
 *
 */

@customElement(tagName)
export class Popover extends ComponentBase<CXPopover.Props> {
  config: CXPopover.Set = {
    event: 'click',
  };

  static styles = css`
    .popover {
      display: inline-block;
      background-color: var(--white);
      border-radius: var(--base-size-8);
    }
  `;

  private hostSlotRef = createRef<HTMLSlotElement>();
  private popoverSlotRef = createRef<HTMLSlotElement>();
  private hostElement?: HTMLElement;

  @state() status: 'open' | 'closed' = 'closed';

  render(): TemplateResult {
    return html`
      <slot name="host" ${ref(this.hostSlotRef)}></slot>
      ${this.status === 'open'
        ? html`<slot name="popover" ${ref(this.popoverSlotRef)}></slot>`
        : undefined}
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    if (this.config) this.exec();

    this.hostElement = await this.setHostElement();

    this.setHostEvent();
  }

  private setHostElement(): Promise<HTMLElement> {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        resolve(this.hostSlotRef.value?.assignedElements()[0] as HTMLElement);
      });
    });
  }

  private setHostEvent() {
    this.hostElement?.addEventListener(this.set.event!, this.setOpenPopover);
  }

  private setOpenPopover = async () => {
    this.setStatus('open');
    const popoverContent = await this.getPopoverContent();
    ModalSingleton.modalRef.openPopovre(popoverContent);
    // refactor to popoverState
  };

  private setStatus(status: 'open' | 'closed') {
    this.status = status;
  }

  private getPopoverContent(): Promise<HTMLElement> {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        resolve(this.popoverSlotRef.value?.assignedElements()[0] as HTMLElement);
      });
    });
  }

  updated() {
    // ModalSingleton.ref?.append(this);
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

    type Set<T extends ThemeVersion = 2> = {
      event?: 'click' | 'mouseover';
    };

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
