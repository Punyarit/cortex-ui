import { throwNoHaveStyle } from './throwNoHaveStyle';

export const getStyleCaseResult = (
  s: string,
  attr1: string,
  attr2: string,
  attr3?: string,
  attr4?: string,
  attr5?: string,
  attr6?: string
): any => {
  switch (attr1) {
    case 'w':
      return `width:${attr2}`;

    case 'min':
    case 'max':
      return `${attr1}-${
        attr2 === 'w' ? 'width' : attr2 === 'h' ? 'height' : throwNoHaveStyle(s)
      }:${attr3}`;

    case 'h':
      return `height:${attr2}`;

    // base bg-modernGreen-500
    case 'bg':
      return `background-color:var(--${attr2}-${attr3})`;

    // c-primary-500
    case 'c':
      return `color:var(--${attr2}-${attr3})`;

    case 'fs':
      // const fontDisplay = localStorage?.getItem('fontSizeDisplay');
      // if (fontDisplay) {
      //   const size = parseFloat(attr2);
      //   const fontSize = size * +fontDisplay;
      //   const unit = attr2.replace(`${size}`, '');
      //   return `font-size:${fontSize}${unit}`;
      // }
      return `font-size:${attr2}`;

    // tx-primary-500 | tx-16px
    // case 'tx':
    //   if (attr3) {
    //     return `color:var(--${attr2}-${attr3})`;
    //   } else {
    //     // font display this will dynamic by theme font size display
    //     // no more size variable

    //     return `font-size:${attr2}`;
    //   }

    // round-12
    case 'round':
      return `border-radius:${attr2}`;

    // position
    case 'left':
    case 'top':
    case 'right':
    case 'bottom':
      return `${attr1}:${attr2}`;

    // margin
    case 'm':
      return `margin:${attr2}`;

    case 'ml':
      return `margin-left:${attr2}`;

    case 'mt':
      return `margin-top:${attr2}`;

    case 'mr':
      return `margin-right:${attr2}`;

    case 'mb':
      return `margin-bottom:${attr2}`;

    case 'mx':
      return `margin-left:${attr2};margin-right:${attr2}`;

    case 'my':
      return `margin-top:${attr2};margin-bottom:${attr2}`;

    // padding
    case 'p':
      return `padding:${attr2}`;

    case 'pl':
      return `padding-left:${attr2}`;

    case 'pt':
      return `padding-top:${attr2}`;

    case 'pr':
      return `padding-right:${attr2}`;

    case 'pb':
      return `padding-bottom:${attr2}`;

    case 'px':
      return `padding-left:${attr2};padding-right:${attr2}`;

    case 'py':
      return `padding-top:${attr2};padding-bottom:${attr2}`;

    // border-1 border-primary-500 || borderLeft-1 borderLeft-primary-500
    case 'border':
      switch (attr2) {
        case 'left':
        case 'right':
        case 'top':
        case 'bottom':
          // attr2 = side;
          return `border-${attr2}: ${attr3} ${attr4} var(--${attr5}-${attr6})`;

        default:
          // attr2=width | attr3=style | attr4=color | attr5=shade
          return `border: ${attr2} ${attr3} var(--${attr4}-${attr5})`;
      }

    // col-Gap-12
    case 'col':
    case 'row':
      switch (attr2) {
        case 'gap':
          return `${attr1 === 'col' ? 'column' : 'row'}-gap:${attr3}`;
      }

    case 'shadow':
      const val = s.replace(/shadow|-/g, ' ');
      return `box-shadow: ${val}`;

    // basis-12
    case 'basis':
      return `flex-basis:var(--vase-size-${attr2})`;

    // line-height-12
    case 'line':
      switch (attr2) {
        case 'height':
          return `line-height:${attr3}`;
      }

    // letter-spacing-12
    case 'letter':
      switch (attr2) {
        case 'spacing':
          return `letter-spacing:${attr3}`;
      }

    case 'indent':
      return `text-indent:${attr2}`;

    case 'outline':
      switch (attr2) {
        case 'offset':
          return `outline-offset:${attr3}`;

        default:
          // attr2=width | attr3=style | attr4=color | attr5=shade
          return `outline: ${attr2} ${attr3} var(--${attr4}-${attr5})`;
      }

    case 'z':
      return `z-index:${attr2}`;

    case 'order':
      return `order:${attr2}`;

    case 'columns':
      return `columns:${attr2}`;

    case 'grow':
      return `flex-grow:${attr2}`;

    case 'shrink':
      return `flex-shrink:${attr2}`;

    case 'opacity':
      return `opacity:${attr2}`;

    // filters
    case 'blur':
    case 'brightness':
    case 'contrast':
    case 'grayscale':
    case 'invert':
    case 'saturate':
    case 'sepia':
      return `filter:${attr1}(${attr2})`;

    case 'hue':
      return `filter: hue-rotate(${attr3})`;

    case 'backdrop':
      return `backdrop-filter:${attr2 === 'hue' ? `hue-rotate(${attr4})` : `${attr2}(${attr3})`}`;

    // trans-background
    case 'transition':
      return `transition:${s.replace(/transition|-/g, ' ')}`;

    case 'scale':
    case 'rotate':
    case 'translateX':
    case 'translateY':
    case 'skewX':
    case 'skewY':
      return `transform:${attr1}(${attr2})`;

    default:
      throwNoHaveStyle(s);
  }
};
