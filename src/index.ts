import { QueryRef as CXQueryRef } from './base/component-base/component.base';
import { ModalSingleton } from './components/modal/singleton/modal.singleton';
import { ModalCaller } from './helpers/ModalCaller';

export namespace CX {
  /**
   * Helper Functions
   */
  export const Modal = ModalCaller;
  export const ModalRef = ModalSingleton;
  export const QueryRef = CXQueryRef;
  export const Query = QueryRef.get;
}
