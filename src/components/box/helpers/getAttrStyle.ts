import { AttrStyle } from '../types/box.types';

export const getAttrStyle = (attr: AttrStyle) => {
  if (!attr) return;
  switch (attr) {
    case 'active':
    case 'focus':
    case 'focus-visible':
    case 'focus-within':
    case 'hover':
    case 'target':
      return `:${attr}`;
    case 'xs':
      return `@media only screen and (max-width: 599px)`;
    case 'sm':
      return `@media only screen and (min-width: 600px) and (max-width: 959px)`;
    case 'md':
      return `@media only screen and (min-width: 960px) and (max-width: 1279px)`;
    case 'lg':
      return `@media only screen and (min-width: 1280x) and (max-width: 1919px)`;
    case 'xl':
      return `@media only screen and (min-width: 1920x) and (max-width: 2559px)`;
    case 'xxl':
      return `@media only screen and (min-width: 2560px)`;

    default:
      throw new SyntaxError('No style attr!');
  }
};
