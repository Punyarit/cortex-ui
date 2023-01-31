import { Ref } from 'lit/directives/ref';
import { Modal } from '../modal';

export class ModalPopoverState {
  public POPOVER_SLOT_DEFAULT = 'popover-slot';

  constructor(public modal: Modal) {}

  mouseover(detail: { popoverName: string; slotRef: Ref<HTMLSlotElement> }) {
    if (!detail.slotRef.value) return;
    detail.slotRef.value.name = detail.popoverName;
  }

  mouseleave(slotRef: Ref<HTMLSlotElement>) {
    if (!slotRef.value) return;
    slotRef.value.name = this.POPOVER_SLOT_DEFAULT;
  }
}
