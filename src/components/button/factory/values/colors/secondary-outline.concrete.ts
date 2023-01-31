import ConcreteButtonColors from '../../concretes/colors.concrete';

export default class ConcreteSecondaryOUtline extends ConcreteButtonColors {
  constructor() {
    super();
    this.textColor = 'gray-700';
    this.textActiveColor = 'gray-700';
    this.textHoverColor = 'gray-700';
    this.textDisabledColor = 'gray-700';
    this.backgroundColor = 'white';
    this.disabledColor = 'white';
    this.hoverColor = 'gray-50';
    this.activeColor = 'gray-100';
    this.outlineColor = 'gray-100';
    this.borderColor = 'gray-300';
    this.borderDisabledColor = 'gray-300';
    this.borderWidth = 'size-1';
    this.textDisabledColor = 'gray-300';
    this.boxShadow = 'shadow-300';
  }
}
