import { ComponentNameTypes } from '../../types/component.names';
import { REQUIRED_CXPOPOVER_PARENT } from './errors/required-cx-popover-parent';
import { AttributeChngedType } from './types/attribute-changed.types';

export class AbilityFactory {
  constructor(private box: CBox.Ref, private attr: AttributeChngedType) {
    this.construct();
  }

  private async construct() {
    this.checkIsClosestCxPOpover();

    switch (this.attr) {
      case 'popover-close-button':
        return new (await import('./attributes/PopoverCloseButton')).POpoverCloseButton(this.box);

      default:
        break;
    }
  }

  private checkIsClosestCxPOpover() {
    if (this.box.closest('cx-popover')) return;
    throw REQUIRED_CXPOPOVER_PARENT;
  }
}
