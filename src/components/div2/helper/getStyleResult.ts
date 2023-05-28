export const getStyleResult = (s: string, attr1: string, attr2: string, attr3?: string): any => {
  switch (attr1) {
    case 'w':
      return `width:${attr2}`;

    case 'minW':
      return `min-width:${attr2}`;

    case 'maxW':
      return `max-width:${attr2}`;

    case 'h':
      return `height:${attr2}`;

    case 'minH':
      return `min-height:${attr2}`;

    case 'maxH':
      return `max-height:${attr2}`;

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
      return attr3 ? `border-color:var(--${attr2}-${attr3})` : `border-width:${attr2}`;

    // borderLeft-12 | borderLeft-primary-500
    case 'borderLeft':
    case 'borderTop':
    case 'borderRight':
    case 'borderBottom':
      const side = attr1.replace('border', '').toLowerCase();
      return attr3
        ? `border-${side}-color:var(--${attr2}-${attr3})`
        : `border-${side}-width:${attr2}`;

    // colGap-12
    case 'colGap':
      return `column-gap:${attr2}`;

    // rowGap-12
    case 'rowGap':
      return `row-gap:${attr2}`;

    // basis-12
    case 'basis':
      return `flex-basis:var(--vase-size-${attr2})`;

    // lineHeight-12
    case 'lineHeight':
      return `line-height:${attr2}`;

    // letterSpacing-12
    case 'letterSpacing':
      return `letter-spacing:${attr2}`;

    case 'indent':
      return `text-indent:${attr2}`;

    case 'outlineOffset':
      return `outline-offset:${attr2}`;

    // outline-12 | outline-primary-500
    case 'outline':
      return attr3 ? `outline-color:var(--${attr2}-${attr3})` : `outline-width:${attr2}`;

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

    case 'hueRotate':
      return `filter:hue-rotate(${attr2})`;

    // backdrop filter
    case 'backdropBlur':
    case 'backdropBrightness':
    case 'backdropContrast':
    case 'backdropGrayscale':
    case 'backdropInvert':
    case 'backdropOpacity':
    case 'backdropSaturate':
    case 'backdropSepia':
      const filter = attr1.replace('backdrop', '').toLowerCase();
      return `backdrop-filter:${filter}(${attr2})`;

    case 'backdropHueRotate':
      return `backdrop-filter:hue-rotate(${attr2})`;

    // trans-background
    case 'transition':
      return `transition-property:${attr2}`;

    // ease-linear |  ease-in | ease-out | ease-in-out in style mapper
    // https://tailwindcss.com/docs/transition-timing-function

    // duration-12ms
    case 'duration':
      return `transition-duration:${attr2}`;

    // delay-12ms
    case 'delay':
      return `transition-delay:${attr2}`;

    case 'scale':
    case 'rotate':
    case 'translateX':
    case 'translateY':
    case 'skewX':
    case 'skewY':
      return `transform:${attr1}(${attr2})`;

    default:
      throw new SyntaxError(`CX-BOX does not have ${s}`);
  }
};
