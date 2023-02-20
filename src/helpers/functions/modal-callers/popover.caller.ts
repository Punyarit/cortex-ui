import { ModalSingleton } from '../../../components/modal/singleton/modal.singleton';
export class PopoverCaller {
  close() {
    ModalSingleton.modalRef.closePopover();
  }
}
