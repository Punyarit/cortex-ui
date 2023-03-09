import { checkCBoxclosest } from '../../../helpers/check-component-closest';
import { PopoverCloseButtonErrorText } from '../errors/popover-close-button-error-text';
import { stylesMapper } from '../styles-mapper/styles-mapper';
import { AttributeChangedType, CBoxWithToggle } from '../types/attribute-changed.types';

export class AttributeFactory {
  static async construct(box: CBox.Ref, attr: AttributeChangedType, value: string) {
    switch (attr) {
      case 'ui':
        (await import('./ui/Ui.attribute')).UI.init(box, value);
        break;

      case 'popover-close-button':
        checkCBoxclosest(box, `cx-popover`, PopoverCloseButtonErrorText);
        (await import('./popover/PopoverCloseButton')).POpoverCloseButton.init(box);
        break;

      case 'left':
      case 'top':
      case 'right':
      case 'bottom':
        (await import('./CSSProperty/SizeVariableAttribute')).SizeVariableAttribute.init(
          box,
          attr,
          value as string
        );
        break;

      case 'display':
      case 'icon-suffix-hover':
      case 'icon-prefix-hover':
      case 'icon-suffix':
      case 'icon-prefix':
        if (value === 'none') break;
        (await import('./CSSProperty/ValueAttribute')).ValueAttribute.init(box, attr, value);
        break;

      case 'icon-prefix-color-hover':
      case 'icon-prefix-color':
      case 'icon-suffix-color':
      case 'icon-suffix-color-hover':
      case 'icon-prefix-size':
      case 'icon-suffix-size':
      case 'icon-prefix-size-hover':
      case 'icon-suffix-size-hover':
        if (value === 'none') break;
        (await import('./CSSProperty/SizeVariableAttribute')).SizeVariableAttribute.init(
          box,
          attr,
          value as CXIcon.Set['src']
        );
        break;

      case 'bg-toggle':
      case 'tx-toggle':
        (await import('./toggle/toggle.attribute')).ToggleAttribute.init(
          box as CBoxWithToggle,
          attr,
          value
        );
        break;

      case 'bg-color':
      case 'tx-color':
      case 'bg-active':
      case 'tx-active':
      case 'bg-hover':
      case 'tx-hover':
      case 'bg-focus':
      case 'tx-focus':
        (await import('./CSSProperty/VariableAttribute')).VariableAttribute.init(box, attr, value);
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
        (await import('./CSSProperty/SizeVariableAttribute')).SizeVariableAttribute.init(
          box,
          attr,
          value
        );
        break;

      default:
        break;
    }
  }
}
