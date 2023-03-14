import { stylesMapper } from '../../styles-mapper/styles-mapper';
import { CBoxUiToggle } from '../../types/attribute-changed.types';

export class UIToggleAttribute {
  constructor(private box: CBoxUiToggle, private value: string) {}

  public init() {
    this.setUiCache();
    const styles = this.getStyles();
    this.setUiStyle(styles);

    this.box.uiName = this.getUiName(styles);
    this.setToggleEvent();
    this.setUiAttrs();
  }

  private setUiAttrs() {
    if (this.box.getAttribute('_ui-toggle')) {
      this.box.setAttribute('_ui-toggle', this.box.uiName!);
    }
    this.box.removeAttribute('ui-toggle');
  }

  private setToggleEvent() {
    if (this.box?.uiToggled === undefined) {
      this.box.uiToggled = false;
      this.box.addEventListener('click', () => {
        this.box.uiToggled = !this.box.uiToggled;
        if (this.box.uiToggled) {
          this.box.setAttribute('_ui-toggle', this.box.uiName!);
        } else {
          this.box.removeAttribute('_ui-toggle');
        }
      });
    }
  }

  private setCSSRule(uiName: string, styleText: string): CSSStyleSheet {
    const styleSheet = this.box.shadowRoot!.styleSheets[0];
    const rule = `:host([_ui-toggle~="${uiName}"]){${styleText}}`;
    styleSheet.insertRule(rule, 0);

    return styleSheet;
  }
  private setUiCache() {
    !this.box.uiCache && (this.box.uiCache = {});
  }

  private getStyles(): string[] {
    return this.value.split(',').map((style) => style.trim());
  }

  private getUiAttrs(value: string): string[] {
    return value.split(':').map((s) => s.trim());
  }

  private getUiStyleText(uiStyle: string): string {
    return uiStyle
      .split(' ')
      .filter(Boolean)
      .map((s) => {
        const styleProp = stylesMapper.get(`c-box[${s.replace('!', '').trim()}]`);
        return styleProp ? `${styleProp}${s.endsWith('!') ? '!important' : ''};` : '';
      })
      .join('');
  }

  private replaceCSSRule(styleSheet: CSSStyleSheet, uiName: string) {
    if (typeof this.box.uiCache![uiName] === 'number') {
      styleSheet.deleteRule(this.box.uiCache![uiName] as number);
    }
    this.box.uiCache![uiName] = styleSheet.cssRules.length - 1;
  }

  private setUiStyle(styles: string[]): void {
    for (const style of styles) {
      const [uiName, uiStyle] = this.getUiAttrs(style);
      if (uiName && uiStyle) {
        const styleText = this.getUiStyleText(uiStyle);
        if (styleText) {
          const styleSheet = this.setCSSRule(uiName, styleText);
          this.replaceCSSRule(styleSheet, uiName);
        }
      }
    }
  }

  private getUiName(styles: string[]) {
    return styles.map((s) => s.split(':')[0].trim()).join(' ');
  }
}
