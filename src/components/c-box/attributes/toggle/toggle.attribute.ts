import {
  CBoxWithToggle,
  ToggleAttrStatus,
  ToggleStatus,
} from '../../types/attribute-changed.types';

export class ToggleAttribute {
  static init(box: CBoxWithToggle, attr: string, value: string) {
    box.setAttribute(`${attr}-status`, 'default');

    box.addEventListener('click', () => {
      const toggleStatus = box.getAttribute(`${attr}-status`) === 'default' ? 'toggled' : 'default';
      box.setAttribute(`${attr}-status`, toggleStatus);
      box.style.setProperty(`--${attr}`, `var(--${value})`);
      box.dispatchEvent(
        new CustomEvent(attr, {
          detail: {
            status: toggleStatus,
          },
        })
      );
    });

    box['setToggleStatus'] = (status: ToggleStatus) => {
      box.setAttribute(`${attr}-status`, status);
    };
  }
}
