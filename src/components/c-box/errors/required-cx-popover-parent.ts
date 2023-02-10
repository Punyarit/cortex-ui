export const REQUIRED_CXPOPOVER_PARENT = `c-box that contain cx-popover attribute like <c-box cx-popover="" />. must be child of cx-popover.
example: 
  <cx-popover>
    <c-box slot="host"> ... </c-box>
    <c-box slot="popover>
      ...
      <c-box cx-popover=""> ... </c-box> <-- here!
    </c-box>
  </cx-popover>
`;
