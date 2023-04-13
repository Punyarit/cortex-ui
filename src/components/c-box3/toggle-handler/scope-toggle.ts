export class ScopeToggle {
  static handle(box: CBox.Ref) {
    box.onmouseup = () => {
      const toggleGroup = box.closest('c-box[toggle-group]') as CBox.Ref;
      if (toggleGroup) {
        this.handleToggleGroup(toggleGroup, box);
      } else {
        this.toggleClasses(box, box.uiClassNames!.toggle);
      }
    };
  }

  static handleToggleGroup(toggleGroup: CBox.Ref, box: CBox.Ref): void {
    if (toggleGroup?.uiToggleSelectedRef) {
      this.toggleClasses(
        toggleGroup.uiToggleSelectedRef,
        toggleGroup.uiToggleSelectedRef.uiClassNames!.toggle,
        true
      );
    }

    if (toggleGroup?.uiToggleSelectedRef !== box) {
      this.toggleClasses(box, box.uiClassNames!.toggle);
      toggleGroup.uiToggleSelectedRef = box;
    } else {
      toggleGroup.uiToggleSelectedRef = undefined;
    }
  }

  static toggleClasses(box: CBox.Ref, classNames: string[], removeOnly = false): void {
    for (const className of classNames) {
      if (removeOnly) {
        box.classList.remove(className);
      } else {
        box.classList.toggle(className);
      }
    }
  }
}
