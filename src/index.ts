import {
  CbCalc,
  CountdownInputType,
  DispatchType,
  ReducerTypes,
  RunCallbackType,
} from "./types";

import Timer from "./utils/Timer.js";

// Countdown that provides calculation features
class Countdown extends Timer {
  private callbacks: Record<string, CbCalc | null> = {
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  };
  private reactDispatch: null | DispatchType = null;

  constructor(cdnInputeState: CountdownInputType, delay = 1) {
    // parameter 1 passed as 1 second to timer class constructor
    super(cdnInputeState, delay);
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
  protected runCallback: RunCallbackType = (
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
  cdnDispatch(dispatchCb: DispatchType) {
    this.reactDispatch = dispatchCb;
  }

  /**
   * @description feed this reducer to useReducer Hook
   */
  static cdnReducer(
    state: typeof Countdown.initState,
    action: Parameters<DispatchType>[0]
  ) {
    switch (action.type) {
      case ReducerTypes.days:
        return { ...state, days: action.payload };
      case ReducerTypes.hours:
        return { ...state, hours: action.payload };
      case ReducerTypes.minutes:
        return { ...state, minutes: action.payload };
      case ReducerTypes.seconds:
        return { ...state, seconds: action.payload };
    }
    return state;
  }
}

// exporting countdown for lib usages
export const { initState, cdnReducer } = Countdown;
export default Countdown;
