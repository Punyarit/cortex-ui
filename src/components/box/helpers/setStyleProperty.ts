export const setStyleProperty = (
  box: HTMLElement,
  styleAttr: string, //margin_top
  styleValue: string, //24px
  type: string, //class | icon
  attr1?: string, // hover
  attr2?: string // xs
) => {
  const prefix = `${type}${attr1 ? `_${attr1}` : ''}${attr2 ? `_${attr2}` : ''}`;
  const setterName = `${prefix}_${styleAttr.replaceAll('-', '_')}`;
  Object.defineProperty(box, `${setterName}`, {
    set: (value: string) => {
      // if (styleAttr === 'fontSize') { font size display by theme}
      box.style.setProperty(`--${setterName}`, value);
    },
  });
  box.style.setProperty(`--${setterName}`, styleValue);
  return setterName;
};
