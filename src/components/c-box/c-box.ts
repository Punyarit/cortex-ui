import { componentNames, ComponentNameTypes } from '../../types/component.names';
import { CBoxName } from './types/c-box.name';
import { DxDivTypes } from './types/c-box.types';
import { CxPopoverAbilityAttrKey } from './types2/box.cx-popover.types';

export class Box extends HTMLElement {
  private attr?: ComponentNameTypes;
  private value?: string;

  static get observedAttributes() {
    return componentNames;
  }

  async attributeChangedCallback(attr: ComponentNameTypes, oldValue: unknown, newValue: string) {
    if (!attr) return;
    this.attr = attr;
    this.value = newValue;
  }

  async connectedCallback() {
    requestAnimationFrame(async () => {
      if (this.attr && this.value) {
        new (await import('./attributes.factory')).AbilityFactory(this, this.attr, this.value);
      }
    });
  }
}
customElements.define(CBoxName, Box);

declare global {
  namespace CBox {
    type Ref = Box;

    type CXPopover = CxPopoverAbilityAttrKey;
  }

  namespace JSX {
    interface IntrinsicElements {
      [CBoxName]:
        | React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
        | DxDivTypes;
    }
  }

  interface HTMLElementTagNameMap {
    [CBoxName]: CBox.Ref;
  }
}
