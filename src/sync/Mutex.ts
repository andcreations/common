/** */
export class Mutex {
  /** */
  private waiters: Function[] = [];

  /** */
  constructor(private locked = false) {
  }

  /** */
  async lock(): Promise<void> {
    return new Promise((resolve)  => {
      if (!this.locked) {
        this.locked = true;
        resolve();
        return;
      }
      this.waiters.push(resolve);
    });
  }

  /** */
  unlock(): void {
    if (!this.waiters.length) {
      this.locked = false;
      return;
    }
    const waiter = this.waiters.shift();
    waiter();
  }
}