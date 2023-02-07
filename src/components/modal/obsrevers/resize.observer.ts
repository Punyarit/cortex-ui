export const resizeObserver = (target: HTMLElement, callback: any) => {
  const observer = new ResizeObserver(([entry]) => callback(entry));
  observer.observe(target);
  return observer;
};