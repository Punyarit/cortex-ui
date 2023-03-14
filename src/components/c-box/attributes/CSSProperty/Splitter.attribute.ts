export class SplitterAttribute {
  constructor(private box: CBox.Ref, private attr: string, private value: string) {}
  init() {
    const [size, source, color] = this.value.split(' ');
    const stylesheet = this.box.shadowRoot!.styleSheets[0];
    stylesheet.insertRule(
      `:host{--${this.attr}:${source};--${this.attr}-size:var(--size-${size});--${this.attr}-color:var(--${color});}`
    );
  }
}
