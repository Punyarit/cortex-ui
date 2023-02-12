import { css, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { ThemeVersion } from '../theme/types/theme.types';
import '../button/button';
import { createRef, ref } from 'lit/directives/ref.js';
import './single-calendar/single-calendar';
import {
  CalendarDetail,
  getCalendarDetail,
  getNextMonth,
  getPreviousMonth,
} from '../../helpers/functions/date/date-methods';

export const tagName = 'cx-calendar';
// export const onPressed = 'pressed';

@customElement(tagName)
export class Calendar extends ComponentBase<CXCalendar.Props> {
  config: CXCalendar.Set = {
    date: new Date(),
    display: '1-calendar',
  };

  // 📌 0 = previous month
  // 📌 -304 = current month
  // 📌 -608 = next month
  private currentTranslateValue: 0 | -304 | -608 = -304;

  private calendarGroup!: CalendarDetail[];

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

    .handler-month {
      position: absolute;
      top: 8px;
      left: 0px;
      width: 100%;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      padding: 6px 12px 0;
      box-sizing: border-box;
    }
  `;

  private currentCalendar!: CalendarDetail;
  private previousCalendar!: CalendarDetail;
  private nextCalendar!: CalendarDetail;

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

  private calendarMonitorRef = createRef<HTMLDivElement>();

  render(): TemplateResult {
    return html` <style>
        :host {
          /* 📌default = current month */
          --translate: ${this.currentTranslateValue}px;
          --display-calendar: ${this.setDisplayCalendar()}px;
        }
      </style>

      <div class="calendar-group">
        <div class="handler-month">
          <cx-button
            @click="${this.goPreviousMonth}"
            .var="${this.buttonVar}"
            .set="${this.buttonLeftSet}"></cx-button>
          <cx-button
            @click="${this.goNextMonth}"
            .var="${this.buttonVar}"
            .set="${this.buttonRightSet}"></cx-button>
        </div>
        <div class="calendar-monitor" ${ref(this.calendarMonitorRef)}>
          ${this.calendarGroup.map(
            (calendar) => html` <cx-single-calendar .set="${{ calendar }}"> </cx-single-calendar>`
          )}
        </div>
      </div>`;
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
    const previousMonth = getPreviousMonth(this.set.date);
    const nextMonth = getNextMonth(this.set.date);
    this.previousCalendar = getCalendarDetail(previousMonth);
    this.nextCalendar = getCalendarDetail(nextMonth);
    this.currentCalendar = getCalendarDetail(this.set.date);

    this.calendarGroup = [this.previousCalendar, this.currentCalendar, this.nextCalendar];
    // console.log('calendar |this.calendarGroup|', this.calendarGroup);
  }

  private translateMonth(type: 'prevoius' | 'next') {
    this.calendarMonitorRef.value!.style.transition = 'translate 0.25s ease-out';
    if (type === 'prevoius') {
      this.currentTranslateValue += 304;
    } else {
      this.currentTranslateValue -= 304;
    }
    this.style.setProperty('--translate', `${this.currentTranslateValue}px`);
  }

  private createCalendar(type: 'previous' | 'next', focusedCalendar: CXSingleCalendar.Ref) {
    let previousMonthFromMonthVisibled: any;
    if (type === 'previous') {
      previousMonthFromMonthVisibled = getPreviousMonth(
        focusedCalendar.set.calendar?.firstDateOfMonth!
      );
    } else if (type === 'next') {
      previousMonthFromMonthVisibled = getNextMonth(
        focusedCalendar.set.calendar?.firstDateOfMonth!
      );
    }
    const generatedMonth = getCalendarDetail(previousMonthFromMonthVisibled);
    const singleCalendar = document.createElement('cx-single-calendar') as CXSingleCalendar.Ref;
    singleCalendar.fix().calendar(generatedMonth).exec();

    return singleCalendar;
  }

  private removeUnusedCalendar(focussedCalendar: CXSingleCalendar.Ref) {
    if (focussedCalendar) {
      this.calendarMonitorRef.value?.removeChild(focussedCalendar);
    }
  }

  private appendNewCalendar(type: 'previous' | 'next', singleCalendar: CXSingleCalendar.Ref) {
    if (type === 'previous') {
      this.calendarMonitorRef.value?.insertBefore(
        singleCalendar,
        this.calendarMonitorRef.value?.firstElementChild
      );
    } else if (type === 'next') {
      this.calendarMonitorRef.value?.append(singleCalendar);
    }
  }

  private setTransitionCalendar(type: 'previous' | 'next') {
    if (type === 'previous') {
      this.calendarMonitorRef.value!.style.transition = 'none';
      this.currentTranslateValue -= 304;
      this.style.setProperty('--translate', `${this.currentTranslateValue}px`);
    } else if (type === 'next') {
      this.calendarMonitorRef.value!.style.transition = 'none';
      this.currentTranslateValue += 304;
      this.style.setProperty('--translate', `${this.currentTranslateValue}px`);
    }
  }

  private goPreviousMonth() {
    this.translateMonth('prevoius');

    const timer = setTimeout(() => {
      const singleCalendar = this.createCalendar(
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
      const singleCalendar = this.createCalendar(
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

    type Var<T extends ThemeVersion = 2> = unknown;

    type Set<T extends ThemeVersion = 2> = {
      date: Date;
      display?: '1-calendar' | '2-calendars';
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
