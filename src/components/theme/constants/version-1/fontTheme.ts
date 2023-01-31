import { css } from 'lit';

export const fontTheme = css`
  :host {
    --font-family: Sarabun-Regular;
    --font-regular: 400;
    --font-medium: 500;
    --font-semibold: 600;
    --font-bold: 700;
  }

  :host(.tiny) {
    --fs-12: 0.75rem;
    --fs-14: 0.875rem;
    --fs-16: 1rem;
    --fs-18: 1.125rem;
    --fs-20: 1.25rem;
    --fs-22: 1.375rem;
    --fs-24: 1.5rem;
    --fs-26: 1.625rem;
    --fs-28: 1.75rem;
    --fs-30: 1.875rem;
    --fs-32: 2rem;
    --fs-34: 2.125rem;
    --fs-36: 2.25rem;
    --fs-48: 3rem;
    --fs-64: 4rem;
  }
`;
