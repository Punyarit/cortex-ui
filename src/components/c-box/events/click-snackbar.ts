// import {useCxSnackbar} from '../../../helpers/useCxSnackbar';
import {EventStrategy} from '../types/event-straegy';

export class ClickSnackbar implements EventStrategy {
  public events: (keyof HTMLElementEventMap)[] = ['click'];
  private valuesArray: CXBox.ClickSnackbar;

  constructor(public CxBox: HTMLElement, public values: string) {
    this.valuesArray = this.values.split(',') as CXBox.ClickSnackbar;

    CxBox.addEventListener('click', this.click);
  }

  click = () => {
    const [iconSrc, text, duration] = this.valuesArray;

    // FIXME: snackbar
    // useCxSnackbar({
    //   iconSrc,
    //   text,
    //   duration: +duration,
    // });
  };

  eventDetail(): EventStrategy {
    return this;
  }
}
