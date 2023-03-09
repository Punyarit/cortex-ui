import { stylesMapper } from '../../styles-mapper/styles-mapper';

export class UI {
  static init(box: CBox.Ref, value: string) {
    const [uiName, styles] = value?.split(':');
    if (!uiName || !styles) return;

    // get styles
    let styleText = ``;
    for (const style of styles?.split(' ')) {
      style &&
        (styleText = styleText.concat(stylesMapper.get(`c-box[${style.trim()}]`) + '!important;'));
    }

    // open shadow root
    const shadowRoot = box.attachShadow({ mode: 'open' });

    // append style
    const shadowStyle = document.createElement('style');
    shadowRoot.appendChild(shadowStyle);
    const styleSheet = shadowRoot.styleSheets[0];
    styleSheet.insertRule(`:host([ui='${uiName}']){${styleText}}`);

    // append slot
    const slot = document.createElement('slot');
    shadowRoot.appendChild(slot);

    // set attribute
    box.setAttribute('ui', uiName);
  }
}
