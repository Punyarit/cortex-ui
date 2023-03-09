import { stylesMapper } from '../../styles-mapper/styles-mapper';

export class UI {
  static init(box: CBox.Ref, value: string) {
    if (!value) return;

    const styles = value.split(',').map((style) => style.trim());
    const shadowRoot = box.attachShadow({ mode: 'open' });

    const shadowStyle = document.createElement('style');
    shadowRoot.appendChild(shadowStyle);

    const slot = document.createElement('slot');
    shadowRoot.appendChild(slot);

    for (const style of styles) {
      const [uiName, uiStyle] = style.split(':').map((s) => s.trim());

      if (uiName && uiStyle) {
        let styleText = uiStyle
          .split(' ')
          .filter((s) => s)
          .map((s) => {
            const styleProp = stylesMapper.get(`c-box[${s.replace('!', '').trim()}]`);
            if (!styleProp) return '';
            return `${styleProp}${s.endsWith('!') ? '!important' : ''};`;
          })
          .join('');

        if (styleText) {
          const styleSheet = shadowRoot.styleSheets[0];
          styleSheet.insertRule(`:host([_ui~='${uiName}']){${styleText}}`, 0);
        }
      }
    }

    box.setAttribute('_ui', styles.map((s) => s.split(':')[0].trim()).join(' '));
    box.removeAttribute('ui');
  }
}
