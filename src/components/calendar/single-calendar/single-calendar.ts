import { css, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ComponentBase } from '../../../base/component-base/component.base';
import {
  CalendarDetail,
  convertToDate,
  dateFormat,
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
  };

  static styles = css`
    .calendar {
      width: 350px;
      background-color: var(--white);
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
      background-color: var(--white);
    }

    .title {
      display: flex;
      justify-content: center;
      column-gap: 12px;
    }

    .week {
      display: flex;
    }

    .month,
    .year {
      display: inline-block;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
    if (this.config) this.exec();
  }
  private day = [0, 1, 2, 3, 4, 5, 6];

  private dateConverted(day?: number) {
    if (!this.set.calendar) return;
    return convertToDate(this.set.calendar.year, this.set.calendar.month, day);
  }

  updated() {
    console.log('single-calendar |123|', 123);
  }

  render(): TemplateResult {
    return html` <div class="calendar" @click="${this.clickDateEvent}">
      <!-- title (month) -->
      <div class="title">
        <div class="month">${dateFormat(this.dateConverted(), longMonthOption)}</div>
        <div class="year">
          ${dateFormat(this.dateConverted(), yearDayOption)?.replace(/\W+/g, '')}
        </div>
      </div>
      <!-- day -->
      ${this.day.map(
        (day) => html`<div class="day">${dateFormat(this.dateConverted(day), shortDayOption)}</div>`
      )}
      <!-- week -->
      ${this.set?.calendar?.calendar.map(
        (week: number[]) =>
          html`<div class="week">
            ${week.map((date: number) => html`<div class="date">${date}</div> `)}
          </div>`
      )}
    </div>`;
  }

  private clickDateEvent(e: PointerEvent) {
    if (!this.set.calendar) return;
    const dateElement = (e.target as HTMLElement).closest('.date');
    this.setCustomEvent('click-date', {
      event: 'click-date',
      vlaue: {
        date: convertToDate(
          this.set.calendar.year,
          this.set.calendar.month,
          +dateElement?.textContent!
        ),
      },
    });
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXSingleCalendar {
    type Ref = SingleCalendar;

    type Var<T extends ThemeVersion = 2> = unknown;

    type Set<T extends ThemeVersion = 2> = {
      calendar?: CalendarDetail;
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
    [tagName]: CXSingleCalendar.Ref;
  }

  // namespace JSX {
  //  interface IntrinsicElements {
  //   [tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> | CXSingleCalendar.Ref;
  //  }
  // }
}
