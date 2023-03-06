import { ModalSingleton } from '../../../components/modal/singleton/modal.singleton';
import { PopoverContent } from '../../../components/popover/types/popover.types';
export class PopoverCaller {
  clear() {
    const popovers = ModalSingleton.modalRef.querySelectorAll(
      "c-box[slot='popover']"
    ) as NodeListOf<PopoverContent>;
    requestAnimationFrame(() => {
      popovers.forEach((popover) => {
        popover.popoverState?.closePopover(null);
      });
    });
  }
}
