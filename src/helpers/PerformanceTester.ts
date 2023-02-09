/**
 * @Usage
 * @PerformanceTester.start();
 * doSomething()
 * PerformanceTester.end()
 * PerformanceTester.measure()
 */

export class PerformanceTester {
  static observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntriesByType('measure')) {
      if (entry.name === 'taskDuration') {
        console.log(`Task duration: ${entry.duration} milliseconds`);
      }
    }
  });

  static for(callback: Function, lengrg = 1000) {
    for (let index = 0; index < lengrg; index++) {
      callback();
    }
  }

  static start() {
    PerformanceTester.observer.observe({ entryTypes: ['measure'] });
    performance.mark('startTask');
  }

  static end() {
    performance.mark('endTask');
  }

  static measure() {
    performance.measure('taskDuration', 'startTask', 'endTask');
  }
}
