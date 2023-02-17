import { css, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { ModalSingleton } from '../modal/singleton/modal.singleton';
import { ThemeVersion } from '../theme/types/theme.types';
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
  }

  private setOpenPopover = async () => {
    const popoverContentElement = await this.getPopoverContentElement();
    if (!popoverContentElement) return;
    ModalSingleton.modalRef.openPopovre(
      popoverContentElement,
      this.hostElement!.getBoundingClientRect(),
      this.set,
      this.shadowRoot!.host as HTMLElement
    );
  };

  private async getPopoverContentElement() {
    return await this.getPopoverContent();
  }

  public close() {
    ModalSingleton.modalRef.closePopover();
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

    type Var<T extends ThemeVersion = 2> = unknown;

    type Set<T extends ThemeVersion = 2> = {
      openby?: 'click' | 'mouseover';
      position?: PopoverPositionType;
      mouseleave?: 'none' | 'close';
      focusout: 'none' | 'close';
      arrowpoint?: boolean;
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
