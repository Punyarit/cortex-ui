import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { ModalSingleton } from '../modal/singleton/modal.singleton';
import { createRef, ref } from 'lit/directives/ref.js';
import { PopoverPositionType } from './types/popover.types';
import { REQUIRED_CBOX_CHILD_POPOVER_ERROR } from './errors/popover.errors';
import { CxPopoverName } from './types/popover.name';

@customElement(CxPopoverName)
export class Popover extends ComponentBase<CXPopover.Props> {
  config: CXPopover.Set = {
    openby: 'click',
    position: 'bottom-center',
    mouseleave: 'none',
    focusout: 'close',
    arrowpoint: false,
    transform: 'origin',
  };

  static styles = css`
    .popover-disabled {
      display: none;
    }
  `;

  private hostSlotRef = createRef<HTMLSlotElement>();
  private popoverSlotRef = createRef<HTMLSlotElement>();
  private hostElement?: HTMLElement;

  render(): TemplateResult {
    return html`
      <slot name="host" ${ref(this.hostSlotRef)}></slot>
      <slot class="popover-disabled" name="popover" ${ref(this.popoverSlotRef)}></slot>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
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
    this.hostElement?.addEventListener(this.set.openby!, this.setOpenPopover);
    this.hostElement?.setAttribute('inline-block', '');
  }

  private setOpenPopover = async (triggerEvent: Event) => {
    const popoverContentElement = await this.getPopoverContentElement();
    if (!popoverContentElement) return;
    ModalSingleton.modalRef.openPopover(
      popoverContentElement,
      this.hostElement!.getBoundingClientRect(),
      this.set,
      this.shadowRoot!.host as HTMLElement,
      triggerEvent
    );
  };

  private async getPopoverContentElement() {
    return await this.getPopoverContent();
  }

  private getPopoverContent(): Promise<HTMLElement | null> {
    return new Promise((resolve, reject) => {
      requestAnimationFrame(() => {
        const cBox = this.popoverSlotRef.value?.assignedElements()[0] as HTMLElement;
        if (cBox) {
          cBox.tagName === 'C-BOX' ? resolve(cBox) : reject(REQUIRED_CBOX_CHILD_POPOVER_ERROR);
        } else {
          resolve(null);
          console.warn('You must close popover by close button');
        }
      });
    });
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXPopover {
    type Ref = Popover;

    type Var = unknown;

    type Set = {
      openby?: 'click' | 'mouseover';
      position?: PopoverPositionType;
      mouseleave?: 'none' | 'close';
      focusout: 'none' | 'close';
      arrowpoint?: boolean;
      transform?: 'center' | 'origin';
    };

    type Fix = Required<{ [K in keyof Set]: (value: Set[K]) => Fix }> & {
      exec: () => void;
    };

    type Props = {
      var: Pick<Var, never>;
      set: Set;
      fix: Fix;
    };

    type Details = {
      ['opened']: { event: Event; state: 'closed' };
      ['closed']: { event: Event; state: 'closed' };
    };

    type Events = {
      ['opened']: (detail: OnOpened) => void;
      ['closed']: (detail: OnClosed) => void;
    };

    type OnOpened = CustomEvent<Details['opened']>;
    type OnClosed = CustomEvent<Details['closed']>;
  }

  interface HTMLElementTagNameMap {
    [CxPopoverName]: CXPopover.Ref;
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
