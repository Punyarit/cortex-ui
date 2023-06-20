import { throwNoHaveStyle } from './throwNoHaveStyle';

export const getSizeCaseResult = (s: string, attr1: string, attr2: string, attr3?: string): any => {
  switch (attr1) {
    case 'w':
      return `width:${attr2}`;

    case 'min':
    case 'max':
      return `${attr1}-${
        attr2 === 'w' ? 'width' : attr2 === 'h' ? 'height' : throwNoHaveStyle(s)
      }:${attr3}`;

    case 'h':
      return `height:${attr2}`;

    default:
      throw new Error(
        `Unable to use "${s.trim()}" in Theme.breakpoint. Please only "w, h, max-w, max-h, min-w, min-h".`
      );
  }
};
