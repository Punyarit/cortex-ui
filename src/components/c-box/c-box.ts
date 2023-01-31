import {IconSrcTypes} from '../icon/types/icon.types';
import EventFactory from './factory/events.factory';
import {DxDivTypes} from './types/c-box.types';
import {
  eventAttributes,
  EventAttributes,
  EventStrategy,
} from './types/event-straegy';
export const tagName = 'c-box';

export class CxDiv extends HTMLElement {
  #eventStrategy?: EventStrategy;

  static get observedAttributes() {
    return eventAttributes;
  }

  async attributeChangedCallback(
    event: EventAttributes,
    oldValue: string,
    newValue: string | 'none'
  ) {
    // 📌"none" mean that event dont need to execute.
    if (newValue === 'none') return;
    this.#eventStrategy = await EventFactory.getEventDetail(
      this,
      event,
      newValue
    );
  }

  eventDetail(): EventStrategy | undefined {
    return this.#eventStrategy?.eventDetail();
  }

  // 📌call when c-box is destroyed
  disconnectedCallback() {
    if (!this.#eventStrategy) return;

    const eventDetail = this.eventDetail();
    if (!eventDetail) return;
    for (const event of eventDetail.events) {
      this.removeEventListener(event, eventDetail[event] as () => void);
    }
  }
}
customElements.define(tagName, CxDiv);

declare global {
  namespace CXDiv {
    type Ref = CxDiv | DxDivTypes;

    /**
     * @type ClickSnackbar [Tuple]
     * @index 0: IconSrcTypes [Icon Sources]
     * @index 1: String [Message]
     * @index 2: Number [Duration]
     */
    type ClickSnackbar = [IconSrcTypes, string, number];

    /**
     * @type ClickDialog [Tuple]
     * @index 0: String [Dialog Name]
     * @index 1: "open" | "close" [Dialog Status]
     */
    type ClickDialog = [string, 'open' | 'close'];
  }

  namespace JSX {
    interface IntrinsicElements {
      [tagName]:
        | React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
          >
        | DxDivTypes;
    }
  }

  interface HTMLElementTagNameMap {
    [tagName]: CXDiv.Ref;
  }
}
