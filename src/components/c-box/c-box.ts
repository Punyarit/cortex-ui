import { attributeChnged, AttributeChngedType } from './types/attribute-changed.types';
import { CBoxName } from './types/c-box.name';
import { CBoxTypes } from './types/c-box.types';

export class Box extends HTMLElement {
  static get observedAttributes() {
    return attributeChnged;
  }

  async attributeChangedCallback(attr: AttributeChngedType) {
    if (attr === 'popover-close-button')
      return new (await import('./attributes/PopoverCloseButton')).POpoverCloseButton(this);
  }
}
customElements.define(CBoxName, Box);

declare global {
  namespace CBox {
    type Ref = Box;

  }

  namespace JSX {
    interface IntrinsicElements {
      [CBoxName]:
        | React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
        | CBoxTypes;
    }
  }

  interface HTMLElementTagNameMap {
    [CBoxName]: CBox.Ref;
  }
}
