export class ValueAttribute {
  static init(box: CBox.Ref, attr: string, value: string) {
    box.style.setProperty(`--${attr}`, value);
  }
}
