import { AbilityBase } from './AbilityBase';
import { CxPopoverAbility } from './types2/box.cx-popover.types';

class SiblingCached {
  static siblingRef: HTMLElement;
}

export class CxPopoverAbilityBuilder extends AbilityBase implements CxPopoverAbility {
  constructor(box: CBox.Ref, value: string) {
    super(box, value);
    if (!SiblingCached.siblingRef) {
      SiblingCached.siblingRef = (this.box.previousSibling || this.box.nextSibling) as HTMLElement;
    }
  }

  private setArrowColorVar(color: string) {
    this.box.style.setProperty('--popover-arrowpoint-color', `var(--${color})`);
  }

  // 📌this methos will call early every time when new value (size) arrive
  private initArrowBySize(arrowpointSize: number) {
    this.box.style.setProperty('--popover-arrowpoint-size', `var(--size-${arrowpointSize})`);
    this.arrowpoint(arrowpointSize);
  }

  private setArrowPositionTypeAttr(positionType: string) {
    this.box.setAttribute(`popover-arrowpoint-position-type`, positionType);
  }

  private findCenterWidthContentSibling() {
    const siblingRect = SiblingCached.siblingRef?.getBoundingClientRect();
    return Math.floor(siblingRect.width / 2);
  }

  private findCenterHeightContentSibling() {
    const siblingRect = SiblingCached.siblingRef?.getBoundingClientRect();
    return Math.floor(siblingRect.height / 2);
  }

  private findTranslateValue(position: string, side: string) {
    const hostCenterWidth = this.findCenterWidthContentSibling();
    const hostCenterHeight = this.findCenterHeightContentSibling();

    const { width: contentWidth, height: contentHeight } = this.box.getBoundingClientRect();

    if (position === 'top' || position === 'bottom') {
      if (side === 'center') {
        return Math.floor(contentWidth / 2);
      } else if (side === 'left') {
        return Math.floor(hostCenterWidth);
      } else if (side === 'right') {
        return Math.abs(Math.floor(hostCenterWidth - contentWidth));
      }
    } else if (position === 'left' || position === 'right') {
      if (side === 'center') {
        return Math.abs(Math.floor(contentHeight / 2));
      } else if (side === 'top') {
        return hostCenterHeight;
      } else if (side === 'bottom') {
        return Math.abs(Math.floor(hostCenterHeight - contentHeight));
      }
    }
  }

  private getPositionSide() {
    return (SiblingCached.siblingRef.parentElement as CXPopover.Ref).set.position!.split('-');
  }

  ['arrowpoint'](arrowpointSize?: number) {
    if (!SiblingCached.siblingRef || !arrowpointSize) return;

    const [position, side] = this.getPositionSide();
    this.setArrowPositionTypeAttr(position);

    const arrowpointPosition = this.findTranslateValue(position, side)!;
    // 📌8 = default size of arrow size that is regular
    const actualPosition = arrowpointPosition - (arrowpointSize || 8);

    if (position === 'top' || position === 'bottom') {
      this.box.style.setProperty('--popover-arrowpoint-position', `${actualPosition}px 0`);
    } else if (position === 'left' || position === 'right') {
      this.box.style.setProperty('--popover-arrowpoint-position', `0 ${actualPosition}px`);
    }
  }

  ['arrowpoint-white']() {
    this.setArrowColorVar('white');
  }

  ['arrowpoint-small']() {
    this.initArrowBySize(6);
  }

  ['arrowpoint-regular']() {
    this.initArrowBySize(8);
  }

  ['arrowpoint-medium']() {
    this.initArrowBySize(10);
  }

  ['arrowpoint-large']() {
    this.initArrowBySize(12);
  }

  ['closebutton']() {}
}
