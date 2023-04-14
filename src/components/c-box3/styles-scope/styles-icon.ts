import { stylesMapper } from '../styles-mapper/styles-mapper';
import { StyleStates } from '../types/c-box.types';

export class StylesIcon {
  static async scope(value: string | string[], box: CBox.Ref, state?: StyleStates) {
    box.iconStyles ||= {};

    let styles: string[];
    if (typeof value === 'string') {
      styles = value?.split(',')?.map((style) => style.trim());
    } else if (Array.isArray(value)) {
      styles = value;
    } else {
      throw SyntaxError('Icon properties can only have a type of string or string[].');
    }
    if (state === 'toggle') {
      (await import('../toggle-handler/icon-toggle')).IconToggle.handle(box);
    }

    const iconStyles = [];
    // create dynamic style
    for (let index = 0; index < styles.length; ++index) {
      const [iconName, style] = styles[index].split(':').map((s) => s.trim());
      if (iconName && style) {
        let iconSide = 'before';
        const cssText = style
          .split(' ')
          .filter((s) => {
            if (s === 'before' || s === 'after') {
              iconSide = s;
              return false;
            } else {
              return Boolean(s);
            }
          })
          .map((s) => {
            const styleProp = stylesMapper.get(`c-box[${s.replace('!', '').trim()}]`);
            return styleProp ? `${styleProp}${s.endsWith('!') ? '!important' : ''};` : '';
          })
          .join('');

        iconStyles[index] = `:host${
          state && state !== 'toggle' ? `(:${state})` : ``
        }::${iconSide}{content: ${
          state === 'toggle' ? `attr(icon-toggle-value)` : `'\uE800'`
        };font-family: ${iconName};${cssText}}`;
      }
    }
    box.iconStyles[state || 'icon'] = iconStyles.join(' ');

    box.updateStyles();
  }
}
