export namespace PromiseUtil {
  export async function sleep(msec: number) {
    await new Promise((resolve) => setTimeout(resolve, msec));
    return;
  }

  export async function apiAutoRetry(
    tryCount: number,
    baseSleepTimeMSec: number,
    // func: () => void
    func: () => Promise<boolean>
    // func: Promise<() => void>
  ) {
    if (tryCount <= 0) {
      return;
    }
    if (baseSleepTimeMSec <= 0) {
      return;
    }
    for (let index = 0; index < tryCount; index++) {
      // func();
      // await func();
      // await new Promise((resolve) => func());
      // const result = await (async () => func())();
      const result = await func();
      if (result) {
        return;
      }
      const sleepMSec = baseSleepTimeMSec * 2 ** index;
      await sleep(sleepMSec);
    }
  }
}
