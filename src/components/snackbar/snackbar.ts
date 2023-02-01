import {css, html, TemplateResult} from 'lit';
import {customElement} from 'lit/decorators.js';
import {createRef, ref} from 'lit/directives/ref.js';
import {ComponentBase} from '../../base/component-base/component.base';
import '../icon/icon';
import {IconSrcTypes} from '../icon/types/icon.types';
import '../transition/transition';
import {WhenTypes} from '../transition/types/transition.types';
import {SnackbarSingleton} from './singleton/snackbar.singleton';
import {
  snackbarDurationDefault,
  snackbarModalSlot,
} from './types/snackbar.types';

export const tagName = 'cx-snackbar';
// export const onPressed = 'pressed';

@customElement(tagName)
export class Snackbar extends ComponentBase<CXSnackbar.Props> {
  config: CXSnackbar.Set = {
    text: 'The snackbar has been opened.',
    iconSrc: 'favorite',
    duration: snackbarDurationDefault,
    transition: {
      start: {
        name: 'scale-up',
        delay: '0',
        duration: '0.25s',
        timing: 'ease',
      },
      end: {
        name: 'scale-down',
        delay: '0',
        duration: '0.25s',
        timing: 'ease',
      },
      fade: true,
    },
  };

  static styles = css`
    .snackbar {
      display: inline-flex;
      align-items: center;
      column-gap: 12px;
      background-color: var(--white);
      padding: var(--base-size-12);
      border-radius: var(--base-size-12);
    }
  `;

  constructor() {
    super();
    if (this.config) this.initConfig();
  }

  private initConfig(): void {
    this.fixConfig();
    this.cacheConfig(this.config);
    this.exec();
  }

  private transitionRef = createRef<CXTransition.Ref>();

  render(): TemplateResult | undefined {
    return this.slot
      ? html`
          <style></style>
          <cx-transition
            ${ref(this.transitionRef)}
            .set="${this.set.transition}"
          >
            <div class="snackbar">
              ${this.renderIcon()}
              <div>${this.set.text}</div>
            </div>
          </cx-transition>
        `
      : undefined;
  }

  connectedCallback() {
    super.connectedCallback();
    this.createSharedCxSnackbarRef();
  }

  private createSharedCxSnackbarRef() {
    SnackbarSingleton.CxSnackbarRef = this;
  }

  private renderIcon() {
    if (!this.set.iconSrc) return;
    const iconSet: CXIcon.Set = {
      src: this.set.iconSrc,
      color: 'primary',
      size: 'large',
    };
    return html` <cx-icon .set="${iconSet}"></cx-icon>`;
  }

  private setSlotName(): void {
    this.slot = snackbarModalSlot;
    this.requestUpdate();
  }

  public open(): void {
    this.setSlotName();
    this.executeTransition('start');
  }

  // 📌cant execute this method becoz dom of transition not render
  // 📌must call from modal becoz the modal has slot observer. its accessible this method when slot change
  public executeTransition(when: WhenTypes) {
    if (!this.transitionRef?.value) return;
    this.transitionRef.value.setTransition(when);
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXSnackbar {
    type Ref = Snackbar;

    type Var = unknown;

    type Set = {
      text: string;
      iconSrc?: IconSrcTypes;
      // 📌duration will be used by CxModal (from useCxSnackbar)
      duration?: number;
      color?: 'primary' | 'secondary';
      transition?: CXTransition.Set;
    };

    type Fix = Required<{[K in keyof Set]: (value: Set[K]) => Fix}> & {
      exec: () => Ref;
    };

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
    [tagName]: CXSnackbar.Ref;
  }

  // interface GlobalEventHandlersEventMap {
  //   [onPressed]: (customEvent: CXSnackbar.Pressed) => void;
  // }
}
