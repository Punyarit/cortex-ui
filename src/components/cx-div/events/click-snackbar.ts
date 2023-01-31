import { useCxSnackbar } from '../../../../hooks/useCxSnackbar';
import { EventStrategy } from '../types/event-straegy';

export class ClickSnackbar implements EventStrategy {
  public events: (keyof HTMLElementEventMap)[] = ['click'];
  private valuesArray: CXDiv.ClickSnackbar;

  constructor(public CxDiv: HTMLElement, public values: string) {
    this.valuesArray = this.values.split(',') as CXDiv.ClickSnackbar;

    CxDiv.addEventListener('click', this.click);
  }

  click = () => {
    const [iconSrc, text, duration] = this.valuesArray;

    useCxSnackbar({
      iconSrc,
      text,
      duration: +duration,
    });
  };

  eventDetail(): EventStrategy {
    return this;
  }
}
