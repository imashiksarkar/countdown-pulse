import Timer from "./utils/Timer";

// Countdown that provides calculation features
class Countdown extends Timer {
  private callbacks: Record<string, IndexTypes.CbCalc | null> = {
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  };
  private reactDispatch: null | IndexTypes.DispatchType = null;

  constructor(cdnInputeState: IndexTypes.CountdownInputType, delay = 1) {
    // parameter 1 passed as 1 second to timer class constructor
    super(cdnInputeState, delay);
  }

  // takes a callback for days and sets to callbacks object
  calcDays(cb: IndexTypes.CbCalc) {
    this.callbacks.days = cb;
  }
  // takes a callback for hours and sets to callbacks object
  calcHours(cb: IndexTypes.CbCalc) {
    this.callbacks.hours = cb;
  }
  // takes a callback for minutes and sets to callbacks object
  calcMinutes(cb: IndexTypes.CbCalc) {
    this.callbacks.minutes = cb;
  }
  // takes a callback for seconds and sets to callbacks object
  calcSeconds(cb: IndexTypes.CbCalc) {
    this.callbacks.seconds = cb;
  }
  // actually runs the callback when only it's value change
  protected runCallback: IndexTypes.RunCallbackType = (
    property: string,
    value: number
  ) => {
    // calls spesific callback if available
    if (this.callbacks[property]) this.callbacks[property]!(value);
    // calls dispatch callback if available
    if (this.reactDispatch)
      this.reactDispatch({ type: property, payload: value });
  };

  /**
   * @param put dispatch fruntion as argument
   */
  cdnDispatch(dispatchCb: IndexTypes.DispatchType) {
    this.reactDispatch = dispatchCb;
  }

  /**
   * @description feed this reducer to useReducer Hook
   */
  static cdnReducer(
    state: typeof Countdown.initState,
    action: Parameters<IndexTypes.DispatchType>[0]
  ) {
    switch (action.type) {
      case IndexTypes.ReducerTypes.days:
        return { ...state, days: action.payload };
      case IndexTypes.ReducerTypes.hours:
        return { ...state, hours: action.payload };
      case IndexTypes.ReducerTypes.minutes:
        return { ...state, minutes: action.payload };
      case IndexTypes.ReducerTypes.seconds:
        return { ...state, seconds: action.payload };
    }
    return state;
  }
}

// exporting countdown for lib usages
export const { initState, cdnReducer } = Countdown;
export default Countdown;

namespace IndexTypes {
  export type CbCalc = (res: number) => void;
  export type CountdownInputType = {
    date: DayOfMonth;
    month: MonthType;
    year: number;
    hour: HourOfDay;
    minute: MinuteNSecondType;
    second: MinuteNSecondType;
  };
  export type DispatchType = (action: {
    type: string;
    payload: number;
  }) => void;
  export enum ReducerTypes {
    days = "days",
    hours = "hours",
    minutes = "minutes",
    seconds = "seconds",
  }
  export type RunCallbackType = (property: string, value: number) => void;

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
