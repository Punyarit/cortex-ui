import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { OnConfig, OnVariable, Properties, set, vars } from './types/components.base.types';

export abstract class ComponentBase<Props extends Properties>
  extends LitElement
  implements OnVariable<Props['var']>, OnConfig<Props['set'], Props['fix']>
{
  /**
   * FAQ
   *  Caution!!
   *  should not updated state outside component then pass that state to inside component
   *  example: single calendar has wrong value
   */
  @property({ type: Object }) public var!: Props['var'];
  @property({ type: Object }) public set!: Props['set'];

  config!: Props['set'];
  styles: Props['var'] = {};
  make = (styles: Props['make']) => {
    this.var = styles;
  };

  fixConfig?: Props['fix'];
  fix = (): Props['fix'] => {
    if (this.fixConfig) return this.fixConfig;
    this.fixConfig = {
      exec: this.exec.bind(this),
    };
    for (const configKey in this.config) {
      (this.fixConfig as Record<keyof NonNullable<Props['set']>, Props['fix']>)[configKey] = (
        val: any
      ) => {
        this.cacheConfig({ [configKey]: val });
        return this.fixConfig;
      };
    }
    return this.fixConfig;
  };

  willUpdate(changedProperties: Map<PropertyKey, unknown>): void {
    // 📌 offsetParent === null mean element is not visible from dom
    if (this.offsetParent === null) return;

    if (changedProperties.has(set)) {
      this.cacheConfig(this.set);
      this.exec();
    }

    if (changedProperties.has(vars)) {
      requestAnimationFrame(() => {
        this.cacheVariables(this.var);
        this.setHostVariables();
      });
    }

    super.willUpdate(changedProperties);
  }

  cacheConfig(set: Props['set']): void {
    for (const key in set) {
      this.config[key] = set[key];
    }
  }

  exec(): void {
    this.set = { ...(this.config as Record<keyof Props['set'], unknown>) };
  }
  // 📌icon use this below
  // this.setHostVariables(`--src: ${this.set?.src};`);
  setHostVariables(initialVar?: string): void {
    const shadowRootSheet = this.shadowRoot?.styleSheets[0];
    if (!shadowRootSheet) return;
    if (shadowRootSheet.cssRules.length !== 0) shadowRootSheet.deleteRule(0);
    shadowRootSheet.insertRule(`:host {${this.getCssText()} ${initialVar}}`, 0);
  }

  cacheVariables(vars: Props['var']): void {
    for (const key in vars) {
      this.styles[key] = vars[key];
    }
  }

  setVar() {
    this.var = { ...(this.styles as Record<keyof Props['var'], unknown>) };
  }

  getCssText(): string {
    let cssText = ``;
    for (const key in this.styles) {
      cssText = `${cssText}--${key}:var(--${this.styles[key]})!important;`;
    }
    return cssText;
  }

  setCustomEvent<T>(event: string, data: T): void {
    this.dispatchEvent(
      new CustomEvent(event, {
        detail: {
          ...data,
        },
        bubbles: true,
      })
    );
  }
}
