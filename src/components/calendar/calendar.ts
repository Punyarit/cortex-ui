import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { ThemeVersion } from '../theme/types/theme.types';
import '../button/button';
import { visibleElement } from '../../helpers/functions/observeElement/observeElement';

export const tagName = 'cx-calendar';
// export const onPressed = 'pressed';

type CalendarResult = {
  year: number;
  month: number;
  dates: TemplateResult<1>[][];
};

@customElement(tagName)
export class Calendar extends ComponentBase<CXCalendar.Props> {
  config: CXCalendar.Set = {
    date: new Date(),
  };

  // 📌 index 0 = previous month
  // 📌 index 1 = current month
  // 📌 index 2 = next month
  private currentTranslateValue: 0 | -350 | 700 = -350;

  static styles = css`
    .calendar-group {
      max-width: 350px;
      overflow: hidden;
      background-color: var(--white);
      padding: var(--base-size-12);
      border-radius: var(--base-size-16);
    }

    .calendar-monitor {
      display: flex;
      /* 0 is previous month */
      /* -350 is current month */
      /* -700 is next month */
      translate: var(--translate);
      transition: translate 0.25s ease;
    }
    .calendar {
      min-width: 350px;
    }
    .date {
      width: var(--size-50);
      height: var(--size-50);
      font-size: var(--size-16);
      background-color: var(--white);
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }

    .day {
      width: var(--size-50);
      height: var(--size-50);
      font-size: var(--size-18);
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `;

  private day = ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อ'];

  connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
    if (this.config) this.exec();
  }

  willUpdate(changedProps: any) {
    this.generateCalendar();
    super.willUpdate(changedProps);
  }

  private currentCalendar!: CalendarResult;
  private previousCalendar!: CalendarResult;
  private nextCalendar!: CalendarResult;

  private generateCalendar() {
    const previousMonth = this.getPreviousMonth(this.set.date);
    const nextMonth = this.getNextMonth(this.set.date);
    this.previousCalendar = this.getCalendarArray(previousMonth);
    this.currentCalendar = this.getCalendarArray(this.set.date);
    this.nextCalendar = this.getCalendarArray(nextMonth);
  }

  private fullMonth: Intl.DateTimeFormatOptions = {
    month: 'long',
  };

  private buttonLeftSet: CXButton.Set = {
    iconOnly: true,
    iconSrc: 'arrow-left-line',
    type: 'secondary',
  };

  private buttonVar: CXButton.Var = {
    borderRadius: 'base-size-half',
  };

  private buttonRightSet: CXButton.Set = {
    iconOnly: true,
    iconSrc: 'arrow-right-line',
    type: 'secondary',
  };

  private format(date: Date | number, options?: Intl.DateTimeFormatOptions) {
    const f = new Intl.DateTimeFormat('th-TH', options);
    return f.format(date);
  }

  render(): TemplateResult {
    const calendarGroup = [this.previousCalendar, this.currentCalendar, this.nextCalendar];

    return html` <style>
        :host {
          /* 📌default = current month */
          --translate: ${this.currentTranslateValue}px;
        }
      </style>

      <div class="calendar-group">
        <div class="calendar-monitor">
          ${calendarGroup.map((calendar) => {
            return html`<div
              class="calendar"
              @click="${(e: PointerEvent) => this.clickDateEvent(e, calendar)}">
              <div class="title">
                <cx-button
                  @click="${this.goPreviousMonth}"
                  .var="${this.buttonVar}"
                  .set="${this.buttonLeftSet}"></cx-button>
                <div class="month">
                  ปุญญะ
                  ${this.format(
                    this.convertToDate(calendar?.year, calendar?.month),
                    this.fullMonth
                  )}
                </div>
                <cx-button
                  @click="${this.goNextMonth}"
                  .var="${this.buttonVar}"
                  .set="${this.buttonRightSet}"></cx-button>
              </div>
              <div>
                <div>${this.day.map((day) => html`<div class="day">${day}</div>`)}</div>
              </div>
              <div>
                ${calendar?.dates?.map((week) => html`<div>${week.map((date) => date)}</div>`)}
              </div>
            </div>`;
          })}
        </div>
      </div>`;
  }

  private observeMonthDisplay() {
    // visibleElement();
  }

  private goPreviousMonth() {
    this.currentTranslateValue += 350;
    this.style.setProperty('--translate', `${this.currentTranslateValue}px`);
  }

  private goNextMonth() {
    this.currentTranslateValue -= 350;
    this.style.setProperty('--translate', `${this.currentTranslateValue}px`);
  }

  private getPreviousMonth(date: Date) {
    const d = new Date(date);
    d.setMonth(d.getMonth() - 1);
    return d;
  }

  private getNextMonth(date: Date) {
    const d = new Date(date);
    d.setMonth(d.getMonth() + 1);
    return d;
  }

  // 📌 0 = jan
  private getCalendarArray(dateParam: Date) {
    const date = new Date(dateParam.getFullYear(), dateParam.getMonth(), 1);
    const dates = [];

    const firstDayOfMonth = date.getDay();
    let currentDate = new Date(date.getFullYear(), date.getMonth(), -firstDayOfMonth + 1);

    while (currentDate.getMonth() <= date.getMonth()) {
      const week = [];

      for (let i = 0; i < 7; i++) {
        week.push(html`<div class="date">${currentDate.getDate()}</div>`);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      dates.push(week);
    }

    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      dates,
    };
  }

  private convertToDate(year: number, month: number, date = 1): Date {
    return new Date(year, month, date);
  }

  private clickDateEvent(e: PointerEvent, result: CalendarResult) {
    const dateElement = (e.target as HTMLElement).closest('.date');
    this.setCustomEvent('click-date', {
      event: 'click-date',
      vlaue: {
        date: this.convertToDate(result.year, result.month, +dateElement?.textContent!),
      },
    });
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXCalendar {
    type Ref = Calendar;

    type Var<T extends ThemeVersion = 2> = unknown;

    type Set<T extends ThemeVersion = 2> = {
      date: Date;
    };

    type Fix = Required<{ [K in keyof Set]: (value: Set[K]) => Fix }> & { exec: () => void };

    type Props = {
      var: Pick<Var, never>;
      set: Set;
      fix: Fix;
      make: Var;
    };

    // type Details = {
    //   [onPressed]: { event: string };
    // };

    // type Events = {
    //   [onPressed]: (detail: Pressed) => void;
    // };

    // type Pressed = CustomEvent<Details[typeof onPressed]>;
  }

  interface HTMLElementTagNameMap {
    [tagName]: CXCalendar.Ref;
  }

  // namespace JSX {
  //  interface IntrinsicElements {
  //   [tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> | CXCalendar.Ref;
  //  }
  // }
}
