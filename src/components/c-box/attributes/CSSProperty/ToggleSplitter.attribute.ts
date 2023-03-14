import { CBoxUiToggle } from '../../types/attribute-changed.types';

export class ToggleSplitterAttribute {
  constructor(private box: CBoxUiToggle, private attr: string, private value: string) {}
  init() {
    if (typeof this.box.uiCache?.[this.value] === 'number') return;

    this.setUiCache();
    this.setCSSRule();
    this.setToggleEvent();
    this.box.removeAttribute(this.attr);
  }

  private setToggleEvent() {
    if (this.box?.uiToggled === undefined || this.value === 'none') {
      this.box.uiToggled = false;
      this.box.addEventListener('click', this.toggleEvent);
    }
  }

  private toggleEvent = () => {
    this.box.uiToggled = !this.box.uiToggled;
    if (this.box.uiToggled) {
      this.box.setAttribute(this.attr, this.value);
    } else {
      this.box.removeAttribute(this.attr);
    }
  };

  private setUiCache() {
    !this.box.uiCache && (this.box.uiCache = {});
  }

  private setCSSRule() {
    if (this.value === 'none') return;

    const styleSheet = this.box.shadowRoot!.styleSheets[0];
    const [size, source, color] = this.value.split(' ');
    styleSheet?.insertRule(
      `:host{--${this.attr}:${source};--${this.attr}-size:var(--size-${size});--${this.attr}-color:var(--${color});}`
    );
    this.box.uiCache![this.value] = styleSheet.cssRules.length - 1;
  }
}
