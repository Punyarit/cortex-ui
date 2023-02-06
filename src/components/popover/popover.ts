import { css, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { ModalSingleton } from '../modal/singleton/modal.singleton';
import { ThemeVersion } from '../theme/types/theme.types';
import { createRef, ref } from 'lit/directives/ref.js';
import { PopoverPositionType } from './types/popover.types';

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
    position: 'bottom-center',
    arrowPoint: false,
  };

  static styles = css`
    .popover-disabled {
      display: none;
    }
  `;

  private hostSlotRef = createRef<HTMLSlotElement>();
  private popoverSlotRef = createRef<HTMLSlotElement>();
  private hostElement?: HTMLElement;
  private popoverContentElement?: HTMLElement;

  render(): TemplateResult {
    return html`
      <slot name="host" ${ref(this.hostSlotRef)}></slot>
      <slot class="popover-disabled" name="popover" ${ref(this.popoverSlotRef)}></slot>
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
    await this.setPopoverContentElement();

    ModalSingleton.modalRef.openPopovre(
      this.popoverContentElement!,
      this.hostElement!.getBoundingClientRect(),
      this.set.position!
    );
  };

  private async setPopoverContentElement() {
    this.popoverContentElement = await this.getPopoverContent();
  }

  private getPopoverContent(): Promise<HTMLElement> {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        const popoverContent = this.popoverSlotRef.value?.assignedElements()[0] as HTMLElement;
        resolve(popoverContent);
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
      position?: PopoverPositionType;
      arrowPoint?: boolean;
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
