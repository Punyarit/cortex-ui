import { css, html, PropertyValueMap, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { createRef, ref } from 'lit/directives/ref.js';
import '../c-box/c-box';
import '../popover/popover';
import '../calendar/calendar';
import { RangeValueType, DateValueType } from '../calendar/types/calendar.types';
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
    dateRange: false,
    display: '1-calendar',
    inputStyle: 'long',
    valueStyle: {
      dateStyle: 'medium',
    },
    dateValue: undefined,
    rangeValue: undefined,
    focusout: 'close',
    mouseleave: 'none',
    disabled: undefined,
    error: undefined,
    rangeError: undefined,
    rangeDisabled: undefined,
  };

  styles: CXDatePicker.Var = {
    heightInput: '44',
    widthInput: '310',
  };

  private inputBoxWrapperRef = createRef<HTMLSlotElement>();
  private cxCalendarRef = createRef<CXCalendar.Ref>();
  private popoverContentRef = createRef<PopoverContent>();
  private popoverRef = createRef<CXPopover.Ref>();
  private endDateCache?: Date;

  connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
    if (this.config) this.exec();

    // 📌only use when component styles base on c-box *The Component does not have shadowRoot.
    if (this.var) this.cacheVariables(this.var);
    if (this.styles) this.setVar();
  }

  @state()
  datepickerState: 'opened' | 'closed' = 'closed';

  render(): TemplateResult {
    return html`
      <style>
        cx-datepicker .disabled-bg {
          background: var(--gray-200);
          cursor: not-allowed;
        }

        cx-datepicker .error-border {
          border-color: red !important;
        }
      </style>
      <cx-popover
        @opened="${this.popoverOpened}"
        @closed="${this.popoverClosed}"
        .set="${{
          disabled: this.set.disabled,
          position: 'bottom-left',
          openby: 'click',
          mouseleave: this.set.mouseleave,
          focusout: this.set.focusout,
        } as CXPopover.Set}">
        <c-box slot="host">
          <c-box ui="${this.setInputStyle()}" ${ref(this.inputBoxWrapperRef)}>
            ${this.renderDateInput()}
          </c-box>
        </c-box>
        <c-box slot="popover" ${ref(this.popoverContentRef)}>
          <c-box content p="0">
            ${this.datepickerState === 'opened'
              ? html`
                  <cx-calendar
                    ${ref(this.cxCalendarRef)}
                    @select-date="${this.selectDate}"
                    .set="${this.set}"></cx-calendar>
                `
              : undefined}
          </c-box>
        </c-box>
      </cx-popover>
    `;
  }

  private setInputStyle() {
    return this.set.inputStyle === 'long' ? UI.inputLong : UI.inputShort;
  }

  createRenderRoot(): this {
    return this;
  }

  private renderInputBox(text: string, type: InputDateType) {
    const { disabled, error, rangeDisabled, rangeError } = this.set;
    const inputState =
      !rangeDisabled && !rangeError
        ? `${disabled ? 'disabled-bg' : ''} ${error ? 'error-border' : ''}`
        : '';

    const endDateInputState = `${
      rangeDisabled?.endDate && type === 'enddate' ? 'disabled-bg' : ''
    } ${rangeError?.endDate && type === 'enddate' ? 'error-border' : ''}`;

    const startDateInputState = `${
      rangeDisabled?.startDate && type === 'startdate' ? 'disabled-bg' : ''
    } ${rangeError?.startDate && type === 'startdate' ? 'error-border' : ''}`;

    return html`
      <c-box
        @mouseenter="${() => this.checkDisabledDate(type)}"
        class="${inputState} ${endDateInputState} ${startDateInputState}"
        ui="${UI.inputDateBox}"
        icon-prefix="22 calendar-alt-line gray-600"
        input-date-type="${type}"
        input-box="default"
        w="${this.var.widthInput!}!"
        h="${this.var.heightInput!}!"
        >${text}</c-box
      >
    `;
  }

  private checkDisabledDate(type: InputDateType) {
    const isEndDate = type === 'enddate';
    const isStartDate = type === 'startdate';
    const isEndDateDisabled = this.set.rangeDisabled?.endDate;
    const isStartDateDisabled = this.set.rangeDisabled?.startDate;

    if (isEndDate) {
      this.toggleFixBasedOnCondition(isEndDateDisabled);
    } else if (isStartDate) {
      this.toggleFixBasedOnCondition(isStartDateDisabled);
    }
  }

  private toggleFixBasedOnCondition(condition: boolean | undefined) {
    this.fix().disabled(condition).exec();
  }

  private getSelectedDateRangeText() {
    const dateRangeValue = this.set.rangeValue as RangeValueType;

    const startdate = this.set.initValue ? dateRangeValue?.startDate : undefined;
    const enddate = this.set.initValue ? dateRangeValue?.endDate : undefined;

    const startdateFormatted = dateFormat(startdate, this.set.valueStyle);
    const enddateFormatted = dateFormat(enddate, this.set.valueStyle);

    return { startdate: startdateFormatted, enddate: enddateFormatted };
  }

  private renderDateInput() {
    if (this.set.dateRange) {
      const { startdate, enddate } = this.getSelectedDateRangeText();
      return this.getInputBoxForDateRange(startdate, enddate);
    } else {
      const date = this.set.initValue ? this.set.dateValue : undefined;
      const dateFormatted = dateFormat((date as DateValueType)?.date!, this.set.valueStyle);
      return this.getInputBoxForSingleDate(dateFormatted);
    }
  }

  private popoverClosed(e: CXPopover.OnClosed) {
    this.datepickerState = e.detail.state;

    const firstInput = this.inputBoxWrapperRef.value!.firstElementChild as HTMLElement;
    if (this.set.dateRange) {
      const enddateInput = this.inputBoxWrapperRef.value!.lastElementChild as HTMLElement;
      this.setDefaultOnInputBox(firstInput);
      this.setDefaultOnInputBox(enddateInput);

      if (this.set.rangeValue?.startDate && !this.set.rangeValue.endDate) {
        this.set.rangeValue.endDate = this.endDateCache;
      }
    } else {
      this.setDefaultOnInputBox(firstInput);
    }
  }

  private popoverOpened(e: CXPopover.OnOpened) {
    this.datepickerState = e.detail.state;
    const inputDateBoxRef = e.detail.event.target as HTMLElement;
    if (!inputDateBoxRef.hasAttribute('input-box')) return;

    const inputDateType = inputDateBoxRef.getAttribute('input-date-type') as InputDateType;

    if (inputDateType === 'enddate') {
      inputDateBoxRef.setAttribute('input-box', 'focus');
      if (this.set?.rangeValue?.endDate) {
        this.endDateCache = this.set.rangeValue.endDate;
      }
      requestAnimationFrame(() => {
        this.resetEndDateSelected();
      });
    }
    this.setFocusOnInputBox(inputDateBoxRef);
  }

  public resetEndDateSelected() {
    if (!this.cxCalendarRef.value) return;

    this.cxCalendarRef.value?.calendarMonitorRef.value?.setAttribute('enddate-selected', '');
    this.cxCalendarRef.value?.calendarMonitorRef.value?.setAttribute(
      'old-enddate',
      convertDateToArrayNumber(this.set.rangeValue?.endDate!)?.join('-')!
    );
    this.cxCalendarRef.value.dateNavigator = this.endDateCache;
  }

  private async selectDate(e: CXDatePicker.SelectDate.Date | CXDatePicker.SelectDate.Range) {
    if (this.set.dateRange) {
      this.setSelectDateRangeFocus(e.detail as RangeValueType);
    }
    this.setCustomEvent('select-date', { ...e.detail });
    await this.setClosePopover(e.detail);
  }

  private setSelectDateRangeFocus(date: RangeValueType) {
    const startdateInput = this.inputBoxWrapperRef.value!.firstElementChild as HTMLElement;
    const enddateInput = this.inputBoxWrapperRef.value!.lastElementChild as HTMLElement;

    if (!date.startDate) {
      this.setFocusOnInputBox(startdateInput);
    } else {
      this.setDefaultOnInputBox(startdateInput);
      this.setFocusOnInputBox(enddateInput);
    }
  }

  private async setClosePopover(date: DateValueType | RangeValueType) {
    if (this.set.dateRange) {
      if (!((date as RangeValueType).startDate && (date as RangeValueType).endDate)) return;
      // 📌 delay for animation selected enddate scale
      await delay(175);
      this.popoverContentRef.value?.popoverState?.closePopover(null);
    } else {
      if (!(date as DateValueType).date) return;
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
      focusout?: 'close' | 'none';
      mouseleave?: 'close' | 'none';
      disabled?: boolean;
      error?: boolean;
      rangeError?: {
        startDate?: boolean;
        endDate?: boolean;
      };
      rangeDisabled?: {
        startDate?: boolean;
        endDate?: boolean;
      };
    };

    type Fix = Required<{ [K in keyof Set]: (value: Set[K]) => Fix }> & { exec: () => void };

    type Props = {
      var: Var;
      set: Set;
      fix: Fix;
      make: Var;
    };

    namespace Value {
      type Date = DateValueType;
      type Range = DateValueType;
    }
    namespace SelectDate {
      type Date = CustomEvent<DateValueType>;
      type Range = CustomEvent<RangeValueType>;
    }
  }

  interface HTMLElementTagNameMap {
    [CxDatepickerName]: CXDatePicker.Ref;
  }
}
