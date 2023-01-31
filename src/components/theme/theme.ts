import { TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { html, StaticValue, unsafeStatic } from 'lit/static-html.js';
import { ComponentBase } from '../../../base/componentBase/component.base';
import { ThemeSingleton } from './singleton/theme.singleton';
import { ThemeColorTypes, ThemeSizeTypes, ThemeVersion } from './types/theme.types';

export const tagName = 'cx-theme';
@customElement(tagName)
export class Theme extends ComponentBase<CXTheme.Props> {
  config: CXTheme.Set = {
    color: 'light',
    size: 'small',
    version: 2,
  };

  constructor() {
    super();
    if (this.config) this.initConfig();
  }

  private initConfig(): void {
    this.fixConfig();
    this.setConfig(this.config);
    this.exec();
  }

  private themeRef = createRef<HTMLSlotElement>();
  private themeHTML?: StaticValue;
  private themeImporter?: Promise<unknown>;

  render(): TemplateResult {
    return html`<${this.themeHTML} ${ref(this.themeRef)}><slot></slot></${this.themeHTML}>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.createSharedCxThemeRef();
  }

  createSharedCxThemeRef() {
    ThemeSingleton.CxThemeRef = this;
  }

  willUpdate(changedProperties: Map<PropertyKey, unknown>): void {
    this.importThemeVersion();
    this.setThemeHTML();
    this.setThemeProps(changedProperties);
    super.willUpdate(changedProperties);
  }

  updated(changedProperties: Map<PropertyKey, unknown>) {
    this.setTheme(this.config.color, this.config.size);
    this.update(changedProperties);
  }

  private setThemeHTML() {
    if (this.themeHTML) return;
    this.themeHTML = unsafeStatic(`cx-theme-v${this.set?.version}`);
  }

  private importThemeVersion(): void {
    if (this.themeImporter) return;
    this.themeImporter = import(`./versions/theme.v${this.set?.version}.js`);
  }

  private setThemeProps(changedProperties: Map<PropertyKey, unknown>): void {
    if (changedProperties.has('set')) {
      this.setTheme(this.set?.color || this.config.color, this.set?.size || this.config.size);
    }
  }

  private setTheme(color?: CXTheme.Set['color'], size?: CXTheme.Set['size']): void {
    if (!this.themeRef.value) return;
    this.themeRef.value.className = `${color || this.config.color} ${size || this.config.size}`;
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
      version: ThemeVersion;
    };

    type Fix = {
      [K in keyof Set]: (value: Set[K]) => Fix;
    } & { exec: () => Ref };

    type Props = {
      var: Pick<Var, never>;
      set: Set;
      fix: Fix;
    };
  }

  interface HTMLElementTagNameMap {
    [tagName]: CXTheme.Ref;
  }
}
