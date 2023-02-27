import { checkCBoxclosest } from '../../../helpers/check-component-closest';
import { PopoverCloseButtonErrorText } from '../errors/popover-close-button-error-text';
import { AttributeChangedType, UtilsAttributeType } from '../types/attribute-changed.types';

export class AttributeFactory {
  static async construct(box: CBox.Ref, attr: AttributeChangedType, value: unknown) {
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

      case 'bg-color':
      case 'tx-color':
      case 'bg-active':
      case 'tx-active':
      case 'bg-hover':
      case 'tx-hover':
      case 'bg-focus':
      case 'tx-focus':
        (await import('./utils/ColorUtilAttribute')).ColorUtilAttributes.init(
          box,
          attr as UtilsAttributeType,
          value as string
        );
        break;

      case 'col-gap':
      case 'row-gap':
      case 'h':
      case 'min-h':
      case 'max-h':
      case 'w':
      case 'min-w':
      case 'max-w':
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
        (await import('./utils/SizeUtilAttribute')).SizeUtilAttributes.init(
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
