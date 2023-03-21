import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../../base/component-base/component.base';
import {
  CalendarResult,
  CalendarValue,
  dateFormat,
  longMonthOption,
  shortDayOption,
  yearDayOption,
} from '../../../helpers/functions/date/date-methods';
import { DateRangeType, SingleDate } from '../types/calendar.types';
import { CalendarBaseMethod } from './calendar-states/calendar-base';
import { CalendarDateRangeSelectState } from './calendar-states/daterange-select';
import { CalendarSingleSelectState } from './calendar-states/single-select';

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
      position: relative;
      animation: selected 0.25s ease;
    }

    @keyframes selected {
      0% {
        scale: 1;
      }
      50% {
        scale: 1.2;
      }
      100% {
        scale: 1;
      }
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
      color: var(--primary-700);
      font-family: var(--extraBold);
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

    .date[data-datebetween] {
      border-radius: var(--size-0);
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

    .startdate:not(.previous-month, .next-month)::before,
    .enddate:not(.previous-month, .next-month)::before {
      content: '';
      background-color: var(--primary-100);
      width: 20px;
      height: 40px;
      position: absolute;
      z-index: 0;
    }
    .startdate::before {
      right: 0;
    }
    .enddate::before {
      left: 0;
    }

    .enddate:not(.previous-month, .next-month)::after,
    .startdate:not(.previous-month, .next-month)::after {
      content: attr(data-value);
      background-color: var(--primary-500);
      position: absolute;
      width: 40px;
      height: 40px;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: var(--base-size-half);
    }
  `;

  public day = [0, 1, 2, 3, 4, 5, 6];
  public dateSelectedDOM?: HTMLElement;
  public startDateSelectedDOM?: HTMLElement;
  public endDateSelectedDOM?: HTMLElement;

  public dateRangeSelectState!: CalendarDateRangeSelectState;
  public singleSelectState!: CalendarSingleSelectState;
  public calendarMethod!: CalendarBaseMethod;

  connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
    if (this.config) this.exec();

    this.calendarMethod = new CalendarBaseMethod(this);
    this.dateRangeSelectState = new CalendarDateRangeSelectState(this);
    this.singleSelectState = new CalendarSingleSelectState(this);
  }

  render(): TemplateResult {
    return html` <style></style>

      <div class="calendar">
        <!-- title (month) -->
        <div class="title">
          <div class="month">
            ${dateFormat(this.calendarMethod.dateConverted(), longMonthOption)}
          </div>
          <div class="year">
            ${dateFormat(this.calendarMethod.dateConverted(), yearDayOption)?.replace(/\W+/g, '')}
          </div>
        </div>
        <!-- day -->
        <div>
          ${this.day.map(
            (day) =>
              html`<div class="day">
                ${dateFormat(this.calendarMethod.dateConverted(day), shortDayOption)}
              </div>`
          )}
        </div>
        <!-- week -->
        <div
          @click="${this.set.daterange
            ? (e: PointerEvent) => this.dateRangeSelectState.selectRangeDate(e)
            : (e: PointerEvent) => this.singleSelectState.selectSingleDate(e)}">
          ${this.set?.calendar?.calendar.map(
            (week: CalendarValue[]) =>
              html`<div class="week">
                ${week.map((date: CalendarValue) => {
                  const { dateArray: dateValue, period, type, value, minmax } = date;
                  return html`<div
                    data-date="${dateValue.join('-')}"
                    data-value="${value}"
                    @mouseover="${this.set.daterange
                      ? () => this.dateRangeSelectState.setBetweenStartEndDate(date.date!)
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

  willUpdate(changedProps: Map<string, unknown>) {
    // ⚠ FIXME: willUpdate will execute everytimes when change month
    this.updateSelected();
    super.willUpdate(changedProps);
  }

  // 📌this methods only call from calendar monitor **observer trigger
  public updateSelected() {
    this.set.daterange
      ? this.dateRangeSelectState.updateRangeSelected()
      : this.singleSelectState.updateSingleSelected();
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXSingleCalendar {
    type Ref = SingleCalendar;

    type Var = unknown;

    type Set = {
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
      ['select-date']: SingleDate | DateRangeType;
    };

    type Events = {
      ['select-date']: (detail: SelectDate.Single | SelectDate.DateRange) => void;
    };

    namespace SelectDate {
      type Single = CustomEvent<SingleDate>;
      type DateRange = CustomEvent<DateRangeType>;
    }
  }

  interface HTMLElementTagNameMap {
    [tagName]: CXSingleCalendar.Ref;
  }
}
