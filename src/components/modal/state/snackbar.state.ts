import { Ref } from 'lit/directives/ref';
import { SnackbarSingleton } from '../../snackbar/singleton/snackbar.singleton';
import { SnackbarModalSlot } from '../../snackbar/types/snackbar.types';
import { Modal } from '../modal';

export class SnackbarState {
  public static readonly SNACKBAR_SLOT_DISABLED = 'snackbar-disabled';
  private readonly SNACKBAR_ENABLED = 'snackbar__enabled';

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
    requestAnimationFrame(() => {
      SnackbarSingleton.ref.executeTransition('start');
    });
  }

  private setSnackbarPosition(snackbarParent: HTMLDivElement) {
    snackbarParent.dataset.snackbarPosition = SnackbarSingleton.ref.set.position;
  }

  private setSnackbarSlotName(slot: SnackbarModalSlot): void {
    if (!this.snackbarSlot?.value?.parentElement) return;
    this.snackbarSlot.value.name = slot;
  }

  private toggleSnackbarClasses(): void {
    if (!this.snackbarSlot?.value?.parentElement) return;
    this.clearSnackbarTimeout();
    const snackbarParent = this.snackbarSlot.value.parentElement as HTMLDivElement;
    this.setSnackbarPosition(snackbarParent);
    this.enabledSnackbarClass(snackbarParent);
    this.transitionEndSnackbar();
    this.disabledSnackbarClass(snackbarParent);
  }

  private enabledSnackbarClass(snackbarParent: HTMLDivElement): void {
    snackbarParent.classList.add(this.SNACKBAR_ENABLED);
    snackbarParent.classList.remove(Modal.MODAL_DISABLED);
  }

  private disabledSnackbarClass(snackbarParent: HTMLDivElement): void {
    this.snackbarTimeStart = setTimeout(() => {
      if (!this.snackbarSlot?.value) return;
      this.snackbarSlot.value.name = SnackbarState.SNACKBAR_SLOT_DISABLED;
      snackbarParent.classList.add(Modal.MODAL_DISABLED);
      snackbarParent.classList.remove(this.SNACKBAR_ENABLED);
    }, SnackbarSingleton.ref.set.duration!);
  }

  private transitionEndSnackbar(): void {
    this.snackbarTimeEnd = setTimeout(() => {
      SnackbarSingleton.ref.executeTransition('end');
    }, SnackbarSingleton.ref.set.duration! - 250);
  }

  private clearSnackbarTimeout(): void {
    clearTimeout(this.snackbarTimeEnd as number);
    clearTimeout(this.snackbarTimeStart as number);
  }
}
