// Timer that runs after a certain delay
export default abstract class Timer {
  static readonly initState = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  protected initiatedTime: number;
  protected state: Types.StateType;
  private timerRef: NodeJS.Timer | null = null;
  // private cb: Cb | null = null;

  constructor(
    private cdnInputeState: Types.CountdownInputType,
    private delay = 1
  ) {
    const currentTime = new Date().getTime();

    const { month, date, year, hour, minute, second } = this.cdnInputeState;
    const timeFormat = `${month} ${date}, ${year} ${hour}:${minute}:${second}`;

    this.initiatedTime = new Date(timeFormat).getTime();

    // throw error if the year is invalid
    if (currentTime > this.initiatedTime) {
      this.stop();
      throw new Error(`Time must be greater than current time.`);
    }

    // kick start timer for the first time
    this.start();

    // observes the state value changes
    this.state = this.observer();
  }
  // runs the callback every single delayed time
  start() {
    // clear old timer
    this.stop();
    //init timer
    this.timerRef = setInterval(this.clock, this.delay * 1000);
  }
  // takes a callback function set it to cb variable
  // protected abstract clock: Clock;
  // keeps watching for value changes
  private clock = () => {
    const { days, hours, minutes, seconds } = this.calculateTime();
    if (this.state.days !== days) this.state.days = days;
    if (this.state.hours !== hours) this.state.hours = hours;
    if (this.state.minutes !== minutes) this.state.minutes = minutes;
    if (this.state.seconds !== seconds) this.state.seconds = seconds;
  };

  stop() {
    clearInterval(this.timerRef || 0);
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

  protected abstract runCallback: Types.RunCallbackType;

  // observer implementation
  protected observer() {
    const self = this;
    return new Proxy(Timer.initState, {
      set(target: Types.StateType, property: string, value: number) {
        self.runCallback(property, value);
        // Update the property(name of state)
        target[property] = value;
        // Return true to indicate the property was set
        return true;
      },
    });
  }
}

namespace Types {
  export type CountdownInputType = {
    date: DayOfMonth;
    month: MonthType;
    year: number;
    hour: HourOfDay;
    minute: MinuteNSecondType;
    second: MinuteNSecondType;
  };
  export type RunCallbackType = (property: string, value: number) => void;
  export interface StateType {
    [key: string]: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }
  // Internal Types
  type MonthType =
    | "JANUARY"
    | "FEBRUARY"
    | "MARCH"
    | "APRIL"
    | "MAY"
    | "JUN"
    | "JULY"
    | "AUGUST"
    | "SEPTEMBER"
    | "OCTOBER"
    | "NOVEMBER"
    | "DECEMBER";

  type DayOfMonth =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31;

  type HourOfDay =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24;
  type MinuteNSecondType =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31
    | 32
    | 33
    | 34
    | 35
    | 36
    | 37
    | 38
    | 39
    | 40
    | 41
    | 42
    | 43
    | 44
    | 45
    | 46
    | 47
    | 48
    | 49
    | 50
    | 51
    | 52
    | 53
    | 54
    | 55
    | 56
    | 57
    | 58
    | 59
    | 60;
}
