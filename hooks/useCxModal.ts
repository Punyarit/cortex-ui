import { getCxModalRef } from '../helpers/getCxModalRef';

const setOpacity = (CxModalRef: CXModal.Ref, value: '1' | '0') => {
  const timeout = setTimeout(() => {
    CxModalRef.style.setProperty('--opacity', value);
    clearTimeout(timeout);
  }, 0);
};

const enabledBackdrop = (status: 'enabled' | 'disabled', CxModalRef: CXModal.Ref) => {
  if (status !== 'enabled') return;
  CxModalRef?.toggleBackdrop(status);
  setOpacity(CxModalRef, '1');
};

const disabledBackdrop = (status: 'enabled' | 'disabled', CxModalRef: CXModal.Ref) => {
  if (status !== 'disabled') return;
  setOpacity(CxModalRef, '0');
  const timeout = setTimeout(() => {
    CxModalRef?.toggleBackdrop(status);
    clearTimeout(timeout);
  }, 250);
};

export const useCxModal = {
  // 📌important note!! toggle backdrop mean just enabled/disabled backdrop it not clear or remove dialog. dont use it for close dialog!
  toggleBackdrop: (status: 'enabled' | 'disabled') => {
    const CxModalRef = getCxModalRef();
    enabledBackdrop(status, CxModalRef as CXModal.Ref);
    disabledBackdrop(status, CxModalRef as CXModal.Ref);
  },
};
