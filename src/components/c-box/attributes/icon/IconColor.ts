export class IconColor {
  static init(box: CBox.Ref, value: CBox.Icon) {
    box.style.setProperty('--icon-color', `var(--${value})`);
  }
}
