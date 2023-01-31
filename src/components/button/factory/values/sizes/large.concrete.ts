import ConcreteButtonSize from '../../concretes/sizes.concrete';

export default class ConcreteLarge extends ConcreteButtonSize {
  constructor() {
    super();
    this.height = 'size-48';
    this.width = 'size-146';
  }
}
