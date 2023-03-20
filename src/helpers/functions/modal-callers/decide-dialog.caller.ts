import { GlobalDialogSingleton } from '../../../components/dialog/singleton/global-dialog.singleton';
import { ModalSingleton } from '../../../components/modal/singleton/modal.singleton';

export class DecideDialogCaller {
  private decideDialogRef?: CXDecideDialog.Ref;

  constructor(private config: CXDecideDialog.Set) {}

  public async open() {
    this.removeFirstElement();
    this.setDecideDialog();
    GlobalDialogSingleton.ref.setSlotName('global-dialog');
    ModalSingleton.modalRef.openDialog('global-dialog');
    GlobalDialogSingleton.ref.append(this.decideDialogRef!);
    GlobalDialogSingleton.ref.addEventListener('closed', this.removeFirstElement);
  }

  public close() {
    ModalSingleton.modalRef.closeDialog();
  }

  private setDecideDialog() {
    // 📌need to create cx-decide-dialog everytime when call open because it need to update very component inside cx-decide-dialog
    // 📌if not create element agian it will cache component. thene bug will occur
    this.decideDialogRef = document.createElement('cx-decide-dialog');
    this.decideDialogRef
      .fix()
      .title(this.config.title)
      .description(this.config.description)
      .actionLeft(this.config.actionLeft)
      .actionRight(this.config.actionRight)
      .exec();
  }

  // 📌need to use arrow function because scope of addEventListener that recognized firstELementChild = undefiend
  private removeFirstElement = () => {
    if (!GlobalDialogSingleton.ref?.firstElementChild) return;
    GlobalDialogSingleton.ref?.removeEventListener('closed', this.removeFirstElement);
    GlobalDialogSingleton.ref.firstElementChild.remove();
  };
}
