export class VariableAttribute {
  constructor(private box: CBox.Ref, private attr: string, private value: string) {}
  init() {
    const stylesheet = this.box.shadowRoot?.styleSheets[0];
    stylesheet?.insertRule(`:host{--${this.attr}:var(--${this.value})}`);
  }
}
