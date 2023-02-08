export class AbilityFactory {
  constructor(private box: CBox.Ref, private attr: string, private value: string) {
    this.createAbility();
  }

  private createAbility() {
    switch (this.attr) {
      case 'cx-popover':
        break;

      default:
        break;
    }
    console.log('attributes.factory |this.box|', this.box);
    console.log('attributes.factory |this.attr|', this.attr);
    console.log('attributes.factory |this.value|', this.value);
  }
}
