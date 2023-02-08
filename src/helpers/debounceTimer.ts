let debounceTimer: number;

export const debounce = (callback: Function, time: number) => {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(callback, time);
};
