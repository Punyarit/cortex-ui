export class IconSuffix {
  static init(box: CBox.Ref, value: CXIcon.Set['src']) {
    box.style.setProperty('--icon-suffix', value);
  }
}
