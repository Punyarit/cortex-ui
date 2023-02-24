import { css, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { ThemeVersion } from '../theme/types/theme.types';
import { createRef, ref } from 'lit/directives/ref.js';
import '../c-box/c-box';
import '../popover/popover';
import '../calendar/calendar';
import { DateRangeSelected } from '../calendar/types/calendar.types';
import {
  convertDateToArrayNumber,
  dateFormat,
  dateShortOption,
} from '../../helpers/functions/date/date-methods';
import { ModalCaller } from '../../helpers/ModalCaller';
import { delay } from '../../helpers/delay';
import { InputDateType } from './types/datepicker.types';

export const tagName = 'cx-datepicker';

// export const onPressed = 'pressed';

@customElement(tagName)
export class DatePicker extends ComponentBase<CXDatePicker.Props> {
  #inputLongUI = 'inline-flex items-center col-gap-6 w-632';
  #inputShortUI = 'inline-flex flex-col w-328 row-gap-4';

  config: CXDatePicker.Set = {
    date: new Date(),
    min: undefined,
    max: undefined,
    selection: {
      type: 'single',
      select: 'later',
    },
    daterange: false,
    display: '1-calendar',
    inputStyle: 'short',
  };

  @state()
  private selectedDate?: Date | DateRangeSelected;

  private inputBoxWrapperRef = createRef<HTMLSlotElement>();
  private cxCalendarRef = createRef<CXCalendar.Ref>();

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
          <c-box ui="${this.setInputStyle()}" ${ref(this.inputBoxWrapperRef)}>
            ${this.renderDateInput()}
          </c-box>
        </c-box>
        <c-box slot="popover">
          <c-box content p-0>
            <cx-calendar
              ${ref(this.cxCalendarRef)}
              @select-date="${this.selectDate}"
              .set="${this.set}"></cx-calendar>
          </c-box>
        </c-box>
      </cx-popover>
    `;
  }

  private setInputStyle() {
    return this.set.inputStyle === 'long' ? this.#inputLongUI : this.#inputShortUI;
  }

  createRenderRoot(): this {
    return this;
  }

  private renderInputBox(text: string, type: InputDateType) {
    return html`
      <c-box
        w-full
        flex
        col-gap-8
        border-box
        icon-prefix="calendar-alt-line"
        items-center
        input-date-type="${type}"
        input-box="default"
        >${text}</c-box
      >
    `;
  }

  private getSelectedDateRangeText() {
    if (!this.selectedDate) return;
    const { startdate, enddate } = this.selectedDate as DateRangeSelected;
    const startdateFormatted = dateFormat(startdate, dateShortOption);
    const enddateFormatted = dateFormat(enddate, dateShortOption);
    return { startdate: startdateFormatted, enddate: enddateFormatted };
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

  private popoverClosed() {
    const firstInput = this.inputBoxWrapperRef.value!.firstElementChild as HTMLElement;
    if (this.set.daterange) {
      const enddateInput = this.inputBoxWrapperRef.value!.lastElementChild as HTMLElement;
      this.setDefaultOnInputBox(firstInput);
      this.setDefaultOnInputBox(enddateInput);
    } else {
      this.setDefaultOnInputBox(firstInput);
    }
  }

  private popoverOpened(e: CXPopover.OnOpened) {
    const inputDateBoxRef = e.detail.event.target as HTMLElement;
    if (!inputDateBoxRef.hasAttribute('input-box')) return;

    const inputDateType = inputDateBoxRef.getAttribute('input-date-type') as InputDateType;

    if (inputDateType === 'enddate') {
      inputDateBoxRef.setAttribute('input-box', 'focus');
      this.resetEndDateSelected();
    }
    this.setFocusOnInputBox(inputDateBoxRef);
  }

  private resetEndDateSelected() {
    this.cxCalendarRef.value?.calendarMonitorRef.value?.setAttribute('enddate-selected', '');
    this.cxCalendarRef.value?.calendarMonitorRef.value?.setAttribute(
      'old-enddate',
      convertDateToArrayNumber((this.selectedDate as DateRangeSelected)?.enddate!)?.join('-')!
    );
    (this.selectedDate as DateRangeSelected).enddate = undefined;
    this.requestUpdate();
  }

  private async selectDate(e: CXCalendar.SelectDate) {
    const { date } = e.detail;
    if (this.set.daterange) {
      this.setSelectDateRangeFocus(date as DateRangeSelected);
    }
    await this.setCLosePopover(date);
    this.selectedDate = date;
    this.setCustomEvent('select-date', { date });
  }

  private setSelectDateRangeFocus(date: DateRangeSelected) {
    const startdateInput = this.inputBoxWrapperRef.value!.firstElementChild as HTMLElement;
    const enddateInput = this.inputBoxWrapperRef.value!.lastElementChild as HTMLElement;

    if (!date.startdate) {
      this.setFocusOnInputBox(startdateInput);
    } else {
      this.setDefaultOnInputBox(startdateInput);
      this.setFocusOnInputBox(enddateInput);
    }
  }

  private async setCLosePopover(date: Date | DateRangeSelected) {
    if (this.set.daterange) {
      if (!((date as DateRangeSelected).startdate && (date as DateRangeSelected).enddate)) return;
      // 📌 delay for animation selected enddate scale
      await delay(250);
      ModalCaller.popover().close();
    } else {
      if (!(date as Date)) return;
      // 📌 delay for animation selected enddate scale
      await delay(250);
      ModalCaller.popover().close();
    }
  }

  private getInputBoxForDateRange(
    startdateFormatted: string | undefined,
    enddateFormatted: string | undefined
  ) {
    return html`
      ${this.renderInputBox(startdateFormatted || 'วันเริ่มต้น', 'startdate')}
      ${this.set.inputStyle === 'long' ? html`<c-box>-</c-box>` : undefined}
      ${this.renderInputBox(enddateFormatted || 'วันสิ้นสุด', 'enddate')}
    `;
  }

  private getInputBoxForSingleDate(dateFormatted: string | undefined) {
    return html` ${this.renderInputBox(dateFormatted || 'เลือกวันที่', 'singledate')} `;
  }

  private setFocusOnInputBox(inputBox: HTMLElement | null) {
    inputBox?.setAttribute('input-box', 'focus');
  }

  private setDefaultOnInputBox(inputBox: HTMLElement | null) {
    inputBox?.setAttribute('input-box', 'default');
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXDatePicker {
    type Ref = DatePicker;

    type Var<T extends ThemeVersion = 2> = unknown;

    type Set<T extends ThemeVersion = 2> = CXCalendar.Set & {
      inputStyle?: 'short' | 'long';
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
    [tagName]: CXDatePicker.Ref;
  }

  // namespace JSX {
  //  interface IntrinsicElements {
  //   [tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> | CXDatePicker.Ref;
  //  }
  // }
}
