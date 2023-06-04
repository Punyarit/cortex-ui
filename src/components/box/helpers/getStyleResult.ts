import { stylesMapper } from '../styles-mapper/styles-mapper';
import { getStyleCaseResult } from './getStyleCaseResult';

export const getStyleResult = (style: string): string => {
  // @ts-ignore
  let styleResult = stylesMapper[style];
  if (!styleResult) {
    const [attr1, attr2, attr3, attr4, attr5, attr6] = style.split('-') as [
      string,
      string,
      string | undefined,
      string | undefined,
      string | undefined,
      string | undefined
    ];
    styleResult = getStyleCaseResult(style, attr1, attr2, attr3, attr4, attr5, attr6);
  }
  return styleResult!;
};
