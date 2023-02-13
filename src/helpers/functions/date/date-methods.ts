export type CalendarResult = {
  year: number;
  month: number;
  calendar: CalendarValue[][];
  firstDateOfMonth: Date;
  lastDateOfMonth: Date;
};

export type CalendarValue = {
  value: number;
  type: calendarType;
  period: string;
  date: number[];
};

export type calendarType = 'current-month' | 'previous-month' | 'next-month';

export function dateFormat(date: Date | number | undefined, options?: Intl.DateTimeFormatOptions) {
  if (!date) return;
  const formater = new Intl.DateTimeFormat('th-TH', options);
  return formater.format(date);
}

export function getPreviousMonth(date: Date) {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() - 1);
  return newDate;
}

export function getNextMonth(date: Date) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  return d;
}

export function convertToDate(
  year: number | string,
  month: number | string,
  date: number | string = 1
): Date {
  return new Date(+year, +month, +date);
}

export function convertDateToArray(date: Date) {
  if (!date) return;
  return [date.getFullYear(), date.getMonth(), date.getDate()];
}

export const longMonthOption: Intl.DateTimeFormatOptions = {
  month: 'long',
};

export const shortDayOption: Intl.DateTimeFormatOptions = {
  weekday: 'short',
};

export const yearDayOption: Intl.DateTimeFormatOptions = {
  year: 'numeric',
};

export function getCalendarDetail(date: Date, today = new Date()): CalendarResult {
  const firstDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const calendar = [];

  const firstDayOfMonth = firstDateOfMonth.getDay();
  let currentDate = new Date(
    firstDateOfMonth.getFullYear(),
    firstDateOfMonth.getMonth(),
    -firstDayOfMonth + 1
  );

  // 📌use while (currentDate.getMonth() <= firstDateOfMonth.getMonth()) { ... }
  // 📌for flexible row of month's week but it's not good for ux and developing
  for (let weekRow = 0; weekRow < 6; weekRow++) {
    const week = [] as CalendarValue[];
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const value = currentDate.getDate();
      const type =
        currentDate.getMonth() === date.getMonth()
          ? 'current-month'
          : currentDate.getMonth() < date.getMonth()
          ? 'previous-month'
          : 'next-month';

      let period = '';
      let diff = today.getTime() - currentDate.getTime();
      let daysAgo = Math.floor(diff / (1000 * 3600 * 24));
      // console.log('date-methods |daysAgo|', daysAgo);
      // console.log('date-methods |value |', value);
      if (daysAgo === 0) {
        period = 'today';
      } else if (daysAgo > 0) {
        period = daysAgo === 1 ? `1 day ago` : `${daysAgo} days ago`;
      } else {
        let nextDays = Math.abs(daysAgo);
        period = nextDays === 1 ? `1 day later` : `in ${nextDays} days later`;
      }

      // 📌 cant add date: currentDate to week.push becuse currentDate referrence cached
      week.push({
        value,
        type,
        period,
        date: convertDateToArray(currentDate)!,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    calendar.push(week);
  }

  return {
    year: firstDateOfMonth.getFullYear(),
    month: firstDateOfMonth.getMonth(),
    calendar,
    firstDateOfMonth,
    lastDateOfMonth,
  };
}

export const isValid = (date: Date): boolean => !isNaN(date.getDate());
