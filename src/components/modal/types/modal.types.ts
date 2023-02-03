import { Ref } from 'lit/directives/ref';
import { SnackbarModalSlot } from '../../snackbar/types/snackbar.types';

export type ModalStatusTypes = 'open' | 'closed';

export interface ModalDialogState {
  open(detail: { slotRef?: Ref<HTMLSlotElement>; slotName: string }): void;
  close: (shouldTriggerAfterClosed?: boolean) => void;
  closeBackdrop: () => void;
}

export interface ModalSnackbarState {
  SNACKBAR_SLOT_DEFAULT: 'snackbar-slot';
  open(detail: {
    slotRef: Ref<HTMLSlotElement>;
    slotName: SnackbarModalSlot;
    duration: number;
  }): void;
}
