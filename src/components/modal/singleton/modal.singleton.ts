export class ModalSingleton {
  private static instance: ModalSingleton;
  public static CxModalRef: CXModal.Ref;
  constructor() {
    if (ModalSingleton.instance) {
      return ModalSingleton.instance;
    }
    ModalSingleton.instance = this;
  }
}
