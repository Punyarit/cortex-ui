import { UtilsAttributeType } from '../../types/attribute-changed.types';

export class ColorUtilAttributes {
  static init(box: CBox.Ref, attr: UtilsAttributeType, value: string) {
    box.style.setProperty(`--${attr}`, `var(--${value})`);
  }
}
