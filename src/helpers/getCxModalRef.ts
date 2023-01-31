import { ModalSingleton } from '../components/materials/modal/singleton/modal.singleton';

export function getCxModalRef(): CXModal.Ref | null {
  return ModalSingleton.CxModalRef;
}
