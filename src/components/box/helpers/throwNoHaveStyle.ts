export const throwNoHaveStyle = (s: string) => {
  throw new SyntaxError(`CX-BOX does not have the style "${s}"`);
};
