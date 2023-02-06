export const getAsyncElement = <T extends HTMLElement>(
  QueryElementCallback: () => T
): Promise<T> => {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      resolve(QueryElementCallback());
    });
  });
};
