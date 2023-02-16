import { debounce } from '../../../../helpers/debounceTimer';
import { PopoverPositionType } from '../../../popover/types/popover.types';
import { Modal } from '../../modal';
import { resizeObserver } from '../../obsrevers/resize.observer';
import { ModalSingleton } from '../../singleton/modal.singleton';
import { PopoverPosition, PositionResult } from './PopoverPosition';
import { PositionType } from './positionReverseOverScreen';
import { SidePopoverType } from './sidePopoverAppear';
import '../../../transition/transition';
import { delay } from '../../../../helpers/delay';
import { throttle } from '../../../../helpers/throttleTimer';

export const debouceTimerPopoverResize = 200;
export class PopoverState {
  public static POPOVER_SLOT_DISABLED = 'popover-disabled';
  public static POPOVER_SLOT_OPEN = 'popover';

  private hostRect!: DOMRect;
  private positionType!: PopoverPositionType;
  private popoverContent!: HTMLElement;
  private popoverHost!: HTMLElement;
  private resizeObserver!: ResizeObserver;
  private popoverSet!: CXPopover.Set;
  private content!: HTMLElement;
  private separatedPositionType!: [PositionType, SidePopoverType];
  #firstUpdated = true;
  #closedDone = false;

  private async deleyWhenOldPopoverExist() {
    if (ModalSingleton.modalRef.querySelector('c-box')) await delay(110);
  }

  private setALertOldPopover(oldPopover: CBox.Ref) {
    oldPopover.firstElementChild?.classList.add('shake-efx');
    const timer = setTimeout(() => {
      oldPopover.firstElementChild?.classList.remove('shake-efx');
      clearTimeout(timer);
    }, 600);
  }

  private setFocusOldPopoverExistThenDone(): boolean {
    const oldPopover = ModalSingleton.modalRef.querySelector('c-box');
    if (oldPopover) {
      if (this.popoverSet.focusout === 'close' && this.popoverSet.mouseleave === 'close')
        return true;

      this.setALertOldPopover(oldPopover);
      return true;
    } else {
      return false;
    }
  }

  private setPopoverClosedDone(done: boolean) {
    this.#closedDone = done;
  }

  async open(
    popoverContent: HTMLElement,
    hostRect: DOMRect,
    popoverSet: CXPopover.Set,
    popoverHost: HTMLElement
  ): Promise<void> {
    await this.deleyWhenOldPopoverExist();
    if (this.setFocusOldPopoverExistThenDone()) return;
    this.setPopoverClosedDone(false);
    this.setProperties(popoverContent, hostRect, popoverSet, popoverHost);
    this.setPopoverContentAnimation('in');
    this.setPopoverContentOpacity('0');
    this.setContentTabindex();
    this.setPositionWithResizeEvent();
    this.setContentInlineBlock();
    this.setFocusOutEventListener();
    this.setPopoverContentAppendToModal();
    this.setMouseleaveEvent();
    requestAnimationFrame(() => {
      this.setPopoverContentOpacity('1');
    });
  }

  private setPositionWithResizeEvent() {
    this.resizeObserver = resizeObserver(document.body, (resizeEntry: ResizeObserverEntry) => {
      if (this.#firstUpdated) {
        this.setPosition(resizeEntry);
        this.setFirstUpdatd(false);
      } else {
        debounce(() => this.setPosition(resizeEntry), debouceTimerPopoverResize);
      }
    });
  }

  private unObserveResizeEvent = () => {
    this.resizeObserver.unobserve(document.body);
  };

  private setPopoverContentAppendToModal() {
    ModalSingleton.popoverSlotRef.name = PopoverState.POPOVER_SLOT_OPEN;
    ModalSingleton.popoverSlotRef.parentElement!.classList.remove(Modal.MODAL_DISABLED);
    ModalSingleton.modalRef.append(this.popoverContent);
  }

  private setMouseleaveEvent() {
    if (this.popoverSet.mouseleave === 'none') return;
    const timer = setTimeout(() => {
      // this.popoverContent.onmouseover = () => {
      this.popoverContent.onmouseover = () => {
        this.popoverContent.onmouseleave = this.closePopover;
      };
      this.popoverHost.onmouseleave = this.closePopover;
      clearTimeout(timer);
    }, 100);
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
    this.content = popoverContent.childNodes[0] as HTMLElement;
    this.separatedPositionType = this.positionType.split('-') as [PositionType, SidePopoverType];
  }

  private setContentTabindex() {
    this.content.setAttribute('tabindex', '0');
  }

  public async setPosition(resizeEntry: ResizeObserverEntry): Promise<void> {
    const positionResult = await new PopoverPosition(
      this.positionType,
      this.hostRect,
      this.popoverContent,
      resizeEntry,
      this.separatedPositionType
    ).getResult();

    this.setArrowpoint(positionResult);
    if (this.popoverContent.style.translate === positionResult.translate) return;
    this.popoverContent.style.translate = positionResult.translate!;
  }

  // 📌set attribute for benefit to c-box
  private setArrowpoint(positionResult: PositionResult) {
    if (!this.popoverSet.arrowpoint) return;
    const { width: hostWidth, height: hostHeight } = this.popoverHost.getBoundingClientRect();
    const { width: contentWidth, height: contentHeight } =
      this.popoverContent.getBoundingClientRect();
    const { positionChecked, sideChecked } = positionResult;
    const hostCenterWidth = hostWidth / 2;
    const hostCenterHeight = hostHeight / 2;

    this.setArrowPositionTypeAttr(positionChecked);
    const arrowPosition = this.calcArrowPosition(
      positionChecked,
      sideChecked,
      contentWidth,
      contentHeight,
      hostCenterWidth,
      hostCenterHeight
    )!;

    this.setArrowTranslate(arrowPosition, positionChecked);
  }

  private setArrowTranslate(arrowPosition: number, positionChecked: PositionType) {
    const arrowSize = 8;
    const actualPosition = arrowPosition - arrowSize;
    const popoverStyles = this.popoverContent.style;
    const arrowPointProperty = '--popover-arrowpoint-position';

    switch (positionChecked) {
      case 'top':
      case 'bottom':
        return popoverStyles.setProperty(arrowPointProperty, `${actualPosition}px 0`);
      case 'left':
      case 'right':
        return popoverStyles.setProperty(arrowPointProperty, `0 ${actualPosition}px`);
      default:
        throw Error('positionChecked value is not "top" | "bottom" | "left" | "right"');
    }
  }

  private setArrowPositionTypeAttr(positionChecked: PositionType) {
    this.popoverContent.setAttribute(`popover-arrowpoint-position-type`, positionChecked);
  }

  private calcArrowPosition(
    positionChecked: PositionType,
    sideChecked: SidePopoverType,
    contentWidth: number,
    contentHeight: number,
    hostCenterWidth: number,
    hostCenterHeight: number
  ): number | undefined {
    switch (positionChecked) {
      case 'top':
      case 'bottom':
        switch (sideChecked) {
          case 'center':
            return Math.floor(contentWidth / 2);

          case 'left':
            return Math.floor(hostCenterWidth);

          case 'right':
            return Math.abs(Math.floor(hostCenterWidth - contentWidth));
        }

      case 'left':
      case 'right':
        switch (sideChecked) {
          case 'center':
            return Math.abs(Math.floor(contentHeight / 2));

          case 'top':
            return hostCenterHeight;

          case 'bottom':
            return Math.abs(Math.floor(hostCenterHeight - contentHeight));
        }

      default:
        throw Error('Method setArrowpoint constant arrowPosition is undefiend');
    }
  }

  private setFocusOutEventListener() {
    this.popoverContent.tabIndex = 0;
    if (this.popoverSet.focusout === 'close') {
      this.popoverContent.addEventListener('focusout', this.closePopover);
    }
    requestAnimationFrame(() => {
      this.popoverContent.focus();
    });
  }

  private setFirstUpdatd(update: boolean) {
    this.#firstUpdated = update;
  }

  private removeMouseEvent() {
    if (this.popoverSet.mouseleave === 'none') return;

    this.popoverContent.onmouseover = null;
    this.popoverContent.onmouseleave = null;
    this.popoverHost.onmouseleave = null;
  }

  public closePopover = async (e: MouseEvent | FocusEvent | null) => {
    if (this.#closedDone) return;
    if ((e?.relatedTarget as HTMLElement)?.closest('c-box[slot="popover"]')) return;
    this.setPopoverContentAnimation('out');
    await delay(100);
    this.setFirstUpdatd(true);
    this.unObserveResizeEvent();
    this.appendBackToParentRoot();
    this.removeMouseEvent();
    this.setPopoverClosedDone(true);
  };

  private setPopoverContentAnimation(status: 'in' | 'out') {
    const [positionType] = this.separatedPositionType;
    this.popoverContent.style.animation = `popover-${positionType}-${status} 0.15s ease forwards`;
  }

  private appendBackToParentRoot() {
    requestAnimationFrame(() => {
      this.popoverHost.append(this.popoverContent);
    });
  }

  private setContentInlineBlock() {
    const [position] = this.popoverSet.position!.split('-');
    if (position === 'top' || position === 'bottom') {
      this.popoverContent.style.display = 'inline-block';
    } else if (position === 'left' || position === 'right') {
      this.popoverContent.style.display = 'inline-flex';
    }
  }

  private setPopoverContentOpacity(opacity: string) {
    this.popoverContent.style.opacity = opacity;
  }
}
