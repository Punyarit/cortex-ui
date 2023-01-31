import {SizeTypes} from '../../../../types/sizes.type';
import {ButtonFactoryHeight} from '../../types/button.factory.types';

export default class ConcreteButtonSize implements ButtonFactoryHeight {
  height!: SizeTypes;
  width!: SizeTypes;
}
