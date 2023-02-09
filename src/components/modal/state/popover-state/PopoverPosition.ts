import { PopoverPositionType } from '../../../popover/types/popover.types';
import { format } from './format';
import { PositionType } from './positionReverseOverScreen';
import { SidePopoverType } from './sidePopoverAppear';

export type PositionResult = {
  translate: string;
  sideChecked: SidePopoverType;
  positionChecked: PositionType;
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

  private setNewPositionType(positionChecked: PositionType, sideChecked: SidePopoverType) {
    this.positionType = `${positionChecked}-${sideChecked}` as PopoverPositionType;
  }

  private speretePosition() {
    return this.positionType.split('-') as [PositionType, SidePopoverType];
  }

  private checkSide(
    position: PositionType,
    side: SidePopoverType,
    positionResult: ReturnType<typeof format>
  ): SidePopoverType {
    const { height, width } = this.resizeEntry!.contentRect;
    const { x, y } = positionResult;
    const { height: popoverHeight, width: popoverWidth } = this.popoverRect!;

    switch (side) {
      case 'center':
        return this.checkCenteredSide(position, x, y, width, popoverWidth, height, popoverHeight);

      case 'right':
        return this.checkRightSide(x);

      case 'left':
        return this.checkLeftSide(x, width, popoverWidth);

      case 'bottom':
        return this.checkBottomSide(y);

      case 'top':
        return this.checkTopSide(y, height, popoverHeight);

      default:
        return side;
    }
  }

  private checkCenteredSide(
    position: PositionType,
    x: number,
    y: number,
    width: number,
    popoverWidth: number,
    height: number,
    popoverHeight: number
  ) {
    switch (position) {
      case 'left':
      case 'right':
        return y + popoverHeight > height ? 'bottom' : y < 0 ? 'top' : 'center';

      case 'top':
      case 'bottom':
        return x + popoverWidth > width ? 'right' : x < 0 ? 'left' : 'center';

      default:
        return 'center';
    }
  }

  private checkRightSide(x: number) {
    return x < 0 ? 'left' : 'right';
  }

  private checkLeftSide(x: number, width: number, popoverWidth: number) {
    return x + popoverWidth > width ? 'right' : 'left';
  }

  private checkBottomSide(y: number) {
    return y < 0 ? 'top' : 'bottom';
  }

  private checkTopSide(y: number, height: number, popoverHeight: number) {
    return y + popoverHeight > height ? 'bottom' : 'top';
  }

  private checkPosition(position: PositionType, positionResult: ReturnType<typeof format>) {
    const { height, width } = this.resizeEntry!.contentRect;
    const { x, y } = positionResult;
    const { width: popoverWidth, height: popoverHeight } = this.popoverRect!;

    switch (position) {
      case 'right':
        return popoverWidth + x > width ? 'left' : position;
      case 'left':
        return x < 0 ? 'right' : position;
      case 'bottom':
        return popoverHeight + y > height ? 'top' : position;
      case 'top':
        return y < 0 ? 'bottom' : position;
      default:
        return position;
    }
  }

  private async setPopoverRect() {
    this.popoverRect = await this.getPopoverRect();
  }

  private getPosition(): ReturnType<typeof format> {
    const hostRect = this.hostRect;
    const {
      width: hostWidth,
      height: hostHeight,
      left: hostLeft,
      right: hostRight,
      top: hostTop,
      bottom: hostBottom,
    } = hostRect;
    const popoverRect = this.popoverRect!;
    const { width: popoverWidth, height: popoverHeight } = popoverRect;
    const positionType = this.positionType;

    let x: number, y: number;

    switch (positionType) {
      case 'bottom-left':
        x = hostLeft;
        y = hostBottom;
        break;
      case 'bottom-center':
        x = hostLeft + hostWidth / 2 - popoverWidth / 2;
        y = hostBottom;
        break;
      case 'bottom-right':
        x = hostRight - popoverWidth;
        y = hostBottom;
        break;
      case 'top-left':
        x = hostLeft;
        y = hostTop - popoverHeight;
        break;
      case 'top-center':
        x = hostLeft + hostWidth / 2 - popoverWidth / 2;
        y = hostTop - popoverHeight;
        break;
      case 'top-right':
        x = hostRight - popoverWidth;
        y = hostTop - popoverHeight;
        break;
      case 'left-top':
        x = hostLeft - popoverWidth;
        y = hostTop;
        break;
      case 'left-center':
        x = hostLeft - popoverWidth;
        y = hostTop + hostHeight / 2 - popoverHeight / 2;
        break;
      case 'left-bottom':
        x = hostLeft - popoverWidth;
        y = hostBottom - popoverHeight;
        break;
      case 'right-top':
        x = hostRight;
        y = hostTop;
        break;
      case 'right-center':
        x = hostRight;
        y = hostTop + hostHeight / 2 - popoverHeight / 2;
        break;
      case 'right-bottom':
        x = hostRight;
        y = hostBottom - popoverHeight;
        break;
      default:
        x = hostLeft;
        y = hostBottom;
        break;
    }

    return format({ x, y });
  }
}
