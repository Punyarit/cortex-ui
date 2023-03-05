export class SizeVariableAttribute {
  static init(box: CBox.Ref, attr: string, value: string) {
    box.style.setProperty(`--${attr}`, `var(--size-${value})`);
  }
}
