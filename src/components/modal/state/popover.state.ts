import { observeElement } from '../../../helpers/functions/observeElement/observeElement';
import { PopoverPositionType } from '../../popover/types/popover.types';
import { Modal } from '../modal';
import { ModalSingleton } from '../singleton/modal.singleton';

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
    this.setOpacity('0');
    this.setContentInlineBlock();
    this.setPosition();
    this.setBlurEventListener();
    this.setPopoverAppear();
    requestAnimationFrame(() => {
      this.setOpacity('1');
    });
  }

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
    let position = await new PopoverPosition(
      this.position,
      this.hostRect,
      this.popoverContent
    ).getResult();

    this.popoverContent.style.translate = position;
  }

  popoverContentFocus = () => {
    this.popoverContent.focus();
  };

  private setBlurEventListener() {
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

function calc(num: number) {
  return Math.abs(Math.floor(num));
}

class PopoverPosition {
  private popoverRect?: DOMRect;
  private positionUsedPopoverRect = new Set([
    'buttom-center',
    'buttom-right',
    'top-center',
    'top-right',
    'left-top',
    'left-center',
  ]);
  constructor(
    private position: PopoverPositionType,
    private hostRect: DOMRect,
    private popoverContent: HTMLElement
  ) {}

  private getPopoverRect(): Promise<DOMRect> {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        resolve(this.popoverContent.getBoundingClientRect());
      });
    });
  }
  public async getResult() {
    await this.checkPopoverRectUsed();
    return this.getPosition();
  }

  private async checkPopoverRectUsed() {
    // if (!this.positionUsedPopoverRect.has(this.position) && this.popoverRect) return;
    this.popoverRect = await this.getPopoverRect();
  }

  private getPosition(): string {
    switch (this.position) {
      default:
      case 'bottom-left':
        return this.buttomLeft();

      case 'bottom-center':
        return this.buttonCenter();

      case 'bottom-right':
        return this.buttomRight();

      case 'top-left':
        return this.topLeft();

      case 'top-center':
        return this.topCenter();

      case 'top-right':
        return this.topRight();

      case 'left-top':
        return this.leftTop();

      case 'left-center':
        return this.leftCenter();

      case 'left-bottom':
        return this.leftBottom();

      case 'right-top':
        return this.rightTop();

      case 'right-center':
        return this.rightcenter();

      case 'right-bottom':
        return this.rightBottom();
    }
  }

  private buttomLeft() {
    return `${calc(this.hostRect.left)}px ${calc(this.hostRect.bottom)}px`;
  }

  private buttonCenter() {
    return `${calc(
      this.hostRect.width / 2 + this.hostRect.left - this.popoverRect!.width / 2
    )}px ${calc(this.hostRect.bottom)}px`;
  }

  private buttomRight() {
    return `${calc(this.hostRect.right - this.popoverRect!.width)}px ${calc(
      this.hostRect.bottom
    )}px`;
  }

  private topLeft() {
    return `${calc(this.hostRect.left)}px ${calc(this.hostRect.top - this.popoverRect!.height)}px`;
  }

  private topCenter() {
    return `${calc(
      this.hostRect.width / 2 + this.hostRect.left - this.popoverRect!.width / 2
    )}px ${calc(this.hostRect.top - this.popoverRect!.height)}px`;
  }

  private topRight() {
    return `${calc(this.hostRect.right - this.popoverRect!.width)}px ${calc(
      this.hostRect.top - this.popoverRect!.height
    )}px`;
  }

  private leftTop() {
    return `${calc(this.hostRect.left - this.popoverRect!.width)}px ${calc(this.hostRect.top)}px`;
  }

  private leftCenter() {
    return `${calc(this.hostRect.left - this.popoverRect!.width)}px ${calc(
      this.hostRect.top + this.hostRect.height / 2 - this.popoverRect!.height / 2
    )}px`;
  }

  private leftBottom() {
    return `${calc(this.hostRect.left - this.popoverRect!.width)}px ${calc(
      this.popoverRect!.height - this.hostRect.bottom
    )}px`;
  }

  private rightTop() {
    return `${calc(this.hostRect.right)}px ${calc(this.hostRect.top)}px`;
  }

  private rightcenter() {
    return `${calc(this.hostRect.right)}px ${calc(
      this.hostRect.top + this.hostRect.height / 2 - this.popoverRect!.height / 2
    )}px`;
  }

  private rightBottom() {
    return `${calc(this.hostRect.right)}px ${calc(
      this.popoverRect!.height - this.hostRect.bottom
    )}px`;
  }
}
