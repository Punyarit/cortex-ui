import type ConcreteButtonColors from '../concretes/colors.concrete';
import ConcreteSecondary from '../values/colors/secondary.concrete';
import ConcreteSecondaryError from '../values/colors/secondary.error.concrete';

export default class SecondaryFactory {
  static getColors(color?: CXButton.Set['color']): ConcreteButtonColors | undefined {
    if (color === 'primary') {
      return new ConcreteSecondary();
    } else if (color === 'error') {
      return new ConcreteSecondaryError();
    }
  }
}
