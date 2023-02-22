export class IconSize {
  static init(box: CBox.Ref, value: CXIcon.Set['src']) {
    box.style.setProperty('--icon-size', `var(--size-${value})`);
  }
}
