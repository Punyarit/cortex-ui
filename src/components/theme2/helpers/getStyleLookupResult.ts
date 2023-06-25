import { Theme } from '../../theme2/theme';
import { contentParseString } from './contentParseString';
import { NoStyleError } from './NoStyleError';
const minMax = (attr1: string, attr2: string, attr3: string | undefined, s: string) =>
  `${attr1}-${attr2 === 'w' ? 'width' : attr2 === 'h' ? 'height' : NoStyleError(s)}:${attr3}`;

const borderFunc = (
  s: string,
  attr2: string,
  attr3: string | undefined,
  attr4: string | undefined
) => {
  if (['left', 'right', 'top', 'bottom'].includes(attr2)) {
    const [, , , , ...borderSideColor] = s.split('-');
    return `border-${attr2}: ${attr3} ${attr4} var(--${borderSideColor.join('-')})`;
  }
  const [, , , ...borderColor] = s.split('-');
  return `border: ${attr2} ${attr3} var(--${borderColor.join('-')})`;
};

const gridGap = (attr1: string, attr2: string, attr3: string | undefined, s: string) => {
  if (attr2 === 'gap') {
    return `${attr1 === 'col' ? 'column' : 'row'}-gap:${attr3}`;
  } else {
    NoStyleError(s);
  }
};

const fontValue = (s: string) => {
  const fontVal = Theme.font?.[s.replace(/font-/g, '')];
  if (!fontVal) NoStyleError(s);
  return `font-family:${fontVal}`;
};

const fontSizeFunc = (attr2: string) => {
  if (+Theme.fsDisplay > 1) {
    const size = parseFloat(attr2);
    const fontSize = Math.round(size * +Theme.fsDisplay);
    const unit = attr2.replace(`${size}`, '');
    return `font-size:${fontSize}${unit}`;
  }
  return `font-size:${attr2}`;
};

const getOutlineStyle = (attr2: string, attr3: string | undefined, s: string) => {
  if (attr2 === 'offset') {
    return `outline-offset:${attr3}`;
  }
  const [, , , ...outlineColor] = s.split('-');
  return `outline: ${attr2} ${attr3} var(--${outlineColor.join('-')})`;
};

export const getStyleLookupResult = (
  s: string,
  attr1: string,
  attr2: string,
  attr3?: string,
  attr4?: string
) => {
  const lookup: Record<string, any> = {
    w: `width:${attr2}`,
    min: () => minMax(attr1, attr2, attr3, s),
    max: () => minMax(attr1, attr2, attr3, s),
    h: `height:${attr2}`,
    bg: `background-color:var(--${s.slice(3)})`,
    c: `color:var(--${s.slice(2)})`,
    fs: () => fontSizeFunc(attr2),
    fw: `font-weight:${attr2}`,
    round: `border-radius:${attr2}`,
    left: `${attr1}:${attr2}`,
    top: `${attr1}:${attr2}`,
    right: `${attr1}:${attr2}`,
    bottom: `${attr1}:${attr2}`,
    m: `margin:${attr2}`,
    ml: `margin-left:${attr2}`,
    mt: `margin-top:${attr2}`,
    mr: `margin-right:${attr2}`,
    mb: `margin-bottom:${attr2}`,
    mx: `margin-left:${attr2};margin-right:${attr2}`,
    my: `margin-top:${attr2};margin-bottom:${attr2}`,
    p: `padding:${attr2}`,
    pl: `padding-left:${attr2}`,
    pt: `padding-top:${attr2}`,
    pr: `padding-right:${attr2}`,
    pb: `padding-bottom:${attr2}`,
    px: `padding-left:${attr2};padding-right:${attr2}`,
    py: `padding-top:${attr2};padding-bottom:${attr2}`,
    border: () => borderFunc(s, attr2, attr3, attr4),
    col: () => gridGap(attr1, attr2, attr3, s),
    row: () => gridGap(attr1, attr2, attr3, s),
    font: () => fontValue(s),
    content: `content:'${contentParseString(attr2)}'`,
    shadow: `box-shadow:${s.replace(/shadow|-/g, ' ').trim()}`,
    animation: `animation:${s.replace(/animation|-|\$/g, ' ').trim()}`,
    basis: `flex-basis:${attr2}`,
    line: () => {
      return attr2 === 'height' ? `line-height:${attr3}` : NoStyleError(s);
    },
    letter: () => {
      // spacing: `letter-spacing:${attr3}`,
      return attr2 === 'spacing' ? `letter-spacing:${attr2}` : NoStyleError(s);
    },
    indent: `text-indent:${attr2}`,
    outline: () => getOutlineStyle(attr2, attr3, s),
    z: `z-index:${attr2}`,
    order: `order:${attr2}`,
    columns: `columns:${attr2}`,
    grow: `flex-grow:${attr2}`,
    shrink: `flex-shrink:${attr2}`,
    opacity: `opacity:${attr2}`,
    blur: `filter:${attr1}(${attr2})`,
    brightness: `filter:${attr1}(${attr2})`,
    contrast: `filter:${attr1}(${attr2})`,
    grayscale: `filter:${attr1}(${attr2})`,
    invert: `filter:${attr1}(${attr2})`,
    saturate: `filter:${attr1}(${attr2})`,
    sepia: `filter:${attr1}(${attr2})`,
    hue: `filter: hue-rotate(${attr2})`,
    backdrop: `backdrop-filter:${attr2 === 'hue' ? `hue-rotate(${attr3})` : `${attr2}(${attr3})`}`,
    transition: `transition:${s.replace(/transition|-/g, ' ')}`,
    scale: `transform:${attr1}(${attr2})`,
    rotate: `transform:${attr1}(${attr2})`,
    translateX: `transform:${attr1}(${attr2})`,
    translateY: `transform:${attr1}(${attr2})`,
    skewX: `transform:${attr1}(${attr2})`,
    skewY: `transform:${attr1}(${attr2})`,
    fill: attr2 !== 'opacity' ? `fill:var(--${s.slice(5)})` : `fill-opacity:${attr3}`,
    stroke:
      attr2 !== 'opacity'
        ? `${attr3 ? `stroke:var(--${s.slice(7)})` : `stroke-width:${attr2}`}`
        : `stroke-opacity:${attr3}`,
  };

  const value = lookup[attr1];
  if (!value) NoStyleError(s);
  return typeof value === 'function' ? value() : value;
};
