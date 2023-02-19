export class IconSize {
  static init(box: CBox.Ref, value: CBox.Icon) {
    box.style.setProperty('--icon-size', `var(--size-${value})`);
  }
}
