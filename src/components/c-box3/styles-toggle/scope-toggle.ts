import { ToggleEvents, UiToggleSelectedRef } from '../types/c-box.types';

export class ScopeToggle {
  static handle(box: CBox.Ref) {
    const toggleGroup: CBox.Ref | null = box.closest('c-box[toggle-group]');
    box.toggleEvents ||= {} as ToggleEvents;

    box.toggleEvents.ui = () => {
      if (toggleGroup) {
        if (toggleGroup?.uiToggleSelectedRef?.ui) {
          this.handleClasses(
            toggleGroup.uiToggleSelectedRef?.ui,
            toggleGroup.uiToggleSelectedRef?.ui.uiClassNames!.toggle,
            true
          );
        }

        if (toggleGroup?.uiToggleSelectedRef?.ui !== box) {
          this.handleClasses(box, box.uiClassNames!.toggle);
          toggleGroup.uiToggleSelectedRef ||= {} as UiToggleSelectedRef;

          toggleGroup.uiToggleSelectedRef.ui = box;
        } else {
          toggleGroup.uiToggleSelectedRef.ui = undefined;
        }
      } else {
        this.handleClasses(box, box.uiClassNames!.toggle);
      }
    };
    box.onmouseup = () => {
      box.toggleStyles(toggleGroup);
    };
  }

  static handleClasses(box: CBox.Ref, classNames: string[], removeOnly = false): void {
    for (const className of classNames) {
      if (removeOnly) {
        box.classList.remove(className);
      } else {
        box.classList.toggle(className);
      }
    }
  }
}
