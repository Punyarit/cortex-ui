import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../../../base/component-base/component.base';
import { ThemeVersion } from '../../../theme/types/theme.types';
import '../../../button/button';
import '../../../theme/theme';
import { SizeTypes } from '../../../../types/sizes.type';
import { ColorTypes } from '../../../../types/colors.version-control';

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

  static styles = css`
    :host {
      --titleSize: var(--size-20);
      --titleColor: var(--primary-800);
      --descriptionSize: var(--size-16);
      --descriptionColor: var(--gray-600);
    }
    .decide-dialog {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: var(--size-12);
    }
    .title {
      font-size: var(--titleSize);
      color: var(--titleColor);
    }

    .description {
      font-size: var(--descriptionSize);
      color: var(--descriptionColor);
    }

    .action {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      column-gap: var(--size-12);
    }
  `;

  constructor() {
    super();
    if (this.config) this.exec();
  }

  render(): TemplateResult {
    return html`<div class="decide-dialog">
      <div class="title">${this.set.title}</div>
      <div class="description">${this.set.description}</div>
      <div class="action">
        <cx-button @click="${this.set.actionLeft.action}" .set="${this.set.actionLeft.buttonSet}"
          >${this.set.actionLeft.text}</cx-button
        >
        <cx-button @click="${this.set.actionRight.action}" .set="${this.set.actionRight.buttonSet}"
          >${this.set.actionRight.text}</cx-button
        >
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

    type Var<T extends ThemeVersion = 2> = {
      titleSize?: SizeTypes;
      titleColor?: ColorTypes<T>;
      descriptionSize: SizeTypes;
      descriptionColor: ColorTypes<T>;
    };

    type Set<T extends ThemeVersion = 2> = {
      title: string;
      description: string;
      actionLeft: {
        text: string;
        action: () => void;
        buttonSet?: CXButton.Set;
      };
      actionRight: {
        text: string;
        action: () => void;
        buttonSet?: CXButton.Set;
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
