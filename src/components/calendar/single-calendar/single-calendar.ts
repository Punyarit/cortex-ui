import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../../base/component-base/component.base';
import {
  CalendarResult,
  CalendarValue,
  isDateBetween,
  convertDateToArrayNumber,
  convertToDate,
  dateFormat,
  DateParameter,
  getDateBetweenArrayNumber,
  isAfter,
  isValid,
  longMonthOption,
  shortDayOption,
  yearDayOption,
  getDateBetweenObject,
  getDateBetweenObjectArray,
} from '../../../helpers/functions/date/date-methods';
import { ThemeVersion } from '../../theme/types/theme.types';

export const tagName = 'cx-single-calendar';
// export const onPressed = 'pressed';

@customElement(tagName)
export class SingleCalendar extends ComponentBase<CXSingleCalendar.Props> {
  config: CXSingleCalendar.Set = {
    calendar: undefined,
    selected: undefined,
    daterange: false,
  };

  // 0 | 304 | 608
  static styles = css`
    .calendar {
      width: 304px;
      background-color: var(--white);
      display: flex;
      flex-flow: column;
      align-items: center;
    }
    .date {
      width: var(--size-40);
      height: var(--size-40);
      color: var(--gray-700);
      font-size: var(--size-14);
      background-color: var(--white);
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: var(--base-size-half);
      transition: background-color 0.2s ease, scale 0.075s ease;
      cursor: pointer;
    }

    .date:hover {
      background-color: var(--primary-100);
      /* scale: 1.22; */
    }

    .date:active {
      scale: 1;
    }
    .selected,
    .startdate,
    .enddate {
      background-color: var(--primary-500) !important;
      color: var(--white) !important;
      border-radius: var(--base-size-half) !important;
    }
    .selected:hover {
      background-color: var(--primary-600);
      color: var(--white);
    }

    .day {
      width: var(--size-40);
      height: var(--size-40);
      font-size: var(--size-14);
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background-color: var(--white);
    }

    .title {
      display: flex;
      justify-content: center;
      column-gap: var(--base-size-12);
      font-size: var(--size-16);
      position: relative;
      bottom: var(--size-6);
      font-family: var(--semiBold);
    }

    .week {
      display: flex;
    }

    .date[data-period='today'] {
      position: relative;
      z-index: 2;
      color: var(--primary-600);
      font-family: var(--bold);
      background-color: var(--primary-50);
    }

    .date[data-period='today']:hover {
      background-color: var(--primary-100);
    }

    .min,
    .max {
      pointer-events: none;
      color: var(--gray-300) !important;
    }

    .month,
    .year {
      display: inline-block;
    }

    .next-month,
    .previous-month {
      color: var(--gray-300) !important;
      pointer-events: none;
      background-color: var(--white) !important;
    }

    .current-month {
      color: var(--gray-700);
    }
  `;

  private day = [0, 1, 2, 3, 4, 5, 6];
  private dateSelectedDOM?: HTMLElement;
  private startDateSelectedDOM?: HTMLElement;
  private endDateSelectedDOM?: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
    if (this.config) this.exec();
  }

  render(): TemplateResult {
    return html` <style></style>

      <div class="calendar">
        <!-- title (month) -->
        <div class="title">
          <div class="month">${dateFormat(this.dateConverted(), longMonthOption)}</div>
          <div class="year">
            ${dateFormat(this.dateConverted(), yearDayOption)?.replace(/\W+/g, '')}
          </div>
        </div>
        <!-- day -->
        <div>
          ${this.day.map(
            (day) =>
              html`<div class="day">${dateFormat(this.dateConverted(day), shortDayOption)}</div>`
          )}
        </div>
        <!-- week -->
        <div @click="${this.set.daterange ? this.selectRangeDate : this.selectSingleDate}">
          ${this.set?.calendar?.calendar.map(
            (week: CalendarValue[]) =>
              html`<div class="week">
                ${week.map((date: CalendarValue) => {
                  const { dateArray: dateValue, period, type, value, minmax } = date;
                  return html`<div
                    data-date="${dateValue.join('-')}"
                    @mouseover="${this.set.daterange
                      ? () => this.setBetweenStartEndDate(date.date!)
                      : null}"
                    class="date ${type} ${minmax}"
                    data-period="${period}">
                    ${value}
                  </div> `;
                })}
              </div>`
          )}
        </div>
      </div>`;
  }

  private setDateBetweenHighLight(
    startdateAttr: string,
    enddateAttr: string,
    dateHoverAttr: string
  ) {
    // 📌if enddate ? enddate : hoverDate mean if select date range done(has startdate and enddate) lasted-date-hover = enddate
    let enddate: Date | undefined;
    if (enddateAttr) {
      const [yearEnd, monthEnd, dateEnd] = enddateAttr?.split('-')!;
      enddate = convertToDate(yearEnd, monthEnd, dateEnd);
    }

    const [yearStart, monthStart, dateStart] = startdateAttr?.split('-')!;
    const [yearHover, monthHover, datdeHover] = dateHoverAttr?.split('-')!;
    const startdate = convertToDate(yearStart, monthStart, dateStart);
    const hoverDate = convertToDate(yearHover, monthHover, datdeHover);

    const dateBetweenData = getDateBetweenObjectArray(startdate, enddate ? enddate : hoverDate!);
    const { year: currentYear, month: curentMonth } = this.set.calendar!;
    const yearMonthKey = `${currentYear}-${curentMonth}`;
    const dateBetweens = dateBetweenData[yearMonthKey] as Array<any>;
    if (dateBetweens) {
      const dateBetweenDataSets = dateBetweens
        .map((date) => `.date[data-date='${currentYear}-${curentMonth}-${date}']`)
        .join(',');

      const shadowRootSheet = this.shadowRoot?.styleSheets[0];

      const dateBetweenELements = this.shadowRoot?.querySelectorAll(
        dateBetweenDataSets
      ) as NodeListOf<HTMLElement>;

      dateBetweenELements.forEach((date) => {
        this.removeDateBetweenClass(shadowRootSheet);
        shadowRootSheet?.insertRule(
          `.date[data-datebetween='${dateHoverAttr}'] {  background-color: var(--primary-100);
        border-radius: 0;}`,
          0
        );

        date.dataset.datebetween = `${dateHoverAttr}`;
      });
    }

    // remove
    const dateBetweenDOMs = this.shadowRoot?.querySelectorAll(
      `.date[data-datebetween]`
    ) as NodeListOf<HTMLElement>;
    dateBetweenDOMs?.forEach((dateEle) => {
      const [yearData, monthData, dateData] = dateEle.dataset.date?.split('-')!;
      const dataDate = convertToDate(yearData, monthData, dateData);
      if (!isDateBetween(startdate, enddate ? enddate : hoverDate, dataDate)) {
        dateEle.removeAttribute('data-datebetween');
      }
    });
  }

  private updateRangeSelected() {
    const dateHoverAttr = this.getCalendarMonitorAttr('latest-date-hover');
    const startdateAttr = this.getCalendarMonitorAttr('startdate-selected');
    const enddateAttr = this.getCalendarMonitorAttr('enddate-selected');

    // hover
    if (dateHoverAttr) {
      this.setDateBetweenHighLight(startdateAttr!, enddateAttr!, dateHoverAttr!);
      // date range cached
    }
    // select
    const oldStartDate = this.getCalendarMonitorAttr('old-startdate');
    const oldEndDate = this.getCalendarMonitorAttr('old-enddate');

    const cachedStartDOM = oldStartDate
      ? this.shadowRoot?.querySelector(`div[data-date='${oldStartDate}']`)
      : undefined;
    const cachedEndDOM = oldEndDate
      ? this.shadowRoot?.querySelector(`div[data-date='${oldEndDate}']`)
      : undefined;

    if (startdateAttr) {
      if (cachedStartDOM) {
        cachedStartDOM.classList.remove('startdate');
      }

      this.startDateSelectedDOM = this.shadowRoot?.querySelector(
        `div[data-date='${startdateAttr}']`
      )!;

      if (this.startDateSelectedDOM && !this.startDateSelectedDOM.classList.contains('startdate')) {
        this.startDateSelectedDOM.classList.add('startdate');
      }
    } else if (cachedStartDOM) {
      cachedStartDOM.classList.remove('startdate');
    }

    if (enddateAttr) {
      if (cachedEndDOM) {
        cachedEndDOM.classList.remove('enddate');
      }

      this.endDateSelectedDOM = this.shadowRoot?.querySelector(`div[data-date='${enddateAttr}']`)!;

      if (this.endDateSelectedDOM && !this.endDateSelectedDOM.classList.contains('enddate')) {
        this.endDateSelectedDOM.classList.add('enddate');
      }
    } else if (cachedEndDOM) {
      cachedEndDOM.classList.remove('enddate');
    }
  }

  private updateSingleSelected() {
    const currentSelected = this.getCalendarMonitorAttr('single-selected');
    if (!currentSelected) {
      return;
    }

    const [year, month, date] = currentSelected.split('-').map(Number);
    const selectedDate = convertToDate(year, month, date);
    const { month: calendarMonth, year: calendarYear } = this.set.calendar!;

    const isSameMonth =
      selectedDate.getMonth() === calendarMonth && selectedDate.getFullYear() === calendarYear;
    if (isSameMonth) {
      this.removeSelection();
      this.dateSelectedDOM = this.shadowRoot?.querySelector(`div[data-date='${currentSelected}']`)!;
      this.dateSelectedDOM?.classList.add('selected');
    } else {
      this.removeSelection();
    }
  }
  private removeSelection() {
    if (this.dateSelectedDOM) {
      this.dateSelectedDOM.classList.remove('selected');
    }
  }

  private selectSingleDate(e: PointerEvent) {
    const [year, month, date] = this.getDateSelected(e)!;

    const selectedDate = convertToDate(year, month, date) as Date;

    if (!isValid(selectedDate)) return;

    this.setSingleSelectAttribute(year, month, date);
    this.fix().selected(selectedDate).exec();
    this.setCustomEvent('select-date', {
      event: 'select-date',
      date: selectedDate,
    });
  }

  private setDateRangeStarted(e: PointerEvent) {
    const [yearSelected, monthSelected, dateSelected] = this.getDateSelected(e)!;
    const [startDateAttr, endDateAttr] = this.getUpdatedStartEndAttributes();
    if (!startDateAttr) {
      this.setStartEndDateAttribute('startdate', yearSelected, monthSelected, dateSelected);
      this.removeStartEndDateAttribute('enddate');
    } else if (!endDateAttr) {
      this.setStartEndDateAttribute('enddate', yearSelected, monthSelected, dateSelected);
    } else {
      this.setStartEndDateAttribute('startdate', yearSelected, monthSelected, dateSelected);
      this.removeStartEndDateAttribute('enddate');
    }
  }

  private setDateRangeFullValue() {
    const [startDateAttr, endDateAttr] = this.getUpdatedStartEndAttributes();
    const [yearStart, monthStart, dateStart] = startDateAttr?.split('-')!;
    const startDate = convertToDate(yearStart, monthStart, dateStart);
    if (endDateAttr) {
      const [yearEnd, monthEnd, dateEnd] = endDateAttr?.split('-')!;
      const endDate = convertToDate(yearEnd, monthEnd, dateEnd);
      if (isAfter({ starter: startDate, comparator: endDate })) {
        this.setStartEndDateAttribute('startdate', yearEnd, monthEnd, dateEnd);
        this.setStartEndDateAttribute('enddate', yearStart, monthStart, dateStart);
      }
    }
  }

  private selectRangeDate(e: PointerEvent) {
    // this.parentElement?.removeAttribute('latest-date-hover');

    this.setOldDateRange();
    this.setDateRangeStarted(e);
    this.setDateRangeFullValue();
    const [startDate, endDate] = this.getUpdatedStartEndAttributes();
    this.setCustomEvent('select-date', {
      event: 'select-date',
      date: {
        startDate: startDate,
        endDate: endDate,
      },
    });
  }

  // 📌mouseover
  private setBetweenStartEndDate(dateHover: Date) {
    if (
      this.getCalendarMonitorAttr('startdate-selected') &&
      !this.getCalendarMonitorAttr('enddate-selected')
    ) {
      const dateArray = convertDateToArrayNumber(dateHover);
      this.parentElement?.setAttribute('latest-date-hover', `${dateArray?.join('-')}`);
    }
  }

  private getUpdatedStartEndAttributes() {
    return [
      this.getCalendarMonitorAttr('startdate-selected'),
      this.getCalendarMonitorAttr('enddate-selected'),
    ];
  }

  private setOldDateRange() {
    const [startdate, enddate] = this.getUpdatedStartEndAttributes();
    this.parentElement?.setAttribute('old-startdate', startdate!);
    this.parentElement?.setAttribute('old-enddate', enddate!);
  }

  private removeStartEndDateAttribute(type: 'startdate' | 'enddate') {
    this.parentElement?.removeAttribute(`${type}-selected`);
  }

  private setSingleSelectAttribute(year: DateParameter, month: DateParameter, date: DateParameter) {
    this.parentElement?.setAttribute('single-selected', `${year}-${month}-${date}`);
  }

  private setStartEndDateAttribute(
    type: 'startdate' | 'enddate',
    year: DateParameter,
    month: DateParameter,
    date: DateParameter
  ) {
    this.parentElement?.setAttribute(`${type}-selected`, `${year}-${month}-${date}`);
  }

  private getDateSelected(e: PointerEvent) {
    const dateDOMSelected = (e.target as HTMLElement).closest('.date') as HTMLElement;
    if (!dateDOMSelected) throw '';
    return (dateDOMSelected.dataset.date as string).split('-');
  }

  private removeDateBetweenClass(shadowRootSheet: CSSStyleSheet | undefined) {
    if (shadowRootSheet?.cssRules.length !== 0) shadowRootSheet?.deleteRule(0);
  }

  private dateConverted(day?: number) {
    if (!this.set.calendar) return;
    return convertToDate(this.set.calendar.year, this.set.calendar.month, day);
  }

  // 📌this methods only call from calendar monitor
  public updateSelected() {
    this.set.daterange ? this.updateRangeSelected() : this.updateSingleSelected();
  }

  private getCalendarMonitorAttr(attributeName: string) {
    return this.parentElement?.getAttribute(attributeName);
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXSingleCalendar {
    type Ref = SingleCalendar;

    type Var<T extends ThemeVersion = 2> = unknown;

    type Set<T extends ThemeVersion = 2> = {
      calendar?: CalendarResult;
      selected?: Date;
      daterange?: boolean;
    };

    type Fix = Required<{ [K in keyof Set]: (value: Set[K]) => Fix }> & { exec: () => void };

    type Props = {
      var: Pick<Var, never>;
      set: Set;
      fix: Fix;
      make: Var;
    };

    type Details = {
      ['select-date']: { event: string; date: Date };
    };

    type Events = {
      ['select-date']: (detail: SelectDate) => void;
    };

    type SelectDate = CustomEvent<Details['select-date']>;
  }

  interface HTMLElementTagNameMap {
    [tagName]: CXSingleCalendar.Ref;
  }

  // namespace JSX {
  //  interface IntrinsicElements {
  //   [tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> | CXSingleCalendar.Ref;
  //  }
  // }
}
