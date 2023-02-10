import { ModalSingleton } from '../modal/singleton/modal.singleton';
import { AbilityBase } from './AbilityBase';
import { CxPopoverAbility } from './types2/box.cx-popover.types';

export class CxPopoverAbilityBuilder extends AbilityBase implements CxPopoverAbility {
  constructor(box: CBox.Ref, value: string) {
    super(box, value);
  }

  close() {
    this.box.onclick = () => {
      ModalSingleton.modalRef.closePopover();
    };
  }
}
