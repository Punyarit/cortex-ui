export function format({ x, y }: { x: number; y: number }) {
  const xValue = Math.floor(x);
  const yValue = Math.floor(y);
  return {
    x: xValue,
    y: yValue,
    translate: `${xValue}px ${yValue}px`,
  };
}
