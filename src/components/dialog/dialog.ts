import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { getCxModalRef } from '../../helpers/getCxModalRef';
import { DialogState } from '../modal/state/dialog.state';
import '../transition/transition';
import { TransitionDefaultFadeTypes, WhenTypes } from '../transition/types/transition.types';

export const tagName = 'cx-dialog';
export const onAfterClosed = 'afterClosed';

@customElement(tagName)
export class Dialog extends ComponentBase<CXDialog.Props> {
  config: CXDialog.Set = {
    disabledBackdrop: false,
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
    },
  };

  static styles = css`
    .dialog {
      display: inline-block;
      background-color: var(--white);
      padding: var(--base-size-20);
      border-radius: var(--base-size-8);
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

  private dialogRef = createRef<HTMLSlotElement>();
  private transitionRef = createRef<CXTransition.Ref>();
  private CxModalRef?: CXModal.Ref | null;

  render(): TemplateResult | undefined {
    return this.slot
      ? html`
          <cx-transition ${ref(this.transitionRef)} .set="${this.set.transition}">
            <div class="dialog" ${ref(this.dialogRef)}>
              <slot></slot>
            </div>
          </cx-transition>
        `
      : undefined;
  }

  // 📌Call method from Modal Component
  public executeTransition(when: WhenTypes) {
    if (!this.transitionRef?.value) return;
    this.transitionRef.value.setTransition(when);
  }

  // 📌this method *open/close only use for local dialog
  public open(): void {
    this.setSlotName();
    this.openLocalDialog();
  }

  private setSlotName(): void {
    if (this.slot) return;
    this.slot = DialogState.LOCAL_DIALO_SLOT;
    this.requestUpdate();
  }

  private openLocalDialog() {
    this.setCxModalRef();
    if (!this.CxModalRef) return;
    this.CxModalRef.append(this);
    this.CxModalRef.openDialog(DialogState.LOCAL_DIALO_SLOT);
  }

  private setCxModalRef() {
    if (this.CxModalRef) return;
    this.CxModalRef = getCxModalRef();
  }

  public close(): void {
    if (!this.CxModalRef) return;
    this.CxModalRef?.closeDialog();
  }

  public afterClosed(): void {
    this.setCustomEvent<CXDialog.Details[typeof onAfterClosed]>(onAfterClosed, { event: onAfterClosed });
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXDialog {
    type Ref = Dialog;

    type Var = unknown;

    type Set = {
      disabledBackdrop: boolean;
      transition?: TransitionDefaultFadeTypes;
    };

    type Details = {
      [onAfterClosed]: { event: string };
    };

    type Fix = {
      [K in keyof Set]: (value: Set[K]) => Fix;
    } & { exec: () => Ref };

    type Props = {
      var: Pick<Var, never>;
      set: Set;
      fix: Fix;
    };

    type Events = {
      [onAfterClosed]: (detail: AfterClosed) => void;
    };

    type AfterClosed = CustomEvent<Details[typeof onAfterClosed]>;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tagName]: CXDialog.Ref;
    }
  }

  interface HTMLElementTagNameMap {
    [tagName]: CXDialog.Ref;
  }
}
