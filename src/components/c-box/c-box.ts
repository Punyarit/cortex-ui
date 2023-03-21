import {
  attributeChanged as attributeChanged,
  AttributeChangedType,
} from './types/attribute-changed.types';
import { CBoxName } from './types/c-box.name';
import { CBoxTypes } from './types/c-box.types';
export class Box extends HTMLElement {
  static get observedAttributes() {
    return attributeChanged;
  }

  async attributeChangedCallback(attr: AttributeChangedType, oldValue: string, newValue: string) {
    if (!newValue) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          (await import('./attributes/AttributesFactory')).AttributeFactory.construct(
            this,
            attr,
            newValue
          );
        }
      });
    });
    observer.observe(this as HTMLElement);
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
