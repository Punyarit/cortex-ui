export function getStyleResult(
  selector: string,
  cssObj: {
    [key: string]: string;
  },
  mediaSelector?: string
) {
  mediaSelector ||= selector;
  return `${mediaSelector[0] === '.' ? `:host(${mediaSelector})` : mediaSelector}{${
    cssObj[selector]
  }}${selector.startsWith('@media') ? '}' : ''}`;
}
