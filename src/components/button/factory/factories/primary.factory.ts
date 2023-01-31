import { ButtonFactoryColors } from '../../types/button.factory.types';
import ConcretePrimary from '../values/colors/primary.concrete';
import ConcretePrimaryError from '../values/colors/primary.error.concrete';

export default class PrimaryFactory {
  static getColors(color?: CXButton.Set['color']): ButtonFactoryColors | undefined {
    if (color === 'primary') {
      return new ConcretePrimary();
    } else if (color === 'error') {
      return new ConcretePrimaryError();
    }
  }
}
