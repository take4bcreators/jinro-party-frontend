export class TimerService {
  private count: number;
  private isRunning: boolean;

  constructor(count: number) {
    this.count = count;
    this.isRunning = false;
  }

  public start() {
    this.isRunning = true;
  }

  public pause() {
    this.isRunning = false;
  }

  public reset() {
    this.count = 60;
    this.isRunning = false;
  }

  public tick() {
    if (this.count > 0) {
      this.count = this.count - 1;
    }
  }

  public getCount() {
    return this.count;
  }

  public runningTimer() {
    let timerId: NodeJS.Timeout | null = null;

    if (this.isRunning && this.count > 0) {
      timerId = setInterval(() => {
        this.tick();
        console.log(this.count);
      }, 1000);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }
}
