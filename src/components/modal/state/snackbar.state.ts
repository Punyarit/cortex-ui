import {Ref} from 'lit/directives/ref';
import {observeElement} from '../../../helpers/functions/observeElement/observeElement';
import {SnackbarModalSlot} from '../../snackbar/types/snackbar.types';
import {Modal} from '../modal';
import {ModalSnackbarState} from '../types/modal.types';

export class SnackbarState implements ModalSnackbarState {
  public readonly SNACKBAR_SLOT_DEFAULT = 'snackbar-slot';
  private readonly SNACKBAR_ENABLED = 'snackbar__enabled';
  private readonly MODAL_DISABLED = 'disabled';

  private snackbarRef?: CXSnackbar.Ref;
  private snackbarSlot?: Ref<HTMLSlotElement>;

  private snackbarTimeStart?: unknown;
  private snackbarTimeEnd?: unknown;

  constructor(public modal: Modal) {}

  public open = (detail: {
    slotRef: Ref<HTMLSlotElement>;
    slotName: SnackbarModalSlot;
    duration: number;
  }): void => {
    if (!this.snackbarSlot) this.snackbarSlot = detail.slotRef;

    this.startTransition();
    this.setSnackbarSlotName(detail.slotName);
    this.toggleSnackbarClasses(detail.duration);
  };

  private startTransition(): void {
    if (!this.snackbarSlot?.value) return;
    this.createSlotRef(this.snackbarSlot.value, () => {
      this.snackbarRef?.executeTransition('start');
    });
  }

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
    const componentRef = (slot as HTMLSlotElement).assignedElements()[0];
    this.snackbarRef = componentRef as CXSnackbar.Ref;
  }

  private setSnackbarSlotName(slot: SnackbarModalSlot): void {
    if (!this.snackbarSlot?.value?.parentElement) return;
    this.snackbarSlot.value.name = slot;
  }

  private toggleSnackbarClasses(duration: number): void {
    if (!this.snackbarSlot?.value?.parentElement) return;
    this.clearSnackbarTimeout();
    const snackbarParent = this.snackbarSlot.value
      .parentElement as CXSnackbar.Ref;
    this.enabledSnackbarClass(snackbarParent);
    this.transitionEndSnackbar(duration);
    this.disabledSnackbarClass(snackbarParent, duration);
  }

  private enabledSnackbarClass(snackbarParent: CXSnackbar.Ref): void {
    snackbarParent.classList.add(this.SNACKBAR_ENABLED);
    snackbarParent.classList.remove(this.MODAL_DISABLED);
  }

  private disabledSnackbarClass(
    snackbarParent: CXSnackbar.Ref,
    duration: number
  ): void {
    this.snackbarTimeStart = setTimeout(() => {
      if (!this.snackbarSlot?.value) return;
      this.snackbarSlot.value.name = this.SNACKBAR_SLOT_DEFAULT;
      snackbarParent.classList.add(this.MODAL_DISABLED);
      snackbarParent.classList.remove(this.SNACKBAR_ENABLED);
    }, duration);
  }

  private transitionEndSnackbar(duration: number): void {
    this.snackbarTimeEnd = setTimeout(() => {
      this.snackbarRef?.executeTransition('end');
    }, duration - 250);
  }

  private clearSnackbarTimeout(): void {
    clearTimeout(this.snackbarTimeEnd as number);
    clearTimeout(this.snackbarTimeStart as number);
  }
}
