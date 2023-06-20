import { Theme } from '../../theme/theme';
import { getSizeCaseResult } from './getSizeCaseResult';

export function getMediaScreen(media: string) {
  const [, screen] = media.split(':');
  const screenVal = Theme?.breakpoint?.[screen.slice(1)];
  if (!screenVal)
    throw new Error(`CX-THEME: "${screen}" breakpoint doesn't exist in Theme.breakpoint.`);
  let styleText: string[] = [];
  const screenValSplit = screenVal?.split('&&');
  for (let index = 0; index < screenValSplit.length; ++index) {
    const [attr1, attr2, attr3] = screenValSplit[index].trim().split('-');
    styleText[index] = `(${getSizeCaseResult(screenValSplit[index], attr1, attr2, attr3)})`;
  }

  return `@media only screen and ${styleText.join(' and ')}`;
}
