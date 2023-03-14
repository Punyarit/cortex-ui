import { PopoverContent } from '../../../popover/types/popover.types';

export class POpoverCloseButton {
  constructor(private box: CBox.Ref) {}
  init() {
    this.box.addEventListener('click', (e) => {
      const popover = this.box.closest("c-box[slot='popover']") as PopoverContent;
      requestAnimationFrame(() => {
        popover.popoverState?.closePopover(e);
      });
    });
  }
}
