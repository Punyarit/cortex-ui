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
  minmax?: MinMaxType;
};

export type MinMaxType = 'min' | 'max' | undefined;

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

type CalendarType = 'current-month' | 'previous-month' | 'next-month';

const getCalendarType = (date: Date, targetMonth: number): CalendarType =>
  date.getMonth() === targetMonth
    ? 'current-month'
    : date.getMonth() < targetMonth
    ? 'previous-month'
    : 'next-month';

const getPeriod = (today: Date, date: Date): string => {
  const diff = today.getTime() - date.getTime();
  const daysAgo = Math.floor(diff / (1000 * 3600 * 24));

  if (daysAgo === 0) {
    return 'today';
  } else if (daysAgo > 0) {
    return daysAgo === 1 ? `1 day ago` : `${daysAgo} days ago`;
  } else {
    const nextDays = Math.abs(daysAgo);
    return nextDays === 1 ? `1 day later` : `in ${nextDays} days later`;
  }
};

const getMinMax = (
  configMin: Date | undefined,
  configMax: Date | undefined,
  date: Date
): MinMaxType | undefined => {
  if (configMin && date < configMin) {
    return 'min';
  } else if (configMax && date > configMax) {
    return 'max';
  } else {
    return undefined;
  }
};

export const getCalendarDetail = ({
  date,
  today = new Date(),
  min,
  max,
}: {
  date: Date;
  today?: Date;
  min?: Date;
  max?: Date;
}): CalendarResult => {
  const firstDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const calendar: CalendarValue[][] = [];

  const firstDayOfMonth = firstDateOfMonth.getDay();
  let currentDate = new Date(
    firstDateOfMonth.getFullYear(),
    firstDateOfMonth.getMonth(),
    -firstDayOfMonth + 1
  );

  for (let weekRow = 0; weekRow < 6; weekRow++) {
    const week: CalendarValue[] = [];
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const value = currentDate.getDate();
      const type = getCalendarType(currentDate, date.getMonth());
      const period = getPeriod(today, currentDate);
      const minmax = getMinMax(min, max, currentDate);

      week.push({ value, type, period, date: convertDateToArray(currentDate)!, minmax });
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
};

export const isValid = (date: Date): boolean => !isNaN(date.getDate());
