import { ColorTypesV2 } from '../../../../types/colors.v2.type';
import { SizeTypes } from '../../../../types/sizes.type';
import { ButtonFactoryColors } from '../../types/button.factory.types';

export default class ConcreteButtonColors implements ButtonFactoryColors {
  textColor!: ColorTypesV2;
  textHoverColor!: ColorTypesV2;
  textActiveColor!: ColorTypesV2;
  textDisabledColor!: ColorTypesV2;
  backgroundColor!: ColorTypesV2;
  disabledColor!: ColorTypesV2;
  hoverColor!: ColorTypesV2;
  activeColor!: ColorTypesV2;
  outlineColor!: ColorTypesV2;
  borderColor!: ColorTypesV2;
  borderDisabledColor!: ColorTypesV2;
  borderWidth!: SizeTypes;
  boxShadow!: ColorTypesV2;
}
