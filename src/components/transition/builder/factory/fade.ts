import { TransitionDetail, TransitionStyles, WhenTypes } from '../../types/transition.types';

const fadeValues = {
  start: {
    ['fade']: {
      initial: '0',
      completed: '1',
    },
  },
  end: {
    ['fade']: {
      initial: '1',
      completed: '0',
    },
  },
} as const;

export class Fade implements TransitionStyles {
  private when!: WhenTypes;
  private fade!: boolean;

  constructor(detail: TransitionDetail) {
    this.when = detail.when;
    this.fade = detail.fade;
  }

  public getCssText(): string {
    if (!this.fade) return '';
    const { completed, initial } = fadeValues[this.when].fade;
    return `
      :host {
        --duration: 0;
        --delay: 0;
        --timing: initial;
      }
      .transition {
        opacity: ${initial};
      }
      .fade {
        opacity: ${completed};
      }
    `;
  }
}
