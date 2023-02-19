//@types
import { Cb, CountdownInputType, stateType } from "./types/index";
//@timer
class Timer extends AbortController {
  private timer: null | number = null;
  private cb: Cb | null = null;

  constructor(delay = 1) {
    super();
    this.timer = setInterval(this.tick.bind(this), delay * 1000);
    // register an abort signal on the controller
    this.signal.addEventListener("abort", this.stop.bind(this));
  }

  clock(cb: Cb | null) {
    this.cb = cb;
  }

  private tick() {
    if (!this.cb) return this.stop();
    this.cb(1);
  }

  stop() {
    clearInterval(this.timer ?? 0);
  }
}

//@cdn
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
  constructor(cdnInputeState: CountdownInputType) {
    super();
    this.cdnInputeState = cdnInputeState;

    // throw error if the year is invalid
    if (this.cdnInputeState.year < new Date().getFullYear()) {
      this.abort();
      throw new Error("Year Must Be Greater Than Current Year");
    }
    const { month, date, year, hour, minute, second } = this.cdnInputeState;
    const timeFormat = `${month} ${date}, ${year} ${hour}:${minute}:${second}`;
    console.log("date=>", timeFormat);

    this.initiatedTime = new Date(timeFormat).getTime();
    this.state = this.observer();
    this.clock(this.calc);
  }
  private calc() {
    const { days, hours, minutes, seconds } = this.calculateTime();
    if (this.state.days !== days) this.state.days = days;
    if (this.state.hours !== hours) this.state.hours = hours;
    if (this.state.minutes !== minutes) this.state.minutes = minutes;
    if (this.state.seconds !== seconds) this.state.seconds = seconds;
  }

  capitalize(str: string) {
    str = str.toLowerCase();
    return str.slice(0, 1).toUpperCase() + str.slice(1, 3);
  }

  private calculateTime() {
    // time difference between initated time and current time
    // console.log(this.initiatedTime);

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

  private callbacks: {
    [key: string]: null | Cb;
  } = {
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  };
  getDays(cb: Cb) {
    this.callbacks.days = cb;
  }
  getHours(cb: Cb) {
    this.callbacks.hours = cb;
  }
  getMinutes(cb: Cb) {
    this.callbacks.minutes = cb;
  }
  getSeconds(cb: Cb) {
    this.callbacks.seconds = cb;
  }
  runAll(property: string, value: number) {
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
  observer() {
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

try {
  const cdn = new Countdown({
    date: 30,
    month: "JANUARY",
    year: 2025,
    hour: 0,
    minute: 0,
    second: 0,
  });
  //   cdn.stop();
  cdn.getDays((res) => {
    console.log("Days =>", res);
  });
  cdn.getHours((res) => {
    console.log("Hours =>", res);
  });
  cdn.getMinutes((res) => {
    console.log("Minutes =>", res);
  });
  cdn.getSeconds((res) => {
    console.log("Seconds =>", res);
  });
} catch (error) {
  console.log(error);
}
