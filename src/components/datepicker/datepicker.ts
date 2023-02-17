import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { ThemeVersion } from '../theme/types/theme.types';
import '../c-box/c-box';
import '../popover/popover';
import '../calendar/calendar';

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

  connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
    if (this.config) this.exec();
  }

  private renderInputBox(text: string) {
    return html` <c-box class="input-box">${text}</c-box> `;
  }

  private inputBoxFactory() {
    if (this.set.daterange) {
      return html`
        <c-box>
          ${this.renderInputBox('วันเริ่มต้น')}
          <c-box>-</c-box>
          ${this.renderInputBox('วันสิ้นสุด')}
        </c-box>
      `;
    } else {
      return html` ${this.renderInputBox('เลือกวันที่')} `;
    }
  }

  render(): TemplateResult {
    return html`
      <cx-popover
        .set="${{
          position: 'top-center',
          openby: 'click',
          mouseleave: 'none',
          focusout: 'close',
          arrowpoint: true,
        }}">
        <c-box slot="host" inline> ${this.inputBoxFactory()}</c-box>
        <c-box slot="popover">
          <c-box>
            <cx-calendar></cx-calendar>
          </c-box>
        </c-box>
      </cx-popover>
    `;
  }

  createRenderRoot() {
    return this;
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
