import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../../../base/component-base/component.base';
import { ThemeVersion } from '../../../theme/types/theme.types';
import '../../../button/button';

export const tagName = 'cx-decide-dialog';
// export const onPressed = 'pressed';

@customElement(tagName)
export class DecideDialog extends ComponentBase<CXDecideDialog.Props> {
  config: CXDecideDialog.Set = {
    title: 'Decide Dialog',
    description: 'Decide dialog was created',
    actionLeft: {
      text: 'back',
      action: () => {},
    },
    actionRight: {
      text: 'ok',
      action: () => {},
    },
  };

  static styles = css``;

  constructor() {
    super();
    if (this.config) this.exec();
  }

  render(): TemplateResult {
    return html`<div>
      <div>title: ${this.set.title}</div>
      <div>description: ${this.set.description}</div>
      <div>
        <cx-button @click="${this.set.actionLeft.action}">${this.set.actionLeft.text}</cx-button>
        <cx-button @click="${this.set.actionRight.action}">${this.set.actionRight.text}</cx-button>
      </div>
    </div>`;
  }

  // Method
  // public log(config: { text: string }): void {
  //   console.log('log: ', config.text);
  // }

  // Event
  // private pressed(): void {
  //   this.setCustomEvent<CXDecideDialog.Details[typeof onPressed]>(onPressed, {
  //     event: onPressed,
  //   });
  // }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXDecideDialog {
    type Ref = DecideDialog;

    type Var<T extends ThemeVersion = 2> = unknown;

    type Set<T extends ThemeVersion = 2> = {
      title: string;
      description: string;
      actionLeft: {
        text: string;
        action: () => void;
      };
      actionRight: {
        text: string;
        action: () => void;
      };
    };

    type Fix = Required<{ [K in keyof Set]: (value: Set[K]) => Fix }> & { exec: () => void };

    type Props = {
      var: Pick<Var, never>;
      set: Set;
      fix: Fix;
      make: Var;
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
    [tagName]: CXDecideDialog.Ref;
  }

  // namespace JSX {
  //  interface IntrinsicElements {
  //   [tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> | CXDecideDialog.Ref;
  //  }
  // }
}
