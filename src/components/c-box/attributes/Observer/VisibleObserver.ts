export class VisibleObserver {
  private observer?: IntersectionObserver;
  constructor(
    private box: CBoxTest.Ref & { isVisible: boolean; visibleEntry: IntersectionObserverEntry },
    private value: string
  ) {}
  init() {
    if (this.value === 'open' && !this.observer) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            this.box.isVisible = true;
          } else {
            this.box.isVisible = false;
          }
          this.box.visibleEntry = entry;
          this.setCustomEvent();
        });
      });
      this.observer.observe(this.box);
    } else if (this.value === 'closed' && this.observer) {
      this.observer.disconnect();
    }
  }

  private setCustomEvent() {
    this.box.dispatchEvent(
      new CustomEvent('visible', {
        detail: {
          isVisible: this.box.isVisible,
          visibleEntry: this.box.visibleEntry,
        },
      })
    );
  }
}
