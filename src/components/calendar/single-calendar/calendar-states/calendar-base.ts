import { convertToDate, DateParameter } from '../../../../helpers/functions/date/date-methods';

export class CalendarBaseMethod {
  // utilities
  constructor(private signleCalendar: CXSingleCalendar.Ref) {}

  public getDateFromString(dateStr: string) {
    const [year, month, date] = dateStr.split('-').map(Number);
    return convertToDate(year, month, date);
  }

  public getUpdatedStartEndAttributes() {
    return [
      this.getCalendarMonitorAttr('startdate-selected'),
      this.getCalendarMonitorAttr('enddate-selected'),
    ];
  }

  public setOldDateRange() {
    const [startdate, enddate] = this.getUpdatedStartEndAttributes();
    this.signleCalendar.parentElement?.setAttribute('old-startdate', startdate!);
    this.signleCalendar.parentElement?.setAttribute('old-enddate', enddate!);
  }

  public removeStartEndDateAttribute(type: 'startdate' | 'enddate') {
    this.signleCalendar.parentElement?.removeAttribute(`${type}-selected`);
  }

  public setSingleSelectAttribute(year: DateParameter, month: DateParameter, date: DateParameter) {
    this.signleCalendar.parentElement?.setAttribute('single-selected', `${year}-${month}-${date}`);
  }

  public setStartEndDateAttribute(
    type: 'startdate' | 'enddate',
    year: DateParameter,
    month: DateParameter,
    date: DateParameter
  ) {
    this.signleCalendar.parentElement?.setAttribute(`${type}-selected`, `${year}-${month}-${date}`);
  }

  public getDateSelected(e: PointerEvent) {
    const dateDOMSelected = (e.target as HTMLElement).closest('.date') as HTMLElement;
    if (!dateDOMSelected) throw 'Wrong date selection';
    return (dateDOMSelected.dataset.date as string).split('-');
  }

  public removeDateBetweenClass(shadowRootSheet: CSSStyleSheet | undefined) {
    if (shadowRootSheet?.cssRules.length !== 0) shadowRootSheet?.deleteRule(0);
  }

  public dateConverted(day?: number) {
    if (!this.signleCalendar.set.calendar) return;
    return convertToDate(
      this.signleCalendar.set.calendar.year,
      this.signleCalendar.set.calendar.month,
      day
    );
  }

  public getCalendarMonitorAttr(attributeName: string) {
    return this.signleCalendar.parentElement?.getAttribute(attributeName);
  }

  public removeSelection() {
    if (this.signleCalendar.dateSelectedDOM) {
      this.signleCalendar.dateSelectedDOM.classList.remove('selected');
    }
  }
}
