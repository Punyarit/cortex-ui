import { css, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { ThemeVersion } from '../theme/types/theme.types';
import { createRef, ref } from 'lit/directives/ref.js';
import '../c-box/c-box';
import '../popover/popover';
import '../calendar/calendar';
import { DateRangeSelected } from '../calendar/types/calendar.types';
import { dateFormat, dateShortOption } from '../../helpers/functions/date/date-methods';
import { ModalCaller } from '../../helpers/ModalCaller';
import { delay } from '../../helpers/delay';

export const tagName = 'cx-datepicker';
// export const onPressed = 'pressed';

@customElement(tagName)
export class DatePicker extends ComponentBase<CXDatePicker.Props> {
  #inputWrapperUI = 'inline-flex items-center col-gap-6';

  config: CXDatePicker.Set = {
    date: new Date(),
    min: undefined,
    max: undefined,
    selection: {
      type: 'single',
      select: 'later',
    },
    daterange: false,
  };

  @state()
  private selectedDate?: Date | DateRangeSelected;

  private inputBoxWrapper = createRef<HTMLSlotElement>();

  connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
    if (this.config) this.exec();
  }

  render(): TemplateResult {
    return html`
      <cx-popover
        @on-opened="${this.popoverOpened}"
        @on-closed="${this.popoverClosed}"
        .set="${{
          position: 'bottom-left',
          openby: 'click',
          mouseleave: 'none',
          focusout: 'close',
        } as CXPopover.Set}">
        <c-box slot="host">
          <c-box ui="${this.#inputWrapperUI}" ${ref(this.inputBoxWrapper)}>
            ${this.renderDateInput()}
          </c-box>
        </c-box>
        <c-box slot="popover">
          <c-box content p-0>
            <cx-calendar
              @select-date="${this.selectDate}"
              .set="${{
                date: this.set.date,
                daterange: this.set.daterange,
                max: this.set.max,
                min: this.set.min,
                selection: this.set.selection,
                display: this.set.daterange ? '2-calendars' : '1-calendar',
              } as CXCalendar.Set}"></cx-calendar>
          </c-box>
        </c-box>
      </cx-popover>
    `;
  }

  createRenderRoot(): this {
    return this;
  }

  private renderInputBox(text: string) {
    return html`
      <c-box input-box="default" w-280 icon-src="calendar-alt-line" icon-prefix>${text}</c-box>
    `;
  }

  private getSelectedDateRangeText() {
    if (!this.selectedDate) return;
    const { startdate, enddate } = this.selectedDate as DateRangeSelected;
    const startdateFormatted = dateFormat(startdate, dateShortOption);
    const enddateFormatted = dateFormat(enddate, dateShortOption);
    return { startdate: startdateFormatted, enddate: enddateFormatted };
  }

  private getInputBoxForDateRange(
    startdateFormatted: string | undefined,
    enddateFormatted: string | undefined
  ) {
    return html`
      ${this.renderInputBox(startdateFormatted || 'วันเริ่มต้น')}
      <c-box>-</c-box>
      ${this.renderInputBox(enddateFormatted || 'วันสิ้นสุด')}
    `;
  }

  private getInputBoxForSingleDate(dateFormatted: string | undefined) {
    return html` ${this.renderInputBox(dateFormatted || 'เลือกวันที่')} `;
  }

  private renderDateInput() {
    if (this.set.daterange) {
      const dateRangeText = this.getSelectedDateRangeText();
      return this.getInputBoxForDateRange(dateRangeText?.startdate, dateRangeText?.enddate);
    } else {
      const dateText = dateFormat(this.selectedDate as Date, dateShortOption);
      return this.getInputBoxForSingleDate(dateText);
    }
  }

  private setFocusOnInputBox(inputBox: HTMLElement | null) {
    inputBox?.setAttribute('input-box', 'focus');
  }

  private setDefaultOnInputBox(inputBox: HTMLElement | null) {
    inputBox?.setAttribute('input-box', 'default');
  }

  private setDefaultOnInputBoxesForDateRange() {
    const startdateInput = this.inputBoxWrapper.value!.firstElementChild as HTMLElement;
    const enddateInput = this.inputBoxWrapper.value!.lastElementChild as HTMLElement;
    this.setDefaultOnInputBox(startdateInput);
    this.setDefaultOnInputBox(enddateInput);
  }

  private popoverClosed() {
    if (this.set.daterange) {
      this.setDefaultOnInputBoxesForDateRange();
    } else {
      const inputBox = this.inputBoxWrapper.value!.firstElementChild as HTMLElement;
      this.setDefaultOnInputBox(inputBox);
    }
  }

  private popoverOpened() {
    const inputBox = this.inputBoxWrapper.value!.firstElementChild as HTMLElement;
    this.setFocusOnInputBox(inputBox);
  }

  private async selectDate(e: CXCalendar.SelectDate) {
    const { date } = e.detail;
    //set focus
    if (this.set.daterange) {
      const startdateInput = this.inputBoxWrapper.value!.firstElementChild as HTMLElement;
      const enddateInput = this.inputBoxWrapper.value!.lastElementChild as HTMLElement;

      if (!(date as DateRangeSelected).startdate) {
        this.setFocusOnInputBox(startdateInput);
      } else {
        this.setDefaultOnInputBox(startdateInput);
        this.setFocusOnInputBox(enddateInput);
      }

      if ((date as DateRangeSelected).startdate && (date as DateRangeSelected).enddate) {
        // 📌delay 125 milisecond for improve UX
        await delay(125);
        ModalCaller.popover().close();
      }
    }
    this.selectedDate = date;
    this.setCustomEvent('select-date', { date });
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXDatePicker {
    type Ref = DatePicker;

    type Var<T extends ThemeVersion = 2> = unknown;

    type Set<T extends ThemeVersion = 2> = Omit<CXCalendar.Set, 'display'>;

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
    [tagName]: CXDatePicker.Ref;
  }

  // namespace JSX {
  //  interface IntrinsicElements {
  //   [tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> | CXDatePicker.Ref;
  //  }
  // }
}
