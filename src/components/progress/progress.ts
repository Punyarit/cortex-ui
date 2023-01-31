import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../base/componentBase/component.base';
import { ProgressDirector } from './builder/progress.builder';
import { ColorKeyTypes, SizeKeyTypes } from './types/progress.types';

export const tagName = 'cx-progress';

@customElement(tagName)
export class Progress extends ComponentBase<CXProgress.Props> {
  config: CXProgress.Set = {
    color: 'primary',
    size: 'medium',
  };

  static styles = css`
    :host {
      display: inline-flex;
      overflow: hidden;
    }
    .progress {
      display: inline-block;
      position: relative;
      width: var(--width);
      height: var(--height);
      box-sizing: border-box;
      transform: scale(var(--scale)) translate(var(--translate), var(--translate));
    }
    .progress div {
      animation: progress 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      transform-origin: 40px 40px;
    }
    .progress div:after {
      content: ' ';
      display: block;
      position: absolute;
      width: var(--base-size-8);
      height: var(--base-size-8);
      border-radius: 50%;
      background: var(--color);
      margin: -4px 0 0 -4px;
    }
    .progress div:nth-child(1) {
      animation-delay: -0.026s;
    }
    .progress div:nth-child(1):after {
      top: 63px;
      left: 63px;
    }
    .progress div:nth-child(2) {
      animation-delay: -0.082s;
    }
    .progress div:nth-child(2):after {
      top: 68px;
      left: 56px;
    }
    .progress div:nth-child(3) {
      animation-delay: -0.138s;
    }
    .progress div:nth-child(3):after {
      top: 71px;
      left: 48px;
    }
    .progress div:nth-child(4) {
      animation-delay: -0.194s;
    }
    .progress div:nth-child(4):after {
      top: 72px;
      left: 40px;
    }
    .progress div:nth-child(5) {
      animation-delay: -0.25s;
    }
    .progress div:nth-child(5):after {
      top: 71px;
      left: 32px;
    }
    .progress div:nth-child(6) {
      animation-delay: -0.326s;
    }
    .progress div:nth-child(6):after {
      top: 68px;
      left: 24px;
    }

    @keyframes progress {
      0% {
        transform: rotate(146deg);
      }
      100% {
        transform: rotate(506deg);
      }
    }
  `;

  constructor() {
    super();
    if (this.config) this.initConfig();
  }

  private initConfig(): void {
    this.fixConfig();
    this.setConfig(this.config);
    this.exec();
  }

  render(): TemplateResult {
    return html`
      <div class="progress">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  }

  updated(changedProperties: Map<PropertyKey, unknown>): void {
    if (changedProperties.has('set')) {
      const spinnerBuilder = ProgressDirector.construct(this.set);
      const spinnerVars = { color: spinnerBuilder.color, ...spinnerBuilder.size };

      this.setVariablesToElement(spinnerVars);
    }
    super.update(changedProperties);
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXProgress {
    type Ref = Progress;

    type Var = unknown;

    type Set = {
      size: SizeKeyTypes;
      color: ColorKeyTypes;
    };

    type Fix = { [K in keyof Set]: (value: Set[K]) => Fix } & { exec: () => Ref };

    type Props = {
      var: Partial<Pick<Var, never>>;
      set: Partial<Set>;
      fix: Partial<Fix>;
    };
  }

  interface HTMLElementTagNameMap {
    [tagName]: CXProgress.Ref;
  }

  // interface GlobalEventHandlersEventMap {
  //   [onPressed]: (customEvent: CXProgress.Pressed) => void;
  // }
}
