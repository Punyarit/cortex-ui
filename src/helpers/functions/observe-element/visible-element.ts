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
