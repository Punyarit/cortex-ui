import { css, html, PropertyValueMap, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import '../popover/popover';
import '../c-box/c-box';
import { CxTooltipName } from './types/tooltip.types';

@customElement(CxTooltipName)
export class Tooltip extends ComponentBase<CXTooltip.Props> {
  config: CXTooltip.Set = {
    text: 'Tooltip was created!',
    openBy: 'mouseover',
    position: 'bottom-center',
    arrowPoint: false,
    focusout: 'close',
    mouseleave: 'close',
  };

  connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
    if (this.config) this.exec();
  }

  render(): TemplateResult {
    return html`<cx-popover
      .set="${{
        focusout: this.set.focusout,
        mouseleave: this.set.mouseleave,
        arrowpoint: this.set.arrowPoint,
        openby: this.set.openBy,
        position: this.set.position,
      } as CXPopover.Set}">
      <c-box slot="host" inline-flex></c-box>
      <c-box slot="popover" tooltip>
        <c-box
          content
          tx-white
          style="background-color:${this.var?.backgroundColor || 'var(--bluestate-700)!important'}">
          <c-box style="color:${this.var?.textColor || 'white'}"> ${this.set.text} </c-box>
        </c-box>
      </c-box>
    </cx-popover>`;
  }

  protected firstUpdated(): void {
    const content = this.firstElementChild;
    const host = this.querySelector("c-box[slot='host']");
    host?.appendChild(content!);
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CXTooltip {
    type Ref = Tooltip;

    type Var = {
      backgroundColor?: string;
      textColor?: string;
      width?: string;
    };

    type Set = {
      text: string;
      position?: CXPopover.Set['position'];
      openBy?: CXPopover.Set['openby'];
      arrowPoint?: boolean;
      focusout?: CXPopover.Set['focusout'];
      mouseleave?: CXPopover.Set['mouseleave'];
      ellipsis?: boolean;
    };

    type Fix = Required<{ [K in keyof Set]: (value: Set[K]) => Fix }> & { exec: () => void };

    type Props = {
      var: Var;
      set: Set;
      fix: Fix;
      make: Var;
    };
  }

  interface HTMLElementTagNameMap {
    [CxTooltipName]: CXTooltip.Ref;
  }

  // namespace JSX {
  //  interface IntrinsicElements {
  //   [tagName]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> | CXTooltip.Ref;
  //  }
  // }
}
