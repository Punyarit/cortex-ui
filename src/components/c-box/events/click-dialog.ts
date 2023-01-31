import {useCxDialog} from '../../../helpers/useCxDialog';
import {EventStrategy} from '../types/event-straegy';

export class ClickDialog implements EventStrategy {
  public events: (keyof HTMLElementEventMap)[] = ['click'];
  private valuesArray: CXDiv.ClickDialog;

  constructor(public CxDiv: HTMLElement, public values: string) {
    this.valuesArray = values.split(',') as CXDiv.ClickDialog;
    CxDiv.addEventListener('click', this.click);
  }

  click = () => {
    const [dialogName, dialogStatus] = this.valuesArray;
    useCxDialog(dialogName)[dialogStatus]();
  };

  eventDetail(): EventStrategy {
    return this;
  }
}
