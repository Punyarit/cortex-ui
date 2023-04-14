import { ToggleEvents } from '../types/c-box.types';

export class IconToggle {
  static handle(box: CBox.Ref) {
    const toggleGroup: CBox.Ref | null = box.closest('c-box[toggle-group]');
    box.toggleEvents ||= {} as ToggleEvents;

    box.toggleEvents.icon = () => {
      if (toggleGroup) {
        if (toggleGroup?.uiToggleSelectedRef?.icon) {
          toggleGroup.uiToggleSelectedRef.icon.removeAttribute('icon-toggle-value');
        }

        if (toggleGroup?.uiToggleSelectedRef?.icon !== box) {
          box.setAttribute('icon-toggle-value', '\uE800');
          toggleGroup.uiToggleSelectedRef ||= {} as {
            ui: CBox.Ref;
            icon: CBox.Ref;
          };
          toggleGroup.uiToggleSelectedRef.icon = box;
        } else {
          (toggleGroup.uiToggleSelectedRef as any).icon = undefined;
        }
      } else {
        if (box.hasAttribute('icon-toggle-value')) {
          box.removeAttribute('icon-toggle-value');
        } else {
          box.setAttribute('icon-toggle-value', '\uE800');
        }
      }
    };

    box.onmouseup = () => {
      box.toggleStyles(toggleGroup);
    };
  }
}
