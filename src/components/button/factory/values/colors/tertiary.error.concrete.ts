import ConcreteButtonColors from '../../concretes/colors.concrete';

export default class ConcreteTertiaryError extends ConcreteButtonColors {
  constructor() {
    super();
    this.textColor = 'error-500';
    this.textHoverColor = 'error-600';
    this.textActiveColor = 'error-700';
    this.textDisabledColor = 'error-300';
    this.backgroundColor = 'error-50';
    this.disabledColor = 'white';
    this.hoverColor = 'white';
    this.activeColor = 'white';
    this.outlineColor = 'error-100';
    this.borderColor = 'white';
    this.borderDisabledColor = 'primary-500';
    this.borderWidth = 'size-0';
    this.textDisabledColor = 'error-300';
    this.boxShadow = 'shadow-200';
  }
}
