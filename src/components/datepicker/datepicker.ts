import { css, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { ThemeVersion } from '../theme/types/theme.types';
import '../c-box/c-box';
import '../popover/popover';
import '../calendar/calendar';
import { DateRangeSelected } from '../calendar/types/calendar.types';

export const tagName = 'cx-datepicker';
// export const onPressed = 'pressed';

@customElement(tagName)
export class DatePicker extends ComponentBase<CXDatePicker.Props> {
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

  connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
    if (this.config) this.exec();
  }

  private renderInputBox(text: string) {
    return html` <c-box input-box="default" w-280>${text}</c-box> `;
  }

  private inputBoxFactory() {
    if (this.set.daterange) {
      return html`
        <c-box inline-flex items-center col-gap-6>
          ${this.renderInputBox('วันเริ่มต้น')}
          <c-box>-</c-box>
          ${this.renderInputBox('วันสิ้นสุด')}
        </c-box>
      `;
    } else {
      const date = this.selectedDate as Date;
      return html` ${this.renderInputBox('เลือกวันที่')} `;
    }
  }

  render(): TemplateResult {
    return html`
      <cx-popover
        .set="${{
          position: 'bottom-left',
          openby: 'click',
          mouseleave: 'none',
          focusout: 'none',
        } as CXPopover.Set}">
        <c-box slot="host"> ${this.inputBoxFactory()}</c-box>
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

  private selectDate(e: CXCalendar.SelectDate) {
    const { date } = e.detail;
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
