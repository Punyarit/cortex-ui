import ConcreteButtonSize from '../../concretes/sizes.concrete';

export default class ConcreteSmall extends ConcreteButtonSize {
  constructor() {
    super();
    this.height = 'size-36';
    this.width = 'size-128';
  }
}
