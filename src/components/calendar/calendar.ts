import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import '../button/button';
import { createRef, ref } from 'lit/directives/ref.js';
import './single-calendar/single-calendar';
import {
  CalendarResult,
  convertDateToArrayNumber,
  getCalendarDetail,
  getNextMonth,
  getPreviousMonth,
} from '../../helpers/functions/date/date-methods';
import { mutableElement } from '../../helpers/functions/observe-element/mutable-element';
import { DateRangeSelected } from './types/calendar.types';
import { CxCalendarName } from './types/calendar.name';

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
    daterange: false,
  };

  // 📌 0 = previous month
  // 📌 -304 = current month
  // 📌 -608 = next month
  private currentTranslateValue: 0 | -304 | -608 = -304;

  private calendarGroup!: CalendarResult[];

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
      translate: var(--translate);
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

  public calendarMonitorRef = createRef<HTMLDivElement>();

  render(): TemplateResult {
    return html` <style>
        :host {
          /* 📌default = current month */
          --translate: ${this.currentTranslateValue}px;
          --display-calendar: ${this.setDisplayCalendar()}px;
        }
      </style>

      <div class="calendar-group">
        <cx-button
          class="handle-month-previous"
          @click="${this.goPreviousMonth}"
          .var="${this.buttonVar}"
          .set="${this.buttonLeftSet}"></cx-button>
        <cx-button
          class="handle-month-next"
          @click="${this.goNextMonth}"
          .var="${this.buttonVar}"
          .set="${this.buttonRightSet}"></cx-button>
        <div class="calendar-monitor" ${ref(this.calendarMonitorRef)}>
          ${this.calendarGroup.map(
            (calendar) =>
              html` <cx-single-calendar
                @select-date="${this.selectDate}"
                .set="${{ calendar, daterange: this.set.daterange }}">
              </cx-single-calendar>`
          )}
        </div>
      </div>`;
  }

  firstUpdated() {
    this.observeCalendarMonitor();
    this.updateSelectedDates();
  }

  private updateSelectedDates(): void {
    const { initValue, value, daterange } = this.set;

    if (initValue && value) {
      const calendarMonitor = this.calendarMonitorRef.value;

      const updateAttribute = (attributeName: string, date: Date) => {
        const dateArray = convertDateToArrayNumber(date);
        if (calendarMonitor && dateArray) {
          calendarMonitor.setAttribute(attributeName, dateArray.join('-'));
        }
      };

      if (daterange) {
        const dateRangeValue = value as DateRangeSelected;
        updateAttribute('startdate-selected', dateRangeValue.startdate!);
        updateAttribute('enddate-selected', dateRangeValue.enddate!);
        updateAttribute('latest-date-hover', dateRangeValue.enddate!);
      } else {
        updateAttribute('single-selected', value as Date);
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

  private selectDate = (e: Event) => {
    const event = e as CXSingleCalendar.SelectDate;
    if (!this.set.multiSelect) {
      this.setCustomEvent('select-date', {
        date: event.detail.date,
      });
    }
    // this.dateDOMSelected = event.detail.dateDOM;
  };

  connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
    if (this.config) this.exec();
  }

  willUpdate(changedProps: any) {
    this.generateCalendar();
    super.willUpdate(changedProps);
  }

  private generateCalendar() {
    const currentMonth = this.set.date;
    const previousMonth = getPreviousMonth(currentMonth);
    const nextMonth = getNextMonth(currentMonth);

    switch (this.set.display) {
      case '1-calendar':
        this.calendarGroup = [
          getCalendarDetail({ date: previousMonth, min: this.set.min, max: this.set.max }),
          getCalendarDetail({ date: currentMonth, min: this.set.min, max: this.set.max }),
          getCalendarDetail({ date: nextMonth, min: this.set.min, max: this.set.max }),
        ];
        break;
      case '2-calendars':
        this.calendarGroup = [
          getCalendarDetail({ date: previousMonth, min: this.set.min, max: this.set.max }),
          getCalendarDetail({ date: currentMonth, min: this.set.min, max: this.set.max }),
          getCalendarDetail({ date: nextMonth, min: this.set.min, max: this.set.max }),
          getCalendarDetail({
            date: getNextMonth(nextMonth),
            min: this.set.min,
            max: this.set.max,
          }),
        ];
        break;
    }
  }

  private translateMonth(direction: 'previous' | 'next') {
    this.calendarMonitorRef.value!.style.transition = '0.25s ease-out';
    this.currentTranslateValue += direction === 'previous' ? 304 : -304;
    this.style.setProperty('--translate', `${this.currentTranslateValue}px`);
  }

  private createSingleCalendar(type: 'previous' | 'next', focusedCalendar: CXSingleCalendar.Ref) {
    const previousMonthFromMonthVisibled =
      type === 'previous'
        ? getPreviousMonth(focusedCalendar.set.calendar?.firstDateOfMonth!)
        : getNextMonth(focusedCalendar.set.calendar?.firstDateOfMonth!);

    const generatedMonth = getCalendarDetail({
      date: previousMonthFromMonthVisibled,
      min: this.set.min,
      max: this.set.max,
    });

    const singleCalendar = document.createElement('cx-single-calendar') as CXSingleCalendar.Ref;
    singleCalendar.fix().calendar(generatedMonth).daterange(this.set.daterange).exec();
    singleCalendar.addEventListener('select-date', this.selectDate);

    return singleCalendar;
  }
  private removeUnusedCalendar(focussedCalendar: CXSingleCalendar.Ref) {
    if (focussedCalendar) {
      this.calendarMonitorRef.value?.removeChild(focussedCalendar);
    }
  }

  private appendNewCalendar(type: 'previous' | 'next', singleCalendar: CXSingleCalendar.Ref) {
    const calendarMonitor = this.calendarMonitorRef.value;
    if (!calendarMonitor) return;

    if (type === 'previous') {
      calendarMonitor.insertBefore(singleCalendar, calendarMonitor.firstElementChild);
    } else {
      calendarMonitor.appendChild(singleCalendar);
    }
  }
  private setTransitionCalendar(type: 'previous' | 'next') {
    const calendarMonitor = this.calendarMonitorRef.value;
    if (!calendarMonitor) return;

    calendarMonitor.style.transition = 'none';
    if (type === 'previous') {
      this.currentTranslateValue -= 304;
    } else if (type === 'next') {
      this.currentTranslateValue += 304;
    }
    this.style.setProperty('--translate', `${this.currentTranslateValue}px`);
  }

  private goPreviousMonth() {
    this.translateMonth('previous');

    const timer = setTimeout(() => {
      const singleCalendar = this.createSingleCalendar(
        'previous',
        this.calendarMonitorRef.value?.firstElementChild as CXSingleCalendar.Ref
      );
      this.removeUnusedCalendar(
        this.calendarMonitorRef.value?.lastElementChild as CXSingleCalendar.Ref
      );
      this.appendNewCalendar('previous', singleCalendar);

      this.setTransitionCalendar('previous');

      clearTimeout(timer);
    }, 250);
  }

  private goNextMonth() {
    this.translateMonth('next');
    const timer = setTimeout(() => {
      const singleCalendar = this.createSingleCalendar(
        'next',
        this.calendarMonitorRef.value!.lastElementChild as CXSingleCalendar.Ref
      );

      this.removeUnusedCalendar(
        this.calendarMonitorRef.value?.firstElementChild as CXSingleCalendar.Ref
      );
      this.appendNewCalendar('next', singleCalendar);
      this.setTransitionCalendar('next');
      clearTimeout(timer);
    }, 250);
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
      daterange?: boolean;
      value?: Date | DateRangeSelected;
    };

    type Fix = Required<{ [K in keyof Set]: (value: Set[K]) => Fix }> & { exec: () => void };

    type Props = {
      var: Pick<Var, never>;
      set: Set;
      fix: Fix;
      make: Var;
    };

    type Details = {
      ['select-date']: { date: Date | DateRangeSelected };
    };

    type Events = {
      ['select-date']: (detail: SelectDate) => void;
    };

    type SelectDate = CustomEvent<Details['select-date']>;

    // type Pressed = CustomEvent<Details[typeof onPressed]>;
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
