import ConcreteButtonColors from '../../concretes/colors.concrete';

export default class ConcreteTertiary extends ConcreteButtonColors {
  constructor() {
    super();
    this.textColor = 'gray-500';
    this.textHoverColor = 'gray-600';
    this.textActiveColor = 'gray-700';
    this.textDisabledColor = 'gray-300';
    this.backgroundColor = 'gray-50';
    this.disabledColor = 'white';
    this.hoverColor = 'white';
    this.activeColor = 'white';
    this.outlineColor = 'gray-100';
    this.borderColor = 'white';
    this.borderDisabledColor = 'primary-500';
    this.borderWidth = 'size-0';
    this.textDisabledColor = 'gray-300';
    this.boxShadow = 'shadow-200';
  }
}
