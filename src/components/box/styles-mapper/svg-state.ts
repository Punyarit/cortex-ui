export const svgStateStates: Record<string, string> = {
  '': `:host svg:not([state]) {
    display: block;
  }
  :host svg[state='hover'],
  :host svg[state='active'],
  :host svg[state='focus'],
  :host svg[state='focus-visible'],
  :host svg[state='focus-within'],
  :host svg[state='target'] {
    display: none;
  }`,
  hover: `:host(:hover) svg[state='hover'] {
    display: block;
  }
  :host(:hover) svg:not([state]),
  :host(:hover) svg[state='active'],
  :host(:hover) svg[state='focus'],
  :host(:hover) svg[state='focus-visible'],
  :host(:hover) svg[state='focus-within'],
  :host(:hover) svg[state='target'] {
    display: none !important;
  }`,
  active: `:host(:active) svg[state='active'] {
    display: block !important;
  }
  :host(:active) svg:not([state]),
  :host(:active) svg[state='hover'],
  :host(:active) svg[state='focus'],
  :host(:active) svg[state='focus-visible'],
  :host(:active) svg[state='focus-within'],
  :host(:active) svg[state='target'] {
    display: none;
  }`,
  focus: `:host(:focus) svg[state='focus'] {
    display: block !important;
  }
  :host(:focus) svg:not([state]),
  :host(:focus) svg[state='hover'],
  :host(:focus) svg[state='active'],
  :host(:focus) svg[state='focus-visible'],
  :host(:focus) svg[state='focus-within'],
  :host(:focus) svg[state='target'] {
    display: none;
  }`,
  ['focus-visible']: `:host(:focus-visible) svg[state='focus-visible'] {
    display: block !important;
  }
  :host(:focus-visible) svg:not([state]),
  :host(:focus-visible) svg[state='hover'],
  :host(:focus-visible) svg[state='active'],
  :host(:focus-visible) svg[state='focus'],
  :host(:focus-visible) svg[state='focus-within'],
  :host(:focus-visible) svg[state='target'] {
    display: none;
  }`,
  ['focus-within']: `:host(:focus-within) svg[state='focus-within'] {
    display: block !important;
  }
  :host(:focus-within) svg:not([state]),
  :host(:focus-within) svg[state='hover'],
  :host(:focus-within) svg[state='active'],
  :host(:focus-within) svg[state='focus'],
  :host(:focus-within) svg[state='focus-visible'],
  :host(:focus-within) svg[state='target'] {
    display: none;
  }`,
  target: `:host(:target) svg[state='target'] {
    display: block;
  }
  :host(:target) svg:not([state]),
  :host(:target) svg[state='hover'],
  :host(:target) svg[state='active'],
  :host(:target) svg[state='focus'],
  :host(:target) svg[state='focus-visible'],
  :host(:target) svg[state='focus-within'] {
    display: none;
  }`,
};
