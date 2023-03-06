import { PopoverContent } from '../../../popover/types/popover.types';

export class POpoverCloseButton {
  static init(box: CBox.Ref) {
    box.onclick = (e) => {
      const popover = box.parentElement?.parentElement as PopoverContent;
      requestAnimationFrame(() => {
        popover.popoverState?.closePopover(e);
      });
    };
  }
}
