export let resizeEntry: ResizeObserverEntry | null = null;

export const resizeObserver = new ResizeObserver(([entry]) => {
  resizeEntry = entry;
  console.log('resize.observer |resizeEntry|', resizeEntry);
});
