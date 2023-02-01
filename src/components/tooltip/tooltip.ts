import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { ThemeVersion } from '../theme/types/theme.types';

export const tagName = 'cx-tooltip';
// export const onPressed = 'pressed';

@customElement(tagName)
export class Tooltip extends ComponentBase<CXTooltip.Props> {
  // config: CXTooltip.Set = {};

  static styles = css``;

  constructor() {
    super();
    if (this.config) this.initConfig();
  }

  private initConfig(): void {
    this.fixConfig();
    this.cacheConfig(this.config);
    this.exec();
  }

  render(): TemplateResult {
    return html`<div>cx-tooltip Component was created!</div>`;
  }

  // Method
  // public log(config: { text: string }): void {
  //   console.log('log: ', config.text);
  // }

  // Event
  // private pressed(): void {
  //   this.setCustomEvent<CXTooltip.Details[typeof onPressed]>(onPressed, {
  //     event: onPressed,
  //   });
  // }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXTooltip {
    type Ref = Tooltip;

    type Var<T extends ThemeVersion = 2> = unknown;

    type Set<T extends ThemeVersion = 2> = unknown;

    type Fix = Required<{ [K in keyof Set]: (value: Set[K]) => Fix }> & { exec: () => void };

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
    [tagName]: CXTooltip.Ref;
  }

  // namespace JSX {
  //  interface IntrinsicElements {
  //   [tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> | CXTooltip.Ref;
  //  }
  // }

  // interface GlobalEventHandlersEventMap {
  //   [onPressed]: CXTooltip.Pressed;
  // }
}
