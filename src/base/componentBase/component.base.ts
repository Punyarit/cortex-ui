import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { OnConfig, OnVariable, Properties, set, vars } from './types/components.base.types';

export abstract class ComponentBase<Props extends Properties>
  extends LitElement
  implements OnVariable<Props['var']>, OnConfig<Props['set'], Props['fix']>
{
  @property({ type: Object }) public var!: Props['var'];
  @property({ type: Object }) public set!: Props['set'];
  fix!: Props['fix'];
  config!: Props['set'];
  oldVar: Props['var'] = {};

  willUpdate(changedProperties: Map<PropertyKey, unknown>): void {
    if (changedProperties.has(set)) {
      this.setConfig(this.set);
      this.exec();
    }

    if (changedProperties.has(vars)) {
      this.setVariablesToElement(this.var);
    }

    super.willUpdate(changedProperties);
  }

  setConfig(set: Props['set']): void {
    for (const key in set) {
      this.config[key] = set[key];
    }
  }

  exec(): void {
    this.set = { ...(this.config as Record<keyof Props['set'], unknown>) };
  }

  fixConfig(): void {
    this.fix = {
      exec: this.exec.bind(this),
    } as Record<keyof NonNullable<Props['set']>, Props['fix']>;

    for (const configKey in this.config) {
      (this.fix as Record<keyof NonNullable<Props['set']>, Props['fix']>)[configKey] = (
        configValue: unknown
      ): Props['fix'] => {
        this.setConfig({ [configKey]: configValue });
        return this.fix;
      };
    }
  }

  setVariablesToElement(vars: Props['var']): void {
    this.storeVariables(vars);
    this.setAttribute('style', this.setCssText());
  }

  storeVariables(vars: Props['var']): void {
    for (const key in vars) {
      this.oldVar[key] = vars[key];
    }
  }

  setCssText(): string {
    let cssText = ``;
    for (const key in this.oldVar) {
      cssText = `${cssText}--${key}:var(--${this.oldVar[key]});`;
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
