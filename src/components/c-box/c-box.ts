import { componentNames, ComponentNameTypes } from '../../types/component.names';
import { REQUIRED_CXPOPOVER_PARENT } from './errors/required-cx-popover-parent';
import { CBoxName } from './types/c-box.name';
import { DxDivTypes } from './types/c-box.types';
import { CxPopoverAbilityAttrKey } from './types2/box.cx-popover.types';

export class Box extends HTMLElement {
  #firstUpdated = false;
  public attr?: ComponentNameTypes;
  public value?: string;

  static get observedAttributes() {
    return componentNames;
  }

  async attributeChangedCallback(attr: ComponentNameTypes, oldValue: unknown, newValue: string) {
    if (!attr) return;
    this.attr = attr;
    this.value = newValue;
  }

  async connectedCallback() {
    if (this.#firstUpdated) return;
    requestAnimationFrame(async () => {
      if (this.attr && this.value) {
        new (await import('./attributes.factory')).AbilityFactory(this, this.attr, this.value);
      }
    });

    this.#firstUpdated = true;
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
