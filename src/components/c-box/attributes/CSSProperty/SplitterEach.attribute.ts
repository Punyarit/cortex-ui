export class SplitterEachAttribute {
  constructor(private box: CBox.Ref, private attr: string, private value: string) {}
  init() {
    const stylesheet = this.box.shadowRoot!.styleSheets[0];

    let cssText = '';

    const attrs = this.value.split(' ');
    for (let index = 0; index < attrs.length; index++) {
      cssText = cssText + `--${this.attr}-attr-${index}:${attrs[index]};`;
    }

    stylesheet.insertRule(`:host{${cssText}}`, 0);
  }
}
