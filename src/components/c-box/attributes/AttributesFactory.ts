import { checkCBoxclosest as checkCBoxClosest } from '../../../helpers/check-component-closest';
import { PopoverCloseButtonErrorText } from '../errors/popover-close-button-error-text';
import { AttributeChangedType, CBoxUiToggle } from '../types/attribute-changed.types';

export class AttributeFactory {
  static async construct(box: CBox.Ref, attr: AttributeChangedType, value: string) {
    if (value === 'value') {
      throw `The attribute "${attr}" should not be valued as "value".`;
    }

    if (!box.shadowRoot) {
      const shadowRoot = box.attachShadow({ mode: 'open' });
      const slot = document.createElement('slot');
      const uiStyle = document.createElement('style');
      shadowRoot.appendChild(uiStyle);
      shadowRoot.appendChild(slot);
    }

    switch (attr) {
      // 📌Component ingredient
      case 'popover-close-button':
        checkCBoxClosest(box, `cx-popover`, PopoverCloseButtonErrorText);
        new (await import('./popover/PopoverCloseButton')).POpoverCloseButton(box).init();
        break;

      // 📌 UI Attributes
      case 'ui':
        new (await import('./ui/Ui.attribute')).UIAttribute(box, value).init();
        break;

      // 📌 Apply styles when element is focused
      case 'ui-active':
        new (await import('./ui/Ui.attribute')).UIAttribute(box, value, 'active').init();
        break;

      // 📌 Apply styles when element is focused
      case 'ui-focus':
        box.tabIndex = 0;
        new (await import('./ui/Ui.attribute')).UIAttribute(box, value, 'focus').init();
        break;

      // 📌 Apply style when element is focused via keyboard or non-mouse interaction
      case 'ui-focus-visible':
        box.tabIndex = 0;
        new (await import('./ui/Ui.attribute')).UIAttribute(box, value, 'focus-visible').init();
        break;

      //📌 Apply styles to the outer element (parent element) when the focus-element (child element) is focused
      case 'ui-focus-within':
        new (await import('./ui/Ui.attribute')).UIAttribute(box, value, 'focus-within').init();
        break;

      case 'ui-hover':
        new (await import('./ui/Ui.attribute')).UIAttribute(box, value, 'hover').init();
        break;

      case 'ui-target':
        new (await import('./ui/Ui.attribute')).UIAttribute(box, value, 'target').init();
        break;

      case 'ui-toggle':
        new (await import('./ui/UI-Toggle.attribute')).UIToggleAttribute(
          box as CBoxUiToggle,
          value
        ).init();
        break;

      case 'tx':
      case 'border':
      case 'transition':
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
        if (value === 'none') return;
        new (await import('./CSSProperty/Splitter.attribute')).SplitterAttribute(
          box,
          attr,
          value
        ).init();
        break;

      case 'icon-prefix-focus':
      case 'icon-suffix-focus':
      case 'icon-prefix-focus-visible':
      case 'icon-suffix-focus-visible':
        if (value === 'none') return;
        box.tabIndex = 0;
        new (await import('./CSSProperty/Splitter.attribute')).SplitterAttribute(
          box,
          attr,
          value
        ).init();
        break;

      case 'icon-prefix-toggle':
      case 'icon-suffix-toggle':
        new (await import('./CSSProperty/ToggleSplitter.attribute')).IconToggleAttribute(
          box as CBoxUiToggle,
          attr,
          value
        ).init();
        break;

      case 'bg':
        if (value === 'none') break;
        new (await import('./CSSProperty/VariableAttribute')).VariableAttribute(
          box,
          attr,
          value
        ).init();
        break;

      case 'cursor':
      case 'display':
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
      case 'shadow':
      case 'tx-overflow':
      case 'tx-transform':
      case 'user-select':
      case 'visibility':
      case 'whitespace':
      case 'z-index':
        if (value === 'none') break;
        new (await import('./CSSProperty/ValueAttribute')).ValueAttribute(box, attr, value).init();
        break;

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
      case 'mx':
      case 'my':
      case 'p':
      case 'pl':
      case 'pt':
      case 'pr':
      case 'pb':
      case 'px':
      case 'py':
        new (await import('./CSSProperty/SizeVariableAttribute')).SizeVariableAttribute(
          box,
          attr,
          value
        ).init();
        break;

      default:
        break;
    }
  }
}
