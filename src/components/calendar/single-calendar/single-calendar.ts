import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../../base/component-base/component.base';
import {
  CalendarResult,
  CalendarValue,
  convertToDate,
  dateFormat,
  isValid,
  longMonthOption,
  shortDayOption,
  yearDayOption,
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
      scale: 1.22;
    }

    .date:active {
      scale: 1;
    }
    .selected {
      background-color: var(--primary-500) !important;
      color: var(--white) !important;
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
      color: var(--gray-300);
      pointer-events: none;
    }

    .current-month {
      color: var(--gray-700);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
    if (this.config) this.exec();
  }
  private day = [0, 1, 2, 3, 4, 5, 6];

  private findDateSelectedDOM?: HTMLElement;
  private dateConverted(day?: number) {
    if (!this.set.calendar) return;
    return convertToDate(this.set.calendar.year, this.set.calendar.month, day);
  }

  render(): TemplateResult {
    return html` <div class="calendar">
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
      <div @click="${this.selectDate}">
        ${this.set?.calendar?.calendar.map(
          (week: CalendarValue[]) =>
            html`<div class="week">
              ${week.map((date: CalendarValue) => {
                const { date: dateValue, period, type, value, minmax } = date;
                return html`<div
                  data-date="${dateValue.join('-')}"
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

  // 📌this methods only call from calendar monitor
  public updateSelected() {
    const currentSelected = this.parentElement?.getAttribute('current-selected');
    if (!currentSelected) return;

    const [year, month, date] = currentSelected!.split('-')!;
    const selectedDate = convertToDate(year, month, date);
    const { month: calendarMonth, year: calendarYear } = this.set.calendar!;

    if (selectedDate.getMonth() === calendarMonth && selectedDate.getFullYear() === calendarYear) {
      this.removeSelection();
      this.findDateSelectedDOM = this.shadowRoot?.querySelector(
        `div[data-date='${selectedDate.getFullYear()}-${calendarMonth}-${selectedDate.getDate()}']`
      )!;

      this.findDateSelectedDOM?.classList.add('selected');
    } else {
      this.removeSelection();
    }
  }

  private removeSelection() {
    if (this.findDateSelectedDOM) {
      this.findDateSelectedDOM.classList.remove('selected');
    }
  }

  private selectDate(e: PointerEvent) {
    e.stopPropagation();
    const calendar = this.set.calendar;
    if (!calendar) return;

    const dateDOMSelected = (e.target as HTMLElement).closest('.date') as HTMLElement;
    if (!dateDOMSelected) return;

    const [year, month, date] = [calendar.year, calendar.month, +dateDOMSelected?.textContent!];
    const selectedDate = convertToDate(year, month, date) as Date;
    if (!isValid(selectedDate)) return;

    this.fix().selected(selectedDate).exec();
    this.parentElement?.setAttribute('current-selected', `${year}-${month}-${date}`);
    this.setCustomEvent('select-date', {
      event: 'select-date',
      date: selectedDate,
    });
  }

  private selectSingleDate() {}
  private selectRangeDate() {}
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
