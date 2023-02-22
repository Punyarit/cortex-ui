export class IconPrefix {
  static init(box: CBox.Ref, value: CXIcon.Set['src']) {
    box.style.setProperty('--icon-prefix', value);
  }
}
