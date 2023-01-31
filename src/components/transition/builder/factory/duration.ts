import { TransitionDetail, TransitionStyles } from '../../types/transition.types';

export class Duration implements TransitionStyles {
  private duration: string;
  private delay: string;
  private timing: string;

  constructor(detail: TransitionDetail) {
    this.duration = detail.transition.duration;
    this.delay = detail.transition.delay;
    this.timing = detail.transition.timing;
  }

  public getCssText(): string {
    return `
      :host {
        --duration: ${this.duration};
        --delay: ${this.delay};
        --timing: ${this.timing};
      }
    `;
  }
}
