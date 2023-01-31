import { ButtonFactoryColors } from '../../types/button.factory.types';
import PrimaryFactory from './primary.factory';
import SecondaryOutlineFactory from './secondary-outline.factory';
import SecondaryFactory from './secondary.factory';
import TertiaryFactory from './tertiary.factory';

export default class ButtonColorsFactory {
  static getColorsByType(type?: CXButton.Set['type'], color?: CXButton.Set['color']): ButtonFactoryColors | undefined {
    if (type === 'primary') {
      return PrimaryFactory.getColors(color);
    } else if (type === 'secondary-outline') {
      return SecondaryOutlineFactory.getColors(color);
    } else if (type === 'secondary') {
      return SecondaryFactory.getColors(color);
    } else if (type === 'tertiary') {
      return TertiaryFactory.getColors(color);
    }
  }
}
