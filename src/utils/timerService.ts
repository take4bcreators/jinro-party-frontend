import { Dispatch, SetStateAction } from 'react';

export class TimerService {
  private count: number;
  private setCountFunc: Dispatch<SetStateAction<number>>;
  private isRunning: boolean;
  private setIsRunningFunc: Dispatch<SetStateAction<boolean>>;

  constructor(
    count: number,
    setCountFunc: Dispatch<SetStateAction<number>>,
    isRunning: boolean,
    setIsRunningFunc: Dispatch<SetStateAction<boolean>>
  ) {
    this.count = count;
    this.setCountFunc = setCountFunc;
    this.isRunning = isRunning;
    this.setIsRunningFunc = setIsRunningFunc;
  }

  public start() {
    this.setIsRunningFunc(true);
  }

  public pause() {
    this.setIsRunningFunc(false);
  }

  public reset() {
    this.setCountFunc(60);
    this.setIsRunningFunc(false);
  }

  public tick() {
    if (this.count > 0) {
      this.setCountFunc((prevCount) => prevCount - 1);
    }
  }

  public runningTimer() {
    let timerId: NodeJS.Timeout | null = null;

    if (this.isRunning && this.count > 0) {
      timerId = setInterval(() => {
        this.tick();
      }, 1000);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }
}
