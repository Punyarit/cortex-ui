import { getCxModalRef } from '../../../helpers/getCxModalRef';
import { EventStrategy } from '../types/event-straegy';

export class MouseoverPopover implements EventStrategy {
  public CxModalRef: CXModal.Ref;
  public events: (keyof HTMLElementEventMap)[] = ['mouseover', 'mouseleave'];

  constructor(public CxDiv: HTMLElement, public popoverName: string) {
    this.CxModalRef = getCxModalRef() as CXModal.Ref;

    for (const event of this.events) {
      if (event === 'mouseover' || event === 'mouseleave') {
        CxDiv.addEventListener(event, this[event]);
      }
    }
  }

  mouseover = () => {
    if (!this.CxModalRef) return;
    this.CxModalRef.popoverMouseover(this.popoverName);
  };

  mouseleave = () => {
    if (!this.CxModalRef) return;
    this.CxModalRef.popoverMouseleave();
  };

  eventDetail(): EventStrategy {
    return this;
  }
}
