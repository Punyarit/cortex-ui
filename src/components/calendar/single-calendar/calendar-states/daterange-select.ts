import {
  convertDateStringToDate,
  convertDateToArrayNumber,
  convertToDate,
  getDateBetweenObjectArray,
  isAfter,
  isDateBetween,
} from '../../../../helpers/functions/date/date-methods';
import { CalendarBaseMethod } from './calendar-base';
// FIXME: it still has a litle bug. when choose startdate and enddate done. then choose startdate agian. seem calendar still cached highlight
export class CalendarDateRangeSelectState {
  private calendarMethod!: CalendarBaseMethod;
  constructor(private signleCalendar: CXSingleCalendar.Ref) {
    this.calendarMethod = this.signleCalendar.calendarMethod;
  }

  public updateRangeSelected() {
    const dateHoverAttr = this.calendarMethod.getCalendarMonitorAttr('latest-date-hover');
    const startdateAttr = this.calendarMethod.getCalendarMonitorAttr('startdate-selected');
    const enddateAttr = this.calendarMethod.getCalendarMonitorAttr('enddate-selected');
    // 📌 has dateHoverAttr mean have date hover cached
    if (dateHoverAttr) {
      const [startdate, enddate, hoverDate] = this.setDateBetweenHighLight(
        startdateAttr!,
        enddateAttr!,
        dateHoverAttr!
      );
      this.removeDateBetweenHighLight(startdate!, enddate, hoverDate!);
      // date range cached
    }
    // select
    this.setSelectedDateRangeHighLight(startdateAttr, enddateAttr);
  }

  public setDateBetweenHighLight(
    startdateAttr: string,
    enddateAttr: string,
    dateHoverAttr: string
  ) {
    // 📌if enddate ? enddate : hoverDate mean if select date range done(has startdate and enddate) lasted-date-hover = enddate
    const enddate = enddateAttr ? this.calendarMethod.getDateFromString(enddateAttr) : undefined;
    const startdate = this.calendarMethod.getDateFromString(startdateAttr);
    const hoverDate = this.calendarMethod.getDateFromString(dateHoverAttr);

    const dateBetweenData = getDateBetweenObjectArray(startdate, enddate ?? hoverDate);
    const { year: currentYear, month: curentMonth } = this.signleCalendar.set.calendar!;
    const yearMonthKey = `${currentYear}-${curentMonth}`;
    const dateBetweens = dateBetweenData[yearMonthKey] as Array<any>;

    if (dateBetweens) {
      const dateBetweenDataSets = dateBetweens
        .map((date) => `.date[data-date='${currentYear}-${curentMonth}-${date}']`)
        .join(',');

      const shadowRootSheet = this.signleCalendar.shadowRoot?.styleSheets?.[0];

      const dateBetweenELements = this.signleCalendar.shadowRoot?.querySelectorAll(
        dateBetweenDataSets
      ) as NodeListOf<HTMLElement>;

      for (const date of dateBetweenELements) {
        this.calendarMethod.removeDateBetweenClass(shadowRootSheet);
        shadowRootSheet?.insertRule(
          `.date[data-datebetween='${dateHoverAttr}'] {  background-color: var(--primary-100);
        border-radius: var(--size-0);}`,
          0
        );

        date.dataset.datebetween = `${dateHoverAttr}`;
      }
    }

    return [startdate, enddate, hoverDate];
  }

  public removeDateBetweenHighLight(startdate: Date, enddate: Date | undefined, hoverDate: Date) {
    // remove
    const dateBetweenDOMs = this.signleCalendar.shadowRoot?.querySelectorAll(
      `.date[data-datebetween]`
    ) as NodeListOf<HTMLElement>;

    for (const dateEle of dateBetweenDOMs) {
      const [yearData, monthData, dateData] = dateEle.dataset.date?.split('-')!;
      const dataDate = convertToDate(yearData, monthData, dateData);
      if (!isDateBetween(startdate, enddate ?? hoverDate, dataDate)) {
        // dateEle.removeAttribute('data-datebetween');
        dateEle.dataset.datebetween = '';
      }
    }
  }

  public setSelectedDateRangeHighLight(
    startdateAttr: string | null | undefined,
    enddateAttr: string | null | undefined
  ) {
    const oldStartDate = this.calendarMethod.getCalendarMonitorAttr('old-startdate');
    const oldEndDate = this.calendarMethod.getCalendarMonitorAttr('old-enddate');

    const cachedStartDOM = oldStartDate
      ? this.signleCalendar.shadowRoot?.querySelector(`div[data-date='${oldStartDate}']`)
      : undefined;
    const cachedEndDOM = oldEndDate
      ? this.signleCalendar.shadowRoot?.querySelector(`div[data-date='${oldEndDate}']`)
      : undefined;

    if (startdateAttr) {
      if (cachedStartDOM) {
        cachedStartDOM.classList.remove('startdate');
      }

      this.signleCalendar.startDateSelectedDOM = this.signleCalendar.shadowRoot?.querySelector(
        `div[data-date='${startdateAttr}']`
      )!;

      if (
        this.signleCalendar.startDateSelectedDOM &&
        !this.signleCalendar.startDateSelectedDOM.classList.contains('startdate')
      ) {
        this.signleCalendar.startDateSelectedDOM.classList.add('startdate');
      }
    } else if (cachedStartDOM) {
      cachedStartDOM.classList.remove('startdate');
    }

    if (enddateAttr) {
      if (cachedEndDOM) {
        cachedEndDOM.classList.remove('enddate');
      }

      this.signleCalendar.endDateSelectedDOM = this.signleCalendar.shadowRoot?.querySelector(
        `div[data-date='${enddateAttr}']`
      )!;

      if (
        this.signleCalendar.endDateSelectedDOM &&
        !this.signleCalendar.endDateSelectedDOM.classList.contains('enddate')
      ) {
        this.signleCalendar.endDateSelectedDOM.classList.add('enddate');
      }
    } else if (cachedEndDOM) {
      cachedEndDOM.classList.remove('enddate');
    }
  }

  public setDateRangeStarted(e: PointerEvent) {
    const [yearSelected, monthSelected, dateSelected] = this.calendarMethod.getDateSelected(e)!;
    const [startDateAttr, endDateAttr] = this.calendarMethod.getUpdatedStartEndAttributes();
    if (!startDateAttr) {
      this.calendarMethod.setStartEndDateAttribute(
        'startdate',
        yearSelected,
        monthSelected,
        dateSelected
      );
      this.calendarMethod.removeStartEndDateAttribute('enddate');
    } else if (!endDateAttr) {
      this.calendarMethod.setStartEndDateAttribute(
        'enddate',
        yearSelected,
        monthSelected,
        dateSelected
      );
    } else {
      this.calendarMethod.setStartEndDateAttribute(
        'startdate',
        yearSelected,
        monthSelected,
        dateSelected
      );
      this.calendarMethod.removeStartEndDateAttribute('enddate');
    }
  }

  public setDateRangeWhenDone() {
    const [startDateAttr, endDateAttr] = this.calendarMethod.getUpdatedStartEndAttributes();
    const [yearStart, monthStart, dateStart] = startDateAttr?.split('-')!;
    const startDate = convertToDate(yearStart, monthStart, dateStart);
    if (endDateAttr) {
      const [yearEnd, monthEnd, dateEnd] = endDateAttr?.split('-')!;
      const endDate = convertToDate(yearEnd, monthEnd, dateEnd);
      if (isAfter({ starter: startDate, comparator: endDate })) {
        this.calendarMethod.setStartEndDateAttribute('startdate', yearEnd, monthEnd, dateEnd);
        this.calendarMethod.setStartEndDateAttribute('enddate', yearStart, monthStart, dateStart);
      }
    }
  }

  public selectRangeDate(e: PointerEvent) {
    this.calendarMethod.setOldDateRange();
    this.setDateRangeStarted(e);
    this.setDateRangeWhenDone();
    const [startDate, endDate] = this.calendarMethod.getUpdatedStartEndAttributes();
    this.signleCalendar.setCustomEvent('select-date', {
      startDate: convertDateStringToDate(startDate),
      endDate: convertDateStringToDate(endDate),
    });
  }

  // 📌mouseover event
  public setBetweenStartEndDate(dateHover: Date) {
    if (
      this.calendarMethod.getCalendarMonitorAttr('startdate-selected') &&
      !this.calendarMethod.getCalendarMonitorAttr('enddate-selected')
    ) {
      const dateArray = convertDateToArrayNumber(dateHover);
      this.signleCalendar.parentElement?.setAttribute(
        'latest-date-hover',
        `${dateArray?.join('-')}`
      );
    }
  }
}
