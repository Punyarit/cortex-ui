import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';
import { stylesMapper } from '../../styles-mapper/styles-mapper';
import { CBoxUiAttribute } from '../../types/attribute-changed.types';
import { UIScopedStyles } from '../UIScopedStyles';

export class UIToggleAttribute {
  constructor(private attr: string, private box: CBoxUiAttribute, private value: string) {}

  public init() {
    UIScopedStyles.setStylesheet();
    const styles = this.getStyles();
    this.setUiStyle(styles);

    this.box.uiName = this.getUiName(styles);
    this.setToggleEvent();
    this.setUiAttrs();
  }

  private setUiAttrs() {
    if (this.box.getAttribute(`_${this.attr}`)) {
      this.box.setAttribute(`_${this.attr}`, this.box.uiName!);
    }
    this.box.removeAttribute(`${this.attr}`);
  }

  private setToggleEvent() {
    if (this.box?.uiToggled === undefined) {
      this.box.uiToggled = false;
      this.box.addEventListener('click', () => {
        this.box.uiToggled = !this.box.uiToggled;
        if (this.box.uiToggled) {
          this.box.setAttribute(`_${this.attr}`, this.box.uiName!);
        } else {
          this.box.removeAttribute(`_${this.attr}`);
        }
      });
    }
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

  private setUiStyle(styles: string[]): void {
    for (const style of styles) {
      const [uiName, uiStyle] = this.getUiAttrs(style);
      if (uiName && uiStyle) {
        const styleText = this.getUiStyleText(uiStyle);
        UIScopedStyles.scopeStyles('style', styleText, this.box, uiName, this.attr);
      }
    }
  }

  private getUiName(styles: string[]) {
    return styles.map((s) => s.split(':')[0].trim()).join(' ');
  }
}
