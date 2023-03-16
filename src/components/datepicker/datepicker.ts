import { css, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
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
import { delay } from '../../helpers/delay';
import { InputDateType } from './types/datepicker.types';
import { CxDatepickerName } from './types/datepicker.name';
import { PopoverContent } from '../popover/types/popover.types';
import { UI } from './ui/datepicker.ui';
import { SizeNumber } from '../../types/sizes.type';

// export const onPressed = 'pressed';

@customElement(CxDatepickerName)
export class DatePicker extends ComponentBase<CXDatePicker.Props> {
  config: CXDatePicker.Set = {
    date: new Date(),
    min: undefined,
    max: undefined,
    initValue: true,
    multiSelect: false,
    daterange: false,
    display: '1-calendar',
    inputStyle: 'long',
    valueStyle: {
      dateStyle: 'medium',
    },
  };

  styles: CXDatePicker.Var = {
    heightInput: '44',
    widthInput: '310',
  };

  @state()
  private selectedDate?: Date | DateRangeSelected;

  private inputBoxWrapperRef = createRef<HTMLSlotElement>();
  private cxCalendarRef = createRef<CXCalendar.Ref>();
  private popoverContentRef = createRef<PopoverContent>();

  connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
    if (this.config) this.exec();

    if (this.var) this.cacheVariables(this.var);
    if (this.styles) this.setVar();
  }

  render(): TemplateResult {
    return html`
      <style></style>
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
        <c-box slot="popover" ${ref(this.popoverContentRef)}>
          <c-box content p="0">
            <cx-calendar
              ${ref(this.cxCalendarRef)}
              @select-date="${this.selectDate}"
              .set="${this.set}"></cx-calendar>
          </c-box>
        </c-box>
      </cx-popover>
    `;
  }

  private setWidthStyle() {
    return this.set.inputStyle === 'long' && this.set.daterange ? '632' : '328';
  }

  private setInputStyle() {
    return this.set.inputStyle === 'long' ? UI.inputLong : UI.inputShort;
  }

  createRenderRoot(): this {
    return this;
  }

  private renderInputBox(text: string, type: InputDateType) {
    return html`
      <c-box
        ui="${UI.inputDateBox}"
        icon-prefix="22 calendar-alt-line gray-600"
        input-date-type="${type}"
        input-box="default"
        w="${this.var.widthInput!}"
        h="${this.var.heightInput!}"
        >${text}</c-box
      >
    `;
  }

  private getSelectedDateRangeText() {
    if (!this.selectedDate) return;
    const { startdate, enddate } = this.selectedDate as DateRangeSelected;
    const startdateFormatted = dateFormat(startdate, this.set.valueStyle);
    const enddateFormatted = dateFormat(enddate, this.set.valueStyle);
    return { startdate: startdateFormatted, enddate: enddateFormatted };
  }

  private renderDateInput() {
    if (this.set.daterange) {
      const dateRangeText = this.getSelectedDateRangeText();
      return this.getInputBoxForDateRange(dateRangeText?.startdate, dateRangeText?.enddate);
    } else {
      const dateText = dateFormat(this.selectedDate as Date, this.set.valueStyle);
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
    await this.setClosePopover(date);
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

  private async setClosePopover(date: Date | DateRangeSelected) {
    if (this.set.daterange) {
      if (!((date as DateRangeSelected).startdate && (date as DateRangeSelected).enddate)) return;
      // 📌 delay for animation selected enddate scale
      await delay(175);
      this.popoverContentRef.value?.popoverState?.closePopover(null);
    } else {
      if (!(date as Date)) return;
      // 📌 delay for animation selected enddate scale
      await delay(175);
      this.popoverContentRef.value?.popoverState?.closePopover(null);
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

    type Var = {
      widthInput?: SizeNumber;
      heightInput?: SizeNumber;
    };

    type Set = CXCalendar.Set & {
      inputStyle?: 'short' | 'long';
      valueStyle?: Intl.DateTimeFormatOptions;
    };

    type Fix = Required<{ [K in keyof Set]: (value: Set[K]) => Fix }> & { exec: () => void };

    type Props = {
      var: Var;
      set: Set;
      fix: Fix;
      make: Var;
    };

    type Details = {
      ['select-date']: { date: Date | DateRangeSelected };
    };

    type Events = {
      ['select-date']: (detail: SelectDate) => void;
    };

    type SelectDate = CustomEvent<Details['select-date']>;

    // type Details = {
    //   [onPressed]: { event: string };
    // };

    // type Events = {
    //   [onPressed]: (detail: Pressed) => void;
    // };

    // type Pressed = CustomEvent<Details[typeof onPressed]>;
  }

  interface HTMLElementTagNameMap {
    [CxDatepickerName]: CXDatePicker.Ref;
  }

  // namespace JSX {
  //  interface IntrinsicElements {
  //   [tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> | CXDatePicker.Ref;
  //  }
  // }
}
