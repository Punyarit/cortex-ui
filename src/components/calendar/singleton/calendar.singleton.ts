export class SingleCalendarSingleton {
  private static instance: SingleCalendarSingleton;
  static selectedCached?: Date;
  constructor() {
    if (SingleCalendarSingleton.instance) {
      return SingleCalendarSingleton.instance;
    }
    SingleCalendarSingleton.instance = this;
  }
}
