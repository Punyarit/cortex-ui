import { Ref } from 'lit/directives/ref';
import { mutableElementManyTypes } from '../../../helpers/functions/observe-element/mutable-element';
import { SnackbarSingleton } from '../../snackbar/singleton/snackbar.singleton';
import { SnackbarModalSlot } from '../../snackbar/types/snackbar.types';
import { Modal } from '../modal';

export class SnackbarState {
  public static readonly SNACKBAR_SLOT_DISABLED = 'snackbar-disabled';
  private readonly SNACKBAR_ENABLED = 'snackbar__enabled';

  private snackbarRef?: CXSnackbar.Ref;
  private snackbarSlot?: Ref<HTMLSlotElement>;

  private snackbarTimeStart?: unknown;
  private snackbarTimeEnd?: unknown;

  public open = (detail: { slotRef: Ref<HTMLSlotElement>; slotName: SnackbarModalSlot }): void => {
    if (!this.snackbarSlot) this.snackbarSlot = detail.slotRef;

    this.startTransition();
    this.setSnackbarSlotName(detail.slotName);
    this.toggleSnackbarClasses();
  };

  private startTransition(): void {
    if (!this.snackbarSlot?.value) return;
    this.createSlotRef(this.snackbarSlot.value, () => {
      this.snackbarRef?.executeTransition('start');
    });
  }

  private createSlotRef(target: HTMLSlotElement, callback?: () => void): void {
    mutableElementManyTypes({
      target,
      attributes: (mutation, observer) => {
        this.setComponentRef(mutation.target);
        observer.disconnect();

        if (callback) callback();
      },
    });
  }

  private setComponentRef(slot: Node): void {
    const componentRef = (slot as HTMLSlotElement).assignedElements()[0];
    this.snackbarRef = componentRef as CXSnackbar.Ref;
  }

  private setSnackbarSlotName(slot: SnackbarModalSlot): void {
    if (!this.snackbarSlot?.value?.parentElement) return;
    this.snackbarSlot.value.name = slot;
  }

  private toggleSnackbarClasses(): void {
    if (!this.snackbarSlot?.value?.parentElement) return;
    this.clearSnackbarTimeout();
    const snackbarParent = this.snackbarSlot.value.parentElement as CXSnackbar.Ref;
    this.enabledSnackbarClass(snackbarParent);
    this.transitionEndSnackbar();
    this.disabledSnackbarClass(snackbarParent);
  }

  private enabledSnackbarClass(snackbarParent: CXSnackbar.Ref): void {
    snackbarParent.classList.add(this.SNACKBAR_ENABLED);
    snackbarParent.classList.remove(Modal.MODAL_DISABLED);
  }

  private disabledSnackbarClass(snackbarParent: CXSnackbar.Ref): void {
    this.snackbarTimeStart = setTimeout(() => {
      if (!this.snackbarSlot?.value) return;
      this.snackbarSlot.value.name = SnackbarState.SNACKBAR_SLOT_DISABLED;
      snackbarParent.classList.add(Modal.MODAL_DISABLED);
      snackbarParent.classList.remove(this.SNACKBAR_ENABLED);
    }, SnackbarSingleton.ref.set.duration!);
  }

  private transitionEndSnackbar(): void {
    this.snackbarTimeEnd = setTimeout(() => {
      this.snackbarRef?.executeTransition('end');
    }, SnackbarSingleton.ref.set.duration! - 250);
  }

  private clearSnackbarTimeout(): void {
    clearTimeout(this.snackbarTimeEnd as number);
    clearTimeout(this.snackbarTimeStart as number);
  }
}
