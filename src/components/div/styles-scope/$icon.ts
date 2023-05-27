import { InitialShadow } from '../helpers/initial-shadow';
import { stylesMapper } from '../styles-mapper/styles-mapper';
import { StyleStates } from '../types/c-div.types';

export class StylesIcon {
  static async scope(value: string | string[], box: CXDiv.Ref, state?: StyleStates) {

    box.iconMap ||= {};

    let styles: string[];
    if (typeof value === 'string') {
      styles = value?.split(',')?.map((style) => style.trim());
    } else if (Array.isArray(value)) {
      styles = value;
    } else {
      throw SyntaxError('Icon properties can only have a type of string or string[].');
    }
    if (state === 'toggle') {
      (await import('../helpers/toggle-event')).StyleToggle.handle(box, 'icon');
    }

    const iconStyles = [];
    // create dynamic style
    for (let index = 0; index < styles.length; ++index) {
      const [iconName, styleValue] = styles[index].split(':').map((s) => s.trim());
      const styleIcon = styleValue || iconName;
      if (iconName && styleIcon) {
        let iconSide = 'before';
        const cssText = styleIcon
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
            const styleProp = stylesMapper.get(`c-div[${s.replace('!', '').trim()}]`);
            return styleProp ? `${styleProp}${s.endsWith('!') ? '!important' : ''};` : '';
          })
          .join('');

        iconStyles[index] = `:host${
          state === 'toggle' ? '([icon-toggle])' : state ? `(:${state})` : ''
        }::${iconSide}{${styleValue ? `content: '\uE800';font-family: ${iconName};` : ``}${cssText}}`;
      }
    }
    box.iconMap[state || 'icon'] = iconStyles.join(' ');

    box.iconCSSResult = box.iconMap ? Object.values(box.iconMap).join('') : '';
    box.updateStyles();
  }
}
