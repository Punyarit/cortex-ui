import { InitialShadow } from '../helpers/initial-shadow';
import { stylesMapper } from '../styles-mapper/styles-mapper';
import { StyleStates } from '../types/c-div.types';

export class StylesAnimate {
  static async animate(box: CXDiv.Ref, value: string[], state?: StyleStates) {
    const val = value.slice(0, value.length - 1);

    if (state === 'toggle') {
      (await import('../helpers/toggle-event')).StyleToggle.handle(box, 'animate');
    }

    const rules = [];
    for (let index = 0; index < val.length; index++) {
      const [keyframe, styles] = val[index].split(':');
      const cssText = this.createCssText(styles);
      rules[index] = `${keyframe}{${cssText}}`;
    }

    box.animateMap ||= {};
    if (state) {
      box.animateMap[state] = `@keyframes ui-animate-${state}{${rules.join('')}}:host${
        state === 'toggle' ? '([animate-toggle])' : state ? `(:${state})` : ''
      }{animation: ui-animate-${state} ${value[value.length - 1]};}`;
    } else {
      box.animateMap.default = `@keyframes ui-animate{${rules.join(
        ''
      )}}:host{animation: ui-animate ${value[value.length - 1]};}`;
    }

    box.animateMapCSSResult = box.animateMap ? Object.values(box.animateMap).join('') : '';

    box.updateStyles();
  }

  static createCssText(styleValue: string): string {
    return styleValue
      .split(' ')
      .filter(Boolean)
      .map((s) => {
        const styleProp = stylesMapper.get(`c-div[${s.replace('!', '').trim()}]`);
        return styleProp ? `${styleProp}${s.endsWith('!') ? '!important' : ''};` : '';
      })
      .join('');
  }
}
