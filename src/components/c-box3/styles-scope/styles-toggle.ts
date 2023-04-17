import { ToggleEvents, UiToggleSelectedRef } from '../types/c-box.types';

export class StyleToggle {
  static handle(box: CBox.Ref, refName: 'ui' | 'before' | 'after' | 'animate' | 'icon') {
    const toggleAttr = `${refName}-toggle`;
    const toggleGroup: CBox.Ref | null = box.closest('c-box[toggle-group]');
    box.toggleEvents ||= {} as ToggleEvents;

    box.toggleEvents[refName] = () => {
      if (toggleGroup) {
        if (toggleGroup?.uiToggleSelectedRef?.[refName]) {
          toggleGroup.uiToggleSelectedRef?.[refName]?.removeAttribute(toggleAttr);
        }

        if (toggleGroup?.uiToggleSelectedRef?.[refName] !== box) {
          box.setAttribute(toggleAttr, '');
          toggleGroup.uiToggleSelectedRef ||= {} as UiToggleSelectedRef;
          toggleGroup.uiToggleSelectedRef[refName] = box;
        } else {
          toggleGroup.uiToggleSelectedRef[refName] = undefined;
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
