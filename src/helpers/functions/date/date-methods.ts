export type CalendarDetail = {
  year: number;
  month: number;
  calendar: number[][];
  firstDateOfMonth: Date;
  lastDateOfMonth: Date;
};

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

export function convertToDate(year: number, month: number, date = 1): Date {
  return new Date(year, month, date);
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

export function getCalendarDetail(date: Date) {
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
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(currentDate.getDate());
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
