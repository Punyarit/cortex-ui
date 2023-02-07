import { PopoverPositionType } from '../../../popover/types/popover.types';
import { Modal } from '../../modal';
import { resizeObserver } from '../../../../observer/resize.observer';
import { ModalSingleton } from '../../singleton/modal.singleton';
import { PopoverPosition } from './PopoverPosition';

export class PopoverState {
  public static POPOVER_SLOT_DISABLED = 'popover-disabled';
  public static POPOVER_SLOT_OPEN = 'popover';

  private hostRect!: DOMRect;
  private position!: PopoverPositionType;
  private popoverContent!: HTMLElement;
  private popoverRoot!: Element;

  async open(
    popoverContent: HTMLElement,
    hostRect: DOMRect,
    position: PopoverPositionType,
    popoverRoot: Element
  ): Promise<void> {
    this.setProperties(popoverContent, hostRect, position, popoverRoot);
    this.setResizeEvent();
    this.setOpacity('0');
    this.setContentInlineBlock();
    this.setPosition();
    this.setFocusOutEventListener();
    this.setPopoverAppear();
    requestAnimationFrame(() => {
      this.setOpacity('1');
    });
  }

  private setResizeEvent() {
    resizeObserver.observe(document.body);
  }
  private removeResizeEvent = () => {
    resizeObserver.unobserve(document.body);
  };

  private setPopoverAppear() {
    ModalSingleton.popoverSlotRef.name = PopoverState.POPOVER_SLOT_OPEN;
    ModalSingleton.popoverSlotRef.parentElement!.classList.remove(Modal.MODAL_DISABLED);
    ModalSingleton.modalRef.append(this.popoverContent);
  }

  private setProperties(
    popoverContent: HTMLElement,
    hostRect: DOMRect,
    position: PopoverPositionType,
    popoverRoot: Element
  ) {
    this.popoverContent = popoverContent;
    this.hostRect = hostRect;
    this.position = position;
    this.popoverRoot = popoverRoot;
  }

  private async setPosition() {
    const position = await new PopoverPosition(
      this.position,
      this.hostRect,
      this.popoverContent
    ).getResult();

    this.popoverContent.style.translate = position!;
  }

  private setFocusOutEventListener() {
    this.popoverContent.tabIndex = 0;
    this.popoverContent.addEventListener('focusout', (e) => {
      const isInsidePopover = e.relatedTarget as HTMLElement;
      if (isInsidePopover?.closest('div[slot="popover"]')) return;
      this.closePopover();
    });
    requestAnimationFrame(() => {
      this.popoverContent.focus();
    });
  }

  private closePopover() {
    this.removeResizeEvent();
    this.appendBackToParentRoot();
  }

  private appendBackToParentRoot() {
    this.popoverRoot.append(this.popoverContent);
  }

  private setContentInlineBlock() {
    this.popoverContent.style.display = 'inline-block';
  }

  private setOpacity(opacity: string) {
    this.popoverContent.style.opacity = opacity;
  }
}
