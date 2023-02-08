import { debounce } from '../../../../helpers/debounceTimer';
import { PopoverPositionType } from '../../../popover/types/popover.types';
import { Modal } from '../../modal';
import { resizeObserver } from '../../obsrevers/resize.observer';
import { ModalSingleton } from '../../singleton/modal.singleton';
import { PopoverPosition } from './PopoverPosition';

export class PopoverState {
  public static POPOVER_SLOT_DISABLED = 'popover-disabled';
  public static POPOVER_SLOT_OPEN = 'popover';

  private hostRect!: DOMRect;
  private positionType!: PopoverPositionType;
  private popoverContent!: HTMLElement;
  private popoverHost!: HTMLElement;
  private resizeObserver!: ResizeObserver;
  private popoverSet!: CXPopover.Set;
  #firstUpdated = true;

  async open(
    popoverContent: HTMLElement,
    hostRect: DOMRect,
    popoverSet: CXPopover.Set,
    popoverHost: HTMLElement
  ): Promise<void> {
    this.setProperties(popoverContent, hostRect, popoverSet, popoverHost);
    this.setResizeEvent();
    this.setOpacity('0');
    this.setContentInlineBlock();
    this.setFocusOutEventListener();
    this.setPopoverAppear();
    this.setMouseleaveEvent();
    requestAnimationFrame(() => {
      this.setOpacity('1');
    });
  }

  private setResizeEvent() {
    this.resizeObserver = resizeObserver(document.body, (resizeEntry: ResizeObserverEntry) => {
      if (this.#firstUpdated) {
        this.setPosition(resizeEntry);
        this.setFirstUpdatd(false);
      } else {
        debounce(() => this.setPosition(resizeEntry), 200);
      }
    });
  }

  private unObserveResizeEvent = () => {
    this.resizeObserver.unobserve(document.body);
  };

  private setPopoverAppear() {
    ModalSingleton.popoverSlotRef.name = PopoverState.POPOVER_SLOT_OPEN;
    ModalSingleton.popoverSlotRef.parentElement!.classList.remove(Modal.MODAL_DISABLED);
    ModalSingleton.modalRef.append(this.popoverContent);
  }

  private setMouseleaveEvent() {
    if (this.popoverSet.mouseleave === 'none') return;
    this.popoverContent.onmouseleave = this.closePopover;
    this.popoverHost.onmouseleave = this.closePopover;
  }

  private setProperties(
    popoverContent: HTMLElement,
    hostRect: DOMRect,
    popoverSet: CXPopover.Set,
    popoverHost: HTMLElement
  ) {
    this.popoverContent = popoverContent;
    this.hostRect = hostRect;
    this.positionType = popoverSet.position!;
    this.popoverSet = popoverSet;
    this.popoverHost = popoverHost;
  }

  public async setPosition(resizeEntry: ResizeObserverEntry): Promise<void> {
    const translateValue = await new PopoverPosition(
      this.positionType,
      this.hostRect,
      this.popoverContent,
      resizeEntry
    ).getResult();

    if (this.popoverContent.style.translate === translateValue) return;
    this.popoverContent.style.translate = translateValue!;
  }

  private setFocusOutEventListener() {
    this.popoverContent.tabIndex = 0;
    this.popoverContent.addEventListener('focusout', this.closePopover);

    requestAnimationFrame(() => {
      this.popoverContent.focus();
    });
  }

  private setFirstUpdatd(update: boolean) {
    this.#firstUpdated = update;
  }

  private closePopover = (e: MouseEvent | FocusEvent) => {
    if ((e.relatedTarget as HTMLElement)?.closest('c-box[slot="popover"]')) return;
    this.setFirstUpdatd(true);
    this.unObserveResizeEvent();
    this.appendBackToParentRoot();
  };

  private appendBackToParentRoot() {
    requestAnimationFrame(() => {
      this.popoverHost.append(this.popoverContent);
    });
  }

  private setContentInlineBlock() {
    this.popoverContent.style.display = 'inline-block';
  }

  private setOpacity(opacity: string) {
    this.popoverContent.style.opacity = opacity;
  }
}
