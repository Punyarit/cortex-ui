var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ComponentBase } from '../../base/component-base/component.base';
import '../icon/icon';
import '../transition/transition';
import { SnackbarSingleton } from './singleton/snackbar.singleton';
import { snackbarDurationDefault, snackbarModalSlot } from './types/snackbar.types';
export const tagName = 'cx-snackbar';
// export const onPressed = 'pressed';
let Snackbar = class Snackbar extends ComponentBase {
    constructor() {
        super();
        this.config = {
            text: 'The snackbar has been opened.',
            iconSrc: 'favorite',
            duration: snackbarDurationDefault,
            transition: {
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
                fade: true,
            },
        };
        this.transitionRef = createRef();
        if (this.config)
            this.exec();
    }
    render() {
        return this.slot
            ? html `
          <style></style>
          <cx-transition ${ref(this.transitionRef)} .set="${this.set.transition}">
            <div class="snackbar">
              ${this.renderIcon()}
              <div>${this.set.text}</div>
            </div>
          </cx-transition>
        `
            : undefined;
    }
    connectedCallback() {
        super.connectedCallback();
        this.createSharedCxSnackbarRef();
    }
    createSharedCxSnackbarRef() {
        SnackbarSingleton.ref = this;
    }
    renderIcon() {
        if (!this.set.iconSrc)
            return;
        const iconSet = {
            src: this.set.iconSrc,
            color: 'primary',
            size: 'large',
        };
        return html ` <cx-icon .set="${iconSet}"></cx-icon>`;
    }
    setSlotName() {
        this.slot = snackbarModalSlot;
        this.requestUpdate();
    }
    setSnackbarAppear() {
        this.setSlotName();
        this.executeTransition('start');
    }
    // 📌cant execute this method becoz dom of transition not render
    // 📌must call from modal becoz the modal has slot observer. its accessible this method when slot change
    executeTransition(when) {
        if (!this.transitionRef?.value)
            return;
        this.transitionRef.value.setTransition(when);
    }
};
Snackbar.styles = css `
    .snackbar {
      display: inline-flex;
      align-items: center;
      column-gap: 12px;
      background-color: var(--white);
      padding: var(--base-size-12);
      border-radius: var(--base-size-12);
    }
  `;
Snackbar = __decorate([
    customElement(tagName),
    __metadata("design:paramtypes", [])
], Snackbar);
export { Snackbar };
