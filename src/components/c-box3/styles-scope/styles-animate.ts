import { stylesMapper } from '../styles-mapper/styles-mapper';

export class StylesAnimate {
  static animate(box: CBox.Ref, value: string[]) {
    const val = value.slice(0, value.length - 1);

    const rules = [];
    for (let index = 0; index < val.length; index++) {
      const [keyframe, styles] = val[index].split(':');
      const cssText = this.createCssText(styles);
      rules[index] = `${keyframe}{${cssText}}`;
    }

    box.uiAnimate = `@keyframes ui-animate{${rules.join('')}}:host{animation: ui-animate ${
      value[value.length - 1]
    };}`;
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
