import { AttributeChangedType } from './types/attribute-changed.types';

export class AttributeFactory {
  constructor(private attr: AttributeChangedType, private box: CBox2.Ref) {}

  async construct() {
    switch (this.attr) {
      // 📌 UI Attributes
      case 'ui':
        if (!this.box.ui) return;
        (await import('./ui/Ui.Style')).UiStyle.init(this.box, this.box.ui, 'uiStyleTexts');
        break;

      case 'ui-active':
        if (!this.box['ui-active']) return;
        (await import('./ui/Ui.Style')).UiStyle.init(
          this.box,
          this.box['ui-active'],
          'uiActiveTexts',
          'active'
        );
        break;

      case 'ui-focus':
        if (!this.box['ui-focus']) return;
        this.box.tabIndex = 0;
        (await import('./ui/Ui.Style')).UiStyle.init(
          this.box,
          this.box['ui-focus'],
          'uiFocusTexts',
          'focus'
        );
        break;

      case 'ui-focus-visible':
        if (!this.box['ui-focus-visible']) return;
        this.box.tabIndex = 0;
        (await import('./ui/Ui.Style')).UiStyle.init(
          this.box,
          this.box['ui-focus-visible'],
          'uiFocusVisibleTexts',
          'focus-visible'
        );
        break;

      case 'ui-focus-within':
        if (!this.box['ui-focus-within']) return;
        this.box.tabIndex = 0;
        (await import('./ui/Ui.Style')).UiStyle.init(
          this.box,
          this.box['ui-focus-within'],
          'uiFocusWithinTexts',
          'focus-within'
        );
        break;

      case 'ui-hover':
        if (!this.box['ui-hover']) return;
        (await import('./ui/Ui.Style')).UiStyle.init(
          this.box,
          this.box['ui-hover'],
          'uiHoverTexts',
          'hover'
        );
        break;

      case 'ui-target':
        if (!this.box['ui-target']) return;
        (await import('./ui/Ui.Style')).UiStyle.init(
          this.box,
          this.box['ui-target'],
          'uiTargetTexts',
          'target'
        );
        break;

      // case 'ui-toggle':
      //   if (!this.box['ui-toggle']) return;
      //   (await import('./ui/Ui.Style')).UiStyle.init(
      //     this.box,
      //     this.box['ui-toggle'],
      //     'uiToggleTexts',
      //     'toggle'
      //   );
      //   break;

      default:
        break;
    }
  }
}
