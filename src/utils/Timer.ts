import { CountdownInputType, RunCallbackType, StateType } from "../types";

type Clock = () => void;

// Timer that runs after a certain delay
export default abstract class Timer {
  static readonly initState = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  protected initiatedTime: number;
  protected state: StateType;
  private timerRef: NodeJS.Timer;
  // private cb: Cb | null = null;

  constructor(private cdnInputeState: CountdownInputType, delay = 1) {
    const currentTime = new Date().getTime();

    const { month, date, year, hour, minute, second } = this.cdnInputeState;
    const timeFormat = `${month} ${date}, ${year} ${hour}:${minute}:${second}`;

    this.initiatedTime = new Date(timeFormat).getTime();

    // throw error if the year is invalid
    if (currentTime < this.initiatedTime) {
      this.stop();
      throw new Error(`Time must be greater than current time.`);
    }

    //init timer
    this.timerRef = setInterval(this.start.bind(this), delay * 1000);

    // observes the state value changes
    this.state = this.observer();
  }
  // runs the callback every single delayed time
  start() {
    this.clock();
  }
  // takes a callback function set it to cb variable
  // protected abstract clock: Clock;
  // keeps watching for value changes
  private clock() {
    const { days, hours, minutes, seconds } = this.calculateTime();
    if (this.state.days !== days) this.state.days = days;
    if (this.state.hours !== hours) this.state.hours = hours;
    if (this.state.minutes !== minutes) this.state.minutes = minutes;
    if (this.state.seconds !== seconds) this.state.seconds = seconds;
  }

  stop() {
    clearInterval(this.timerRef);
  }
  // calculates the time
  private calculateTime() {
    const timeDifferent = this.initiatedTime - new Date().getTime();
    // calculation for days, hours, minutes and seconds
    const days = Math.floor(timeDifferent / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifferent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifferent % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifferent % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  protected abstract runCallback: RunCallbackType;

  // observer implementation
  protected observer() {
    const self = this;
    return new Proxy(Timer.initState, {
      set(target: StateType, property: string, value: number) {
        self.runCallback(property, value);
        // Update the property(name of state)
        target[property] = value;
        // Return true to indicate the property was set
        return true;
      },
    });
  }
}
