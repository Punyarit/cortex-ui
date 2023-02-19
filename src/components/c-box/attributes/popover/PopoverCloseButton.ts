import { ModalSingleton } from '../../../modal/singleton/modal.singleton';

export class POpoverCloseButton {
  static init(box: CBox.Ref) {
    box.onclick = () => {
      ModalSingleton.modalRef.closePopover();
    };
  }
}
