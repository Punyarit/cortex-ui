export class AbilityBase {
  constructor(protected box: CBox.Ref, protected value: string) {
    this.initAbility();
  }

  private initAbility() {
    for (const ability of this.value.split(',')) {
      // FIXME: any type
      (this as any)[ability]();
    }
  }

  protected setBoxDataSet(key: string, value: string | number) {
    this.box.dataset[key] = `${value}`;
  }
}
