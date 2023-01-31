import type ConcreteButtonColors from '../concretes/colors.concrete';
import ConcreteSecondaryOUtline from '../values/colors/secondary-outline.concrete';
import ConcreteSecondaryOUtlineError from '../values/colors/secondary-outline.error.concrete';

export default class SecondaryOutlineFactory {
  static getColors(color?: CXButton.Set['color']): ConcreteButtonColors | undefined {
    if (color === 'primary') {
      return new ConcreteSecondaryOUtline();
    } else if (color === 'error') {
      return new ConcreteSecondaryOUtlineError();
    }
  }
}
