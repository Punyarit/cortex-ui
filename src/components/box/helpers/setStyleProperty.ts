export const setStyleProperty = (
  box: HTMLElement,
  styleAttr: string,
  styleValue: string,
  type: string,
  attr1?: string,
  attr2?: string
) => {
  const setterName = `${styleAttr.replaceAll('-', '_')}_${type}${attr1 ? `_${attr1}` : ''}${
    attr2 ? `_${attr2}` : ''
  }`;
  Object.defineProperty(box, `${setterName}`, {
    set: (value: string) => {
      // if (styleAttr === 'fontSize') { font size display by theme}
      box.style.setProperty(`--${setterName}`, value);
    },
  });
  box.style.setProperty(`--${setterName}`, styleValue);
  return setterName;
};
