import { CxGlobalDialogName } from '../../helpers/types/useCxDialog.types';
import { IconSrcTypes } from '../icon/types/icon.types';
import { AbilityFactory } from './attributes.factory';
import EventFactory from './factory/events.factory';
import { CBoxName } from './types/c-box.name'
import { DxDivTypes } from './types/c-box.types';
import {
  eventAttributes,
  EventAttributes,
  eventAttributesSet,
  EventStrategy,
} from './types/event-straegy';
import { StyleAttributes } from './types/style-builder';

export class Box extends HTMLElement {
  // #eventStrategy?: EventStrategy;

  static get observedAttributes() {
    return ['cx-popover'];
  }

  async attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
    if (!attr) return;
    new AbilityFactory(this, attr, newValue);

    // 📌"none" mean that event dont need to execute.
    // if (newValue === 'none') return;
    // if (eventAttributesSet.has(attr as EventAttributes)) {
    //   this.#eventStrategy = await EventFactory.getEventDetail(
    //     this,
    //     attr as EventAttributes,
    //     newValue
    //   );
    // } else {
    // }
  }

  // eventDetail(): EventStrategy | undefined {
  //   return this.#eventStrategy?.eventDetail();
  // }

  // 📌call when c-box is destroyed
  disconnectedCallback() {
    // if (!this.#eventStrategy) return;
    // const eventDetail = this.eventDetail();
    // if (!eventDetail) return;
    // for (const event of eventDetail.events) {
    //   this.removeEventListener(event, eventDetail[event] as () => void);
    // }
  }
}
customElements.define(CBoxName, Box);

declare global {
  namespace CBox {
    type Ref = Box;

    type CXPopover = 'arrowpoint' | 'closebutton';
    // example dialog
    // type Dialog<DialogName extends string> = `open-${DialogName}-dialog`;

    // /**
    //  * @type ClickSnackbar [Tuple]
    //  * @index 0: IconSrcTypes [Icon Sources]
    //  * @index 1: String [Message]
    //  * @index 2: Number [Duration]
    //  */
    // type ClickSnackbar = [IconSrcTypes, string, number];

    // /**
    //  * @type ClickDialog [Tuple]
    //  * @index 0: String [Dialog Name]
    //  * @index 1: "open" | "close" [Dialog Status]
    //  */
    // type ClickDialog = [CxGlobalDialogName, 'open' | 'close'];
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
