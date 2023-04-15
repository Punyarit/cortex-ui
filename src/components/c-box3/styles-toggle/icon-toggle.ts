import { ToggleEvents, UiToggleSelectedRef } from '../types/c-box.types';

export class IconToggle {
  static handle(box: CBox.Ref) {
    const toggleGroup: CBox.Ref | null = box.closest('c-box[toggle-group]');
    box.toggleEvents ||= {} as ToggleEvents;

    box.toggleEvents.icon = () => {
      if (toggleGroup) {
        if (toggleGroup?.uiToggleSelectedRef?.icon) {
          toggleGroup.uiToggleSelectedRef.icon.removeAttribute('icon-toggle');
        }

        if (toggleGroup?.uiToggleSelectedRef?.icon !== box) {
          box.setAttribute('icon-toggle', '');
          toggleGroup.uiToggleSelectedRef ||= {} as UiToggleSelectedRef;
          toggleGroup.uiToggleSelectedRef.icon = box;
        } else {
          toggleGroup.uiToggleSelectedRef.icon = undefined;
        }
      } else {
        if (box.hasAttribute('icon-toggle')) {
          box.removeAttribute('icon-toggle');
        } else {
          box.setAttribute('icon-toggle', '');
        }
      }
    };

    box.onmouseup = () => {
      box.toggleStyles(toggleGroup);
    };
  }
}
