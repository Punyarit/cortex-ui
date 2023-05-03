export const styles = {
  setStyle: (round: string | number, bgColor: string, txColor: string, w: string, select: string) =>
    `round-${round}
     bg-${bgColor}
     tx-${txColor}
     w-${w}
     select-${select}
     `,
};

export const classes = {
  wrapper:
    'wrapper: px-16 py-12 border-box flex items-center cursor-pointer transition-250 overflow-hidden',
};
