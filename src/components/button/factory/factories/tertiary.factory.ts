import type ConcreteButtonColors from '../concretes/colors.concrete';
import ConcreteTertiary from '../values/colors/tertiary.concrete';
import ConcreteTertiaryError from '../values/colors/tertiary.error.concrete';

export default class TertiaryFactory {
  static getColors(color?: CXButton.Set['color']): ConcreteButtonColors | undefined {
    if (color === 'primary') {
      return new ConcreteTertiary();
    } else if (color === 'error') {
      return new ConcreteTertiaryError();
    }
  }
}
