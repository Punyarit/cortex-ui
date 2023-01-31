import { TransitionDetail, TransitionStyles, WhenTypes } from '../../types/transition.types';

const scaleValues = {
  start: {
    ['scale-up']: {
      initial: '0.7',
      completed: '1',
    },
    ['scale-down']: {
      initial: '1.3',
      completed: '1',
    },
  },
  end: {
    ['scale-up']: {
      initial: '1',
      completed: '1.3',
    },
    ['scale-down']: {
      initial: '1',
      completed: '0.7',
    },
  },
} as const;

type ScaleValueKeys = keyof typeof scaleValues[WhenTypes];

export class Scale implements TransitionStyles {
  constructor(public detail: TransitionDetail) {}

  getCssText(): string {
    const { completed, initial } = scaleValues[this.detail.when][this.detail.transition.name as ScaleValueKeys];
    return `
      :host {
        --scale: ${completed};
        
      }
      .transition {
        scale:${initial};
      }
      .${this.detail.transition.name} {
        scale: var(--scale) !important;
      }
    `;
  }
}
