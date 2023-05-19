export class InitialShadow {
  static init(div: CXDiv.Ref) {
    if (!div.shadowRoot) {
      // create shadow root
      const shadowRoot = div.attachShadow({ mode: 'open' });
      div.styleElement = document.createElement('style');
      div.styleElement.textContent = ':host{display:none;}';
      const slot = document.createElement('slot');
      shadowRoot.appendChild(div.styleElement);
      shadowRoot.appendChild(slot);
    }
  }
}
