import { stylesMapper } from '../../c-box/styles-mapper/styles-mapper';
import { UiStyleText } from '../c-box2';
import { uiStateTexts, UiStateTexts, UiStateType } from '../types/attribute-changed.types';

export class UiStyle {
  static init(box: CBox2.Ref, value: string[], UiStateTexts: UiStateTexts, state?: UiStateType) {
    if (!value) return;
    if (!box[UiStateTexts]) {
      box[UiStateTexts] = {
        class: [],
        rule: [],
        style: [],
      } as UiStyleText;
    }

    for (let index = 0; index < value.length; ++index) {
      const [className, style] = value[index].split(':').map((s) => s.trim());

      if (className && style) {
        const cssText = style
          .split(' ')
          .filter(Boolean)
          .map((s) => {
            const styleProp = stylesMapper.get(`c-box[${s.replace('!', '').trim()}]`);
            return styleProp ? `${styleProp}${s?.endsWith('!') ? '!important' : ''};` : '';
          })
          .join('');

        box[UiStateTexts]!.class[index] = className;
        box[UiStateTexts]!.style[index] = cssText;
        box[UiStateTexts]!.rule[index] = `:host(.${className}${
          state ? `:${state}` : ''
        }){${cssText}}`;
      }
    }

    let classNames = '';

    for (const key of uiStateTexts) {
      if (box[key] !== undefined) {
        // @ts-ignore
        classNames += (classNames ? ' ' : '') + box[key].class.join(' ');
      }
    }
    box.className = classNames;

    box.requestUpdate();
  }
}
