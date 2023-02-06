export class ModalSingleton {
  private static instance: ModalSingleton;
  public static modalRef: CXModal.Ref;
  public static popoverSlotRef: HTMLSlotElement;
  constructor() {
    if (ModalSingleton.instance) {
      return ModalSingleton.instance;
    }
    ModalSingleton.instance = this;
  }
}
