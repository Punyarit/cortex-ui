export function delay(time: number): Promise<boolean> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve(true);
    }, time);
  });
}
