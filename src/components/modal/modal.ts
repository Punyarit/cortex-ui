import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { GlobalDialogSingleton } from '../dialog/singleton/global-dialog.singleton';
import { SnackbarModalSlot } from '../snackbar/types/snackbar.types';
import { ModalSingleton } from './singleton/modal.singleton';
import { DialogState } from './state/dialog.state';
import { PopoverState } from './state/popover-state/popover.state';
import { SnackbarState } from './state/snackbar.state';
import { CxModalName } from './types/modal.name';

// export const onPressed = 'pressed';
@customElement(CxModalName)
export class Modal extends ComponentBase<CXModal.Props> {
  config: CXModal.Set = {
    disabledBackdrop: false,
  };

  public static readonly MODAL_DISABLED = 'disabled';

  private dialogState!: DialogState;
  private snackbarState!: SnackbarState;
  private popoverState!: PopoverState;

  private dialogSlotRef = createRef<HTMLSlotElement>();
  private snackbarSlotRef = createRef<HTMLSlotElement>();
  private popoverSlotRef = createRef<HTMLSlotElement>();

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
      z-index: 3;
      pointer-events: none;
    }
    .popover > slot {
      pointer-events: auto;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
    if (this.config) this.exec();
    super.connectedCallback();
    this.createModalState();
    this.createSharedCXModalRef();
  }

  render(): TemplateResult {
    return html`
      <!-- 📌menu is a popover that can display multiple popovers -->
      <!-- menu area -->
      <div class="menu area disabled"></div>

      <!-- 📌popover / tooltip area -->
      <div class="popover area disabled">
        <slot name="${PopoverState.POPOVER_SLOT_DISABLED}" ${ref(this.popoverSlotRef)}></slot>
      </div>

      <!-- 📌snackbar area -->
      <div class="snackbar area disabled">
        <slot name="${SnackbarState.SNACKBAR_SLOT_DISABLED}" ${ref(this.snackbarSlotRef)}></slot>
      </div>

      <!-- 📌 dialog area -->
      <div @click="${this.dialogState.closeBackdrop}" class="dialog area disabled">
        <slot
          @click="${(e: PointerEvent) => e.stopPropagation()}"
          ${ref(this.dialogSlotRef)}
          name="${DialogState.DIALOG_SLOT_DEFAULT}"></slot>
      </div>
      <slot></slot>
    `;
  }

  private createModalState(): void {
    this.dialogState = new DialogState();
    this.snackbarState = new SnackbarState();
    this.popoverState = new PopoverState();
  }

  private createSharedCXModalRef(): void {
    ModalSingleton.modalRef = this;

    requestAnimationFrame(() => {
      ModalSingleton.popoverSlotRef = this.popoverSlotRef.value!;
      GlobalDialogSingleton.ref = this.querySelector('cx-dialog')!;
    });
  }

  // 📌need to use arrow function becoz this function is called from outside scope
  public openDialog = async (slotName: string) =>
    await this.dialogState.open({
      slotRef: this.dialogSlotRef,
      slotName,
    });

  public closeDialog = (): void => {
    this.dialogState.close();
  };

  public openSnackbar = (slot: SnackbarModalSlot): void => {
    this.snackbarState.open({
      slotName: slot,
      slotRef: this.snackbarSlotRef,
    });
  };

  public openPopovre = (
    popoverContent: HTMLElement,
    hostRect: DOMRect,
    popoverSet: CXPopover.Set,
    popoverRoot: HTMLElement
  ) => {
    this.popoverState.open(popoverContent, hostRect, popoverSet, popoverRoot);
  };

  public closePopover = () => {
    this.popoverState.closePopover(null);
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
    [CxModalName]: CXModal.Ref;
  }
}
