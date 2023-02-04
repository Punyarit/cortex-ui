// import {useCxDialog} from '../../../helpers/useCxDialog';
import {EventStrategy} from '../types/event-straegy';

export class ClickDialog implements EventStrategy {
  public events: (keyof HTMLElementEventMap)[] = ['click'];
  private valuesArray: CXBox.ClickDialog;

  constructor(public CxBox: HTMLElement, public values: string) {
    this.valuesArray = values.split(',') as CXBox.ClickDialog;
    CxBox.addEventListener('click', this.click);
  }

  click = () => {
    const [dialogName, dialogStatus] = this.valuesArray;
    // FIXME: dialog
    // useCxDialog(dialogName)[dialogStatus]();
  };

  eventDetail(): EventStrategy {
    return this;
  }
}
