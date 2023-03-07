import { PopoverContent } from '../../../popover/types/popover.types';

export class POpoverCloseButton {
  static init(box: CBox.Ref) {
    box.addEventListener('click', (e) => {
      const popover = box.closest("c-box[slot='popover']") as PopoverContent;
      requestAnimationFrame(() => {
        popover.popoverState?.closePopover(e);
      });
    });
  }
}
