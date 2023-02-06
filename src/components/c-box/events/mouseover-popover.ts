import { ModalSingleton } from '../../modal/singleton/modal.singleton';
import { EventStrategy } from '../types/event-straegy';

export class MouseoverPopover implements EventStrategy {
  public events: (keyof HTMLElementEventMap)[] = ['mouseover', 'mouseleave'];

  constructor(public CxBox: HTMLElement, public popoverName: string) {
    for (const event of this.events) {
      if (event === 'mouseover' || event === 'mouseleave') {
        CxBox.addEventListener(event, this[event]);
      }
    }
  }

  mouseover = () => {
    // ModalSingleton.ref.popoverMouseover(this.popoverName);
  };

  mouseleave = () => {
    // ModalSingleton.ref.popoverMouseleave();
  };

  eventDetail(): EventStrategy {
    return this;
  }
}
