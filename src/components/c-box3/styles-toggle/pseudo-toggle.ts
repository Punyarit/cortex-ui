import { ToggleEvents, UiToggleSelectedRef } from '../types/c-box.types';

export class PseudoToggle {
  static handle(box: CBox.Ref, pseudo: 'before' | 'after') {
    const toggleGroup: CBox.Ref | null = box.closest('c-box[toggle-group]');
    box.toggleEvents ||= {} as ToggleEvents;
    const pseudoAttr = `${pseudo}-toggle`;
    box.toggleEvents[pseudo] = () => {
      if (toggleGroup) {
        if (toggleGroup?.uiToggleSelectedRef?.[pseudo]) {
          toggleGroup.uiToggleSelectedRef?.[pseudo]?.removeAttribute(pseudoAttr);
        }

        if (toggleGroup?.uiToggleSelectedRef?.[pseudo] !== box) {
          box.setAttribute(pseudoAttr, '');
          toggleGroup.uiToggleSelectedRef ||= {} as UiToggleSelectedRef;
          toggleGroup.uiToggleSelectedRef[pseudo] = box;
        } else {
          toggleGroup.uiToggleSelectedRef[pseudo] = undefined;
        }
      } else {
        if (box.hasAttribute(pseudoAttr)) {
          box.removeAttribute(pseudoAttr);
        } else {
          box.setAttribute(pseudoAttr, '');
        }
      }
    };

    box.onmouseup = () => {
      box.toggleStyles(toggleGroup);
    };
  }
}
