import { ComponentNameTypes } from '../../types/component.names';

export class AbilityFactory {
  constructor(private box: CBox.Ref, private attr: ComponentNameTypes, private value: string) {
    this.construct();
  }

  private async construct() {
    switch (this.attr) {
      case 'cx-popover':
        return new (await import('./cx-popover.ability')).CxPopoverAbilityBuilder(
          this.box,
          this.value
        );

      default:
        break;
    }
  }
}
