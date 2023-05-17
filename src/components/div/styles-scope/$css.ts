import { InitialShadow } from '../helpers/initial-shadow'
import { StyleStates } from '../types/c-div.types';

export class StylesCss {
  static async scope(div: CXDiv.Ref, value: Record<string, string | number>, state?: StyleStates) {
    InitialShadow.init(div);

    if (state === 'toggle') {
      (await import('../helpers/toggle-event')).StyleToggle.handle(div, 'css');
    }
    div.cssTextMap ||= {};

    const cssTextResult = this.generateCssTextResult(value);

    div.cssTextMap[state || 'default'] = `:host${
      state === 'toggle' ? '([css-toggle])' : state ? `(:${state})` : ''
    }{${cssTextResult}}`;

    div.cssTextResult = Object.values(div.cssTextMap).join('');
    div.updateStyles();
  }

  static generateCssTextResult(value: Record<string, string | number>): string {
    return Object.entries(value).reduce((acc, [key, value]) => {
      if (value) {
        acc += `${key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()}:${value};`;
      }
      return acc;
    }, '');
  }
}
