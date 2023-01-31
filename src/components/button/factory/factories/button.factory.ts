import ButtonColorsFactory from './button-colors.factory';
import ButtonSizeFactory from './button-sizes.factory';

export default class ButtonFactory {
  static getCSSVariables(config?: Partial<CXButton.Set>): Partial<CXButton.Var> | undefined {
    return {
      ...ButtonFactory.getColor(config),
      ...ButtonFactory.getSize(config),
    };
  }

  static getColor(config?: Partial<CXButton.Set>): Partial<CXButton.Var> | undefined {
    return ButtonColorsFactory.getColorsByType(config?.type, config?.color);
  }

  static getSize(config?: Partial<CXButton.Set>): Partial<CXButton.Var> | undefined {
    return ButtonSizeFactory.getSize(config?.size);
  }
}
