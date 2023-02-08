export const REQUIRED_CBOX_CHILD_POPOVER_ERROR = `c-box is required to be a child of the popover content.
example: 
  <cx-popover> 
    <div slot="host"> ... </div> 
    <c-box slot="popover"> ... </c-box> <-- here!
  </cx-popover>
  `;
