import ConcreteButtonColors from '../../concretes/colors.concrete';

export default class ConcreteSecondaryError extends ConcreteButtonColors {
  constructor() {
    super();
    this.textColor = 'error-700';
    this.textActiveColor = 'error-700';
    this.textHoverColor = 'error-700';
    this.textDisabledColor = 'error-300';
    this.backgroundColor = 'error-50';
    this.disabledColor = 'error-25';
    this.hoverColor = 'error-100';
    this.activeColor = 'error-200';
    this.outlineColor = 'error-100';
    this.borderColor = 'error-500';
    this.borderDisabledColor = 'error-500';
    this.borderWidth = 'size-0';
    this.textDisabledColor = 'error-300';
    this.boxShadow = 'shadow-300';
  }
}
