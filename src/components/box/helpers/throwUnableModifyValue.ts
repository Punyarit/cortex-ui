export const throwUnableModifyValue = (prop: string) => {
  throw new SyntaxError(`Unable to modify the "${prop}" value.`);
};
