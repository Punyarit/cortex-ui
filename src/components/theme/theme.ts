import generateComponentId from './helpers/generateComponentId';

export class Theme extends HTMLElement {
  public static style?: string;

  public static fontLevel: number | string = 1;

  public static breakpoint?: Record<string, string>;

  public static cxss = <T extends string>(style: TemplateStringsArray): Record<T, string> => {
    console.log('theme.js |style| = ', style);
    const styleText = style.toString();
    const componentId = generateComponentId(styleText);
    console.log('theme.js |componentId| = ', componentId);
    this.createAndInjectStyle(styleText);
    const className = `header__${componentId}`;

    return {
      header: className,
    } as Record<T, string>;
  };

  constructor() {
    super();
    Theme.createAndInjectStyle(Theme.style || '');
  }

  private static createAndInjectStyle(styleText: string) {
    const style = document.createElement('style');
    style.textContent = styleText;
    document.head.appendChild(style);
  }
}
customElements.define('cx-theme', Theme);
