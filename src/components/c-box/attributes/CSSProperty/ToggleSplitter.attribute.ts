import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';
import { CBoxUiAttribute } from '../../types/attribute-changed.types';

export class IconToggleAttribute {
  constructor(private box: CBoxUiAttribute, private attr: string, private value: string) {}
  init() {
    if (typeof this.box.uiCache?.[this.value] === 'number') return;

    this.setUiCache();
    this.setCSSRule();
    this.setToggleEvent();
    this.box.removeAttribute(this.attr);

    if (this.value !== 'none') {
      this.checkToggle();
    }
  }

  private setToggleEvent() {
    if (this.box?.iconToggled === undefined) {
      this.box.iconToggled = false;
      this.box.addEventListener('click', this.toggleEvent);
    }
  }

  private toggleEvent = () => {
    this.box.iconToggled = !this.box.iconToggled;
    this.checkToggle();
  };

  private checkToggle() {
    if (this.box.iconToggled) {
      this.box.setAttribute(this.attr, this.box.uiCache!.value as string);
    } else {
      this.box.removeAttribute(this.attr);
    }
  }

  private setUiCache() {
    !this.box.uiCache && (this.box.uiCache = {});
    this.box.uiCache.value = this.value;
  }

  private setCSSRule() {
    if (this.value === 'none') return;

    const styleSheet = this.box.shadowRoot?.styleSheets[0];
    const selectorText = `:host([${this.attr}])`;
    const indexSelector = findCssRuleIndex(styleSheet!, selectorText);
    if (typeof indexSelector === 'number') {
      styleSheet?.deleteRule(indexSelector);
    }

    const [size, source, color] = this.value.split(' ');
    styleSheet?.insertRule(
      `${selectorText}{--${this.attr}:${source};--${this.attr}-size:var(--size-${size});--${this.attr}-color:var(--${color});}`,
      styleSheet?.cssRules.length || 0
    );
    this.box.uiCache![this.value] = styleSheet!.cssRules.length - 1;
  }
}
