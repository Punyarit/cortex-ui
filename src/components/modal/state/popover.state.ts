import { Ref } from 'lit/directives/ref';
import { Modal } from '../modal';
import { ModalSingleton } from '../singleton/modal.singleton';

export class PopoverState {
  public static POPOVER_SLOT_DISABLED = 'popover-disabled';
  public static POPOVER_SLOT_OPEN = 'popover';

  open(popoverContent: HTMLElement) {
    ModalSingleton.popoverSlotRef.name = PopoverState.POPOVER_SLOT_OPEN;
    ModalSingleton.popoverSlotRef.parentElement!.classList.remove(Modal.MODAL_DISABLED);
    ModalSingleton.modalRef.append(popoverContent);
  }

  // mouseover(detail: { popoverName: string; slotRef: Ref<HTMLSlotElement> }) {
  //   if (!detail.slotRef.value) return;
  //   detail.slotRef.value.name = detail.popoverName;
  // }

  // mouseleave(slotRef: Ref<HTMLSlotElement>) {
  //   if (!slotRef.value) return;
  //   slotRef.value.name = this.POPOVER_SLOT_DEFAULT;
  // }
}
