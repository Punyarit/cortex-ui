export class ScopedStyles {
  static counter = 0;
  static tag?: HTMLStyleElement;
  static sheet?: CSSStyleSheet;
  static cache?: Map<string, number> = new Map();

  static set() {
    if (!ScopedStyles.tag) {
      ScopedStyles.tag = document.createElement('style');
      ScopedStyles.tag.id = 'scoped-style';
      document.head.appendChild(ScopedStyles.tag);
      const stylesheets = document.styleSheets;

      for (const sheet in stylesheets) {
        if ((stylesheets[sheet].ownerNode as HTMLElement)?.id === 'scoped-style') {
          ScopedStyles.sheet = stylesheets[sheet];
          break;
        }
      }
    }
  }
}
