import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { IconDirector } from './builder/icon.builder';
import { IconSizeTypes, IconSrcTypes } from './types/icon.types';

export const tagName = 'cx-icon';
// export const onPressed = 'pressed';

@customElement(tagName)
export class Icon extends ComponentBase<CXIcon.Props> {
  config: CXIcon.Props['set'] = {
    src: 'favorite',
    color: 'primary',
    size: 'medium',
  };

  static styles = css`
    :host {
      --color: var(--primary-500);

      font-family: var(--src);
      font-size: var(--size);
      color: var(--color);
      display: inline-block;
    }
  `;

  constructor() {
    super();
    if (this.config) this.exec();
  }

  render(): TemplateResult {
    return html`<style></style> &#xe800;`;
  }

  updated(changedProperties: Map<PropertyKey, unknown>): void {
    if (changedProperties.has('set')) {
      const iconBuilder = IconDirector.construct(this.set);
      this.cacheVariables(iconBuilder);
      this.setHostVatiables(`--src: ${this.set?.src};`);
    }
    super.update(changedProperties);
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXIcon {
    type Ref = Icon;

    type Var = unknown;

    type Set = {
      src: IconSrcTypes;
      color?: 'primary' | 'error' | 'white';
      size?: IconSizeTypes;
    };

    type Fix = { [K in keyof Set]: (value: Set[K]) => Fix } & { exec: () => Ref };

    type Props = {
      var: Pick<Var, never>;
      set: Set;
      fix: Fix;
    };

    // type Details = {
    //   [onPressed]: { event: string };
    // };

    // type Events = {
    //   [onPressed]: (detail: Pressed) => void;
    // };

    // type Pressed = CustomEvent<Details[typeof onPressed]>;
  }

  interface HTMLElementTagNameMap {
    [tagName]: CXIcon.Ref;
  }

  // interface GlobalEventHandlersEventMap {
  //   [onPressed]: (customEvent: CXIcon.Pressed) => void;
  // }
}
