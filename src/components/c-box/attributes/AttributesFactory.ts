import { checkCBoxclosest } from '../../../helpers/check-component-closest';
import { PopoverCloseButtonErrorText } from '../errors/popover-close-button-error-text';
import { AttributeChngedType, UtilsAttributeType } from '../types/attribute-changed.types';

export class AttributeFactory {
  static async construct(box: CBox.Ref, attr: AttributeChngedType, value: unknown) {
    switch (attr) {
      case 'popover-close-button':
        checkCBoxclosest(box, `cx-popover`, PopoverCloseButtonErrorText);
        return (await import('./popover/PopoverCloseButton')).POpoverCloseButton.init(box);

      case 'icon-prefix':
        (await import('./icon/IconPrefix')).IconPrefix.init(box, value as CXIcon.Set['src']);
        break;

      case 'icon-suffix':
        (await import('./icon/iconSuffix')).IconSuffix.init(box, value as CXIcon.Set['src']);
        break;

      case 'icon-color':
        (await import('./icon/IconColor')).IconColor.init(box, value as CXIcon.Set['src']);
        break;

      case 'icon-size':
        (await import('./icon/iconSize')).IconSize.init(box, value as CXIcon.Set['src']);
        break;

      case 'bgColor':
      case 'color':
      case 'col-gap':
      case 'row-gap':
      case 'h':
      case 'w':
      case 'm':
      case 'ml':
      case 'mt':
      case 'mr':
      case 'mb':
      case 'mx':
      case 'my':
      case 'p':
      case 'pl':
      case 'pt':
      case 'pr':
      case 'pb':
      case 'px':
      case 'py':
        (await import('./utils/UtilAttribute')).UtilAttributes.init(
          box,
          attr as UtilsAttributeType,
          value as string
        );
        break;

      default:
        break;
    }
  }
}
