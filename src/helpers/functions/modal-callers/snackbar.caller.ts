import { SnackbarSingleton } from '../../../components/snackbar/singleton/snackbar.singleton';
import { ModalSingleton } from '../../../components/modal/singleton/modal.singleton';
import { snackbarModalSlot } from '../../../components/snackbar/types/snackbar.types';

export class SnackbarCaller {
  constructor(private readonly config: CXSnackbar.Set) {}
  open() {
    SnackbarSingleton.ref.setSnackbarAppear();
    SnackbarSingleton.ref
      .fix()
      .text(this.config.text)
      .duration(this.config?.duration || SnackbarSingleton.ref.set.duration)
      .color(this.config?.color || SnackbarSingleton.ref.set.color)
      .iconSrc(this.config?.iconSrc || SnackbarSingleton.ref.set.iconSrc)
      .exec();
    ModalSingleton.modalRef.openSnackbar(snackbarModalSlot);
  }
}
