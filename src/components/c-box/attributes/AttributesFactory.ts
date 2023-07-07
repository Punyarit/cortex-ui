import { checkCBoxclosest as checkCBoxClosest } from '../../../helpers/check-component-closest';
import { PopoverCloseButtonErrorText } from '../errors/popover-close-button-error-text';
import { AttributeChangedType, CBoxUiAttribute } from '../types/attribute-changed.types';
import { POpoverCloseButton } from './popover/PopoverCloseButton';
import { UIAttribute } from './ui/Ui.attribute';
import { UIStateAttribute } from './ui/UI.State.attribute';
import { UIToggleAttribute } from './ui/UI-Toggle.attribute';
import { BorderAttribute } from './CSSProperty/Border.attribute';
import { TextAttribute } from './CSSProperty/TextAttribute';
import { IconAttribute } from './CSSProperty/IconAttribute';
import { IconToggleAttribute } from './CSSProperty/IconToggle.attribute';
import { VariableAttribute } from './CSSProperty/VariableAttribute';
import { ValueAttribute } from './CSSProperty/ValueAttribute';
import { SizeVariableAttribute } from './CSSProperty/SizeVariableAttribute';
import { XYSizeVariableAttribute } from './CSSProperty/XYSizeAttribute';
import { VisibleObserver } from './Observer/VisibleObserver';

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
        new POpoverCloseButton(box).init();
        break;

      // done
      // 📌 UI Attributes
      case 'ui':
        new UIAttribute(attr, box, value).init();
        break;

      // done
      // 📌 Apply styles when element is focused
      case 'ui-active':
        new UIStateAttribute(attr, box, value, 'active').init();

        break;

      // done
      // 📌 Apply styles when element is focused
      case 'ui-focus':
        box.tabIndex = 0;
        new UIStateAttribute(attr, box, value, 'focus').init();
        break;

      // done
      // 📌 Apply style when element is focused via keyboard or non-mouse interaction
      case 'ui-focus-visible':
        box.tabIndex = 0;
        new UIStateAttribute(attr, box, value, 'focus-visible').init();
        break;

      // done
      //📌 Apply styles to the outer element (parent element) when the focus-element (child element) is focused
      case 'ui-focus-within':
        new UIStateAttribute(attr, box, value, 'focus-within').init();
        break;

      // done
      case 'ui-hover':
        new UIStateAttribute(attr, box, value, 'hover').init();
        break;

      // done
      case 'ui-target':
        new UIStateAttribute(attr, box, value, 'target').init();
        break;

      // done
      case 'ui-toggle':
        new UIToggleAttribute(attr, box as CBoxUiAttribute, value).init();

        break;

      // done
      case 'border':
      case 'border-left':
      case 'border-top':
      case 'border-right':
      case 'border-bottom':
        if (value === 'none') return;
        new BorderAttribute(box, attr, value).init();

        break;

      // done
      case 'tx':
        if (value === 'none') return;
        new TextAttribute(box, attr, value).init();

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
        new IconAttribute(box, attr, value).init();

        break;

      // done
      case 'icon-prefix-focus':
      case 'icon-suffix-focus':
      case 'icon-prefix-focus-visible':
      case 'icon-suffix-focus-visible':
        box.tabIndex = 0;
        new IconAttribute(box, attr, value).init();

        break;

      case 'icon-prefix-toggle':
      case 'icon-suffix-toggle':
        new IconToggleAttribute(box as CBoxUiAttribute, attr, value).init();

        break;

      // done
      case 'bg':
        new VariableAttribute(box, attr, value).init();

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
        new ValueAttribute(box, attr, value).init();

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
        new SizeVariableAttribute(box, attr, value).init();

        break;

      // done
      case 'mx':
      case 'my':
      case 'px':
      case 'py':
        new XYSizeVariableAttribute(box, attr, value).init();

        break;

      case 'visible':
        new VisibleObserver(
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
