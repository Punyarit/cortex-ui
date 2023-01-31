import ConcreteButtonColors from '../../concretes/colors.concrete';

export default class ConcreteSecondary extends ConcreteButtonColors {
  constructor() {
    super();
    this.textColor = 'primary-700';
    this.textActiveColor = 'primary-700';
    this.textHoverColor = 'primary-700';
    this.textDisabledColor = 'primary-300';
    this.backgroundColor = 'primary-50';
    this.disabledColor = 'primary-25';
    this.hoverColor = 'primary-100';
    this.activeColor = 'primary-200';
    this.outlineColor = 'primary-100';
    this.borderColor = 'primary-500';
    this.borderDisabledColor = 'primary-500';
    this.borderWidth = 'size-0';
    this.textDisabledColor = 'primary-300';
    this.boxShadow = 'shadow-300';
  }
}
