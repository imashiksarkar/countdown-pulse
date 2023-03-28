import { Cb } from "../types";

// Timer that runs after a certain delay
export default abstract class Timer {
  private timerRef: NodeJS.Timer;
  private cb: Cb | null = null;

  constructor(delay = 1) {
    //init timer
    this.timerRef = setInterval(this.start.bind(this), delay * 1000);
  }
  // runs the callback every single delayed time
  start() {
    if (!this.cb) return this.stop();
    this.cb();
  }
  // takes a callback function set it to cb variable
  protected clock(cb: Cb | null) {
    this.cb = cb;
    // if the callback was not passed the stop the timer
    if (!cb) this.stop();
  }
  stop() {
    clearInterval(this.timerRef);
  }
}
