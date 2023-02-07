import { observeElement } from '../../../helpers/functions/observeElement/observeElement';
import { PopoverPositionType } from '../../popover/types/popover.types';
import { Modal } from '../modal';
import { resizeEntry, resizeObserver } from '../../../observer/resize.observer';
import { ModalSingleton } from '../singleton/modal.singleton';

const positionReverseOverScreen = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
} as const;

const sidePopoverAppear = ['center', 'left', 'right', 'top', 'bottom'] as const;

function calc({ x, y }: { x: number; y: number }) {
  const xValue = Math.floor(x);
  const yValue = Math.floor(y);
  return {
    x: xValue,
    y: yValue,
    translate: `${xValue}px ${yValue}px`,
  };
}
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
    await this.setPopoverRect();
    // 📌positionResult is position that popover content will appear in screen (inject to translate)
    // 📌The Summary is the x / y position to place the popover.
    const positionResult = this.getPosition();

    // 📌position is top left right bottom
    // 📌side is left center right / top center bottom
    const [position, side] = this.position.split('-') as [
      keyof typeof positionReverseOverScreen,
      typeof sidePopoverAppear[number]
    ];
    let isOverScreen: boolean = false;
    if (position === 'right') {
      isOverScreen = this.popoverRect!.width + positionResult.x > resizeEntry!.contentRect.width;
    } else if (position === 'left') {
      isOverScreen = positionResult.x < 0;
    } else if (position === 'bottom') {
      isOverScreen = this.popoverRect!.height + positionResult.y > resizeEntry!.contentRect.height;
    } else if (position === 'top') {
      isOverScreen = positionResult.y < 0;
    }

    // 📌true = over screen
    if (isOverScreen) {
      // 📌reverse position
      this.position = `${positionReverseOverScreen[position]}-${side}` as PopoverPositionType;
      return this.getPosition().translate;
    }
    return positionResult.translate;
  }

  private async setPopoverRect() {
    this.popoverRect = await this.getPopoverRect();
  }

  private getPosition(): ReturnType<typeof calc> {
    switch (this.position) {
      default:
      case 'bottom-left':
        return calc({ x: this.hostRect.left, y: this.hostRect.bottom });

      case 'bottom-center':
        return calc({
          x: this.hostRect.width / 2 + this.hostRect.left - this.popoverRect!.width / 2,
          y: this.hostRect.bottom,
        });

      case 'bottom-right':
        return calc({
          x: this.hostRect.right - this.popoverRect!.width,
          y: this.hostRect.bottom,
        });

      case 'top-left':
        return calc({
          x: this.hostRect.left,
          y: this.hostRect.top - this.popoverRect!.height,
        });

      case 'top-center':
        return calc({
          x: this.hostRect.width / 2 + this.hostRect.left - this.popoverRect!.width / 2,
          y: this.hostRect.top - this.popoverRect!.height,
        });

      case 'top-right':
        return calc({
          x: this.hostRect.right - this.popoverRect!.width,
          y: this.hostRect.top - this.popoverRect!.height,
        });

      case 'left-top':
        return calc({
          x: this.hostRect.left - this.popoverRect!.width,
          y: this.hostRect.top,
        });

      case 'left-center':
        return calc({
          x: this.hostRect.left - this.popoverRect!.width,
          y: this.hostRect.top + this.hostRect.height / 2 - this.popoverRect!.height / 2,
        });

      case 'left-bottom':
        return calc({
          x: this.hostRect.left - this.popoverRect!.width,
          y: this.hostRect.bottom - this.popoverRect!.height,
        });

      case 'right-top':
        return calc({
          x: this.hostRect.right,
          y: this.hostRect.top,
        });

      case 'right-center':
        return calc({
          x: this.hostRect.right,
          y: this.hostRect.top + this.hostRect.height / 2 - this.popoverRect!.height / 2,
        });

      case 'right-bottom':
        return calc({
          x: this.hostRect.right,
          y: this.hostRect.bottom - this.popoverRect!.height,
        });
    }
  }
}
