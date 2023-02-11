import { ObserveCallback, ObserveTypes } from '../../types/observerElement.types';

export function observeElementManyTypes<T extends HTMLElement>(
  watch: { target: T } & ObserveTypes
) {
  const config: Record<'attributes' | 'characterData' | 'childList' | string, boolean> = {};
  for (const changed in watch) {
    config[changed] = true;
  }
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (config[mutation.type] && watch[mutation.type]) watch[mutation.type]?.(mutation, observer);
    }
  });
  observer.observe(watch.target, config);
}

export function mutableElement<T extends HTMLElement>(
  target: T,
  mutationType: MutationRecordType,
  callback: (mutationRecord: MutationRecord, mutationObserver: MutationObserver) => void,
  options?: MutationObserverInit
) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === mutationType) {
        callback(mutation, observer);
      }
    }
  });
  const config: MutationObserverInit = { [mutationType]: true, ...options };
  observer.observe(target, config);
}

export const visibleElement = (
  target: HTMLElement,
  callback: (
    entry: IntersectionObserverEntry,
    obsrever: IntersectionObserver,
    elementStatus: 'visible' | 'hidden'
  ) => void,
  options?: IntersectionObserverInit
) => {
  const obsrever = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry, obsrever, 'visible');
      } else {
        callback(entry, obsrever, 'hidden');
      }
    });
  }, options);

  obsrever.observe(target);
};
