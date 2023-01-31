import ConcreteButtonColors from '../../concretes/colors.concrete';

export default class ConcreteSecondaryOUtlineError extends ConcreteButtonColors {
  constructor() {
    super();
    this.textColor = 'error-700';
    this.textActiveColor = 'error-700';
    this.textHoverColor = 'error-700';
    this.textDisabledColor = 'error-300';
    this.backgroundColor = 'white';
    this.disabledColor = 'white';
    this.hoverColor = 'error-50';
    this.activeColor = 'error-100';
    this.outlineColor = 'error-100';
    this.borderColor = 'error-300';
    this.borderDisabledColor = 'error-200';
    this.borderWidth = 'size-1';
    this.textDisabledColor = 'error-300';
    this.boxShadow = 'shadow-300';
  }
}
