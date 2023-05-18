import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Calendar } from '../calendar';
import { generateYearGroup, isDateBetween } from '../../../helpers/functions/date/date-methods';

@customElement('cx-month-calendar')
export class MonthCalendar extends LitElement {
  static styles = css`
    .title {
      display: flex;
      justify-content: center;
      column-gap: var(--base-size-12);
      font-size: var(--size-16);
      position: relative;
      bottom: var(--size-6);
      font-family: var(--semiBold);
      cursor: pointer;
      transition: color 0.25s ease;
    }

    .months {
      display: flex;
      width: 280px;
      flex-wrap: wrap;
      row-gap: 16px;
      margin-top: 16px;
    }

    .title:hover {
      color: var(--primary-700) !important;
    }
    .month {
      width: 69px;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.25s ease;
    }

    .month.disabled {
      cursor: default;
    }

    .month:not(.disabled):hover {
      background-color: var(--primary-50);
    }

    .disabled {
      color: var(--gray-300) !important;
    }
  `;

  @property({ type: Object })
  date!: Date;

  @property({ type: Object })
  calendar!: CXCalendar.Ref;

  render() {
    return this.date
      ? html`
          <div class="title" @click="${() => this.generateYear(this.date, 11)}">
            ${Intl.DateTimeFormat('th-TH', { year: 'numeric' })
              .format(this.date)
              .replace('พ.ศ.', '')}
          </div>

          <div class="months">
            ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
              const { min, max } = this.calendar.set;

              const minMonth = isNaN(min?.getTime()!)
                ? new Date(0, 0)
                : new Date(min?.getFullYear()!, min?.getMonth()!);
              const maxMonth = isNaN(max?.getTime()!)
                ? new Date(9999, 0)
                : new Date(max?.getFullYear()!, max?.getMonth()!);

              console.log('month-calendar.js |maxMonth| = ', maxMonth);
              const date = new Date(this.date.getFullYear(), month);

              const shouldVisible = isDateBetween(minMonth, maxMonth, date);
              return html`<div
                @click="${shouldVisible ? () => this.selectMonth(date) : null}"
                class="month ${!shouldVisible ? 'disabled' : ''}">
                ${Intl.DateTimeFormat('th-TH', { month: 'short' }).format(date)}
              </div>`;
            })}
          </div>
        `
      : undefined;
  }

  generateYear(date: Date, yearCount: number) {
    this.calendar.setDisplayState('year');

    requestAnimationFrame(() => {
      if (!this.calendar.yearDisplayRef.value) return;
      this.calendar.yearDisplayRef.value.years = generateYearGroup(date, yearCount);
      this.calendar.yearDisplayRef.value.calendar = this.calendar;
    });
  }

  selectMonth(date: Date) {
    this.calendar.setDisplayState('date');
    // BUG: when select month/year then select date selector will bug
    this.calendar.dateNavigator = date;
  }

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {}

  public calcYear(date: Date | undefined, state: 'prev' | 'next') {
    if (!date) return;
    const newDate = new Date(date);
    newDate.setFullYear(state === 'prev' ? newDate.getFullYear() - 1 : newDate.getFullYear() + 1);

    this.date = newDate;
  }
}
