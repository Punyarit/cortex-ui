import { ComponentNameTypes } from '../../types/component.names';
import { REQUIRED_CXPOPOVER_PARENT } from './errors/required-cx-popover-parent';

export class AbilityFactory {
  constructor(private box: CBox.Ref, private attr: ComponentNameTypes, private value: string) {
    this.construct();
  }

  private async construct() {
    switch (this.attr) {
      case 'cx-popover':
        if (!this.box.closest('cx-popover')) {
          throw Error(REQUIRED_CXPOPOVER_PARENT);
        }
        return new (await import('./cx-popover.ability')).CxPopoverAbilityBuilder(
          this.box,
          this.value
        );

      default:
        break;
    }
  }
}
