import { ToggleEvents, UiToggleSelectedRef, UiTypes } from '../types/cx-div.types';

export class StyleToggle {
  static handle(box: CXDiv.Ref, refName: UiTypes) {
    const toggleAttr = `${refName}-toggle`;
    const toggleGroup: CXDiv.Ref | null = box.closest('cx-div[toggle-group]');
    box.toggleEvents ||= {} as ToggleEvents;

    box.toggleEvents[refName] = () => {
      if (toggleGroup) {
        if (toggleGroup?.toggleSelectedRef?.[refName]) {
          toggleGroup.toggleSelectedRef?.[refName]?.removeAttribute(toggleAttr);
        }

        if (toggleGroup?.toggleSelectedRef?.[refName] !== box) {
          box.setAttribute(toggleAttr, '');
          toggleGroup.toggleSelectedRef ||= {} as UiToggleSelectedRef;
          toggleGroup.toggleSelectedRef[refName] = box;
        } else {
          toggleGroup.toggleSelectedRef[refName] = undefined;
        }
      } else {
        if (box.hasAttribute(toggleAttr)) {
          box.removeAttribute(toggleAttr);
        } else {
          box.setAttribute(toggleAttr, '');
        }
      }
    };
    box.onmouseup = () => {
      box.toggleStyles(toggleGroup);
    };
  }
}
