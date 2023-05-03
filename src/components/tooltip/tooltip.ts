import { css, html, PropertyValueMap, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentBase } from '../../base/component-base/component.base';
import '../popover/popover';
import '../div/div';
import { CxTooltipName } from './types/tooltip.types';

@customElement(CxTooltipName)
export class Tooltip extends ComponentBase<CXTooltip.Props> {
  config: CXTooltip.Set = {
    text: 'Tooltip was created!',
    openby: 'mouseover',
    position: 'bottom-center',
  };

  connectedCallback() {
    super.connectedCallback();
    if (this.set) this.cacheConfig(this.set);
    if (this.config) this.exec();
  }

  render(): TemplateResult {
    return html`<cx-popover
      .set="${{
        focusout: 'close',
        mouseleave: 'close',
        arrowpoint: true,
        openby: this.set.openby,
        position: this.set.position,
      } as CXPopover.Set}">
      <c-box slot="host"> </c-box>
      <c-box slot="popover" tooltip>
        <c-box content bg-bluestate-700 tx-white>${this.set.text}</c-box>
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

    type Var = unknown;

    type Set = {
      text: string;
      position?: CXPopover.Set['position'];
      openby: CXPopover.Set['openby'];
    };

    type Fix = Required<{ [K in keyof Set]: (value: Set[K]) => Fix }> & { exec: () => void };

    type Props = {
      var: Pick<Var, never>;
      set: Set;
      fix: Fix;
      make: Var;
    };

    // type Details = {
    //   [onPressed]: { event: string };
    // };

    // type Events = {
    //   [onPressed]: (detail: Pressed) => void;
    // };

    // type Pressed = CustomEvent<Details[typeof onPressed]>;
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
