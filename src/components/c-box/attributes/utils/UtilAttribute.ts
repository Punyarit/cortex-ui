import { UtilsAttributeType } from '../../types/attribute-changed.types';

export class UtilAttributes {
  static init(box: CBox.Ref, attr: UtilsAttributeType, value: string) {
    box.style.setProperty(`--${attr}`, `var(--size-${value})`);
  }
}
