import { ModalSingleton } from '../../../components/modal/singleton/modal.singleton';

export class DecideDialogCaller {
  private dialogRef?: CXDialog.Ref;
  private decideDialogRef: CXDecideDialog.Ref;

  constructor(private config: CXDecideDialog.Set) {
    this.decideDialogRef = document.createElement('cx-decide-dialog');
    this.decideDialogRef
      .fix()
      .title(this.config.title)
      .description(this.config.description)
      .actionLeft(config.actionLeft)
      .actionRight(config.actionRight)
      .exec();
  }

  async open() {
    this.dialogRef = await ModalSingleton.ref.openDialog('global-dialog');
    this.dialogRef.append(this.decideDialogRef);
  }

  close() {
    ModalSingleton.ref.closeDialog();
    this.dialogRef?.firstElementChild?.remove();

    // logic to close decide dialog
  }
}
