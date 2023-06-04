import { getStyleResult } from './getStyleResult';
import { setStyleProperty } from './setStyleProperty';

export const getCssResult = (
  box: HTMLElement,
  styleValue: string,
  type: string,
  attr1?: string,
  attr2?: string
) => {
  return styleValue
    .split(' ')
    .filter(Boolean)
    .map((sx) => {
      if (sx.includes('$')) {
        const newSx = sx.replace('$', '');
        const [styleAttr, styleValue] = getStyleResult(newSx).split(':');
        const setterName = setStyleProperty(box, styleAttr, styleValue, type, attr1, attr2);
        return `${styleAttr}: var(--${setterName});`;
      }
      const styleResult = getStyleResult(sx);
      return styleResult ? `${styleResult};` : '';
    })
    .join('');
};
