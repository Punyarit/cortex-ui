import { stylesMapper } from '../styles-mapper/styles-mapper';
import { StyleStates, UiPseudoState } from '../types/c-box.types';

export class StylesPseudo {
  static async scope(
    value: string | string[],
    box: CBox.Ref,
    pseudo: 'before' | 'after',
    state?: StyleStates
  ) {
    let styles: string[];
    box[pseudo === 'before' ? 'uiBefore' : 'uiAfter'] ||= {};

    if (typeof value === 'string') {
      styles = value?.split(',')?.map((style) => style.trim());
    } else if (Array.isArray(value)) {
      styles = value;
    } else {
      throw SyntaxError('UI properties can only have a type of string or string[].');
    }

    if (state === 'toggle') {
      (await import('../styles-toggle/pseudo-toggle')).PseudoToggle.handle(box, pseudo);
    }

    // create dynamic style
    for (let index = 0; index < styles.length; ++index) {
      const [content, style] = styles[index].split(':').map((s) => s.trim());
      // style can be undefined *note if style = undefined that mean content is styles (ui-before="styles")
      const styleTexts = style || content;

      // content can be empty string ""
      if (styleTexts) {
        const cssText = styleTexts
          .split(' ')
          .filter(Boolean)
          .map((s) => {
            const styleProp = stylesMapper.get(`c-box[${s.replace('!', '').trim()}]`);
            return styleProp ? `${styleProp}${s.endsWith('!') ? '!important' : ''};` : '';
          })
          .join('');

        (box[pseudo === 'before' ? 'uiBefore' : 'uiAfter'] as UiPseudoState)[state || ''] = `:host${
          state === 'toggle' ? `([${pseudo}-toggle])` : state ? `(:${state})` : ''
        }::${pseudo}{content:'${style ? content : ''}';${cssText}}`;
      }
    }

    box.updateStyles();
  }
}
