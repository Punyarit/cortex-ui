import { checkCBoxclosest as checkCBoxClosest } from '../../../helpers/check-component-closest';
import { PopoverCloseButtonErrorText } from '../errors/popover-close-button-error-text';
import { AttributeChangedType, CBoxUiAttribute } from '../types/attribute-changed.types';

export class AttributeFactory {
  static async construct(box: CBox.Ref, attr: AttributeChangedType, value: string) {
    if (value === 'value') {
      throw `The attribute "${attr}" should not be valued as "value".`;
    }

    // TODO:next toggle-group
    switch (attr) {
      // 📌Component ingredient
      case 'popover-close-button':
        checkCBoxClosest(box, `cx-popover`, PopoverCloseButtonErrorText);
        new (await import('./popover/PopoverCloseButton')).POpoverCloseButton(box).init();
        break;

      // done
      // 📌 UI Attributes
      case 'ui':
        new (await import('./ui/Ui.attribute')).UIAttribute(attr, box, value).init();
        break;

      // done
      // 📌 Apply styles when element is focused
      case 'ui-active':
        new (await import('./ui/UI.State.attribute')).UIStateAttribute(
          attr,
          box,
          value,
          'active'
        ).init();
        break;

      // done
      // 📌 Apply styles when element is focused
      case 'ui-focus':
        box.tabIndex = 0;
        new (await import('./ui/UI.State.attribute')).UIStateAttribute(
          attr,
          box,
          value,
          'focus'
        ).init();
        break;

      // done
      // 📌 Apply style when element is focused via keyboard or non-mouse interaction
      case 'ui-focus-visible':
        box.tabIndex = 0;
        new (await import('./ui/UI.State.attribute')).UIStateAttribute(
          attr,
          box,
          value,
          'focus-visible'
        ).init();
        break;

      // done
      //📌 Apply styles to the outer element (parent element) when the focus-element (child element) is focused
      case 'ui-focus-within':
        new (await import('./ui/UI.State.attribute')).UIStateAttribute(
          attr,
          box,
          value,
          'focus-within'
        ).init();
        break;

      // done
      case 'ui-hover':
        new (await import('./ui/UI.State.attribute')).UIStateAttribute(
          attr,
          box,
          value,
          'hover'
        ).init();
        break;

      // done
      case 'ui-target':
        new (await import('./ui/UI.State.attribute')).UIStateAttribute(
          attr,
          box,
          value,
          'target'
        ).init();
        break;

      // done
      case 'ui-toggle':
        new (await import('./ui/UI-Toggle.attribute')).UIToggleAttribute(
          attr,
          box as CBoxUiAttribute,
          value
        ).init();
        break;

      // done
      case 'border':
      case 'border-left':
      case 'border-top':
      case 'border-right':
      case 'border-bottom':
        if (value === 'none') return;
        new (await import('./CSSProperty/Border.attribute')).BorderAttribute(
          box,
          attr,
          value
        ).init();
        break;

      // done
      case 'tx':
        if (value === 'none') return;
        new (await import('./CSSProperty/TextAttribute')).TextAttribute(box, attr, value).init();
        break;

      // done
      case 'icon-prefix':
      case 'icon-suffix':
      case 'icon-prefix-active':
      case 'icon-suffix-active':
      case 'icon-prefix-focus-within':
      case 'icon-suffix-focus-within':
      case 'icon-prefix-hover':
      case 'icon-suffix-hover':
      case 'icon-prefix-target':
      case 'icon-suffix-target':
        new (await import('./CSSProperty/IconAttribute')).IconAttribute(box, attr, value).init();
        break;

      // done
      case 'icon-prefix-focus':
      case 'icon-suffix-focus':
      case 'icon-prefix-focus-visible':
      case 'icon-suffix-focus-visible':
        box.tabIndex = 0;
        new (await import('./CSSProperty/IconAttribute')).IconAttribute(box, attr, value).init();
        break;

      case 'icon-prefix-toggle':
      case 'icon-suffix-toggle':
        new (await import('./CSSProperty/IconToggle.attribute')).IconToggleAttribute(
          box as CBoxUiAttribute,
          attr,
          value
        ).init();
        break;

      // done
      case 'bg':
        new (await import('./CSSProperty/VariableAttribute')).VariableAttribute(
          box,
          attr,
          value
        ).init();
        break;

      // done
      case 'transition':
      case 'cursor':
      case 'display':
      case 'flex-basis':
      case 'flex-direction':
      case 'flex-grow':
      case 'flex-shrink':
      case 'flex-wrap':
      case 'opacity':
      case 'order':
      case 'outline':
      case 'overflow':
      case 'overflow-x':
      case 'overflow-y':
      case 'position':
      case 'tx-overflow':
      case 'tx-transform':
      case 'user-select':
      case 'visibility':
      case 'whitespace':
      case 'z-index':
        if (value === 'none') break;
        new (await import('./CSSProperty/ValueAttribute')).ValueAttribute(box, attr, value).init();
        break;

      // done
      case 'round':
      case 'left':
      case 'top':
      case 'right':
      case 'bottom':
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
      case 'p':
      case 'pl':
      case 'pt':
      case 'pr':
      case 'pb':
        new (await import('./CSSProperty/SizeVariableAttribute')).SizeVariableAttribute(
          box,
          attr,
          value
        ).init();
        break;

      // done
      case 'mx':
      case 'my':
      case 'px':
      case 'py':
        new (await import('./CSSProperty/XYSizeAttribute')).XYSizeVariableAttribute(
          box,
          attr,
          value
        ).init();
        break;

      case 'visible':
        new (await import('./Observer/VisibleObserver')).VisibleObserver(
          box as CBox.Ref & { isVisible: boolean; visibleEntry: IntersectionObserverEntry },
          value
        ).init();
        break;

      default:
        break;
    }
  }
}
// case 'shadow':
