export const appendSlot = (box: HTMLElement, slotName: string) => {
  const slot = document.createElement('slot');
  slot.name = slotName;
  box.shadowRoot?.appendChild(slot);
};
