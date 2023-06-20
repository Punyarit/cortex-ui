export class Theme extends HTMLElement {
  public static sheet?: string;
  public static breakpoint?: Record<string, string>;
  public static fontLevel: number | string = 1;
  public static elementRef?: Theme;

  constructor() {
    super();
    Theme.elementRef = this;
    this.createThemeStyle();
  }

  private createThemeStyle() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    if (Theme.sheet) {
      const styleSheet = new CSSStyleSheet();
      styleSheet.replaceSync(Theme.sheet);
      shadowRoot.adoptedStyleSheets = [styleSheet];
    }
    shadowRoot.appendChild(document.createElement('slot'));
  }

  public static setThemeClass(className: string) {
    Theme.elementRef!.className = className;
  }
}

customElements.define('cx-theme', Theme);
