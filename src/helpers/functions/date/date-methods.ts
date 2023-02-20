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
  dateArray: number[];
  minmax?: MinMaxType;
  date?: Date;
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

export function convertDateStringToDate(dateString: string | null | undefined) {
  if (!dateString) return undefined;
  const [year, month, date] = dateString.split('-').map(Number);
  return new Date(year, month, date);
}

export function convertToDate(
  year: DateParameter,
  month: DateParameter,
  date: DateParameter = 1
): Date {
  return new Date(+year, +month, +date);
}

export type DateParameter = string | number;

export function convertDateToArrayNumber(date: Date) {
  if (!date) return;
  return [date.getFullYear(), date.getMonth(), date.getDate()];
}

export const dateShortOption: Intl.DateTimeFormatOptions = {
  dateStyle: 'short',
};

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

      week.push({
        value,
        type,
        period,
        dateArray: convertDateToArrayNumber(currentDate)!,
        minmax,
        date: new Date(currentDate),
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
};

export const isValid = (date: Date): boolean => !isNaN(date.getDate());
export const isAfter = (date: { starter: Date; comparator: Date }) => {
  return date.starter > date.comparator ? true : false;
};

export const isBefore = (date: { starter: Date; comparator: Date }) => {
  return date.starter < date.comparator ? true : false;
};

export function getDateBetweenArrayDate(date1: string, date2: string) {
  let startDate = new Date(date1);
  let endDate = new Date(date2);

  if (startDate > endDate) {
    // Swap start and end dates
    [startDate, endDate] = [endDate, startDate];
  }

  const dateArray = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

// 📌 result [[2023,1,15], [2023,1,15]]
export function getDateBetweenArrayNumber(date1: Date, date2: Date) {
  let startDate = new Date(date1);
  let endDate = new Date(date2);

  if (startDate > endDate) {
    // Swap start and end dates
    [startDate, endDate] = [endDate, startDate];
  }

  const dateArray = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dateArray.push(convertDateToArrayNumber(new Date(currentDate)));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

// 📌 result [{2023-1: 4}, {2023-1: 5}]
export function getDateBetweenObject(
  date1: Date,
  date2: Date
): {
  [x: string]: number;
}[] {
  let startDate = new Date(date1);
  let endDate = new Date(date2);

  if (startDate > endDate) {
    // Swap start and end dates
    [startDate, endDate] = [endDate, startDate];
  }

  const dateArray = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const [year, month, date] = convertDateToArrayNumber(new Date(currentDate))!;
    const key = `${year}-${month}`;
    dateArray.push({ [key]: date });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

// 📌 result [{2023-1: [4,5,6]}, {2023-1: [5,6,7]}]
export function getDateBetweenObjectArray(date1: Date, date2: Date) {
  let startDate = new Date(date1);
  let endDate = new Date(date2);

  if (startDate > endDate) {
    // Swap start and end dates
    [startDate, endDate] = [endDate, startDate];
  }

  const dateObject = {} as any;
  const currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate() + 1); // move to first date after startDate

  while (currentDate < endDate) {
    const [year, month, date] = convertDateToArrayNumber(new Date(currentDate))!;
    const key = `${year}-${month}`;
    if (key in dateObject) {
      dateObject[key].push(date);
    } else {
      dateObject[key] = [date];
    }
    currentDate.setDate(currentDate.getDate() + 1);
    if (currentDate.getTime() === endDate.getTime()) {
      break; // end on last date before endDate
    }
  }

  return dateObject;
}

export function isDateBetween(startDate: Date, endDate: Date, checkDate: Date) {
  return (
    (checkDate >= startDate && checkDate <= endDate) ||
    (checkDate >= endDate && checkDate <= startDate)
  );
}
