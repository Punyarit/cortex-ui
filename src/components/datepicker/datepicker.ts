import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { ThemeVersion } from '../theme/types/theme.types';
import '../c-box/c-box';

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

  static styles = css`
    .box {
      display: flex;
      column-gap: var(--size-12);
      align-items: center;
    }
    .input-box {
      border-radius: var(--base-size-8);
      border: 2px solid var(--gray-400);
      background-color: var(--white);
      padding: var(--base-size-6) var(--base-size-8);
      width: 300px;
      box-sizing: border-box;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
    if (this.config) this.exec();
  }

  private renderInputBox(text: string) {
    return html` <div class="input-box">${text}</div> `;
  }

  private inputBoxFactory() {
    if (this.set.daterange) {
      return html`
        <div class="box">
          ${this.renderInputBox('วันเริ่มต้น')}
          <div>-</div>
          ${this.renderInputBox('วันสิ้นสุด')}
        </div>
      `;
    } else {
      return html` ${this.renderInputBox('เลือกวันที่')} `;
    }
  }

  render(): TemplateResult {
    return html`${this.inputBoxFactory()} `;
  }

  // Method
  // public log(config: { text: string }): void {
  //   console.log('log: ', config.text);
  // }

  // Event
  // private pressed(): void {
  //   this.setCustomEvent<CXDatePicker.Details[typeof onPressed]>(onPressed, {
  //     event: onPressed,
  //   });
  // }
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
