import ConcreteButtonColors from '../../concretes/colors.concrete';

export default class ConcretePrimaryError extends ConcreteButtonColors {
  constructor() {
    super();
    this.textColor = 'white';
    this.textActiveColor = 'white';
    this.textHoverColor = 'white';
    this.textDisabledColor = 'white';
    this.backgroundColor = 'error-500';
    this.disabledColor = 'error-200';
    this.hoverColor = 'error-600';
    this.activeColor = 'error-700';
    this.outlineColor = 'error-200';
    this.borderColor = 'error-500';
    this.borderDisabledColor = 'error-500';
    this.borderWidth = 'size-0';
    this.textDisabledColor = 'white';
    this.boxShadow = 'shadow-500';
  }
}
