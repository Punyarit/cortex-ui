import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { ColorTypesV2 } from '../../types/colors.v2.type';
import '../icon/icon';
import { IconSrcTypes } from '../icon/types/icon.types';
import '../transition/transition';
import { WhenTypes } from '../transition/types/transition.types';
import { SnackbarSingleton } from './singleton/snackbar.singleton';
import { CxSnackbarName } from './types/snackbar.name';
import {
  snackbarDurationDefault,
  snackbarModalSlot,
  SnackbarPositionType,
} from './types/snackbar.types';

// export const onPressed = 'pressed';

@customElement(CxSnackbarName)
export class Snackbar extends ComponentBase<CXSnackbar.Props> {
  config: CXSnackbar.Set = {
    position: 'top-center',
    text: 'The snackbar has been opened.',
    iconSrc: 'favorite-line',
    duration: snackbarDurationDefault,
    color: 'primary',
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
      box-shadow: 0 var(--base-size-6) var(--base-size-20) -0.188rem var(--base-shadow-400),
        0 var(--base-size-4) var(--base-size-6) -0.25rem var(--base-shadow-400);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
    if (this.config) this.exec();
    super.connectedCallback();
    this.createSharedCxSnackbarRef();
  }

  private transitionRef = createRef<CXTransition.Ref>();

  render(): TemplateResult | undefined {
    return this.slot
      ? html`
          <style></style>
          <cx-transition ${ref(this.transitionRef)} .set="${this.set.transition}">
            <div class="snackbar">
              ${this.renderIcon()}
              <div>${this.set.text}</div>
            </div>
          </cx-transition>
        `
      : undefined;
  }

  private createSharedCxSnackbarRef() {
    SnackbarSingleton.ref = this;
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

  public setSnackbarAppear(): void {
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

    type Var = {
      backgroundColor: ColorTypesV2;
      textColor: ColorTypesV2;
    };

    type Set = {
      text: string;
      iconSrc?: IconSrcTypes;
      // 📌duration will be used by CxModal (from useCxSnackbar)
      duration?: number;
      color?: 'primary' | 'secondary';
      transition?: CXTransition.Set;
      position?: SnackbarPositionType;
    };

    type Fix = Required<{ [K in keyof Set]: (value: Set[K]) => Fix }> & {
      exec: () => void;
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
    [CxSnackbarName]: CXSnackbar.Ref;
  }

  // interface GlobalEventHandlersEventMap {
  //   [onPressed]: (customEvent: CXSnackbar.Pressed) => void;
  // }
}
