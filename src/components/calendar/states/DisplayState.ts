import {
  generateYearGroup,
  getCalendarDetail,
  getNextMonth,
  getPreviousMonth,
} from '../../../helpers/functions/date/date-methods';
import { Calendar } from '../calendar';
import { MonthCalendar } from '../month-calendar/month-calendar';
import { CalendarDisplay } from '../types/calendar.types';
import { YearCalendar } from '../year-calendar/year-calendar';

export class DisplayState {
  constructor(public calendar: Calendar) {}
  public generate() {
    switch (this.calendar.displayState) {
      case 'date':
        return new DateState(this.calendar).generateCalendar();

      case 'month':
        break;

      case 'year':
        break;

      default:
        break;
    }
  }

  public goPrev() {
    switch (this.calendar.displayState) {
      case 'date':
        return new DateState(this.calendar).goPrevMonth();

      case 'month':
        return new MonthState(this.calendar).goPrevYear();

      case 'year':
        return new YearState(this.calendar).goPrevYearGroup();

      default:
        break;
    }
  }

  public goNext() {
    switch (this.calendar.displayState) {
      case 'date':
        return new DateState(this.calendar).goNextMonth();

      case 'month':
        return new MonthState(this.calendar).goNextYear();

      case 'year':
        return new YearState(this.calendar).goNextYearGroup();

      default:
        break;
    }
  }
}

export class DateState {
  constructor(public calendar: Calendar) {}
  public generateCalendar() {
    const currentMonth = this.calendar.set.date;
    const previousMonth = getPreviousMonth(currentMonth);
    const nextMonth = getNextMonth(currentMonth);

    switch (this.calendar.set.display) {
      case '1-calendar':
        this.calendar.calendarGroup = [
          getCalendarDetail({
            date: previousMonth,
            min: this.calendar.set.min,
            max: this.calendar.set.max,
          }),
          getCalendarDetail({
            date: currentMonth,
            min: this.calendar.set.min,
            max: this.calendar.set.max,
          }),
          getCalendarDetail({
            date: nextMonth,
            min: this.calendar.set.min,
            max: this.calendar.set.max,
          }),
        ];
        break;
      case '2-calendars':
        this.calendar.calendarGroup = [
          getCalendarDetail({
            date: previousMonth,
            min: this.calendar.set.min,
            max: this.calendar.set.max,
          }),
          getCalendarDetail({
            date: currentMonth,
            min: this.calendar.set.min,
            max: this.calendar.set.max,
          }),
          getCalendarDetail({
            date: nextMonth,
            min: this.calendar.set.min,
            max: this.calendar.set.max,
          }),
          getCalendarDetail({
            date: getNextMonth(nextMonth),
            min: this.calendar.set.min,
            max: this.calendar.set.max,
          }),
        ];
        break;
    }
  }

  public goPrevMonth() {
    this.translateMonth('previous');
    const timer = setTimeout(() => {
      const singleCalendar = this.createSingleCalendar(
        'previous',
        this.calendar.calendarMonitorRef.value?.firstElementChild as CXSingleCalendar.Ref
      );
      this.removeUnusedCalendar(
        this.calendar.calendarMonitorRef.value?.lastElementChild as CXSingleCalendar.Ref
      );
      this.appendNewCalendar('previous', singleCalendar);

      this.setTransitionCalendar('previous');

      clearTimeout(timer);
    }, 250);
  }

  private setTransitionCalendar(type: 'previous' | 'next') {
    const calendarMonitor = this.calendar.calendarMonitorRef.value;
    if (!calendarMonitor) return;

    calendarMonitor.style.transition = 'none';
    if (type === 'previous') {
      this.calendar.currentTranslateValue -= 304;
    } else if (type === 'next') {
      this.calendar.currentTranslateValue += 304;
    }
    this.calendar.style.setProperty('--translate', `${this.calendar.currentTranslateValue}px`);
  }

  private appendNewCalendar(type: 'previous' | 'next', singleCalendar: CXSingleCalendar.Ref) {
    const calendarMonitor = this.calendar.calendarMonitorRef.value;
    if (!calendarMonitor) return;

    if (type === 'previous') {
      calendarMonitor.insertBefore(singleCalendar, calendarMonitor.firstElementChild);
    } else {
      calendarMonitor.appendChild(singleCalendar);
    }
  }

  private translateMonth(direction: 'previous' | 'next') {
    this.calendar.calendarMonitorRef.value!.style.transition = '0.25s ease-out';
    this.calendar.currentTranslateValue += direction === 'previous' ? 304 : -304;
    this.calendar.style.setProperty('--translate', `${this.calendar.currentTranslateValue}px`);
  }

  removeUnusedCalendar(focussedCalendar: CXSingleCalendar.Ref) {
    if (focussedCalendar) {
      this.calendar.calendarMonitorRef.value?.removeChild(focussedCalendar);
    }
  }

  createSingleCalendar(type: 'previous' | 'next', focusedCalendar: CXSingleCalendar.Ref) {
    const previousMonthFromMonthVisibled =
      type === 'previous'
        ? getPreviousMonth(focusedCalendar.set.calendar?.firstDateOfMonth!)
        : getNextMonth(focusedCalendar.set.calendar?.firstDateOfMonth!);

    const generatedMonth = getCalendarDetail({
      date: previousMonthFromMonthVisibled,
      min: this.calendar.set.min,
      max: this.calendar.set.max,
    });

    const singleCalendar = document.createElement('cx-single-calendar') as CXSingleCalendar.Ref;
    singleCalendar.fix().calendar(generatedMonth).daterange(this.calendar.set.dateRange).exec();
    singleCalendar.addEventListener('select-date', this.calendar.selectDate);
    singleCalendar.addEventListener('calendar-display', (e) => {
      this.calendar.goToMonthCalendar((e as CustomEvent).detail.date);
    });

    return singleCalendar;
  }

  public goNextMonth() {
    this.translateMonth('next');
    const timer = setTimeout(() => {
      const singleCalendar = this.createSingleCalendar(
        'next',
        this.calendar.calendarMonitorRef.value!.lastElementChild as CXSingleCalendar.Ref
      );

      this.removeUnusedCalendar(
        this.calendar.calendarMonitorRef.value?.firstElementChild as CXSingleCalendar.Ref
      );
      this.appendNewCalendar('next', singleCalendar);
      this.setTransitionCalendar('next');
      clearTimeout(timer);
    }, 250);
  }
}
export class MonthState {
  public mothDisplayRef?: MonthCalendar;
  constructor(public calendar: Calendar) {
    this.mothDisplayRef = calendar.monthDisplayRef.value;
  }

  goPrevYear() {
    this.mothDisplayRef?.calcYear(this.mothDisplayRef.date, 'prev');
  }
  goNextYear() {
    this.mothDisplayRef?.calcYear(this.mothDisplayRef.date, 'next');
  }
}

export class YearState {
  public yearDisplayRef?: YearCalendar;
  constructor(public calendar: Calendar) {
    this.yearDisplayRef = calendar.yearDisplayRef.value;
  }

  goPrevYearGroup() {
    if (!this.yearDisplayRef) return;

    const targetYear = new Date(this.yearDisplayRef.years[0], 1);
    this.yearDisplayRef.years = generateYearGroup(targetYear, 11);
  }
  goNextYearGroup() {
    if (!this.yearDisplayRef) return;
    const targetYear = this.yearDisplayRef.years[this.yearDisplayRef.years.length - 1] + 1;
    const newDate = new Date(targetYear, 1);
    newDate.setFullYear(newDate.getFullYear() + 11);

    this.yearDisplayRef.years = generateYearGroup(newDate, 11);
  }
}
