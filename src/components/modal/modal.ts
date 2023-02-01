import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { SnackbarModalSlot } from '../snackbar/types/snackbar.types';
import { ModalSingleton } from './singleton/modal.singleton';
import { DialogState } from './state/dialog.state';
import { ModalPopoverState } from './state/popover.state';
import { SnackbarState } from './state/snackbar.state';
import { ModalDialogState, ModalSnackbarState } from './types/modal.types';

export const tagName = 'cx-modal';
// export const onPressed = 'pressed';
@customElement(tagName)
export class Modal extends ComponentBase<CXModal.Props> {
  config: CXModal.Set = {
    disabledBackdrop: false,
  };

  private dialogState!: ModalDialogState;
  private snackbarState!: ModalSnackbarState;
  private popoverState!: ModalPopoverState;

  private dialogSlot = createRef<HTMLSlotElement>();
  private snackbarSlot = createRef<HTMLSlotElement>();
  private popoverSlot = createRef<HTMLSlotElement>();

  static styles = css`
    :host {
      --opacity: 0;
      --background-color: var(--base-shadow-400);
    }
    .area {
      height: 100%;
      width: 100%;
      position: fixed;
    }

    .dialog {
      background-color: var(--background-color);
      opacity: var(--opacity);
      transition: opacity 0.25s;
      z-index: 2;
    }

    .dialog__enabled {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .disabled {
      display: none;
    }

    .snackbar {
      z-index: 1;
      pointer-events: none;
    }

    .snackbar__enabled {
      display: flex;
      justify-content: center;
      padding-top: var(--base-size-24);
    }

    .snackbar > slot {
      pointer-events: auto;
    }

    .popover {
      z-index: 2;
      pointer-events: none;
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

  render(): TemplateResult {
    return html`
      <div class="popover area">
        <slot name="${this.popoverState.POPOVER_SLOT_DEFAULT}" ${ref(this.popoverSlot)}></slot>
      </div>
      <!-- popover / tooltip -->

      <div class="snackbar area disabled">
        <slot name="${this.snackbarState.SNACKBAR_SLOT_DEFAULT}" ${ref(this.snackbarSlot)}></slot>
      </div>

      <!-- global dialog -->
      <div @click="${this.dialogState.closeBackdrop}" class="dialog area disabled">
        <slot
          @click="${(e: PointerEvent) => e.stopPropagation()}"
          ${ref(this.dialogSlot)}
          name="${DialogState.DIALOG_SLOT_DEFAULT}"
        ></slot>
      </div>
      <slot></slot>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.createModalState();
    this.createSharedCXModalRef();
  }

  private createModalState(): void {
    this.dialogState = new DialogState(this);
    this.snackbarState = new SnackbarState(this);
    this.popoverState = new ModalPopoverState(this);
  }

  private createSharedCXModalRef(): void {
    ModalSingleton.CxModalRef = this;
  }

  public popoverMouseover(popoverName: string) {
    this.popoverState.mouseover({
      popoverName,
      slotRef: this.popoverSlot,
    });
  }

  public popoverMouseleave() {
    this.popoverState.mouseleave(this.popoverSlot);
  }

  public toggleBackdrop(status: 'enabled' | 'disabled') {
    this.dialogState.toggleBackdrop(status, this.dialogSlot.value?.parentElement as HTMLElement);
  }

  // 📌need to use arrow function becoz this function is called from outside scope
  public openDialog = (slot: string): void => {
    this.dialogState.open({
      slotRef: this.dialogSlot,
      slotName: slot,
    });
  };

  public closeDialog = (): void => {
    this.dialogState.close();
  };

  public openSnackbar = (slot: SnackbarModalSlot, duration: number): void => {
    this.snackbarState.open({
      duration,
      slotName: slot,
      slotRef: this.snackbarSlot,
    });
  };
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXModal {
    type Ref = Modal;

    type Var = unknown;

    type Set = {
      disabledBackdrop?: boolean;
    };

    type Fix = Required<{
      [K in keyof Set]: (value: Set[K]) => Fix;
    }> & { exec: () => Ref };

    type Props = {
      var: Pick<Var, never>;
      set: Set;
      fix: Fix;
    };
  }

  interface HTMLElementTagNameMap {
    [tagName]: CXModal.Ref;
  }
}
