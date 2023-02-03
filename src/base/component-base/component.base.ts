import {LitElement} from 'lit';
import {property} from 'lit/decorators.js';
import {
  OnConfig,
  OnVariable,
  Properties,
  set,
  vars,
} from './types/components.base.types';

export abstract class ComponentBase<Props extends Properties>
  extends LitElement
  implements OnVariable<Props['var']>, OnConfig<Props['set'], Props['fix']>
{
  @property({type: Object}) public var!: Props['var'];
  @property({type: Object}) public set!: Props['set'];

  config!: Props['set'];
  oldVar: Props['var'] = {};
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
      (this.fixConfig as Record<keyof NonNullable<Props['set']>, Props['fix']>)[
        configKey
      ] = (val: any) => {
        this.cacheConfig({[configKey]: val});
        return this.fixConfig;
      };
    }
    return this.fixConfig;
  };

  willUpdate(changedProperties: Map<PropertyKey, unknown>): void {
    if (changedProperties.has(set)) {
      this.cacheConfig(this.set);
      this.exec();
    }

    if (changedProperties.has(vars)) {
      requestAnimationFrame(() => {
        this.cacheVariables(this.var);
        this.setVariablesStyleSheet();
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
    this.set = {...(this.config as Record<keyof Props['set'], unknown>)};
  }

  setVariablesStyleSheet(): void {
    const shadowRootSheet = this.shadowRoot?.styleSheets[0];
    if (!shadowRootSheet) return;
    if (shadowRootSheet.cssRules.length !== 0) shadowRootSheet.deleteRule(0);
    shadowRootSheet.insertRule(`:host {${this.getCssText()}}`, 0);
  }

  cacheVariables(vars: Props['var']): void {
    for (const key in vars) {
      this.oldVar[key] = vars[key];
    }
  }

  getCssText(): string {
    let cssText = ``;
    for (const key in this.oldVar) {
      cssText = `${cssText}--${key}:var(--${this.oldVar[key]})!important;`;
    }
    return cssText;
  }

  protected setCustomEvent<T>(event: string, data: T): void {
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
