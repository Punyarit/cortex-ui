import { ObserveTypes } from './types/observerElement.types';

export function observeElement<T extends HTMLElement>(watch: { target: T } & ObserveTypes) {
  const config: Record<'attributes' | 'characterData' | 'childList' | string, boolean> = {};
  for (const changed in watch) {
    config[changed] = true;
  }
  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (config[mutation.type] && watch[mutation.type]) watch[mutation.type]?.(mutation, observer);
    }
  });
  observer.observe(watch.target, config);
}
