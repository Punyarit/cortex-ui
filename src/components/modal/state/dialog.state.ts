import { Ref } from 'lit/directives/ref';
import { observeElementManyTypes } from '../../../helpers/functions/observeElement/observeElement';
import { Modal } from '../modal';
import { ModalSingleton } from '../singleton/modal.singleton';

export class DialogState {
  static readonly DIALOG_SLOT_DEFAULT = 'dialog-disabled';
  static readonly DIALOG_ENABLED = 'dialog__enabled';
  static readonly LOCAL_DIALO_SLOT = 'local-dialog-slot';

  private dialogRef?: CXDialog.Ref;
  private dialogSlot?: Ref<HTMLSlotElement>;
  private slotName?: string;

  public open = (detail: {
    slotRef?: Ref<HTMLSlotElement>;
    slotName: string;
  }): Promise<CXDialog.Ref> => {
    this.setSlotName(detail.slotName);
    this.setDialogSlot(detail.slotRef);

    if (this.dialogSlot?.value?.name === DialogState.DIALOG_SLOT_DEFAULT) {
      this.startTransition();
      this.toggleBackdrop('enabled');
      this.SetOpacity('1');
      this.setModalSlot();
    } else {
      // 📌close when call new dialog while current dialog still appear
      this.close(false);
      // 📌after close then it will open new dialog immediately
      this.openChildDialog();
    }

    return this.getAsyncDialogRef();
  };

  private setSlotName(slotName: string) {
    this.slotName = slotName;
  }

  private setDialogSlot(slotRef?: Ref<HTMLSlotElement>) {
    if (!this.dialogSlot) this.dialogSlot = slotRef;
  }

  private getAsyncDialogRef(): Promise<CXDialog.Ref> {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        if (this.dialogRef) resolve(this.dialogRef);
      });
    });
  }

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
    if (ModalSingleton.modalRef.set.disabledBackdrop || this.dialogRef?.set.disabledBackdrop)
      return;
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
      ModalSingleton.modalRef.style.setProperty('--opacity', value);
    }, 0);
  }

  private openChildDialog() {
    setTimeout(() => {
      this.setModalSlot(DialogState.DIALOG_SLOT_DEFAULT);
      this.open({ slotName: this.slotName! });
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
  private setModalSlot = (slotName?: string): void => {
    if (this.dialogSlot?.value) {
      this.dialogSlot.value.name = slotName || this.slotName!;
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
    dialogParent.classList.remove(Modal.MODAL_DISABLED);
  }

  private disabledBackdrop(dialogParent: HTMLElement, status: 'enabled' | 'disabled'): void {
    if (status !== 'disabled') return;
    dialogParent.classList.add(Modal.MODAL_DISABLED);
    dialogParent.classList.remove(DialogState.DIALOG_ENABLED);
  }

  private attachEscapeKeyupEvent(): void {
    if (ModalSingleton.modalRef.set.disabledBackdrop || this.dialogRef?.set.disabledBackdrop)
      return;
    document.addEventListener('keydown', this.disabledBackdropByEscape);
  }

  private disabledBackdropByEscape = (e: KeyboardEvent): void => {
    if (e.key !== 'Escape') return;
    this.close();
  };

  private createSlotRef(target: HTMLSlotElement, callback?: () => void): void {
    observeElementManyTypes({
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
