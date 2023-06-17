import { TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { colors } from './constants/color.base.theme';
import { dark } from './constants/color.dark.theme';
import { light } from './constants/color.light.theme';
import { fontWeights } from './constants/font-weight.theme';
import { sizes } from './constants/size.theme';
import { ThemeSingleton } from './singleton/theme.singleton';
import { CxThemeName } from './types/theme.name';
import { ThemeColorTypes, ThemeSizeTypes } from './types/theme.types';

@customElement(CxThemeName)
export class Theme extends ComponentBase<CXTheme.Props> {
  config: CXTheme.Set = {
    color: 'light',
    size: 'small',
  };

  static fontDisplay = 1;

  static styles = [colors, light, dark, fontWeights, sizes];

  connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
    if (this.config) this.exec();
    super.connectedCallback();
    this.createSharedCxThemeRef();
  }

  render(): TemplateResult {
    return html`<slot> </slot> `;
  }

  createSharedCxThemeRef() {
    ThemeSingleton.ref = this;
  }

  willUpdate(changedProperties: Map<PropertyKey, unknown>): void {
    this.setThemeProps(changedProperties);
    super.willUpdate(changedProperties);
  }

  updated(changedProperties: Map<PropertyKey, unknown>) {
    this.setTheme(this.config.color, this.config.size);
    this.update(changedProperties);
  }

  private setThemeProps(changedProperties: Map<PropertyKey, unknown>): void {
    if (changedProperties.has('set')) {
      this.setTheme(this.set?.color || this.config.color, this.set?.size || this.config.size);
    }
  }

  private setTheme(color?: CXTheme.Set['color'], size?: CXTheme.Set['size']): void {
    this.className = `${color || this.config.color} ${size || this.config.size}`;
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXTheme {
    type Ref = Theme;

    type Var = unknown;

    type Set = {
      color?: ThemeColorTypes;
      size?: ThemeSizeTypes;
    };

    type Fix = {
      [K in keyof Set]: (value: Set[K]) => Fix;
    } & { exec: () => void };

    type Props = {
      var: Pick<Var, never>;
      set: Set;
      fix: Fix;
    };
  }

  interface HTMLElementTagNameMap {
    [CxThemeName]: CXTheme.Ref;
  }
}
