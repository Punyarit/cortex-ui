import type ConcreteButtonSize from '../concretes/sizes.concrete';
import ConcreteLarge from '../values/sizes/large.concrete';
import ConcreteMedium from '../values/sizes/medium.concrete';
import ConcreteSmall from '../values/sizes/small.concrete';

export default class ButtonSizeFactory {
  static getSize(size?: CXButton.Set['size']): ConcreteButtonSize | undefined {
    if (size === 'large') {
      return new ConcreteLarge();
    } else if (size === 'medium') {
      return new ConcreteMedium();
    } else if (size === 'small') {
      return new ConcreteSmall();
    }
  }
}
