import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { ColorTypes } from '../../types/colors.version-control';
import { SizeTypes } from '../../types/sizes.type';
import { ThemeVersion } from '../theme/types/theme.types';
import { SpinnerDirector } from './builder/spinner.builder';
import { CxSpinnerName } from './types/spinner.name'
import { ColorKeyTypes, SizeKeyTypes } from './types/spinner.types';

// export const onPressed = 'pressed';

@customElement(CxSpinnerName)
export class Spinner extends ComponentBase<CXSpinner.Props> {
  config: CXSpinner.Set = {
    color: 'primary',
    size: 'medium',
  };

  static styles = css`
    :host {
      display: inline-block;
    }
    .spinner {
      display: flex;
      position: relative;
      width: var(--width);
      height: var(--height);
    }
    .spinner div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: var(--width);
      height: var(--height);
      border-width: var(--borderWidth);
      border-style: solid;
      border-radius: 50%;
      animation: spinner 0.97s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: var(--color) transparent transparent transparent;
    }
    .spinner div:nth-child(1) {
      animation-delay: -0.4s;
    }
    .spinner div:nth-child(2) {
      animation-delay: -0.3s;
    }
    .spinner div:nth-child(3) {
      animation-delay: -0.2s;
    }
    .spinner div:nth-child(4) {
      animation-delay: -0.1s;
    }

    @keyframes spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
    if (this.config) this.exec();
  }

  render(): TemplateResult {
    return html`
      <style></style>

      <div class="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  }

  updated(changedProperties: Map<PropertyKey, unknown>): void {
    if (changedProperties.has('set')) {
      const spinnerBuilder = SpinnerDirector.construct(this.set);
      const spinnerVars = { color: spinnerBuilder.color, ...spinnerBuilder.size };
      this.cacheVariables(spinnerVars);
      this.setHostVatiables();
    }
    super.update(changedProperties);
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXSpinner {
    type Ref = Spinner;

    type Var<T extends ThemeVersion = 2> = {
      width?: SizeTypes;
      height?: SizeTypes;
      color?: ColorTypes<T>;
    };

    type Set = {
      size?: SizeKeyTypes;
      color?: ColorKeyTypes;
    };

    type Fix = { [K in keyof Set]: (value: Set[K]) => Fix } & { exec: () => Ref };

    type Props = {
      var: Pick<Var, never>;
      set: Set;
      fix: Fix;
    };
  }

  interface HTMLElementTagNameMap {
    [CxSpinnerName]: CXSpinner.Ref;
  }

  // interface GlobalEventHandlersEventMap {
  //   [onPressed]: (customEvent: CXSpinner.Pressed) => void;
  // }
}
