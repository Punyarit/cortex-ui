import { stylesMapper } from '../styles-mapper/styles-mapper';
import { StyleStates } from '../types/c-box.types';

export class StylesAnimate {
  static animate(box: CBox.Ref, value: string[], state?: StyleStates) {
    const val = value.slice(0, value.length - 1);

    const rules = [];
    for (let index = 0; index < val.length; index++) {
      const [keyframe, styles] = val[index].split(':');
      const cssText = this.createCssText(styles);
      rules[index] = `${keyframe}{${cssText}}`;
    }

    if (state) {
      box.uiAnimateStates ||= {};
      box.uiAnimateStates[state] = `@keyframes ui-animate-${state}{${rules.join('')}}:host${
        state ? `(:${state})` : ''
      }{animation: ui-animate-${state} ${value[value.length - 1]};}`;
    } else {
      box.uiAnimate = `@keyframes ui-animate{${rules.join('')}}:host{animation: ui-animate ${
        value[value.length - 1]
      };}`;
    }

    box.updateStyles();
  }

  static createCssText(styleValue: string): string {
    return styleValue
      .split(' ')
      .filter(Boolean)
      .map((s) => {
        const styleProp = stylesMapper.get(`c-box[${s.replace('!', '').trim()}]`);
        return styleProp ? `${styleProp}${s.endsWith('!') ? '!important' : ''};` : '';
      })
      .join('');
  }
}
