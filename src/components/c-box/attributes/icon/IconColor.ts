export class IconColor {
  static init(box: CBox.Ref, value: CXIcon.Set['src']) {
    box.style.setProperty('--icon-color', `var(--${value})`);
  }
}
