import { Ref } from 'lit/directives/ref';
import { observeElement } from '../../../helpers/functions/observeElement/observeElement';
import { Modal } from '../modal';
import { ModalDialogState } from '../types/modal.types';

export class DialogState implements ModalDialogState {
  static readonly DIALOG_SLOT_DEFAULT = 'dialog-slot';
  static readonly DIALOG_ENABLED = 'dialog__enabled';
  static readonly LOCAL_DIALO_SLOT = 'local-dialog-slot';
  static readonly MODAL_DISABLED = 'disabled';

  private dialogRef?: CXDialog.Ref;
  private dialogSlot?: Ref<HTMLSlotElement>;

  constructor(public modal: Modal) {}

  public open = (detail: { slotRef?: Ref<HTMLSlotElement>; slotName: string }): void => {
    if (!this.dialogSlot) this.dialogSlot = detail.slotRef;

    if (this.dialogSlot?.value?.name === DialogState.DIALOG_SLOT_DEFAULT) {
      this.startTransition();
      this.toggleBackdrop('enabled');
      this.SetOpacity("1");
      this.setModalSlot(detail.slotName);
    } else {
      this.close(false);
      this.openChildDialog(detail.slotName);
    }
  };

  public close = (shouldTriggerAfterClosed = true): void => {
    this.removeEscapeKeyupEvent();
    this.SetOpacity('0');
    this.endTransition();
    this.closeDialogWhenEnd();
    this.triggerAfterClosedWhenTimeup(shouldTriggerAfterClosed);
  };

  private endTransition() {
    this.dialogRef?.executeTransition('end');
  }

  public closeBackdrop = (): void => {
    if (this.modal.set.disabledBackdrop || this.dialogRef?.set.disabledBackdrop) return;
    this.close();
  };

  private triggerAfterClosedWhenTimeup(shouldTriggerAfterClosed?: boolean) {
    if (!shouldTriggerAfterClosed) return;
    setTimeout(() => {
      this.triggerAfterClosed();
    }, 250);
  }

  private startTransition() {
    if (!this.dialogSlot?.value) return;
    this.createSlotRef(this.dialogSlot.value, () => {
      this.dialogRef?.executeTransition('start');
      this.attachEscapeKeyupEvent();
    });
  }

  private SetOpacity(value: '0' | '1') {
    setTimeout(() => {
      this.modal.style.setProperty('--opacity', value);
    }, 0);
  }

  private openChildDialog(slotName: string) {
    setTimeout(() => {
      this.setModalSlot(DialogState.DIALOG_SLOT_DEFAULT);
      this.open({ slotName });
    }, 250);
  }

  private closeDialogWhenEnd() {
    setTimeout(() => {
      this.toggleBackdrop('disabled');
      this.removeDialogLocal();
      this.setModalSlot(DialogState.DIALOG_SLOT_DEFAULT);
    }, 250);
  }

  private removeDialogLocal() {
    if (this.dialogSlot?.value?.name === DialogState.LOCAL_DIALO_SLOT) {
      this.dialogRef?.remove();
    }
  }

  // 📌need to use arrow function becoz this function is called from another scope
  private setModalSlot = (slot: string): void => {
    if (this.dialogSlot?.value) {
      this.dialogSlot.value.name = slot;
    }
  };

  public toggleBackdrop(status: 'enabled' | 'disabled', dialogParentParam?: HTMLElement): void {
    const dialogParent = this.dialogSlot?.value?.parentElement || dialogParentParam;
    if (!dialogParent) return;
    this.enabledBackdrop(dialogParent, status);
    this.disabledBackdrop(dialogParent, status);
  }

  private enabledBackdrop(dialogParent: HTMLElement, status: 'enabled' | 'disabled'): void {
    if (status !== 'enabled') return;
    dialogParent.classList.add(DialogState.DIALOG_ENABLED);
    dialogParent.classList.remove(DialogState.MODAL_DISABLED);
  }

  private disabledBackdrop(dialogParent: HTMLElement, status: 'enabled' | 'disabled'): void {
    if (status !== 'disabled') return;
    dialogParent.classList.add(DialogState.MODAL_DISABLED);
    dialogParent.classList.remove(DialogState.DIALOG_ENABLED);
  }

  private attachEscapeKeyupEvent(): void {
    if (this.modal.set.disabledBackdrop || this.dialogRef?.set.disabledBackdrop) return;
    document.addEventListener('keydown', this.disabledBackdropByEscape);
  }

  private disabledBackdropByEscape = (e: KeyboardEvent): void => {
    if (e.key !== 'Escape') return;
    this.close();
  };

  private createSlotRef(target: HTMLSlotElement, callback?: () => void): void {
    observeElement({
      target,
      attributes: (mutation, observer) => {
        this.setComponentRef(mutation.target);
        observer.disconnect();

        if (callback) callback();
      },
    });
  }

  private setComponentRef(slot: Node): void {
    this.dialogRef = <CXDialog.Ref>(slot as HTMLSlotElement).assignedElements()[0];
  }

  private triggerAfterClosed(): void {
    if (this.dialogRef) this.dialogRef.afterClosed();
  }

  private removeEscapeKeyupEvent(): void {
    document.removeEventListener('keydown', this.disabledBackdropByEscape);
  }
}
