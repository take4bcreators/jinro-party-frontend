import { Dispatch, SetStateAction } from 'react';

export class TimerService {
  setCountFunc: Dispatch<SetStateAction<number>>;
  setIsRunningFunc: Dispatch<SetStateAction<boolean>>;

  constructor(
    setCountFunc: Dispatch<SetStateAction<number>>,
    setIsRunningFunc: Dispatch<SetStateAction<boolean>>
  ) {
    this.setCountFunc = setCountFunc;
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
}
