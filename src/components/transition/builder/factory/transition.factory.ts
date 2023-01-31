import { TransitionDetail, TransitionKeys } from '../../types/transition.types';
import { Scale } from './scale';

export class TransitionFactory {
  private name: TransitionKeys;
  constructor(public detail: TransitionDetail) {
    this.name = detail.transition.name;
  }

  getTransitionCssText(): string | undefined {
    if (this.name === 'scale-up' || this.name === 'scale-down') {
      return new Scale(this.detail).getCssText();
    } else if (this.name === 'top-down' || this.name === 'bottom-up') {
      return '';
    }
  }
}
