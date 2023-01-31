import { ModalSingleton } from '../components/modal/singleton/modal.singleton';

export function getCxModalRef(): CXModal.Ref | null {
  return ModalSingleton.CxModalRef;
}
