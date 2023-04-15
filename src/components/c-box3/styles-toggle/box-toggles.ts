import { UiTypes } from '../types/c-box.types';

export class BoxToggle {
  static toggleStyles(box: CBox.Ref, toggleGroup: CBox.Ref | null) {
    if (toggleGroup?.cacheToggleEvents) {
      if (toggleGroup.hasAttribute('toggle-hold')) {
        for (const event in toggleGroup.cacheToggleEvents) {
          toggleGroup.cacheToggleEvents?.[event as UiTypes]?.();
        }
      } else if (toggleGroup?.cacheToggleEvents !== box.toggleEvents) {
        if (toggleGroup.isToggleDirty) {
          for (const event in box.toggleEvents) {
            toggleGroup.cacheToggleEvents?.[event as UiTypes]?.();
          }
        } else {
          for (const event in toggleGroup.cacheToggleEvents) {
            toggleGroup.cacheToggleEvents?.[event as UiTypes]?.();
          }
        }
        toggleGroup.isToggleDirty = false;
      } else {
        toggleGroup.isToggleDirty = !toggleGroup.isToggleDirty;
      }
    }
    for (const event in box.toggleEvents) {
      box.toggleEvents[event as UiTypes]();
    }

    if (toggleGroup) {
      toggleGroup.cacheToggleEvents = box.toggleEvents;
    }
  }
}
