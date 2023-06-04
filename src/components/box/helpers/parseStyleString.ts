export const parseStyleString = (styleString: string) => {
  const styles = [] as any;
  const styleDeclarations = styleString.split(';');
  for (let i = 0, len = styleDeclarations.length; i < len; ++i) {
    const styleDeclaration = styleDeclarations[i].trim();
    if (styleDeclaration) {
      const [key, value] = styleDeclaration.split(':');
      styles[i] = [key, value];
    }
  }
  return styles;
};
