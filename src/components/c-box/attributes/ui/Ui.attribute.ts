import { stylesMapper } from '../../styles-mapper/styles-mapper';

export class UI {
  static init(box: CBox.Ref, value: string) {
    if (!value) return;

    const stylesGroup = value.split(',');
    let uiNames = '';
    // open shadow root
    const shadowRoot = box.attachShadow({ mode: 'open' });

    // append style
    const shadowStyle = document.createElement('style');
    shadowRoot.appendChild(shadowStyle);

    // append slot
    const slot = document.createElement('slot');
    shadowRoot.appendChild(slot);

    for (const styleInGroup of stylesGroup) {
      const [uiName, styles] = styleInGroup?.split(':');
      if (!uiName || !styles) return;
      uiNames = uiNames.concat(uiName);
      let styleText = ``;
      for (const style of styles?.split(' ')) {
        style && (styleText = styleText.concat(stylesMapper.get(`c-box[${style.trim()}]`) + ';'));
      }
      const styleSheet = shadowRoot.styleSheets[0];
      styleSheet.insertRule(`:host([_ui~='${uiName.trim()}']){${styleText}}`, 0);
    }

    box.setAttribute('_ui', uiNames);
    box.removeAttribute('ui');
  }
}
