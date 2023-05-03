export class InitialSlot {
  static setSlot(slots: string | string[], div: CXDiv.Ref) {
    if (!Array.isArray(slots)) {
      slots = slots.split(',');
    }

    for (const slotName of slots as string[]) {
      const slot = document.createElement('slot');
      slot.name = slotName;
      div.shadowRoot?.appendChild(slot);
    }
  }
}
