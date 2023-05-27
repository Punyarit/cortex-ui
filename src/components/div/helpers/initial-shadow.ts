export class InitialShadow {
  static init(div: CXDiv.Ref) {
    if (!div.shadowRoot) {
      // create shadow root
      const shadowRoot = div.attachShadow({ mode: 'open' });
      div.styleElement = document.createElement('style');
      // 📌need to start with display:none
      // coz need to disable the element before styling (imagine if start with text node. the text node will display before styling. that we unexpected it)
      div.styleElement.textContent = ':host{display:none;}';
      const slot = document.createElement('slot');
      shadowRoot.appendChild(div.styleElement);
      shadowRoot.appendChild(slot);
    }
  }
}
