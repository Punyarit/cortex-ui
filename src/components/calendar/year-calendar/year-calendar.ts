import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('cx-year-calendar')
export class YearCalendar extends LitElement {
  static styles = css`
    .title {
      display: flex;
      justify-content: center;
      column-gap: var(--base-size-12);
      font-size: var(--size-16);
      position: relative;
      bottom: var(--size-6);
      font-family: var(--semiBold);
      cursor: default;
      transition: color 0.25s ease;
    }

    .month {
      display: flex;
      width: 280px;
      flex-wrap: wrap;
      row-gap: 16px;
      margin-top: 16px;
    }

    .month > div {
      width: 69px;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.25s ease;
    }

    .month > div:hover {
      background-color: var(--primary-50);
    }
  `;

  @property({ type: Array })
  years: number[] = [];

  @property({ type: Object })
  calendar!: CXCalendar.Ref;

  render() {
    return html`
      <div class="title">
        ${this.format(this.years[0])} - ${this.format(this.years[this.years.length - 1])}
      </div>

      <div class="month">
        ${this.years.map((year) => {
          return html`<div @click="${() => this.selectYear(year)}">${this.format(year)}</div>`;
        })}
      </div>
    `;
  }

  format(year: number) {
    const date: Date = new Date(year, 1);
    if (isNaN(date.getTime())) return;
    return Intl.DateTimeFormat('th-TH', {
      year: 'numeric',
    })
      ?.format(date)
      ?.replace('พ.ศ.', '');
  }

  selectYear(year: number) {
    const date: Date = new Date(year, 1);
    if (isNaN(date.getTime())) return;
    this.calendar.goToMonthCalendar(date);
  }
}
