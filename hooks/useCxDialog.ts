import { getCxModalRef } from '../helpers/getCxModalRef';

export function useCxDialog(slot: string): {
  open: () => void;
  close: () => void;
} {
  const CxModalRef = getCxModalRef();

  return {
    open: () => {
      // 📌if check CxModalRef on line:8 this function can return undefined. so we dont unexpected that
      if (!CxModalRef) return;
      CxModalRef.openDialog(slot);
    },
    close: () => {
      if (!CxModalRef) return;
      CxModalRef.closeDialog();
    },
  };
}
