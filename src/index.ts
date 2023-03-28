import { CbCalc, CountdownInputType, stateType } from "./types";

import Timer from "./utils/Timer.js";

// Countdown that provides calculation features
class Countdown extends Timer {
  private cdnInputeState: CountdownInputType;
  private initiatedTime: number;
  private readonly initState = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  private state: stateType;
  private callbacks: {
    [key: string]: null | CbCalc;
  } = {
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  };

  constructor(cdnInputeState: CountdownInputType, delay = 1) {
    // parameter 1 passed as 1 second to timer class constructor
    super(delay);
    // get the countdown time details
    this.cdnInputeState = cdnInputeState;

    // throw error if the year is invalid
    if (this.cdnInputeState.year < new Date().getFullYear()) {
      this.stop();
      throw new Error("Year Must Be Greater Than Current Year");
    }
    const { month, date, year, hour, minute, second } = this.cdnInputeState;
    const timeFormat = `${month} ${date}, ${year} ${hour}:${minute}:${second}`;
    this.initiatedTime = new Date(timeFormat).getTime();
    // observes the state value changes
    this.state = this.observer();
    // clock from Timer class is called and passed the callback
    this.clock(this.calc);
  }
  // keeps watching for value changes
  private calc() {
    const { days, hours, minutes, seconds } = this.calculateTime();
    if (this.state.days !== days) this.state.days = days;
    if (this.state.hours !== hours) this.state.hours = hours;
    if (this.state.minutes !== minutes) this.state.minutes = minutes;
    if (this.state.seconds !== seconds) this.state.seconds = seconds;
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
  // takes a callback for days and sets to callbacks object
  calcDays(cb: CbCalc) {
    this.callbacks.days = cb;
  }
  // takes a callback for hours and sets to callbacks object
  calcHours(cb: CbCalc) {
    this.callbacks.hours = cb;
  }
  // takes a callback for minutes and sets to callbacks object
  calcMinutes(cb: CbCalc) {
    this.callbacks.minutes = cb;
  }
  // takes a callback for seconds and sets to callbacks object
  calcSeconds(cb: CbCalc) {
    this.callbacks.seconds = cb;
  }
  // actually runs the callback when only it's value change
  private runAll(property: string, value: number) {
    if (property === "days" && this.callbacks.days) {
      this.callbacks.days(value);
    }
    if (property === "hours" && this.callbacks.hours) {
      this.callbacks.hours(value);
    }
    if (property === "minutes" && this.callbacks.minutes) {
      this.callbacks.minutes(value);
    }
    if (property === "seconds" && this.callbacks.seconds) {
      this.callbacks.seconds(value);
    }
  }
  // observer implementation
  private observer() {
    const self = this;
    return new Proxy(this.initState, {
      set(target: stateType, property: string, value: number) {
        self.runAll.call(self, property, value);
        // Update the property
        target[property] = value;
        // Return true to indicate the property was set
        return true;
      },
    });
  }
}

// exporting countdown for lib usages
export default Countdown;
