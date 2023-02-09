import { PopoverPositionType } from '../../../popover/types/popover.types';
import { format } from './format';
import { PositionReversedType } from './positionReverseOverScreen';
import { SidePopoverType } from './sidePopoverAppear';

export type PositionResult = {
  translate: string;
  sideChecked: SidePopoverType;
  positionChecked: PositionReversedType;
};
export class PopoverPosition {
  private popoverRect?: DOMRect;

  constructor(
    private positionType: PopoverPositionType,
    private hostRect: DOMRect,
    private popoverContent: HTMLElement,
    private resizeEntry: ResizeObserverEntry
  ) {}

  private getPopoverRect(): Promise<DOMRect> {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        resolve(this.popoverContent.getBoundingClientRect());
      });
    });
  }
  public async getResult(): Promise<PositionResult> {
    await this.setPopoverRect();
    const [position, side] = this.speretePosition();
    // 📌positionResult = position that popover content will appear in screen (inject to translate)
    // 📌The Summary is the x / y position will place the popover on screen.
    const positionResult = this.getPosition();
    const positionChecked = this.checkPosition(position, positionResult);
    const sideChecked = this.checkSide(position, side, positionResult);
    // 📌true = position of popover is over the screen
    if (position !== positionChecked || side !== sideChecked) {
      this.setNewPositionType(positionChecked, sideChecked);
      return { translate: this.getPosition().translate, sideChecked, positionChecked };
    }

    return { translate: positionResult.translate, sideChecked, positionChecked };
  }

  private setNewPositionType(positionChecked: PositionReversedType, sideChecked: SidePopoverType) {
    this.positionType = `${positionChecked}-${sideChecked}` as PopoverPositionType;
  }

  private speretePosition() {
    return this.positionType.split('-') as [PositionReversedType, SidePopoverType];
  }

  private checkSide(
    position: PositionReversedType,
    side: SidePopoverType,
    positionResult: ReturnType<typeof format>
  ) {
    const { height, width } = this.resizeEntry!.contentRect;
    const { x, y } = positionResult;
    const { height: popoverHeight, width: popoverWidth } = this.popoverRect!;

    let checkedSide = side;
    if (side === 'center') {
      if (position === 'left' || position === 'right') {
        checkedSide = y + popoverHeight > height ? 'bottom' : y < 0 ? 'top' : side;
      } else if (position === 'top' || position === 'bottom') {
        checkedSide = x + popoverWidth > width ? 'right' : x < 0 ? 'left' : side;
      }
    } else if (side === 'right' && x < 0) {
      checkedSide = 'left';
    } else if (side === 'left' && x + popoverWidth > width) {
      checkedSide = 'right';
    } else if (side === 'bottom' && y < 0) {
      checkedSide = 'top';
    } else if (side === 'top' && y + popoverHeight > height) {
      checkedSide = 'bottom';
    }

    return checkedSide;
  }
  private checkPosition(position: PositionReversedType, positionResult: ReturnType<typeof format>) {
    const { height, width } = this.resizeEntry!.contentRect;
    const { x, y } = positionResult;
    const { width: popoverWidth, height: popoverHeight } = this.popoverRect!;
    let checkedPosition = position;

    if (position === 'right') {
      checkedPosition = popoverWidth + x > width ? 'left' : position;
    } else if (position === 'left') {
      checkedPosition = x < 0 ? 'right' : position;
    } else if (position === 'bottom') {
      checkedPosition = popoverHeight + y > height ? 'top' : position;
    } else if (position === 'top') {
      checkedPosition = y < 0 ? 'bottom' : position;
    }

    return checkedPosition;
  }

  private async setPopoverRect() {
    this.popoverRect = await this.getPopoverRect();
  }

  private getPosition(): ReturnType<typeof format> {
    const {
      bottom: hostBottom,
      height: hostHeight,
      left: hostLeft,
      right: hostRight,
      top: hostTop,
      width: hostWidth,
    } = this.hostRect;

    const { width: popoverWidth, height: popoverHeight } = this.popoverRect!;

    switch (this.positionType) {
      default:
      case 'bottom-left':
        return format({ x: hostLeft, y: hostBottom });

      case 'bottom-center':
        return format({
          x: hostWidth / 2 + hostLeft - popoverWidth / 2,
          y: hostBottom,
        });

      case 'bottom-right':
        return format({
          x: hostRight - popoverWidth,
          y: hostBottom,
        });

      case 'top-left':
        return format({
          x: hostLeft,
          y: hostTop - popoverHeight,
        });

      case 'top-center':
        return format({
          x: hostWidth / 2 + hostLeft - popoverWidth / 2,
          y: hostTop - popoverHeight,
        });

      case 'top-right':
        return format({
          x: hostRight - popoverWidth,
          y: hostTop - popoverHeight,
        });

      case 'left-top':
        return format({
          x: hostLeft - popoverWidth,
          y: hostTop,
        });

      case 'left-center':
        return format({
          x: hostLeft - popoverWidth,
          y: hostTop + hostHeight / 2 - popoverHeight / 2,
        });

      case 'left-bottom':
        return format({
          x: hostLeft - popoverWidth,
          y: hostBottom - popoverHeight,
        });

      case 'right-top':
        return format({
          x: hostRight,
          y: hostTop,
        });

      case 'right-center':
        return format({
          x: hostRight,
          y: hostTop + hostHeight / 2 - popoverHeight / 2,
        });

      case 'right-bottom':
        return format({
          x: hostRight,
          y: hostBottom - popoverHeight,
        });
    }
  }
}
