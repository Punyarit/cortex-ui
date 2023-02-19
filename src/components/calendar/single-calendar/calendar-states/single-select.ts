import { convertToDate, isValid } from '../../../../helpers/functions/date/date-methods';
import { CalendarBaseMethod } from './calendar-base';

export class CalendarSingleSelectState {
  private calendarMethod!: CalendarBaseMethod;
  constructor(private signleCalendar: CXSingleCalendar.Ref) {
    this.calendarMethod = this.signleCalendar.calendarMethod;
  }

  public updateSingleSelected() {
    const currentSelected = this.calendarMethod.getCalendarMonitorAttr('single-selected');
    if (!currentSelected) {
      return;
    }

    const [year, month, date] = currentSelected.split('-').map(Number);
    const selectedDate = convertToDate(year, month, date);
    const { month: calendarMonth, year: calendarYear } = this.signleCalendar.set.calendar!;

    const isSameMonth =
      selectedDate.getMonth() === calendarMonth && selectedDate.getFullYear() === calendarYear;
    if (isSameMonth) {
      this.calendarMethod.removeSelection();
      this.signleCalendar.dateSelectedDOM = this.signleCalendar.shadowRoot?.querySelector(
        `div[data-date='${currentSelected}']`
      )!;
      this.signleCalendar.dateSelectedDOM?.classList.add('selected');
    } else {
      this.calendarMethod.removeSelection();
    }
  }

  public selectSingleDate(e: PointerEvent) {
    const [year, month, date] = this.calendarMethod.getDateSelected(e)!;

    const selectedDate = convertToDate(year, month, date) as Date;

    if (!isValid(selectedDate)) return;

    this.calendarMethod.setSingleSelectAttribute(year, month, date);
    this.signleCalendar.fix().selected(selectedDate).exec();
    this.signleCalendar.setCustomEvent('select-date', {
      event: 'select-date',
      date: selectedDate,
    });
  }
}
