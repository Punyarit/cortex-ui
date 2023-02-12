export class CalendarCached {
  static selectedDate?: Date;
}

export class CalendarSingleton {
  private static instance: CalendarSingleton;
  public static calendarMonitorRef: CXCalendar.Ref;
  public static calendarRef: CXSingleCalendar.Ref;

  constructor() {
    if (CalendarSingleton.instance) {
      return CalendarSingleton.instance;
    }
    CalendarSingleton.instance = this;
  }
}
