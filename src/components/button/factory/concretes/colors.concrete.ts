import {ColorTypes} from '../../../../types/colors.type';
import {SizeTypes} from '../../../../types/sizes.type';
import {ButtonFactoryColors} from '../../types/button.factory.types';

export default class ConcreteButtonColors implements ButtonFactoryColors {
  textColor!: ColorTypes;
  textHoverColor!: ColorTypes;
  textActiveColor!: ColorTypes;
  textDisabledColor!: ColorTypes;
  backgroundColor!: ColorTypes;
  disabledColor!: ColorTypes;
  hoverColor!: ColorTypes;
  activeColor!: ColorTypes;
  outlineColor!: ColorTypes;
  borderColor!: ColorTypes;
  borderDisabledColor!: ColorTypes;
  borderWidth!: SizeTypes;
  boxShadow!: ColorTypes;
}
