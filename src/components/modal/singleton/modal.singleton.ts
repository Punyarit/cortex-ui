export class ModalSingleton {
  private static instance: ModalSingleton;
  public static ref: CXModal.Ref;
  constructor() {
    if (ModalSingleton.instance) {
      return ModalSingleton.instance;
    }
    ModalSingleton.instance = this;
  }
}
