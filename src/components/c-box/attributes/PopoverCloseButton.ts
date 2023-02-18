import { ModalSingleton } from '../../modal/singleton/modal.singleton';

export class POpoverCloseButton {
  constructor(private box: CBox.Ref) {
    this.box.onclick = () => {
      ModalSingleton.modalRef.closePopover();
    };
  }
}
