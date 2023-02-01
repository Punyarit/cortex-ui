import { css, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ComponentBase } from '../../base/component-base/component.base';
import { TransitionBuilder } from './builder/transition.builder';
import { TransitionAttributes, WhenTypes } from './types/transition.types';

export const tagName = 'cx-transition';
// export const onPressed = 'pressed';

@customElement(tagName)
export class Transition extends ComponentBase<CXTransition.Props> {
  config: CXTransition.Set = {
    start: {
      name: 'scale-up',
      delay: '0',
      duration: '0.25s',
      timing: 'ease',
    },
    end: {
      name: 'scale-down',
      delay: '0',
      duration: '0.25s',
      timing: 'ease',
    },
  };

  static styles = css`
    :host {
      display: inline-block;
    }
    .transition {
      transition-duration: var(--duration);
      transition-delay: var(--delay);
      transition-timing-function: var(--timing);
      transition-property: all;
    }
  `;

  constructor() {
    super();
    if (this.config) this.initConfig();
  }

  private initConfig(): void {
    this.fixConfig();
    this.cacheConfig(this.config);
    this.exec();
  }

  private transitionRef = createRef<HTMLDivElement>();
  private stylesRef = createRef<HTMLDivElement>();

  @state()
  private transitionCssText: string | undefined;

  private FADE = 'fade';

  render(): TemplateResult {
    return html`
      <style ${ref(this.stylesRef)}>
        ${this.transitionCssText}
      </style>
      <div class="transition" ${ref(this.transitionRef)}>
        <slot></slot>
      </div>
    `;
  }

  willUpdate(changedProperties: Map<PropertyKey, unknown>): void {
    if (changedProperties.has('set')) {
      this.shouldForward(true);
    }
    super.willUpdate(changedProperties);
  }

  private shouldForward(shouldForward: boolean) {
    if (this.set.start?.fillMode !== 'forwards' || !this.set?.fade || !shouldForward) return;
    this.style.visibility = 'hidden';
  }

  public setTransition(when: WhenTypes) {
    if (!this.set.start || !this.set.end) return;

    const cssText = new TransitionBuilder({
      transition: this.set[when] as TransitionAttributes,
      when,
      fade: this.set.fade as boolean,
    })
      .setTransition()
      .setFade()
      .minimize();

    this.setTransitionCSSText(cssText);

    setTimeout(() => {
      this.addFade(when);

      // 📌timeout = 0 coz fade need initial opacity:0 early
    }, 0);

    setTimeout(() => {
      this.toggleTransition(when);
      // 📌set duration here when component dosnt have fade
      if (!this.set.fade) this.setDuration(when);
    }, this.timeoutWhenStart(when));

    setTimeout(() => {
      this.clearTransition(when);
      this.shouldForward(when === 'end');
      // 📌after transition finish need (after 250ms) need to clear everything
    }, 250);
  }

  private clearTransition(when: WhenTypes) {
    this.clearTransitionWhenCompleted(when);
    this.clearFadeClassAfterTransitionDone();
    this.clearDuration();
    this.removeTransitionCssText();
  }

  private removeTransitionCssText(): void {
    this.transitionCssText = '';
  }

  private clearFadeClassAfterTransitionDone(): void {
    if (!this.set.fade) return;
    this.transitionRef.value?.classList.remove(this.FADE);
  }

  private addFade(when: WhenTypes): void {
    if (!this.set.end || !this.set.start || !this.set.fade) return;
    this.transitionRef.value?.classList.add(this.FADE);
    this.setDuration(when);
  }

  private setDuration(when: WhenTypes): void {
    // 📌use setAttribute improve performance and must be aware that there is no set style other than this below
    this.setAttribute(
      'style',
      `--duration:${(this.set[when] as TransitionAttributes)?.duration};--delay:${
        (this.set[when] as TransitionAttributes)?.delay
      };--timing:${(this.set[when] as TransitionAttributes)?.timing}`
    );
  }

  private clearDuration(): void {
    this.setAttribute('style', '');
  }

  private timeoutWhenStart(when: WhenTypes): number {
    // 📌if fade = 'none' && when = 'start' it's mean child of cx-transition always appear it does not need 250ms for delay
    // 📌fade != 'none' mean transition has fade. fade need to init opacity = 0 with 0ms *before content appear*
    if (!this.set.fade || when) return 0;

    // 📌250 is duration time of each transitions
    return 250;
  }

  // 📌need to clear class when completed coz, bug occur
  private clearTransitionWhenCompleted(when: WhenTypes): void {
    if (!(this.set[when] as TransitionAttributes)) return;
    this.transitionRef.value?.classList.remove((this.set[when] as TransitionAttributes).name);
  }

  private setTransitionCSSText(cssText: string): void {
    this.transitionCssText = cssText;
  }

  private toggleTransition(when: WhenTypes): void {
    if (!this.set.end || !this.set.start) return;
    if (when === 'start') {
      this.transitionRef.value?.classList.remove(this.set.end.name);
      this.transitionRef.value?.classList.add(this.set.start.name);
    } else if (when === 'end') {
      this.transitionRef.value?.classList.remove(this.set.start.name);
      this.transitionRef.value?.classList.add(this.set.end.name);
    }
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXTransition {
    type Ref = Transition;

    type Var = unknown;

    type Set = {
      start?: TransitionAttributes;
      end?: TransitionAttributes;
      fade?: boolean;
    };

    type Fix = { [K in keyof Set]: (value: Set[K]) => Fix } & { exec: () => Ref };

    type Props = {
      var: Pick<Var, never>;
      set: Set;
      fix: Fix;
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
    [tagName]: CXTransition.Ref;
  }

  // interface GlobalEventHandlersEventMap {
  //   [onPressed]: (customEvent: CXTransition.Pressed) => void;
  // }
}
