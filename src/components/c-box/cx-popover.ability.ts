import { ModalSingleton } from '../modal/singleton/modal.singleton';
import { CxPopoverAbility, CxPopoverAbilityAttrArray } from './types2/box.cx-popover.types';

export class CxPopoverAbilityBuilder implements CxPopoverAbility {
  constructor(private box: CBox.Ref, private value: string) {
    for (const ability of this.value.split(',') as CxPopoverAbilityAttrArray) {
      this[ability]();
    }
  }

  close() {
    this.box.textContent = '\ue800';
    this.box.style.fontFamily = 'close-solid';
    this.box.onclick = () => {
      ModalSingleton.modalRef.closePopover();
    };
  }
}
