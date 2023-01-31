import ConcreteButtonColors from '../../concretes/colors.concrete';

export default class ConcretePrimary extends ConcreteButtonColors {
  constructor() {
    super();
    this.textColor = 'white';
    this.textActiveColor = 'white';
    this.textDisabledColor = 'white';
    this.textHoverColor = 'white';
    this.backgroundColor = 'primary-500';
    this.disabledColor = 'primary-200';
    this.hoverColor = 'primary-600';
    this.activeColor = 'primary-700';
    this.outlineColor = 'primary-200';
    this.borderColor = 'primary-500';
    this.borderDisabledColor = 'primary-500';
    this.borderWidth = 'size-0';
    this.textDisabledColor = 'white';
    this.boxShadow = 'shadow-500';
  }
}
