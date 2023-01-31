import { EventAttributes, EventStrategy } from '../types/event-straegy';

export default class EventFactory {
  static async getEventDetail(
    CxDivRef: HTMLElement,
    event: EventAttributes,
    value: unknown
  ): Promise<EventStrategy | undefined> {
    // 📌dynamic import help this file lightweight *cxDiv need to be a lightweight component
    if (event === 'mouseover-popover') {
      return new (await import('../events/mouseover-popover')).MouseoverPopover(CxDivRef, value as string);
    } else if (event === 'click-snackbar') {
      return new (await import('../events/click-snackbar')).ClickSnackbar(CxDivRef, value as string);
    } else if (event === 'click-dialog') {
      return new (await import('../events/click-dialog')).ClickDialog(CxDivRef, value as string);
    }

    return;
  }
}
