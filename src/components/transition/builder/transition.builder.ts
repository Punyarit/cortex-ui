import { StylesBasedTime, TransitionBuilderTypes, TransitionDetail } from '../types/transition.types';
import { Duration } from './factory/duration';
import { Fade } from './factory/fade';
import { TransitionFactory } from './factory/transition.factory';

export class TransitionBuilder implements TransitionBuilderTypes {
  private transitionCssText: StylesBasedTime;
  private fadeCssText: StylesBasedTime;
  private durationCssText: StylesBasedTime;

  constructor(public detail: TransitionDetail) {
    this.transitionCssText = new StylesBasedTime();
    this.durationCssText = new StylesBasedTime();
    this.fadeCssText = new StylesBasedTime();
  }

  public setTransition(): this {
    this.transitionCssText[this.detail.when] = new TransitionFactory(this.detail).getTransitionCssText();
    return this;
  }

  public setFade(): this {
    if (!this.detail.fade) return this;
    this.fadeCssText[this.detail.when] = new Fade(this.detail).getCssText();
    return this;
  }

  public setDuration(): this {
    this.durationCssText[this.detail.when] = new Duration(this.detail).getCssText();
    return this;
  }

  public minimize(): string {
    const stylesText = `${this.transitionCssText[this.detail.when]}${this.durationCssText[this.detail.when] || ''}${
      this.fadeCssText?.[this.detail.when] || ''
    }`;
    return stylesText.replace(/\s|\\n/g, '');
  }
}
