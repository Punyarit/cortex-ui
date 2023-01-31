export type ObserveCallback = (mutation: MutationRecord, observer: MutationObserver) => void;

export type ObserveTypes = {
  attributes?: ObserveCallback;
  childList?: ObserveCallback;
  characterData?: ObserveCallback;
};
