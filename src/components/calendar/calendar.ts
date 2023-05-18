import { css, html, PropertyValueMap, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import '../button/button';
import { createRef, ref } from 'lit/directives/ref.js';
import './single-calendar/single-calendar';
import {
  CalendarResult,
  convertDateToArrayNumber,
} from '../../helpers/functions/date/date-methods';
import { mutableElement } from '../../helpers/functions/observe-element/mutable-element';
import { RangeValueType, DateValueType, CalendarDisplay } from './types/calendar.types';
import { CxCalendarName } from './types/calendar.name';
import './month-calendar/month-calendar';
import './year-calendar/year-calendar';
import { MonthCalendar } from './month-calendar/month-calendar';
import { DateState, DisplayState } from './states/DisplayState';
import { YearCalendar } from './year-calendar/year-calendar';

// export const onPressed = 'pressed';

@customElement(CxCalendarName)
export class Calendar extends ComponentBase<CXCalendar.Props> {
  config: CXCalendar.Set = {
    date: new Date(),
    display: '1-calendar',
    min: undefined,
    max: undefined,
    initValue: true,
    multiSelect: false,
    dateRange: false,
    dateValue: undefined,
    rangeValue: undefined,
  };

  private calendarDisplayMethods?: DisplayState;

  // 📌 0 = previous month
  // 📌 -304 = current month
  // 📌 -608 = next month
  public currentTranslateValue: 0 | -304 | -608 = -304;

  public calendarGroup!: CalendarResult[];

  static styles = css`
    :host {
      display: inline-block;
    }
    .calendar-group {
      max-width: var(--display-calendar);
      overflow: hidden;
      background-color: var(--white);
      padding: 28px 12px 20px;
      border-radius: var(--base-size-16);
      position: relative;
    }

    .calendar-monitor {
      /* 0 is previous month */
      /* -304 is current month */
      /* -608 is next month */
      display: flex;
      transition: translate 0.25s ease-out;
      transition-timing-function: cubic-bezier(0.1, 0.2, 0.2, 1);
      /* 📌improve ux speed */
    }

    .handle-month-previous,
    .handle-month-next {
      position: absolute;
      top: var(--size-14);
      z-index: 1;
    }
    .handle-month-previous {
      left: var(--size-14);
    }
    .handle-month-next {
      right: var(--size-14);
    }
  `;

  private buttonLeftSet: CXButton.Set = {
    iconOnly: true,
    iconSrc: 'arrow-left-line',
    type: 'secondary',
    size: 'small',
  };

  private buttonVar: CXButton.Var = {
    borderRadius: 'base-size-half',
  };

  private buttonRightSet: CXButton.Set = {
    iconOnly: true,
    iconSrc: 'arrow-right-line',
    type: 'secondary',
    size: 'small',
  };

  @property({ type: Date })
  dateNavigator?: Date;

  public calendarMonitorRef = createRef<HTMLDivElement>();

  @property({ type: String })
  displayState: CalendarDisplay = 'date';

  public monthDisplayRef = createRef<MonthCalendar>();
  public yearDisplayRef = createRef<YearCalendar>();

  render(): TemplateResult {
    return html`
      <style>
        :host {
          /* 📌default = current month */
          --translate: ${this.currentTranslateValue}px;
          --display-calendar: ${this.setDisplayCalendar()}px;
        }

        .calendar-monitor {
          translate: ${this.displayState === 'date' ? 'var(--translate)' : '0'};
        }
      </style>

      <!-- 📌 Calendar Display -->
      <div class="calendar-group">
        <cx-button
          class="handle-month-previous"
          @click="${this.goPrev}"
          .var="${this.buttonVar}"
          .set="${this.buttonLeftSet}"></cx-button>
        <cx-button
          class="handle-month-next"
          @click="${this.goNext}"
          .var="${this.buttonVar}"
          .set="${this.buttonRightSet}"></cx-button>
        <div class="calendar-monitor" ${ref(this.calendarMonitorRef)}>${this.renderCalendar()}</div>
      </div>
    `;
  }

  renderCalendar() {
    switch (this.displayState) {
      case 'date':
        return html`
          ${this.calendarGroup.map(
            (calendar) =>
              html` <cx-single-calendar
                @select-date="${this.selectDate}"
                @calendar-display="${(e: CustomEvent) => {
                  this.goToMonthCalendar(e.detail.date);
                }}"
                .set="${{ calendar, daterange: this.set.dateRange }}">
              </cx-single-calendar>`
          )}
        `;

      case 'month':
        return html`<cx-month-calendar ${ref(this.monthDisplayRef)}></cx-month-calendar>`;

      case 'year':
        return html`<cx-year-calendar ${ref(this.yearDisplayRef)}></cx-year-calendar>`;
      default:
        break;
    }
  }

  public goToMonthCalendar(date: Date) {
    this.setDisplayState('month');
    requestAnimationFrame(() => {
      if (!this.monthDisplayRef.value) return;
      this.monthDisplayRef.value.date = date;
      this.monthDisplayRef.value.calendar = this;
    });
  }

  setDisplayState(display: CalendarDisplay) {
    this.displayState = display;
  }

  firstUpdated() {
    this.observeCalendarMonitor();
    this.updateSelectedDates();
  }

  private updateSelectedDates(): void {
    const { initValue, dateValue, rangeValue, dateRange: daterange } = this.set;
    if (initValue && (dateValue || rangeValue)) {
      const calendarMonitor = this.calendarMonitorRef.value;

      const updateAttribute = (attributeName: string, date: Date) => {
        const dateArray = convertDateToArrayNumber(date);
        if (calendarMonitor && dateArray) {
          calendarMonitor.setAttribute(attributeName, dateArray.join('-'));
        }
      };

      if (daterange) {
        updateAttribute('startdate-selected', rangeValue?.startDate!);
        updateAttribute('enddate-selected', rangeValue?.endDate!);
        updateAttribute('latest-date-hover', rangeValue?.endDate!);
      } else {
        updateAttribute('single-selected', dateValue!.date);
      }
    }
  }
  private observeCalendarMonitor() {
    mutableElement(this.calendarMonitorRef.value!, 'attributes', (m) => {
      const singleCalendars = (m.target as HTMLElement)
        .children as HTMLCollectionOf<CXSingleCalendar.Ref>;
      for (const singleCalendar of singleCalendars) {
        singleCalendar.updateSelected();
      }
    });
  }

  private setDisplayCalendar(): 304 | 608 {
    switch (this.set.display) {
      default:
      case '1-calendar':
        return 304;

      case '2-calendars':
        return 608;
    }
  }

  public selectDate = (e: Event) => {
    if (this.set.dateRange) {
      const { endDate, startDate } = (e as CXDatePicker.SelectDate.Range).detail;
      this.setCustomEvent('select-date', {
        endDate,
        startDate,
      });
    } else {
      const { date } = (e as CXDatePicker.SelectDate.Date).detail;

      this.setCustomEvent('select-date', {
        date,
      });
    }
  };

  connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
    if (this.config) this.exec();
    this.calendarDisplayMethods = new DisplayState(this);
  }

  willUpdate(changedProps: any) {
    if (this.set.rangeValue?.startDate) {
      this.dateNavigator = this.set.rangeValue?.startDate;
    }
    this.calendarDisplayMethods?.generate();

    super.willUpdate(changedProps);
  }

  private goPrev() {
    this.calendarDisplayMethods?.goPrev();
  }

  private goNext() {
    this.calendarDisplayMethods?.goNext();
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXCalendar {
    type Ref = Calendar;

    type Var = unknown;

    type Set = {
      // 📌date: Date is date from server (the current date). this prop "date" use for init current date of calendar component.
      date: Date;
      display?: '1-calendar' | '2-calendars';
      min?: Date;
      max?: Date;
      multiSelect?: boolean;
      initValue?: boolean;
      dateRange?: boolean;
      dateValue?: DateValueType;
      rangeValue?: RangeValueType;
    };

    type Fix = Required<{ [K in keyof Set]: (value: Set[K]) => Fix }> & { exec: () => void };

    type Props = {
      var: Pick<Var, never>;
      set: Set;
      fix: Fix;
      make: Var;
    };

    namespace Value {
      type Date = DateValueType;
      type Range = DateValueType;
    }
    namespace SelectDate {
      type Date = CustomEvent<DateValueType>;
      type Range = CustomEvent<RangeValueType>;
    }
  }

  interface HTMLElementTagNameMap {
    [CxCalendarName]: CXCalendar.Ref;
  }

  // namespace JSX {
  //  interface IntrinsicElements {
  //   [tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> | CXCalendar.Ref;
  //  }
  // }
}
