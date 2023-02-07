/**
 * @Usage
 * @CxPerformance.start();
 * doSomething()
 * CxPerformance.end()
 * CxPerformance.measure()
 */

export class CxPerformance {
  static observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntriesByType('measure')) {
      if (entry.name === 'taskDuration') {
        console.log(`Task duration: ${entry.duration} milliseconds`);
      }
    }
  });

  static start() {
    CxPerformance.observer.observe({ entryTypes: ['measure'] });
    performance.mark('startTask');
  }

  static end() {
    performance.mark('endTask');
  }

  static measure() {
    performance.measure('taskDuration', 'startTask', 'endTask');
  }
}
