const style = <T extends string>(s: TemplateStringsArray): Record<T, string> => {
  console.log('app.cxss.js |123| = ', 123);
  return {} as Record<T, string>;
};
type AppClassName = 'header' | 'footer' | 'content';

export default style<AppClassName>`
  .header: bg-primary-500;
  .footer: c-primary-200;
`;
